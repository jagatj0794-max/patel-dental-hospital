import React, { useState, useRef, useEffect } from 'react';
import { Video, Instagram, Youtube, UploadCloud, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Service, MarketingConfig } from '../types';
import { isSupabaseConfigured } from '../utils/supabase';
import { uploadVideo } from '../utils/supabaseStorage';
import CmsSectionToggle from './CmsSectionToggle';

interface ProcedureVideoCmsSectionProps {
  service: Service;
  mConfig: MarketingConfig;
  updateServiceField: (field: keyof Service, val: any) => void;
  updateMConfigField: (key: string, val: any) => void;
  sectionNumber: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ProcedureVideoCmsSection({
  service,
  mConfig,
  updateServiceField,
  updateMConfigField,
  sectionNumber,
  isExpanded,
  onToggle
}: ProcedureVideoCmsSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Read video source or default to 'instagram' (for backward compatibility if existing is Instagram reel)
  // Or 'youtube' if existing url is youtube, etc.
  const getInitialSource = (): 'instagram' | 'youtube' | 'mp4' => {
    if (mConfig.procedure_video_source) {
      return mConfig.procedure_video_source;
    }
    const currentUrl = service.procedure_video_url || '';
    if (currentUrl.includes('youtube.com') || currentUrl.includes('youtu.be')) {
      return 'youtube';
    }
    if (currentUrl.endsWith('.mp4') || currentUrl.includes('supabase.co') || currentUrl.startsWith('data:video/mp4')) {
      return 'mp4';
    }
    return 'instagram'; // default
  };

  const [videoSource, setVideoSource] = useState<'instagram' | 'youtube' | 'mp4'>(getInitialSource());

  // Synchronize on mount and when service/mConfig updates
  useEffect(() => {
    const src = getInitialSource();
    if (src !== videoSource) {
      setVideoSource(src);
    }
  }, [mConfig.procedure_video_source, service.procedure_video_url]);

  const handleSourceChange = (newSource: 'instagram' | 'youtube' | 'mp4') => {
    setVideoSource(newSource);
    updateMConfigField('procedure_video_source', newSource);
    
    // Retrieve the URL stored for this specific source and update the active service.procedure_video_url
    let sourceUrl = '';
    if (newSource === 'instagram') {
      sourceUrl = mConfig.procedure_video_instagram_url || '';
    } else if (newSource === 'youtube') {
      sourceUrl = mConfig.procedure_video_youtube_url || '';
    } else if (newSource === 'mp4') {
      sourceUrl = mConfig.procedure_video_mp4_url || '';
    }
    updateServiceField('procedure_video_url', sourceUrl);
  };

  const handleUrlInputChange = (val: string) => {
    if (videoSource === 'instagram') {
      updateMConfigField('procedure_video_instagram_url', val);
    } else if (videoSource === 'youtube') {
      updateMConfigField('procedure_video_youtube_url', val);
    }
    updateServiceField('procedure_video_url', val);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processAndUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processAndUploadFile(e.target.files[0]);
    }
  };

