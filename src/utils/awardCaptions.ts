/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AwardCaption {
  organization: string;
  recognition: string;
  recipient: string;
  date: string;
  category?: string;
  programme?: string;
  location?: string;
  specialization?: string;
  isEventPhoto?: boolean;
}

const captionsEN: Record<string, AwardCaption> = {
  // Vertical / Portrait Awards (5)
  "3a7cc3e0-bfe6-4300-99fb-b5a153c5fc69": {
    organization: "Master of Dental Surgery",
    recognition: "Oral Medicine & Radiology",
    recipient: "Dr. Vipul Gothi",
    date: "29 January 2023"
  },
  "472f0848-85d5-4d86-b167-5d0d722f9494": {
    organization: "Indian Society of Oral Implantologists (ISOI)",
    recognition: "Fellow",
    recipient: "Dr. Vipul Gothi",
    date: "16 January 2022"
  },
  "ba137ef1-c883-4b39-8333-f54518070ac4": {
    organization: "International Congress of Oral Implantologists (ICOI)",
    recognition: "Fellow",
    recipient: "Dr. Vipul Gothi",
    date: "1 August 2022"
  },
  "1422a2d5-7feb-4b7e-8107-5607398d6032": {
    organization: "International Congress of Oral Implantologists (ICOI)",
    recognition: "Fellow",
    recipient: "Dr. Kinjal Bhanderi",
    date: "1 August 2022"
  },
  "2232f4c8-26dd-4ef9-8f6f-9e1c019608e6": {
    organization: "Indian Society of Oral Implantologists (ISOI)",
    recognition: "Certificate of Achievement",
    recipient: "Dr. Kinjal Gothi",
    date: "20 January 2023"
  },

  // Horizontal Awards (9)
  "4392637d-0d40-44f5-a651-5dac06faa458": {
    organization: "Certificate of Accomplishment",
    recognition: "Entrepreneur Gurukul Program – 29th Batch",
    recipient: "Dr. Vipul Gothi (Patel Dental Hospital)",
    date: "28 February 2019 – 18 September 2021"
  },
  "69dcf784-5006-4f3e-944a-0ca39904e634": {
    organization: "The International Congress of Oral Implantologists (ICOI)",
    recognition: "Master – Implant Prosthodontics",
    recipient: "Dr. Vipul Gothi",
    date: "1 August 2022"
  },
  "c56700a3-75d7-479d-b674-bf9469b29a3b": {
    organization: "Indian Society of Oral Implantologists (ISOI)",
    recognition: "Diplomate",
    recipient: "Dr. Vipul Gothi",
    date: "16 January 2022"
  },
  "9eb730e0-e745-44cd-9394-469db3029213": {
    organization: "FAMDENT Excellence in Dentistry Awards 2021",
    recognition: "Highly Commended – Clinic of the Year – Multiple Chair, Zone B",
    recipient: "Dr. Vipul Gothi",
    date: "29 May 2021"
  },
  "3e02c4f3-8784-4621-861b-54e56d1693a3": {
    organization: "FAMDENT Excellence in Dentistry Awards 2022",
    recognition: "Nominated – Clinic of the Year – Multiple Chair (Zone B)",
    recipient: "Dr. Vipul Pravinbhai Gothi",
    date: "21 May 2022"
  },
  "7ffc15f5-9d71-4472-94d1-4b741b96ab0c": {
    organization: "FAMDENT Excellence in Dentistry Awards 2021",
    recognition: "Nominated – Outstanding Dentist of the Year – Below 45, Zone A",
    recipient: "Dr. Vipul Gothi",
    date: "29 May 2021"
  },
  "08f697e9-c20b-43fe-91a2-9dd7fb746eb8": {
    organization: "ICOI Presentation Ceremony",
    recognition: "Supporting Event Photograph",
    recipient: "Dr. Vipul Gothi",
    date: "1 August 2022",
    isEventPhoto: true
  },
  "36c520c2-de49-4af3-b162-5ca9acfa295c": {
    organization: "ICOI Presentation Ceremony",
    recognition: "Supporting Event Photograph",
    recipient: "Dr. Vipul Gothi",
    date: "1 August 2022",
    isEventPhoto: true
  },
  "c7a3758a-24d3-4805-b019-1d739b1a1cfc": {
    organization: "ICOI Presentation Ceremony",
    recognition: "Supporting Event Photograph",
    recipient: "Dr. Vipul Gothi",
    date: "1 August 2022",
    isEventPhoto: true
  }
};

