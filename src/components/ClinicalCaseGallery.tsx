import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Folder,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';

export interface GalleryItem {
  id?: string;
  image_url: string;
  category?: string;
  display_order?: number;
  title?: string;
  caption?: string;
}

interface ClinicalCaseGalleryProps {
  heading?: string;
  description?: string;
  items: GalleryItem[];
  singleGallery?: boolean;
}

const PREFERRED_CATEGORY_ORDER = [
  'Single Case',
  'Single Implant',
  'Multiple Case',
  'Double Implant',
  'Quadrant',
  'FMR Case',
  'Full Mouth Rehabilitation (FMR)',
];

function normalizeCategory(cat?: string): string {
  if (!cat || cat.trim() === '') return 'Single Case';
  const trimmed = cat.trim();
  const lower = trimmed.toLowerCase();

  if (lower === 'single case' || lower === 'single implant') return trimmed;
  if (lower === 'multiple case' || lower === 'double implant' || lower === 'quadrant') return trimmed;
  if (lower === 'fmr case' || lower === 'full mouth rehabilitation (fmr)') return trimmed;

  if (lower.includes('single')) return 'Single Case';
  if (lower.includes('multiple') || lower.includes('double') || lower.includes('quadrant')) return 'Multiple Case';
  if (lower.includes('fmr') || lower.includes('full mouth')) return 'FMR Case';

  return trimmed;
}

// Custom hook to detect mobile viewport reactively
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(max-width: 768px)');
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);
  return isMobile;
};

// Component for rendering individual slides/cards
interface SlideCardProps {
  item: GalleryItem;
  category: string;
  index: number;
  onClick: () => void;
}

const SlideCard: React.FC<SlideCardProps> = ({ item, category, index, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-auto group/img cursor-zoom-in"
      onClick={onClick}
    >
      <div className="relative w-full flex items-center justify-center rounded-xl">
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-100/60 animate-pulse flex items-center justify-center rounded-xl">
            <div className="h-6 w-6 rounded-full border-2 border-slate-300/40 border-t-slate-500 animate-spin" />
          </div>
        )}
        <img
          src={item.image_url}
          alt={item.caption || item.title || `${category} Case ${index + 1}`}
          onLoad={() => setIsLoaded(true)}
          draggable={false}
          className="max-h-[180px] sm:max-h-[240px] md:max-h-[280px] max-w-full object-contain mx-auto rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.24)] transition-all duration-300 group-hover/img:scale-[1.015] select-none opacity-100 scale-100"
          referrerPolicy="no-referrer"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="absolute top-2.5 right-2.5 bg-white/90 hover:bg-[#0D9488] text-slate-700 hover:text-white p-2 rounded-full border border-slate-200 shadow-xs transition-all z-10 opacity-90 sm:opacity-0 group-hover/img:opacity-100"
          title="Expand Image"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

// Premium full screen Lightbox Modal
interface PremiumLightboxProps {
  items: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
}