  // Base64 fallback for files
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const processAndUploadFile = async (file: File) => {
    setUploadError(null);
    
    // 1. Validate File Type
    if (file.type !== 'video/mp4' && !file.name.endsWith('.mp4')) {
      setUploadError('Invalid file type. Only MP4 (.mp4) videos are supported.');
      return;
    }

    // 2. Validate File Size (Max 100 MB as configured in other parts of Admin panel)
    const maxBytes = 100 * 1024 * 1024; // 100 MB
    if (file.size > maxBytes) {
      setUploadError('File is too large. Maximum size allowed is 100 MB.');
      return;
    }

    try {
      // Start progress simulation
      setUploadProgress(10);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev === null) return null;
          if (prev >= 85) {
            clearInterval(interval);
            return prev;
          }
          return prev + Math.floor(Math.random() * 8) + 3;
        });
      }, 250);

      let uploadedUrl = '';
      if (isSupabaseConfigured()) {
        uploadedUrl = await uploadVideo(file);
      } else {
        uploadedUrl = await readFileAsBase64(file);
      }

      clearInterval(interval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setUploadProgress(null);
        updateMConfigField('procedure_video_mp4_url', uploadedUrl);
        updateServiceField('procedure_video_url', uploadedUrl);
      }, 600);

    } catch (e: any) {
      console.error('Video upload error:', e);
      setUploadProgress(null);
      setUploadError(e?.message || 'Failed to upload video file to storage.');
    }
  };

  const removeUploadedVideo = () => {
    updateMConfigField('procedure_video_mp4_url', '');
    updateServiceField('procedure_video_url', '');
  };

  // Get active source value
  const activeUrl = service.procedure_video_url || '';

  return (
    <div className="bg-white border border-slate-150 rounded-2xl shadow-3xs overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
            <Video className="h-4 w-4" />
          </span>
          <div>
            <span className="text-xs font-black text-[#081C3A] uppercase tracking-wider block">
              {sectionNumber}. Procedure Video
            </span>
            <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">
              Configure procedure title, description, and source video (Instagram, YouTube, or Manual MP4)
            </span>
          </div>
        </div>
        {isExpanded ? (
          <span className="text-slate-400">▲</span>
        ) : (
          <span className="text-slate-400">▼</span>
        )}
      </button>

      {isExpanded && (
        <div className="p-6 border-t border-slate-100 space-y-5">
          <CmsSectionToggle
            checked={mConfig.show_procedure_video !== false}
            onChange={(checked) => updateMConfigField('show_procedure_video', checked)}
          />

          {/* Title Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">
              Section Title
            </label>
            <input
              type="text"
              value={service.procedure_video_title || ''}
              onChange={(e) => updateServiceField('procedure_video_title', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
              placeholder="e.g. Screw Retained Prosthesis Procedure"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">
              Short Video Summary Description
            </label>
            <textarea
              rows={2}
              value={service.procedure_video_description || ''}
              onChange={(e) => updateServiceField('procedure_video_description', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800 leading-normal"
              placeholder="Provide a short description of the procedure video..."
            />
          </div>

          {/* VIDEO SOURCE SELECTOR */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">
              Video Source
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSourceChange('instagram')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-xl border text-center sm:text-left transition cursor-pointer ${
                  videoSource === 'instagram'
                    ? 'border-teal-500 bg-teal-50/40 text-[#0D9488]'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Instagram className="h-4 w-4 shrink-0" />
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">Instagram</span>
              </button>

              <button
                type="button"
                onClick={() => handleSourceChange('youtube')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-xl border text-center sm:text-left transition cursor-pointer ${
                  videoSource === 'youtube'
                    ? 'border-teal-500 bg-teal-50/40 text-[#0D9488]'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Youtube className="h-4 w-4 shrink-0" />
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">YouTube</span>
              </button>

              <button
                type="button"
                onClick={() => handleSourceChange('mp4')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-xl border text-center sm:text-left transition cursor-pointer ${
                  videoSource === 'mp4'
                    ? 'border-teal-500 bg-teal-50/40 text-[#0D9488]'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <UploadCloud className="h-4 w-4 shrink-0" />
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-nowrap">Manual MP4</span>
              </button>
            </div>
          </div>

          {/* SOURCE-SPECIFIC FIELDS */}
          <div className="pt-1">
            {videoSource === 'instagram' && (
              <div className="space-y-1.5 animate-fade-in">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">
                  Instagram Reel URL
                </label>
                <input
                  type="text"
                  value={mConfig.procedure_video_instagram_url || activeUrl}
                  onChange={(e) => handleUrlInputChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  placeholder="e.g. https://www.instagram.com/reel/C8qLd9MyWwG/"
                />
              </div>
            )}

            {videoSource === 'youtube' && (
              <div className="space-y-1.5 animate-fade-in">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">
                  YouTube Video URL
                </label>
                <input
                  type="text"
                  value={mConfig.procedure_video_youtube_url || activeUrl}
                  onChange={(e) => handleUrlInputChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium bg-white text-slate-800"
                  placeholder="e.g. https://www.youtube.com/watch?v=SnOxxv_S2ew"
                />
              </div>
            )}

            {videoSource === 'mp4' && (
              <div className="space-y-3 animate-fade-in">
                <label className="text-[10px] font-black text-[#081C3A] uppercase tracking-wider block">
                  Manual MP4 Upload
                </label>
                
                {/* Upload Error Alert */}
                {uploadError && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 font-semibold leading-relaxed">
                    <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Upload Area / Active Video */}
                {mConfig.procedure_video_mp4_url || activeUrl ? (
                  <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
                        <Video className="h-5 w-5 shrink-0" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-black text-slate-800 block truncate">
                          Uploaded Procedure Video
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold block truncate max-w-sm">
                          {mConfig.procedure_video_mp4_url || activeUrl}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Replace Button */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10px] font-black uppercase tracking-wider rounded-lg shadow-3xs cursor-pointer"
                      >
                        Replace
                      </button>
                      
                      {/* Delete/Remove Button */}
                      <button
                        type="button"
                        onClick={removeUploadedVideo}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg cursor-pointer"
                        title="Remove Video"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition ${
                      dragActive
                        ? 'border-teal-500 bg-teal-50/20'
                        : 'border-slate-250 hover:border-slate-400 hover:bg-slate-50/55'
                    }`}
                  >
                    <UploadCloud className="h-9 w-9 text-slate-400 mb-2.5" />
                    <span className="text-xs font-black text-slate-700 block">
                      Drag & drop your MP4 video file here
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium mt-1">
                      or click to browse your computer
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium mt-2 bg-slate-100/80 px-2 py-0.5 rounded">
                      Only MP4 files up to 100 MB are allowed
                    </span>
                  </div>
                )}

                {/* Progress bar */}
                {uploadProgress !== null && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-teal-700">
                      <span>Uploading Video File...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-teal-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Success Banner */}
                {uploadProgress === 100 && (
                  <div className="p-2 px-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-[10px] text-emerald-800 font-bold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Upload Completed Successfully!</span>
                  </div>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="video/mp4"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
