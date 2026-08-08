/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from './supabase';
import { uploadImage } from './supabaseStorage';
import { AwardItem } from '../types';

export function generateUUID(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const awardsService = {
  lastError: null as string | null,
  hasOrientationColumn: null as boolean | null,

  checkOrientationColumn: async (): Promise<boolean> => {
    if (awardsService.hasOrientationColumn !== null) {
      return awardsService.hasOrientationColumn;
    }
    try {
      const { error } = await supabase.client
        .from('awards')
        .select('orientation')
        .limit(1);
      
      if (error && error.code === '42703') {
        awardsService.hasOrientationColumn = false;
      } else {
        awardsService.hasOrientationColumn = true;
      }
    } catch {
      awardsService.hasOrientationColumn = false;
    }
    return awardsService.hasOrientationColumn;
  },

  /**
   * Fetches all award items directly from public.awards table sorted by display_order ASC.
   * Supabase is the single source of truth.
   */
  getAwards: async (): Promise<AwardItem[]> => {
    try {
      console.log('[Awards] Fetch Started');
      awardsService.lastError = null;
      const { data, error } = await supabase.client
        .from('awards')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('[Awards] Fetch Error', error);
        console.warn('Error fetching awards from public.awards table:', error);
        awardsService.lastError = error.message;
        return [];
      }

      if (!data || data.length === 0) {
        console.log('[Awards] Fetch Result: 0 records returned from Supabase public.awards table.');
        return [];
      }

      console.log('[Awards] Fetch Result: ' + data.length + ' records returned.');
      console.log('[Fetch Success] Successfully fetched awards from public.awards');
      console.log('[Records Returned] Records returned from Supabase public.awards:', data);

      const hasCol = await awardsService.checkOrientationColumn();

      const mapped = data.map((row: any) => ({
        id: row.id,
        image_url: row.image_url || '',
        display_order: Number(row.display_order) || 0,
        orientation: hasCol ? (row.orientation || 'horizontal') : 'horizontal',
        is_active: row.is_active !== false,
        created_at: row.created_at,
        updated_at: row.updated_at
      }));

      return mapped;
    } catch (e: any) {
      console.error('[Awards] Fetch Error', e);
      console.warn('Exception in getAwards:', e);
      awardsService.lastError = e?.message || String(e);
      return [];
    }
  },

  /**
   * Uploads an image file for awards module.
   */
  uploadAwardImage: async (file: File): Promise<string> => {
    return await uploadImage(file);
  },

  /**
   * Saves or updates a single award item in public.awards table.
   */
  saveAwardItem: async (item: AwardItem): Promise<boolean> => {
    try {
      awardsService.lastError = null;
      const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id);
      const itemId = isValidUUID ? item.id : generateUUID();
      const hasCol = await awardsService.checkOrientationColumn();

      const row: any = {
        id: itemId,
        image_url: item.image_url || '',
        display_order: item.display_order || 0,
        is_active: item.is_active !== false,
        created_at: item.created_at || new Date().toISOString()
      };
      if (hasCol) {
        row.orientation = item.orientation || 'horizontal';
      }

      // Check if item already exists
      const { data: existing, error: checkErr } = await supabase.client
        .from('awards')
        .select('id')
        .eq('id', itemId)
        .maybeSingle();

      if (checkErr) {
        console.error('Error checking if award item exists:', checkErr);
        awardsService.lastError = checkErr.message;
        return false;
      }

      if (existing) {
        const { data, error } = await supabase.client
          .from('awards')
          .update(row)
          .eq('id', itemId)
          .select();

        if (error) {
          console.error('Error updating award in public.awards:', error);
          awardsService.lastError = error.message;
          return false;
        }

        console.log('[Update Success] Successfully updated award item in public.awards:', data);
      } else {
        const { data, error } = await supabase.client
          .from('awards')
          .insert(row)
          .select();

        if (error) {
          console.error('Error inserting award into public.awards:', error);
          awardsService.lastError = error.message;
          return false;
        }

        console.log('[Insert Success] Successfully inserted award item into public.awards:', data);
      }

      return true;
    } catch (e: any) {
      console.error('Exception in saveAwardItem:', e);
      awardsService.lastError = e?.message || String(e);
      return false;
    }
  },

  /**
   * Updates partial fields of an award record in public.awards table.
   */
  updateAward: async (id: string, updates: Partial<AwardItem>): Promise<boolean> => {
    try {
      awardsService.lastError = null;
      const hasCol = await awardsService.checkOrientationColumn();
      const row: any = { updated_at: new Date().toISOString() };
      if (updates.image_url !== undefined) row.image_url = updates.image_url;
      if (updates.display_order !== undefined) row.display_order = updates.display_order;
      if (updates.is_active !== undefined) row.is_active = updates.is_active;
      if (hasCol && updates.orientation !== undefined) row.orientation = updates.orientation;

      const { error } = await supabase.client
        .from('awards')
        .update(row)
        .eq('id', id);

      if (error) {
        console.error('Error updating award in public.awards:', error);
        awardsService.lastError = error.message;
        return false;
      }

      console.log('[Update Success] Successfully updated award in public.awards:', id);
      return true;
    } catch (e: any) {
      console.error('Exception in updateAward:', e);
      awardsService.lastError = e?.message || String(e);
      return false;
    }
  },

  /**
   * Deletes an award record from public.awards table.
   */
  deleteAwardItem: async (id: string): Promise<boolean> => {
    try {
      awardsService.lastError = null;
      const { error } = await supabase.client
        .from('awards')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting award from public.awards table:', error);
        awardsService.lastError = error.message;
        return false;
      }

      console.log('[Delete Success] Successfully deleted award item from public.awards:', id);
      return true;
    } catch (e: any) {
      console.error('Exception in deleteAwardItem:', e);
      awardsService.lastError = e?.message || String(e);
      return false;
    }
  },

  /**
   * Alias for deleteAwardItem.
   */
  deleteAward: async (id: string): Promise<boolean> => {
    return awardsService.deleteAwardItem(id);
  },

  /**
   * Saves the entire list of awards to public.awards.
   * Removes records no longer present in the list, and upserts current ones.
   */
  saveAwardsList: async (items: AwardItem[]): Promise<boolean> => {
    try {
      awardsService.lastError = null;

      console.log("[Awards] Database insert/update starting with items:", items);

      // 1. Fetch current IDs in database
      const { data: existingData, error: fetchErr } = await supabase.client
        .from('awards')
        .select('id');

      console.log("existing database awards rows:", existingData);

      if (fetchErr) {
        console.error('[Awards] Save Error / Supabase Error:', fetchErr);
        console.error('Error fetching existing awards in saveAwardsList:', fetchErr);
        awardsService.lastError = fetchErr.message;
        return false;
      }

      if (existingData) {
        const currentIds = new Set(items.map(a => a.id));
        const idsToDelete = existingData
          .map((row: any) => row.id)
          .filter((id: string) => !currentIds.has(id));

        console.log("awards idsToDelete:", idsToDelete);

        if (idsToDelete.length > 0) {
          const { error: deleteErr } = await supabase.client
            .from('awards')
            .delete()
            .in('id', idsToDelete);

          if (deleteErr) {
            console.error('[Awards] Save Error / Supabase Error:', deleteErr);
            console.error('Error deleting removed awards from public.awards:', deleteErr);
            awardsService.lastError = deleteErr.message;
            return false;
          }
        }
      }

      const hasCol = await awardsService.checkOrientationColumn();

      // 2. Map and Upsert
      const rowsToUpsert = items.map((item, index) => {
        const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id);
        const itemId = isValidUUID ? item.id : generateUUID();
        const row: any = {
          id: itemId,
          image_url: item.image_url || '',
          display_order: index,
          is_active: item.is_active !== false,
          created_at: item.created_at || new Date().toISOString()
        };
        if (hasCol) {
          row.orientation = item.orientation || 'horizontal';
        }
        return row;
      });

      if (rowsToUpsert.length > 0) {
        const { error: upsertErr } = await supabase.client
          .from('awards')
          .upsert(rowsToUpsert);

        if (upsertErr) {
          console.error('[Awards] Save Error / Supabase Error:', upsertErr);
          console.error('Error upserting awards into public.awards:', upsertErr);
          awardsService.lastError = upsertErr.message;
          return false;
        }
      }

      console.log('[Awards] Database insert/update succeeded.');
      console.log('[Awards] Save Success');

      return true;
    } catch (e: any) {
      console.error('[Awards] Save Error:', e);
      console.error('Exception in saveAwardsList:', e);
      awardsService.lastError = e?.message || String(e);
      return false;
    }
  }
};

export const getAwards = awardsService.getAwards;
export const saveAwardItem = awardsService.saveAwardItem;
export const saveAwardsList = awardsService.saveAwardsList;
export const uploadAwardImage = awardsService.uploadAwardImage;
export const updateAward = awardsService.updateAward;
export const deleteAward = awardsService.deleteAward;
export const deleteAwardItem = awardsService.deleteAwardItem;

