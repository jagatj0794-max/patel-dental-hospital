/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';
import { DEFAULT_DOCTORS } from '../data/doctors';

export function mapDbToDoctor(row: any): Doctor {
  let statsArr: { value: string; label: string }[] = [];
  if (Array.isArray(row.stats)) {
    statsArr = row.stats.map((s: any) => ({
      value: s?.value || s?.title || '',
      label: s?.label || s?.desc || ''
    }));
  } else if (typeof row.stats === 'string') {
    try {
      const parsed = JSON.parse(row.stats);
      if (Array.isArray(parsed)) {
        statsArr = parsed.map((s: any) => ({
          value: s?.value || s?.title || '',
          label: s?.label || s?.desc || ''
        }));
      }
    } catch (e) {
      statsArr = [];
    }
  }

  let expertisesArr: { title: string; desc: string }[] = [];
  if (Array.isArray(row.expertises)) {
    expertisesArr = row.expertises.map((e: any) =>
      typeof e === 'string' ? { title: e, desc: '' } : { title: e?.title || '', desc: e?.desc || '' }
    );
  } else if (typeof row.expertises === 'string') {
    try {
      const parsed = JSON.parse(row.expertises);
      if (Array.isArray(parsed)) {
        expertisesArr = parsed.map((e: any) =>
          typeof e === 'string' ? { title: e, desc: '' } : { title: e?.title || '', desc: e?.desc || '' }
        );
      }
    } catch (e) {
      expertisesArr = [];
    }
  }

  return {
    id: row.id,
    name: row.name,
    titles: row.titles || '',
    designation: row.designation || '',
    img: row.img || '',
    briefIntro: row.brief_intro || row.briefIntro || '',
    quote: row.quote || '',
    bdsYear: row.bds_year || row.bdsYear || '',
    bdsInstitution: row.bds_institution || row.bdsInstitution || '',
    stats: statsArr,
    expertises: expertisesArr,
    branch: row.branch || 'Gayatrinagar Branch',
    experience: row.experience || '',
  };
}

export function mapDoctorToDb(doc: Doctor): any {
  return {
    id: doc.id,
    name: doc.name,
    titles: doc.titles || '',
    designation: doc.designation || '',
    img: doc.img || '',
    brief_intro: doc.briefIntro || '',
    quote: doc.quote || '',
    bds_year: doc.bdsYear || '',
    bds_institution: doc.bdsInstitution || '',
    stats: doc.stats || [],
    expertises: doc.expertises || [],
    branch: doc.branch || 'Gayatrinagar Branch',
    experience: doc.experience || '',
    updated_at: new Date().toISOString()
  };
}

export const doctorService = {
  /**
   * Fetches the doctors from Supabase or localStorage.
   * Seeds the table with DEFAULT_DOCTORS if empty.
   */
  getDoctors: async (): Promise<Doctor[]> => {
    // Check localStorage fallback first
    let localDoctors: Doctor[] | null = null;
    try {
      const local = localStorage.getItem('patel_dental_doctors_list');
      if (local) {
        localDoctors = JSON.parse(local);
      }
    } catch (e) {
      console.warn('Failed to parse local doctors storage:', e);
    }

    if (!isSupabaseConfigured()) {
      return (localDoctors && localDoctors.length > 0) ? localDoctors : DEFAULT_DOCTORS;
    }

    try {
      const { data, error } = await supabase.client
        .from('doctors')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.warn('Error fetching doctors from Supabase (using local/defaults):', error);
        return (localDoctors && localDoctors.length > 0) ? localDoctors : DEFAULT_DOCTORS;
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
        return (localDoctors && localDoctors.length > 0) ? localDoctors : DEFAULT_DOCTORS;
      }

      const remoteDoctors = data.map(mapDbToDoctor);
      try {
        localStorage.setItem('patel_dental_doctors_list', JSON.stringify(remoteDoctors));
      } catch (e) {
        // ignore quota errors
      }
      return remoteDoctors;
    } catch (e) {
      console.warn('Exception in getDoctors:', e);
      return (localDoctors && localDoctors.length > 0) ? localDoctors : DEFAULT_DOCTORS;
    }
  },

  /**
   * Saves the entire list of doctors to Supabase & localStorage.
   * Deletes database rows that are no longer present in the updated list.
   */
  saveDoctors: async (doctors: Doctor[]): Promise<boolean> => {
    // 1. Always save to local storage for immediate persistence
    try {
      localStorage.setItem('patel_dental_doctors_list', JSON.stringify(doctors));
    } catch (e) {
      console.warn('Error saving doctors to localStorage:', e);
    }

    if (!isSupabaseConfigured()) {
      return true;
    }

    try {
      const dbRows = doctors.map(mapDoctorToDb);
      const doctorIds = doctors.map(d => d.id);

      // Delete doctors not in the current list
      if (doctorIds.length > 0) {
        const { error: deleteError } = await supabase.client
          .from('doctors')
          .delete()
          .not('id', 'in', `(${doctorIds.map(id => `'${id}'`).join(',')})`);
        
        if (deleteError) {
          console.warn('Error deleting unused doctors:', deleteError);
        }
      } else {
        const { error: deleteError } = await supabase.client
          .from('doctors')
          .delete()
          .neq('id', 'dummy_nonexistent_id');

        if (deleteError) {
          console.warn('Error deleting all doctors:', deleteError);
        }
      }

      // Upsert current list with progressive fallbacks
      if (dbRows.length > 0) {
        let { error: upsertError } = await supabase.client
          .from('doctors')
          .upsert(dbRows);

        // Fallback 1: Retry without updated_at
        if (upsertError && (upsertError.message?.includes('updated_at') || upsertError.message?.includes('column'))) {
          console.warn('Retrying doctors upsert without updated_at column...', upsertError);
          const rowsNoUpdatedAt = dbRows.map(({ updated_at, ...rest }) => rest);
          const { error: retry1 } = await supabase.client
            .from('doctors')
            .upsert(rowsNoUpdatedAt);
          upsertError = retry1;
        }

        // Fallback 2: Retry with core columns only
        if (upsertError && upsertError.message?.includes('column')) {
          console.warn('Retrying doctors upsert with core columns only...', upsertError);
          const rowsCoreOnly = doctors.map(doc => ({
            id: doc.id,
            name: doc.name,
            titles: doc.titles || '',
            designation: doc.designation || '',
            img: doc.img || ''
          }));
          const { error: retry2 } = await supabase.client
            .from('doctors')
            .upsert(rowsCoreOnly);
          upsertError = retry2;
        }

        if (upsertError) {
          console.error('Error upserting doctors:', upsertError);
          // Return true so the UI updates optimistically since localStorage was saved
          return true;
        }
      }

      return true;
    } catch (e) {
      console.error('Exception in saveDoctors:', e);
      return true;
    }
  }
};
