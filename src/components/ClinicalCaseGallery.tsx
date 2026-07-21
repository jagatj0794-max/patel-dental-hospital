import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Maximize2, Sparkles, Folder } from 'lucide-react';

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
}

const CATEGORY_ORDER = [
  'Single Implant',
  'Double Implant',
  'Quadrant',
  'Full Mouth Rehabilitation (FMR)',
];

function normalizeCategory(cat?: string): string {
  if (!cat) return 'Single Implant';
  const lower = cat.toLowerCase().trim();
  if (lower.includes('single')) return 'Single Implant';
  if (lower.includes('double')) return 'Double Implant';
  if (lower.includes('quadrant')) return 'Quadrant';
  if (lower.includes('fmr') || lower.includes('full mouth') || lower.includes('full_mouth')) {
    return 'Full Mouth Rehabilitation (FMR)';
  }
  return cat;
}

export const ClinicalCaseGallery: React.FC<ClinicalCaseGalleryProps> = ({
  heading = 'Clinical Case Gallery',
  description,
  items,
}) => {
  // Track window size for responsive 2-image desktop/tablet vs 1-image mobile layout
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Group items by category
  const groupedItems = React.useMemo(() => {
    const map: Record<string, GalleryItem[]> = {
      'Single Implant': [],
      'Double Implant': [],
      'Quadrant': [],
      'Full Mouth Rehabilitation (FMR)': [],
    };

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

    // Sort items inside each category by display_order
    Object.keys(map).forEach((cat) => {
      map[cat].sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
    });

    return map;
  }, [items]);

  // Active categories with at least 1 image
  const activeCategories = React.useMemo(() => {
    return CATEGORY_ORDER.filter((cat) => groupedItems[cat] && groupedItems[cat].length > 0);
  }, [groupedItems]);

  // Accordion state: open state for each category independently
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    CATEGORY_ORDER.forEach((cat) => {
      initial[cat] = true; // default all active accordions to open
    });
    return initial;
  });

  // Slider state: active start item index for each category independently
  const [slideIndices, setSlideIndices] = useState<Record<string, number>>({});

  // Lightbox state for zoomed view
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Mouse & Touch drag coordinate state for sliding
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  if (activeCategories.length === 0) {
    return null; // Hide entire section if no categories have images
  }

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const handlePrev = (cat: string, totalItems: number) => {
    if (totalItems <= 1) return;
    setSlideIndices((prev) => {
      const curr = prev[cat] || 0;
      return { ...prev, [cat]: (curr - 1 + totalItems) % totalItems };
    });
  };

  const handleNext = (cat: string, totalItems: number) => {
    if (totalItems <= 1) return;
    setSlideIndices((prev) => {
      const curr = prev[cat] || 0;
      return { ...prev, [cat]: (curr + 1) % totalItems };
    });
  };

  const handleDragStart = (clientX: number) => {
    setDragStartX(clientX);
  };

  const handleDragEnd = (clientX: number, cat: string, totalItems: number) => {
    if (dragStartX === null) return;
    const diff = dragStartX - clientX;
    if (diff > 40) {
      // Swiped/dragged left -> next
      handleNext(cat, totalItems);
    } else if (diff < -40) {
      // Swiped/dragged right -> prev
      handlePrev(cat, totalItems);
    }
    setDragStartX(null);
  };

  return (
    <div className="space-y-10 pt-10 border-t border-slate-100" id="dental-implants-clinical-case-gallery">
      {/* Section Header */}
      <div className="space-y-3 max-w-3xl mx-auto text-center">
        <span className="text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#0D9488]" />
          Clinical Cases
        </span>
        <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#081C3A] tracking-tight leading-tight text-center">
          {heading}
        </h2>
        {description && (
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed text-center font-medium">
            {description}
          </p>
        )}
        <div className="h-0.5 w-12 bg-[#0D9488] rounded-full mx-auto mt-4" />
      </div>

      {/* Categories Accordion Group */}
      <div className="space-y-6 max-w-5xl mx-auto">
        {activeCategories.map((cat) => {
          const categoryItems = groupedItems[cat] || [];
          const isOpen = openCategories[cat] !== false; // default true
          const totalItems = categoryItems.length;

          const rawIdx = slideIndices[cat] || 0;
          const firstIdx = totalItems > 0 ? ((rawIdx % totalItems) + totalItems) % totalItems : 0;
          const secondIdx = totalItems > 1 ? (firstIdx + 1) % totalItems : firstIdx;

          const visibleItems: { item: GalleryItem; actualIndex: number }[] = [];
          if (totalItems > 0) {
            visibleItems.push({ item: categoryItems[firstIdx], actualIndex: firstIdx });
            if (!isMobile && totalItems > 1) {
              visibleItems.push({ item: categoryItems[secondIdx], actualIndex: secondIdx });
            }
          }

          return (
            <div
              key={cat}
              className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden transition-all duration-300"
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => toggleCategory(cat)}
                className="w-full px-6 py-4 bg-slate-50/80 hover:bg-slate-100/80 transition-colors flex items-center justify-between gap-4 text-left border-b border-slate-100"
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

              {/* Accordion Content (Continuous Overlapping Carousel) */}
              {isOpen && categoryItems.length > 0 && (
                <div className="p-3 sm:p-5 space-y-4 bg-slate-50/50">
                  {/* Slider Frame */}
                  <div
                    className="relative bg-white sm:bg-slate-50/80 rounded-2xl p-3 sm:p-5 flex flex-col justify-center min-h-[320px] sm:min-h-[400px] overflow-hidden group border border-slate-200/90 shadow-xs select-none"
                    onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                    onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX, cat, totalItems)}
                    onMouseDown={(e) => handleDragStart(e.clientX)}
                    onMouseUp={(e) => handleDragEnd(e.clientX, cat, totalItems)}
                  >
                    {/* Case Indicator Badge */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-white/95 backdrop-blur-md text-[#081C3A] text-xs font-extrabold px-3 py-1.5 rounded-full border border-slate-200/90 flex items-center gap-2 shadow-xs">
                      <span className="h-2 w-2 rounded-full bg-[#0D9488] animate-pulse" />
                      {!isMobile && totalItems > 1
                        ? `Cases ${firstIdx + 1} & ${secondIdx + 1} of ${totalItems}`
                        : `Case ${firstIdx + 1} of ${totalItems}`}
                    </div>

                    {/* Images Container (2 images on Desktop/Tablet moving 1 at a time, 1 on Mobile) */}
                    <div
                      className={`w-full grid gap-3 sm:gap-5 my-auto pt-10 sm:pt-11 pb-1 ${
                        visibleItems.length === 1 && !isMobile
                          ? 'grid-cols-1 max-w-xl mx-auto'
                          : 'grid-cols-1 md:grid-cols-2'
                      }`}
                    >
                      {visibleItems.map(({ item, actualIndex }) => (
                        <div
                          key={item.id || `${item.image_url}-${actualIndex}`}
                          className="relative bg-white rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-center h-[300px] sm:h-[360px] md:h-[400px] border border-slate-200/90 shadow-xs hover:shadow-md group/img transition-all duration-300 hover:border-teal-400/60"
                        >
                          <img
                            src={item.image_url}
                            alt={`${cat} Case ${actualIndex + 1}`}
                            draggable={false}
                            className="max-h-full max-w-full w-auto h-auto object-contain mx-auto rounded-xl shadow-2xs cursor-zoom-in transition-transform duration-300 group-hover/img:scale-[1.015] select-none"
                            onClick={() => setLightboxImage(item.image_url)}
                            referrerPolicy="no-referrer"
                          />
                          <button
                            type="button"
                            onClick={() => setLightboxImage(item.image_url)}
                            className="absolute top-3 right-3 bg-white/90 hover:bg-[#0D9488] text-slate-700 hover:text-white p-2 rounded-full border border-slate-200 shadow-xs transition-all z-10 opacity-90 sm:opacity-0 group-hover/img:opacity-100"
                            title="Expand Image"
                          >
                            <Maximize2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Navigation Arrows (if > 1 item) */}
                    {totalItems > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrev(cat, totalItems);
                          }}
                          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/95 hover:bg-[#0D9488] text-slate-800 hover:text-white flex items-center justify-center border border-slate-200/90 transition-all shadow-md hover:shadow-lg active:scale-95"
                          title="Previous Case"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext(cat, totalItems);
                          }}
                          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/95 hover:bg-[#0D9488] text-slate-800 hover:text-white flex items-center justify-center border border-slate-200/90 transition-all shadow-md hover:shadow-lg active:scale-95"
                          title="Next Case"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails Strip (if > 1 item) */}
                  {totalItems > 1 && (
                    <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-1">
                      {categoryItems.map((item, idx) => {
                        const isSelected =
                          idx === firstIdx || (!isMobile && totalItems > 1 && idx === secondIdx);
                        return (
                          <button
                            key={item.id || idx}
                            type="button"
                            onClick={() => {
                              setSlideIndices((prev) => ({
                                ...prev,
                                [cat]: idx,
                              }));
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
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/92 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center">
            <img
              src={lightboxImage}
              alt="Clinical Case Fullscreen"
              className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl border border-slate-800"
              referrerPolicy="no-referrer"
            />
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-2 right-2 bg-slate-800/80 hover:bg-slate-700 text-white font-black h-10 w-10 rounded-full flex items-center justify-center text-xl border border-slate-600 transition-colors"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

