/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const INTERNAL_CATEGORIES = new Set<string>([
  'Homepage Gallery',
  'Homepage Slider',
  'Hidden',
  ''
]);

/**
 * Returns true if the category is non-empty and not in INTERNAL_CATEGORIES.
 */
export function isPublicCategory(category: string | undefined | null): boolean {
  if (!category) return false;
  const trimmed = category.trim();
  return trimmed !== '' && !INTERNAL_CATEGORIES.has(trimmed);
}

const CATEGORY_MAP: Record<string, { en: string; gu: string }> = {
  'All': {
    en: 'All',
    gu: 'બધા'
  },
  'Clinic Interior': {
    en: 'Clinic Interior',
    gu: 'ક્લિનિક ઇન્ટીરિયર'
  },
  'Dental Implants': {
    en: 'Dental Implants',
    gu: 'ડેન્ટલ ઇમ્પ્લાન્ટ્સ'
  },
  'Doctors': {
    en: 'Our Specialists',
    gu: 'ડેન્ટલ નિષ્ણાતો'
  },
  'Before / After': {
    en: 'Before & After',
    gu: 'સારવાર પહેલા અને પછી'
  },
  'Full Mouth Rehabilitation': {
    en: 'Full Mouth Rehab',
    gu: 'ફુલ માઉથ રિહેબિલિટેશન'
  },
  'Invisible Aligners': {
    en: 'Invisible Aligners',
    gu: 'ઇનવિઝિબલ અલાઈનર્સ'
  },
  'Root Canal': {
    en: 'Root Canal',
    gu: 'રૂટ કેનાલ'
  },
  'Smile Makeover': {
    en: 'Smile Makeover',
    gu: 'સ્માઇલ મેકઓવર'
  },
  'Patient Testimonials': {
    en: 'Patient Stories',
    gu: 'દર્દીઓના અનુભવો'
  }
};

/**
 * Returns the visitor-facing display label for a category.
 * Unknown categories fall back to the original category string.
 */
export function getCategoryLabel(category: string, isGujarati: boolean = false): string {
  if (!category) return '';
  const trimmed = category.trim();
  const match = CATEGORY_MAP[trimmed];
  if (match) {
    return isGujarati ? match.gu : match.en;
  }
  return category;
}

const BRANCH_MAP: Record<string, { en: string; gu: string }> = {
  'Amin Marg Branch': {
    en: 'Amin Marg Branch',
    gu: 'એમિન માર્ગ બ્રાન્ચ'
  },
  'Gayatrinagar Branch': {
    en: 'Gayatrinagar Branch',
    gu: 'ગાયત્રીનગર બ્રાન્ચ'
  }
};

/**
 * Returns the visitor-facing display label for a branch.
 * 'All Branches' and '' return empty string (not displayed).
 * Unknown values fall back to the original string.
 */
export function getBranchLabel(branch: string | undefined | null, isGujarati: boolean = false): string {
  if (!branch) return '';
  const trimmed = branch.trim();
  if (trimmed === '' || trimmed === 'All Branches') {
    return '';
  }
  const match = BRANCH_MAP[trimmed];
  if (match) {
    return isGujarati ? match.gu : match.en;
  }
  return branch;
}
