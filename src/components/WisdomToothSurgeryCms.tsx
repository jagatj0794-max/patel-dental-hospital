import React from 'react';
import UnifiedServiceCms from './UnifiedServiceCms';

interface WisdomToothSurgeryCmsProps {
  onSaveSuccess?: () => void;
  serviceSlug?: string;
}

export default function WisdomToothSurgeryCms({ onSaveSuccess, serviceSlug = 'wisdom-tooth-surgery' }: WisdomToothSurgeryCmsProps) {
  return <UnifiedServiceCms serviceSlug={serviceSlug} onSaveSuccess={onSaveSuccess} />;
}
