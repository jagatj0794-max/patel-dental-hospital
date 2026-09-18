/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, Award, Cpu, Play, CheckCircle2, UserCheck, ShieldCheck, 
  MessageCircle, HeartHandshake, Sparkles, Star, Clock, Microscope, BookOpen, ChevronDown
} from 'lucide-react';
import { useSEO } from '../utils/seo';
import { Doctor, DentalVideo, TechnologyItem } from '../types';
import { DEFAULT_DOCTORS } from '../data/doctors';
import { doctorService } from '../utils/doctorData';
import { technologyService } from '../utils/technologyData';
import { videoService, DEFAULT_VIDEOS } from '../utils/videoData';
import { getWhatsAppUrl } from '../utils/contactData';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { Mp4ReelPlayer } from '../components/Mp4ReelPlayer';
import PatientMomentsGallery from '../components/PatientMomentsGallery';
import HospitalGallery from '../components/HospitalGallery';
import { PatientMoment } from '../types';
import { MediaImage } from './SmileGallery';

interface WhyChooseUsGujaratiProps {
  openAppointmentModal: (preselectedTreatment?: string) => void;
  doctorsList?: Doctor[];
  videosList?: DentalVideo[];
  patientMoments?: PatientMoment[];
  mediaImages?: MediaImage[];
}

