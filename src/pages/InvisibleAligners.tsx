/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ServiceDetail from './ServiceDetail';
import { PageId } from '../types';

interface InvisibleAlignersProps {
  setCurrentPage: (page: PageId) => void;
  openAppointmentModal: (preselectedTreatment?: string) => void;
}

export default function InvisibleAligners({ setCurrentPage, openAppointmentModal }: InvisibleAlignersProps) {
  return (
    <ServiceDetail
      slug="invisible-aligners"
      openAppointmentModal={openAppointmentModal}
      setCurrentPage={setCurrentPage}
    />
  );
}
