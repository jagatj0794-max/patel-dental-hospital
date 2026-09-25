/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Phone, MapPin, Clock, Heart, Shield, Mail, 
  Facebook, Instagram, Calendar, 
  ChevronRight, ExternalLink, ShieldCheck, HeartHandshake, Award, BadgeCheck, Sparkles 
} from 'lucide-react';
import { PageId, ContactInfo } from '../types';
import { trackPhoneClick } from '../utils/analytics';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: () => void;
  contactInfo?: ContactInfo;
  language?: 'en' | 'gu';
}

export default function Footer({ setCurrentPage, openAppointmentModal, contactInfo, language }: FooterProps) {
  const handleLinkClick = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = page;
  };

  const currentYear = new Date().getFullYear();

  const isDev = import.meta.env.DEV || 
                (typeof window !== 'undefined' && (
                  window.location.hostname.includes('localhost') || 
                  window.location.hostname.includes('127.0.0.1') || 
                  window.location.hostname.includes('run.app') || 
                  window.location.hostname.includes('ais-dev')
                ));

  // Social handles
  const socials = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/vipul.gothi.73', hoverColor: 'hover:bg-blue-600' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/pateldentalhospital_rj?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==', hoverColor: 'hover:bg-pink-600' }
  ];

  return (
    <footer id="hospital-premium-footer" className="bg-slate-950 text-slate-300 pt-12 md:pt-16 pb-6 md:pb-8 border-t border-slate-900 font-sans relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 h-64 w-64 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 h-64 w-64 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        


        {/* Master Four Column Content Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8 mb-10 md:mb-16">
          
          {/* Column 1: Clinic Overview & Credentials */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                id="footer-brand-logo-img"
                src="/Best Dntal Hospital Rajkot.PNG" 
                alt="Patel Dental Hospital Logo"
                className="h-[55px] w-auto object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <p className="text-xs text-slate-400 font-sans leading-relaxed gujarati-text">
              {language === 'gu' 
                ? 'રાજકોટ, ગુજરાતની શ્રેષ્ઠ ડેન્ટલ હોસ્પિટલ તરીકે ઓળખાય છે. 3D CBCT ડાયગ્નોસ્ટિક્સ, ઇમિડિયેટ લોડિંગ ટાઇટેનિયમ ઇમ્પ્લાન્ટ્સ અને સિંગલ-સિટિંગ રૂટ કેનાલ જેવી અદ્યતન ડેન્ટલ સારવાર રાજકોટમાં પ્રદાન કરીએ છીએ. મુખ્ય ડેન્ટલ ઇમ્પ્લાન્ટ સર્જન ડૉ. વિપુલ પટેલ (MDS) અને ડૉ. કિંજલ પટેલ (BDS)ના માર્ગદર્શન હેઠળ.' 
                : 'Recognized as the best dental hospital in Rajkot, Gujarat. Providing advanced dental care in Rajkot with 3D CBCT diagnostics, immediate loading titanium implants, and single-sitting root canals. Directed by Chief Dental Implant Surgeon Dr. Vipul Patel (MDS) & Dr. Kinjal Patel (BDS).'}
            </p>

            {/* Certifications and Accreditations badge widgets */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-900 border border-white/[0.04] p-2.5 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="font-semibold tracking-wide text-[10px] uppercase gujarati-text">
                  {language === 'gu' ? 'ISO 9001:2015 મંજૂર સ્ટેરિલાઇઝેશન' : 'ISO 9001:2015 Approved sterilization'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-900 border border-white/[0.04] p-2.5 rounded-lg">
                <BadgeCheck className="h-4 w-4 text-amber-400 shrink-0 drop-shadow-[0_0_6px_rgba(251,191,36,0.3)]" />
                <span className="font-semibold tracking-wide text-[10px] uppercase gujarati-text">
                  {language === 'gu' ? 'ડેન્ટલ ઇમ્પ્લાન્ટ દ્વારા માત્ર એક અઠવાડિયામાં દાંત સ્થિર કરો' : 'Fix Teeth In Just One Week With Dental Implant'}
                </span>
              </div>
            </div>

            {/* Premium Custom Socials follow strip */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block gujarati-text">
                {language === 'gu' ? 'અમારી હોસ્પિટલના અપડેટ્સને ફોલો કરો' : 'Follow Our Hospital updates'}
              </span>
              <div className="flex items-center space-x-2">
                {socials.map((soc, i) => {
                  const IconComponent = soc.icon;
                  return (
                    <a
                      key={i}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`h-8 w-8 bg-slate-900 border border-white/[0.06] hover:border-transparent rounded-lg flex items-center justify-center text-slate-400 hover:text-white ${soc.hoverColor} transition-all duration-300`}
                      title={soc.name}
                    >
                      <IconComponent className="h-4.5 w-4.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links Navigation Map */}
          <div>
            <h4 className="font-display text-white text-xs font-black tracking-widest uppercase mb-6 pb-2 border-b border-white/[0.05] gujarati-text">
              {language === 'gu' ? 'ક્વિક લિંક્સ' : 'QUICK LINKS'}
            </h4>
            <ul className="space-y-3 text-xs">
              {[
                { label: language === 'gu' ? 'હોમ' : 'Home', target: 'home' },
                { label: language === 'gu' ? 'ડૉક્ટર્સને મળો' : 'Meet Doctors', target: 'doctors' },
                { label: language === 'gu' ? 'ટેક્નોલોજી' : 'Technology', target: 'technology' },
                { label: language === 'gu' ? 'સોશિયલ સર્વિસ' : 'Social Service', target: 'social-service' },
                { label: language === 'gu' ? 'ગેલેરી' : 'Gallery', target: 'gallery' },
                { label: language === 'gu' ? 'અમારો સંપર્ક કરો' : 'Contact Us', target: 'contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link.target as PageId)}
                    className="text-slate-400 hover:text-brand-cyan transition duration-200 cursor-pointer text-left flex items-center space-x-1.5 focus:outline-hidden gujarati-text"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-brand-cyan shrink-0 opacity-60" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Diagnostic Treatments Quick Indexes */}
          <div>
            <h4 className="font-display text-white text-xs font-black tracking-widest uppercase mb-6 pb-2 border-b border-white/[0.05] gujarati-text">
              {language === 'gu' ? 'અમારી સેવાઓ' : 'OUR SERVICES'}
            </h4>
            <ul className="space-y-3 text-xs">
              {[
                { label: 'Dental Implants', target: 'services/dental-implants', gu: 'ડેન્ટલ ઇમ્પ્લાન્ટ્સ' },
                { label: 'Single Sitting Root Canal Treatment', target: 'services/root-canal-treatment', gu: 'સિંગલ-સિટિંગ રૂટ કેનાલ ટ્રીટમેન્ટ' },
                { label: 'Full Mouth Rehabilitation', target: 'services/full-mouth-rehabilitation', gu: 'ફુલ માઉથ રિહેબિલિટેશન' },
                { label: 'Invisible Aligners', target: 'services/invisible-aligners', gu: 'ઇનવિઝિબલ એલાઇનર્સ' },
                { label: 'Smile Makeover', target: 'services/smile-makeover', gu: 'સ્માઇલ મેકઓવર' },
                { label: 'Crowns & Bridges', target: 'services/crowns-bridges', gu: 'ક્રાઉન્સ અને બ્રિજિસ' },
                { label: 'Teeth Whitening', target: 'services/teeth-whitening', gu: 'ટીથ વ્હાઇટનિંગ' },
                { label: 'Pediatric Dentistry', target: 'services/pediatric-dentistry', gu: 'પીડિયાટ્રિક ડેન્ટિસ્ટ્રી' },
                { label: 'Braces Treatment', target: 'services/braces-treatment', gu: 'બ્રેસિસ ટ્રીટમેન્ટ' },
                { label: 'Wisdom Tooth Surgery', target: 'services/wisdom-tooth-surgery', gu: 'વિઝડમ ટૂથ સર્જરી' },
                { label: 'Tooth Coloured Filling', target: 'services/tooth-coloured-filling', gu: 'ટૂથ કલર્ડ ફિલિંગ' },
              ].map((treatment, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(treatment.target as PageId)}
                    className="text-slate-400 hover:text-brand-teal transition duration-200 cursor-pointer text-left flex items-center space-x-1.5 focus:outline-hidden gujarati-text"
                  >
                    <span className="h-1 w-1 bg-brand-teal rounded-full shrink-0" />
                    <span>{language === 'gu' ? treatment.gu : treatment.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Hospital Timing & Emergency Helpline */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-display text-white text-xs font-black tracking-widest uppercase pb-2 border-b border-white/[0.05] gujarati-text">
                {language === 'gu' ? 'કામકાજના કલાકો' : 'Operational Hours'}
              </h4>
              <div className="bg-slate-900 border border-white/[0.04] p-4 rounded-xl flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand-cyan shrink-0 mt-0.5" />
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-brand-cyan font-bold block uppercase tracking-wider gujarati-text">
                      {language === 'gu' ? 'સોમવારથી શનિવાર' : 'Monday to Saturday'}
                    </span>
                    <span className="text-white font-medium block mt-0.5">09:00 AM – 01:00 PM</span>
                    <span className="text-white font-medium block">04:00 PM – 08:00 PM</span>
                  </div>
                  <div className="pt-1.5 border-t border-white/[0.06]">
                    <span className="text-amber-400 block mt-0.5 font-semibold gujarati-text">
                      {language === 'gu' ? 'રવિવારે રજા' : 'Sunday Off'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block gujarati-text">
                {language === 'gu' ? 'હેડક્વાર્ટર્સ સંપર્ક' : 'Headquarters Contact'}
              </span>
              <a 
                href={`mailto:${contactInfo?.email || 'Pateldentalhospital1@gmail.com'}`} 
                className="flex items-center space-x-2 text-xs text-slate-400 hover:text-brand-cyan transition"
              >
                <Mail className="h-4 w-4 text-slate-500" />
                <span>{contactInfo?.email || 'Pateldentalhospital1@gmail.com'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Both Branch Addresses - Interactive Bento Grid Deck */}
        <div className="pt-8 md:pt-12 border-t border-white/[0.06] mb-8 md:mb-12">
          <div className="mb-6">
            <span className="text-[10px] uppercase font-black tracking-widest text-brand-cyan block gujarati-text">
              {language === 'gu' ? 'બે બ્રાન્ચ નેટવર્કના સ્થળો' : 'Dual Branch Network Locations'}
            </span>
            <p className="text-slate-400 text-xs font-sans mt-0.5 gujarati-text">
              {language === 'gu' 
                ? 'રાજકોટમાં વ્યૂહાત્મક રીતે સ્થિત અમારી સ્ટેરાઇલ-સર્ટિફાઇડ ઓપરેટરી ક્લિનિક્સ ખાતે શ્રેષ્ઠ ડેન્ટલ ક્લિનિકની મુલાકાત લો.' 
                : 'Visit the best dental clinic in Rajkot at our sterile-certified operatory clinics strategically located across Rajkot.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Branch 1 Location Card */}
            <div id="branch-footer-card-1" className="bg-slate-900/40 hover:bg-slate-900 border border-white/[0.05] hover:border-brand-sky/20 p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-300 group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-white font-extrabold text-sm uppercase tracking-wide group-hover:text-brand-cyan transition-colors gujarati-text">
                    {language === 'gu' ? 'એમિન માર્ગ બ્રાન્ચ' : 'Amin Marg Branch'}
                  </span>
                  <span className="text-[9px] bg-brand-cyan/10 text-brand-cyan px-2 py-0.5 rounded-md font-bold uppercase tracking-wider gujarati-text">
                    {language === 'gu' ? 'મેઈન બ્રાન્ચ' : 'Main Branch'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans whitespace-pre-line gujarati-text">
                  {language === 'gu' 
                    ? `1st ફ્લોર, બિઝનેસ સેન્ટ્રમ કોમ્પ્લેક્સ, ગોલ્ડન સુપર માર્કેટ પાસે, કિંગ્સ હાઇટ્સની સામે, પંડિત દીનદયાળ ઉપાધ્યાય રોડ, એમિન માર્ગ, રાજકોટ, ગુજરાત 360001`
                    : (contactInfo?.address || `Patel Dental Hospital,
Business Centrum Complex, 1st Floor,
Opp. Kings Heights,
Beside Golden Super Market,
Pandit Deendayal Upadhyay Road,
From Rajnagar Chowk towards Amin Marg,
Rajkot – 360001, Gujarat, India.`)}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.04]">
                <a 
                  href={`tel:${contactInfo?.phoneRaw || '+919510397046'}`} 
                  onClick={() => trackPhoneClick(contactInfo?.phoneRaw || '+919510397046', 'Footer - Amin Marg Branch')}
                  className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-white hover:text-brand-cyan transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#11B5D8]" />
                  <span>{contactInfo?.phone || '+91 9510397046'}</span>
                </a>
                <a 
                  href={contactInfo?.mapsLink || 'https://maps.app.goo.gl/AmSRutz2HjsBh6CX9?g_st=ic'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-brand-teal hover:text-white font-bold transition-colors group-hover:underline gujarati-text"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{language === 'gu' ? 'Google Maps પર માર્ગદર્શન મેળવો' : 'Navigate in Google Maps'}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Branch 2 Location Card */}
            <div id="branch-footer-card-2" className="bg-slate-900/40 hover:bg-slate-900 border border-white/[0.05] hover:border-brand-sky/20 p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-300 group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-white font-extrabold text-sm uppercase tracking-wide group-hover:text-brand-cyan transition-colors gujarati-text">
                    {language === 'gu' ? 'ગાયત્રીનગર બ્રાન્ચ' : 'Gayatrinagar Branch'}
                  </span>
                  <span className="text-[9px] bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-md font-bold uppercase tracking-wider gujarati-text">
                    {language === 'gu' ? 'બીજી બ્રાન્ચ' : 'Second Branch'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans whitespace-pre-line gujarati-text">
                  {language === 'gu'
                    ? `ડૉ. વિપુલ પટેલ પટેલ ડેન્ટલ હોસ્પિટલ, 1st ફ્લોર, રામેશ્વર કોમ્પ્લેક્સ, SBI બેંકની સામે, ગાયત્રીનગર રોડ, જલારામ ચોક, ભક્તિનગર સર્કલ, રાજકોટ, ગુજરાત, ભારત.`
                    : `Dr. Vipul Patel
Patel Dental Hospital,
1st Floor, Rameshwar Complex,
Opp. SBI Bank,
Gayatrinagar Road,
Jalaram Chowk,
Bhaktinagar Circle,
Rajkot, Gujarat, India.`}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.04]">
                <a 
                  href={`tel:${contactInfo?.phoneRaw || '+919510397046'}`} 
                  onClick={() => trackPhoneClick(contactInfo?.phoneRaw || '+919510397046', 'Footer - Gayatrinagar Branch')}
                  className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-white hover:text-brand-cyan transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#11B5D8]" />
                  <span>{contactInfo?.phone || '+91 9510397046'}</span>
                </a>
                <a 
                  href="https://maps.app.goo.gl/5L8euDj9U4AiedgCA?g_st=ic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-brand-teal hover:text-white font-bold transition-colors group-hover:underline gujarati-text"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{language === 'gu' ? 'Google Maps પર માર્ગદર્શન મેળવો' : 'Navigate in Google Maps'}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Horizontal Base Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-sans font-medium">
          <div className="space-y-1 text-center md:text-left gujarati-text">
            <p>{language === 'gu' ? `© ${currentYear} પટેલ ડેન્ટલ હોસ્પિટલ. સર્વ હકો સુરક્ષિત.` : `© ${currentYear} Patel Dental Hospital. All rights reserved.`}</p>
            <p className="text-slate-600">{language === 'gu' ? 'તમામ તબીબી/સર્જિકલ પ્રક્રિયાઓ સત્તાવાર રાજ્ય ધોરણો અને જંતુરહિત પ્રક્રિયાઓને સંપૂર્ણપણે અનુરૂપ છે.' : 'All medical/surgical procedures conform perfectly to authorized state standards & sterile procedures.'}</p>
          </div>
          <div className="text-center md:text-right space-y-2 flex flex-col items-center md:items-end">
            <div className="gujarati-text">
              <p>{language === 'gu' ? 'રાજકોટમાં સ્વચ્છ સેનિટાઇઝેશન પ્રોટોકોલ હેઠળ ડિઝાઇન કરવામાં આવ્યું છે.' : 'Designed under clean sanitization protocols in Rajkot.'}</p>
              <p>{language === 'gu' ? 'મુખ્ય ડેન્ટલ સર્જન: ' : 'Chief Dental Surgeon: '}<span className="text-brand-cyan font-bold">Dr. Vipul Patel (MDS)</span></p>
            </div>
            {isDev && (
              <button
                type="button"
                onClick={() => handleLinkClick('admin')}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 border border-slate-700"
                id="admin-demo-access-btn"
              >
                <span className="gujarati-text">🔐 {language === 'gu' ? 'એડમિન ડેમો' : 'Admin Demo'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
