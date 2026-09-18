/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calendar, Award, Check, GraduationCap, Heart, Shield, Sparkles, 
  Clock, Microscope, BookOpen, Quote, ShieldCheck, HeartHandshake, UserCheck, CheckCircle2, X, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSEO } from '../utils/seo';

// Unified images with clear paths
const drKinjalPatelImg = '/Dr kinjal patel 2.png';
const drVipulPatelImg = '/dr. patel.png';

import { Doctor } from '../types';
import { DoctorBioRenderer as OriginalDoctorBioRenderer } from '../components/DoctorBioRenderer';
import { contactService, DEFAULT_CONTACT_INFO, getWhatsAppUrl } from '../utils/contactData';

interface DoctorsProps {
  openAppointmentModal: () => void;
  doctorsList: Doctor[];
}

function VipulGujaratiBioRenderer() {
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

  const toggle = (idx: number) => {
    setOpenStates(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const accordionItems = [
    {
      title: "એડવાન્સ ઇમ્પ્લાન્ટ સર્જરી ટ્રેનિંગ (12 પ્રોગ્રામ્સ)",
      description: "ફુલ માઉથ રિહેબિલિટેશન માટે પૂરતું હાડકું ન ધરાવતા દર્દીઓ માટે ઉપયોગી.",
      bullets: [
        "ડિપ્લોમેટશિપ અને ફેલોશિપ માટે માન્યતા – ઇન્ડિયન સોસાયટી ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજી",
        "ઇમ્પ્લાન્ટોલોજીમાં ફેલોશિપ – ઇન્ટરનેશનલ કોંગ્રેસ ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજિસ્ટ્સ (USA)",
        "ડેન્ટલ ઇમ્પ્લાન્ટ્સમાં અદ્યતન હાર્ડ અને સોફ્ટ ટિશ્યૂ મેનેજમેન્ટની ટ્રેનિંગ – ડૉ. ડોંગ સીઓક સોન (કોરિયા) દ્વારા",
        "હાર્ડ ટિશ્યૂ ડેવલપમેન્ટમાં સફળતા માટેના માપદંડ – ડૉ. માઇકલ એ. પાઇકોસ દ્વારા",
        "સોફ્ટ ટિશ્યૂ ઓગમેન્ટેશન માટે હાર્ડ પેલેટમાંથી પેડિકલ્ડ ફ્લૅપ – ડૉ. રાડોસ્લાવ ઇયાદાચ (પોલેન્ડ) દ્વારા",
        "ઓસિયોડેન્સિફિકેશન વર્કશોપ – ઇમ્પ્લાન્ટ ડેન્ટિસ્ટ્રીમાં સાઇટ અને પરિણામને શ્રેષ્ઠ બનાવવા માટે – ડૉ. સલાહ હુવાઇસ દ્વારા",
        "ઇમ્પ્લાન્ટ ડેન્ટિસ્ટ્રીમાં ઓટોજેનસ ટ્યુબેરોસિટી બોન ગ્રાફ્ટિંગ ટેકનિક – ડૉ. સ્નેઝાના પોલ દ્વારા",
        "સૌથી નવીન અને અદ્યતન સાઇનસ લિફ્ટ ટેકનિક – ડૉ. સેમ્યુઅલ લી દ્વારા",
        "સાઇનસ પરફોરેશનને સીલ કરવા માટે ટ્યુબેરોસિટી વિસ્તારમાંથી ઓટોલોગસ બ્લડ અંગેની વર્કશોપ – ડૉ. સેમ્યુઅલ લી દ્વારા",
        "ઓસિયોડેન્સિફિકેશન – સાઇનસ લિફ્ટ પ્રક્રિયામાં એક પેરાડાઇમ શિફ્ટ – પ્રો. ઝિવ મેઝોર (ઇઝરાયેલ) દ્વારા",
        "ધ ખૌરી ટેકનિક, ઓસિયોડેન્સિફિકેશન અને પાર્ટિયલ એક્સટ્રેક્શન થેરાપી – ડૉ. હાવર્ડ ગ્લકમેન દ્વારા",
        "એટ્રોફિક મેન્ડિબલમાં નર્વ ટ્રાન્સપોઝિશન ટેકનિક – ડૉ. માઝેમ તમિમી દ્વારા"
      ]
    },
    {
      title: "ડિજિટલ અને ગાઇડેડ સર્જરી (4 પ્રોગ્રામ્સ)",
      description: "લોહી વગર અને ટાંકા વગર, પ્રોસ્થેટિક સ્થિતિમાં સચોટ ડેન્ટલ ઇમ્પ્લાન્ટ પ્લેસમેન્ટ સાથે.",
      bullets: [
        "ઇમ્પ્લાન્ટ પ્રોસ્ટોડોન્ટિક્સમાં માસ્ટરશિપ (USA)",
        "C-Guide પ્રોટોકોલનો ઉપયોગ કરીને ઇમ્પ્લાન્ટ પ્લેસમેન્ટમાં કમ્પ્યુટર આસિસ્ટેડ ડિજિટલ ડેન્સિફિકેશન – ડૉ. રિચાર્ડ માર્ટિન દ્વારા",
        "આધુનિક ઇમ્પ્લાન્ટ પ્રોટોકોલના ક્લિનિકલ પાસાઓ – ડૉ. ક્લીથિસ મનોલાખિસ દ્વારા",
        "CBCTથી સર્જરી અને ઇમિડિયેટ લોડિંગ સુધીનો ઇમ્પ્લાન્ટ ડેન્ટિસ્ટ્રીનો ડિજિટલ વર્કફ્લો – ડૉ. બ્યુન્ગહો ચોઇ દ્વારા"
      ]
    },
    {
      title: "ઇમિડિયેટ લોડિંગ અને સેમ-ડે દાંત (4 પ્રોગ્રામ્સ)",
      description: "એક અઠવાડિયામાં ઇમ્પ્લાન્ટ-સપોર્ટેડ ફિક્સ દાંત આપવા માટે, જે ફક્ત ડૉ. વિપુલ પટેલ દ્વારા કરવામાં આવે છે.",
      bullets: [
        "ઇમ્પ્લાન્ટ ડેન્ટિસ્ટ્રીમાં સેમ ડે રિસ્ટોરેશન – સફળતા માટેના માપદંડ – ડૉ. કોસ્ટા નિકોલોપોલોસ દ્વારા",
        "Densah Burનો ઉપયોગ કરીને Osseodensification સાથે All-on-4 અને All-on-6 કેસના પરિણામોમાં સુધારો – ડૉ. જેક ટી. ક્રાઉઝર દ્વારા",
        "પ્ટેરીગોઇડ ઇમ્પ્લાન્ટ્સ, All-on-4, All-on-6 અને ઇમિડિયેટ લોડિંગ – ડૉ. રૂડબર્ગ ઓમરી (ઇઝરાયેલ) દ્વારા",
        "વન-ડે રિસ્ટોરેશન સાથે ઇમિડિયેટ ઇમ્પ્લાન્ટ પ્લેસમેન્ટ – આઇઝેક તાવિલ દ્વારા"
      ]
    },
    {
      title: "સોફ્ટ ટિશ્યૂ અને એસ્થેટિક્સ (3 પ્રોગ્રામ્સ)",
      description: "પેઢા અને ચહેરાની પ્લાસ્ટિક સર્જરી, તેમજ પાન મસાલા ચાવવાના કારણે મોં પૂરતું ન ખુલતું હોય તેવા દર્દીઓ માટે મોં ખોલવાની સર્જરી.",
      bullets: [
        "સોફ્ટ ટિશ્યૂ મેનેજમેન્ટ – ડૉ. રિકાર્ડો કર્ન (બ્રાઝિલ) દ્વારા",
        "IDR અને ઓસિયો ડેન્સિફિકેશન – ડૉ. જોસ કાર્લોસ માર્ટિન્સ દા રોઝા દ્વારા",
        "બાયો-એક્ટિવેટર્સ અને ઓટોલોગસ ટિશ્યૂ ગ્રાફ્ટ (પ્લેટલેટ ગ્રોથ ફેક્ટર્સ) સાથે ઓસિયોડેન્સિફિકેશન – પ્રો. નેલ્સન પિન્ટો દ્વારા"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* 1. PROFESSIONAL PROFILE */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/90">
          <div className="p-2 bg-slate-100/80 rounded-xl shrink-0">
            <UserCheck className="h-5 w-5 text-[#0ea5e9]" />
          </div>
          <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase">
            વ્યાવસાયિક પ્રોફાઇલ
          </h4>
        </div>
        <div className="space-y-3.5 pl-0.5">
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
            ડૉ. વિપુલ પટેલ 2012થી રાજકોટમાં Dental Implantologist તરીકે પ્રેક્ટિસ કરી રહ્યા છે.
          </p>
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
            તેમણે USAમાંથી “Masters in Implantology” પૂર્ણ કર્યું છે.
          </p>
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
            તેમણે Rajasthan University and Health Sciencesમાંથી Oral & Maxillofacial Surgeryમાં Master of Dental Surgery (MDS) પૂર્ણ કર્યું છે.
          </p>
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
            તેમણે Bhavnagar Universityમાંથી Oral Medicine and Radiologyમાં Master of Dental Surgery (MDS) પૂર્ણ કર્યું છે.
          </p>
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
            તેમણે Government Dental College, Ahmedabadમાંથી Bachelor of Dental Surgery (BDS)ની ડિગ્રી મેળવી છે.
          </p>
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
            તેમને Oral Surgery અને Advanced Implant Dentistryનો વ્યાપક અનુભવ છે.
          </p>
        </div>
      </div>

      {/* 2. PROFESSIONAL MEMBERSHIPS */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/90">
          <div className="p-2 bg-slate-100/80 rounded-xl shrink-0">
            <ShieldCheck className="h-5 w-5 text-[#0D9488]" />
          </div>
          <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase">
            વ્યાવસાયિક સભ્યપદ
          </h4>
        </div>
        <div className="space-y-3.5 pl-0.5">
          <ul className="grid grid-cols-1 gap-2.5 my-3">
            {[
              "International Congress of Oral Implantologists (ICOI)ના સક્રિય સભ્ય",
              "Indian Society of Oral Implantology (ISOI)ના આજીવન સભ્ય",
              "Indian Dental Association (IDA)ના સક્રિય સભ્ય"
            ].map((bullet, idx) => (
              <li key={idx} className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 sm:p-3.5 flex items-start space-x-3 text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed hover:border-slate-200 hover:bg-slate-100/30 transition-all duration-200 group">
                <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5 animate-pulse" />
                <span className="flex-1 font-sans font-semibold text-slate-800">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. ADVANCED TRAINING, FELLOWSHIPS & CERTIFICATIONS */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/90">
          <div className="p-2 bg-slate-100/80 rounded-xl shrink-0">
            <GraduationCap className="h-5 w-5 text-[#0ea5e9]" />
          </div>
          <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase">
            એડવાન્સ ટ્રેનિંગ, ફેલોશિપ્સ અને સર્ટિફિકેશન્સ
          </h4>
        </div>
        
        <div className="space-y-4 w-full mt-2">
          {accordionItems.map((item, idx) => {
            const isOpen = !!openStates[idx];
            return (
              <div 
                key={idx} 
                className="border border-slate-200/85 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-5 pt-4 pb-2 flex items-center justify-between text-left font-display text-[#0B1B33] hover:bg-slate-50/50 transition-colors duration-200 select-none cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
                    <span className="w-1.5 h-4 bg-[#0D9488] rounded-full inline-block shrink-0" />
                    <span className="block font-black text-sm sm:text-base text-slate-800 leading-snug">
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'transform rotate-180 text-[#0D9488]' : ''}`} 
                  />
                </button>

                {/* Always-visible description directly below heading */}
                {item.description && (
                  <div className="pl-[38px] pr-5 pb-4">
                    <p className="text-slate-600 font-sans text-sm sm:text-[14.5px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}

                {/* Accordion Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[5000px] opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="p-4 sm:p-5 bg-slate-50/40 space-y-3">
                    <ul className="grid grid-cols-1 gap-2.5">
                      {item.bullets.map((bullet, iIdx) => (
                        <li key={iIdx} className="bg-white border border-slate-100 rounded-xl p-3 sm:p-3.5 flex items-start space-x-3 text-gray-800 font-sans text-sm sm:text-base leading-relaxed hover:border-slate-200 hover:bg-slate-50/50 transition-all duration-200 group">
                          <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                          <span className="flex-1 font-sans font-medium text-slate-700">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. RESEARCH */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/90">
          <div className="p-2 bg-slate-100/80 rounded-xl shrink-0">
            <Microscope className="h-5 w-5 text-[#0ea5e9]" />
          </div>
          <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase">
            સંશોધન
          </h4>
        </div>
        <div className="space-y-3.5 pl-0.5">
          <p className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line">
            ડૉ. વિપુલ પટેલ હાલમાં Maxilla અને Mandibleમાં Bone Defects માટે Autogenous Dentin Graft પર સંશોધન કરી રહ્યા છે.
          </p>
          <p className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line">
            જે દર્દીઓના પોતાના દાંતમાં કેવિટી હોય અને જેને કાઢવાની જરૂર હોય, તે દાંતને કાઢ્યા પછી હાડકાના પુનઃનિર્માણ માટે ઉપયોગમાં લઈ શકાય છે, ખાસ કરીને એવા દર્દીઓમાં જેમની પાસે ડેન્ટલ ઇમ્પ્લાન્ટ પ્લેસમેન્ટ માટે પૂરતું હાડકું ન હોય.
          </p>
          <p className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line">
            સંશોધન લેખ હાલમાં પ્રકાશનની પ્રક્રિયામાં છે.
          </p>
        </div>
      </div>

      {/* 5. AWARDS & RECOGNITION */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/90">
          <div className="p-2 bg-slate-100/80 rounded-xl shrink-0">
            <Award className="h-5 w-5 text-amber-500" />
          </div>
          <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase">
            પુરસ્કારો અને સન્માન
          </h4>
        </div>
        <div className="space-y-3.5 pl-0.5">
          <ul className="grid grid-cols-1 gap-2.5 my-3">
            {[
              "ભારતમાં શ્રેષ્ઠ એસ્થેટિક ડેન્ટિસ્ટ તરીકે પુરસ્કૃત (FAMDENT)",
              "ભારતમાં શ્રેષ્ઠ ડેન્ટલ ક્લિનિક તરીકે પુરસ્કૃત (FAMDENT)",
              "ભારતમાં ઉત્કૃષ્ટ ડેન્ટિસ્ટ તરીકે નામાંકિત (FAMDENT)"
            ].map((bullet, idx) => (
              <li key={idx} className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 sm:p-3.5 flex items-start space-x-3 text-gray-800 font-sans text-sm sm:text-base leading-relaxed hover:border-slate-200 hover:bg-slate-100/30 transition-all duration-200 group">
                <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                <span className="flex-1 font-sans font-semibold text-[#0B1B33]">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 6. CLINICAL EXPERIENCE */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/90">
          <div className="p-2 bg-slate-100/80 rounded-xl shrink-0">
            <Clock className="h-5 w-5 text-[#0D9488]" />
          </div>
          <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase">
            ક્લિનિકલ અનુભવ
          </h4>
        </div>
        <div className="space-y-3.5 pl-0.5">
          <ul className="grid grid-cols-1 gap-2.5 my-3">
            {[
              "2012થી રાજકોટમાં ડેન્ટલ ઇમ્પ્લાન્ટ સર્જન તરીકે પ્રેક્ટિસ કરી રહ્યા છે",
              "16000+થી વધુ ડેન્ટલ ઇમ્પ્લાન્ટ્સ સફળતાપૂર્વક મૂક્યા છે",
              "અદ્યતન ઇમ્પ્લાન્ટ ડેન્ટિસ્ટ્રીનો વ્યાપક અનુભવ",
              "ઓરલ સર્જરીનો વ્યાપક અનુભવ"
            ].map((bullet, idx) => (
              <li key={idx} className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 sm:p-3.5 flex items-start space-x-3 text-gray-800 font-sans text-sm sm:text-base leading-relaxed hover:border-slate-200 hover:bg-slate-100/30 transition-all duration-200 group">
                <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                <span className="flex-1 font-sans font-semibold text-[#0B1B33]">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function KinjalGujaratiBioRenderer() {
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});
  const [clinicalExpanded, setClinicalExpanded] = useState(false);

  const toggle = (idx: number) => {
    setOpenStates(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const accordionItems = [
    {
      title: "ઇમ્પ્લાન્ટોલોજી ફેલોશિપ્સ (2 પ્રોગ્રામ્સ)",
      bullets: [
        "ફેલોશિપ એક્રેડિટેશન – ઇન્ડિયન સોસાયટી ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજી",
        "ઇમ્પ્લાન્ટોલોજીમાં ફેલોશિપ – ઇન્ટરનેશનલ કોંગ્રેસ ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજિસ્ટ્સ (USA)"
      ]
    },
    {
      title: "પીડિયાટ્રિક ડેન્ટિસ્ટ્રી તાલીમ અને કોન્ફરન્સ (3 પ્રોગ્રામ્સ)",
      bullets: [
        "પીડિયાટ્રિક ડેન્ટિસ્ટ્રી (બાળકોના દાંતની સારવાર)માં ખાસ રસ",
        "વિવિધ રાષ્ટ્રીય પીડિયાટ્રિક ડેન્ટિસ્ટ્રી સિમ્પોઝિયમમાં ભાગ લીધો",
        "આંતરરાષ્ટ્રીય પીડિયાટ્રિક ડેન્ટિસ્ટ્રી સિમ્પોઝિયમમાં ભાગ લીધો"
      ]
    },
    {
      title: "એન્ડોડોન્ટિક તાલીમ અને કોન્ફરન્સ (3 પ્રોગ્રામ્સ)",
      bullets: [
        "સિંગલ સીટીંગ રૂટ કેનાલ ટ્રીટમેન્ટમાં ખાસ રસ",
        "અનેક રાષ્ટ્રીય એન્ડોડોન્ટિક કોન્ફરન્સમાં હાજરી આપી",
        "અનેક આંતરરાષ્ટ્રીય એન્ડોડોન્ટિક કોન્ફરન્સમાં હાજરી આપી"
      ]
    },
    {
      title: "ક્લિનિકલ તાલીમ અને માર્ગદર્શન (2 પ્રોગ્રામ્સ)",
      bullets: [
        "અનેક પ્રખ્યાત રાષ્ટ્રીય વક્તાઓ હેઠળ તાલીમ મેળવી",
        "અનેક પ્રખ્યાત આંતરરાષ્ટ્રીય વક્તાઓ હેઠળ તાલીમ મેળવી"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* 1. PROFESSIONAL PROFILE */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/90">
          <div className="p-2 bg-slate-100/80 rounded-xl shrink-0">
            <UserCheck className="h-5 w-5 text-[#0ea5e9]" />
          </div>
          <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase">
            વ્યાવસાયિક પ્રોફાઇલ
          </h4>
        </div>
        <div className="space-y-3.5 pl-0.5">
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
            ડૉ. કિંજલ પટેલ 2012થી રાજકોટમાં એસ્થેટિક ડેન્ટિસ્ટ અને ડેન્ટલ ઇમ્પ્લાન્ટોલોજિસ્ટ તરીકે પ્રેક્ટિસ કરી રહ્યા છે.
          </p>
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
            તેમણે Government Dental College, Jamnagarમાંથી Bachelor of Dental Surgery (BDS)ની ડિગ્રી મેળવી છે.
          </p>
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
            તેમને 14 વર્ષથી વધુનો ક્લિનિકલ અનુભવ તથા ઓરલ સર્જરી અને એસ્થેટિક ડેન્ટિસ્ટ્રીમાં વ્યાપક નિપુણતા છે.
          </p>
        </div>
      </div>

      {/* 2. PROFESSIONAL MEMBERSHIPS */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/90">
          <div className="p-2 bg-slate-100/80 rounded-xl shrink-0">
            <ShieldCheck className="h-5 w-5 text-[#0D9488]" />
          </div>
          <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase">
            વ્યાવસાયિક સભ્યપદ
          </h4>
        </div>
        <div className="space-y-3.5 pl-0.5">
          <ul className="grid grid-cols-1 gap-2.5 my-3">
            {[
              "International Congress of Oral Implantologists (ICOI)ના સક્રિય સભ્ય",
              "Indian Society of Oral Implantology (ISOI)ના આજીવન સભ્ય",
              "Indian Dental Association (IDA)ના સક્રિય સભ્ય"
            ].map((bullet, idx) => (
              <li key={idx} className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 sm:p-3.5 flex items-start space-x-3 text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed hover:border-slate-200 hover:bg-slate-100/30 transition-all duration-200 group">
                <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                <span className="flex-1 font-sans font-semibold text-slate-800">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. PERSONAL PHILOSOPHY */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/90">
          <div className="p-2 bg-slate-100/80 rounded-xl shrink-0">
            <BookOpen className="h-5 w-5 text-[#0D9488]" />
          </div>
          <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase">
            વ્યક્તિગત વિચારધારા
          </h4>
        </div>
        <div className="space-y-3.5 pl-0.5">
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed">
            ડૉ. કિંજલ પટેલ એક ઉત્સાહી ઉદ્યોગસાહસિક છે, જે દરેક દર્દીને ઉચ્ચતમ ધોરણની ડેન્ટલ કેર પૂરી પાડવા માટે સતત પ્રયત્નશીલ રહે છે.
          </p>
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed">
            તેઓ સતત શીખવા અને વ્યાવસાયિક વિકાસ માટે ઉત્સાહી છે.
          </p>
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed">
            તેઓ નીચેના પ્રખ્યાત માર્ગદર્શકો પાસેથી મેળવેલા મૂલ્યવાન જ્ઞાનને સક્રિયપણે અમલમાં મૂકે છે:
          </p>
          
          {/* Mentor Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
            {[
              { name: "Santosh Nair", role: "Business Guru" },
              { name: "Sandeep Maheshwari", role: "Motivational Speaker" },
              { name: "Sadhguru", role: "Spiritual Leader" }
            ].map((mentor, mIdx) => (
              <div key={mIdx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col items-center text-center">
                <span className="w-10 h-10 bg-[#0ea5e9]/10 text-[#0ea5e9] rounded-full flex items-center justify-center font-black text-lg mb-2">
                  {mentor.name[0]}
                </span>
                <span className="font-bold text-[#0B1B33] text-sm">{mentor.name}</span>
                <span className="text-xs text-slate-500 mt-1">{mentor.role}</span>
              </div>
            ))}
          </div>

          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed">
            તેઓ પોતાના વ્યાવસાયિક અને આધ્યાત્મિક વિચારસરણીને મજબૂત બનાવવા માટે જીવનચરિત્રો, નેતૃત્વ સંબંધિત પુસ્તકો અને મહાન લેખકોના જીવનપાઠ વાંચવાનું પણ પસંદ કરે છે.
          </p>
        </div>
      </div>

      {/* 4. ADVANCED TRAINING, FELLOWSHIPS & CERTIFICATIONS */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/90">
          <div className="p-2 bg-slate-100/80 rounded-xl shrink-0">
            <GraduationCap className="h-5 w-5 text-[#0ea5e9]" />
          </div>
          <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase">
            અદ્યતન તાલીમ, ફેલોશિપ્સ અને સર્ટિફિકેશન્સ
          </h4>
        </div>
        
        <div className="space-y-4 w-full mt-2">
          {accordionItems.map((item, idx) => {
            const isOpen = !!openStates[idx];
            return (
              <div 
                key={idx} 
                className="border border-slate-200/85 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-5 pt-4 pb-2 flex items-center justify-between text-left font-display text-[#0B1B33] hover:bg-slate-50/50 transition-colors duration-200 select-none cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
                    <span className="w-1.5 h-4 bg-[#0D9488] rounded-full inline-block shrink-0" />
                    <span className="block font-black text-sm sm:text-base text-slate-800 leading-snug">
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'transform rotate-180 text-[#0D9488]' : ''}`} 
                  />
                </button>

                {/* Accordion Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[1000px] opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="p-4 sm:p-5 bg-slate-50/40 space-y-3">
                    <ul className="grid grid-cols-1 gap-2.5">
                      {item.bullets.map((bullet, iIdx) => (
                        <li key={iIdx} className="bg-white border border-slate-100 rounded-xl p-3 sm:p-3.5 flex items-start space-x-3 text-gray-800 font-sans text-sm sm:text-base leading-relaxed hover:border-slate-200 hover:bg-slate-50/50 transition-all duration-200 group">
                          <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                          <span className="flex-1 font-sans font-medium text-slate-700">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. LEADERSHIP & MANAGEMENT */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/90">
          <div className="p-2 bg-slate-100/80 rounded-xl shrink-0">
            <ShieldCheck className="h-5 w-5 text-[#0ea5e9]" />
          </div>
          <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase">
            લીડરશિપ અને મેનેજમેન્ટ
          </h4>
        </div>
        <div className="space-y-3.5 pl-0.5">
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
            તેમની ક્લિનિકલ કુશળતા ઉપરાંત, ડૉ. કિંજલ પટેલે સંતોષ નાયર દ્વારા સંચાલિત ગુરુકુળ બિઝનેસ મેનેજમેન્ટ પ્રોગ્રામ સફળતાપૂર્વક પૂર્ણ કર્યો છે.
          </p>
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
            તેઓ સમગ્ર ડેન્ટલ ટીમને સપોર્ટ કરવા અને મજબૂત કરવા માટે આધુનિક મેનેજમેન્ટ સિદ્ધાંતો લાગુ કરે છે.
          </p>
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
            તેઓ ટીમવર્ક, નેતૃત્વ અને સતત પ્રગતિમાં દૃઢપણે માને છે.
          </p>
          <p className="text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
            તેઓ ડેન્ટલ હેલ્થકેરની એકંદર ગુણવત્તા સુધારવા માટે નવા સ્નાતક થયેલા દંત ચિકિત્સકો અને ડેન્ટલ આસિસ્ટન્ટ્સને માર્ગદર્શન આપવા માટે સમર્પિત છે.
          </p>
        </div>
      </div>

      {/* 6. CLINICAL EXPERIENCE */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setClinicalExpanded(!clinicalExpanded)}
          className="w-full flex items-center justify-between p-4 sm:p-5 border border-slate-200 rounded-2xl bg-white shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] text-left hover:border-[#0D9488]/40 hover:shadow-md transition-all duration-300 cursor-pointer focus:outline-none group/hdr"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-2 bg-slate-100/80 rounded-xl shrink-0 group-hover/hdr:bg-[#0D9488]/5 transition-colors duration-300">
              <Clock className="h-5 w-5 text-[#0D9488]" />
            </div>
            <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase group-hover/hdr:text-[#0D9488] transition-colors duration-200">
              ક્લિનિકલ અનુભવ
            </h4>
          </div>
          <ChevronDown 
            className={`h-5 w-5 text-slate-400 transition-transform duration-300 shrink-0 mr-1 group-hover/hdr:text-[#0D9488] ${clinicalExpanded ? 'transform rotate-180 text-[#0D9488]' : ''}`} 
          />
        </button>

        <div 
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            clinicalExpanded ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none mt-0'
          }`}
        >
          <ul className="grid grid-cols-1 gap-2.5 my-3">
            {[
              "2012થી રાજકોટમાં એસ્થેટિક ડેન્ટિસ્ટ તરીકે પ્રેક્ટિસ કરી રહ્યા છે",
              "ડેન્ટલ ઇમ્પ્લાન્ટ સર્જન",
              "14 વર્ષથી વધુનો ક્લિનિકલ અનુભવ",
              "ઓરલ સર્જરીમાં વ્યાપક અનુભવ",
              "એસ્થેટિક ડેન્ટિસ્ટ્રીમાં વ્યાપક અનુભવ",
              "પીડિયાટ્રિક ડેન્ટિસ્ટ્રીમાં ખાસ રસ",
              "સિંગલ સીટીંગ રૂટ કેનાલ ટ્રીટમેન્ટમાં ખાસ રસ"
            ].map((bullet, idx) => (
              <li key={idx} className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 sm:p-3.5 flex items-start space-x-3 text-[#1E3A5F] font-sans text-sm sm:text-base font-semibold leading-relaxed hover:border-slate-200 hover:bg-slate-100/30 transition-all duration-200 group">
                <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                <span className="flex-1 font-sans font-medium text-slate-800">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 7. AWARDS & RECOGNITION */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/90">
          <div className="p-2 bg-slate-100/80 rounded-xl shrink-0">
            <Award className="h-5 w-5 text-amber-500" />
          </div>
          <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase">
            પુરસ્કારો અને સન્માન
          </h4>
        </div>
        <div className="space-y-3.5 pl-0.5">
          <ul className="grid grid-cols-1 gap-2.5 my-3">
            {[
              "ભારતમાં શ્રેષ્ઠ ડેન્ટલ ક્લિનિક તરીકે પુરસ્કૃત (FAMDENT)",
              "ભારતમાં શ્રેષ્ઠ એસ્થેટિક ડેન્ટિસ્ટ તરીકે પુરસ્કૃત (FAMDENT)"
            ].map((bullet, idx) => (
              <li key={idx} className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 sm:p-3.5 flex items-start space-x-3 text-gray-800 font-sans text-sm sm:text-base leading-relaxed hover:border-slate-200 hover:bg-slate-100/30 transition-all duration-200 group">
                <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                <span className="flex-1 font-sans font-semibold text-[#0B1B33]">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DoctorBioRenderer({ bioText, doctorName }: { bioText: string; doctorName: string }) {
  if (doctorName.includes('વિપુલ')) {
    return <VipulGujaratiBioRenderer />;
  }
  if (doctorName.includes('કિંજલ') || doctorName.toLowerCase().includes('kinjal')) {
    return <KinjalGujaratiBioRenderer />;
  }
  return <OriginalDoctorBioRenderer bioText={bioText} doctorName={doctorName} />;
}

export default function DoctorsGujarati({ openAppointmentModal, doctorsList }: DoctorsProps) {
  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT_INFO);

  React.useEffect(() => {
    contactService.getContactInfo().then(data => {
      setContactInfo(data);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  useSEO({
    title: 'Meet Our Specialist Doctors | Best Dentist in Rajkot',
    description: 'Get treated by the best dentists in Rajkot. Meet our senior dental specialists, Dr. Vipul Patel and Dr. Kinjal Patel, at Patel Dental Hospital. Expert care in dental implants, RCT, and smile design.',
    keywords: 'Best Dentist in Rajkot, Dentist in Rajkot, Dental Surgeon in Rajkot, Dr Vipul Patel, Dr Kinjal Patel, Dental Specialist, Patel Dental Hospital Doctors, Dental Clinic in Rajkot',
    ogImage: drVipulPatelImg
  });

  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);

  // Ensure Dr. Vipul Patel appears first, followed by Dr. Kinjal Patel, then any other doctors
  const rawDoctors = [...doctorsList].sort((a, b) => {
    const nameA = (a.name || '').toLowerCase();
    const nameB = (b.name || '').toLowerCase();
    if (nameA.includes('vipul')) return -1;
    if (nameB.includes('vipul')) return 1;
    if (nameA.includes('kinjal')) return -1;
    if (nameB.includes('kinjal')) return 1;
    return 0;
  });

  const replaceImplantologists = <T,>(obj: T): T => {
    if (typeof obj === 'string') {
      return obj.replace(/Dental Implantologists/g, 'Dental Implantologist') as unknown as T;
    }
    if (Array.isArray(obj)) {
      return obj.map(item => replaceImplantologists(item)) as unknown as T;
    }
    if (obj !== null && typeof obj === 'object') {
      const newObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          newObj[key] = replaceImplantologists(obj[key]);
        }
      }
      return newObj as T;
    }
    return obj;
  };

  const doctorsData = replaceImplantologists(rawDoctors).map(doctor => {
    if (doctor.id === 'vipul') {
      let updatedBio = doctor.briefIntro || '';
      
      updatedBio = updatedBio.replace(/PROFESSIONAL PROFILE/g, "વ્યાવસાયિક પ્રોફાઇલ:");
      
      updatedBio = updatedBio.replace(
        /Dr\. Vipul Patel has been practicing as a Dental Implantologist in Rajkot since 2012\./g,
        "ડૉ. વિપુલ પટેલ 2012થી રાજકોટમાં Dental Implantologist તરીકે પ્રેક્ટિસ કરી રહ્યા છે."
      );
      updatedBio = updatedBio.replace(
        /Dr\. Vipul Patel has been practicing as a Dental Implant Surgeon in Rajkot since 2012\./g,
        "ડૉ. વિપુલ પટેલ 2012થી રાજકોટમાં Dental Implantologist તરીકે પ્રેક્ટિસ કરી રહ્યા છે."
      );

      updatedBio = updatedBio.replace(
        /He has completed “Masters in Implantology, from USA”/g,
        "તેમણે USAમાંથી “Masters in Implantology” પૂર્ણ કર્યું છે."
      );
      updatedBio = updatedBio.replace(
        /He has completed "Masters in Implantology, from USA"/g,
        "તેમણે USAમાંથી “Masters in Implantology” પૂર્ણ કર્યું છે."
      );

      updatedBio = updatedBio.replace(
        /He completed his Master of Dental Surgery \(MDS\) in Oral &maxillofacial surgery from Rajasthan University and health science\./g,
        "તેમણે Rajasthan University and Health Sciencesમાંથી Oral & Maxillofacial Surgeryમાં Master of Dental Surgery (MDS) પૂર્ણ કર્યું છે."
      );
      updatedBio = updatedBio.replace(
        /He completed his Master of Dental Surgery \(MDS\) in Oral & Maxillofacial Surgery from Rajasthan University and Health Sciences\./g,
        "તેમણે Rajasthan University and Health Sciencesમાંથી Oral & Maxillofacial Surgeryમાં Master of Dental Surgery (MDS) પૂર્ણ કર્યું છે."
      );

      updatedBio = updatedBio.replace(
        /He completed his Master of Dental Surgery \(MDS\) in Oral Medicine and Radiology from Bhavnagar University\./g,
        "તેમણે Bhavnagar Universityમાંથી Oral Medicine and Radiologyમાં Master of Dental Surgery (MDS) પૂર્ણ કર્યું છે."
      );

      updatedBio = updatedBio.replace(
        /He earned his Bachelor of Dental Surgery \(BDS\) from Government Dental College, Ahmedabad\./g,
        "તેમણે Government Dental College, Ahmedabadમાંથી Bachelor of Dental Surgery (BDS)ની ડિગ્રી મેળવી છે."
      );

      updatedBio = updatedBio.replace(
        /He has extensive experience in oral surgery and advanced implant dentistry\./g,
        "તેમને Oral Surgery અને Advanced Implant Dentistryનો વ્યાપક અનુભવ છે."
      );

      updatedBio = updatedBio.replace(/PROFESSIONAL MEMBERSHIPS/g, "વ્યાવસાયિક સભ્યપદ:");

      updatedBio = updatedBio.replace(
        /Active Member of International Congress of Oral Implantologists \(ICOI\)/g,
        "International Congress of Oral Implantologists (ICOI)ના સક્રિય સભ્ય"
      );

      updatedBio = updatedBio.replace(
        /Life Member of Indian Society of Oral Implantology \(ISOI\)/g,
        "Indian Society of Oral Implantology (ISOI)ના આજીવન સભ્ય"
      );

      updatedBio = updatedBio.replace(
        /Active Member of Indian Dental Association \(IDA\)/g,
        "Indian Dental Association (IDA)ના સક્રિય સભ્ય"
      );

      return {
        ...doctor,
        briefIntro: updatedBio
      };
    }
    if (doctor.id === 'kinjal') {
      let updatedBio = doctor.briefIntro || '';
      
      updatedBio = updatedBio.replace(/PROFESSIONAL PROFILE/g, "વ્યાવસાયિક પ્રોફાઇલ:");
      
      updatedBio = updatedBio.replace(
        /Dr\. Kinjal Patel is an Aesthetic Dentist and Dental Implant Surgeon practicing in Rajkot since 2012\./g,
        "ડૉ. કિંજલ પટેલ 2012થી રાજકોટમાં એસ્થેટિક ડેન્ટિસ્ટ અને ડેન્ટલ ઇમ્પ્લાન્ટોલોજિસ્ટ તરીકે પ્રેક્ટિસ કરી રહ્યા છે."
      );

      updatedBio = updatedBio.replace(
        /She completed her Bachelor of Dental Surgery \(BDS\) from Government Dental College, Jamnagar\./g,
        "તેમણે Government Dental College, Jamnagarમાંથી Bachelor of Dental Surgery (BDS)ની ડિગ્રી મેળવી છે."
      );

      updatedBio = updatedBio.replace(
        /She has more than (?:11|14) years of clinical experience with extensive expertise in oral surgery and aesthetic dentistry\./g,
        "તેમને 14 વર્ષથી વધુનો ક્લિનિકલ અનુભવ તથા ઓરલ સર્જરી અને એસ્થેટિક ડેન્ટિસ્ટ્રીમાં વ્યાપક નિપુણતા છે."
      );

      updatedBio = updatedBio.replace(/PROFESSIONAL MEMBERSHIPS/g, "વ્યાવસાયિક સભ્યપદ:");

      updatedBio = updatedBio.replace(
        /Active Member of International Congress of Oral Implantologists \(ICOI\)/g,
        "International Congress of Oral Implantologists (ICOI)ના સક્રિય સભ્ય"
      );

      updatedBio = updatedBio.replace(
        /Life Member of Indian Society of Oral Implantology \(ISOI\)/g,
        "Indian Society of Oral Implantology (ISOI)ના આજીવન સભ્ય"
      );

      updatedBio = updatedBio.replace(
        /Active Member of Indian Dental Association \(IDA\)/g,
        "Indian Dental Association (IDA)ના સક્રિય સભ્ય"
      );

      // 3. PERSONAL PHILOSOPHY
      const philosophyRegex = /PERSONAL PHILOSOPHY\s*[\r\n]+She actively implements valuable learnings from renowned mentors to continuously provide the highest standard of dental care:\s*[\r\n]+• Santosh Nair\s*[\r\n]+• Sandeep Maheshwari\s*[\r\n]+• Sadhguru/gi;

      const philosophyReplacement = `વ્યક્તિગત વિચારધારા:

ડૉ. કિંજલ પટેલ એક ઉત્સાહી ઉદ્યોગસાહસિક છે, જે દરેક દર્દીને ઉચ્ચતમ ધોરણની ડેન્ટલ કેર પૂરી પાડવા માટે સતત પ્રયત્નશીલ રહે છે.

તેઓ સતત શીખવા અને વ્યાવસાયિક વિકાસ માટે ઉત્સાહી છે.

તેઓ નીચેના પ્રખ્યાત માર્ગદર્શકો પાસેથી મેળવેલા મૂલ્યવાન જ્ઞાનને સક્રિયપણે અમલમાં મૂકે છે:

• Santosh Nair
• Sandeep Maheshwari
• Sadhguru

તેઓ પોતાના વ્યાવસાયિક અને આધ્યાત્મિક વિચારસરણીને મજબૂત બનાવવા માટે જીવનચરિત્રો, નેતૃત્વ સંબંધિત પુસ્તકો અને મહાન લેખકોના જીવનપાઠ વાંચવાનું પણ પસંદ કરે છે.`;

      updatedBio = updatedBio.replace(philosophyRegex, philosophyReplacement);

      // 4. ADVANCED TRAINING, FELLOWSHIPS & CERTIFICATIONS
      updatedBio = updatedBio.replace(/ADVANCED TRAINING, FELLOWSHIPS & CERTIFICATIONS/g, "અદ્યતન તાલીમ, ફેલોશિપ્સ અને સર્ટિફિકેશન્સ:");
      updatedBio = updatedBio.replace(
        /• Fellowship Accreditation – Indian Society of Oral Implantology/g,
        "• ફેલોશિપ એક્રેડિટેશન – ઇન્ડિયન સોસાયટી ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજી"
      );
      updatedBio = updatedBio.replace(
        /• Fellowship in Implantology – International Congress of Oral Implantologists \(USA\)/g,
        "• ઇમ્પ્લાન્ટોલોજીમાં ફેલોશિપ – ઇન્ટરનેશનલ કોંગ્રેસ ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજિસ્ટ્સ (USA)"
      );
      updatedBio = updatedBio.replace(
        /• Special interest in Pediatric Dentistry/g,
        "• પીડિયાટ્રિક ડેન્ટિસ્ટ્રી (બાળકોના દાંતની સારવાર)માં ખાસ રસ"
      );
      updatedBio = updatedBio.replace(
        /• Special interest in Single Sitting Root Canal Treatment/g,
        "• સિંગલ સીટીંગ રૂટ કેનાલ ટ્રીટમેન્ટમાં ખાસ રસ"
      );
      updatedBio = updatedBio.replace(
        /• Attended numerous National Endodontic Conferences/g,
        "• અનેક રાષ્ટ્રીય એન્ડોડોન્ટિક કોન્ફરન્સમાં હાજરી આપી"
      );
      updatedBio = updatedBio.replace(
        /• Attended numerous International Endodontic Conferences/g,
        "• અનેક આંતરરાષ્ટ્રીય એન્ડોડોન્ટિક કોન્ફરન્સમાં હાજરી આપી"
      );
      updatedBio = updatedBio.replace(
        /• Participated in various National Pediatric Dentistry Symposiums/g,
        "• વિવિધ રાષ્ટ્રીય પીડિયાટ્રિક ડેન્ટિસ્ટ્રી સિમ્પોઝિયમમાં ભાગ લીધો"
      );
      updatedBio = updatedBio.replace(
        /• Participated in International Pediatric Dentistry Symposiums/g,
        "• આંતરરાષ્ટ્રીય પીડિયાટ્રિક ડેન્ટિસ્ટ્રી સિમ્પોઝિયમમાં ભાગ લીધો"
      );
      updatedBio = updatedBio.replace(
        /• Trained under several renowned National Speakers/g,
        "• અનેક પ્રખ્યાત રાષ્ટ્રીય વક્તાઓ હેઠળ તાલીમ મેળવી"
      );
      updatedBio = updatedBio.replace(
        /• Trained under several renowned International Speakers/g,
        "• અનેક પ્રખ્યાત આંતરરાષ્ટ્રીય વક્તાઓ હેઠળ તાલીમ મેળવી"
      );

      // 5. LEADERSHIP & MANAGEMENT
      updatedBio = updatedBio.replace(/LEADERSHIP & MANAGEMENT/g, "લીડરશિપ અને મેનેજમેન્ટ:");
      updatedBio = updatedBio.replace(
        /Apart from her clinical expertise, Dr\. Kinjal Patel has successfully completed the Gurukul Business Management Program conducted by Santosh Nair\./g,
        "તેમની ક્લિનિકલ કુશળતા ઉપરાંત, ડૉ. કિંજલ પટેલે સંતોષ નાયર દ્વારા સંચાલિત ગુરુકુળ બિઝનેસ મેનેજમેન્ટ પ્રોગ્રામ સફળતાપૂર્વક પૂર્ણ કર્યો છે."
      );
      updatedBio = updatedBio.replace(
        /She applies modern management principles to support and strengthen the entire dental team\./g,
        "તેઓ સમગ્ર ડેન્ટલ ટીમને મદદરૂપ બનવા અને મજબૂત કરવા માટે આધુનિક મેનેજમેન્ટના સિદ્ધાંતો લાગુ કરે છે."
      );
      updatedBio = updatedBio.replace(
        /She strongly believes in teamwork, leadership, and continuous improvement\./g,
        "તેઓ ટીમવર્ક, નેતૃત્વ અને સતત સુધારણામાં દૃઢ વિશ્વાસ ધરાવે છે."
      );
      updatedBio = updatedBio.replace(
        /She is dedicated to mentoring freshly graduated dentists and dental assistants to improve the overall quality of dental healthcare\./g,
        "તેઓ ડેન્ટલ હેલ્થકેરની એકંદર ગુણવત્તા સુધારવા માટે નવા સ્નાતક થયેલા દંત ચિકિત્સકો અને ડેન્ટલ આસિસ્ટન્ટ્સને માર્ગદર્શન આપવા માટે સમર્પિત છે."
      );

      // 6. CLINICAL EXPERIENCE
      updatedBio = updatedBio.replace(/CLINICAL EXPERIENCE/g, "ક્લિનિકલ અનુભવ:");
      updatedBio = updatedBio.replace(
        /• Aesthetic Dentist practicing in Rajkot since 2012/g,
        "• 2012થી રાજકોટમાં એસ્થેટિક ડેન્ટિસ્ટ તરીકે પ્રેક્ટિસ કરી રહ્યા છે"
      );
      updatedBio = updatedBio.replace(
        /• Dental Implant Surgeon/g,
        "• ડેન્ટલ ઇમ્પ્લાન્ટ સર્જન"
      );
      updatedBio = updatedBio.replace(
        /• More than 14 Years of Clinical Experience/g,
        "• 14 વર્ષથી વધુનો ક્લિનિકલ અનુભવ"
      );
      updatedBio = updatedBio.replace(
        /• Extensive Experience in Oral Surgery/g,
        "• ઓરલ સર્જરીમાં વ્યાપક અનુભવ"
      );
      updatedBio = updatedBio.replace(
        /• Extensive Experience in Aesthetic Dentistry/g,
        "• એસ્થેટિક ડેન્ટિસ્ટ્રીમાં વ્યાપક અનુભવ"
      );
      updatedBio = updatedBio.replace(
        /• Special Interest in Pediatric Dentistry/g,
        "• પીડિયાટ્રિક ડેન્ટિસ્ટ્રીમાં ખાસ રસ"
      );
      updatedBio = updatedBio.replace(
        /• Special Interest in Single Sitting Root Canal Treatment/g,
        "• સિંગલ સીટીંગ રૂટ કેનાલ ટ્રીટમેન્ટમાં ખાસ રસ"
      );

      // 7. AWARDS & RECOGNITION
      updatedBio = updatedBio.replace(/AWARDS & RECOGNITION/g, "પુરસ્કારો અને સન્માન:");
      updatedBio = updatedBio.replace(
        /• Awarded "Aesthetic Dentist of the Year"/g,
        "• \"એસ્થેટિક ડેન્ટિસ્ટ ઓફ ધ યર\" એવોર્ડથી સન્માનિત"
      );
      updatedBio = updatedBio.replace(
        /• Awarded "Best Dental Hospital in India"/g,
        "• \"બેસ્ટ ડેન્ટલ હોસ્પિટલ ઇન ઇન્ડિયા\" એવોર્ડથી સન્માનિત"
      );
      updatedBio = updatedBio.replace(
        /• Recognition received from FAMDENT in 2022, one of India's most prestigious organizations in Dentistry\./g,
        "• ડેન્ટિસ્ટ્રીમાં ભારતની સૌથી પ્રતિષ્ઠિત સંસ્થાઓમાંની એક એવા FAMDENT તરફથી 2022 માં સન્માન પ્રાપ્ત થયું."
      );

      return {
        ...doctor,
        briefIntro: updatedBio
      };
    }
    return doctor;
  });

  return (
    <div id="doctors-page-view" className="relative pt-[108px] sm:pt-[124px] lg:pt-[140px] bg-slate-50/50 min-h-screen">
      <style>{`
        /* Target Dr. Vipul Patel's Gujarati Bio Section headings and paragraphs */
        .vipul-gujarati-bio .space-y-8 h4 {
          font-family: 'Noto Sans Gujarati', sans-serif !important;
          font-weight: 700 !important;
          color: #0B1B33 !important;
          text-transform: uppercase !important;
        }
        .vipul-gujarati-bio .space-y-8 p, .vipul-gujarati-bio .space-y-8 li {
          font-family: 'Noto Sans Gujarati', sans-serif !important;
          font-weight: 600 !important;
          color: #1E3A5F !important;
        }
      `}</style>
      
      {/* 1. Header Hero Banner */}
      <section className="bg-gradient-to-b from-[#0ea5e9]/10 via-[#0D9488]/5 to-transparent py-12 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-black text-[#0ea5e9] tracking-widest uppercase block">
            અમારા વરિષ્ઠ નિષ્ણાત ક્લિનિશિયનોને મળો
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B33] tracking-tight leading-tight">
            અમારા નિષ્ણાત ડૉક્ટરોને મળો
          </h1>
          <div className="h-1.5 w-20 bg-gradient-to-r from-[#0ea5e9] to-[#0D9488] mx-auto rounded-full mt-3" />
          <p 
            className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-2"
            style={{ fontFamily: "'Noto Sans Gujarati', sans-serif", fontWeight: 600 }}
          >
            Patel Dental Hospital ખાતે ઉચ્ચ ક્લિનિકલ ધોરણો, કડક સ્ટેરાઇલ સેફ્ટી પ્રોટોકોલ્સ અને અદ્યતન પીડારહિત સારવાર આપતા અમારા ઉચ્ચ લાયકાત ધરાવતા વરિષ્ઠ ડેન્ટિસ્ટ્સને મળો.
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
                    src={doctor.img || null}
                    alt={doctor.id === 'vipul' ? 'ડૉ. વિપુલ પટેલ' : doctor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Doctor Info Column (Desktop: 60-65% / 7-8 cols out of 12) */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-5">
                
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-[#0D9488] tracking-widest uppercase block leading-none">
                      {doctor.id === 'vipul' ? 'મેક્સિલોફેશિયલ સર્જન અને ઇમ્પ્લાન્ટોલોજિસ્ટ' : doctor.id === 'kinjal' ? 'રૂટ કેનાલ નિષ્ણાત અને ઇમ્પ્લાન્ટોલોજિસ્ટ' : doctor.designation}
                    </span>
                    {doctor.experience && (
                      <span className={`text-[10px] bg-sky-50 text-sky-700 border border-sky-100 px-2.5 py-0.5 rounded-full font-extrabold tracking-wider`}>
                        {doctor.id === 'vipul' ? '14+ વર્ષનો અનુભવ' : doctor.id === 'kinjal' ? '14+ વર્ષનો અનુભવ' : `${doctor.experience.endsWith('+') ? doctor.experience : `${doctor.experience}+`} Years Exp.`}
                      </span>
                    )}
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B33] tracking-tight">
                    {doctor.id === 'vipul' ? 'ડૉ. વિપુલ પટેલ' : doctor.id === 'kinjal' ? 'ડૉ. કિંજલ પટેલ' : doctor.name}
                  </h2>
                  <div className="h-1.5 w-16 bg-gradient-to-r from-[#0ea5e9] to-[#0D9488] rounded-full mt-2" />

                  {/* Highlights & Qualifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {doctor.bdsInstitution && (
                      <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 flex items-start space-x-2.5">
                        <GraduationCap className="h-4.5 w-4.5 text-[#0ea5e9] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-extrabold text-[#0B1B33]">
                            {doctor.id === 'vipul' || doctor.id === 'kinjal' ? 'લાયકાત' : 'Qualification'}
                          </p>
                          <div className="text-xs text-gray-500 font-sans mt-0.5 leading-normal space-y-0.5">
                            {doctor.id === 'vipul' ? (
                              <>
                                <span className="block">Oral & Maxillofacial Surgeryમાં MDS</span>
                                <span className="block">Oral Medicine & Radiologyમાં MDS</span>
                                <span className="block">Implant Prosthodonticsમાં Mastership (USA)</span>
                              </>
                            ) : doctor.id === 'kinjal' ? (
                              <>
                                <span className="block">BDS (Government Dental College, Jamnagar)</span>
                                <span className="block">ઇમ્પ્લાન્ટ પ્રોસ્ટોડોન્ટિક્સમાં ફેલોશિપ (USA)</span>
                              </>
                            ) : (
                              <span>{doctor.titles} ({doctor.bdsInstitution})</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Stats Grid */}
                  {doctor.stats && doctor.stats.length > 0 && (() => {
                    let displayedStats = doctor.stats;
                    if (doctor.id === 'vipul') {
                      displayedStats = [
                        { value: '14+', label: 'વર્ષનો અનુભવ' },
                        { value: '21k+', label: 'સ્માઇલ્સમાં પરિવર્તન' },
                        { value: '100%', label: 'સ્ટેરિલાઇઝેશન સ્ટાન્ડર્ડ' }
                      ];
                    } else if (doctor.id === 'kinjal') {
                      displayedStats = [
                        { value: '14+', label: 'વર્ષનો અનુભવ' },
                        { value: '18k+', label: 'સ્માઇલ્સમાં પરિવર્તન' },
                        { value: '100%', label: 'સ્ટેરિલાઇઝેશન સ્ટાન્ડર્ડ' }
                      ];
                    }

                    return (
                      <div className={`grid ${displayedStats.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'} gap-3 pt-2`}>
                        {displayedStats.map((stat, i) => (
                          <div key={i} className="p-3 bg-slate-50/80 rounded-xl text-center border border-slate-100">
                            <span className="block font-display font-black text-sm sm:text-base md:text-lg lg:text-xl text-[#0B1B33]">
                              {stat.value}
                            </span>
                            <span 
                              className={`block text-[8px] md:text-[9px] text-gray-400 uppercase tracking-wider mt-1 leading-none ${
                                !['વર્ષનો અનુભવ', 'સ્માઇલ્સમાં પરિવર્તન', 'સ્ટેરિલાઇઝેશન સ્ટાન્ડર્ડ'].includes(stat.label) ? 'font-black' : ''
                              }`}
                              style={['વર્ષનો અનુભવ', 'સ્માઇલ્સમાં પરિવર્તન', 'સ્ટેરિલાઇઝેશન સ્ટાન્ડર્ડ'].includes(stat.label) ? { fontFamily: "'Noto Sans Gujarati', sans-serif", fontWeight: 600 } : undefined}
                            >
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <button
                    onClick={() => openAppointmentModal()}
                    className="flex-1 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-extrabold py-3.5 px-6 rounded-xl transition duration-300 uppercase tracking-widest cursor-pointer text-center shadow-sm hover:shadow-md"
                  >
                    {doctor.id === 'vipul' || doctor.id === 'kinjal' ? 'ફ્રી પુછપરછ માટે બુક કરો' : 'Book Free Consultation'}
                  </button>
                  {doctor.id === 'vipul' || doctor.id === 'kinjal' ? (
                    <a
                      href={getWhatsAppUrl(`Hello Patel Dental Hospital, I would like to book a free consultation with ${doctor.id === 'vipul' ? 'Dr. Vipul Patel' : doctor.name}. Please share the available appointment slots.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-[#0B1B33] text-xs font-extrabold py-3.5 px-6 rounded-xl transition duration-300 uppercase tracking-widest cursor-pointer text-center flex items-center justify-center"
                    >
                      {doctor.id === 'vipul' || doctor.id === 'kinjal' ? 'WhatsApp કરો' : 'WhatsApp Us'}
                    </a>
                  ) : (
                    <button
                      onClick={() => setActiveDoctor(doctor)}
                      className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-[#0B1B33] text-xs font-extrabold py-3.5 px-6 rounded-xl transition duration-300 uppercase tracking-widest cursor-pointer text-center"
                    >
                      View Full Profile Modal
                    </button>
                  )}
                </div>

              </div>
            </div>

            {/* Full Biography Below Header Area Across Full Width */}
            <div className={`mt-8 pt-8 border-t border-slate-150 ${doctor.id === 'vipul' || doctor.id === 'kinjal' ? 'vipul-gujarati-bio' : ''}`}>
              <DoctorBioRenderer bioText={doctor.briefIntro} doctorName={doctor.id === 'vipul' ? 'ડૉ. વિપુલ પટેલ' : doctor.name} />

              {/* Clinical Specializations & Expertises */}
              {doctor.expertises && doctor.expertises.length > 0 && doctor.id !== 'vipul' && doctor.id !== 'kinjal' && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-400 mb-3">
                    Specialized Procedures & Clinical Expertise
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {doctor.expertises.map((exp) => {
                      if (doctor.id === 'vipul' && (exp.title === 'Microscopic Endodontics' || exp.title === 'Maxillofacial Surgery')) {
                        return {
                          title: 'Maxillofacial Surgery',
                          desc: 'Expert surgical management of facial trauma, impacted teeth, jaw deformities, and oral and facial conditions, with precise treatment focused on restoring function and facial aesthetics.'
                        };
                      }
                      if (doctor.id === 'kinjal' && (exp.title === 'Full Smile Makeovers' || exp.title === 'Pediatric Dentistry')) {
                        return {
                          title: 'Pediatric Dentistry',
                          desc: 'Specialized dental care for children focused on healthy teeth and gums, gentle treatments, preventive care, and creating a comfortable, positive dental experience.'
                        };
                      }
                      return exp;
                    }).map((exp, idx) => (
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
                          src={activeDoctor.img || null} 
                          alt={activeDoctor.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="text-center sm:text-left space-y-2">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <span className="text-[10px] font-black text-[#0D9488] tracking-widest uppercase block leading-none">
                            {activeDoctor.id === 'vipul' ? 'મેક્સિલોફેશિયલ સર્જન અને ઇમ્પ્લાન્ટોલોજિસ્ટ' : activeDoctor.designation}
                          </span>
                          {activeDoctor.branch && (
                            <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              📍 {activeDoctor.branch}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1B33] tracking-tight">
                          {activeDoctor.id === 'vipul' ? 'ડૉ. વિપુલ પટેલ' : activeDoctor.name}, <span className="text-[#0ea5e9] font-black">{activeDoctor.titles}</span>
                        </h3>
                        <p className="text-gray-500 font-sans text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
                          {activeDoctor.id === 'vipul' ? 'Senior dental practitioner leading cosmetic restoration and immediate implant loading procedures at Patel Dental Hospital.' : 'Senior dental practitioner leading cosmetic restoration and immediate implant loading procedures at Patel Dental Hospital.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-10 space-y-8">
                    
                    {/* Clinical Biography */}
                    <div className={activeDoctor.id === 'vipul' || activeDoctor.id === 'kinjal' ? 'vipul-gujarati-bio' : ''}>
                      <DoctorBioRenderer bioText={activeDoctor.briefIntro} doctorName={activeDoctor.id === 'vipul' ? 'ડૉ. વિપુલ પટેલ' : activeDoctor.name} />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                      {activeDoctor.stats.map((stat, i) => {
                        let finalLabel = stat.label;
                        if (activeDoctor.id === 'vipul') {
                          if (stat.label === 'Years Experience') finalLabel = 'વર્ષનો અનુભવ';
                          else if (stat.label === 'Smiles Transformed') finalLabel = 'સ્માઇલ્સમાં પરિવર્તન';
                          else if (stat.label === 'Sterilization Standard') finalLabel = 'સ્ટેરિલાઇઝેશન સ્ટાન્ડર્ડ';
                        }
                        return (
                          <div key={i} className="p-4 bg-slate-50 rounded-xl text-center border border-slate-100">
                            <span className="block font-display font-black text-xl sm:text-2xl text-[#0B1B33]">
                              {stat.value}
                            </span>
                            <span 
                              className={`block text-[9px] text-gray-400 uppercase tracking-wider mt-1.5 leading-none ${
                                !['વર્ષનો અનુભવ', 'સ્માઇલ્સમાં પરિવર્તન', 'સ્ટેરિલાઇઝેશન સ્ટાન્ડર્ડ'].includes(finalLabel) ? 'font-black' : ''
                              }`}
                              style={['વર્ષનો અનુભવ', 'સ્માઇલ્સમાં પરિવર્તન', 'સ્ટેરિલાઇઝેશન સ્ટાન્ડર્ડ'].includes(finalLabel) ? { fontFamily: "'Noto Sans Gujarati', sans-serif", fontWeight: 600 } : undefined}
                            >
                              {finalLabel}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Qualifications */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-400">
                        {activeDoctor.id === 'vipul' ? 'Qualifications & Credentials' : 'Qualifications & Credentials'}
                      </h4>
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
                        {activeDoctor.expertises.map((exp) => {
                          if (activeDoctor.id === 'vipul' && (exp.title === 'Microscopic Endodontics' || exp.title === 'Maxillofacial Surgery')) {
                            return {
                              title: 'Maxillofacial Surgery',
                              desc: 'Expert surgical management of facial trauma, impacted teeth, jaw deformities, and oral and facial conditions, with precise treatment focused on restoring function and facial aesthetics.'
                            };
                          }
                          if (activeDoctor.id === 'kinjal' && (exp.title === 'Full Smile Makeovers' || exp.title === 'Pediatric Dentistry')) {
                            return {
                              title: 'Pediatric Dentistry',
                              desc: 'Specialized dental care for children focused on healthy teeth and gums, gentle treatments, preventive care, and creating a comfortable, positive dental experience.'
                            };
                          }
                          return exp;
                        }).map((exp, idx) => (
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
