# -*- coding: utf-8 -*-
import os

filepath = 'src/pages/ServiceDetail.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Insert Component Definitions right before export default function ServiceDetail
insertion_point = 'export default function ServiceDetail({'
components_code = """
interface FaqItem {
  question: string;
  answer: string;
}

const ClinicalFaqAccordion: React.FC<{
  eyebrow: string;
  heading: string;
  faqs: FaqItem[];
  expandedIdx: number | null;
  onToggle: (idx: number | null) => void;
  id: string;
}> = ({ eyebrow, heading, faqs, expandedIdx, onToggle, id }) => {
  return (
    <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10 mt-8 sm:mt-12 lg:mt-16 text-center" id={id}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      <div className="space-y-3 max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0D9488] uppercase tracking-widest px-3 py-1 bg-teal-50/80 rounded-full border border-teal-100/60 font-sans">
          {eyebrow}
        </span>
        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
          {heading}
        </h2>
        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
      </div>

      <div className="max-w-[1100px] mx-auto space-y-4 text-left">
        {faqs.map((faq, idx) => {
          const isExpanded = expandedIdx === idx;
          return (
            <div
              key={idx}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                isExpanded
                  ? 'border-[#0D9488] shadow-sm'
                  : 'border-slate-200/80 hover:border-slate-300 shadow-3xs'
              }`}
            >
              <button
                type="button"
                onClick={() => onToggle(isExpanded ? null : idx)}
                aria-expanded={isExpanded}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50/40 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
              >
                <span className={`font-sans font-bold text-base sm:text-lg leading-snug pr-4 transition-colors duration-200 ${
                  isExpanded ? 'text-[#0D9488]' : 'text-[#081C3A]'
                }`}>
                  {faq.question}
                </span>
                <span className={`p-1.5 rounded-lg shrink-0 transition-all duration-300 ${
                  isExpanded ? 'bg-teal-50 text-[#0D9488] rotate-180' : 'bg-slate-100 text-slate-500'
                }`}>
                  <ChevronDown className="h-4.5 w-4.5" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 bg-slate-50/20">
                      <p className="font-medium font-sans">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface BenefitCard {
  title: string;
  description: string;
}

const ClinicalWhyPatelSection: React.FC<{
  heading: string;
  description: string;
  cards: BenefitCard[];
  id: string;
}> = ({ heading, description, cards, id }) => {
  return (
    <div className="bg-[#F8FAFC] border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-10" id={id}>
      <div className="space-y-3 max-w-3xl mx-auto text-center">
        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center uppercase">
          {heading}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
          {description}
        </p>
        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="relative w-full bg-white border border-[#E8EEF5] rounded-[22px] p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-[#14B8A6] transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.015] overflow-hidden flex flex-col h-full"
          >
            <div className="absolute left-0 top-8 bottom-8 w-[4px] rounded-r-[4px] bg-gradient-to-b from-[#14B8A6] to-[#06B6D4]" />
            <h3 className="font-sans font-bold text-[#081C3A] text-lg sm:text-xl tracking-tight mt-0 mb-3 leading-tight pl-2 uppercase">
              {card.title}
            </h3>
            <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-medium flex-1 pl-2">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TimelineStep {
  num: number;
  title: string;
  description: string;
}

const ClinicalTimelineSection: React.FC<{
  heading: string;
  description: string;
  steps: TimelineStep[];
  id: string;
}> = ({ heading, description, steps, id }) => {
  const isThree = steps.length === 3;
  return (
    <div className="bg-white border border-[#E8EEF5] rounded-[32px] p-8 sm:p-12 space-y-8 sm:space-y-12 mt-8 sm:mt-12 lg:mt-16 text-center" id={id}>
      <div className="space-y-3 max-w-3xl mx-auto text-center">
        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#081C3A] tracking-tight leading-tight text-center">
          {heading}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium text-center">
          {description}
        </p>
        <div className="h-1 w-12 bg-[#0D9488] rounded-full mx-auto mt-3.5" />
      </div>

      <div className="max-w-6xl mx-auto relative px-4">
        <div className="hidden lg:block absolute top-[40px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-teal-500/20 via-teal-500 to-teal-500/20 z-0" />
        <div className="lg:hidden absolute left-[50%] -translate-x-[50%] top-10 bottom-10 w-[2px] bg-gradient-to-b from-teal-500/20 via-teal-500 to-teal-500/20 z-0" />
        
        <div className={`grid grid-cols-1 ${isThree ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-8 lg:gap-6 relative z-10`}>
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-center text-center space-y-4 relative group">
              <div className="w-20 h-20 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                <span className="font-sans font-black text-2xl text-[#0D9488]">{step.num}</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-sans font-extrabold text-lg text-[#081C3A] leading-tight">
                  {step.title}
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
"""

if components_code.strip() not in text:
    text = text.replace(insertion_point, components_code + "\n\n" + insertion_point)
    print("Inserted sub-component definitions.")

# 2. Safely find each FAQ block and replace it with its component call
# We will use precise python slicing or searching
def replace_block(var_name, comp_call):
    global text
    start_str = "const " + var_name + " = ("
    start_idx = text.find(start_str)
    if start_idx != -1:
        end_idx = text.find(");", start_idx)
        if end_idx != -1:
            old_block = text[start_idx:end_idx + 2]
            new_block = "const " + var_name + " = " + comp_call + ";"
            text = text.replace(old_block, new_block)
            print("Replaced " + var_name + " successfully!")
        else:
            print("Error: Could not find closing for " + var_name)
    else:
        print("Warning: Could not find start for " + var_name)

