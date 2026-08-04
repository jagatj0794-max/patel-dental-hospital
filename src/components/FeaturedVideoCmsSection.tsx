/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Video, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import VideoUploadCmsField from './VideoUploadCmsField';
import CmsSectionToggle from './CmsSectionToggle';

interface FeaturedVideoCmsSectionProps {
  mConfig: any;
  updateMConfigField: (key: string, val: any) => void;
  isExpanded: boolean;
  onToggle: () => void;
  sectionNumber?: string;
}

export default function FeaturedVideoCmsSection({
  mConfig,
  updateMConfigField,
  isExpanded,
  onToggle,
  sectionNumber = "2"
}: FeaturedVideoCmsSectionProps) {
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
              {sectionNumber}. Featured Treatment Video
            </span>
            <span className="text-[10px] text-slate-400 font-normal mt-0.5 block">
              Configure a prominent featured video section, bullet points, custom thumbnail and CTA actions
            </span>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-400" />
        )}
      </button>

      {isExpanded && (
        <div className="p-6 border-t border-slate-100 space-y-5">
          <CmsSectionToggle
            checked={mConfig.featured_video_enabled !== false}
            onChange={(checked) => updateMConfigField('featured_video_enabled', checked)}
          />

          {mConfig.featured_video_enabled !== false && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Section Heading</label>
                  <input
                    type="text"
                    placeholder="e.g. Watch Our Treatment Procedure In Action"
                    value={mConfig.featured_video_heading || ''}
                    onChange={(e) => updateMConfigField('featured_video_heading', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Video Source</label>
                  <select
                    value={mConfig.featured_video_source || 'youtube'}
                    onChange={(e) => updateMConfigField('featured_video_source', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  >
                    <option value="youtube">YouTube (Embedded)</option>
                    <option value="upload">Direct Uploaded Video File</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Rich Description</label>
                <textarea
                  rows={3}
                  placeholder="Write a compelling summary of what the video shows and how it educates the patient..."
                  value={mConfig.featured_video_description || ''}
                  onChange={(e) => updateMConfigField('featured_video_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>

              {mConfig.featured_video_source === 'upload' ? (
                <VideoUploadCmsField 
                  mConfig={mConfig}
                  updateMConfigField={updateMConfigField}
                />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">YouTube Video URL</label>
                    <input
                      type="text"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={mConfig.featured_video_youtube_url || ''}
                      onChange={(e) => updateMConfigField('featured_video_youtube_url', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Thumbnail Source</label>
                      <select
                        value={mConfig.featured_video_thumbnail_source || 'auto'}
                        onChange={(e) => updateMConfigField('featured_video_thumbnail_source', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                      >
                        <option value="auto">Auto Generate (First Frame / YouTube Cover)</option>
                        <option value="custom">Upload Custom Thumbnail</option>
                      </select>
                    </div>

                    {mConfig.featured_video_thumbnail_source === 'custom' && (
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Custom Thumbnail Image URL</label>
                        <input
                          type="text"
                          placeholder="https://images.unsplash.com/photo-..."
                          value={mConfig.featured_video_custom_thumbnail || ''}
                          onChange={(e) => updateMConfigField('featured_video_custom_thumbnail', e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {mConfig.featured_video_source === 'upload' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Thumbnail Source</label>
                    <select
                      value={mConfig.featured_video_thumbnail_source || 'auto'}
                      onChange={(e) => updateMConfigField('featured_video_thumbnail_source', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                    >
                      <option value="auto">Auto Generate (First Frame / YouTube Cover)</option>
                      <option value="custom">Upload Custom Thumbnail</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Bullet Points */}
              <div className="space-y-2 border border-slate-100 p-4 rounded-2xl bg-slate-50/30">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Featured Video Bullet Points</label>
                <div className="space-y-2">
                  {(mConfig.featured_video_bullets || []).map((bullet: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => {
                          const list = [...(mConfig.featured_video_bullets || [])];
                          list[index] = e.target.value;
                          updateMConfigField('featured_video_bullets', list);
                        }}
                        className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                        placeholder={`Bullet point #${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const list = (mConfig.featured_video_bullets || []).filter((_: any, i: number) => i !== index);
                          updateMConfigField('featured_video_bullets', list);
                        }}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const list = [...(mConfig.featured_video_bullets || []), ''];
                      updateMConfigField('featured_video_bullets', list);
                    }}
                    className="text-xs text-[#0D9488] hover:text-[#0F766E] font-bold flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    + Add Bullet Point
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">CTA Button Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Book Clinic Slot"
                    value={mConfig.featured_video_cta_text || ''}
                    onChange={(e) => updateMConfigField('featured_video_cta_text', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">CTA Button Link</label>
                  <input
                    type="text"
                    placeholder="e.g. #appointment, or a full URL"
                    value={mConfig.featured_video_cta_link || ''}
                    onChange={(e) => updateMConfigField('featured_video_cta_link', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>
              </div>

              {/* Video Player Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between select-none">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Autoplay After Click</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={mConfig.featured_video_autoplay !== false}
                      onChange={(e) => updateMConfigField('featured_video_autoplay', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                  </label>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between select-none">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Mute Video</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!mConfig.featured_video_mute}
                      onChange={(e) => updateMConfigField('featured_video_mute', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                  </label>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between select-none">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Loop Video</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!mConfig.featured_video_loop}
                      onChange={(e) => updateMConfigField('featured_video_loop', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
