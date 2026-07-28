/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from './supabase';

/**
 * Uploads an image file to Supabase Storage in the 'media' bucket, inside the 'images/' folder.
 * Generates a unique filename using Date.now() plus a random string while preserving the original file extension.
 *
 * @param file The image file to upload
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(file: File): Promise<string> {
  const originalName = file.name;
  const extIndex = originalName.lastIndexOf('.');
  const fileExt = extIndex !== -1 ? originalName.substring(extIndex + 1) : '';
  const randomString = Math.random().toString(36).substring(2, 10);
  const uniqueName = `${Date.now()}_${randomString}${fileExt ? '.' + fileExt : ''}`;

  // Get current user ID if authenticated
  let userId: string | undefined;
  try {
    const { data } = await supabase.client.auth.getUser();
    userId = data?.user?.id;
  } catch (e) {
    console.warn('Failed to get user session:', e);
  }

  // Construct potential paths based on common RLS policies
  const pathsToTry: string[] = [];
  
  if (userId) {
    // 1. User-specific folder path (very common for restricted buckets)
    pathsToTry.push(`${userId}/${uniqueName}`);
    // 2. User-specific subfolder path
    pathsToTry.push(`${userId}/images/${uniqueName}`);
  }
  
  // 3. Standard images folder path
  pathsToTry.push(`images/${uniqueName}`);
  // 4. Root bucket path
  pathsToTry.push(uniqueName);

  let lastError: any = null;

  for (const filePath of pathsToTry) {
    try {
      const { error } = await supabase.client.storage
        .from('media')
        .upload(filePath, file, {
          upsert: false,
        });

      if (!error) {
        // Success! Get public URL
        const { data: publicUrlData } = supabase.client.storage
          .from('media')
          .getPublicUrl(filePath);

        if (publicUrlData && publicUrlData.publicUrl) {
          return publicUrlData.publicUrl;
        }
      } else {
        lastError = error;
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to upload image after trying all potential storage paths.');
}

/**
 * Uploads an MP4 video file to Supabase Storage in the 'media' bucket, inside the 'videos/' folder.
 * Generates a unique filename using Date.now() plus a random string.
 *
 * @param file The video file to upload
 * @returns The public URL of the uploaded video
 */
export async function uploadVideo(file: File): Promise<string> {
  const originalName = file.name;
  const extIndex = originalName.lastIndexOf('.');
  const fileExt = extIndex !== -1 ? originalName.substring(extIndex + 1) : '';
  const randomString = Math.random().toString(36).substring(2, 10);
  const uniqueName = `${Date.now()}_${randomString}${fileExt ? '.' + fileExt : ''}`;

  // Retrieve current session and user from Supabase Auth client
  let session: any = null;
  let currentUser: any = null;
  try {
    const { data: sessionData } = await supabase.client.auth.getSession();
    session = sessionData?.session || null;
    const { data: userData } = await supabase.client.auth.getUser();
    currentUser = userData?.user || session?.user || null;
  } catch (e) {
    console.warn('[uploadVideo] Error retrieving session/user from Supabase Auth:', e);
  }

  const authUid = currentUser?.id || session?.user?.id || null;
  const authRole = currentUser?.role || session?.user?.role || (session ? 'authenticated' : 'anon');
  const sessionUserId = session?.user?.id || null;
  const isAuthenticated = !!(session && (currentUser || session?.user));
  const reqAuthStatus = isAuthenticated ? 'authenticated' : 'anonymous';
  const bucketName = 'media';
  
  let userId: string | undefined = currentUser?.id;
  const pathsToTry: string[] = [];
  
  if (userId) {
    pathsToTry.push(`${userId}/videos/${uniqueName}`);
    pathsToTry.push(`${userId}/${uniqueName}`);
  }
  
  pathsToTry.push(`videos/${uniqueName}`);
  pathsToTry.push(uniqueName);

  const primaryPath = pathsToTry[0];

  // Print required runtime diagnostic values
  console.group('📹 [MP4 UPLOAD RUNTIME DIAGNOSTICS]');
  console.log('- auth.uid():', authUid);
  console.log('- auth.role():', authRole);
  console.log('- session.user.id:', sessionUserId);
  console.log('- whether the request is authenticated or anonymous:', reqAuthStatus);
  console.log('- bucket name:', bucketName);
  console.log('- upload path:', primaryPath);
  console.log('- current user object:', currentUser);
  console.groupEnd();

  let lastError: any = null;

  for (const filePath of pathsToTry) {
    try {
      const { error } = await supabase.client.storage
        .from(bucketName)
        .upload(filePath, file, {
          upsert: false,
          contentType: 'video/mp4'
        });

      if (!error) {
        // Success! Get public URL
        const { data: publicUrlData } = supabase.client.storage
          .from(bucketName)
          .getPublicUrl(filePath);

        if (publicUrlData && publicUrlData.publicUrl) {
          return publicUrlData.publicUrl;
        }
      } else {
        lastError = error;
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to upload video after trying all potential storage paths.');
}

