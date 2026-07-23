import React, { useState, useRef, useEffect } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  caption?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  caption
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(600);
  const [sliderPosition, setSliderPosition] = useState(50); // Percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    handleMove(clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchend', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition(prev => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition(prev => Math.min(100, prev + 5));
    }
  };

  return (
    <div className="space-y-3 w-full text-left" id="before-after-slider-container">
      <div
        ref={containerRef}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => {
          if (e.touches.length > 0) {
            handleStart(e.touches[0].clientX);
          }
        }}
        onTouchMove={handleTouchMove}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Before and after treatment slider${caption ? `: ${caption}` : ''}`}
        className="relative aspect-[4/3] w-full max-h-[340px] overflow-hidden rounded-2xl border border-slate-200/80 shadow-xs select-none cursor-ew-resize group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/60 focus:ring-offset-2 transition-shadow"
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt="After Treatment Result"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Before Image (Overlay Container) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden select-none pointer-events-none border-r border-white/40"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Before Treatment Condition"
            style={{
              width: containerWidth,
              height: '100%',
              objectFit: 'cover',
              maxWidth: 'none'
            }}
            className="absolute inset-y-0 left-0 object-cover select-none pointer-events-none"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Labels & Badges */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider block bg-rose-600/90 border border-rose-400 px-3 py-1 rounded-xl shadow-md backdrop-blur-xs">
            Before
          </span>
        </div>

        <div className="absolute top-3 right-3 z-20 pointer-events-none">
          <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider block bg-emerald-600/90 border border-emerald-400 px-3 py-1 rounded-xl shadow-md backdrop-blur-xs">
            After
          </span>
        </div>

        {/* Vertical Divider Drag Bar */}
        <div
          className="absolute top-0 bottom-0 z-30 w-[3px] bg-white cursor-ew-resize flex items-center justify-center transition-all duration-75 shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Centered Circular Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white border-2 border-[#0D9488] text-[#0D9488] shadow-xl flex items-center justify-center cursor-ew-resize z-30 group-hover:scale-110 group-active:scale-95 transition-transform duration-200">
            <ChevronsLeftRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>
      </div>

      {caption && (
        <p className="text-xs sm:text-sm font-bold text-[#081C3A] px-1 leading-relaxed">
          {caption}
        </p>
      )}
    </div>
  );
};

export default BeforeAfterSlider;
