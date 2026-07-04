/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({ value, duration = 2000, suffix = '', prefix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const element = elementRef.current;

    const startLifecycle = () => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Easing function: easeOutExpo for ultra premium slow-down feel
        const progressSlow = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(progressSlow * value));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };
      window.requestAnimationFrame(step);
    };

    if (element && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated.current) {
              hasAnimated.current = true;
              startLifecycle();
              if (observer) observer.unobserve(element);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      observer.observe(element);
    } else {
      // Fallback if IntersectionObserver not available
      startLifecycle();
    }

    return () => {
      if (observer && element) {
        observer.unobserve(element);
      }
    };
  }, [value, duration]);

  // Format count cleanly (e.g. 20,000)
  const formattedCount = count.toLocaleString('en-US');

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}
