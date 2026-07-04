/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GalleryItem } from '../types';

import imgCase1Before from '../assets/images/gallery_case1_before_1780611450331.png';
import imgCase1After from '../assets/images/gallery_case1_after_1780611466649.png';
import imgCase2Before from '../assets/images/gallery_case2_before_1780611481933.png';
import imgCase2After from '../assets/images/gallery_case2_after_1780611494535.png';
import imgCase3Before from '../assets/images/smile_before_1780608028713.png';
import imgCase3After from '../assets/images/smile_after_1780608044346.png';

// Newly generated treatment-specific clinical before/after photographs
import imgAlignersBefore from '../assets/images/aligners_teeth_before_1780687415680.png';
import imgAlignersAfter from '../assets/images/aligners_teeth_after_1780687432806.png';
import imgCrownsBefore from '../assets/images/crowns_teeth_before_1780687451589.png';
import imgCrownsAfter from '../assets/images/crowns_teeth_after_1780687466941.png';
import imgGumBefore from '../assets/images/gum_teeth_before_1780687482800.png';
import imgGumAfter from '../assets/images/gum_teeth_after_1780687499886.png';
import imgRehabBefore from '../assets/images/rehab_teeth_before_1780687516367.png';
import imgRehabAfter from '../assets/images/rehab_teeth_after_1780687532302.png';

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
    title: 'Clear Aligner Treatment',
    description: 'Corrected moderate dental overcrowding. Implemented a series of transparent, removable medical-grade clear aligners to align teeth seamlessly with zero wires or metal brackets.',
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
