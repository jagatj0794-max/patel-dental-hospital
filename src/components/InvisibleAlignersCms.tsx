import React from 'react';
import UnifiedServiceCms from './UnifiedServiceCms';

interface InvisibleAlignersCmsProps {
  onSaveSuccess?: () => void;
  serviceSlug?: string;
}

export default function InvisibleAlignersCms({ onSaveSuccess, serviceSlug = 'invisible-aligners' }: InvisibleAlignersCmsProps) {
  return <UnifiedServiceCms serviceSlug={serviceSlug} onSaveSuccess={onSaveSuccess} />;
}
