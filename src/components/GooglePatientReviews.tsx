import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Review {
  id: string;
  patient_name: string;
  patient_photo_url?: string;
  rating: number;
  review_text: string;
  review_date?: string;
  review_url?: string;
  display_order?: number;
  enabled?: boolean;
}

interface GooglePatientReviewsProps {
  heading?: string;
  reviews: Review[];
}

export function GooglePatientReviews({ heading, reviews }: GooglePatientReviewsProps) {
  const [apiReviews, setApiReviews] = useState<Review[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsFetching(true);
    fetch('/api/google-reviews')
      .then((res) => {
        if (!res.ok) throw new Error('API response not OK');
        return res.json();
      })
      .then((data) => {
        if (isMounted && data && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setApiReviews(data.reviews);
        }
      })
      .catch((err) => {
        console.log('[GooglePatientReviews] Using local CMS reviews fallback:', err);
      })
      .finally(() => {
        if (isMounted) {
          setIsFetching(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Use dynamically fetched reviews if available, otherwise fall back to CMS reviews
  const activeReviews = apiReviews.length > 0
    ? apiReviews
    : reviews
        .filter(r => r.enabled !== false && r.patient_name?.trim() !== '')
        .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(600);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const isResetting = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Detect visible cards based on breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset index when activeReviews length changes
  useEffect(() => {
    setCurrentIndex(0);
    setTransitionDuration(0);
  }, [activeReviews.length]);

  // Autoplay logic
  useEffect(() => {
    if (isReducedMotion || isHovered || activeReviews.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      if (isResetting.current) return;
      setTransitionDuration(600);
      setCurrentIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, isReducedMotion, activeReviews.length]);

  // Restore transition duration after a reset jump
  useEffect(() => {
    if (transitionDuration === 0) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionDuration(600);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [transitionDuration]);

  const handleNext = () => {
    if (activeReviews.length <= 1 || isResetting.current) return;
    setTransitionDuration(600);
    setCurrentIndex((prev) => {
      const nextVal = prev + 1;
      if (nextVal >= activeReviews.length) {
        isResetting.current = true;
      }
      return nextVal;
    });
  };

  const handlePrev = () => {
    if (activeReviews.length <= 1 || isResetting.current) return;
    setTransitionDuration(600);
    setCurrentIndex((prev) => {
      const prevVal = prev - 1;
      if (prevVal < 0) {
        isResetting.current = true;
      }
      return prevVal;
    });
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= activeReviews.length) {
      setTransitionDuration(0);
      setCurrentIndex(0);
      isResetting.current = false;
    } else if (currentIndex < 0) {
      setTransitionDuration(0);
      setCurrentIndex(activeReviews.length - 1);
      isResetting.current = false;
    } else {
      isResetting.current = false;
    }
  };

  // Touch event handlers for swipe gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchCurrentX.current = e.touches[0].clientX;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null && e.touches.length === 1) {
      touchCurrentX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchCurrentX.current !== null) {
      const diff = touchStartX.current - touchCurrentX.current;
      const swipeThreshold = 50; // minimum 50px swipe
      if (diff > swipeThreshold) {
        handleNext();
      } else if (diff < -swipeThreshold) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  const displayReviews = activeReviews.length > 0
    ? [
        ...activeReviews.slice(-Math.min(3, activeReviews.length)),
        ...activeReviews,
        ...activeReviews.slice(0, Math.min(3, activeReviews.length)),
      ]
    : [];

  let stepPercent = '33.3333%';
  let stepPx = 8;
  if (visibleCards === 2) {
    stepPercent = '50%';
    stepPx = 12;
  } else if (visibleCards === 1) {
    stepPercent = '100%';
    stepPx = 24;
  }

  const translateOffset = `calc(-1 * (${currentIndex + 3}) * (${stepPercent} + ${stepPx}px))`;

  const trackStyle: React.CSSProperties = {
    transform: `translate3d(${translateOffset}, 0, 0)`,
    transitionProperty: 'transform',
    transitionDuration: `${isReducedMotion ? 0 : transitionDuration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform',
  };

  return (
    <div className="space-y-6 sm:space-y-10 pt-6 sm:pt-14 border-t border-slate-200/60 animate-fade-in" id="google-patient-reviews-section">
      {/* Header and Slider Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-7xl mx-auto">
        <div className="space-y-3 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
            <Star className="h-3.5 w-3.5 text-[#0D9488] fill-[#0D9488] shrink-0" />
            Google Reviews
          </span>
          {heading && heading.trim() !== '' && (
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight">
              {heading}
            </h2>
          )}
          <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto sm:mx-0 mt-3" />
        </div>

        {activeReviews.length > 1 && (
          <div className="flex items-center justify-center gap-2.5">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-slate-200/80 hover:border-[#0D9488] bg-white text-slate-700 hover:text-[#0D9488] hover:bg-teal-50/30 shadow-xs transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
              aria-label="Previous Review"
              title="Previous Review"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-slate-200/80 hover:border-[#0D9488] bg-white text-slate-700 hover:text-[#0D9488] hover:bg-teal-50/30 shadow-xs transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
              aria-label="Next Review"
              title="Next Review"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>
        )}
      </div>

      {/* Cards Sliders: Desktop (3), Tablet (2), Mobile (1) */}
      {activeReviews.length > 0 && (
        <div 
          className="relative max-w-7xl mx-auto overflow-hidden px-1 py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="flex gap-6 items-stretch"
            style={trackStyle}
            onTransitionEnd={handleTransitionEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {displayReviews.map((review, idx) => (
              <div
                key={`${review.id || idx}-cloned-${idx}`}
                className="review-card-item shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-8 h-full flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300">
                  <div className="space-y-4">
                    {/* Rating & Date */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4.5 w-4.5 ${
                              i < (review.rating || 5)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-200 fill-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      {review.review_date && review.review_date.trim() !== '' && (
                        <span className="text-[11px] text-slate-400 font-extrabold tracking-tight">
                          {review.review_date}
                        </span>
                      )}
                    </div>

                    {/* Review Text */}
                    <p className="text-slate-600 text-sm leading-relaxed font-medium whitespace-pre-line">
                      "{review.review_text}"
                    </p>
                  </div>

                  {/* Patient Profile & View Link */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 gap-3">
                    <div className="flex items-center gap-3">
                      {review.patient_photo_url && review.patient_photo_url.trim() !== '' ? (
                        <img
                          src={review.patient_photo_url}
                          alt={review.patient_name}
                          className="h-10 w-10 rounded-full object-cover border border-slate-200 shadow-3xs shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-[#0D9488]/5 border border-[#0D9488]/15 text-[#0D9488] font-black flex items-center justify-center text-xs shrink-0 select-none">
                          {review.patient_name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="text-[#081C3A] font-black text-sm leading-tight truncate">
                          {review.patient_name}
                        </h4>
                        <span className="text-[10px] text-[#0D9488] font-bold block mt-0.5 uppercase tracking-wide">Google Reviewer</span>
                      </div>
                    </div>

                    {review.review_url && review.review_url.trim() !== '' && (
                      <a
                        href={review.review_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center shrink-0 gap-1 text-[11px] font-black text-[#0D9488] hover:text-[#0F766E] px-3 py-1.5 rounded-xl bg-teal-50/50 hover:bg-teal-50 transition duration-200 border border-teal-100/50 shadow-3xs"
                      >
                        <span>View on Google</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