const captionsGU: Record<string, AwardCaption> = {
  // Vertical / Portrait Awards (5)
  "3a7cc3e0-bfe6-4300-99fb-b5a153c5fc69": {
    organization: "માસ્ટર ઓફ ડેન્ટલ સર્જરી",
    recognition: "ઓરલ મેડિસિન અને રેડિયોલોજી",
    recipient: "ડૉ. વિપુલ ગોઠી",
    date: "૨૯ જાન્યુઆરી ૨૦૨૩"
  },
  "472f0848-85d5-4d86-b167-5d0d722f9494": {
    organization: "ઇન્ડિયન સોસાયટી ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજિસ્ટ્સ (આઈએસઓઆઈ)",
    recognition: "ફેલો",
    recipient: "ડૉ. વિપુલ ગોઠી",
    date: "૧૬ જાન્યુઆરી ૨૦૨૨"
  },
  "ba137ef1-c883-4b39-8333-f54518070ac4": {
    organization: "ઇન્ટરનેશનલ કોંગ્રેસ ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજિસ્ટ્સ (આઈસીઓઆઈ)",
    recognition: "ફેલો",
    recipient: "ડૉ. વિપુલ ગોઠી",
    date: "૧ ઓગસ્ટ ૨૦૨૨"
  },
  "1422a2d5-7feb-4b7e-8107-5607398d6032": {
    organization: "ઇન્ટરનેશનલ કોંગ્રેસ ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજિસ્ટ્સ (આઈસીઓઆઈ)",
    recognition: "ફેલો",
    recipient: "ડૉ. કિંજલ ભંડેરી",
    date: "૧ ઓગસ્ટ ૨૦૨૨"
  },
  "2232f4c8-26dd-4ef9-8f6f-9e1c019608e6": {
    organization: "ઇન્ડિયન સોસાયટી ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજિસ્ટ્સ (આઈએસઓઆઈ)",
    recognition: "સિદ્ધિનું પ્રમાણપત્ર",
    recipient: "ડૉ. કિંજલ ગોઠી",
    date: "૨૦ જાન્યુઆરી ૨૦૨૩"
  },

  // Horizontal Awards (9)
  "4392637d-0d40-44f5-a651-5dac06faa458": {
    organization: "સિદ્ધિનું પ્રમાણપત્ર",
    recognition: "એન્ટ્રપ્રેન્યોર ગુરુકુલ પ્રોગ્રામ – ૨૯મી બેચ",
    recipient: "ડૉ. વિપુલ ગોઠી (પટેલ ડેન્ટલ હોસ્પિટલ)",
    date: "૨૮ ફેબ્રુઆરી ૨૦૧૯ – ૧૮ સપ્ટેમ્બર ૨૦૨૧"
  },
  "69dcf784-5006-4f3e-944a-0ca39904e634": {
    organization: "ધ ઇન્ટરનેશનલ કોંગ્રેસ ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજિસ્ટ્સ (આઈસીઓઆઈ)",
    recognition: "માસ્ટર – ઇમ્પ્લાન્ટ પ્રોસ્ટોડોન્ટિક્સ",
    recipient: "ડૉ. વિપુલ ગોઠી",
    date: "૧ ઓગસ્ટ ૨૦૨૨"
  },
  "c56700a3-75d7-479d-b674-bf9469b29a3b": {
    organization: "ઇન્ડિયન સોસાયટી ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજિસ્ટ્સ (આઈએસઓઆઈ)",
    recognition: "ડિપ્લોમેટ",
    recipient: "ડૉ. વિપુલ ગોઠી",
    date: "૧૬ જાન્યુઆરી ૨૦૨૨"
  },
  "9eb730e0-e745-44cd-9394-469db3029213": {
    organization: "ફેમડેન્ટ એક્સેલન્સ ઇન ડેન્ટિસ્ટ્રી એવોર્ડ્સ ૨૦૨૧",
    recognition: "હાઇલિ કમેન્ડેડ – ક્લિનિક ઓફ ધ યર – મલ્ટિપલ ચેર, ઝોન B",
    recipient: "ડૉ. વિપુલ ગોઠી",
    date: "૨૯ મે ૨૦૨૧"
  },
  "3e02c4f3-8784-4621-861b-54e56d1693a3": {
    organization: "ફેમડેન્ટ એક્સેલન્સ ઇન ડેન્ટિસ્ટ્રી એવોર્ડ્સ ૨૦૨૨",
    recognition: "નોમિનેટેડ – ક્લિનિક ઓફ ધ યર – મલ્ટિપલ ચેર (ઝોન B)",
    recipient: "ડૉ. વિપુલ પ્રવીણભાઈ ગોઠી",
    date: "૨૧ મે ૨૦૨૨"
  },
  "7ffc15f5-9d71-4472-94d1-4b741b96ab0c": {
    organization: "ફેમડેન્ટ એક્સેલન્સ ઇન ડેન્ટિસ્ટ્રી એવોર્ડ્સ ૨૦૨૧",
    recognition: "નોમિનેટેડ – આઉટસ્ટેન્ડિંગ ડેન્ટિસ્ટ ઓફ ધ યર – ૪૫ વર્ષથી ઓછી ઉંમર, ઝોન A",
    recipient: "ડૉ. વિપુલ ગોઠી",
    date: "૨૯ મે ૨૦૨૧"
  },
  "08f697e9-c20b-43fe-91a2-9dd7fb746eb8": {
    organization: "આઈસીઓઆઈ પ્રેઝન્ટેશન સેરેમની",
    recognition: "સહાયક ઇવેન્ટ ફોટોગ્રાફ",
    recipient: "ડૉ. વિપુલ ગોઠી",
    date: "૧ ઓગસ્ટ ૨૦૨૨",
    isEventPhoto: true
  },
  "36c520c2-de49-4af3-b162-5ca9acfa295c": {
    organization: "આઈસીઓઆઈ પ્રેઝન્ટેશન સેરેમની",
    recognition: "સહાયક ઇવેન્ટ ફોટોગ્રાફ",
    recipient: "ડૉ. વિપુલ ગોઠી",
    date: "૧ ઓગસ્ટ ૨૦૨૨",
    isEventPhoto: true
  },
  "c7a3758a-24d3-4805-b019-1d739b1a1cfc": {
    organization: "આઈસીઓઆઈ પ્રેઝન્ટેશન સેરેમની",
    recognition: "સહાયક ઇવેન્ટ ફોટોગ્રાફ",
    recipient: "ડૉ. વિપુલ ગોઠી",
    date: "૧ ઓગસ્ટ ૨૦૨૨",
    isEventPhoto: true
  }
};

