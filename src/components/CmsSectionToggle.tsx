import React from 'react';

interface CmsSectionToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CmsSectionToggle({ checked, onChange }: CmsSectionToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6 animate-fade-in" id="cms-section-toggle">
      <div className="space-y-0.5">
        <span className="text-xs font-bold text-slate-800 block">Enable / Disable Section</span>
        <span className="text-[9px] text-slate-400">Toggle this section visible/hidden on frontend</span>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
      </label>
    </div>
  );
}
