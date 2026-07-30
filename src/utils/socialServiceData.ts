/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from './supabase';
import { SocialServiceItem } from '../types';

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

const DEFAULT_FALLBACK_SOCIAL_SERVICES: SocialServiceItem[] = [
  {
    id: '62b9a1f2-1d52-4a5d-b0a5-f12bc85d1e21',
    title: 'Free Dental Awareness & Diagnostics Camp',
    image_url: '/IMG_20190521_190345.jpg',
    display_order: 1,
    is_active: true
  },
  {
    id: 'f2c83d10-31e2-45e5-9d33-41bb3396aa77',
    title: 'Community Oral Health Campaign',
    image_url: '/IMG_20200313_130221.jpg',
    display_order: 2,
    is_active: true
  }
];

function getFallbackSocialServices(): SocialServiceItem[] {
  try {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cached_public_social_services');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log('[SOCIAL CACHE] Successfully loaded cached social service items:', parsed);
          return parsed;
        }
      }
    }
  } catch (e) {
    console.warn('[SOCIAL CACHE] Error loading social service cache from localStorage:', e);
  }
  console.log('[SOCIAL CACHE] No cached social service items found. Using static default fallback items.');
  return DEFAULT_FALLBACK_SOCIAL_SERVICES;
}

export const socialServiceService = {
  lastError: null as string | null,

  /**
   * Fetches all social service items directly from public.social_service table sorted by display_order ASC.
   * Leverages caching and static fallback to resist unauthenticated read issues or connection glitches on load/refresh.
   */
  getSocialServices: async (): Promise<SocialServiceItem[]> => {
    try {
      console.log('[SocialService] Fetch Started');
      socialServiceService.lastError = null;
      const { data, error } = await supabase.client
        .from('social_service')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('[SocialService] Fetch Error', error);
        console.warn('Error fetching social services from public.social_service table (falling back to default local data):', error);
        console.warn('Note: If this table does not exist yet, you can run the SQL query from "supabase_social_service_migration.sql" in your Supabase SQL Editor to provision it.');
        socialServiceService.lastError = error.message;
        return getFallbackSocialServices();
      }

      if (!data || data.length === 0) {
        console.log('[SocialService] Fetch Result: 0 records returned. Supabase public.social_service table query returned 0 rows. Checking for local storage fallback...');
        return getFallbackSocialServices();
      }

      console.log('[SocialService] Fetch Result: ' + data.length + ' records returned.');
      console.log('[Fetch Success] Successfully fetched social services from public.social_service');
      console.log('[Records Returned] Records returned from Supabase public.social_service:', data);

      const mapped = data.map((row: any) => ({
        id: row.id,
        title: row.title || '',
        image_url: row.image_url || '',
        display_order: Number(row.display_order) || 0,
        is_active: row.is_active !== false,
        created_at: row.created_at,
        updated_at: row.updated_at
      }));

      // Persist to local cache for subsequent page refreshes
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('cached_public_social_services', JSON.stringify(mapped));
          console.log('[SOCIAL CACHE] Successfully persisted public social services to localStorage cache.');
        }
      } catch (cacheErr) {
        console.warn('[SOCIAL CACHE] Failed to write social services to localStorage cache:', cacheErr);
      }

      return mapped;
    } catch (e: any) {
      console.error('[SocialService] Fetch Error', e);
      console.warn('Exception in getSocialServices (falling back to default local data):', e);
      socialServiceService.lastError = e?.message || String(e);
      return getFallbackSocialServices();
    }
  },

  /**
   * Saves or updates a single social service item in public.social_service table.
   */
  saveSocialService: async (item: SocialServiceItem): Promise<boolean> => {
    try {
      socialServiceService.lastError = null;
      const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id);
      const itemId = isValidUUID ? item.id : generateUUID();
      const row = {
        id: itemId,
        title: item.title || '',
        image_url: item.image_url || '',
        display_order: item.display_order || 0,
        is_active: item.is_active !== false,
        created_at: item.created_at || new Date().toISOString()
      };

      // Check if item already exists
      const { data: existing, error: checkErr } = await supabase.client
        .from('social_service')
        .select('id')
        .eq('id', itemId)
        .maybeSingle();

      if (checkErr) {
        console.error('Error checking if social service item exists:', checkErr);
        socialServiceService.lastError = checkErr.message;
        return false;
      }

      if (existing) {
        const { data, error } = await supabase.client
          .from('social_service')
          .update(row)
          .eq('id', itemId)
          .select();

        if (error) {
          console.error('Error updating social service in public.social_service:', error);
          socialServiceService.lastError = error.message;
          return false;
        }

        console.log('[Update Success] Successfully updated social service item in public.social_service:', data);
      } else {
        const { data, error } = await supabase.client
          .from('social_service')
          .insert(row)
          .select();

        if (error) {
          console.error('Error inserting social service into public.social_service:', error);
          socialServiceService.lastError = error.message;
          return false;
        }

        console.log('[Insert Success] Successfully inserted social service item into public.social_service:', data);
      }

      return true;
    } catch (e: any) {
      console.error('Exception in saveSocialService:', e);
      socialServiceService.lastError = e?.message || String(e);
      return false;
    }
  },

  /**
   * Deletes a social service record from public.social_service table.
   */
  deleteSocialService: async (id: string): Promise<boolean> => {
    try {
      socialServiceService.lastError = null;
      const { error } = await supabase.client
        .from('social_service')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting social service from public.social_service table:', error);
        socialServiceService.lastError = error.message;
        return false;
      }

      console.log('[Delete Success] Successfully deleted social service item from public.social_service:', id);
      return true;
    } catch (e: any) {
      console.error('Exception in deleteSocialService:', e);
      socialServiceService.lastError = e?.message || String(e);
      return false;
    }
  },

  /**
   * Saves the entire list of social services to public.social_service.
   * Removes records no longer present in the list, and upserts current ones.
   */
  saveSocialServices: async (items: SocialServiceItem[]): Promise<boolean> => {
    try {
      socialServiceService.lastError = null;

      console.log("[SocialService] Database insert/update starting with items:", items);

      // 1. Fetch current IDs in database
      const { data: existingData, error: fetchErr } = await supabase.client
        .from('social_service')
        .select('id');

      console.log("existing database social_service rows:", existingData);

      if (fetchErr) {
        console.error('[SocialService] Save Error / Supabase Error:', fetchErr);
        console.error('Error fetching existing social services in saveSocialServices:', fetchErr);
        socialServiceService.lastError = fetchErr.message;
        return false;
      }

      const existingIds = new Set((existingData || []).map((row: any) => row.id));
      let idsToDelete: string[] = [];

      if (existingData) {
        const currentIds = new Set(items.map(a => a.id));
        idsToDelete = existingData
          .map((row: any) => row.id)
          .filter((id: string) => !currentIds.has(id));

        console.log("social services idsToDelete:", idsToDelete);

        if (idsToDelete.length > 0) {
          const { error: deleteErr } = await supabase.client
            .from('social_service')
            .delete()
            .in('id', idsToDelete);

          if (deleteErr) {
            console.error('[SocialService] Save Error / Supabase Error:', deleteErr);
            console.error('Error deleting removed social services from public.social_service:', deleteErr);
            socialServiceService.lastError = deleteErr.message;
            return false;
          }
        }
      }

      // 2. Map and Upsert
      const rowsToUpsert = items.map((item, index) => {
        const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id);
        const itemId = isValidUUID ? item.id : generateUUID();
        return {
          id: itemId,
          title: item.title || '',
          image_url: item.image_url || '',
          display_order: index, // automatic ordering based on the passed list order
          is_active: item.is_active !== false,
          created_at: item.created_at || new Date().toISOString()
        };
      });

      if (rowsToUpsert.length > 0) {
        const { error: upsertErr } = await supabase.client
          .from('social_service')
          .upsert(rowsToUpsert);

        if (upsertErr) {
          console.error('[SocialService] Save Error / Supabase Error:', upsertErr);
          console.error('Error upserting social services into public.social_service:', upsertErr);
          socialServiceService.lastError = upsertErr.message;
          return false;
        }
      }

      console.log('[SocialService] Database insert/update succeeded.');
      console.log('[SocialService] Save Success');

      // 3. Update our cache with latest sorted rows
      const { data: finalRows, error: finalErr } = await supabase.client
        .from('social_service')
        .select('*')
        .order('display_order', { ascending: true });
        
      if (finalErr) {
        console.error("Error querying 'select * from social_service' after save:", finalErr);
      } else if (finalRows) {
        const mapped = finalRows.map((row: any) => ({
          id: row.id,
          title: row.title || '',
          image_url: row.image_url || '',
          display_order: Number(row.display_order) || 0,
          is_active: row.is_active !== false,
          created_at: row.created_at
        }));
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('cached_public_social_services', JSON.stringify(mapped));
            console.log('[SOCIAL CACHE] Updated localStorage cache with newly saved social services:', mapped);
          }
        } catch (cacheErr) {
          console.warn('[SOCIAL CACHE] Failed to write social services cache:', cacheErr);
        }
      }

      return true;
    } catch (e: any) {
      console.error('[SocialService] Save Error:', e);
      console.error('Exception in saveSocialServices:', e);
      socialServiceService.lastError = e?.message || String(e);
      return false;
    }
  }
};
