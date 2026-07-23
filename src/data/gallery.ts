/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GalleryItem } from '../types';

const imgCase1Before = 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=600';
const imgCase1After = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600';
const imgCase2Before = 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600';
const imgCase2After = 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=600';
const imgCase3Before = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600';
const imgCase3After = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600';

// Newly generated treatment-specific clinical before/after photographs
const imgAlignersBefore = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600';
const imgAlignersAfter = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600';
const imgCrownsBefore = 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600';
const imgCrownsAfter = 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=600';
const imgGumBefore = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600';
const imgGumAfter = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600';
const imgRehabBefore = 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=600';
const imgRehabAfter = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'case-sameday-1',
    category: 'sameday',
    title: 'Same Day Fix Teeth - Full Arch Restoration',
    description: 'Patient presented with advanced mobility, bone attrition, and failing dentition. Restored the entire upper and lower arches with permanent immediate-load restorations inside 24 hours.',
    beforeImg: imgCase1Before,
    afterImg: imgCase1After,
    layoutType: 'face-profile',
    patientTag: 'Male, Age 58 • Patient Consent Granted',
    privacyProtection: true,
    difficulty: 'Expert Level'
  },
  {
    id: 'case-implant-2',
    category: 'implant',
    title: 'Dental Implant - Single Missing Tooth Replacement',
    description: 'Replaced a missing front incisor. Installed a premium titanium implant and customized computer-designed zirconia crown that matches the surrounding enamel color gradient beautifully.',
    beforeImg: imgCase2Before,
    afterImg: imgCase2After,
    layoutType: 'close-up',
    patientTag: 'Female, Age 26 • Macro Focused',
    privacyProtection: false,
    difficulty: 'Standard'
  },
  {
    id: 'case-smile-3',
    category: 'smile',
    title: 'Smile Makeover - Veneers and Whitening',
    description: 'Designed a bright, symmetric model smile. Corrected moderate midline gaps and gray fluorosis staining with 8 hand-sculpted ultra-translucent premium porcelain veneers and power laser whitening.',
    beforeImg: imgCase3Before,
    afterImg: imgCase3After,
    layoutType: 'close-up',
    patientTag: 'Female, Age 31 • Anterior Clinical Focus',
    privacyProtection: false,
    difficulty: 'High'
  },
  {
    id: 'case-rehab-4',
    category: 'rehab',
    title: 'Full Mouth Rehabilitation',
    description: 'Comprehensive restorative makeover rebuilding vertical dimension, correcting neuromuscular alignment, and reinforcing all teeth with integrated monolithic zirconia crowns.',
    beforeImg: imgRehabBefore,
    afterImg: imgRehabAfter,
    layoutType: 'macro-implant',
    patientTag: 'Male, Age 64 • Full Jaw Reconstruction',
    privacyProtection: true,
    difficulty: 'Expert Level'
  },
  {
    id: 'case-crown-5',
    category: 'cosmetic',
    title: 'Crowns and Bridges - CAD/CAM Aesthetic Bridge',
    description: 'Engineered a highly stable, completely metal-free customized bridge to close missing gaps. Provides a natural tooth contour and returns full chewing mechanics securely.',
    beforeImg: imgCrownsBefore,
    afterImg: imgCrownsAfter,
    layoutType: 'close-up',
    patientTag: 'Female, Age 42 • Intraoral View',
    privacyProtection: false,
    difficulty: 'Standard'
  },
  {
    id: 'case-aligners-6',
    category: 'ortho',
    title: 'Invisible Aligner Treatment',
    description: 'Corrected moderate dental overcrowding. Implemented a series of transparent, removable medical-grade invisible aligners to align teeth seamlessly with zero wires or metal brackets.',
    beforeImg: imgAlignersBefore,
    afterImg: imgAlignersAfter,
    layoutType: 'cosmetic-makeover',
    patientTag: 'Female, Age 29 • Alignment Accomplished',
    privacyProtection: false,
    difficulty: 'High'
  },
  {
    id: 'case-braces-7',
    category: 'ortho',
    title: 'Braces Correction',
    description: 'Corrected severe teeth crowding and bad developmental overbite. Guided the alignment safely using low-friction high-precision braces to establish perfect occlusion.',
    beforeImg: imgAlignersBefore,
    afterImg: imgAlignersAfter,
    layoutType: 'face-profile',
    patientTag: 'Male, Age 19 • Orthodontic Landmark',
    privacyProtection: true,
    difficulty: 'High'
  },
  {
    id: 'case-gum-8',
    category: 'general',
    title: 'Gum Treatment Smile Improvement',
    description: 'Alleviated red inflamed gums and active periodontitis. Conducted deep root planing and laser ultrasonic periodontal therapy to restore clean, healthy pink support margins.',
    beforeImg: imgGumBefore,
    afterImg: imgGumAfter,
    layoutType: 'close-up',
    patientTag: 'Male, Age 45 • Biological Phase II',
    privacyProtection: false,
    difficulty: 'Standard'
  },
  {
    id: 'case-multimplant-9',
    category: 'implant',
    title: 'Multiple Implant Rehabilitation',
    description: 'Addressed multiple missing back chewing teeth on both sides of the jaw. Integrated multiple bone-anchored dental implants to rebuild bite stability and cheek support.',
    beforeImg: imgCase1Before,
    afterImg: imgCase1After,
    layoutType: 'macro-implant',
    patientTag: 'Male, Age 52 • Surgical Phase I & II',
    privacyProtection: true,
    difficulty: 'Expert Level'
  },
  {
    id: 'case-cosmetic-10',
    category: 'smile',
    title: 'Cosmetic Dentistry Transformation',
    description: 'Restored fractured, small, and chipped upper incisors in a single visit. Custom composite bonding with high-polishing techniques leaves a beautifully dynamic integrated smile contour.',
    beforeImg: imgCase3Before,
    afterImg: imgCase3After,
    layoutType: 'cosmetic-makeover',
    patientTag: 'Female, Age 24 • Aesthetic Edge Care',
    privacyProtection: false,
    difficulty: 'Standard'
  }
];
