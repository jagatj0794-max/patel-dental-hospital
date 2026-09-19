/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { dentalImplantsFaqs, DENTAL_IMPLANTS_FAQS_GU, rootCanalFaqs, smileMakeoverFaqs, crownsBridgesFaqs, CROWNS_BRIDGES_FAQS_GU, pediatricDentistryFaqs } from '../data/serviceFaqs';

export interface ServiceSEOData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  schema: any[];
}

export const getServiceSEO = (slug: string, title: string, fallbackDesc: string, language?: 'en' | 'gu') => {
  const canonicalUrl = `https://www.pateldentalhospital.com/#services/${slug}`;

  const createSchema = (srvTitle: string, srvDesc: string) => {
    return [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pateldentalhospital.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.pateldentalhospital.com/#treatments"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": srvTitle,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Dentist",
        "name": "Patel Dental Hospital",
        "image": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
        "@id": "https://www.pateldentalhospital.com/#dentist",
        "url": "https://www.pateldentalhospital.com/",
        "telephone": "+919510397046",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Gayatrinagar Main Road & Amin Marg",
          "addressLocality": "Rajkot",
          "addressRegion": "Gujarat",
          "postalCode": "360005",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "22.2856",
          "longitude": "70.7912"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "20:00"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Dental Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalSpecialty",
                "name": srvTitle,
                "description": srvDesc
              }
            }
          ]
        }
      }
    ];
  };

  switch (slug) {
    case 'dental-implants': {
      const sTitle = 'Best Dental Implants in Rajkot | Tooth Implant Specialist';
      const sDesc = 'Get lifetime-warranty dental implants in Rajkot at Patel Dental Hospital. Permanent tooth replacement, painless 3D CBCT guided surgery by Dr. Vipul Patel.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Dental Implants, Best Dental Implants in Rajkot, Dental Implant Specialist, Implantology Rajkot, Same Day Dental Implants, Full Mouth Rehabilitation, Tooth Replacement, Missing Tooth Replacement, Single Tooth Implant, Full Mouth Dental Implants',
        canonicalUrl,
        schema: [
          ...createSchema(sTitle, sDesc),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": dentalImplantsFaqs.map((faq) => {
              const translation = language === 'gu' ? DENTAL_IMPLANTS_FAQS_GU[faq.question] : null;
              return {
                "@type": "Question",
                "name": translation ? translation.question : faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": translation ? translation.answer : faq.answer
                }
              };
            })
          }
        ]
      };
    }
    case 'root-canal-treatment': {
      const sTitle = 'Painless Single Sitting Root Canal Treatment in Rajkot | RCT Specialist';
      const sDesc = 'Experience comfortable, single-sitting Root Canal Treatment (RCT) in Rajkot at Patel Dental Hospital. Endodontic specialist care to resolve tooth pain & save natural teeth.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Root Canal Treatment, RCT, Single Sitting RCT, Root Canal Specialist, Tooth Pain Treatment, Endodontic Treatment, Best Dentist in Rajkot, Dental Clinic in Rajkot, Patel Dental Hospital',
        canonicalUrl,
        schema: [
          ...createSchema(sTitle, sDesc),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": rootCanalFaqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]
      };
    }
    case 'full-mouth-rehabilitation': {
      const sTitle = 'Full Mouth Rehabilitation & Restoration in Rajkot | Patel Dental Hospital';
      const sDesc = 'Complete smile reconstruction and bite correction with full mouth rehabilitation in Rajkot. Painless restorative procedures by specialist clinicians at Patel Dental Hospital.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Full Mouth Rehabilitation, Full Mouth Restoration, Complete Dental Rehabilitation, Full Mouth Reconstruction, Restorative Dentistry, Advanced Dental Care in Rajkot, Dentist in Rajkot',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'invisible-aligners': {
      const sTitle = 'Invisible Aligners & Clear Aligners in Rajkot | Clear Braces Specialist';
      const sDesc = 'Straighten your teeth discreetly with invisible aligners & clear aligners in Rajkot. Get comfortable orthodontic treatment customized by experts at Patel Dental Hospital.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Invisible Aligners, Clear Aligners, Invisible Braces, Teeth Straightening, Orthodontic Treatment, Clear Aligners Rajkot, Clear Braces Rajkot, Best Dentist in Rajkot, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'smile-makeover': {
      const sTitle = 'Smile Makeover & Cosmetic Smile Designing in Rajkot | Patel Dental Hospital';
      const sDesc = 'Get your dream smile designed by expert cosmetic dentists in Rajkot. Patel Dental Hospital offers professional smile correction, veneers, and aesthetic smile makeovers.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Smile Makeover, Smile Designing, Cosmetic Dentistry, Smile Correction, Aesthetic Dentistry, Cosmetic Dentist Rajkot, Porcelain Veneers, Digital Smile Design, Patel Dental Hospital',
        canonicalUrl,
        schema: [
          ...createSchema(sTitle, sDesc),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": smileMakeoverFaqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]
      };
    }
    case 'crowns-bridges': {
      const sTitle = 'Premium Dental Crowns & Bridges in Rajkot | Zirconia & Ceramic Caps';
      const sDesc = 'Restore damaged or missing teeth with high-durability Zirconia and Ceramic dental crowns and bridges in Rajkot at Patel Dental Hospital. CAD/CAM custom restorations.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Crowns and Bridges, Dental Crown, Zirconia Crown, Ceramic Crown, Dental Bridge, Tooth Cap, Best Dentist in Rajkot, Dental Clinic Rajkot, Restorative Dentistry, Patel Dental Hospital',
        canonicalUrl,
        schema: [
          ...createSchema(sTitle, sDesc),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": crownsBridgesFaqs.map((faq) => {
              const translation = language === 'gu' ? CROWNS_BRIDGES_FAQS_GU[faq.question] : null;
              return {
                "@type": "Question",
                "name": translation ? translation.question : faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": translation ? translation.answer : faq.answer
                }
              };
            })
          }
        ]
      };
    }
    case 'teeth-whitening': {
      const sTitle = 'Professional Laser Teeth Whitening in Rajkot | Instant Bright Smile';
      const sDesc = 'Get a sparkling white smile in under 60 minutes with advanced laser teeth whitening in Rajkot at Patel Dental Hospital. Safe, painless, and highly effective shade brightening.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Teeth Whitening, Laser Teeth Whitening, Professional Teeth Whitening, Tooth Whitening, Cosmetic Dentist Rajkot, Best Dental Hospital in Rajkot, Instant Teeth Brightening, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'pediatric-dentistry': {
      const sTitle = 'Best Pediatric Dentist in Rajkot | Child & Kids Dental Clinic';
      const sDesc = 'Warm, gentle, and pain-free children\'s dental care in Rajkot. Patel Dental Hospital offers expert pediatric dentistry, cavity prevention, fluoride therapy, and dental sealants.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Child Dentist, Kids Dentist, Pediatric Dentist, Children\'s Dental Care, Kids Dentist Rajkot, Pediatric Dentist Rajkot, Cavity Prevention, Preventive Dentistry, Patel Dental Hospital',
        canonicalUrl,
        schema: [
          ...createSchema(sTitle, sDesc),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": pediatricDentistryFaqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]
      };
    }
    case 'braces-treatment': {
      const sTitle = 'Orthodontic Braces Treatment in Rajkot | Metal & Ceramic Braces';
      const sDesc = 'Align your crooked or crowded teeth perfectly with metal, ceramic, or self-ligating dental braces in Rajkot. Comprehensive orthodontic solutions under senior consultants.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Braces Treatment, Metal Braces, Ceramic Braces, Orthodontics, Teeth Alignment, Orthodontic Treatment Rajkot, Best Orthodontist Rajkot, Teeth Straightening Rajkot, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'wisdom-tooth-surgery': {
      const sTitle = 'Painless Wisdom Tooth Surgery & Removal in Rajkot | Patel Dental Hospital';
      const sDesc = 'Safe, comfortable, and pain-free wisdom tooth removal and impacted tooth surgery in Rajkot at Patel Dental Hospital. Advanced micromotor systems for fast post-op recovery.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Wisdom Tooth Removal, Wisdom Tooth Surgery, Impacted Tooth Surgery, Tooth Extraction, Best Dentist in Rajkot, Oral Surgeon Rajkot, Painless Extraction Rajkot, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    case 'tooth-coloured-filling': {
      const sTitle = 'Biocompatible Tooth Coloured Fillings in Rajkot | Composite Restoration';
      const sDesc = 'Restore cavities naturally with dental composite fillings in Rajkot. Patel Dental Hospital offers durable, aesthetic, and metal-free tooth-coloured tooth restorations.';
      return {
        title: sTitle,
        description: sDesc,
        keywords: 'Tooth Filling, Composite Filling, Tooth Coloured Filling, Dental Filling, Cavity Restoration, Best Dentist in Rajkot, Dental Clinic Rajkot, Preventive Dentistry, Patel Dental Hospital',
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
    default: {
      const sTitle = `${title} | Advanced Dental Treatment in Rajkot`;
      const sDesc = fallbackDesc || `Advanced, reliable ${title} at Patel Dental Hospital, Rajkot. Led by expert senior dentists using world-class technologies and safe sterile guidelines.`;
      return {
        title: sTitle,
        description: sDesc,
        keywords: `${title}, Best Dentist in Rajkot, Dental Clinic in Rajkot, Patel Dental Hospital, Dental Treatment, Rajkot Dentist`,
        canonicalUrl,
        schema: createSchema(sTitle, sDesc)
      };
    }
  }
};
