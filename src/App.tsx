/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, PhoneCall, Plus, Table, Trash2, X, Sparkles, Check, CheckSquare } from 'lucide-react';

import { PageId, GalleryItem, Appointment, Doctor, PatientMoment, ContactInfo, DentalVideo } from './types';
import { DEFAULT_DOCTORS } from './data/doctors';
import { safeStorage } from './utils/storage';
import { supabase } from './utils/supabase';
import { heroService } from './utils/heroData';
import { doctorService } from './utils/doctorData';
import { galleryService, DEFAULT_MEDIA_IMAGES } from './utils/galleryData';
import { videoService, DEFAULT_VIDEOS } from './utils/videoData';
import { contactService, DEFAULT_CONTACT_INFO } from './utils/contactData';
import { PATIENT_MOMENTS } from './data/patientMoments';
import { appointmentService } from './utils/appointmentData';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActionPanel from './components/FloatingActionPanel';
import Lightbox from './components/Lightbox';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Treatments from './pages/Treatments';
import SameDayFix from './pages/SameDayFix';
import SmileGallery from './pages/SmileGallery';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import SupabaseTest from './pages/SupabaseTest';
import ServiceDetail from './pages/ServiceDetail';

import { GALLERY_ITEMS } from './data/gallery';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    let hash = window.location.hash.replace('#', '');
    if (hash.startsWith('/')) {
      hash = hash.substring(1);
    }
    if (hash === 'admin-login') {
      hash = 'admin/login';
    }
    const validPages: PageId[] = ['home', 'about', 'treatments', 'sameday', 'implants', 'gallery', 'doctors', 'contact', 'admin', 'admin/login', 'supabase-test'];
    if (hash && (validPages.includes(hash as PageId) || hash.startsWith('services/'))) {
      return hash as PageId;
    }
    return 'home';
  });
  const [session, setSession] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentTreatment, setAppointmentTreatment] = useState('General Consultation');
  
  // My Saved Appointments state (loaded dynamically from Supabase based on session IDs)
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const loadMyAppointments = async () => {
      try {
        const bookedIds = JSON.parse(sessionStorage.getItem('my_booked_ids') || '[]');
        if (bookedIds.length === 0) return;

        const { data, error } = await supabase.client
          .from('appointments')
          .select('*')
          .in('id', bookedIds);

        if (error) {
          console.error('Error fetching my appointments:', error);
          return;
        }

        if (data) {
          const mapped: Appointment[] = data.map((row: any) => ({
            id: row.id,
            name: row.patient_name,
            phone: row.mobile_number,
            email: row.email,
            treatment: row.service,
            branch: row.branch,
            date: row.appointment_date,
            timeSlot: row.appointment_time,
            message: row.symptoms,
            createdAt: row.created_at,
            status: row.status === 'Pending' ? 'Pending' : 'Confirmed'
          }));
          setAppointments(mapped);
        }
      } catch (e) {
        console.error('Exception loading my appointments from Supabase:', e);
      }
    };
    loadMyAppointments();
  }, []);

  // Lightbox selection state mapping
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  // Hero customisable states
  const [heroHeading, setHeroHeading] = useState("Dental Implant, Aligner &\nFMR Specialists\nin Rajkot");
  const [heroDescription, setHeroDescription] = useState("Trusted smiles. Advanced care. Exceptional results.");
  const [heroBgImage, setHeroBgImage] = useState("");
  const [heroBgImageMobile, setHeroBgImageMobile] = useState("");

  // Load Hero section from Supabase on mount
  useEffect(() => {
    let active = true;
    const fetchHero = async () => {
      try {
        const data = await heroService.getHeroContent();
        if (active) {
          setHeroHeading(data.heading);
          setHeroDescription(data.description);
          
          let desktopImg = "";
          let mobileImg = "";
          
          if (data.bg_image) {
            const trimmed = data.bg_image.trim();
            if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
              try {
                const parsed = JSON.parse(trimmed);
                desktopImg = parsed.desktop || "";
                mobileImg = parsed.mobile || "";
              } catch (parseErr) {
                console.warn("Failed to parse bg_image as JSON, falling back to plain string", parseErr);
                desktopImg = data.bg_image;
              }
            } else {
              desktopImg = data.bg_image;
            }
          }
          
          setHeroBgImage(desktopImg);
          setHeroBgImageMobile(mobileImg);
        }
      } catch (e) {
        console.warn("Failed to load hero from Supabase on mount (using local/default values):", e);
      }
    };
    fetchHero();
    return () => {
      active = false;
    };
  }, []);

  // Load Doctors from Supabase on mount
  useEffect(() => {
    let active = true;
    const fetchDoctors = async () => {
      try {
        const data = await doctorService.getDoctors();
        if (active) {
          setDoctorsList(data);
        }
      } catch (e) {
        console.warn("Failed to load doctors from Supabase on mount:", e);
      }
    };
    fetchDoctors();
    return () => {
      active = false;
    };
  }, []);

  // Doctors list state initialized with default values; updated from Supabase on mount
  const [doctorsList, setDoctorsList] = useState<Doctor[]>(DEFAULT_DOCTORS);

  // Load Gallery from Supabase on mount
  useEffect(() => {
    let active = true;
    const fetchGallery = async () => {
      try {
        const data = await galleryService.getGalleryData();
        if (active) {
          setMediaImages(data.mediaImages);
          setPatientMoments(data.patientMoments);
        }
      } catch (e) {
        console.warn("Failed to load gallery data from Supabase on mount:", e);
      }
    };
    fetchGallery();
    return () => {
      active = false;
    };
  }, []);

  // Media / Gallery images state initialized with default values; updated from Supabase on mount
  const [mediaImages, setMediaImages] = useState<Array<{ id: string; url: string; title: string; category: string; branch: string; altText?: string }>>(DEFAULT_MEDIA_IMAGES);

  // Happy Smiles / Patient Moments state initialized with default values; updated from Supabase on mount
  const [patientMoments, setPatientMoments] = useState<PatientMoment[]>(PATIENT_MOMENTS);

  // Load Videos from Supabase on mount
  useEffect(() => {
    let active = true;
    const fetchVideos = async () => {
      try {
        const data = await videoService.getVideos();
        if (active) {
          setVideosList(data);
        }
      } catch (e) {
        console.warn("Failed to load videos from Supabase on mount:", e);
      }
    };
    fetchVideos();
    return () => {
      active = false;
    };
  }, []);

  // Video management state initialized with default values; updated from Supabase on mount
  const [videosList, setVideosList] = useState<DentalVideo[]>(DEFAULT_VIDEOS);

  // Load Contact Info from Supabase on mount
  useEffect(() => {
    let active = true;
    const fetchContact = async () => {
      try {
        const data = await contactService.getContactInfo();
        if (active) {
          setContactInfo(data);
        }
      } catch (e) {
        console.warn("Failed to load contact info from Supabase on mount:", e);
      }
    };
    fetchContact();
    return () => {
      active = false;
    };
  }, []);

  // Contact management state initialized with default values; updated from Supabase on mount
  const [contactInfo, setContactInfo] = useState<ContactInfo>(DEFAULT_CONTACT_INFO);

  // Load and listen to Supabase authentication changes
  useEffect(() => {
    let subscription: any = null;

    async function initAuth() {
      try {
        const client = supabase.client;
        // Fetch existing session safely
        const { data: { session: initialSession } } = await client.auth.getSession();
        setSession(initialSession);

        // Listen for realtime auth changes
        const { data: { subscription: authSubscription } } = client.auth.onAuthStateChange((_event, currentSession) => {
          setSession(currentSession);
        });
        subscription = authSubscription;
      } catch (err) {
        console.warn('Supabase auth initialization failed:', err);
        setSession(null);
      } finally {
        setIsAuthLoading(false);
      }
    }

    initAuth();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Enforce authenticated administrator routing
  useEffect(() => {
    if (!isAuthLoading && currentPage === 'admin' && !session) {
      setCurrentPage('admin/login');
      window.location.hash = 'admin/login';
    }
  }, [currentPage, session, isAuthLoading]);

  // Map mediaImages dynamically to GalleryItem[] format for SmileGallery page and Lightbox
  const mappedGalleryItems: GalleryItem[] = (mediaImages || [])
    .filter(img => img && typeof img === 'object' && img.id && img.url)
    .map((img, idx) => {
      const cat = (img.category || '').toLowerCase();
      let category: 'implant' | 'sameday' | 'smile' | 'rehab' | 'ortho' | 'general' | 'cosmetic' = 'smile';
      if (cat.includes('implant') || cat.includes('dental implants')) category = 'implant';
      else if (cat.includes('sameday') || cat.includes('same day') || cat.includes('before')) category = 'sameday';
      else if (cat.includes('rehab') || cat.includes('rehabilitation')) category = 'rehab';
      else if (cat.includes('ortho') || cat.includes('aligner') || cat.includes('braces')) category = 'ortho';
      else if (cat.includes('smile') || cat.includes('homepage gallery')) category = 'smile';
      else if (cat.includes('cosmetic') || cat.includes('crown') || cat.includes('bridge')) category = 'cosmetic';
      else if (cat.includes('gum') || cat.includes('general') || cat.includes('root') || cat.includes('canal') || cat.includes('interior')) category = 'general';

      let layoutType: 'close-up' | 'full-smile' | 'face-profile' | 'macro-implant' | 'cosmetic-makeover' = 'close-up';
      if (idx % 3 === 0) layoutType = 'face-profile';
      else if (idx % 3 === 1) layoutType = 'cosmetic-makeover';

      return {
        id: img.id,
        category,
        title: img.title || 'Clinical Case',
        description: img.altText || img.title || 'Clinical success at Patel Dental Hospital.',
        beforeImg: img.url,
        afterImg: img.url,
        layoutType,
        patientTag: img.branch || 'All Branches',
        privacyProtection: false,
        difficulty: idx % 2 === 0 ? 'Standard' : 'High'
      } as GalleryItem;
    });

  // Synchronize dynamic routing hashes (supports deep-linking & browser backward/forward steps)
  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash.replace('#', '');
      if (hash.startsWith('/')) {
        hash = hash.substring(1);
      }
      if (hash === 'admin-login') {
        hash = 'admin/login';
      }
      const validPages: PageId[] = ['home', 'about', 'treatments', 'sameday', 'implants', 'gallery', 'doctors', 'contact', 'admin', 'admin/login', 'supabase-test'];
      if (hash && (validPages.includes(hash as PageId) || hash.startsWith('services/'))) {
        setCurrentPage(hash as PageId);
        window.scrollTo({ top: 0 });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Trigger initial on-load check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openAppointmentModal = (preselectedTreatment?: any) => {
    if (preselectedTreatment && typeof preselectedTreatment === 'string') {
      setAppointmentTreatment(preselectedTreatment);
    } else {
      setAppointmentTreatment('General Consultation');
    }
    setIsAppointmentOpen(true);
  };

  const handleBookAppointment = async (data: {
    name: string;
    phone: string;
    treatment: string;
    branch: string;
    date: string;
    timeSlot: string;
    message?: string;
  }): Promise<boolean> => {
    // 1. Double check availability before inserting to prevent race conditions
    const isAvailable = await appointmentService.isSlotAvailable(data.date, data.timeSlot, data.branch);
    if (!isAvailable) {
      return false;
    }

    const newId = `apt-${Date.now()}`;
    const newApt = {
      id: newId,
      patient_name: data.name,
      mobile_number: data.phone,
      email: '',
      age: 0,
      gender: 'Male',
      doctor: 'To Be Assigned',
      branch: data.branch,
      service: data.treatment,
      appointment_date: data.date,
      appointment_time: data.timeSlot,
      booking_date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      symptoms: data.message || '',
      notes: ''
    };

    try {
      const { error } = await supabase.client
        .from('appointments')
        .insert(newApt);

      if (error) {
        console.error('Error booking appointment on Supabase:', error);
        return false;
      } else {
        const patientFormat: Appointment = {
          id: newId,
          name: data.name,
          phone: data.phone,
          treatment: data.treatment,
          branch: data.branch as any,
          date: data.date,
          timeSlot: data.timeSlot,
          message: data.message,
          createdAt: new Date().toISOString(),
          status: 'Pending'
        };
        setAppointments(prev => [patientFormat, ...prev]);
        
        const existingSessionIds = JSON.parse(sessionStorage.getItem('my_booked_ids') || '[]');
        sessionStorage.setItem('my_booked_ids', JSON.stringify([newId, ...existingSessionIds]));
        return true;
      }
    } catch (e) {
      console.error('Exception booking appointment:', e);
      return false;
    }
  };

  const handleCancelAppointment = async (id: string) => {
    try {
      const { error } = await supabase.client
        .from('appointments')
        .update({ status: 'Cancelled' })
        .eq('id', id);

      if (error) {
        console.error('Error cancelling appointment on Supabase:', error);
      } else {
        setAppointments(prev => prev.filter((apt) => apt.id !== id));
        const bookedIds = JSON.parse(sessionStorage.getItem('my_booked_ids') || '[]');
        const updatedIds = bookedIds.filter((bid: string) => bid !== id);
        sessionStorage.setItem('my_booked_ids', JSON.stringify(updatedIds));
      }
    } catch (e) {
      console.error('Exception cancelling appointment:', e);
    }
  };

  const ALL_MODAL_TIME_SLOTS = [
    '09:00 AM - 10:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '04:00 PM - 05:00 PM',
    '06:00 PM - 07:00 PM',
    '07:00 PM - 08:00 PM',
  ];

  // Appointment Modal Inner setup with form controls (fully integrated!)
  const [modalForm, setModalForm] = useState({
    name: '',
    phone: '',
    date: '',
    branch: 'Gayatrinagar Branch',
    timeSlot: '09:00 AM - 10:00 AM',
    message: '',
  });

  const [modalFormSubmitted, setModalFormSubmitted] = useState(false);
  const [modalBookedSlots, setModalBookedSlots] = useState<string[]>([]);
  const [bookingError, setBookingError] = useState('');

  // Dynamic slot lookup for popup modal
  useEffect(() => {
    let active = true;
    const loadSlots = async () => {
      if (!modalForm.date || !modalForm.branch) return;
      try {
        const booked = await appointmentService.getBookedSlots(modalForm.date, modalForm.branch);
        if (active) {
          setModalBookedSlots(booked);
          
          // Auto select first available if currently selected slot is booked
          const available = ALL_MODAL_TIME_SLOTS.filter(s => !booked.includes(s));
          if (available.length > 0 && !available.includes(modalForm.timeSlot)) {
            setModalForm(prev => ({ ...prev, timeSlot: available[0] }));
          }
        }
      } catch (err) {
        console.error('Error loading booked slots for modal:', err);
      }
    };
    loadSlots();
    return () => {
      active = false;
    };
  }, [modalForm.date, modalForm.branch]);

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError('');
    if (!modalForm.name.trim() || !modalForm.phone.trim() || !modalForm.date) {
      return;
    }

    const success = await handleBookAppointment({
      name: modalForm.name,
      phone: modalForm.phone,
      treatment: appointmentTreatment,
      branch: modalForm.branch,
      date: modalForm.date,
      timeSlot: modalForm.timeSlot,
      message: modalForm.message,
    });

    if (success) {
      setModalFormSubmitted(true);
    } else {
      setBookingError('This appointment slot has already been booked. Please select another available time.');
    }
  };

  // Switch rendered pages dynamically (state & hash controller)
  const renderPage = () => {
    if (currentPage.startsWith('services/')) {
      const slug = currentPage.substring('services/'.length);
      return (
        <ServiceDetail
          slug={slug}
          openAppointmentModal={openAppointmentModal}
          setCurrentPage={setCurrentPage}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            openAppointmentModal={openAppointmentModal} 
            heroHeading={heroHeading}
            heroDescription={heroDescription}
            heroBgImage={heroBgImage}
            heroBgImageMobile={heroBgImageMobile}
            mediaImages={mediaImages}
            patientMoments={patientMoments}
            videosList={videosList}
            contactInfo={contactInfo}
          />
        );
      case 'about':
        return <About openAppointmentModal={openAppointmentModal} />;
      case 'treatments':
        return <Treatments openAppointmentModal={openAppointmentModal} />;
      case 'sameday':
        return <SameDayFix openAppointmentModal={openAppointmentModal} contactInfo={contactInfo} />;
      case 'implants':
        return (
          <ServiceDetail
            slug="dental-implants"
            openAppointmentModal={openAppointmentModal}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'gallery':
        return (
          <SmileGallery
            onSelectItem={(item) => setSelectedGalleryItem(item)}
            openAppointmentModal={openAppointmentModal}
            galleryItems={mappedGalleryItems}
          />
        );
      case 'doctors':
        return <Doctors openAppointmentModal={openAppointmentModal} doctorsList={doctorsList} />;
      case 'contact':
        return (
          <Contact
            preselectedTreatment={appointmentTreatment}
            onBookAppointment={handleBookAppointment}
            contactInfo={contactInfo}
          />
        );
      case 'admin/login':
        return <AdminLogin setCurrentPage={setCurrentPage} session={session} />;
      case 'supabase-test':
        return <SupabaseTest setCurrentPage={setCurrentPage} />;
      case 'admin':
        if (isAuthLoading) {
          return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
              <span className="animate-spin text-brand-navy rounded-full h-8 w-8 border-b-2 border-slate-900"></span>
              <p className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Verifying Admin Session...</p>
            </div>
          );
        }
        return (
          <Admin 
            setCurrentPage={setCurrentPage} 
            heroHeading={heroHeading}
            setHeroHeading={setHeroHeading}
            heroDescription={heroDescription}
            setHeroDescription={setHeroDescription}
            heroBgImage={heroBgImage}
            setHeroBgImage={setHeroBgImage}
            heroBgImageMobile={heroBgImageMobile}
            setHeroBgImageMobile={setHeroBgImageMobile}
            doctorsList={doctorsList}
            setDoctorsList={setDoctorsList}
            mediaImages={mediaImages}
            setMediaImages={setMediaImages}
            patientMoments={patientMoments}
            setPatientMoments={setPatientMoments}
            videosList={videosList}
            setVideosList={setVideosList}
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
          />
        );
      default:
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            openAppointmentModal={openAppointmentModal} 
            heroHeading={heroHeading}
            heroDescription={heroDescription}
            heroBgImage={heroBgImage}
            mediaImages={mediaImages}
            patientMoments={patientMoments}
            videosList={videosList}
            contactInfo={contactInfo}
          />
        );
    }
  };

  const onUpdateIndex = (index: number) => {
    setSelectedGalleryItem(mappedGalleryItems[index]);
  };

  return (
    <div id="react-main-frame" className="min-h-screen flex flex-col justify-between relative bg-white selection:bg-brand-cyan/20 selection:text-brand-navy">
      
      {/* Sticky Premium Navbar */}
      {currentPage !== 'admin' && currentPage !== 'admin/login' && currentPage !== 'supabase-test' && (
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          openAppointmentModal={() => openAppointmentModal()}
          contactInfo={contactInfo}
        />
      )}

      {/* Main Dynamic Workspace Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating interactive My Appointments Indicator drawer */}
      {appointments.length > 0 && currentPage !== 'contact' && currentPage !== 'admin' && currentPage !== 'admin/login' && currentPage !== 'supabase-test' && (
        <div id="appointments-status-badge" className="hidden lg:block fixed bottom-6 left-6 z-40 bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 max-w-sm">
          <div className="flex justify-between items-center pb-2 border-b border-gray-150 mb-2">
            <span className="text-xs font-extrabold text-brand-navy flex items-center">
              <CheckSquare className="h-4 w-4 text-emerald-500 mr-1.5" />
              Active Reservation tickets
            </span>
            <span className="text-[10px] bg-brand-cyan/10 text-brand-cyan px-2 py-0.5 font-bold rounded-full">
              {appointments.length}
            </span>
          </div>
          <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
            {appointments.slice(0, 2).map((apt) => (
              <div key={apt.id} className="text-xs font-sans text-gray-500 bg-gray-50 p-2 rounded-lg relative">
                <button
                  onClick={() => handleCancelAppointment(apt.id)}
                  className="absolute top-1.5 right-1.5 text-gray-400 hover:text-rose-500 cursor-pointer"
                  title="Cancel appointment ticket"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
                <div className="font-bold text-slate-800 leading-snug">{apt.treatment}</div>
                <div className="text-[10px] mt-0.5">
                  Date: {apt.date} · {apt.timeSlot}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full text-center text-[10px] font-bold text-brand-cyan hover:underline mt-2.5 block"
          >
            Manage all appointments &rarr;
          </button>
        </div>
      )}

      {/* Elegant Footer area */}
      {currentPage !== 'admin' && currentPage !== 'admin/login' && currentPage !== 'supabase-test' && (
        <Footer
          setCurrentPage={setCurrentPage}
          openAppointmentModal={() => openAppointmentModal()}
          contactInfo={contactInfo}
        />
      )}

      {/* Floating active emergency action and booking widget */}
      {currentPage !== 'admin' && currentPage !== 'admin/login' && currentPage !== 'supabase-test' && (
        <FloatingActionPanel 
          openAppointmentModal={openAppointmentModal} 
          contactInfo={contactInfo}
        />
      )}

      {/* Custom Comparison Lightbox */}
      <Lightbox
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
        items={mappedGalleryItems}
        setCurrentIndex={onUpdateIndex}
      />

      {/* Global Appointment Booking Modal Popover */}
      <AnimatePresence>
        {isAppointmentOpen && (
          <div
            id="appointment-modal-overlay"
            className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Modal backdrop click closer */}
            <div className="absolute inset-0 cursor-default" onClick={() => setIsAppointmentOpen(false)} />

            <motion.div
              id="appointment-modal-box"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-3xl w-full max-w-lg z-10 overflow-hidden shadow-2xl border border-gray-150"
            >
              
              {/* Header block */}
              <div className="bg-brand-navy p-6 text-white flex justify-between items-center relative">
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-lg leading-none">
                    Book Dental Appointment
                  </h3>
                  <span className="text-[11px] text-brand-cyan font-semibold block uppercase tracking-wider">
                    Dental Consultation
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsAppointmentOpen(false);
                    setModalFormSubmitted(false);
                    setBookingError('');
                    setModalForm({
                      name: '',
                      phone: '',
                      date: '',
                      branch: 'Gayatrinagar Branch',
                      timeSlot: '09:00 AM - 10:00 AM',
                      message: '',
                    });
                  }}
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form Content area */}
              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {!modalFormSubmitted ? (
                    <motion.form
                      key="modal-form-view"
                      onSubmit={handleModalSubmit}
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {bookingError && (
                        <div className="p-3 bg-red-50 border border-red-150 rounded-xl text-red-600 text-xs font-semibold">
                          {bookingError}
                        </div>
                      )}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                          Patient's Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={modalForm.name}
                          onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                          placeholder="Enter patient's full name"
                          className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                          WhatsApp Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={modalForm.phone}
                          onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                          placeholder="Enter WhatsApp mobile number"
                          className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            required
                            value={modalForm.date}
                            onChange={(e) => setModalForm({ ...modalForm, date: e.target.value })}
                            placeholder="DD-MM-YYYY"
                            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                            Timing Quadrant *
                          </label>
                          <select
                            value={modalForm.timeSlot}
                            onChange={(e) => setModalForm({ ...modalForm, timeSlot: e.target.value })}
                            disabled={ALL_MODAL_TIME_SLOTS.filter(s => !modalBookedSlots.includes(s)).length === 0}
                            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none disabled:opacity-60"
                          >
                            {ALL_MODAL_TIME_SLOTS.filter(s => !modalBookedSlots.includes(s)).map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                            {ALL_MODAL_TIME_SLOTS.filter(s => !modalBookedSlots.includes(s)).length === 0 && (
                              <option value="">No slots available</option>
                            )}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                          Preferred Clinic Branch *
                        </label>
                        <select
                          value={modalForm.branch}
                          onChange={(e) => setModalForm({ ...modalForm, branch: e.target.value })}
                          className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                        >
                          <option value="Gayatrinagar Branch">Gayatrinagar Branch</option>
                          <option value="Amin Marg Branch">Amin Marg Branch</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                          Symptoms (Optional)
                        </label>
                        <textarea
                          rows={2}
                          value={modalForm.message}
                          onChange={(e) => setModalForm({ ...modalForm, message: e.target.value })}
                          placeholder="Describe symptoms or additional notes..."
                          className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-brand-cyan hover:bg-brand-navy text-white text-xs font-bold rounded-xl shadow-lg transition"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="modal-success-view"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center p-6 space-y-4"
                    >
                      <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                        <Check className="h-7 w-7 stroke-[2.5]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display font-extrabold text-lg text-brand-navy">
                          Slot Confirmed on System!
                        </h4>
                        <p className="text-gray-500 text-xs font-sans max-w-sm mx-auto leading-relaxed">
                          We have reserved your consultation for <span className="font-semibold text-brand-navy">{modalForm.name}</span>. A dental coordinator will coordinate with you to confirm the exact consultation slot entry.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-150 text-left text-xs font-sans text-gray-500 space-y-1 max-w-xs mx-auto">
                        <div>
                          <strong>Service Assigned:</strong> {appointmentTreatment}
                        </div>
                        <div>
                          <strong>Branch Desk:</strong> {modalForm.branch}
                        </div>
                        <div>
                          <strong>Selected Date:</strong> {modalForm.date}
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => {
                            setIsAppointmentOpen(false);
                            setModalFormSubmitted(false);
                            setBookingError('');
                            setModalForm({
                              name: '',
                              phone: '',
                              date: '',
                              branch: 'Gayatrinagar Branch',
                              timeSlot: '09:00 AM - 10:00 AM',
                              message: '',
                            });
                          }}
                          className="px-6 py-2 bg-brand-navy hover:bg-brand-cyan text-white text-xs font-semibold rounded-lg"
                        >
                          Return to Hospital Page
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
