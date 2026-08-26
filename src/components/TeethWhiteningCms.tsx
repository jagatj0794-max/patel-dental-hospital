import React from 'react';
import UnifiedServiceCms from './UnifiedServiceCms';

interface TeethWhiteningCmsProps {
  onSaveSuccess?: () => void;
  serviceSlug?: string;
}

export default function TeethWhiteningCms({ onSaveSuccess, serviceSlug = 'teeth-whitening' }: TeethWhiteningCmsProps) {
  return <UnifiedServiceCms serviceSlug={serviceSlug} onSaveSuccess={onSaveSuccess} />;
}
