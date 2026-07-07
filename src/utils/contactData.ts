/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ContactInfo } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: '+91 79900 62009',
  phoneRaw: '+917990062009',
  whatsapp: '+91 79900 62009',
  whatsappRaw: '917990062009',
  email: 'info@pateldentalrajkot.com',
  address: 'Rameshwar Complex, 1st Floor, Opp SBI Bank, Gayatrinagar Main Road, Jalaram Chowk, Bhaktinagar Circle, Rajkot, Gujarat 360002',
  mapsLink: 'https://maps.google.com/?q=Patel+Dental+Hospital+Gayatrinagar+Rajkot'
};

export const contactService = {
  /**
   * Fetches contact info from Supabase.
   * If table is empty, seeds default contact info.
   */
  getContactInfo: async (): Promise<ContactInfo> => {
    if (!isSupabaseConfigured()) {
      return DEFAULT_CONTACT_INFO;
    }

    try {
      const { data, error } = await supabase.client
        .from('contact_info')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();

      if (error) {
        console.warn('Error fetching contact info from Supabase:', error);
        return DEFAULT_CONTACT_INFO;
      }

      if (!data) {
        // Seed default contact info
        const { error: seedError } = await supabase.client
          .from('contact_info')
          .insert({
            id: 'default',
            phone: DEFAULT_CONTACT_INFO.phone,
            phone_raw: DEFAULT_CONTACT_INFO.phoneRaw,
            whatsapp: DEFAULT_CONTACT_INFO.whatsapp,
            whatsapp_raw: DEFAULT_CONTACT_INFO.whatsappRaw,
            email: DEFAULT_CONTACT_INFO.email,
            address: DEFAULT_CONTACT_INFO.address,
            maps_link: DEFAULT_CONTACT_INFO.mapsLink
          });

        if (seedError) {
          console.warn('Error seeding default contact info:', seedError);
        }

        return DEFAULT_CONTACT_INFO;
      }

      return {
        phone: data.phone,
        phoneRaw: data.phone_raw,
        whatsapp: data.whatsapp,
        whatsappRaw: data.whatsapp_raw,
        email: data.email,
        address: data.address,
        mapsLink: data.maps_link
      };
    } catch (e) {
      console.warn('Exception in getContactInfo:', e);
      return DEFAULT_CONTACT_INFO;
    }
  },

  /**
   * Saves contact info to Supabase.
   */
  saveContactInfo: async (contact: ContactInfo): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      return false;
    }

    try {
      const { error } = await supabase.client
        .from('contact_info')
        .upsert({
          id: 'default',
          phone: contact.phone,
          phone_raw: contact.phoneRaw,
          whatsapp: contact.whatsapp,
          whatsapp_raw: contact.whatsappRaw,
          email: contact.email,
          address: contact.address,
          maps_link: contact.mapsLink,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error upserting contact info:', error);
        return false;
      }

      return true;
    } catch (e) {
      console.error('Exception in saveContactInfo:', e);
      return false;
    }
  }
};
