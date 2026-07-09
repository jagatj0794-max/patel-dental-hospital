/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase, isSupabaseConfigured } from './supabase';
import { PatientMoment } from '../types';
import { PATIENT_MOMENTS } from '../data/patientMoments';

export interface MediaImage {
  id: string;
  url: string;
  title: string;
  category: string;
  branch: string;
  altText?: string;
}

export const DEFAULT_MEDIA_IMAGES: MediaImage[] = [
  { id: 'img-1', url: '/6.jpeg', title: 'Before & After Smile Transformation', category: 'Before / After', branch: 'All Branches', altText: 'Complete smile reconstruction case' },
  { id: 'img-2', url: '/Dr kinjal patel 2.png', title: 'Microscopic Dental Diagnostics', category: 'Clinic Interior', branch: 'Amin Marg Branch', altText: 'Our high-tech microscopic dental operatory' },
  { id: 'img-3', url: '/patel dental doctors.jpeg', title: 'High-Tech Dental Operatory', category: 'Dental Implants', branch: 'Gayatrinagar Branch', altText: 'Dental implant surgery room setup' },
  { id: 'img-4', url: '/patel dental hospital doctors.png', title: 'Clinical Medical Faculty', category: 'Doctors', branch: 'All Branches', altText: 'Team of experienced doctors at Patel Dental Hospital' },
  { id: 'img-5', url: '/patel mobile hero.jpeg', title: 'Premium Patient Care Ward', category: 'Homepage Slider', branch: 'All Branches', altText: 'Our premium recovery ward for patients' },
  { id: 'img-6', url: '/Dr. kinjal patel.png', title: 'Expert Consultation Panel', category: 'Homepage Gallery', branch: 'Amin Marg Branch', altText: 'Expert consult meeting room' },
];

export interface GalleryData {
  mediaImages: MediaImage[];
  patientMoments: PatientMoment[];
}

export const galleryService = {
  /**
   * Fetches all gallery records from Supabase.
   * If empty, seeds the table with defaults.
   */
  getGalleryData: async (): Promise<GalleryData> => {
    if (!isSupabaseConfigured()) {
      return {
        mediaImages: DEFAULT_MEDIA_IMAGES,
        patientMoments: PATIENT_MOMENTS
      };
    }

    try {
      const { data, error } = await supabase.client
        .from('gallery')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.warn('Error fetching gallery from Supabase:', error);
        return {
          mediaImages: DEFAULT_MEDIA_IMAGES,
          patientMoments: PATIENT_MOMENTS
        };
      }

      if (!data || data.length === 0) {
        // Table is empty, seed defaults
        const initialRows: any[] = [];
        
        DEFAULT_MEDIA_IMAGES.forEach((img, idx) => {
          initialRows.push({
            id: img.id,
            item_type: 'general',
            url: img.url,
            title: img.title,
            category: img.category,
            branch: img.branch,
            alt_text: img.altText || '',
            display_order: idx
          });
        });

        PATIENT_MOMENTS.forEach((moment, idx) => {
          initialRows.push({
            id: moment.id,
            item_type: 'smile',
            url: moment.image,
            title: '',
            category: '',
            branch: '',
            alt_text: '',
            display_order: DEFAULT_MEDIA_IMAGES.length + idx
          });
        });

        const { error: seedError } = await supabase.client
          .from('gallery')
          .insert(initialRows);

        if (seedError) {
          console.warn('Error seeding default gallery items:', seedError);
        }

        return {
          mediaImages: DEFAULT_MEDIA_IMAGES,
          patientMoments: PATIENT_MOMENTS
        };
      }

      // Separate rows into general media images and smile patient moments
      const mediaImages: MediaImage[] = [];
      const patientMoments: PatientMoment[] = [];

      data.forEach((row: any) => {
        if (row.item_type === 'general') {
          mediaImages.push({
            id: row.id,
            url: row.url,
            title: row.title || '',
            category: row.category || 'Homepage Gallery',
            branch: row.branch || 'All Branches',
            altText: row.alt_text || ''
          });
        } else if (row.item_type === 'smile') {
          patientMoments.push({
            id: row.id,
            image: row.url
          });
        }
      });

      return { mediaImages, patientMoments };
    } catch (e) {
      console.warn('Exception in getGalleryData:', e);
      return {
        mediaImages: DEFAULT_MEDIA_IMAGES,
        patientMoments: PATIENT_MOMENTS
      };
    }
  },

  /**
   * Saves both General Media images and Smile moments to Supabase.
   * Replaces any existing items and removes those not present.
   */
  saveGalleryData: async (mediaImages: MediaImage[], patientMoments: PatientMoment[]): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      return false;
    }

    try {
      const rowsToInsert: any[] = [];
      const currentIds: string[] = [];

      mediaImages.forEach((img, idx) => {
        currentIds.push(img.id);
        rowsToInsert.push({
          id: img.id,
          item_type: 'general',
          url: img.url,
          title: img.title || '',
          category: img.category || 'Homepage Gallery',
          branch: img.branch || 'All Branches',
          alt_text: img.altText || '',
          display_order: idx
        });
      });

      patientMoments.forEach((moment, idx) => {
        currentIds.push(moment.id);
        rowsToInsert.push({
          id: moment.id,
          item_type: 'smile',
          url: moment.image,
          title: '',
          category: '',
          branch: '',
          alt_text: '',
          display_order: mediaImages.length + idx
        });
      });

      // Delete items that are no longer present in currentIds
      if (currentIds.length > 0) {
        const { error: deleteError } = await supabase.client
          .from('gallery')
          .delete()
          .not('id', 'in', `(${currentIds.map(id => `'${id}'`).join(',')})`);

        if (deleteError) {
          console.warn('Error deleting obsolete gallery items:', deleteError);
        }
      } else {
        const { error: deleteError } = await supabase.client
          .from('gallery')
          .delete()
          .neq('id', 'dummy_nonexistent_id');

        if (deleteError) {
          console.warn('Error deleting all gallery items:', deleteError);
        }
      }

      // Upsert current set of items
      if (rowsToInsert.length > 0) {
        const { error: upsertError } = await supabase.client
          .from('gallery')
          .upsert(rowsToInsert);

        if (upsertError) {
          console.error('Error upserting gallery items:', upsertError);
          return false;
        }
      }

      return true;
    } catch (e) {
      console.error('Exception in saveGalleryData:', e);
      return false;
    }
  }
};
