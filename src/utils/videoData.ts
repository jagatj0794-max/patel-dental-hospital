/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DentalVideo } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

export const DEFAULT_VIDEOS: DentalVideo[] = [
  { id: 'cyai6CjMD0s', title: 'Dental Implants Treatment Experience', treatment: 'Dental Implants' },
  { id: 'SnOxxv_S2ew', title: 'Full Mouth Rehabilitation Success Story', treatment: 'Full Mouth Rehab' },
  { id: '2okui6RFf_k', title: 'Life-changing Invisible Aligners Transformation', treatment: 'Invisible Aligners' },
  { id: '-eoVpGDqCRs', title: 'Patient Testimonial on Digital Dental Care', treatment: 'Advanced Dental Care' },
  { id: 'VZyPnTzlR9U', title: 'Complete Smile Makeover & Dental Implants', treatment: 'Smile Makeover' },
  { id: 'DBejq69FOGI', title: 'Painless Treatment and Care Experience', treatment: 'General Dentistry' }
];

export const videoService = {
  /**
   * Fetches all videos from Supabase.
   * If table is empty, seeds default videos.
   */
  getVideos: async (): Promise<DentalVideo[]> => {
    if (!isSupabaseConfigured()) {
      return DEFAULT_VIDEOS;
    }

    try {
      const { data, error } = await supabase.client
        .from('videos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.warn('Error fetching videos from Supabase:', error);
        return DEFAULT_VIDEOS;
      }

      if (!data || data.length === 0) {
        // Table is empty, seed defaults
        const initialRows = DEFAULT_VIDEOS.map((video, idx) => ({
          id: video.id,
          title: video.title,
          treatment: video.treatment,
          display_order: idx
        }));

        const { error: seedError } = await supabase.client
          .from('videos')
          .insert(initialRows);

        if (seedError) {
          console.warn('Error seeding default videos:', seedError);
        }

        return DEFAULT_VIDEOS;
      }

      return data.map((row: any) => ({
        id: row.id,
        title: row.title || '',
        treatment: row.treatment || ''
      }));
    } catch (e) {
      console.warn('Exception in getVideos:', e);
      return DEFAULT_VIDEOS;
    }
  },

  /**
   * Saves the entire list of videos to Supabase.
   * Deletes those not present in current set.
   */
  saveVideos: async (videos: DentalVideo[]): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      return false;
    }

    try {
      const rowsToUpsert = videos.map((video, idx) => ({
        id: video.id,
        title: video.title,
        treatment: video.treatment,
        display_order: idx
      }));

      const videoIds = videos.map(v => v.id);

      // Delete items not in current selection
      if (videoIds.length > 0) {
        const { error: deleteError } = await supabase.client
          .from('videos')
          .delete()
          .not('id', 'in', `(${videoIds.map(id => `'${id}'`).join(',')})`);

        if (deleteError) {
          console.warn('Error deleting obsolete videos:', deleteError);
        }
      } else {
        const { error: deleteError } = await supabase.client
          .from('videos')
          .delete()
          .neq('id', 'dummy_nonexistent_id');

        if (deleteError) {
          console.warn('Error deleting all videos:', deleteError);
        }
      }

      // Upsert current set of videos
      if (rowsToUpsert.length > 0) {
        const { error: upsertError } = await supabase.client
          .from('videos')
          .upsert(rowsToUpsert);

        if (upsertError) {
          console.error('Error upserting videos:', upsertError);
          return false;
        }
      }

      return true;
    } catch (e) {
      console.error('Exception in saveVideos:', e);
      return false;
    }
  }
};
