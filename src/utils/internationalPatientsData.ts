/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase, isSupabaseConfigured } from './supabase';
import { uploadImage } from './supabaseStorage';
import { InternationalPatientImage } from '../types';
import { safeStorage } from './storage';

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

// Fallback/Initial mock patient gallery images to load on first setup or if database is empty/offline
export const DEFAULT_INTERNATIONAL_PATIENTS: InternationalPatientImage[] = [];

export const internationalPatientsService = {
  lastError: null as string | null,

  getInternationalPatients: async (): Promise<InternationalPatientImage[]> => {
    try {
      console.log('[International Patients] Fetch Started');
      internationalPatientsService.lastError = null;

      if (!isSupabaseConfigured()) {
        console.log('[International Patients] Supabase is not configured.');
        return [];
      }

      const { data, error } = await supabase.client
        .from('international_patients_gallery')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.warn('Error fetching international patients:', error);
        internationalPatientsService.lastError = error.message;
        return [];
      }

      if (!data || data.length === 0) {
        console.log('[International Patients] No data returned from Supabase.');
        return [];
      }

      console.log(`[International Patients] Fetch Success: ${data.length} records returned.`);
      
      const mapped: InternationalPatientImage[] = data.map((row: any) => ({
        id: row.id,
        image_url: row.image_url || '',
        storage_path: row.storage_path || '',
        alt_text: row.alt_text || '',
        display_order: Number(row.display_order) || 0,
        is_active: row.is_active !== false,
        created_at: row.created_at,
        updated_at: row.updated_at
      }));

      return mapped;
    } catch (e: any) {
      console.warn('Exception in getInternationalPatients:', e);
      internationalPatientsService.lastError = e?.message || String(e);
      return [];
    }
  },

  saveInternationalPatientsList: async (items: InternationalPatientImage[]): Promise<boolean> => {
    try {
      internationalPatientsService.lastError = null;
      console.log('[International Patients] Saving list of length:', items.length);

      if (!isSupabaseConfigured()) {
        console.log('[International Patients] Supabase is not configured.');
        return false;
      }

      // Fetch existing IDs to clean up deletions
      const { data: existingData, error: fetchErr } = await supabase.client
        .from('international_patients_gallery')
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
            .from('international_patients_gallery')
            .delete()
            .in('id', idsToDelete);

          if (deleteErr) {
            console.error('Error deleting removed patient gallery items:', deleteErr);
          }
        }
      }

      // Format rows for upserting
      const rowsToUpsert = items.map((item, index) => {
        const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id);
        const itemId = isValidUUID ? item.id : generateUUID();
        return {
          id: itemId,
          image_url: item.image_url || '',
          storage_path: item.storage_path || '',
          alt_text: item.alt_text || '',
          display_order: index,
          is_active: item.is_active !== false,
          created_at: item.created_at || new Date().toISOString()
        };
      });

      if (rowsToUpsert.length > 0) {
        const { error: upsertErr } = await supabase.client
          .from('international_patients_gallery')
          .upsert(rowsToUpsert);

        if (upsertErr) {
          console.error('Error upserting international patients into database:', upsertErr);
          internationalPatientsService.lastError = upsertErr.message;
          return false;
        }
      }

      console.log('[International Patients] Saved to database successfully.');
      return true;
    } catch (e: any) {
      console.error('Exception in saveInternationalPatientsList:', e);
      internationalPatientsService.lastError = e?.message || String(e);
      return false;
    }
  }
};
