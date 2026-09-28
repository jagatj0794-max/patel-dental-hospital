/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const patelDentistPatient1 = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600';
const patelDentistPatient2 = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600';
const patelDentistPatient3 = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600';
const patelDentistPatient4 = 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=600';
const patelDentistPatient5 = 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600';
const patelDentistPatient6 = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600';
const patelDentistPatient7 = 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=600';
const patelDentistPatient8 = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600';
const patelDentistPatient9 = 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600';
const patelDentistPatient10 = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600';
const patelDentistPatient11 = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600';
const patelDentistPatient12 = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600';

export interface PatientMoment {
  id: string;
  image: string;
  altText?: string;
}

export const PATIENT_MOMENTS: PatientMoment[] = [
  {
    id: 'moment-1',
    image: patelDentistPatient1,
    altText: 'Patient smiling happily with a bright, healthy smile after successful dental treatment at Patel Dental Hospital, Rajkot.'
  },
  {
    id: 'moment-2',
    image: patelDentistPatient2,
    altText: 'Happy dental patient showing a restored smile after receiving professional care at Patel Dental Hospital, Rajkot.'
  },
  {
    id: 'moment-3',
    image: patelDentistPatient3,
    altText: 'A smiling patient posing with the dentist at Patel Dental Hospital in Rajkot following treatment.'
  },
  {
    id: 'moment-4',
    image: patelDentistPatient4,
    altText: 'Dental patient showing a confident, healthy smile after expert cosmetic dental care at Patel Dental Hospital.'
  },
  {
    id: 'moment-5',
    image: patelDentistPatient5,
    altText: 'Pleased patient sharing a bright smile following a comfortable dental visit and successful rehabilitation.'
  },
  {
    id: 'moment-6',
    image: patelDentistPatient6,
    altText: 'Patient smiling happily with a bright, healthy smile after successful dental treatment at Patel Dental Hospital, Rajkot.'
  },
  {
    id: 'moment-7',
    image: patelDentistPatient7,
    altText: 'Happy dental patient showing a restored smile after receiving professional care at Patel Dental Hospital, Rajkot.'
  },
  {
    id: 'moment-8',
    image: patelDentistPatient8,
    altText: 'A smiling patient posing with the dentist at Patel Dental Hospital in Rajkot following treatment.'
  },
  {
    id: 'moment-9',
    image: patelDentistPatient9,
    altText: 'Dental patient showing a confident, healthy smile after expert cosmetic dental care at Patel Dental Hospital.'
  },
  {
    id: 'moment-10',
    image: patelDentistPatient10,
    altText: 'Pleased patient sharing a bright smile following a comfortable dental visit and successful rehabilitation.'
  },
  {
    id: 'moment-11',
    image: patelDentistPatient11,
    altText: 'Patient smiling happily with a bright, healthy smile after successful dental treatment at Patel Dental Hospital, Rajkot.'
  },
  {
    id: 'moment-12',
    image: patelDentistPatient12,
    altText: 'Happy dental patient showing a restored smile after receiving professional care at Patel Dental Hospital, Rajkot.'
  }
];
