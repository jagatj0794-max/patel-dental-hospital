import { Doctor } from '../types';

export const DEFAULT_DOCTORS: Doctor[] = [
  {
    id: 'kinjal',
    name: 'Dr. Kinjal Patel',
    titles: 'BDS',
    designation: 'Cosmetic/Aesthetic Dentist & Implantologist',
    img: '/Dr kinjal patel 2.png',
    briefIntro: 'Dr. Kinjal Patel is a highly accomplished Cosmetic/Aesthetic Dentist, Implantologist and Dentist practicing in Rajkot Bhaktinagar, Rajkot. Key clinical systems at Patel Dental Hospital are directed by her uncompromising dedication to visual perfection, functional durability, and absolute patient safety.',
    quote: 'Dr. Kinjal Patel is committed to providing patient-focused dental care with modern technology and advanced treatment planning.',
    bdsYear: '2012',
    bdsInstitution: 'Government Dental College, Jamnagar',
    stats: [
      { value: '2012', label: 'BDS Degree' },
      { value: '20k+', label: 'Smiles Transformed' },
      { value: '100%', label: 'Sterilization Standard' },
      { value: '12+', label: 'Years Experience' }
    ],
    expertises: [
      {
        title: 'Cosmetic & Aesthetic Dentistry',
        desc: 'Custom-designed porcelain veneers, ultra-strong e-MAX glass-ceramic crowns, and tooth-colored cosmetic composite restorations tailored for realistic translucence and flawless alignment.'
      },
      {
        title: 'Immediate Functional Implants',
        desc: 'Biological tooth placement utilizing premium grade-V biocompatible titanium. Guided computerized insertion protocols targeting high-stability, zero-bone-loss outcomes.'
      },
      {
        title: 'Full Smile Makeovers',
        desc: 'Surgical and non-surgical smile reconstructions matching biological lip/face dynamics, meticulously mapped using advanced computer-aided facial proportions.'
      },
      {
        title: 'Micro-Invasive General Care',
        desc: 'Uncompromising focus on natural tooth conservation. Gentle prophylactic plaque treatments, cavity sealing with active remineralization, and light-cured composite materials.'
      }
    ],
    branch: 'Gayatrinagar Branch',
    experience: '12+'
  },
  {
    id: 'vipul',
    name: 'Dr. Vipul Patel',
    titles: 'BDS',
    designation: 'Cosmetic/Aesthetic Dentist & Implantologist',
    img: '/dr. patel.png',
    briefIntro: 'Dr. Vipul Patel is a highly experienced Cosmetic/Aesthetic Dentist, Implantologist and Dental Surgeon practicing at Patel Dental Hospital, Rajkot. He has extensive experience in Implant Dentistry, Full Mouth Rehabilitation, Smile Makeovers, Root Canal Treatments and Advanced Restorative Dentistry. His focus is on precision, patient comfort and long-term treatment success.',
    quote: 'Dr. Vipul Patel is committed to delivering advanced dental care with personalized treatment planning and modern technology.',
    bdsYear: '2006',
    bdsInstitution: 'Dental College Graduate',
    stats: [
      { value: '2006', label: 'BDS Degree' },
      { value: '20,000+', label: 'Successful Treatments' },
      { value: '15,000+', label: 'Fixed Teeth Cases' },
      { value: '18+', label: 'Years Experience' }
    ],
    expertises: [
      {
        title: 'Advanced Oral Implantology',
        desc: 'Senior-level immediate loading dental implants and complete fixed-teeth replacement surgeries. Guided custom computer templates minimizing surgical trauma and swelling.'
      },
      {
        title: 'Full Mouth Rehabilitation',
        desc: 'Multi-disciplinary correction of severely damaged, ground-down, or missing dentition. Restoring ideal masticatory vectors, facial posture, and healthy chewing functionality.'
      },
      {
        title: 'Aesthetic Crowns & Bridges',
        desc: 'Premium zirconia, metal-free CAD/CAM ceramic bridges, and precise crown fittings that withstand deep grinding pressures and perfectly mimic adjacent enamel gradients.'
      },
      {
        title: 'Microscopic Endodontics',
        desc: 'Highly structured single-sitting root canal treatments, utilizing high-torque precision rotary equipment and deep sterile sealing protocols for supreme tooth saving.'
      }
    ],
    branch: 'Mavdi Branch',
    experience: '18+'
  }
];
