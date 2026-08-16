import React, { useState, useRef } from 'react';
import { Image as ImageIcon, UploadCloud, Trash2, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { isSupabaseConfigured } from '../utils/supabase';
import { uploadImage } from '../utils/supabaseStorage';

interface TestimonialThumbnailUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export const TestimonialThumbnailUpload: React.FC<TestimonialThumbnailUploadProps> = ({
  value = '',
  onChange,
  label = 'Reel Thumbnail (Optional)'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileProcess = async (file: File) => {
    setUploadError(null);

    // 1. Validate File Type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    // 2. Validate File Size (Max 15MB)
    const maxBytes = 15 * 1024 * 1024;
    if (file.size > maxBytes) {
      setUploadError('Image size exceeds 15 MB limit.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(15);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev === null) return null;
          if (prev >= 85) {
            clearInterval(interval);
            return prev;
          }
          return prev + Math.floor(Math.random() * 12) + 5;
        });
      }, 200);

      let publicUrl = '';
      if (isSupabaseConfigured()) {
        publicUrl = await uploadImage(file);
      } else {
        publicUrl = await readFileAsBase64(file);
      }

      clearInterval(interval);
      setUploadProgress(100);

      setTimeout(() => {
        setUploadProgress(null);
        setIsUploading(false);
        if (publicUrl) {
          onChange(publicUrl);
        }
      }, 400);
    } catch (err: any) {
      console.error('Failed to upload testimonial thumbnail:', err);
      setIsUploading(false);
      setUploadProgress(null);
      setUploadError(err?.message || 'Failed to upload image. Please try again.');
    }
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
      await handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFileProcess(e.target.files[0]);
    }
    // reset input value so re-uploading same file works
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
    setUploadError(null);
  };

  const hasThumbnail = typeof value === 'string' && value.trim() !== '';

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between">
        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
          <ImageIcon className="h-3 w-3 text-teal-600" />
          {label}
        </label>
        {hasThumbnail && (
          <span className="text-[9px] font-semibold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Custom Thumbnail Active
          </span>
        )}
      </div>

      {/* Upload Error Alert */}
      {uploadError && (
        <div className="p-2 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-1.5 text-[10px] text-rose-700 font-medium">
          <AlertCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
          <span className="flex-1">{uploadError}</span>
        </div>
      )}

      {hasThumbnail ? (
        /* Thumbnail Preview Card */
        <div className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 shadow-3xs hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-12 h-16 sm:w-14 sm:h-20 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-3xs">
              <img
                src={value}
                alt="Reel thumbnail preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-800 truncate block">
                  Reel Cover Image
                </span>
                <span className="text-[8px] bg-teal-50 text-teal-700 border border-teal-100 px-1.5 py-0.2 rounded font-semibold uppercase">
                  Uploaded
                </span>
              </div>
              <p className="text-[9px] text-slate-400 truncate max-w-xs sm:max-w-sm font-mono" title={value}>
                {value}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 border border-slate-200 hover:border-teal-200 text-slate-700 text-[10px] font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              title="Replace thumbnail image"
            >
              <RefreshCw className={`h-3 w-3 ${isUploading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Replace</span>
            </button>

            <button
              type="button"
              onClick={handleRemove}
              disabled={isUploading}
              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              title="Remove thumbnail"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty State: Upload or Direct URL Input */
        <div className="space-y-1.5">
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-xl p-3 flex items-center justify-between gap-3 bg-white/70 hover:bg-slate-50/80 cursor-pointer transition ${
              dragActive ? 'border-teal-500 bg-teal-50/30' : 'border-slate-250 hover:border-teal-500'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-lg bg-teal-50 text-teal-600 shrink-0">
                <UploadCloud className="h-4 w-4" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[11px] font-bold text-slate-700 block truncate">
                  {isUploading ? 'Uploading thumbnail...' : 'Upload Reel Thumbnail'}
                </span>
                <span className="text-[9px] text-slate-400 block">
                  Click or drag image file here (PNG, JPG, WEBP)
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={isUploading}
              className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-[#0D9488] border border-teal-200 text-[10px] font-bold rounded-lg shrink-0 transition"
            >
              {isUploading ? 'Uploading...' : 'Browse'}
            </button>
          </div>

          {/* Optional manual URL input fallback */}
          <input
            type="text"
            placeholder="Or paste thumbnail image URL directly..."
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-2.5 py-1 text-[11px] border border-slate-200 rounded-lg bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-teal-500 font-normal"
          />
        </div>
      )}

      {/* Progress Bar */}
      {uploadProgress !== null && (
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-[9px] font-bold text-teal-700">
            <span>Uploading image...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
            <div
              className="bg-teal-500 h-1 rounded-full transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default TestimonialThumbnailUpload;
