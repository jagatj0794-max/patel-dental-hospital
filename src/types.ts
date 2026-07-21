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
  | 'supabase-test'
  | string;

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
  branch: 'Amin Marg Branch' | 'Gayatrinagar Branch';
  experience?: string; // Experience in years
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  email?: string;
  treatment: string;
  branch: 'Gayatrinagar Branch' | 'Amin Marg Branch';
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

export interface DentalVideo {
  id: string; // YouTube Video ID
  title: string;
  treatment: string;
}

export interface MarketingConfig {
  process_section_title?: string;
  benefits_section_title?: string;
  // Offer Banner
  show_offer_banner?: boolean;
  offer_title?: string;
  offer_subtitle?: string;
  offer_description?: string;
  offer_badge_text?: string;
  offer_button_text?: string;
  offer_button_link?: string;

  // Media Enhancements
  hero_image_alt?: string;
  procedure_videos?: {
    title: string;
    video_url: string;
    thumbnail?: string;
    description?: string;
    display_order: number;
  }[];
  hospital_photos?: {
    image_url: string;
    title?: string;
    caption?: string;
    display_order: number;
  }[];
  team_photos?: {
    image_url: string;
    title?: string;
    caption?: string;
    display_order: number;
    // legacy support fields
    name?: string;
    designation?: string;
    photo_url?: string;
  }[];
  equipment_photos?: {
    image_url: string;
    title?: string;
    caption?: string;
    display_order: number;
    // legacy support fields
    name?: string;
  }[];

  // Call To Action
  primary_cta_btn_text?: string;
  primary_cta_action?: 'appointment' | 'custom';
  primary_cta_link?: string;
  secondary_cta_btn_text?: string;
  secondary_cta_action?: 'whatsapp' | 'call' | 'custom';
  secondary_cta_link?: string;

  // CTA Settings Manager
  cta_appointment_enabled?: boolean;
  cta_appointment_text?: string;
  cta_appointment_dest?: 'appointment' | 'internal' | 'external';
  cta_appointment_dest_value?: string;

  cta_call_enabled?: boolean;
  cta_call_text?: string;
  cta_call_dest?: 'clinic' | 'custom';
  cta_call_dest_value?: string;

  cta_whatsapp_enabled?: boolean;
  cta_whatsapp_text?: string;
  cta_whatsapp_dest?: 'clinic' | 'custom';
  cta_whatsapp_dest_value?: string;

  cta_custom_enabled?: boolean;
  cta_custom_text?: string;
  cta_custom_dest_value?: string;

  // Contact Information
  contact_call_number?: string;
  contact_whatsapp_number?: string;
  contact_email?: string;
  contact_address?: string;
  contact_map_url?: string;

  // Follow Us
  social_facebook?: string;
  social_facebook_enabled?: boolean;
  social_instagram?: string;
  social_instagram_enabled?: boolean;
  social_youtube?: string;
  social_youtube_enabled?: boolean;
  social_linkedin?: string;
  social_linkedin_enabled?: boolean;
  social_twitter?: string;
  social_twitter_enabled?: boolean;
  social_whatsapp?: string;
  social_whatsapp_enabled?: boolean;

  // Bottom CTA Section
  bottom_cta_heading?: string;
  bottom_cta_description?: string;
  bottom_cta_primary_btn_text?: string;
  bottom_cta_primary_btn_link?: string;
  bottom_cta_secondary_btn_text?: string;
  bottom_cta_secondary_btn_link?: string;

  // Contact Bar
  contact_bar_show?: boolean;
  contact_bar_call_enabled?: boolean;
  contact_bar_whatsapp_enabled?: boolean;
  contact_bar_appointment_enabled?: boolean;

  // Bottom Contact Overrides
  contact_clinic_name?: string;
  contact_working_hours?: string;

  // Section Visibility Flags
  show_hero?: boolean;
  show_introduction?: boolean;
  show_process?: boolean;
  show_benefits?: boolean;
  show_gallery?: boolean;
  show_procedure_video?: boolean;
  show_hospital_photos?: boolean;
  show_team_photos?: boolean;
  show_testimonials?: boolean;
  show_faq?: boolean;
  show_related_services?: boolean;
  show_bottom_cta?: boolean;

  // Green Highlight Line
  green_highlight_line?: string;

  // Custom Related Services List
  related_services?: { id: string; enabled: boolean }[];

  // Written Reviews & Case Transformations
  written_reviews?: {
    id: string;
    patient_name: string;
    treatment_name: string;
    review: string;
    rating: number; // 1 to 5
    before_image?: string;
    after_image?: string;
    display_order: number;
  }[];
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  hero_image: string;
  icon?: string | null;
  display_order: number;
  is_active: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  homepage_card_image?: string | null;
  homepage_short_description?: string | null;
  hero_title?: string | null;
  hero_description?: string | null;
  hero_image_caption?: string | null;
  intro_title?: string | null;
  intro_description?: string | null;
  process_steps?: any[] | string | null;
  features?: any[] | string | null;
  content_images?: any[] | string | null;
  procedure_video_url?: string | null;
  procedure_video_title?: string | null;
  procedure_video_description?: string | null;
  procedure_video_thumbnail?: string | null;
  patient_testimonials?: any[] | string | null;
  hospital_team_photos?: any[] | string | null;
  marketing_config?: MarketingConfig | string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceGalleryItem {
  id: string;
  service_id: string;
  image_url: string;
  title?: string | null;
  caption?: string | null;
  alt_text?: string | null;
  display_order: number;
  created_at?: string;
}

export interface ServiceFaq {
  id: string;
  service_id: string;
  question: string;
  answer: string;
  display_order: number;
}