replace_block("dentalImplantFaqSection", '(<ClinicalFaqAccordion eyebrow="DENTAL IMPLANT FAQ" heading="Frequently Asked Questions About Dental Implants" faqs={dentalImplantsFaqs} expandedIdx={expandedDentalFaqIdx} onToggle={setExpandedDentalFaqIdx} id="service-implant-faq" />)')
replace_block("fullMouthFaqSection", '(<ClinicalFaqAccordion eyebrow="FULL MOUTH REHABILITATION FAQ" heading="Frequently Asked Questions About Full Mouth Rehabilitation" faqs={fullMouthFaqs} expandedIdx={expandedFullMouthFaqIdx} onToggle={setExpandedFullMouthFaqIdx} id="fmr-faq" />)')
replace_block("alignersFaqSection", '(<ClinicalFaqAccordion eyebrow="INVISIBLE ALIGNERS FAQ" heading="Frequently Asked Questions About Invisible Aligners" faqs={alignersFaqs} expandedIdx={expandedAlignersFaqIdx} onToggle={setExpandedAlignersFaqIdx} id="aligners-faq" />)')
replace_block("rootCanalFaqSection", '(<ClinicalFaqAccordion eyebrow="ROOT CANAL TREATMENT FAQ" heading="Frequently Asked Questions About Root Canal Treatment" faqs={rootCanalFaqs} expandedIdx={expandedRootCanalFaqIdx} onToggle={setExpandedRootCanalFaqIdx} id="root-canal-faq" />)')
replace_block("smileMakeoverFaqSection", '(<ClinicalFaqAccordion eyebrow="SMILE MAKEOVER FAQ" heading="Frequently Asked Questions About Smile Makeovers" faqs={smileMakeoverFaqs} expandedIdx={expandedSmileMakeoverFaqIdx} onToggle={setExpandedSmileMakeoverFaqIdx} id="smile-makeover-faq" />)')
replace_block("crownsBridgesFaqSection", '(<ClinicalFaqAccordion eyebrow="CROWNS & BRIDGES FAQ" heading="Frequently Asked Questions About Dental Crowns & Bridges" faqs={crownsBridgesFaqs} expandedIdx={expandedCrownsBridgesFaqIdx} onToggle={setExpandedCrownsBridgesFaqIdx} id="crowns-bridges-faq" />)')
replace_block("pediatricFaqSection", '(<ClinicalFaqAccordion eyebrow="PEDIATRIC DENTISTRY FAQ" heading="Frequently Asked Questions About Pediatric Dentistry" faqs={pediatricFaqs} expandedIdx={expandedPediatricFaqIdx} onToggle={setExpandedPediatricFaqIdx} id="pediatric-faq" />)')

# 3. Remove the first copy of duplicate sections
candidate_start = text.find('/* Section 5: Who Is a Candidate for Treatment */')
google_reviews_end_marker = '                {/* Why Our Method Is Superior (Repositioned immediately after Google Reviews) */}'
google_reviews_end_index = text.find(google_reviews_end_marker)

if candidate_start != -1 and google_reviews_end_index != -1:
    print("Found duplicate block to remove.")
    # Strip from candidate_start to google_reviews_end_index
    text = text[:candidate_start] + text[google_reviews_end_index:]
    
    # 4. Update reviews config in the remaining second copy
    old_reviews_block = """                {/* Section 10: Google Patient Reviews (100% CMS-driven premium slider) */}
                {mConfig.show_google_reviews !== false && (
                  <GooglePatientReviews
                    heading={seoHeadings.reviews}
                    reviews={Array.isArray(mConfig.google_reviews) ? mConfig.google_reviews : []}
                  />
                )}"""
                
    new_reviews_block = """                {/* Section 10: Google Patient Reviews (100% CMS-driven premium slider) */}
                {mConfig.show_google_reviews !== false && (
                  <GooglePatientReviews
                    heading={seoHeadings.reviews}
                    reviews={Array.isArray(mConfig.google_reviews) && mConfig.google_reviews.length > 0
                      ? mConfig.google_reviews
                      : UNIVERSAL_GOOGLE_REVIEWS}
                  />
                )}"""
    text = text.replace(old_reviews_block, new_reviews_block)
    
    # 5. Update second cost copy gates
    old_cost_gate = """                {/* Section 9: Cost Section (100% CMS-driven, Premium Two-column card) */}
                {mConfig.show_cost !== false && (
                  <div className="pt-6 sm:pt-14 border-t border-slate-200/60 space-y-5 sm:space-y-8 animate-fade-in" id="dental-implants-cost">"""
                  
    new_cost_gate = """                {/* Section 9: Cost Section (100% CMS-driven, Premium Two-column card) */}
                {mConfig.show_cost !== false && !isDentalImplants && !isFullMouth && !isInvisibleAligners && !isRootCanal && !isSmileMakeover && !isCrownsAndBridges && !isPediatricDentistry && (
                  <div className="pt-6 sm:pt-14 border-t border-slate-200/60 space-y-5 sm:space-y-8 animate-fade-in" id="dental-implants-cost">"""
    text = text.replace(old_cost_gate, new_cost_gate)

    # Use getGlobalWhatsAppUrl in the remaining cost copy
    old_whatsapp_href = """                            href={`https://wa.me/${String(mConfig.cost_phone_number || contactInfo?.whatsapp || DEFAULT_CONTACT_INFO.whatsapp).replace(/[^\\d+]/g, '').replace('+', '')}`}"""
    new_whatsapp_href = """                            href={getGlobalWhatsAppUrl(`Hello Patel Dental Hospital, I would like to book a free consultation for "${service?.title || 'Dental Treatment'}". Please share the available appointment slots.`)}"""
    text = text.replace(old_whatsapp_href, new_whatsapp_href)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("FAQ refactoring and duplicate cleanup complete!")
