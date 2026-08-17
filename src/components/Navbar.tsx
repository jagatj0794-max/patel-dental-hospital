/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, ContactInfo } from '../types';
import { serviceService } from '../utils/serviceData';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: () => void;
  contactInfo?: ContactInfo;
}

const navHierarchy = [
  { label: 'Home', id: 'home' },
  { 
    label: 'About Us', 
    id: 'about',
    dropdown: [
      { label: 'Meet Doctors', id: 'doctors' },
      { label: 'Technology', id: 'technology' },
      { label: 'Social Service', id: 'social-service' },
      { label: 'Gallery', id: 'gallery' },
    ]
  },
  {
    label: 'Why Choose Us?',
    id: 'why-choose-us',
  },

  {
    label: 'Dental Tourism',
    id: 'international',
  },
  {
    label: 'Services',
    id: 'treatments',
    dropdown: []
  },
  {
    label: 'Dental Blog',
    id: 'academy',
  },
  {
    label: 'Contact Us',
    id: 'contact'
  }
];

export default function Navbar({ currentPage, setCurrentPage, openAppointmentModal, contactInfo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [dynamicServices, setDynamicServices] = useState<{ label: string; id: string }[]>([]);

  // Fetch active services dynamically
  useEffect(() => {
    let active = true;
    const fetchServices = async () => {
      try {
        const services = await serviceService.getServices();
        if (active) {
          const activeServices = services
            .filter(s => s.is_active)
            .map(s => ({
              label: s.title,
              id: `services/${s.slug}`
            }));
          setDynamicServices(activeServices);
        }
      } catch (err) {
        console.error('Failed to load active services for navbar dropdown:', err);
      }
    };
    fetchServices();
    return () => {
      active = false;
    };
  }, []);

  // Monitor scroll height to apply sticky blur and premium border
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    if (id === 'no-services') return;
    // Basic navigation handling - cast as PageId since some routes are mock
    setCurrentPage(id as PageId);
    setIsOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = id;
  };

  const toggleMobileDropdown = (id: string) => {
    if (mobileExpanded === id) {
      setMobileExpanded(null);
    } else {
      setMobileExpanded(id);
    }
  };

  // Replace default services dropdown with dynamically loaded ones
  const menuItems = navHierarchy.map(item => {
    if (item.id === 'treatments') {
      return {
        ...item,
        dropdown: dynamicServices.length > 0
          ? dynamicServices
          : [{ label: 'No Services Available', id: 'no-services' }]
      };
    }
    return item;
  });

  const isItemActive = (item: typeof navHierarchy[0] | typeof menuItems[0]) => {
    if (currentPage === item.id) return true;
    if (item.id === 'treatments' && currentPage.startsWith('services/')) return true;
    return false;
  };

  return (
    <header
      id="app-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white/85 backdrop-blur-md shadow-sm border-b border-gray-100/60'
      }`}
    >
      {/* Top Bar */}
      <div 
        className="bg-gradient-to-r from-[#1488CC] via-[#20B2AA] to-[#6BCB3C] w-full h-[40px] opacity-100 transition-all duration-300 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-white text-[13px] font-medium tracking-wide">
          <div className="flex items-center space-x-0 gap-1.5 sm:gap-[10px]">
            <Phone className="h-4.5 w-4.5 sm:h-[21px] sm:w-[21px] shrink-0" fill="#FF4D4F" stroke="#FF4D4F" />
            <span className="font-bold text-[13.5px] sm:text-[17px] text-white leading-none select-all">{contactInfo?.phone || '+91 9510397046'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Rajkot, Gujarat, India</span>
            <span className="sm:hidden">Rajkot, India</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'py-0.5 sm:py-1.5 lg:py-2' 
          : 'py-1 sm:py-3 lg:py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-nowrap">
            {/* Logo Brand */}
            <div
              id="navbar-brand"
              onClick={() => handleNavigate('home')}
              className="flex items-center cursor-pointer group shrink-0 w-fit"
            >
              <img 
                id="navbar-brand-logo-img"
                src="/Best Dntal Hospital Rajkot.PNG" 
                alt="Patel Dental Hospital Logo"
                className="w-auto h-[40px] sm:h-[60px] lg:h-[72px] object-contain transition-all duration-300 group-hover:scale-[1.02] origin-left bg-transparent rounded-lg max-w-[65vw] sm:max-w-[340px] lg:max-w-[380px] xl:max-w-[500px]"
              />
            </div>

            {/* Center Desktop Navigation */}
            <div className="hidden lg:flex flex-nowrap items-center justify-end flex-grow mx-2 xl:mx-4 xl:space-x-1.5 z-50 relative">
              {menuItems.map((item) => (
                <div 
                  key={item.id}
                  className="relative group px-1.5 xl:px-3 2xl:px-3.5 h-full shrink-0"
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => {
                        if (!item.dropdown) handleNavigate(item.id);
                    }}
                    className={`flex items-center text-[13px] xl:text-[14px] 2xl:text-[15px] font-semibold py-2 transition-colors whitespace-nowrap ${
                      isItemActive(item) || activeDropdown === item.id ? 'text-[#0D9488]' : 'text-[#12355B] hover:text-[#0D9488]'
                    }`}
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown className={`ml-1 h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === item.id ? 'rotate-180' : ''}`} />}
                  </button>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-0 pt-4 w-60 z-50 pointer-events-auto"
                        >
                          <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden flex flex-col py-2">
                            {item.dropdown.map((dropItem) => (
                              <button
                                key={dropItem.id}
                                onClick={() => handleNavigate(dropItem.id)}
                                className="block w-full text-left px-5 py-2.5 text-[14px] font-medium text-[#12355B] hover:bg-slate-50 hover:text-[#0D9488] transition-colors"
                              >
                                {dropItem.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side CTA (Desktop) */}
            <div className="hidden lg:flex items-center shrink-0">
              <button
                id="navbar-cta-appointment"
                onClick={() => openAppointmentModal()}
                className="flex items-center text-[13px] xl:text-[14px] font-bold text-white bg-gradient-to-r from-[#0D9488] to-[#0ea5e9] hover:from-[#0F766E] hover:to-[#0284c7] px-5 py-2.5 rounded-xl shadow-[0_4px_14px_0_rgba(13,148,136,0.25)] cursor-pointer hover:shadow-lg transition-all duration-300 transform active:scale-95"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Free Consultation
              </button>
            </div>

            {/* Mobile Menu Burger */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                id="mobile-menu-burger"
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 sm:p-2 rounded-xl text-[#12355B] hover:bg-gray-100 focus:outline-none"
              >
                {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
 
      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl overflow-y-auto z-40 border-t border-gray-100 max-h-[calc(100vh-120px)]"
          >
            <div className="px-4 py-4 pb-24 space-y-1">
              {menuItems.map((item) => (
                <div key={item.id} className="border-b border-gray-50 last:border-0">
                  <div className="flex items-center justify-between px-2 py-3 rounded-xl transition-all">
                    <button
                      onClick={() => {
                        if (!item.dropdown) handleNavigate(item.id);
                        else toggleMobileDropdown(item.id);
                      }}
                      className={`flex-grow text-left text-[15px] font-bold ${
                        isItemActive(item) ? 'text-[#0D9488]' : 'text-[#12355B]'
                      }`}
                    >
                      {item.label}
                    </button>
                    {item.dropdown && (
                      <button 
                        onClick={() => toggleMobileDropdown(item.id)}
                        className="p-2 text-[#12355B] bg-slate-50 rounded-lg"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileExpanded === item.id ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  
                  {/* Mobile Dropdown Items */}
                  {item.dropdown && (
                    <AnimatePresence>
                      {mobileExpanded === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-slate-50 rounded-xl mb-2"
                        >
                          <div className="py-2 flex flex-col">
                            {item.dropdown.map((dropItem) => (
                              <button
                                key={dropItem.id}
                                onClick={() => handleNavigate(dropItem.id)}
                                className="block w-full text-left px-6 py-2.5 text-[14px] font-semibold text-slate-600 hover:text-[#0D9488]"
                              >
                                {dropItem.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}

              <div className="pt-6 mt-2 pb-6 space-y-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openAppointmentModal();
                  }}
                  className="flex items-center justify-center w-full bg-gradient-to-r from-[#0D9488] to-[#0ea5e9] py-3.5 rounded-xl font-bold text-white transition shadow-md"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Free Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