function deduplicateText(text: string): string {
  if (!text) return '';
  const trimmed = text.trim();
  const paragraphs = trimmed.split(/\n+/).map(p => p.trim()).filter(Boolean);
  if (paragraphs.length === 2 && paragraphs[0] === paragraphs[1]) {
    return paragraphs[0];
  }
  const len = trimmed.length;
  if (len % 2 === 0) {
    const half = len / 2;
    const firstHalf = trimmed.substring(0, half).trim();
    const secondHalf = trimmed.substring(half).trim();
    if (firstHalf === secondHalf) {
      return firstHalf;
    }
  }
  return trimmed;
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
        "એટ્રોફિક મેન્ડિબલમાં નર્વ ટ્રાન્સપોઝિશન ટેકનિક – ડૉ. માઝેમ تમિમી દ્વારા"
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
      title: "ઇમિડિયેટ લોડિંગ અને સેમ-デー દાંત (4 પ્રોગ્રામ્સ)",
      description: "એક અઠવાડિયામાં ઇમ્પ્લાન્ટ-સપોર્ટેડ ફિક્સ દાંત આપવા માટે, જે ફક્ત ડૉ. વિપુલ પટેલ દ્વારા કરવામાં આવે છે.",
      bullets: [
        "ઇમ્પ્લાન્ટ ડેન્ટિસ્ટ્રીમાં સેમ ડે રિસ્ટોરેશન – સફળતા માટેના માપદંડ – ડૉ. કોસ્ટા નિકોલોપોલોસ દ્વારા",
        "Densah Burનો ઉપયોગ કરીને Osseodensification સાથે All-on-4 અને All-on-6 કેસના પરિણામોમાં સુધારો – ડૉ. જેક ટી. ક્રાઉઝર દ્વારા",
        "પ્ટેરીગોઇડ ઇમ્પ્લાન્ટ્સ, All-on-4, All-on-6 અને ઇમિડિયેટ લોડિંગ – ડૉ. રૂડબર્ગ ઓમરી (ઇઝરાયેલ) દ્વારા",
        "વન-ડે રિસ્ટોરેશન સાથે ઇમિડિયેટ ઇમ્મ્પ્લાન્ટ પ્લેસમેન્ટ – આઇઝેક તાવિલ દ્વારા"
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
    <div className="space-y-8 text-left gujarati-text">
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
                <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
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
    <div className="space-y-8 text-left gujarati-text">
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
            તેણે Government Dental College, Jamnagarમાંથી Bachelor of Dental Surgery (BDS)ની ડિગ્રી મેળવી છે.
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

const gujaratiWhyChooseTechCards = [
  {
    title: "3D CBCT સ્કેનર",
    description: "ઇમ્પ્લાન્ટ સર્જરી પહેલાં 3D માં તમારા હાડકાના ચોક્કસ વોલ્યુમ અને નસની સ્થિતિ જોઈ શકાય છે. પ્રક્રિયા દરમિયાન કોઈ આશ્ચર્ય રહેતું નથી."
  },
  {
    title: "અદ્યતન ડેન્ટલ ટ્રીટમેન્ટ ચેર",
    description: "આરામદાયક, ચોક્કસ અને કાર્યક્ષમ ડેન્ટલ સારવાર માટે ડિઝાઇન કરવામાં આવી છે, જેથી દર્દીને વધુ સરળ અને આરામદાયક સારવારનો અનુભવ મળે."
  },
  {
    title: "અદ્યતન ઇમ્પ્લાન્ટ સર્જરી સિસ્ટમ",
    description: "ચોકસાઈથી નિયંત્રિત ઇમ્પ્લાન્ટ સર્જરી ટેકનોલોજી, જે ચોક્કસ, સુરક્ષિત અને કાર્યક્ષમ ડેન્ટલ ઇમ્પ્લાન્ટ પ્રક્રિયાઓ માટે વધુ સારું નિયંત્રણ અને વિશ્વસનીયતા આપે છે."
  },
  {
    title: "પીઝોઇલેક્ટ્રિક સર્જિકલ યુનિટ",
    description: "નસ અથવા સોફ્ટ ટિશ્યુને નુકસાન પહોંચાડ્યા વિના હાડકું કાપવામાં મદદ કરે છે. જ્યારે વિઝડમ ટૂથ અથવા ઇમ્પ્લાન્ટ સાઇટ નસની નજીક હોય ત્યારે ઉપયોગમાં લેવાય છે."
  },
  {
    title: "ડેન્ટલ લેસર યુનિટ",
    description: "ઓછા રક્તસ્ત્રાવ અને ઝડપી હીલિંગ સાથે પેઢાંની સારવાર."
  },
  {
    title: "3D ઇન્ટ્રાઓરલ સ્કેનર",
    description: "ડિજિટલ ઇમ્પ્રેશન. ઇમ્પ્રેશન પુટીથી ગેગિંગ થતું નથી."
  },
  {
    title: "ડિજિટલ અલ્ટ્રાસોનિક ક્લીનર",
    description: "ડેન્ટલ ઇન્સ્ટ્રુમેન્ટ્સ અને સાધનોની સંપૂર્ણ અને અસરકારક સફાઈ માટે અદ્યતન અલ્ટ્રાસોનિક ક્લીનિંગ ટેકનોલોજી."
  },
  {
    title: "Class B Autoclave Melag",
    description: "દરેક ઇન્સ્ટ્રુમેન્ટની હોસ્પિટલ-સ્તરની સ્ટેરિલાઇઝેશન, જે ટ્રેક અને વેલિડેટ કરવામાં આવે છે."
  },
  {
    title: "ડિજિટલ X-Ray / RVG",
    description: "ઝડપી નિદાન અને સારવાર આયોજન માટે થોડી જ સેકન્ડમાં સ્ક્રીન પર ઇમેજ."
  },
  {
    title: "ઇન્ટ્રાઓરલ કેમેરા",
    description: "તમારા દાંતની સ્પષ્ટ અને નજીકથી તસવીરો, જેથી તમને તમારા નિદાન અને સારવારને સમજવામાં મદદ મળે."
  },
  {
    title: "DSLR કેમેરા સાથે ક્લિનિકલ ફોટોગ્રાફી",
    description: "ચોક્કસ ડોક્યુમેન્ટેશન, સારવાર આયોજન અને તમારા સ્માઇલ ટ્રાન્સફોર્મેશનને ટ્રેક કરવા માટે ઉચ્ચ ગુણવત્તાની ક્લિનિકલ તસવીરો."
  }
];

function translateWhyChooseTechItem(item: TechnologyItem, index: number): TechnologyItem {
  const titleLower = (item.title || '').toLowerCase();
  
  let matchIndex = -1;
  if (titleLower.includes('cbct') || titleLower.includes('3d cbct')) {
    matchIndex = 0;
  } else if (titleLower.includes('chair') || titleLower.includes('treatment chair')) {
    matchIndex = 1;
  } else if (titleLower.includes('implant surgery system') || titleLower.includes('implant surgery') || titleLower.includes('implant system')) {
    matchIndex = 2;
  } else if (titleLower.includes('piezoelectric') || titleLower.includes('piezo')) {
    matchIndex = 3;
  } else if (titleLower.includes('laser')) {
    matchIndex = 4;
  } else if (titleLower.includes('intraoral scanner') || titleLower.includes('3d intraoral')) {
    matchIndex = 5;
  } else if (titleLower.includes('ultrasonic') || titleLower.includes('cleaner')) {
    matchIndex = 6;
  } else if (titleLower.includes('autoclave') || titleLower.includes('melag')) {
    matchIndex = 7;
  } else if (titleLower.includes('rvg') || titleLower.includes('x-ray') || titleLower.includes('xray')) {
    matchIndex = 8;
  } else if (titleLower.includes('intraoral camera')) {
    matchIndex = 9;
  } else if (titleLower.includes('dslr') || titleLower.includes('photography')) {
    matchIndex = 10;
  } else {
    matchIndex = index;
  }

  const translation = gujaratiWhyChooseTechCards[matchIndex] || gujaratiWhyChooseTechCards[index % gujaratiWhyChooseTechCards.length];
  return {
    ...item,
    title: translation.title,
    short_description: translation.description,
    description: translation.description
  };
}

function DoctorBioRenderer({ bioText, doctorName }: { bioText: string; doctorName: string }) {
  if (doctorName.includes('વિપુલ') || doctorName.toLowerCase().includes('vipul')) {
    return <VipulGujaratiBioRenderer />;
  }
  if (doctorName.includes('કિંજલ') || doctorName.toLowerCase().includes('kinjal')) {
    return <KinjalGujaratiBioRenderer />;
  }
  return <p className="text-gray-700 font-sans text-sm leading-relaxed">{bioText}</p>;
}

export default function WhyChooseUsGujarati({ 
  openAppointmentModal, 
  doctorsList = [], 
  videosList = [],
  patientMoments,
  mediaImages = []
}: WhyChooseUsGujaratiProps) {
  useSEO({
    title: 'પટેલ ડેન્ટલ હોસ્પિટલ શા માટે પસંદ કરવી? | પટેલ ડેન્ટલ હોસ્પિટલ રાજકોટ',
    description: 'વર્લ્ડ-ક્લાસ ક્લિનિકલ ધોરણો પ્રત્યેની અમારી પ્રતિબદ્ધતા જાણો, જેમાં અનુભવી નિષ્ણાત ડૉક્ટરો, અદ્યતન ડિજિટલ ટેક્નોલોજી અને દર્દીઓના સાચા વિશ્વાસની અમારી પરંપરાનો સમાવેશ થાય છે.',
    keywords: 'Why Choose Patel Dental Hospital, Best Dentist Rajkot, Dr Vipul Patel Rajkot, Dr Kinjal Patel Rajkot, Digital Dentistry Rajkot, Dental Testimonial Videos'
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    return doctorsList.length > 0 ? doctorsList : DEFAULT_DOCTORS;
  });

  const [techItems, setTechItems] = useState<TechnologyItem[]>([]);
  const [techLoading, setTechLoading] = useState(true);

  const [videos, setVideos] = useState<DentalVideo[]>(() => {
    return videosList.length > 0 ? videosList : DEFAULT_VIDEOS;
  });
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      if (doctorsList.length === 0) {
        try {
          const dbDocs = await doctorService.getDoctors();
          if (active && dbDocs && dbDocs.length > 0) {
            setDoctors(dbDocs);
          }
        } catch (err) {
          console.warn('Error loading doctors in WhyChooseUs page:', err);
        }
      }

      try {
        const dbTech = await technologyService.getTechnology();
        if (active) {
          const activeSortedTech = dbTech
            .filter(item => item && item.is_active !== false && (item as any).is_active !== 'false')
            .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
          const translatedTech = activeSortedTech.map((item, idx) => translateWhyChooseTechItem(item, idx));
          setTechItems(translatedTech);
        }
      } catch (err) {
        console.warn('Error loading technology in WhyChooseUs page:', err);
      } finally {
        if (active) setTechLoading(false);
      }

      if (videosList.length === 0) {
        try {
          const dbVideos = await videoService.getVideos();
          if (active && dbVideos && dbVideos.length > 0) {
            setVideos(dbVideos);
          }
        } catch (err) {
          console.warn('Error loading videos in WhyChooseUs page:', err);
        }
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [doctorsList, videosList]);

  const sortedDoctors = [...doctors].sort((a, b) => {
    const isVipulA = (a.id === 'vipul' || a.name.toLowerCase().includes('vipul'));
    const isVipulB = (b.id === 'vipul' || b.name.toLowerCase().includes('vipul'));
    if (isVipulA && !isVipulB) return -1;
    if (!isVipulA && isVipulB) return 1;
    return 0;
  });

  useEffect(() => {
    if (videosList && videosList.length > 0) {
      setVideos(videosList);
    }
  }, [videosList]);

  const mappedReels = videos.map(v => {
    const isMp4 = v.videoPlatform === 'mp4' || v.platform === 'mp4' || v.id.endsWith('.mp4') || v.id.includes('supabase.co');
    const platform = isMp4 ? ('mp4' as const) : ('instagram' as const);
    const url = platform === 'mp4' ? v.id : `https://www.instagram.com/p/${v.id}/`;
    return {
      ...v,
      videoPlatform: platform,
      platform: platform,
      url: url
    };
  }).filter(v => v.videoPlatform === 'instagram' || v.videoPlatform === 'mp4');

  const displayVideos = mappedReels.length > 0 ? mappedReels : videos.map(v => {
    const isMp4 = v.videoPlatform === 'mp4' || v.platform === 'mp4' || v.id.endsWith('.mp4') || v.id.includes('supabase.co');
    const platform = isMp4 ? ('mp4' as const) : ('instagram' as const);
    const url = platform === 'mp4' ? v.id : `https://www.instagram.com/p/${v.id}/`;
    return {
      ...v,
      videoPlatform: platform,
      platform: platform,
      url: url
    };
  }).slice(0, 6);

  return (
    <div id="why-choose-us-page-view" className="bg-[#FAF9FB] min-h-screen gujarati-text">
      
      {/* Dynamic Cover Header Banner */}
      <section className="pt-[160px] sm:pt-[180px] lg:pt-[210px] pb-16 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0ea5e9]/5 via-[#0D9488]/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-[#0D9488] font-black text-xs tracking-widest uppercase flex items-center justify-center gap-1.5 mb-2 gujarati-text">
            <Sparkles className="h-4 w-4 text-[#0ea5e9] animate-pulse" /> રાજકોટની શ્રેષ્ઠ ડેન્ટલ ક્લિનિક
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B33] tracking-tight leading-tight uppercase gujarati-text">
            પટેલ ડેન્ટલ હોસ્પિટલ શા માટે પસંદ કરવી?
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#0ea5e9] to-[#0D9488] mx-auto rounded-full mt-4" />
          <p className="mt-4 text-gray-500 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed gujarati-text">
            વર્લ્ડ-ક્લાસ ક્લિનિકલ ધોરણો પ્રત્યેની અમારી પ્રતિબદ્ધતા જાણો, જેમાં અનુભવી નિષ્ણાત ડૉક્ટરો, અદ્યતન ડિજિટલ ટેક્નોલોજી અને દર્દીઓના સાચા વિશ્વાસની અમારી પરંપરાનો સમાવેશ થાય છે.
          </p>
        </div>
      </section>

      {/* ==================================================
          SECTION 1 — OUR DOCTORS
          ================================================== */}
      <section id="why-choose-doctors-section" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {sortedDoctors.map((doctor, index) => {
            const qualificationText = doctor.id === 'vipul' 
              ? 'MDS, Masters in Implantology (USA)' 
              : `${doctor.titles} (${doctor.bdsInstitution})`;

            const isKinjal = (doctor.id === 'kinjal' || doctor.name.toLowerCase().includes('kinjal'));
            const isVipul = (doctor.id === 'vipul' || doctor.name.toLowerCase().includes('vipul'));
            const imageSrc = isKinjal 
              ? '/Dr. Kinjal Patel.JPG' 
              : isVipul 
                ? '/Dr. Vipul Patel.jpg' 
                : doctor.img;

            return (
              <motion.div
                key={doctor.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 sm:p-8 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Top area displaying only Doctor Image, Doctor Name, and Qualification */}
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                    <div className="w-[150px] shrink-0">
                      <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-50 border border-slate-100 shadow-sm">
                        <img
                          src={imageSrc}
                          alt={doctor.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 flex-grow mt-3 sm:mt-0 text-left">
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0B1B33] tracking-tight">
                        {doctor.id === 'vipul' ? 'ડૉ. વિપુલ પટેલ' : 'ડૉ. કિંજલ પટેલ'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
                        <strong className="text-slate-700 font-bold">લાયકાત:</strong> {doctor.id === 'vipul' ? 'MDS, Masters in Implantology (USA)' : 'BDS, Fellowship in Implant Prosthodontics (USA)'}
                      </p>
                    </div>
                  </div>

                  {/* Professional Biography Info (Restored Lower Content) */}
                  <div className="border-t border-slate-100 pt-6 text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <UserCheck className="h-4 w-4 text-[#0D9488]" /> વ્યાવસાયિક પૃષ્ઠભૂમિ અને નિપુણતા
                    </p>
                    <div className="max-h-[450px] overflow-y-auto pr-2 custom-scrollbar bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                      <DoctorBioRenderer bioText={doctor.briefIntro} doctorName={doctor.name} />
                    </div>
                  </div>
                </div>

                {/* Patient booking CTAs (Restored Buttons) */}
                <div className="mt-6 pt-6 border-t border-slate-100 flex gap-3">
                  <button
                    onClick={() => openAppointmentModal(doctor.id === 'vipul' ? 'Full Mouth Rehab' : 'Smile Makeover')}
                    className="flex-1 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-extrabold py-3.5 px-4 rounded-xl transition duration-300 uppercase tracking-wider cursor-pointer text-center shadow-sm"
                  >
                    ફ્રી પુછપરછ
                  </button>
                  <a
                    href={getWhatsAppUrl(`Hello Patel Dental Hospital, I would like to book a free consultation with ${doctor.id === 'vipul' ? 'Dr. Vipul Patel' : 'Dr. Kinjal Patel'}. Please share the available appointment slots.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-[#0B1B33] text-xs font-extrabold py-3.5 px-4 rounded-xl transition duration-300 uppercase tracking-wider cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp કરો
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          SECTION 2 — ADVANCED TECHNOLOGY
          ================================================== */}
      <section id="why-choose-technology-section" className="py-20 bg-white border-y border-slate-100 gujarati-text">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B33] tracking-tight leading-tight uppercase">
              અદ્યતન નિદાન અને ડેન્ટલ ટેકનોલોજી
            </h2>
            <div className="h-1 w-16 bg-[#0ea5e9] mx-auto rounded-full mt-3" />
            <p className="text-slate-600 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
              ચોક્કસ સારવાર આયોજન, અનુમાનિત પરિણામો અને દર્દીના સંપૂર્ણ આરામ માટે અમે અત્યાધુનિક ડિજિટલ ડેન્ટિસ્ટ્રી સાધનોનો ઉપયોગ કરીએ છીએ.
            </p>
          </div>

          {techLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <span className="animate-spin text-[#0D9488] rounded-full h-8 w-8 border-b-2 border-slate-900"></span>
              <p className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">ડિજિટલ એસેટ્સ લોડ થઈ રહી છે...</p>
            </div>
          ) : techItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-sans italic text-sm border border-dashed border-slate-200 rounded-2xl">
              ડેટાબેઝમાંથી કોઈ ટેકનોલોજી રેકોર્ડ મળ્યા નથી. CMS એડમિન પેનલની અંદર ટેકનોલોજી વસ્તુઓને કસ્ટમાઇઝ કરો.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techItems.map((item, index) => {
                const shortDescription = deduplicateText(item.short_description || item.shortDesc || '');
                const detailedDescription = deduplicateText(item.description || '');
                const displayedText = shortDescription || detailedDescription;

                const rawSentences = displayedText
                  .split(/[.!?]+/)
                  .map(s => s.trim())
                  .filter(s => s.length > 3);
                
                const sentences = rawSentences.length > 0 ? rawSentences : [displayedText];

                return (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_rgba(8,28,58,0.02)] hover:shadow-[0_12px_30px_rgba(8,28,58,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                  >
                    <div className="aspect-video w-full bg-slate-50 relative overflow-hidden shrink-0 border-b border-slate-100 flex items-center justify-center p-4">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="p-6 flex-grow flex flex-col justify-start">
                      <h3 className="font-display font-extrabold text-[#0B1B33] text-lg sm:text-xl leading-snug group-hover:text-[#0D9488] transition-colors duration-300 mb-4">
                        {item.title}
                      </h3>

                      <ul className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed space-y-2.5">
                        {sentences.slice(0, 3).map((sentence, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2 text-left">
                            <span className="text-[#0D9488] font-bold select-none mt-0.5">•</span>
                            <span>{sentence}.</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — PATIENT TESTIMONIAL VIDEOS
          ================================================== */}
      <section id="why-choose-testimonials-section" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 gujarati-text">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B33] tracking-tight leading-tight uppercase">
            વાસ્તવિક દર્દીઓના પ્રશંસાત્મક વિડિયો
          </h2>
          <div className="h-1 w-16 bg-[#0D9488] mx-auto rounded-full mt-3" />
          <p className="text-slate-600 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            અમારી હોસ્પિટલમાં સારવાર પૂર્ણ કરાવનારા દર્દીઓ પાસેથી સીધા તેમના ચકાસેલા ક્લિનિકલ પરિણામો અને વ્યક્તિગત અનુભવો સાંભળો.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 justify-center items-start">
          {displayVideos.map((video, index) => (
            <motion.div
              key={video.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="w-full max-w-[240px] mx-auto flex flex-col items-center"
            >
              {video.videoPlatform === 'instagram' ? (
                <InstagramEmbed
                  url={video.url || `https://www.instagram.com/p/${video.id}/`}
                  title={video.title}
                  thumbnail={video.thumbnail}
                />
              ) : (
                <div className="w-full max-w-[240px] mx-auto flex justify-center">
                  <Mp4ReelPlayer src={video.url || video.id} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Happy Smiles & Patient Moments */}
      <PatientMomentsGallery 
        patientMoments={patientMoments} 
        isStandalonePage={false} 
        customBadge="પટેલ ડેન્ટલ હોસ્પિટલ • રાજકોટની ડેન્ટલ ક્લિનિક"
        customTitle="ખુશનુમા સ્મિત અને દર્દીઓની યાદગાર ક્ષણો"
      />

      {/* Hospital Gallery */}
      <HospitalGallery 
        mediaImages={mediaImages} 
        isGujarati={true}
        customBadge="પટેલ ડેન્ટલ હોસ્પિટલ • હોસ્પિટલનું ઇન્ફ્રાસ્ટ્રક્ચર અને ક્લિનિકલ શ્રેષ્ઠતા"
        customTitle="હોસ્પિટલ ગેલેરી"
        customDescription="અમારા આધુનિક ડેન્ટલ ઓપરેટરીઝ, અદ્યતન 3D CBCT ઇમેજિંગ સુવિધાઓ, સ્ટેરાઇલ સર્જિકલ ઝોન અને ક્લિનિકલ સારવારની ઝલક જુઓ."
      />

      {/* Trust Seal CTA Footer Panel */}
      <section className="bg-gradient-to-r from-[#0B1B33] to-[#081528] text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <ShieldCheck className="h-12 w-12 text-[#0D9488] mx-auto" />
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Experience the Patel Dental Hospital Standard?
          </h2>
          <p className="text-slate-300 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Schedule your risk-free online consultation. Let our senior doctors formulate a customized treatment plan using our advanced digital dentistry solutions.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => openAppointmentModal()}
              className="w-full sm:w-auto bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-black py-4 px-8 rounded-xl transition duration-300 uppercase tracking-widest cursor-pointer shadow-md"
            >
              Book Free Appointment
            </button>
            <a
              href={getWhatsAppUrl("Hello Patel Dental Hospital, I am interested in visiting your clinic. Please share the next available appointment slots.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-black py-4 px-8 rounded-xl transition duration-300 uppercase tracking-widest cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
