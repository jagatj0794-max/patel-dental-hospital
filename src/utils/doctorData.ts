/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';
import { DEFAULT_DOCTORS } from '../data/doctors';

export function mapDbToDoctor(row: any): Doctor {
  return {
    id: row.id,
    name: row.name,
    titles: row.titles || '',
    designation: row.designation || '',
    img: row.img || '',
    briefIntro: row.brief_intro || '',
    quote: row.quote || '',
    bdsYear: row.bds_year || '',
    bdsInstitution: row.bds_institution || '',
    stats: Array.isArray(row.stats) ? row.stats : [],
    expertises: Array.isArray(row.expertises) ? row.expertises : [],
    branch: row.branch || 'Gayatrinagar Branch',
    experience: row.experience || '',
  };
}

export function mapDoctorToDb(doc: Doctor): any {
  return {
    id: doc.id,
    name: doc.name,
    titles: doc.titles,
    designation: doc.designation,
    img: doc.img,
    brief_intro: doc.briefIntro,
    quote: doc.quote,
    bds_year: doc.bdsYear,
    bds_institution: doc.bdsInstitution,
    stats: doc.stats,
    expertises: doc.expertises,
    branch: doc.branch,
    experience: doc.experience || '',
    updated_at: new Date().toISOString()
  };
}

export const doctorService = {
  /**
   * Fetches the doctors from Supabase.
   * Seeds the table with DEFAULT_DOCTORS if empty.
   */
  getDoctors: async (): Promise<Doctor[]> => {
    if (!isSupabaseConfigured()) {
      return DEFAULT_DOCTORS;
    }
    try {
      const { data, error } = await supabase.client
        .from('doctors')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.warn('Error fetching doctors from Supabase (using defaults):', error);
        return DEFAULT_DOCTORS;
      }

      if (!data || data.length === 0) {
        // Table is empty, seed default doctors
        const seedRows = DEFAULT_DOCTORS.map(mapDoctorToDb);
        const { error: insertError } = await supabase.client
          .from('doctors')
          .insert(seedRows);

        if (insertError) {
          console.warn('Error seeding default doctors:', insertError);
        }
        return DEFAULT_DOCTORS;
      }

      return data.map(mapDbToDoctor);
    } catch (e) {
      console.warn('Exception in getDoctors:', e);
      return DEFAULT_DOCTORS;
    }
  },

  /**
   * Saves the entire list of doctors to Supabase.
   * Deletes database rows that are no longer present in the updated list.
   */
  saveDoctors: async (doctors: Doctor[]): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      return false;
    }
    try {
      const dbRows = doctors.map(mapDoctorToDb);
      const doctorIds = doctors.map(d => d.id);

      // 1. Delete doctors not in the current list
      if (doctorIds.length > 0) {
        const { error: deleteError } = await supabase.client
          .from('doctors')
          .delete()
          .not('id', 'in', `(${doctorIds.map(id => `'${id}'`).join(',')})`);
        
        if (deleteError) {
          console.warn('Error deleting unused doctors:', deleteError);
        }
      } else {
        // If empty list, delete all rows
        const { error: deleteError } = await supabase.client
          .from('doctors')
          .delete()
          .neq('id', 'dummy_nonexistent_id');

        if (deleteError) {
          console.warn('Error deleting all doctors:', deleteError);
        }
      }

      // 2. Upsert the current list of doctors
      if (dbRows.length > 0) {
        const { error: upsertError } = await supabase.client
          .from('doctors')
          .upsert(dbRows);

        if (upsertError) {
          console.error('Error upserting doctors:', upsertError);
          return false;
        }
      }

      return true;
    } catch (e) {
      console.error('Exception in saveDoctors:', e);
      return false;
    }
  }
};
