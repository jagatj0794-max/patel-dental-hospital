import React from 'react';
import UnifiedServiceCms from './UnifiedServiceCms';

interface RootCanalCmsProps {
  onSaveSuccess?: () => void;
  serviceSlug?: string;
}

export default function RootCanalCms({ onSaveSuccess, serviceSlug = 'root-canal-treatment' }: RootCanalCmsProps) {
  return <UnifiedServiceCms serviceSlug={serviceSlug} onSaveSuccess={onSaveSuccess} />;
}
