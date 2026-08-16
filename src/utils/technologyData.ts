/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from './supabase';
import { TechnologyItem } from '../types';

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

export const technologyService = {
  lastError: null as string | null,

  /**
   * Fetches all technology items directly from public.technology table sorted by display_order ASC.
   * Supabase is the single source of truth.
   */
  getTechnology: async (): Promise<TechnologyItem[]> => {
    try {
      console.log('[Technology] Fetch Started');
      technologyService.lastError = null;
      const { data, error } = await supabase.client
        .from('technology')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('[Technology] Fetch Error', error);
        console.warn('Error fetching technology from public.technology table:', error);
        technologyService.lastError = error.message;
        return [];
      }

      if (!data || data.length === 0) {
        console.log('[Technology] Fetch Result: 0 records returned from Supabase public.technology table.');
        return [];
      }

      console.log('[Technology] Fetch Result: ' + data.length + ' records returned.');
      console.log('[Fetch Success] Successfully fetched technology from public.technology');
      console.log('[Records Returned] Records returned from Supabase public.technology:', data);

      const mapped = data.map((row: any) => ({
        id: row.id,
        title: row.title || '',
        short_description: row.short_description || row.shortDesc || '',
        description: row.description || '',
        image_url: row.image_url || '',
        display_order: Number(row.display_order) || 0,
        is_active: row.is_active !== false,
        created_at: row.created_at,
        updated_at: row.updated_at
      }));

      return mapped;
    } catch (e: any) {
      console.error('[Technology] Fetch Error', e);
      console.warn('Exception in getTechnology:', e);
      technologyService.lastError = e?.message || String(e);
      return [];
    }
  },

  /**
   * Saves or updates a single technology item in public.technology table.
   */
  saveTechnologyItem: async (item: TechnologyItem): Promise<boolean> => {
    try {
      technologyService.lastError = null;
      const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id);
      const itemId = isValidUUID ? item.id : generateUUID();
      const shortDesc = item.short_description || item.shortDesc || '';
      const fullDesc = item.description || '';
      
      const row: any = {
        id: itemId,
        title: item.title || '',
        short_description: shortDesc,
        description: fullDesc,
        image_url: item.image_url || '',
        display_order: item.display_order || 0,
        is_active: item.is_active !== false,
        created_at: item.created_at || new Date().toISOString()
      };

      // Check if item already exists
      const { data: existing, error: checkErr } = await supabase.client
        .from('technology')
        .select('id')
        .eq('id', itemId)
        .maybeSingle();

      if (checkErr) {
        console.error('Error checking if technology item exists:', checkErr);
        technologyService.lastError = checkErr.message;
        return false;
      }

      if (existing) {
        let { data, error } = await supabase.client
          .from('technology')
          .update(row)
          .eq('id', itemId)
          .select();

        // Fallback if short_description column is not in DB table schema
        if (error && error.message && error.message.includes('short_description')) {
          console.warn('short_description column not present, falling back to description field...');
          delete row.short_description;
          row.description = shortDesc ? `${shortDesc}\n\n${fullDesc}`.trim() : fullDesc;
          const res = await supabase.client
            .from('technology')
            .update(row)
            .eq('id', itemId)
            .select();
          error = res.error;
          data = res.data;
        }

        if (error) {
          console.error('Error updating technology in public.technology:', error);
          technologyService.lastError = error.message;
          return false;
        }

        console.log('[Update Success] Successfully updated technology item in public.technology:', data);
      } else {
        let { data, error } = await supabase.client
          .from('technology')
          .insert(row)
          .select();

        // Fallback if short_description column is not in DB table schema
        if (error && error.message && error.message.includes('short_description')) {
          console.warn('short_description column not present, falling back to description field...');
          delete row.short_description;
          row.description = shortDesc ? `${shortDesc}\n\n${fullDesc}`.trim() : fullDesc;
          const res = await supabase.client
            .from('technology')
            .insert(row)
            .select();
          error = res.error;
          data = res.data;
        }

        if (error) {
          console.error('Error inserting technology into public.technology:', error);
          technologyService.lastError = error.message;
          return false;
        }

        console.log('[Insert Success] Successfully inserted technology item into public.technology:', data);
      }

      return true;
    } catch (e: any) {
      console.error('Exception in saveTechnologyItem:', e);
      technologyService.lastError = e?.message || String(e);
      return false;
    }
  },

  /**
   * Deletes a technology record from public.technology table.
   */
  deleteTechnologyItem: async (id: string): Promise<boolean> => {
    try {
      technologyService.lastError = null;
      const { error } = await supabase.client
        .from('technology')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting technology from public.technology table:', error);
        technologyService.lastError = error.message;
        return false;
      }

      console.log('[Delete Success] Successfully deleted technology item from public.technology:', id);
      return true;
    } catch (e: any) {
      console.error('Exception in deleteTechnologyItem:', e);
      technologyService.lastError = e?.message || String(e);
      return false;
    }
  },

  /**
   * Saves the entire list of technology to public.technology.
   * Removes records no longer present in the list, and upserts current ones.
   */
  saveTechnologyList: async (items: TechnologyItem[]): Promise<boolean> => {
    try {
      technologyService.lastError = null;

      console.log("[Technology] Database insert/update starting with items:", items);

      // 1. Fetch current IDs in database
      const { data: existingData, error: fetchErr } = await supabase.client
        .from('technology')
        .select('id');

      if (fetchErr) {
        console.error('[Technology] Save Error / Supabase Error:', fetchErr);
        technologyService.lastError = fetchErr.message;
        return false;
      }

      if (existingData) {
        const currentIds = new Set(items.map(a => a.id));
        const idsToDelete = existingData
          .map((row: any) => row.id)
          .filter((id: string) => !currentIds.has(id));

        if (idsToDelete.length > 0) {
          const { error: deleteErr } = await supabase.client
            .from('technology')
            .delete()
            .in('id', idsToDelete);

          if (deleteErr) {
            console.error('[Technology] Save Error / Supabase Error:', deleteErr);
            technologyService.lastError = deleteErr.message;
            return false;
          }
        }
      }

      // 2. Map and Upsert
      const rowsToUpsert = items.map((item, index) => {
        const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id);
        const itemId = isValidUUID ? item.id : generateUUID();
        const shortDesc = item.short_description || item.shortDesc || '';
        const fullDesc = item.description || '';
        return {
          id: itemId,
          title: item.title || '',
          short_description: shortDesc,
          description: fullDesc,
          image_url: item.image_url || '',
          display_order: index,
          is_active: item.is_active !== false,
          created_at: item.created_at || new Date().toISOString()
        };
      });

      if (rowsToUpsert.length > 0) {
        let { error: upsertErr } = await supabase.client
          .from('technology')
          .upsert(rowsToUpsert);

        // Fallback if short_description column is missing in schema
        if (upsertErr && upsertErr.message && upsertErr.message.includes('short_description')) {
          console.warn('short_description column missing in DB, retrying upsert without short_description...');
          const fallbackRows = rowsToUpsert.map((r: any) => {
            const copy = { ...r };
            const sDesc = copy.short_description;
            delete copy.short_description;
            copy.description = sDesc ? `${sDesc}\n\n${copy.description}`.trim() : copy.description;
            return copy;
          });
          const res = await supabase.client
            .from('technology')
            .upsert(fallbackRows);
          upsertErr = res.error;
        }

        if (upsertErr) {
          console.error('[Technology] Save Error / Supabase Error:', upsertErr);
          technologyService.lastError = upsertErr.message;
          return false;
        }
      }

      console.log('[Technology] Database insert/update succeeded.');
      return true;
    } catch (e: any) {
      console.error('[Technology] Save Error:', e);
      technologyService.lastError = e?.message || String(e);
      return false;
    }
  }
};
