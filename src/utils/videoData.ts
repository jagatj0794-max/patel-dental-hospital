/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DentalVideo } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

export const DEFAULT_VIDEOS: DentalVideo[] = [
  {
    id: 'Db5A-K0MOoU',
    title: 'Patient Instagram Testimony Reel',
    treatment: 'Patient Testimonial',
    videoPlatform: 'instagram',
    platform: 'instagram',
    url: 'https://www.instagram.com/p/Db5A-K0MOoU/',
    thumbnail: 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1786709786418_bibw3gks.webp',
    category: 'Patient Testimonial',
    createdAt: new Date().toISOString()
  },
  {
    id: 'Db44bY6MpcZ',
    title: 'Patient Instagram Testimony Reel',
    treatment: 'Patient Testimonial',
    videoPlatform: 'instagram',
    platform: 'instagram',
    url: 'https://www.instagram.com/p/Db44bY6MpcZ/',
    thumbnail: 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1786711494301_bymdaaht.webp',
    category: 'Patient Testimonial',
    createdAt: new Date().toISOString()
  },
  {
    id: 'Db3TlVjskbU',
    title: 'Patient Instagram Testimony Reel',
    treatment: 'Patient Testimonial',
    videoPlatform: 'instagram',
    platform: 'instagram',
    url: 'https://www.instagram.com/p/Db3TlVjskbU/',
    thumbnail: 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1786711529687_9qy3kcqq.webp',
    category: 'Patient Testimonial',
    createdAt: new Date().toISOString()
  },
  {
    id: 'Dbw9nUbsIhX',
    title: 'Patient Instagram Testimony Reel',
    treatment: 'Patient Testimonial',
    videoPlatform: 'instagram',
    platform: 'instagram',
    url: 'https://www.instagram.com/p/Dbw9nUbsIhX/',
    thumbnail: 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1786711563273_bur5nwj7.webp',
    category: 'Patient Testimonial',
    createdAt: new Date().toISOString()
  },
  {
    id: 'DbuhvNfs0Xy',
    title: 'Patient Instagram Testimony Reel',
    treatment: 'Patient Testimonial',
    videoPlatform: 'instagram',
    platform: 'instagram',
    url: 'https://www.instagram.com/p/DbuhvNfs0Xy/',
    thumbnail: 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1786711587495_xhn94bp9.webp',
    category: 'Patient Testimonial',
    createdAt: new Date().toISOString()
  },
  {
    id: 'DbpVYL7MS65',
    title: 'Patient Instagram Testimony Reel',
    treatment: 'Patient Testimonial',
    videoPlatform: 'instagram',
    platform: 'instagram',
    url: 'https://www.instagram.com/p/DbpVYL7MS65/',
    thumbnail: 'https://wmgzhqtqmnddfjykaykm.supabase.co/storage/v1/object/public/media/f1b95c7d-29d3-403a-9f81-bd443a86e362/1786711609917_8sr25k9f.webp',
    category: 'Patient Testimonial',
    createdAt: new Date().toISOString()
  }
];

export const detectPlatform = (video: any): 'instagram' | 'mp4' => {
  if (!video) return 'instagram';

  // 1. Explicit check of platform fields
  if (video.platform === 'mp4' || video.videoPlatform === 'mp4' || video.videoplatform === 'mp4') {
    return 'mp4';
  }
  if (video.platform === 'instagram' || video.videoPlatform === 'instagram' || video.videoplatform === 'instagram') {
    return 'instagram';
  }

  // 2. Detect from url or similar fields if present
  const url = video.url || '';
  if (url) {
    if (url.includes('instagram.com') || url.includes('instagr.am')) {
      return 'instagram';
    }
    if (url.endsWith('.mp4') || url.includes('supabase.co')) {
      return 'mp4';
    }
  }

  // 3. Detect from id prefix/format
  const id = video.id || '';
  if (id.startsWith('instagram__') || id.includes('instagram')) {
    return 'instagram';
  }
  if (id.endsWith('.mp4') || id.includes('supabase.co')) {
    return 'mp4';
  }

  // 4. Special matching for known Instagram IDs (e.g. from migrations/old records)
  if (id === 'DbS7_fJMTYC') {
    return 'instagram';
  }

  // 5. Detect from title or treatment keywords
  const title = (video.title || '').toLowerCase();
  const treatment = (video.treatment || '').toLowerCase();
  if (title.includes('instagram') || title.includes('reel') || treatment.includes('instagram') || treatment.includes('reel')) {
    return 'instagram';
  }

  return 'instagram';
};