// Fallback matching by image filenames substring for extra robustness
const filenameMap: Record<string, string> = {
  "1786191360880_eabeig2y": "4392637d-0d40-44f5-a651-5dac06faa458",
  "1786191346578_mgh8lg8j": "69dcf784-5006-4f3e-944a-0ca39904e634",
  "1786191333898_gzt71uzg": "c56700a3-75d7-479d-b674-bf9469b29a3b",
  "1786191323689_39h0d07k": "9eb730e0-e745-44cd-9394-469db3029213",
  "1786191302992_pjwy314p": "3e02c4f3-8784-4621-861b-54e56d1693a3",
  "1786191290272_4cf7qx7m": "7ffc15f5-9d71-4472-94d1-4b741b96ab0c",
  "1786191229945_5eu2jh67": "472f0848-85d5-4d86-b167-5d0d722f9494",
  "1786191237012_ryyth4qo": "ba137ef1-c883-4b39-8333-f54518070ac4",
  "1786191243705_h1mdqaft": "1422a2d5-7feb-4b7e-8107-5607398d6032",
  "1786191257508_i5rn0fpx": "2232f4c8-26dd-4ef9-8f6f-9e1c019608e6",
  "1787284435951_nexo0d5y": "3a7cc3e0-bfe6-4300-99fb-b5a153c5fc69",
  "1786735124967_llfd2a3e": "08f697e9-c20b-43fe-91a2-9dd7fb746eb8",
  "1786735106596_k1yufqjo": "36c520c2-de49-4af3-b162-5ca9acfa295c",
  "1786735083257_9rtjtuq6": "c7a3758a-24d3-4805-b019-1d739b1a1cfc"
};

