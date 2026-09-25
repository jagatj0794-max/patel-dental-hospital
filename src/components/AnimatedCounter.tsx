/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({ value, suffix = '', prefix = '' }: AnimatedCounterProps) {
  // Format count cleanly (e.g. 20,000)
  const formattedCount = value.toLocaleString('en-US');

  return (
    <span className="stat-number-premium" style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 600 }}>
      {prefix}
      {formattedCount}
      {suffix && (
        <span className="stat-number-premium-suffix text-[0.7em] ml-0.5 inline-block align-baseline relative -top-[0.12em] opacity-85 select-none tracking-normal" style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 600 }}>
          {suffix}
        </span>
      )}
    </span>
  );
}