const PremiumLightbox: React.FC<PremiumLightboxProps> = ({ items, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomScale, setZoomScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  
  // Touch gestures (swipe and pinch zoom)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartDist, setTouchStartDist] = useState<number | null>(null);

  const activeItem = items[currentIndex];

  const handlePrev = () => {
    if (items.length <= 1) return;
    setZoomScale(1);
    setTranslateX(0);
    setTranslateY(0);
    setIsLoading(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    if (items.length <= 1) return;
    setZoomScale(1);
    setTranslateX(0);
    setTranslateY(0);
    setIsLoading(true);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  // Keyboard navigation & escape triggers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length]);

  // Image preloading for smooth instantaneous switching
  useEffect(() => {
    if (items.length > 1) {
      const prevIdx = (currentIndex - 1 + items.length) % items.length;
      const nextIdx = (currentIndex + 1) % items.length;
      const prevImg = items[prevIdx].image_url;
      const nextImg = items[nextIdx].image_url;

      const img1 = new Image();
      img1.src = prevImg;
      const img2 = new Image();
      img2.src = nextImg;
    }
  }, [currentIndex, items]);

  // Zoom with scrollwheel / trackpad
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomStep = 0.25;
    const delta = e.deltaY < 0 ? 1 : -1;
    setZoomScale((prev) => {
      const newScale = Math.min(4, Math.max(1, prev + delta * zoomStep));
      if (newScale === 1) {
        setTranslateX(0);
        setTranslateY(0);
      }
      return newScale;
    });
  };

  // Double Click / Double Tap zoom
  const handleDoubleClick = () => {
    if (zoomScale > 1) {
      setZoomScale(1);
      setTranslateX(0);
      setTranslateY(0);
    } else {
      setZoomScale(2.5);
    }
  };

  // Drag Panning for zoomed image (and swipe for sliding image when zoom === 1)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - translateX, y: e.clientY - translateY });
    } else {
      setTouchStartX(e.clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (zoomScale > 1 && isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      const maxOffset = (zoomScale - 1) * 400;
      setTranslateX(Math.min(maxOffset, Math.max(-maxOffset, newX)));
      setTranslateY(Math.min(maxOffset, Math.max(-maxOffset, newY)));
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (zoomScale > 1) {
      setIsDragging(false);
    } else if (touchStartX !== null) {
      const diff = touchStartX - e.clientX;
      if (diff > 50) {
        handleNext();
      } else if (diff < -50) {
        handlePrev();
      }
      setTouchStartX(null);
    }
  };

  // Pinch zoom distance utilities
  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setTouchStartDist(getTouchDistance(e.touches));
    } else {
      setTouchStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDist !== null) {
      const dist = getTouchDistance(e.touches);
      const ratio = dist / touchStartDist;
      setZoomScale((prev) => {
        const newScale = Math.min(4, Math.max(1, prev * ratio));
        if (newScale === 1) {
          setTranslateX(0);
          setTranslateY(0);
        }
        return newScale;
      });
      setTouchStartDist(dist);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchStartDist(null);
    if (zoomScale === 1 && touchStartX !== null && e.changedTouches.length > 0) {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (diff > 50) {
        handleNext();
      } else if (diff < -50) {
        handlePrev();
      }
      setTouchStartX(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/96 backdrop-blur-xl flex flex-col justify-between select-none p-4"
      onClick={onClose}
    >
      {/* Absolute backdrop click listener */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      {/* Header controls (Images count indicator, double tap label and window close) */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto py-2">
        <div className="text-white font-mono text-xs tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/5 shadow-xs">
          IMAGE {currentIndex + 1} OF {items.length}
        </div>

        {activeItem && (activeItem.caption || activeItem.title) && (
          <div className="hidden md:block text-slate-300 font-sans text-sm font-semibold max-w-md truncate px-4">
            {activeItem.caption || activeItem.title}
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Zoom controls panel */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoomScale((p) => Math.min(4, p + 0.5));
            }}
            className="h-10 w-10 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white border border-white/10 flex items-center justify-center transition-all duration-200"
            title="Zoom In"
          >
            <ZoomIn className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoomScale((p) => {
                const ns = Math.max(1, p - 0.5);
                if (ns === 1) {
                  setTranslateX(0);
                  setTranslateY(0);
                }
                return ns;
              });
            }}
            className="h-10 w-10 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white border border-white/10 flex items-center justify-center transition-all duration-200"
            title="Zoom Out"
          >
            <ZoomOut className="h-4.5 w-4.5" />
          </button>
          {zoomScale > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setZoomScale(1);
                setTranslateX(0);
                setTranslateY(0);
              }}
              className="h-10 w-10 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white border border-white/10 flex items-center justify-center transition-all duration-200"
              title="Reset Zoom"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="h-10 w-10 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/15 flex items-center justify-center transition-all duration-200 font-bold text-lg"
            title="Close Lightbox"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Full screen viewport container with navigation arrows */}
      <div className="relative z-0 flex-1 flex items-center justify-center w-full h-full max-h-[70vh] my-auto">
        {items.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 z-20 h-12 w-12 rounded-full bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-md text-white border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            title="Previous Image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Visual Canvas Area */}
        <div
          className="relative max-h-full max-w-full overflow-hidden flex items-center justify-center"
          onWheel={handleWheel}
          onDoubleClick={handleDoubleClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs z-10">
              <div className="h-12 w-12 rounded-full border-4 border-teal-500/20 border-t-teal-500 animate-spin" />
            </div>
          )}

          {activeItem && (
            <img
              src={activeItem.image_url}
              alt={activeItem.caption || activeItem.title || 'Clinical case'}
              onLoad={() => setIsLoading(false)}
              style={{
                transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${zoomScale})`,
                transition: isDragging ? 'none' : 'transform 250ms cubic-bezier(0.1, 0.76, 0.55, 0.94)',
                cursor: zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
              }}
              draggable={false}
              className="max-h-[75vh] max-w-full md:max-w-4xl object-contain rounded-xl shadow-2xl transition-all duration-300 border border-slate-800"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {items.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 z-20 h-12 w-12 rounded-full bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-md text-white border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            title="Next Image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Footer detailing thumbnails strip and captions */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-2 bg-slate-950/40 p-3 rounded-2xl backdrop-blur-md border border-white/5">
        {activeItem && (activeItem.caption || activeItem.title) && (
          <p className="block md:hidden text-center text-slate-300 text-xs sm:text-sm px-4 truncate max-w-full">
            {activeItem.caption || activeItem.title}
          </p>
        )}

        {/* Thumbnail panels strip with scroll */}
        {items.length > 1 && (
          <div className="flex items-center gap-2.5 overflow-x-auto py-1 px-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent max-w-full justify-start sm:justify-center">
            {items.map((item, idx) => (
              <button
                key={item.id || idx}
                onClick={(e) => {
                  e.stopPropagation();
                  if (idx !== currentIndex) {
                    setZoomScale(1);
                    setTranslateX(0);
                    setTranslateY(0);
                    setIsLoading(true);
                    setCurrentIndex(idx);
                  }
                }}
                className={`relative h-12 w-16 sm:h-14 sm:w-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  idx === currentIndex
                    ? 'border-teal-400 ring-2 ring-teal-400/30 scale-105 opacity-100'
                    : 'border-slate-800 opacity-50 hover:opacity-100'
                }`}
              >
                <img src={item.image_url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Component for Accordion Category Case Carousels
interface CategorySliderProps {
  cat: string;
  categoryItems: GalleryItem[];
  isMobile: boolean;
  onImageClick: (item: GalleryItem, index: number, list: GalleryItem[]) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  cat,
  categoryItems,
  isMobile,
  onImageClick,
}) => {
  const totalItems = categoryItems.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Swipe detection coordinates
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handlePrev = () => {
    if (totalItems <= 1 || isTransitioning) return;
    setDirection('right');
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setIsTransitioning(true);
  };

  const handleNext = () => {
    if (totalItems <= 1 || isTransitioning) return;
    setDirection('left');
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % totalItems);
    setIsTransitioning(true);
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setDirection(null);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Touch Swipe Gesture Events
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Preloading image links in the background asynchronously
  useEffect(() => {
    if (totalItems > 1) {
      const prevImg = categoryItems[(currentIndex - 1 + totalItems) % totalItems].image_url;
      const nextImg = categoryItems[(currentIndex + 1) % totalItems].image_url;

      const img1 = new Image();
      img1.src = prevImg;
      const img2 = new Image();
      img2.src = nextImg;
    }
  }, [currentIndex, categoryItems, totalItems]);

  const getVisibleItemsForIndex = (idx: number) => {
    const list: { item: GalleryItem; actualIndex: number }[] = [];
    if (totalItems > 0) {
      const firstIdx = ((idx % totalItems) + totalItems) % totalItems;
      list.push({ item: categoryItems[firstIdx], actualIndex: firstIdx });
      if (!isMobile && totalItems > 1) {
        const secondIdx = (firstIdx + 1) % totalItems;
        list.push({ item: categoryItems[secondIdx], actualIndex: secondIdx });
      }
    }
    return list;
  };

  const currentVisible = getVisibleItemsForIndex(currentIndex);
  const prevVisible = getVisibleItemsForIndex(prevIndex);

  const gridLayout = currentVisible.length === 1 || isMobile
    ? 'grid-cols-1 max-w-xl mx-auto'
    : 'grid-cols-1 md:grid-cols-2';

  return (
    <div
      className="relative bg-white sm:bg-slate-50/80 rounded-2xl p-3 sm:p-5 flex flex-col justify-center border border-slate-200/90 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Case count info flag tag */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-white/95 backdrop-blur-md text-[#081C3A] text-xs font-extrabold px-3 py-1.5 rounded-full border border-slate-200/90 flex items-center gap-2 shadow-xs select-none">
        <span className="h-2 w-2 rounded-full bg-[#0D9488] animate-pulse" />
        {!isMobile && totalItems > 1
          ? `Cases ${currentIndex + 1} & ${((currentIndex + 1) % totalItems) + 1} of ${totalItems}`
          : `Case ${currentIndex + 1} of ${totalItems}`}
      </div>

      {/* Slide frame with stable vertical min height */}
      <div className="relative overflow-hidden w-full min-h-[240px] sm:min-h-[300px] md:min-h-[340px] pt-8 sm:pt-9 flex items-center justify-center">
        {isTransitioning && direction ? (
          <>
            {/* Outgoing sliding element */}
            <div
              className={`absolute inset-0 grid gap-3 sm:gap-5 ${gridLayout} ${
                direction === 'left' ? 'animate-slide-out-left' : 'animate-slide-out-right'
              }`}
            >
              {prevVisible.map(({ item, actualIndex }) => (
                <SlideCard
                  key={`prev-${actualIndex}`}
                  item={item}
                  category={cat}
                  index={actualIndex}
                  onClick={() => onImageClick(item, actualIndex, categoryItems)}
                />
              ))}
            </div>

             {/* Incoming sliding element */}
            <div
              className={`absolute inset-0 grid gap-3 sm:gap-5 ${gridLayout} ${
                direction === 'left' ? 'animate-slide-in-right' : 'animate-slide-in-left'
              }`}
            >
              {currentVisible.map(({ item, actualIndex }) => (
                <SlideCard
                  key={`slide-${actualIndex}`}
                  item={item}
                  category={cat}
                  index={actualIndex}
                  onClick={() => onImageClick(item, actualIndex, categoryItems)}
                />
              ))}
            </div>
          </>
        ) : (
          /* Static visible image items display */
          <div className={`relative w-full grid gap-3 sm:gap-5 ${gridLayout}`}>
            {currentVisible.map(({ item, actualIndex }) => (
              <SlideCard
                key={`slide-${actualIndex}`}
                item={item}
                category={cat}
                index={actualIndex}
                onClick={() => onImageClick(item, actualIndex, categoryItems)}
              />
            ))}
          </div>
        )}

        {/* Carousel slide actions navigation buttons (Semi transparent glass style overlay) */}
        {totalItems > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              disabled={isTransitioning}
              className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-md text-white border border-white/10 flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              title="Previous Case"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              disabled={isTransitioning}
              className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-md text-white border border-white/10 flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              title="Next Case"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </>
        )}
      </div>

      {/* Horizontal thumbnail indicators list */}
      {totalItems > 1 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-1 mt-2.5">
          {categoryItems.map((item, idx) => {
            const isSelected =
              idx === currentIndex || (!isMobile && totalItems > 1 && idx === (currentIndex + 1) % totalItems);
            return (
              <button
                key={item.id || idx}
                type="button"
                onClick={() => {
                  if (idx !== currentIndex && !isTransitioning) {
                    setDirection(idx > currentIndex ? 'left' : 'right');
                    setPrevIndex(currentIndex);
                    setCurrentIndex(idx);
                    setIsTransitioning(true);
                  }
                }}
                className={`relative h-12 w-16 sm:h-14 sm:w-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-[#0D9488] ring-2 ring-teal-500/30 scale-105 opacity-100 shadow-xs'
                    : 'border-slate-200/90 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={item.image_url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const ClinicalCaseGallery: React.FC<ClinicalCaseGalleryProps> = ({
  heading = 'Clinical Case Gallery',
  description,
  items,
  singleGallery = false,
}) => {
  const isMobile = useIsMobile();

  // Full screen interactive Lightbox trigger hook states
  const [lightboxState, setLightboxState] = useState<{ items: GalleryItem[]; index: number } | null>(null);

  // Group images into categories
  const groupedItems = React.useMemo(() => {
    const map: Record<string, GalleryItem[]> = {};

    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (!item || !item.image_url || item.image_url.trim() === '') return;
        const norm = normalizeCategory(item.category);
        if (!map[norm]) {
          map[norm] = [];
        }
        map[norm].push(item);
      });
    }

    Object.keys(map).forEach((cat) => {
      map[cat].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    });

    return map;
  }, [items]);

  const activeCategories = React.useMemo(() => {
    const keys = Object.keys(groupedItems).filter((cat) => groupedItems[cat] && groupedItems[cat].length > 0);
    return keys.sort((a, b) => {
      const idxA = PREFERRED_CATEGORY_ORDER.indexOf(a);
      const idxB = PREFERRED_CATEGORY_ORDER.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [groupedItems]);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    PREFERRED_CATEGORY_ORDER.forEach((cat) => {
      initial[cat] = true;
    });
    return initial;
  });

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const validItems = Array.isArray(items)
    ? items.filter((item) => item && item.image_url && item.image_url.trim() !== '')
    : [];

  const handleOpenLightbox = (list: GalleryItem[], index: number) => {
    setLightboxState({ items: list, index });
  };

  return (
    <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60" id="dental-implants-clinical-case-gallery">
      {/* Hardware Accelerated Sliding Animation Keyframe CSS Style Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideOutLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        @keyframes slideOutRight {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(100%, 0, 0); }
        }
        @keyframes slideInLeft {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes slideInRight {
          0% { transform: translate3d(100%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-slide-out-left {
          animation: slideOutLeft 350ms forwards ease-in-out;
        }
        .animate-slide-out-right {
          animation: slideOutRight 350ms forwards ease-in-out;
        }
        .animate-slide-in-left {
          animation: slideInLeft 350ms forwards ease-in-out;
        }
        .animate-slide-in-right {
          animation: slideInRight 350ms forwards ease-in-out;
        }
      ` }} />

      {/* Section Header Title Section */}
      <div className="space-y-3 max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
          <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0" />
          Clinical Cases
        </span>
        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
          {heading}
        </h2>
        {description && (
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-center font-medium">
            {description}
          </p>
        )}
        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
      </div>

      {singleGallery ? (
        /* Flat Grid View display layout (Used in Single sitting treatments etc) */
        validItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {validItems.map((item, idx) => (
              <SlideCard
                key={item.id || idx}
                item={item}
                category="Clinical Case"
                index={idx}
                onClick={() => handleOpenLightbox(validItems, idx)}
              />
            ))}
          </div>
        )
      ) : (
        /* Multi accordion groupings categories sliders view */
        <div className="space-y-6 max-w-5xl mx-auto">
          {activeCategories.map((cat) => {
            const categoryItems = groupedItems[cat] || [];
            const isOpen = openCategories[cat] !== false;

            return (
              <div
                key={cat}
                className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden transition-all duration-300"
              >
                {/* Accordion trigger button header control bar */}
                <button
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  aria-expanded={isOpen}
                  className="w-full px-5 sm:px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 transition-colors flex items-center justify-between gap-4 text-left border-b border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#081C3A] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Folder className="h-4.5 w-4.5 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-sans font-extrabold text-base sm:text-lg text-[#081C3A] tracking-tight">
                        {cat}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {categoryItems.length} {categoryItems.length === 1 ? 'Clinical Case' : 'Clinical Cases'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-[#0D9488] bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                      {categoryItems.length} {categoryItems.length === 1 ? 'Photo' : 'Photos'}
                    </span>
                    <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600">
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Categories sub carousel tracks wrapper container */}
                {isOpen && categoryItems.length > 0 && (
                  <div className="p-3 sm:p-5 space-y-4 bg-slate-50/50">
                    <CategorySlider
                      cat={cat}
                      categoryItems={categoryItems}
                      isMobile={isMobile}
                      onImageClick={(item, actualIndex, list) => handleOpenLightbox(list, actualIndex)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Premium Lightbox Overlay portal frame when image is expanded */}
      {lightboxState && (
        <PremiumLightbox
          items={lightboxState.items}
          initialIndex={lightboxState.index}
          onClose={() => setLightboxState(null)}
        />
      )}
    </div>
  );
};
