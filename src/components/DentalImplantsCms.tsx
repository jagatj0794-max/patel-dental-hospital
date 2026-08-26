import React from 'react';
import UnifiedServiceCms from './UnifiedServiceCms';

interface DentalImplantsCmsProps {
  onSaveSuccess?: () => void;
  serviceSlug?: string;
}

export default function DentalImplantsCms({ onSaveSuccess, serviceSlug = 'dental-implants' }: DentalImplantsCmsProps) {
  return <UnifiedServiceCms serviceSlug={serviceSlug} onSaveSuccess={onSaveSuccess} />;
}
