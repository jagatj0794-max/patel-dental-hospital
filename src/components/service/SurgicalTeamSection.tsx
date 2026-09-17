import React from 'react';
import { Users, CheckCircle2, Award } from 'lucide-react';

interface SurgicalTeamSectionProps {
  setCurrentPage?: (page: string) => void;
}

export const SurgicalTeamSection: React.FC<SurgicalTeamSectionProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="implants-surgeons-section">
      <div className="space-y-3 max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50/90 border border-teal-100/60 text-[#0D9488] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
          <Users className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
          THE SURGICAL TEAM
        </span>
        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
          Led by Dr. Vipul Patel & Dr. Kinjal Patel
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-center font-medium font-sans">
          Our senior implantologists combine advanced USA-based training and fellowship-accredited expertise to plan and execute your precise, painless dental implant surgery.
        </p>
        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto items-stretch pt-4">
        {/* Dr. Vipul Patel Card */}
        <div className="bg-white border border-[#E8EEF5] rounded-[28px] p-6 sm:p-8 md:p-10 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] hover:border-[#14B8A6] transition-all duration-300 flex flex-col md:flex-row gap-6 sm:gap-8 relative overflow-hidden text-left">
          <div className="absolute left-0 top-10 bottom-10 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
          
          {/* Profile Image Column */}
          <div className="w-full md:w-2/5 shrink-0">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative shadow-sm">
              <img 
                src="/Dr. Vipul Patel.jpg" 
                alt="Dr. Vipul Patel"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between space-y-4 text-left flex-1">
            <div className="space-y-2">
              <h3 className="font-sans font-black text-[#081C3A] text-2xl tracking-tight leading-tight">
                Dr. Vipul Patel
              </h3>
              <div className="h-[1px] bg-slate-100 w-full pt-1" />
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                <span>Experience of 14+ years with 16,000 successful implants and 800 fixed dentures</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                <span>MDS in Oral and Maxillofacial Surgery</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                <span>MDS in Oral Medicine and Radiology</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                <span>Master in Implant Prosthodontics (USA)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#0D9488] font-bold tracking-wide">
                <Award className="h-4 w-4 shrink-0" />
                Master in Implant Prosthodontics (USA)
              </span>
              <button
                type="button"
                onClick={() => {
                  if (setCurrentPage) {
                    setCurrentPage('doctors');
                  }
                  window.location.hash = 'doctors';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-[11px] font-black uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all duration-300 cursor-pointer text-center"
              >
                LEARN MORE
              </button>
            </div>
          </div>
        </div>

        {/* Dr. Kinjal Patel Card */}
        <div className="bg-white border border-[#E8EEF5] rounded-[28px] p-6 sm:p-8 md:p-10 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] hover:border-[#14B8A6] transition-all duration-300 flex flex-col md:flex-row gap-6 sm:gap-8 relative overflow-hidden text-left">
          <div className="absolute left-0 top-10 bottom-10 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
          
          {/* Profile Image Column */}
          <div className="w-full md:w-2/5 shrink-0">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative shadow-sm">
              <img 
                src="/Dr. Kinjal Patel.JPG" 
                alt="Dr. Kinjal Patel"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between space-y-4 text-left flex-1">
            <div className="space-y-2">
              <h3 className="font-sans font-black text-[#081C3A] text-2xl tracking-tight leading-tight">
                Dr. Kinjal Patel
              </h3>
              <div className="h-[1px] bg-slate-100 w-full pt-1" />
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                <span>Experience of 14+ years with 18,000 Smiles Transformed and 30,000 RCT</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                <span>BDS (Government Dental College, Jamnagar)</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                <span>Fellowship in Implant Prosthodontics (USA)</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#0D9488] shrink-0 mt-0.5" />
                <span>Root Canal Expert and Implantologist</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#0D9488] font-bold tracking-wide">
                <Award className="h-4 w-4 shrink-0" />
                Fellowship in Implant Prosthodontics (USA)
              </span>
              <button
                type="button"
                onClick={() => {
                  if (setCurrentPage) {
                    setCurrentPage('doctors');
                  }
                  window.location.hash = 'doctors';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-[11px] font-black uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all duration-300 cursor-pointer text-center"
              >
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
