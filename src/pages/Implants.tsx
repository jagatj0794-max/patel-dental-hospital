/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, HelpCircle, Shield, Sparkles, ChevronDown, ChevronUp, Eye, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import implantProcedure from '../assets/images/implant_procedure_1780607994623.png';

interface ImplantsProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function Implants({ setCurrentPage, openAppointmentModal }: ImplantsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const implantBenefits = [
    {
      title: 'Preserves Critical Jawbone',
      desc: 'By mimicking physical tooth roots, an implant sends functional signals to your jaw, preventing bone erosion and structural collapse.',
    },
    {
      title: 'Shields Surrounding Dental Units',
      desc: 'Traditional bridges require filing down neighboring healthy teeth. Implants anchor independently, keeping native enamel safe.',
    },
    {
      title: 'Unyielding Chewing Power',
      desc: 'Walk, eat, run, and chew naturally. Restore nearly 98% of your natural chewing load capability.',
    },
    {
      title: 'Seamless Aesthetic Marriage',
      desc: 'Using CAD/CAM zirconia, crowns match the natural translucency, light reflection, and glaze of surrounding original teeth.',
    },
  ];

  const procedureSteps = [
    {
      num: '01',
      title: 'Radiographic Examination',
      desc: 'Using in-office OPG or CBCT scans, we mapping jaw dimensions, density, and surgical sites precisely.',
    },
    {
      num: '02',
      title: 'Titanium Anchor Insertion',
      desc: 'The medical-grade pure titanium post is placed gently into the biological socket under optimal localized care.',
    },
    {
      num: '03',
      title: 'Biological Integration',
      desc: 'Over a few months, your bone cells fuse snugly to the titanium anchor in a process called osseointegration.',
    },
    {
      num: '04',
      title: 'Crown Attachment',
      desc: 'Once osseointegration is complete, we secure a permanent CAD/CAM milled life-like crown. Your smile is fully restored!',
    },
  ];

  const implantFaqs = [
    {
      q: 'What is a dental implant made of?',
      a: 'A dental implant consists of three parts: a titanium post that fuses with the jawbone, an abutment which acts as a connector, and a custom zirconia or ceramic crown that looks and acts like a natural tooth. Titanium is highly biocompatible and represents the gold standard in modern implants.',
    },
    {
      q: 'How long does a dental implant procedure take?',
      a: 'The implant placement is completed in a single session (about 30-45 minutes per tooth). After placement, we allow a healing period of 2 to 4 months for biological bone integration, followed by attaching the permanent porcelain tooth crown.',
    },
    {
      q: 'Am I too old to get dental implants?',
      a: 'Age is never a limiting factor! Anyone with healthy jawbone thickness and stable health is an ideal candidate. We regularly restore chewing comfort for senior citizens in Rajkot.',
    },
    {
      q: 'Is the implant procedure painful?',
      a: 'The procedure is performed under computerized local anesthesia, so you will feel no pain whatsoever. Most patients report feeling only light vibration during placement and find recovery is easier than a standard tooth extraction.',
    },
  ];

  const handleBookClick = () => {
    openAppointmentModal('Dental Implants');
  };

  return (
    <div id="implants-page-view" className="relative pt-[72px] bg-[#FAFAFC]">
      {/* Intro Head section */}
      <section className="pt-8 pb-12 md:py-20 lg:py-24 bg-linear-to-b from-brand-sky/40 via-white to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Context copywriting */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-widest rounded-full">
                <Shield className="h-3.5 w-3.5 mr-1 text-brand-cyan" /> Gold Standard Restorations
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight">
                Permanent and Natural Dental Implants
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
                Replace missing or compromised teeth with lifetime titanium anchors that fuse into your biological anatomy, matching the look, structural utility, and chewing capacity of your natural teeth.
              </p>
              
              <div className="pt-2">
                <button
                  id="implants-hero-primary"
                  onClick={handleBookClick}
                  className="px-8 py-3.5 bg-brand-cyan hover:bg-brand-navy text-white text-xs font-bold rounded-xl shadow-lg transition duration-350 cursor-pointer"
                >
                  Book Specialist Implant Assessment
                </button>
              </div>
            </div>

            {/* Side Graphics */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-sm mx-auto">
                <img
                  src={implantProcedure}
                  alt="Modern restorative dental implant structure"
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Narrative: What Are Dental Implants? */}
      <section className="py-12 md:py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-brand-cyan text-xs font-bold uppercase tracking-wider block">Clinical Definition</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                What Are Dental Implants?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">
                A dental implant is essentially a high-tech artificial tooth root. It consists of a sterile, pure titanium screw post placed surgically within your jawbone, where it naturally integrates with native cells over a period of 2 to 4 months.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">
                This integration forms an unyielding biological anchor. Once stabilized, our specialist Dr. Kinjal Patel attaches a custom connectors and a CAD/CAM generated E-Max or zirconia crown. Unlike partial dentures or dental bridges, an implant never shifts, slips, or depends on neighboring teeth, functioning safely for a lifetime.
              </p>
            </div>
            
            {/* Visual Callout block */}
            <div className="bg-brand-sky/30 border border-brand-sky p-8 rounded-2xl space-y-4">
              <div className="h-10 w-10 rounded-xl bg-brand-cyan flex items-center justify-center text-white font-bold">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-brand-navy text-lg">Biocompatible Excellence</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans">
                We use titanium implants because titanium is bio-inert. Meaning, your body does not reject it. Instead, bone fuses directly with it, creating a permanent, organic connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Implant Benefits */}
      <section className="py-16 md:py-20 bg-linear-to-b from-white to-brand-sky/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-brand-teal text-xs font-bold uppercase tracking-wider block mb-2">Implant Benefits</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Why Dental Implants Are the Premier Treatment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {implantBenefits.map((benefit, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start space-x-4">
                <div className="h-8 w-8 rounded-lg bg-brand-teal/10 flex items-center justify-center text-brand-teal shrink-0 mt-1">
                  <Shield className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-brand-navy text-base mb-1.5">{benefit.title}</h3>
                  <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implant Procedure Steps */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-brand-cyan text-xs font-bold uppercase tracking-wider block mb-2">Step-by-Step Procedure</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Our Professional Implant Procedure
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto font-sans">
              Carefully mapped surgical phases to guarantee optimal healing and lifelong success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {procedureSteps.map((step, idx) => (
              <div key={idx} className="bg-[#FAFAFC] p-6.5 rounded-2xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="block text-xl font-extrabold text-brand-cyan/40 font-mono mb-4">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-sm tracking-tight text-brand-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-gray-400 mt-6 pt-2 border-t border-gray-150">
                  Step {idx + 1} Approved
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Redirect Before & After Results */}
      <section className="py-12 md:py-16 bg-brand-navy text-white text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 relative z-10 space-y-4">
          <HeartHandshake className="h-10 w-10 text-brand-cyan mx-auto animate-pulse" />
          <h2 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white">
            Examine Our Successful Clinical Cases
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Witness how we reconstruct compromised jaws using high-end implantology. View our actual cases from Patel Dental Hospital in Rajkot.
          </p>
          <button
            onClick={() => {
              setCurrentPage('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-1.5 px-6 py-2.5 bg-brand-cyan text-white hover:bg-brand-teal text-xs font-bold rounded-xl transition cursor-pointer"
          >
            <Eye className="h-4 w-4" />
            <span>Open Smile Before/After Gallery</span>
          </button>
        </div>
      </section>

      {/* Dedicated Implants FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-brand-teal text-xs font-bold uppercase tracking-wider block mb-2">FAQ suite</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Implants Consultation FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {implantFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-gray-150 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-4 bg-[#FAFAFC] flex items-center justify-between font-display font-semibold text-sm sm:text-base text-brand-navy cursor-pointer hover:bg-gray-50"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-brand-cyan" /> : <ChevronDown className="h-4 w-4 text-brand-cyan" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 py-4 bg-white text-xs sm:text-sm text-gray-500 font-sans leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
