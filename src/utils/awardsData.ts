/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase, isSupabaseConfigured } from './supabase';
import { Award } from '../types';
import awardOneImg from '../assets/images/dental_award_one_1785240617811.jpg';
import awardTwoImg from '../assets/images/dental_award_two_1785240636637.jpg';

export const DEFAULT_AWARDS: Award[] = [
  {
    id: 'award-1',
    title: 'Best Dental Hospital in Gujarat',
    description: 'Awarded for outstanding patient care, cutting-edge technology, and excellence in implantology and cosmetic dentistry.',
    image: awardOneImg,
    display_order: 0,
    is_visible: true
  },
  {
    id: 'award-2',
    title: 'Excellence in Smile Makeovers',
    description: 'Recognized as the leading center for cosmetic dentistry and advanced smile designs in Rajkot.',
    image: awardTwoImg,
    display_order: 1,
    is_visible: true
  }
];

export const awardsService = {
  /**
   * Fetches all awards.
   * Uses localStorage fallback and gracefully handles if Supabase table 'awards' doesn't exist.
   */
  getAwards: async (): Promise<Award[]> => {
    let localAwards: Award[] | null = null;
    try {
      const local = localStorage.getItem('patel_dental_awards_list');
      if (local) {
        localAwards = JSON.parse(local);
        if (localAwards && localAwards.some(a => !a.image || a.image.includes('unsplash.com'))) {
          localStorage.removeItem('patel_dental_awards_list');
          localAwards = null;
        }
      }
    } catch (e) {
      console.warn('Failed to parse local awards storage:', e);
    }

    if (!isSupabaseConfigured()) {
      return (localAwards && localAwards.length > 0) ? localAwards : DEFAULT_AWARDS;
    }

    try {
      const { data, error } = await supabase.client
        .from('awards')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.warn('Error fetching awards from Supabase (may be table does not exist):', error);
        return (localAwards && localAwards.length > 0) ? localAwards : DEFAULT_AWARDS;
      }

      if (!data || data.length === 0) {
        // Seed default awards if table exists but is empty
        try {
          const rows = DEFAULT_AWARDS.map((aw, idx) => ({
            id: aw.id,
            title: aw.title,
            description: aw.description || '',
            image: aw.image,
            display_order: idx,
            is_visible: aw.is_visible
          }));
          await supabase.client.from('awards').insert(rows);
        } catch (seedErr) {
          console.warn('Could not seed empty awards table:', seedErr);
        }
        return DEFAULT_AWARDS;
      }

      const remoteAwards = data.map((row: any) => ({
        id: row.id,
        title: row.title || '',
        description: row.description || '',
        image: row.image || '',
        display_order: Number(row.display_order) || 0,
        is_visible: row.is_visible !== false
      }));

      try {
        localStorage.setItem('patel_dental_awards_list', JSON.stringify(remoteAwards));
      } catch (e) {
        console.warn('Error caching remote awards locally:', e);
      }

      return remoteAwards;
    } catch (e) {
      console.warn('Exception in getAwards:', e);
      return (localAwards && localAwards.length > 0) ? localAwards : DEFAULT_AWARDS;
    }
  },

  /**
   * Saves the list of awards.
   * Updates localStorage and gracefully attempts to sync with Supabase.
   */
  saveAwards: async (awards: Award[]): Promise<boolean> => {
    try {
      localStorage.setItem('patel_dental_awards_list', JSON.stringify(awards));
    } catch (e) {
      console.warn('Failed to save awards to localStorage:', e);
    }

    if (!isSupabaseConfigured()) {
      return true;
    }

    try {
      const rowsToUpsert = awards.map((aw, idx) => ({
        id: aw.id,
        title: aw.title,
        description: aw.description || '',
        image: aw.image,
        display_order: idx,
        is_visible: aw.is_visible
      }));

      const awardIds = awards.map(a => a.id);

      // Delete remote awards that are no longer in our list
      if (awardIds.length > 0) {
        const { error: deleteError } = await supabase.client
          .from('awards')
          .delete()
          .not('id', 'in', `(${awardIds.map(id => `'${id}'`).join(',')})`);
        if (deleteError) {
          console.warn('Error deleting obsolete awards from Supabase:', deleteError);
        }
      } else {
        await supabase.client.from('awards').delete().neq('id', 'dummy_nonexistent_id');
      }

      const { error: upsertError } = await supabase.client
        .from('awards')
        .upsert(rowsToUpsert);

      if (upsertError) {
        console.warn('Error upserting awards in Supabase (may be table does not exist):', upsertError);
        return true; // Return true as localStorage fallback succeeded
      }

      return true;
    } catch (e) {
      console.warn('Exception in saveAwards:', e);
      return true;
    }
  }
};
