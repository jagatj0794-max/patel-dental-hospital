import React from 'react';
import UnifiedServiceCms from './UnifiedServiceCms';

interface PediatricDentistryCmsProps {
  onSaveSuccess?: () => void;
  serviceSlug?: string;
}

export default function PediatricDentistryCms({ onSaveSuccess, serviceSlug = 'pediatric-dentistry' }: PediatricDentistryCmsProps) {
  return <UnifiedServiceCms serviceSlug={serviceSlug} onSaveSuccess={onSaveSuccess} />;
}
