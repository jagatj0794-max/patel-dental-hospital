import React from 'react';
import UnifiedServiceCms from './UnifiedServiceCms';

interface CrownAndBridgesCmsProps {
  onSaveSuccess?: () => void;
  serviceSlug?: string;
}

export default function CrownAndBridgesCms({ onSaveSuccess, serviceSlug = 'crown-and-bridges' }: CrownAndBridgesCmsProps) {
  return <UnifiedServiceCms serviceSlug={serviceSlug} onSaveSuccess={onSaveSuccess} />;
}
