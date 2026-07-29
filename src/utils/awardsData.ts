/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from './supabase';
import { Award } from '../types';

export const awardsService = {
  /**
   * Fetches all awards directly from public.awards table sorted by display_order ASC.
   */
  getAwards: async (): Promise<Award[]> => {
    try {
      const { data, error } = await supabase.client
        .from('awards')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching awards from public.awards table:', error);
        return [];
      }

      console.log('[Fetch Success] Successfully fetched awards from public.awards');
      console.log('[Records Returned] Records returned from Supabase public.awards:', data);

      if (!data) return [];

      return data.map((row: any) => ({
        id: row.id,
        title: row.title || '',
        image_url: row.image_url || '',
        display_order: Number(row.display_order) || 0,
        is_active: row.is_active !== false,
        created_at: row.created_at,
        updated_at: row.updated_at
      }));
    } catch (e) {
      console.error('Exception in getAwards:', e);
      return [];
    }
  },

  /**
   * Saves or updates a single award in public.awards table.
   */
  saveAward: async (award: Award): Promise<boolean> => {
    try {
      const row = {
        id: award.id,
        title: award.title || '',
        image_url: award.image_url || '',
        display_order: award.display_order || 0,
        is_active: award.is_active !== false,
        updated_at: new Date().toISOString()
      };

      // Check if award already exists
      const { data: existing } = await supabase.client
        .from('awards')
        .select('id')
        .eq('id', award.id)
        .maybeSingle();

      if (existing) {
        const { data, error } = await supabase.client
          .from('awards')
          .update(row)
          .eq('id', award.id)
          .select();

        if (error) {
          console.error('Error updating award in public.awards:', error);
          return false;
        }

        console.log('[Update Success] Successfully updated award in public.awards:', data);
      } else {
        const { data, error } = await supabase.client
          .from('awards')
          .insert(row)
          .select();

        if (error) {
          console.error('Error inserting award into public.awards:', error);
          return false;
        }

        console.log('[Insert Success] Successfully inserted award into public.awards:', data);
      }

      return true;
    } catch (e) {
      console.error('Exception in saveAward:', e);
      return false;
    }
  },

  /**
   * Deletes an award record from public.awards table.
   */
  deleteAward: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase.client
        .from('awards')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting award from public.awards table:', error);
        return false;
      }

      console.log('[Delete Success] Successfully deleted award from public.awards:', id);
      return true;
    } catch (e) {
      console.error('Exception in deleteAward:', e);
      return false;
    }
  },

  /**
   * Saves the entire list of awards to public.awards.
   * Removes records no longer present in the list, and upserts current awards.
   */
  saveAwards: async (awards: Award[]): Promise<boolean> => {
    try {
      // 1. Fetch current IDs in database
      const { data: existingData, error: fetchErr } = await supabase.client
        .from('awards')
        .select('id');

      const existingIds = new Set((existingData || []).map((row: any) => row.id));

      if (!fetchErr && existingData) {
        const currentIds = new Set(awards.map(a => a.id));
        const idsToDelete = existingData
          .map((row: any) => row.id)
          .filter((id: string) => !currentIds.has(id));

        if (idsToDelete.length > 0) {
          const { error: deleteErr } = await supabase.client
            .from('awards')
            .delete()
            .in('id', idsToDelete);

          if (deleteErr) {
            console.warn('Error deleting removed awards from public.awards:', deleteErr);
          } else {
            console.log('[Delete Success] Removed obsolete awards from public.awards:', idsToDelete);
          }
        }
      }

      // 2. Insert or update each record
      for (let idx = 0; idx < awards.length; idx++) {
        const aw = awards[idx];
        const row = {
          id: aw.id,
          title: aw.title || '',
          image_url: aw.image_url || '',
          display_order: idx,
          is_active: aw.is_active !== false,
          updated_at: new Date().toISOString()
        };

        if (existingIds.has(aw.id)) {
          const { data, error } = await supabase.client
            .from('awards')
            .update(row)
            .eq('id', aw.id)
            .select();

          if (error) {
            console.error(`Error updating award ${aw.id} in public.awards:`, error);
          } else {
            console.log('[Update Success] Successfully updated award in public.awards:', data);
          }
        } else {
          const { data, error } = await supabase.client
            .from('awards')
            .insert(row)
            .select();

          if (error) {
            console.error(`Error inserting award ${aw.id} into public.awards:`, error);
          } else {
            console.log('[Insert Success] Successfully inserted award into public.awards:', data);
          }
        }
      }

      return true;
    } catch (e) {
      console.error('Exception in saveAwards:', e);
      return false;
    }
  }
};