import { safeStorage } from './storage';
import { AwardItem } from '../types';

export function parseAwardMetaFromUrl(_imageUrl: string): { title?: string; subtitle?: string; person_name?: string; date?: string; alt_text?: string } | null {
  return null;
}

export function cleanAwardImageUrl(imageUrl: string): string {
  if (!imageUrl) return '';
  return imageUrl.split('#')[0];
}

export function getAwardSavedText(id: string, _imageUrl?: string): { title?: string; subtitle?: string; person_name?: string; date?: string; alt_text?: string } | null {
  try {
    const stored = safeStorage.getItem('award_text_' + id);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && (parsed.title || parsed.subtitle || parsed.person_name || parsed.date || parsed.alt_text)) {
        return parsed;
      }
    }
  } catch (e) {}
  return null;
}

function localizeTextToGujarati(text: string): string {
  if (!text) return '';
  let res = text;
  const replacements: Array<[RegExp | string, string]> = [
    ['The International Congress of Oral Implantologists (ICOI)', 'ધ ઇન્ટરનેશનલ કોંગ્રેસ ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજિસ્ટ્સ (આઈસીઓઆઈ)'],
    ['International Congress of Oral Implantologists (ICOI)', 'ઇન્ટરનેશનલ કોંગ્રેસ ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજિસ્ટ્સ (આઈસીઓઆઈ)'],
    ['Indian Society of Oral Implantologists (ISOI)', 'ઇન્ડિયન સોસાયટી ઓફ ઓરલ ઇમ્પ્લાન્ટોલોજિસ્ટ્સ (આઈએસઓઆઈ)'],
    ['Master of Dental Surgery', 'માસ્ટર ઓફ ડેન્ટલ સર્જરી'],
    ['Oral Medicine & Radiology', 'ઓરલ મેડિસિન અને રેડિયોલોજી'],
    ['Certificate of Accomplishment', 'સિદ્ધિનું પ્રમાણપત્ર'],
    ['Certificate of Achievement', 'સિદ્ધિનું પ્રમાણપત્ર'],
    ['Entrepreneur Gurukul Program – 29th Batch', 'એન્ટ્રપ્રેન્યોર ગુરુકુલ પ્રોગ્રામ – ૨૯મી બેચ'],
    ['Master – Implant Prosthodontics', 'માસ્ટર – ઇમ્પ્લાન્ટ પ્રોસ્ટોડોન્ટિક્સ'],
    ['FAMDENT Excellence in Dentistry Awards 2021', 'ફેમડેન્ટ એક્સેલન્સ ઇન ડેન્ટિસ્ટ્રી એવોર્ડ્સ ૨૦૨૧'],
    ['FAMDENT Excellence in Dentistry Awards 2022', 'ફેમડેન્ટ એક્સેલન્સ ઇન ડેન્ટિસ્ટ્રી એવોર્ડ્સ ૨૦૨૨'],
    ['Highly Commended – Clinic of the Year – Multiple Chair, Zone B', 'હાઇલિ કમેન્ડેડ – ક્લિનિક ઓફ ધ યર – મલ્ટિપલ ચેર, ઝોન B'],
    ['Nominated – Clinic of the Year – Multiple Chair (Zone B)', 'નોમિનેટેડ – ક્લિનિક ઓફ ધ યર – મલ્ટિપલ ચેર (ઝોન B)'],
    ['Nominated – Outstanding Dentist of the Year – Below 45, Zone A', 'નોમિનેટેડ – આઉટસ્ટેન્ડિંગ ડેન્ટિસ્ટ ઓફ ધ યર – ૪૫ વર્ષથી ઓછી ઉંમર, ઝોન A'],
    ['ICOI Presentation Ceremony', 'આઈસીઓઆઈ પ્રેઝન્ટેશન સેરેમની'],
    ['Supporting Event Photograph', 'સહાયક ઇવેન્ટ ફોટોગ્રાફ'],
    ['Diplomate', 'ડિપ્લોમેટ'],
    ['Fellowship', 'ફેલો'],
    ['Fellow', 'ફેલો'],
    ['Dr. Vipul Pravinbhai Gothi', 'ડૉ. વિપુલ પ્રવીણભાઈ ગોઠી'],
    ['Dr. Vipul Gothi (Patel Dental Hospital)', 'ડૉ. વિપુલ ગોઠી (પટેલ ડેન્ટલ હોસ્પિટલ)'],
    ['Dr. Vipul Gothi', 'ડૉ. વિપુલ ગોઠી'],
    ['Dr. Kinjal Bhanderi', 'ડૉ. કિંજલ ભંડેરી'],
    ['Dr. Kinjal Gothi', 'ડૉ. કિંજલ ગોઠી'],
    ['Patel Dental Hospital', 'પટેલ ડેન્ટલ હોસ્પિટલ'],
    ['ISOI', 'આઈએસઓઆઈ'],
    ['ICOI', 'આઈસીઓઆઈ'],
    ['FAMDENT', 'ફેમડેન્ટ'],
    ['January', 'જાન્યુઆરી'],
    ['February', 'ફેબ્રુઆરી'],
    ['March', 'માર્ચ'],
    ['April', 'એપ્રિલ'],
    ['May', 'મે'],
    ['June', 'જૂન'],
    ['July', 'જુલાઈ'],
    ['August', 'ઓગસ્ટ'],
    ['September', 'સપ્ટેમ્બર'],
    ['October', 'ઓક્ટોબર'],
    ['November', 'નવેમ્બર'],
    ['December', 'ડિસેમ્બર']
  ];

  for (const [target, replacement] of replacements) {
    res = res.split(target as string).join(replacement);
  }

  const guDigits = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'];
  res = res.replace(/[0-9]/g, (d) => guDigits[parseInt(d, 10)]);
  return res;
}

