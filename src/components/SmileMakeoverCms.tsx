import React from 'react';
import UnifiedServiceCms from './UnifiedServiceCms';

interface SmileMakeoverCmsProps {
  onSaveSuccess?: () => void;
  serviceSlug?: string;
}

export default function SmileMakeoverCms({ onSaveSuccess, serviceSlug = 'smile-makeover' }: SmileMakeoverCmsProps) {
  return <UnifiedServiceCms serviceSlug={serviceSlug} onSaveSuccess={onSaveSuccess} />;
}
