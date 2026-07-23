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
  // Filter out disabled or unnamed reviews, then sort by display_order (ascending)
  const activeReviews = reviews
    .filter(r => r.enabled !== false && r.patient_name?.trim() !== '')
    .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));

  if (activeReviews.length === 0) {
    return (
      <div className="pt-6 sm:pt-14 border-t border-slate-200/60 animate-fade-in" id="google-patient-reviews">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-6">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60">
              <Star className="h-3.5 w-3.5 text-[#0D9488] shrink-0 fill-[#0D9488]" />
              Verified Patient Feedback
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight">
              {heading || 'Google Patient Reviews'}
            </h2>
            <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
          </div>
          <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center text-slate-500 text-sm max-w-4xl mx-auto shadow-2xs">
            Google patient reviews will be displayed here once added in CMS.
          </div>
        </div>
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isFirstRender = useRef(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % activeReviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + activeReviews.length) % activeReviews.length);
  };

  // Synchronize horizontal slider container scroll on slide change
  const scrollToReview = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.querySelectorAll('.review-card-item');
      if (cards[index]) {
        const cardEl = cards[index] as HTMLElement;
        container.scrollTo({
          left: cardEl.offsetLeft - container.offsetLeft,
          behavior: 'smooth',
        });
      }
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToReview(currentIndex);
  }, [currentIndex]);

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
              onClick={prevSlide}
              className="p-3 rounded-full border border-slate-200/80 hover:border-[#0D9488] bg-white text-slate-700 hover:text-[#0D9488] hover:bg-teal-50/30 shadow-xs transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
              aria-label="Previous Review"
              title="Previous Review"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={nextSlide}
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
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {activeReviews.map((review, idx) => (
            <div
              key={review.id || idx}
              className="review-card-item shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
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
    </div>
  );
}
