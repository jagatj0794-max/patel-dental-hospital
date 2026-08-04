/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, 
  Upload, 
  Trash2, 
  Play, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  FileVideo, 
  Image, 
  Eye, 
  RefreshCw, 
  Calendar, 
  Maximize2, 
  Clock,
  X
} from 'lucide-react';
import { uploadVideo, uploadImage } from '../utils/supabaseStorage';

interface VideoUploadCmsFieldProps {
  mConfig: any;
  updateMConfigField: (key: string, value: any) => void;
}

export default function VideoUploadCmsField({ mConfig, updateMConfigField }: VideoUploadCmsFieldProps) {
  const [videoUploadProgress, setVideoUploadProgress] = useState<number | null>(null);
  const [videoUploadError, setVideoUploadError] = useState<string | null>(null);
  
  const [thumbUploadProgress, setThumbUploadProgress] = useState<number | null>(null);
  const [thumbUploadError, setThumbUploadError] = useState<string | null>(null);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const [isDraggingThumb, setIsDraggingThumb] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const isSupabaseConfigured = () => {
    return !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const getVidMetadata = (file: File): Promise<{ duration: string; resolution: string }> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const mins = Math.floor(video.duration / 60);
        const secs = Math.floor(video.duration % 60);
        const durationStr = `${mins}:${secs.toString().padStart(2, '0')}`;
        const resStr = `${video.videoWidth} × ${video.videoHeight}`;
        resolve({ duration: durationStr, resolution: resStr });
      };
      video.onerror = () => {
        resolve({ duration: '0:30', resolution: '1920 × 1080' });
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const captureFirstFrame = (file: File): Promise<File | null> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;
      
      video.onloadeddata = () => {
        video.currentTime = 0.5;
      };
      
      video.onseeked = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              if (blob) {
                const imgFile = new File([blob], 'thumb.jpg', { type: 'image/jpeg' });
                resolve(imgFile);
              } else {
                resolve(null);
              }
            }, 'image/jpeg', 0.85);
          } else {
            resolve(null);
          }
        } catch (e) {
          console.error('Error capturing first frame:', e);
          resolve(null);
        } finally {
          URL.revokeObjectURL(video.src);
        }
      };
      
      video.onerror = () => {
        resolve(null);
      };
      
      video.src = URL.createObjectURL(file);
    });
  };

  const processVideoFile = async (file: File) => {
    setVideoUploadError(null);

    // Format check
    const validFormats = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-matroska'];
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const isSupportedExt = ['mp4', 'webm', 'mov'].includes(fileExt || '');
    
    if (!isSupportedExt && !validFormats.includes(file.type)) {
      setVideoUploadError('Unsupported video format.');
      return;
    }

    // Size limit check (50 MB = 50 * 1024 * 1024 bytes)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setVideoUploadError('⚠️ Video size exceeds the maximum limit of 50 MB. Please upload a compressed video below 50 MB.');
      return;
    }

    // Get metadata
    let duration = '0:30';
    let resolution = '1920 × 1080';
    try {
      const meta = await getVidMetadata(file);
      duration = meta.duration;
      resolution = meta.resolution;
    } catch (e) {
      console.warn('Failed to extract video metadata:', e);
    }

    // Format size
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

    // Start progress simulation
    setVideoUploadProgress(10);
    const interval = setInterval(() => {
      setVideoUploadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 15;
      });
    }, 200);

    try {
      let finalUrl = '';
      if (isSupabaseConfigured()) {
        finalUrl = await uploadVideo(file);
      } else {
        finalUrl = await readFileAsBase64(file);
      }

      clearInterval(interval);
      setVideoUploadProgress(100);

      // Save upload metadata
      const uploadDateStr = new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });

      updateMConfigField('featured_video_upload_url', finalUrl);
      updateMConfigField('featured_video_name', file.name);
      updateMConfigField('featured_video_size', sizeInMB);
      updateMConfigField('featured_video_duration', duration);
      updateMConfigField('featured_video_resolution', resolution);
      updateMConfigField('featured_video_upload_date', uploadDateStr);

      // If Thumbnail Source is Auto, try to capture first frame & upload
      if (mConfig.featured_video_thumbnail_source !== 'custom') {
        try {
          const firstFrameFile = await captureFirstFrame(file);
          if (firstFrameFile) {
            let thumbUrl = '';
            if (isSupabaseConfigured()) {
              thumbUrl = await uploadImage(firstFrameFile);
            } else {
              thumbUrl = await readFileAsBase64(firstFrameFile);
            }
            if (thumbUrl) {
              updateMConfigField('featured_video_auto_thumbnail', thumbUrl);
            }
          }
        } catch (e) {
          console.warn('Could not auto-generate thumbnail:', e);
        }
      }

      setTimeout(() => {
        setVideoUploadProgress(null);
      }, 1500);

    } catch (e: any) {
      clearInterval(interval);
      setVideoUploadProgress(null);
      setVideoUploadError(e?.message || 'Failed to upload video file.');
    }
  };

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingVideo(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processVideoFile(e.dataTransfer.files[0]);
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processVideoFile(e.target.files[0]);
    }
  };

  const removeVideo = () => {
    updateMConfigField('featured_video_upload_url', '');
    updateMConfigField('featured_video_name', '');
    updateMConfigField('featured_video_size', '');
    updateMConfigField('featured_video_duration', '');
    updateMConfigField('featured_video_resolution', '');
    updateMConfigField('featured_video_upload_date', '');
    updateMConfigField('featured_video_auto_thumbnail', '');
  };

  // Custom Thumbnail handlers
  const processThumbFile = async (file: File) => {
    setThumbUploadError(null);

    const validImgTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validImgTypes.includes(file.type)) {
      setThumbUploadError('Unsupported image format. Allowed formats: JPG, PNG, WEBP.');
      return;
    }

    setThumbUploadProgress(20);
    const interval = setInterval(() => {
      setThumbUploadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 20;
      });
    }, 150);

    try {
      let finalUrl = '';
      if (isSupabaseConfigured()) {
        finalUrl = await uploadImage(file);
      } else {
        finalUrl = await readFileAsBase64(file);
      }

      clearInterval(interval);
      setThumbUploadProgress(100);

      updateMConfigField('featured_video_custom_thumbnail', finalUrl);

      setTimeout(() => {
        setThumbUploadProgress(null);
      }, 1500);
    } catch (e: any) {
      clearInterval(interval);
      setThumbUploadProgress(null);
      setThumbUploadError(e?.message || 'Failed to upload custom thumbnail.');
    }
  };

  const handleThumbDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingThumb(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processThumbFile(e.dataTransfer.files[0]);
    }
  };

  const handleThumbSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processThumbFile(e.target.files[0]);
    }
  };

  const hasVideo = !!mConfig.featured_video_upload_url;

  return (
    <div className="space-y-5">
      {/* 1. MAIN VIDEO UPLOAD FIELD */}
      <div className="space-y-2">
        <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Video className="h-3.5 w-3.5 text-[#0D9488]" />
          <span>Treatment Video Source File</span>
        </label>

        {videoUploadError && (
          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs flex items-start gap-2 animate-fade-in">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="font-semibold leading-normal">{videoUploadError}</span>
          </div>
        )}

        {!hasVideo && videoUploadProgress === null ? (
          /* Drag & Drop Area */
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDraggingVideo(true); }}
            onDragLeave={() => setIsDraggingVideo(false)}
            onDrop={handleVideoDrop}
            onClick={() => videoInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all ${
              isDraggingVideo 
                ? 'border-[#0D9488] bg-teal-50/30' 
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <input 
              type="file" 
              ref={videoInputRef}
              onChange={handleVideoSelect}
              accept="video/mp4,video/webm,video/quicktime" 
              className="hidden" 
            />
            <div className="mx-auto h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488] mb-3">
              <Upload className="h-5.5 w-5.5" />
            </div>
            <span className="text-xs font-black text-slate-800 block">📹 Upload Treatment Video</span>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              Drag & Drop Video Here, or <span className="text-[#0D9488] font-bold underline">Browse Files</span>
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-6 text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
              <div>Supported: <span className="text-slate-600">MP4, WEBM, MOV</span></div>
              <div className="h-3 w-[1px] bg-slate-200"></div>
              <div>Max Size: <span className="text-slate-600">50 MB</span></div>
            </div>
          </div>
        ) : videoUploadProgress !== null ? (
          /* Uploading Progress State */
          <div className="border border-slate-150 rounded-2xl p-6 bg-slate-50/50 text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 text-[#0D9488] animate-spin" />
              <span className="text-xs font-black text-slate-700">Uploading Video File...</span>
            </div>
            <div className="space-y-1 max-w-xs mx-auto">
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-[#0D9488] h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${videoUploadProgress}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 block">{videoUploadProgress}% completed</span>
            </div>
          </div>
        ) : (
          /* Video Preview Card */
          <div className="border border-slate-150 rounded-2xl overflow-hidden bg-white shadow-3xs animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Media Preview Slot */}
              <div className="md:col-span-5 bg-slate-950 aspect-video relative flex items-center justify-center text-white border-b md:border-b-0 md:border-r border-slate-150">
                {mConfig.featured_video_upload_url ? (
                  <video 
                    src={mConfig.featured_video_upload_url} 
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                ) : (
                  <FileVideo className="h-10 w-10 text-slate-600" />
                )}
                <div className="absolute inset-0 bg-slate-950/20 hover:bg-slate-950/40 transition-colors flex items-center justify-center group cursor-pointer" onClick={() => setIsPreviewOpen(true)}>
                  <div className="p-3 rounded-full bg-white/90 text-slate-800 hover:scale-105 transition-transform shadow-md">
                    <Play className="h-4 w-4 fill-current ml-0.5 text-teal-600" />
                  </div>
                </div>
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-xs rounded-md text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-teal-400" />
                  <span>Success</span>
                </div>
              </div>

              {/* Video Info Details */}
              <div className="md:col-span-7 p-4.5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] font-bold text-teal-600 uppercase tracking-wider block">🎬 Video File Loaded</span>
                    <span className="text-xs font-black text-slate-800 block truncate mt-0.5" title={mConfig.featured_video_name || 'Uploaded Video'}>
                      {mConfig.featured_video_name || 'Uploaded Video File'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="p-1 rounded bg-slate-50 text-slate-400"><Maximize2 className="h-3 w-3" /></span>
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Resolution</span>
                        <span className="text-[10px] font-semibold text-slate-600 block">{mConfig.featured_video_resolution || '1920 × 1080'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="p-1 rounded bg-slate-50 text-slate-400"><Clock className="h-3 w-3" /></span>
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Duration</span>
                        <span className="text-[10px] font-semibold text-slate-600 block">{mConfig.featured_video_duration || '0:30'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="p-1 rounded bg-slate-50 text-slate-400"><FileVideo className="h-3 w-3" /></span>
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">File Size</span>
                        <span className="text-[10px] font-semibold text-slate-600 block">{mConfig.featured_video_size || 'Unknown'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="p-1 rounded bg-slate-50 text-slate-400"><Calendar className="h-3 w-3" /></span>
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Uploaded</span>
                        <span className="text-[10px] font-semibold text-slate-600 block">{mConfig.featured_video_upload_date || 'Today'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4.5 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(true)}
                    className="flex-1 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[10px] font-black rounded-xl cursor-pointer transition-colors border border-slate-150 flex items-center justify-center gap-1"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>PREVIEW</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="flex-1 px-3 py-2 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-[10px] font-black rounded-xl cursor-pointer transition-colors border border-teal-100 flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>REPLACE</span>
                  </button>

                  <button
                    type="button"
                    onClick={removeVideo}
                    className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-black rounded-xl cursor-pointer transition-colors border border-rose-100 flex items-center justify-center gap-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>REMOVE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. CUSTOM THUMBNAIL UPLOAD ZONE (Condition-based) */}
      {mConfig.featured_video_thumbnail_source === 'custom' && (
        <div className="space-y-2 border-t border-slate-100 pt-4 animate-fade-in">
          <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Image className="h-3.5 w-3.5 text-[#0D9488]" />
            <span>Custom Thumbnail Image</span>
          </label>

          {thumbUploadError && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="font-semibold">{thumbUploadError}</span>
            </div>
          )}

          {!mConfig.featured_video_custom_thumbnail && thumbUploadProgress === null ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingThumb(true); }}
              onDragLeave={() => setIsDraggingThumb(false)}
              onDrop={handleThumbDrop}
              onClick={() => thumbInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                isDraggingThumb 
                  ? 'border-[#0D9488] bg-teal-50/30' 
                  : 'border-slate-200 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <input 
                type="file" 
                ref={thumbInputRef}
                onChange={handleThumbSelect}
                accept="image/jpeg,image/png,image/webp" 
                className="hidden" 
              />
              <Upload className="h-5 w-5 text-slate-400 mx-auto mb-1.5" />
              <span className="text-[10px] font-bold text-slate-700 block">Upload Thumbnail Image</span>
              <p className="text-[9px] text-slate-400 mt-0.5">Drag & Drop Image, or Browse (JPG, PNG, WEBP)</p>
            </div>
          ) : thumbUploadProgress !== null ? (
            <div className="border border-slate-150 rounded-xl p-4 bg-slate-50/30 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 text-[#0D9488] animate-spin" />
                <span className="text-[10px] font-bold text-slate-600">Uploading Image... {thumbUploadProgress}%</span>
              </div>
            </div>
          ) : (
            <div className="border border-slate-150 rounded-xl p-3 bg-white flex items-center gap-3 shadow-3xs">
              <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-150 shrink-0">
                <img 
                  src={mConfig.featured_video_custom_thumbnail} 
                  alt="Custom thumbnail" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black text-slate-800 block truncate">Custom Cover Thumbnail Active</span>
                <span className="text-[8px] text-slate-400 uppercase tracking-wider block mt-0.5">Custom Image URL Registered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => thumbInputRef.current?.click()}
                  className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg cursor-pointer transition-colors border border-slate-200"
                  title="Replace Thumbnail"
                >
                  <RefreshCw className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() => updateMConfigField('featured_video_custom_thumbnail', '')}
                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg cursor-pointer transition-colors border border-rose-200"
                  title="Remove Thumbnail"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. LIGHTBOX PREVIEW PORTAL */}
      {isPreviewOpen && mConfig.featured_video_upload_url && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-4xl aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-10 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <video 
              src={mConfig.featured_video_upload_url} 
              className="w-full h-full"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </div>
  );
}
