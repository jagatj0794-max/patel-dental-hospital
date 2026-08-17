/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase, isSupabaseConfigured } from './supabase';
import { BeforeAfterEntry } from '../types';

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

// Fallback/Initial mock patient before and after transformations
export const DEFAULT_BEFORE_AFTER_ENTRIES: BeforeAfterEntry[] = [
  {
    id: "default-1",
    treatment_name: "Dental Implants",
    before_image_url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    after_image_url: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800",
    display_order: 0,
    is_active: true
  },
  {
    id: "default-2",
    treatment_name: "Smile Makeover",
    before_image_url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    after_image_url: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800",
    display_order: 1,
    is_active: true
  },
  {
    id: "default-3",
    treatment_name: "Full-Mouth Rehabilitation",
    before_image_url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    after_image_url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    display_order: 2,
    is_active: true
  },
  {
    id: "default-4",
    treatment_name: "Crowns & Bridges",
    before_image_url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    after_image_url: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800",
    display_order: 3,
    is_active: true
  },
  {
    id: "default-5",
    treatment_name: "Root Canal Treatment",
    before_image_url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    after_image_url: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800",
    display_order: 4,
    is_active: true
  },
  {
    id: "default-6",
    treatment_name: "Aligners & Orthodontics",
    before_image_url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    after_image_url: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800",
    display_order: 5,
    is_active: true
  }
];

export const beforeAfterService = {
  lastError: null as string | null,

  getBeforeAfterEntries: async (): Promise<BeforeAfterEntry[]> => {
    try {
      console.log('[Before & After] Fetch Started');
      beforeAfterService.lastError = null;

      if (!isSupabaseConfigured()) {
        console.log('[Before & After] Supabase is not configured.');
        return DEFAULT_BEFORE_AFTER_ENTRIES;
      }

      const { data, error } = await supabase.client
        .from('dental_tourism_before_after')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.warn('Error fetching before/after entries:', error);
        beforeAfterService.lastError = error.message;
        return DEFAULT_BEFORE_AFTER_ENTRIES;
      }

      if (!data || data.length === 0) {
        console.log('[Before & After] No data returned from Supabase. Returning defaults.');
        return DEFAULT_BEFORE_AFTER_ENTRIES;
      }

      console.log(`[Before & After] Fetch Success: ${data.length} records returned.`);
      
      const mapped: BeforeAfterEntry[] = data.map((row: any) => ({
        id: row.id,
        treatment_name: row.treatment_name || '',
        before_image_url: row.before_image_url || '',
        before_storage_path: row.before_storage_path || '',
        after_image_url: row.after_image_url || '',
        after_storage_path: row.after_storage_path || '',
        display_order: Number(row.display_order) || 0,
        is_active: row.is_active !== false,
        created_at: row.created_at,
        updated_at: row.updated_at
      }));

      return mapped;
    } catch (e: any) {
      console.warn('Exception in getBeforeAfterEntries:', e);
      beforeAfterService.lastError = e?.message || String(e);
      return DEFAULT_BEFORE_AFTER_ENTRIES;
    }
  },

  saveBeforeAfterList: async (items: BeforeAfterEntry[]): Promise<boolean> => {
    try {
      beforeAfterService.lastError = null;
      console.log('[Before & After] Saving list of length:', items.length);

      if (!isSupabaseConfigured()) {
        console.log('[Before & After] Supabase is not configured.');
        return false;
      }

      // Fetch existing IDs to clean up deletions
      const { data: existingData, error: fetchErr } = await supabase.client
        .from('dental_tourism_before_after')
        .select('id');

      if (fetchErr) {
        console.error('Error fetching existing records from Supabase:', fetchErr);
        // We'll try to upsert anyway
      } else if (existingData) {
        const currentIds = new Set(items.map(item => item.id));
        const idsToDelete = existingData
          .map((row: any) => row.id)
          .filter((id: string) => !currentIds.has(id));

        if (idsToDelete.length > 0) {
          const { error: deleteErr } = await supabase.client
            .from('dental_tourism_before_after')
            .delete()
            .in('id', idsToDelete);

          if (deleteErr) {
            console.error('Error deleting removed before/after items:', deleteErr);
          }
        }
      }

      // Format rows for upserting
      const rowsToUpsert = items.map((item, index) => {
        const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id);
        const itemId = isValidUUID ? item.id : generateUUID();
        return {
          id: itemId,
          treatment_name: item.treatment_name || '',
          before_image_url: item.before_image_url || '',
          before_storage_path: item.before_storage_path || '',
          after_image_url: item.after_image_url || '',
          after_storage_path: item.after_storage_path || '',
          display_order: index,
          is_active: item.is_active !== false,
          created_at: item.created_at || new Date().toISOString()
        };
      });

      if (rowsToUpsert.length > 0) {
        const { error: upsertErr } = await supabase.client
          .from('dental_tourism_before_after')
          .upsert(rowsToUpsert);

        if (upsertErr) {
          console.error('Error upserting before/after entries into database:', upsertErr);
          beforeAfterService.lastError = upsertErr.message;
          return false;
        }
      } else {
        // If the save is empty, make sure database is empty as well by deleting any remaining ones
        // This is already done by existingData logic above.
      }

      console.log('[Before & After] Saved to database successfully.');
      return true;
    } catch (e: any) {
      console.error('Exception in saveBeforeAfterList:', e);
      beforeAfterService.lastError = e?.message || String(e);
      return false;
    }
  }
};
