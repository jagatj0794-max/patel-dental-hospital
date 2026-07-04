/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId =
  | 'home'
  | 'about'
  | 'treatments'
  | 'sameday'
  | 'implants'
  | 'gallery'
  | 'doctors'
  | 'contact'
  | 'admin'
  | 'admin/login'
  | 'supabase-test';

export interface Treatment {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  benefits: string[];
  duration?: string;
  image: string;
  popular?: boolean;
}

export interface GalleryItem {
  id: string;
  category: 'implant' | 'sameday' | 'smile' | 'rehab' | 'ortho' | 'general' | 'cosmetic';
  title: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  layoutType: 'close-up' | 'full-smile' | 'face-profile' | 'macro-implant' | 'cosmetic-makeover';
  patientTag: string;
  privacyProtection: boolean;
  difficulty: 'Standard' | 'High' | 'Expert Level';
}

export interface Doctor {
  id: string;
  name: string;
  titles: string; // Qualification (e.g. BDS)
  designation: string; // Specialization
  img: string; // Photo Url or Base64 data string
  briefIntro: string; // Short Description
  quote: string;
  bdsYear: string;
  bdsInstitution: string;
  stats: { value: string; label: string }[];
  expertises: { title: string; desc: string }[];
  branch: 'Mavdi Branch' | 'Gayatrinagar Branch';
  experience?: string; // Experience in years
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  email?: string;
  treatment: string;
  branch: 'Gayatrinagar Road (Jalaram Chowk)' | 'Mavdi Main Road (Business Centrum)';
  date: string;
  timeSlot: string;
  message?: string;
  createdAt: string;
  status: 'Pending' | 'Confirmed';
}

export interface PatientMoment {
  id: string;
  image: string;
}

export interface ContactInfo {
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  address: string;
  mapsLink: string;
}




