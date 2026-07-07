/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase, isSupabaseConfigured } from './supabase';

export interface HeroContent {
  id: string;
  heading: string;
  description: string;
  bg_image: string;
}

export const DEFAULT_HERO: HeroContent = {
  id: 'main',
  heading: "Dental Implant, Aligner &\nFMR Specialists\nin Rajkot",
  description: "Trusted smiles. Advanced care. Exceptional results.",
  bg_image: ""
};

export const heroService = {
  /**
   * Fetches the hero content from Supabase.
   * If no hero content exists, it attempts to insert the default row.
   */
  getHeroContent: async (): Promise<HeroContent> => {
    if (!isSupabaseConfigured()) {
      return DEFAULT_HERO;
    }
    try {
      const { data, error } = await supabase.client
        .from('hero_content')
        .select('*')
        .eq('id', 'main')
        .maybeSingle();

      if (error) {
        console.warn('Error fetching hero content from Supabase (returning default):', error);
        return DEFAULT_HERO;
      }

      if (!data) {
        // Not found, let's insert default row
        const { error: insertError } = await supabase.client
          .from('hero_content')
          .insert([DEFAULT_HERO]);

        if (insertError) {
          console.warn('Error inserting default hero content:', insertError);
        }
        return DEFAULT_HERO;
      }

      return data as HeroContent;
    } catch (e) {
      console.warn('Exception in getHeroContent:', e);
      return DEFAULT_HERO;
    }
  },

  /**
   * Saves the hero content to Supabase.
   */
  saveHeroContent: async (hero: Omit<HeroContent, 'id'>): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      return false;
    }
    try {
      const { error } = await supabase.client
        .from('hero_content')
        .upsert({
          id: 'main',
          heading: hero.heading,
          description: hero.description,
          bg_image: hero.bg_image,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.warn('Error saving hero content to Supabase:', error);
        return false;
      }
      return true;
    } catch (e) {
      console.warn('Exception in saveHeroContent:', e);
      return false;
    }
  }
};
