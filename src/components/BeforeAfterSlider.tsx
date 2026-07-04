/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImg: string;
  afterImg: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatioClassName?: string;
}

export default function BeforeAfterSlider({
  beforeImg,
  afterImg,
  beforeLabel = 'Before Treatment',
  afterLabel = 'Completed After',
  className = '',
  aspectRatioClassName = 'aspect-[4/3]',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full rounded-2xl select-none group/slider border border-gray-150 ${aspectRatioClassName} ${className}`}
    >
      {/* Background Image: AFTER */}
      <img
        src={afterImg}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-3 right-3 bg-emerald-600/90 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider z-10 pointer-events-none">
        {afterLabel}
      </div>

      {/* Foreground Image Container with clip-path: BEFORE */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <img
          src={beforeImg}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 bg-rose-600/90 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider z-10 pointer-events-none">
          {beforeLabel}
        </div>
      </div>

      {/* Drag Divider Line and Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Grab Handle circle with premium arrows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white text-slate-800 shadow-xl border-2 border-brand-cyan/80 flex items-center justify-center cursor-ew-resize hover:scale-110 active:scale-110 duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3.5"
            stroke="currentColor"
            className="w-4 h-4 text-brand-cyan animate-pulse"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" className="rotate-90 origin-center" />
          </svg>
        </div>
      </div>

      {/* Touch Instructions indicator overlay */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/75 backdrop-blur-xs text-[10px] text-white/90 font-medium px-3 py-1 rounded-full flex items-center space-x-1.5 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 pointer-events-none">
        <Eye className="h-3 w-3 text-brand-cyan" />
        <span>Drag center handle to compare</span>
      </div>
    </div>
  );
}
