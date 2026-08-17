/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Pencil, 
  Save, 
  X, 
  Upload, 
  Check, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Sparkles,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { beforeAfterService } from '../utils/beforeAfterData';
import { BeforeAfterEntry } from '../types';
import { uploadImage } from '../utils/supabaseStorage';

const TREATMENT_OPTIONS = [
  "Dental Implants",
  "Smile Makeover",
  "Full-Mouth Rehabilitation",
  "Zirconia Crowns & Bridges",
  "Root Canal Treatment",
  "Aligners & Orthodontics"
];

export default function BeforeAfterCms() {
  const [items, setItems] = useState<BeforeAfterEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BeforeAfterEntry | null>(null);
  const [treatmentName, setTreatmentName] = useState(TREATMENT_OPTIONS[0]);
  const [beforeUrl, setBeforeUrl] = useState('');
  const [afterUrl, setAfterUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  
  const [isBeforeUploading, setIsBeforeUploading] = useState(false);
  const [isAfterUploading, setIsAfterUploading] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<BeforeAfterEntry | null>(null);

  const loadEntries = async () => {
    setIsLoading(true);
    try {
      const data = await beforeAfterService.getBeforeAfterEntries();
      setItems(data);
    } catch (err) {
      console.error('Error loading before/after entries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const resetForm = () => {
    setEditingItem(null);
    setTreatmentName(TREATMENT_OPTIONS[0]);
    setBeforeUrl('');
    setAfterUrl('');
    setDisplayOrder(items.length > 0 ? Math.max(...items.map(i => i.display_order)) + 1 : 0);
    setIsActive(true);
    setIsFormOpen(false);
  };

  const handleEditClick = (item: BeforeAfterEntry) => {
    setEditingItem(item);
    setTreatmentName(item.treatment_name);
    setBeforeUrl(item.before_image_url);
    setAfterUrl(item.after_image_url);
    setDisplayOrder(item.display_order);
    setIsActive(item.is_active);
    setIsFormOpen(true);
  };

  const handleBeforeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsBeforeUploading(true);
      setSaveMessage('Uploading Before image...');
      try {
        const url = await uploadImage(e.target.files[0]);
        setBeforeUrl(url);
        setSaveMessage('Before image uploaded!');
      } catch (err) {
        console.error('Failed to upload before image:', err);
        setSaveMessage('Failed to upload image. Input URL manually or try again.');
      } finally {
        setIsBeforeUploading(false);
        setTimeout(() => setSaveMessage(null), 3000);
      }
    }
  };

  const handleAfterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsAfterUploading(true);
      setSaveMessage('Uploading After image...');
      try {
        const url = await uploadImage(e.target.files[0]);
        setAfterUrl(url);
        setSaveMessage('After image uploaded!');
      } catch (err) {
        console.error('Failed to upload after image:', err);
        setSaveMessage('Failed to upload image. Input URL manually or try again.');
      } finally {
        setIsAfterUploading(false);
        setTimeout(() => setSaveMessage(null), 3000);
      }
    }
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beforeUrl || !afterUrl) {
      alert('Please provide both Before and After images.');
      return;
    }

    let updatedList = [...items];
    const itemId = editingItem ? editingItem.id : Math.random().toString(36).substring(2, 11);

    const newItem: BeforeAfterEntry = {
      id: itemId,
      treatment_name: treatmentName,
      before_image_url: beforeUrl,
      after_image_url: afterUrl,
      display_order: Number(displayOrder) || 0,
      is_active: isActive
    };

    if (editingItem) {
      updatedList = updatedList.map(item => item.id === editingItem.id ? newItem : item);
    } else {
      updatedList.push(newItem);
    }

    // Sort by order initially
    updatedList.sort((a, b) => a.display_order - b.display_order);

    setSaveMessage('Saving Before & After entry...');
    const success = await beforeAfterService.saveBeforeAfterList(updatedList);
    if (success) {
      setSaveMessage('Saved successfully!');
      resetForm();
      await loadEntries();
    } else {
      setSaveMessage('Failed to save to Supabase. Check credentials.');
    }
    setTimeout(() => setSaveMessage(null), 3500);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    const updatedList = items.filter(item => item.id !== itemToDelete.id);
    
    setSaveMessage('Deleting entry...');
    const success = await beforeAfterService.saveBeforeAfterList(updatedList);
    if (success) {
      setSaveMessage('Entry deleted!');
      setItemToDelete(null);
      await loadEntries();
    } else {
      setSaveMessage('Failed to delete.');
    }
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleToggleStatus = async (item: BeforeAfterEntry) => {
    const updated = items.map(i => i.id === item.id ? { ...i, is_active: !i.is_active } : i);
    setItems(updated);
    setSaveMessage('Updating status...');
    const success = await beforeAfterService.saveBeforeAfterList(updated);
    if (success) {
      setSaveMessage('Status updated successfully!');
      await loadEntries();
    } else {
      setSaveMessage('Failed to update status.');
    }
    setTimeout(() => setSaveMessage(null), 2500);
  };

  const handleMove = async (item: BeforeAfterEntry, direction: 'up' | 'down') => {
    const index = items.findIndex(i => i.id === item.id);
    if (index === -1) return;
    
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newList = [...items];
    const originalItem = newList[index];
    const targetItem = newList[targetIndex];

    // Swap positions
    newList[index] = targetItem;
    newList[targetIndex] = originalItem;

    // Reset display orders accordingly
    newList.forEach((item, idx) => {
      item.display_order = idx;
    });

    setItems(newList);
    setSaveMessage('Reordering list...');
    const success = await beforeAfterService.saveBeforeAfterList(newList);
    if (success) {
      setSaveMessage('Reordered successfully!');
      await loadEntries();
    } else {
      setSaveMessage('Failed to reorder.');
    }
    setTimeout(() => setSaveMessage(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Toast status message banner */}
      {saveMessage && (
        <div className="fixed top-4 right-4 z-[999] bg-slate-900 text-white font-semibold text-xs py-3 px-5 rounded-xl shadow-xl border border-slate-700 animate-slide-in flex items-center gap-2">
          <RefreshCw className="h-3.5 w-3.5 animate-spin text-teal-400" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Actions Row */}
      <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-slate-150 shadow-3xs">
        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-800">{items.length}</span> patient transformations
        </div>
        
        <button
          type="button"
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition duration-150 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Transformation</span>
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <RefreshCw className="h-8 w-8 animate-spin text-teal-600" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && items.length === 0 && (
        <div className="bg-white rounded-2xl p-16 border border-slate-150 text-center text-slate-400 text-sm">
          No Before & After transformations configured yet. Click "Add New Transformation" to get started!
        </div>
      )}

      {/* Grid List of entries */}
      {!isLoading && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div 
              key={item.id} 
              className="bg-white border border-slate-150 rounded-2xl p-5 flex flex-col justify-between gap-4 relative hover:shadow-sm transition-all duration-200"
            >
              {/* Header inside Card */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-600 tracking-wider">Treatment</span>
                  <h4 className="font-extrabold text-[#081C3A] text-[15px] leading-tight mt-0.5">{item.treatment_name}</h4>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(item)}
                    className={`p-1.5 rounded-lg border transition cursor-pointer ${
                      item.is_active 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100' 
                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                    }`}
                    title={item.is_active ? "Set Inactive" : "Set Active"}
                  >
                    {item.is_active ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  <span className="text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-600 px-2 py-1 rounded-md">
                    Order: {item.display_order}
                  </span>
                </div>
              </div>

              {/* Before/After Thumbnails preview */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="space-y-1 text-center">
                  <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">Before</span>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-slate-200">
                    <img 
                      src={item.before_image_url} 
                      alt="Before treatment" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <span className="text-[9px] uppercase font-black text-emerald-500 tracking-wider block">After</span>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-slate-200">
                    <img 
                      src={item.after_image_url} 
                      alt="After treatment" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
                {/* Movement buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(item, 'up')}
                    className={`p-1.5 rounded-lg border transition ${
                      idx === 0 
                        ? 'border-slate-100 text-slate-200 cursor-not-allowed bg-slate-50' 
                        : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 cursor-pointer'
                    }`}
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === items.length - 1}
                    onClick={() => handleMove(item, 'down')}
                    className={`p-1.5 rounded-lg border transition ${
                      idx === items.length - 1 
                        ? 'border-slate-100 text-slate-200 cursor-not-allowed bg-slate-50' 
                        : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 cursor-pointer'
                    }`}
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Edit & Delete */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditClick(item)}
                    className="font-bold text-xs text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-100 hover:bg-teal-100 transition cursor-pointer flex items-center gap-1"
                  >
                    <Pencil className="h-3 w-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setItemToDelete(item)}
                    className="text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-2 rounded-xl border border-rose-100 hover:border-rose-200 transition cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FORM MODAL DIALOG (For Add & Edit) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={resetForm} />
          
          <form 
            onSubmit={handleSaveSubmit}
            className="relative bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 text-slate-800 z-10 animate-fade-in space-y-5 overflow-y-auto max-h-[90vh]"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-[#081C3A] flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-teal-500 animate-pulse" />
                <span>{editingItem ? 'Edit Transformation' : 'Add New Transformation'}</span>
              </h3>
              <button 
                type="button" 
                onClick={resetForm}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Treatment Name Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Treatment Name</label>
              <select
                value={treatmentName}
                onChange={(e) => setTreatmentName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-teal-500 bg-white"
                required
              >
                {TREATMENT_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Before Image upload */}
            <div className="space-y-1.5 border border-slate-100 bg-slate-50/50 p-4 rounded-xl">
              <label className="text-xs font-bold text-slate-700 block">Before Image</label>
              
              <div className="flex items-center gap-3">
                <label className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition duration-150 cursor-pointer select-none">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{isBeforeUploading ? 'Uploading...' : 'Upload Image'}</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleBeforeUpload}
                    disabled={isBeforeUploading}
                  />
                </label>
                
                <span className="text-[10px] text-slate-400 font-bold">OR</span>
                
                <input
                  type="text"
                  placeholder="Image URL"
                  value={beforeUrl}
                  onChange={(e) => setBeforeUrl(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-teal-500 bg-white"
                  required
                />
              </div>

              {beforeUrl && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-14 w-20 rounded-lg overflow-hidden border border-slate-200 bg-white">
                    <img src={beforeUrl} alt="Before preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> Valid Before image loaded
                  </span>
                </div>
              )}
            </div>

            {/* After Image upload */}
            <div className="space-y-1.5 border border-slate-100 bg-slate-50/50 p-4 rounded-xl">
              <label className="text-xs font-bold text-slate-700 block">After Image</label>
              
              <div className="flex items-center gap-3">
                <label className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition duration-150 cursor-pointer select-none">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{isAfterUploading ? 'Uploading...' : 'Upload Image'}</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAfterUpload}
                    disabled={isAfterUploading}
                  />
                </label>
                
                <span className="text-[10px] text-slate-400 font-bold">OR</span>
                
                <input
                  type="text"
                  placeholder="Image URL"
                  value={afterUrl}
                  onChange={(e) => setAfterUrl(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-teal-500 bg-white"
                  required
                />
              </div>

              {afterUrl && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-14 w-20 rounded-lg overflow-hidden border border-slate-200 bg-white">
                    <img src={afterUrl} alt="After preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> Valid After image loaded
                  </span>
                </div>
              )}
            </div>

            {/* Display Order & Active status side-by-side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Display Order</label>
                <input
                  type="number"
                  min="0"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-teal-500 bg-white"
                  required
                />
              </div>

              <div className="flex flex-col justify-end pb-1.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-4 w-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-700">Active (Visible in UI)</span>
                </label>
              </div>
            </div>

            {/* Actions Row */}
            <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4 mt-5">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isBeforeUploading || isAfterUploading}
                className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 rounded-xl transition cursor-pointer shadow-sm shadow-teal-600/10 flex items-center gap-1.5"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={() => setItemToDelete(null)} />
          <div className="relative bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-sm w-full p-6 text-slate-800 z-10 animate-fade-in">
            <h3 className="text-base font-extrabold text-[#081C3A] mb-2">Delete Transformation</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to delete the transformation comparison for <strong className="text-slate-800">"{itemToDelete.treatment_name}"</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition cursor-pointer shadow-sm shadow-rose-600/10"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