export const videoService = {
  /**
   * Fetches all videos from Supabase.
   * If table is empty, seeds default videos.
   */
  getVideos: async (): Promise<DentalVideo[]> => {
    // Check localStorage fallback first
    let localVideos: DentalVideo[] | null = null;
    try {
      const local = localStorage.getItem('patel_dental_videos_list');
      if (local) {
        localVideos = JSON.parse(local);
      }
    } catch (e) {
      console.warn('Failed to parse local videos storage:', e);
    }

    // Deduplicate helper
    const deduplicate = (list: DentalVideo[]): DentalVideo[] => {
      const uniqueList: DentalVideo[] = [];
      const seen = new Set<string>();
      for (const item of list) {
        if (item && item.id) {
          if (!seen.has(item.id)) {
            seen.add(item.id);
            uniqueList.push(item);
          }
        }
      }
      return uniqueList;
    };

    if (!isSupabaseConfigured()) {
      return deduplicate((localVideos && localVideos.length > 0) ? localVideos : DEFAULT_VIDEOS);
    }

    try {
      const { data, error } = await supabase.client
        .from('videos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.warn('Error fetching videos from Supabase:', error);
        return deduplicate((localVideos && localVideos.length > 0) ? localVideos : DEFAULT_VIDEOS);
      }

      if (!data || data.length === 0) {
        // Table is empty, seed defaults
        const initialRows = DEFAULT_VIDEOS.map((video, idx) => ({
          id: video.id,
          title: video.title,
          treatment: video.treatment,
          display_order: idx,
          videoPlatform: video.videoPlatform || 'instagram'
        }));

        const { error: seedError } = await supabase.client
          .from('videos')
          .insert(initialRows);

        if (seedError) {
          console.warn('Error seeding default videos with videoPlatform, trying fallback:', seedError);
          const fallbackRows = initialRows.map(({ videoPlatform, ...rest }) => rest);
          const { error: fallbackError } = await supabase.client
            .from('videos')
            .insert(fallbackRows);
          if (fallbackError) {
            console.warn('Error seeding fallback default videos:', fallbackError);
          }
        }

        // Cache default videos locally
        try {
          localStorage.setItem('patel_dental_videos_list', JSON.stringify(DEFAULT_VIDEOS));
        } catch (e) {
          console.warn('Error caching default videos:', e);
        }

        return DEFAULT_VIDEOS;
      }

      const remoteVideos = data
        .filter((row: any) => row.id !== 'setting_dental_tourism_video_enabled')
        .map((row: any) => {
        // Match with localVideos version if exists to preserve metadata
        const localMatch = localVideos?.find(v => v.id === row.id);

        let originalTreatment = row.treatment || 'Patient Testimonial';
        let customThumbnail = '';
        let customPlatform = '';

        if (originalTreatment.includes('||')) {
          const parts = originalTreatment.split('||');
          originalTreatment = parts[0];
          for (let i = 1; i < parts.length; i++) {
            if (parts[i].startsWith('thumb:')) {
              customThumbnail = parts[i].substring(6);
            } else if (parts[i].startsWith('platform:')) {
              customPlatform = parts[i].substring(9);
            }
          }
        } else if (originalTreatment.includes('||thumb:')) {
          const parts = originalTreatment.split('||thumb:');
          originalTreatment = parts[0];
          customThumbnail = parts[1];
        }

        const combined = { 
          ...row, 
          platform: customPlatform || row.videoPlatform || row.videoplatform || localMatch?.platform || localMatch?.videoPlatform,
          videoPlatform: customPlatform || row.videoPlatform || row.videoplatform || localMatch?.videoPlatform || localMatch?.platform
        };
        const detectedPlatform = detectPlatform(combined);

        const id = row.id;
        const platform = detectedPlatform;
        const url = platform === 'mp4' ? id : `https://www.instagram.com/p/${id}/`;
        
        const thumbnail = customThumbnail || (platform === 'mp4' ? `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=60` : `https://www.instagram.com/p/${id}/media/?size=l`);
        const createdAt = row.created_at || new Date().toISOString();

        return {
          id: id,
          title: row.title || '',
          treatment: originalTreatment,
          videoPlatform: platform,
          platform: platform,
          url: url,
          thumbnail: thumbnail,
          category: originalTreatment,
          createdAt: createdAt
        };
      });

      const uniqueRemoteVideos = deduplicate(remoteVideos);

      // Update localStorage with Supabase data
      try {
        localStorage.setItem('patel_dental_videos_list', JSON.stringify(uniqueRemoteVideos));
      } catch (e) {
        console.warn('Error updating local videos cache:', e);
      }

      return uniqueRemoteVideos;
    } catch (e) {
      console.warn('Exception in getVideos:', e);
      return deduplicate((localVideos && localVideos.length > 0) ? localVideos : DEFAULT_VIDEOS);
    }
  },

  /**
   * Saves the entire list of videos to Supabase.
   * Deletes those not present in current set.
   */
  saveVideos: async (videos: DentalVideo[]): Promise<boolean> => {
    // Unique-ify incoming list by ID to prevent duplicate primary keys
    const uniqueInput: DentalVideo[] = [];
    const seen = new Set<string>();
    for (const v of videos) {
      if (v && v.id) {
        if (!seen.has(v.id)) {
          seen.add(v.id);
          uniqueInput.push(v);
        }
      }
    }

    const enrichedVideos = uniqueInput.map((video) => {
      const platform = video.platform || video.videoPlatform || detectPlatform(video);
      const url = video.url || (platform === 'mp4' ? video.id : `https://www.instagram.com/p/${video.id}/`);
      const thumbnail = video.thumbnail || (platform === 'mp4' ? `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=60` : `https://www.instagram.com/p/${video.id}/media/?size=l`);
      const createdAt = video.createdAt || new Date().toISOString();
      const title = video.title || 'Patient Testimonial';
      const category = video.category || video.treatment || 'Patient Testimonial';

      return {
        id: video.id,
        title: title,
        treatment: category,
        videoPlatform: platform,
        platform: platform,
        url: url,
        thumbnail: thumbnail,
        category: category,
        createdAt: createdAt
      };
    });

    // Always update localStorage first so we have local persistence
    try {
      localStorage.setItem('patel_dental_videos_list', JSON.stringify(enrichedVideos));
    } catch (e) {
      console.warn('Failed to save videos to localStorage:', e);
    }

    if (!isSupabaseConfigured()) {
      return true; // Return true because we successfully saved to localStorage fallback
    }

    try {
      const rowsToUpsert = enrichedVideos.map((video, idx) => {
        const platform = video.videoPlatform || video.platform || detectPlatform(video);
        let savedTreatment = video.treatment || 'Patient Testimonial';
        
        // Always append platform to savedTreatment so it is permanently persisted in database text column
        savedTreatment = `${savedTreatment}||platform:${platform}`;

        const defaultThumb = platform === 'mp4' 
          ? `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=60` 
          : `https://www.instagram.com/p/${video.id}/media/?size=l`;

        if (video.thumbnail && video.thumbnail !== defaultThumb) {
          savedTreatment = `${savedTreatment}||thumb:${video.thumbnail}`;
        }

        return {
          id: video.id,
          title: video.title,
          treatment: savedTreatment,
          display_order: idx,
          videoPlatform: platform
        };
      });

      const videoIds = enrichedVideos.map(v => v.id);

      // Delete items not in current selection
      if (videoIds.length > 0) {
        const { error: deleteError } = await supabase.client
          .from('videos')
          .delete()
          .not('id', 'in', `(${videoIds.map(id => `'${id}'`).join(',')})`)
          .neq('id', 'setting_dental_tourism_video_enabled');

        if (deleteError) {
          console.warn('Error deleting obsolete videos:', deleteError);
        }
      } else {
        const { error: deleteError } = await supabase.client
          .from('videos')
          .delete()
          .neq('id', 'dummy_nonexistent_id')
          .neq('id', 'setting_dental_tourism_video_enabled');

        if (deleteError) {
          console.warn('Error deleting all videos:', deleteError);
        }
      }

      // Upsert current set of videos
      if (rowsToUpsert.length > 0) {
        const { error: upsertError } = await supabase.client
          .from('videos')
          .upsert(rowsToUpsert);

        if (upsertError) {
          console.warn('Error upserting videos with videoPlatform, trying fallback:', upsertError);
          const fallbackRows = rowsToUpsert.map(({ videoPlatform, ...rest }) => rest);
          const { error: fallbackError } = await supabase.client
            .from('videos')
            .upsert(fallbackRows);

          if (fallbackError) {
            console.error('Error upserting with fallback:', fallbackError);
            return false;
          }
        }
      }

      return true;
    } catch (e) {
      console.error('Exception in saveVideos:', e);
      return false;
    }
  },

  getDentalTourismVideoEnabled: async (): Promise<boolean> => {
    const localVal = localStorage.getItem('setting_dental_tourism_video_enabled');
    const defaultVal = true;
    
    if (!isSupabaseConfigured()) {
      return localVal !== null ? localVal === 'true' : defaultVal;
    }
    
    try {
      const { data, error } = await supabase.client
        .from('videos')
        .select('*')
        .eq('id', 'setting_dental_tourism_video_enabled')
        .maybeSingle();
        
      if (error || !data) {
        return localVal !== null ? localVal === 'true' : defaultVal;
      }
      
      const enabled = data.title === 'true';
      localStorage.setItem('setting_dental_tourism_video_enabled', String(enabled));
      return enabled;
    } catch (e) {
      console.warn('Error fetching dental tourism video enabled setting:', e);
      return localVal !== null ? localVal === 'true' : defaultVal;
    }
  },

  setDentalTourismVideoEnabled: async (enabled: boolean): Promise<boolean> => {
    localStorage.setItem('setting_dental_tourism_video_enabled', String(enabled));
    
    if (!isSupabaseConfigured()) {
      return true;
    }
    
    try {
      const { error } = await supabase.client
        .from('videos')
        .upsert({
          id: 'setting_dental_tourism_video_enabled',
          title: String(enabled),
          treatment: 'setting',
          display_order: 99999,
          videoPlatform: 'instagram'
        });
        
      if (error) {
        console.error('Error saving dental tourism video enabled setting:', error);
        return false;
      }
      return true;
    } catch (e) {
      console.error('Exception in setDentalTourismVideoEnabled:', e);
      return false;
    }
  }
};
