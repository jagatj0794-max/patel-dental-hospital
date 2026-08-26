import React from 'react';
import UnifiedServiceCms from './UnifiedServiceCms';

interface BracesTreatmentCmsProps {
  onSaveSuccess?: () => void;
  serviceSlug?: string;
}

export default function BracesTreatmentCms({ onSaveSuccess, serviceSlug = 'braces-treatment' }: BracesTreatmentCmsProps) {
  return <UnifiedServiceCms serviceSlug={serviceSlug} onSaveSuccess={onSaveSuccess} />;
}