export function getAwardCaption(id: string, imageUrl: string, language: 'en' | 'gu' = 'en', awardItem?: Partial<AwardItem>): AwardCaption | null {
  let matchedId = id;
  if (!captionsEN[matchedId]) {
    const urlStr = cleanAwardImageUrl(imageUrl) || '';
    for (const [filename, mappedId] of Object.entries(filenameMap)) {
      if (urlStr.includes(filename)) {
        matchedId = mappedId;
        break;
      }
    }
  }

  if (language === 'gu') {
    if (captionsGU[matchedId]) {
      return captionsGU[matchedId];
    }
    const hasItemText = awardItem && (awardItem.title !== undefined || awardItem.subtitle !== undefined || awardItem.person_name !== undefined || awardItem.date !== undefined);
    const custom = hasItemText
      ? {
          title: awardItem.title,
          subtitle: awardItem.subtitle,
          person_name: awardItem.person_name,
          date: awardItem.date
        }
      : getAwardSavedText(id, imageUrl);

    if (custom && (custom.title || custom.subtitle || custom.person_name || custom.date)) {
      return {
        organization: localizeTextToGujarati(custom.title || ''),
        recognition: localizeTextToGujarati(custom.subtitle || ''),
        recipient: localizeTextToGujarati(custom.person_name || ''),
        date: localizeTextToGujarati(custom.date || '')
      };
    }
    return null;
  }

  // English mode: preserve exact existing behavior
  const hasItemText = awardItem && (awardItem.title !== undefined || awardItem.subtitle !== undefined || awardItem.person_name !== undefined || awardItem.date !== undefined);
  const custom = hasItemText
    ? {
        title: awardItem.title,
        subtitle: awardItem.subtitle,
        person_name: awardItem.person_name,
        date: awardItem.date
      }
    : getAwardSavedText(id, imageUrl);

  if (custom && (custom.title || custom.subtitle || custom.person_name || custom.date)) {
    return {
      organization: custom.title || '',
      recognition: custom.subtitle || '',
      recipient: custom.person_name || '',
      date: custom.date || ''
    };
  }

  return captionsEN[matchedId] || null;
}
