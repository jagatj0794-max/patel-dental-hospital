import React from 'react';
import UnifiedServiceCms from './UnifiedServiceCms';

interface FullMouthRehabCmsProps {
  onSaveSuccess?: () => void;
  serviceSlug?: string;
}

export default function FullMouthRehabCms({ onSaveSuccess, serviceSlug = 'full-mouth-rehabilitation' }: FullMouthRehabCmsProps) {
  return <UnifiedServiceCms serviceSlug={serviceSlug} onSaveSuccess={onSaveSuccess} />;
}
