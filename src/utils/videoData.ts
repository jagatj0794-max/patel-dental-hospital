/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DentalVideo } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

export const DEFAULT_VIDEOS: DentalVideo[] = [
  { id: 'cyai6CjMD0s', title: 'Dental Implants Treatment Experience', treatment: 'Dental Implants', videoPlatform: 'youtube', platform: 'youtube', url: 'https://www.youtube.com/watch?v=cyai6CjMD0s', thumbnail: 'https://img.youtube.com/vi/cyai6CjMD0s/hqdefault.jpg', category: 'Dental Implants', createdAt: new Date().toISOString() },
  { id: 'SnOxxv_S2ew', title: 'Full Mouth Rehabilitation Success Story', treatment: 'Full Mouth Rehab', videoPlatform: 'youtube', platform: 'youtube', url: 'https://www.youtube.com/watch?v=SnOxxv_S2ew', thumbnail: 'https://img.youtube.com/vi/SnOxxv_S2ew/hqdefault.jpg', category: 'Full Mouth Rehab', createdAt: new Date().toISOString() },
  { id: '2okui6RFf_k', title: 'Life-changing Invisible Aligners Transformation', treatment: 'Invisible Aligners', videoPlatform: 'youtube', platform: 'youtube', url: 'https://www.youtube.com/watch?v=2okui6RFf_k', thumbnail: 'https://img.youtube.com/vi/2okui6RFf_k/hqdefault.jpg', category: 'Invisible Aligners', createdAt: new Date().toISOString() },
  { id: '-eoVpGDqCRs', title: 'Patient Testimonial on Digital Dental Care', treatment: 'Advanced Dental Care', videoPlatform: 'youtube', platform: 'youtube', url: 'https://www.youtube.com/watch?v=-eoVpGDqCRs', thumbnail: 'https://img.youtube.com/vi/-eoVpGDqCRs/hqdefault.jpg', category: 'Advanced Dental Care', createdAt: new Date().toISOString() },
  { id: 'VZyPnTzlR9U', title: 'Complete Smile Makeover & Dental Implants', treatment: 'Smile Makeover', videoPlatform: 'youtube', platform: 'youtube', url: 'https://www.youtube.com/watch?v=VZyPnTzlR9U', thumbnail: 'https://img.youtube.com/vi/VZyPnTzlR9U/hqdefault.jpg', category: 'Smile Makeover', createdAt: new Date().toISOString() },
  { id: 'DBejq69FOGI', title: 'Painless Treatment and Care Experience', treatment: 'General Dentistry', videoPlatform: 'youtube', platform: 'youtube', url: 'https://www.youtube.com/watch?v=DBejq69FOGI', thumbnail: 'https://img.youtube.com/vi/DBejq69FOGI/hqdefault.jpg', category: 'General Dentistry', createdAt: new Date().toISOString() }
];

export const detectPlatform = (video: any): 'youtube' | 'instagram' | 'mp4' => {
  if (!video) return 'youtube';

  // 1. Explicit check of platform fields
  if (video.platform === 'mp4' || video.videoPlatform === 'mp4' || video.videoplatform === 'mp4') {
    return 'mp4';
  }
  if (video.platform === 'instagram' || video.videoPlatform === 'instagram' || video.videoplatform === 'instagram') {
    return 'instagram';
  }
  if (video.platform === 'youtube' || video.videoPlatform === 'youtube' || video.videoplatform === 'youtube') {
    return 'youtube';
  }

  // 2. Detect from url, youtubeUrl, or similar fields if present
  const url = video.url || video.youtubeUrl || '';
  if (url) {
    if (url.includes('instagram.com') || url.includes('instagr.am')) {
      return 'instagram';
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
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
  if (id.startsWith('youtube__') || id.includes('youtube')) {
    return 'youtube';
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

  // 6. Default YouTube videos
  const defaultYoutubeIds = ['cyai6CjMD0s', 'SnOxxv_S2ew', '2okui6RFf_k', '-eoVpGDqCRs', 'VZyPnTzlR9U', 'DBejq69FOGI', 'dQw4w9WgXcQ', 'ysz5S6PUM-U', 'ScMzIvxBSi4'];
  if (defaultYoutubeIds.includes(id)) {
    return 'youtube';
  }

  return 'youtube';
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
          videoPlatform: video.videoPlatform || 'youtube'
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

      const remoteVideos = data.map((row: any) => {
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
        const url = platform === 'mp4' ? id : (platform === 'instagram' ? `https://www.instagram.com/p/${id}/` : `https://www.youtube.com/watch?v=${id}`);
        
        const thumbnail = customThumbnail || (platform === 'mp4' ? `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=60` : (platform === 'instagram' ? `https://www.instagram.com/p/${id}/media/?size=l` : `https://img.youtube.com/vi/${id}/hqdefault.jpg`));
        const createdAt = row.created_at || new Date().toISOString();

        return {
          id: id,
          title: row.title || '',
          treatment: originalTreatment,
          videoPlatform: platform,
          platform: platform,
          url: url,
          youtubeUrl: url,
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
      const url = video.url || video.youtubeUrl || (platform === 'mp4' ? video.id : (platform === 'instagram' ? `https://www.instagram.com/p/${video.id}/` : `https://www.youtube.com/watch?v=${video.id}`));
      const thumbnail = video.thumbnail || (platform === 'mp4' ? `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=60` : (platform === 'instagram' ? `https://www.instagram.com/p/${video.id}/media/?size=l` : `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`));
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
        youtubeUrl: url,
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
          : (platform === 'instagram' 
              ? `https://www.instagram.com/p/${video.id}/media/?size=l` 
              : `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`);

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
          .not('id', 'in', `(${videoIds.map(id => `'${id}'`).join(',')})`);

        if (deleteError) {
          console.warn('Error deleting obsolete videos:', deleteError);
        }
      } else {
        const { error: deleteError } = await supabase.client
          .from('videos')
          .delete()
          .neq('id', 'dummy_nonexistent_id');

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
  }
};
