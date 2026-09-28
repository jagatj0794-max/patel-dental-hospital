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
    before_alt_text: "Before dental implant treatment showing the existing tooth condition and missing tooth area at Patel Dental Hospital, Rajkot.",
    after_image_url: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800",
    after_alt_text: "After dental implant treatment showing the restored tooth and improved dental appearance at Patel Dental Hospital, Rajkot.",
    display_order: 0,
    is_active: true
  },
  {
    id: "default-2",
    treatment_name: "Smile Makeover",
    before_image_url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    before_alt_text: "Before smile makeover showing the existing appearance of the teeth and smile at Patel Dental Hospital, Rajkot.",
    after_image_url: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800",
    after_alt_text: "After smile makeover showing an improved appearance of the teeth and smile at Patel Dental Hospital, Rajkot.",
    display_order: 1,
    is_active: true
  },
  {
    id: "default-3",
    treatment_name: "Full-Mouth Rehabilitation",
    before_image_url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    before_alt_text: "Before full mouth rehabilitation showing the existing condition of multiple teeth at Patel Dental Hospital, Rajkot.",
    after_image_url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    after_alt_text: "After full mouth rehabilitation showing restored teeth and an improved overall dental appearance at Patel Dental Hospital, Rajkot.",
    display_order: 2,
    is_active: true
  },
  {
    id: "default-4",
    treatment_name: "Crowns & Bridges",
    before_image_url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    before_alt_text: "Before crowns and bridges treatment showing the existing condition of the teeth at Patel Dental Hospital, Rajkot.",
    after_image_url: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800",
    after_alt_text: "After crowns and bridges treatment showing restored teeth and improved dental appearance at Patel Dental Hospital, Rajkot.",
    display_order: 3,
    is_active: true
  },
  {
    id: "default-5",
    treatment_name: "Root Canal Treatment",
    before_image_url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    before_alt_text: "Before root canal treatment showing the affected tooth and existing dental condition at Patel Dental Hospital, Rajkot.",
    after_image_url: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800",
    after_alt_text: "After root canal treatment showing the restored tooth following dental treatment at Patel Dental Hospital, Rajkot.",
    display_order: 4,
    is_active: true
  },
  {
    id: "default-6",
    treatment_name: "Aligners & Orthodontics",
    before_image_url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    before_alt_text: "Before aligners and orthodontic treatment showing misaligned teeth and the existing alignment condition at Patel Dental Hospital, Rajkot.",
    after_image_url: "https://images.unsplash.com/photo-1579781403298-d3460f4c8942?auto=format&fit=crop&q=80&w=800",
    after_alt_text: "After aligners and orthodontic treatment showing improved teeth alignment at Patel Dental Hospital, Rajkot.",
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
        before_alt_text: row.before_alt_text || '',
        after_image_url: row.after_image_url || '',
        after_storage_path: row.after_storage_path || '',
        after_alt_text: row.after_alt_text || '',
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

      // Explicitly retrieve and verify the active authenticated admin session
      try {
        const { data: { session } } = await supabase.client.auth.getSession();
        if (!session) {
          console.warn('[Before & After Save] WARNING: Attempting to save without an authenticated Supabase session. This request may be blocked by RLS policies.');
        } else {
          console.log('[Before & After Save] Confirmed authenticated session for:', session.user?.email, 'UserID:', session.user?.id);
        }
      } catch (authErr) {
        console.warn('[Before & After Save] Error reading current auth session:', authErr);
      }

      // Dynamically detect column availability to prevent crash if remote table hasn't migrated yet
      let hasAltTextColumns = false;
      try {
        const { data: testData } = await supabase.client
          .from('dental_tourism_before_after')
          .select('*')
          .limit(1);
        if (testData && testData.length > 0) {
          const keys = Object.keys(testData[0]);
          hasAltTextColumns = keys.includes('before_alt_text') && keys.includes('after_alt_text');
        } else {
          // If empty table, attempt a safe lightweight select to verify column metadata
          const { error: testErr } = await supabase.client
            .from('dental_tourism_before_after')
            .select('before_alt_text,after_alt_text')
            .limit(1);
          hasAltTextColumns = !testErr;
        }
      } catch (e) {
        console.warn('[Before & After] Error detecting columns, assuming not migrated yet:', e);
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
        const row: any = {
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
        if (hasAltTextColumns) {
          row.before_alt_text = item.before_alt_text || '';
          row.after_alt_text = item.after_alt_text || '';
        }
        return row;
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
