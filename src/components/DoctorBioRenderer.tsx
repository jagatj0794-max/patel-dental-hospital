import React from 'react';
import { 
  UserCheck, ShieldCheck, GraduationCap, Microscope, Award, Clock, BookOpen, CheckCircle2, ChevronDown
} from 'lucide-react';

interface Block {
  type: 'paragraph' | 'list' | 'subheading';
  content?: string;
  items?: string[];
}

interface Section {
  title?: string;
  blocks: Block[];
}

const KNOWN_HEADERS = [
  'professional profile',
  'professional profile:',
  'professional memberships',
  'professional memberships:',
  'memberships',
  'memberships:',
  'advanced training, fellowships & certifications',
  'advanced training, fellowships & certifications:',
  'advanced training & fellowships',
  'advanced training & fellowships:',
  'advanced training and fellowships',
  'advanced training and fellowships:',
  'training & fellowships',
  'training & fellowships:',
  'fellowships & training',
  'fellowships & training:',
  'fellowships',
  'fellowships:',
  'advanced training',
  'advanced training:',
  'research',
  'research:',
  'research & publications',
  'research & publications:',
  'publications',
  'publications:',
  'awards & recognition',
  'awards & recognition:',
  'awards and recognition',
  'awards and recognition:',
  'awards',
  'awards:',
  'clinical experience',
  'clinical experience:',
  'experience',
  'experience:',
  'qualifications',
  'qualifications:',
  'qualifications & credentials',
  'qualifications & credentials:',
  'education & qualifications',
  'education & qualifications:',
  'clinical expertise',
  'clinical expertise:',
  'specializations',
  'specializations:',
  'key clinical focus',
  'key clinical focus:',
  'leadership & management',
  'leadership & management:',
  'leadership and management',
  'leadership and management:',
  'personal philosophy',
  'personal philosophy:'
];

function getSectionIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes('membership')) return <ShieldCheck className="h-5 w-5 text-[#0D9488]" />;
  if (lower.includes('training') || lower.includes('fellowship') || lower.includes('certification') || lower.includes('qualification') || lower.includes('education')) {
    return <GraduationCap className="h-5 w-5 text-[#0ea5e9]" />;
  }
  if (lower.includes('research') || lower.includes('publication')) return <Microscope className="h-5 w-5 text-[#0ea5e9]" />;
  if (lower.includes('award') || lower.includes('recognition')) return <Award className="h-5 w-5 text-amber-500" />;
  if (lower.includes('experience')) return <Clock className="h-5 w-5 text-[#0D9488]" />;
  if (lower.includes('leadership') || lower.includes('management')) return <ShieldCheck className="h-5 w-5 text-[#0ea5e9]" />;
  if (lower.includes('philosophy')) return <BookOpen className="h-5 w-5 text-[#0D9488]" />;
  if (lower.includes('profile')) return <UserCheck className="h-5 w-5 text-[#0ea5e9]" />;
  return <BookOpen className="h-5 w-5 text-[#0ea5e9]" />;
}

interface AccordionItem {
  title: string;
  blocks: Block[];
  description?: string;
}

function AdvancedTrainingAccordion({ items }: { items: AccordionItem[] }) {
  const [openStates, setOpenStates] = React.useState<Record<number, boolean>>({});

  const toggle = (idx: number) => {
    setOpenStates(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="space-y-4 w-full mt-2">
      {items.map((item, idx) => {
        const isOpen = !!openStates[idx];
        return (
          <div 
            key={idx} 
            className="border border-slate-200/85 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Accordion Trigger */}
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full px-5 pt-4 pb-2 flex items-center justify-between text-left font-display text-[#0B1B33] hover:bg-slate-50/50 transition-colors duration-200 select-none cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
                <span className="w-1.5 h-4 bg-[#0D9488] rounded-full inline-block shrink-0" />
                <span className="block font-black text-sm sm:text-base text-slate-800 leading-snug">
                  {item.title}
                </span>
              </div>
              <ChevronDown 
                className={`h-5 w-5 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'transform rotate-180 text-[#0D9488]' : ''}`} 
              />
            </button>

            {/* Always-visible description directly below heading */}
            {item.description && (
              <div className="pl-[38px] pr-5 pb-4">
                <p className="text-slate-600 font-sans text-sm sm:text-[14.5px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}

            {/* Accordion Content */}
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-[5000px] opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="p-4 sm:p-5 bg-slate-50/40 space-y-3">
                {item.blocks.map((block, bIdx) => {
                  if (block.type === 'paragraph' && block.content) {
                    return (
                      <p key={bIdx} className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line">
                        {block.content}
                      </p>
                    );
                  } else if (block.type === 'list' && block.items && block.items.length > 0) {
                    return (
                      <ul key={bIdx} className="grid grid-cols-1 gap-2.5">
                        {block.items.map((bullet, iIdx) => (
                          <li key={iIdx} className="bg-white border border-slate-100 rounded-xl p-3 sm:p-3.5 flex items-start space-x-3 text-gray-800 font-sans text-sm sm:text-base leading-relaxed hover:border-slate-200 hover:bg-slate-50/50 transition-all duration-200 group">
                            <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                            <span className="flex-1 font-sans font-medium text-slate-700">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function DoctorBioRenderer({ bioText, doctorName }: { bioText?: string; doctorName?: string }) {
  const [clinicalExpanded, setClinicalExpanded] = React.useState(false);

  if (!bioText || !bioText.trim()) {
    return (
      <p className="text-gray-400 italic text-sm">
        Clinical biography details for {doctorName || 'Doctor'}.
      </p>
    );
  }

  const normalized = bioText.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');

  const isDividerLine = (line: string): boolean => {
    const trimmed = line.trim();
    return /^={3,}/.test(trimmed) || /^-{3,}/.test(trimmed) || /^\*{3,}/.test(trimmed);
  };

  const isHeaderLine = (line: string): boolean => {
    const trimmed = line.trim().replace(/^#+\s*/, '').replace(/^\*\*|\*\*$/g, '').trim();
    if (!trimmed) return false;
    if (isDividerLine(line)) return false;

    const cleanLower = trimmed.toLowerCase();
    
    if (KNOWN_HEADERS.includes(cleanLower) || KNOWN_HEADERS.includes(cleanLower + ':')) {
      return true;
    }

    // Check if line is ALL CAPS and short enough to be a section header
    const cleanLetters = trimmed.replace(/[^a-zA-Z0-9]/g, '');
    const upperCount = (trimmed.match(/[A-Z]/g) || []).length;
    const lowerCount = (trimmed.match(/[a-z]/g) || []).length;
    if (cleanLetters.length > 3 && upperCount > 4 && lowerCount === 0 && trimmed.length < 80) {
      return true;
    }

    if (trimmed.endsWith(':') && trimmed.length < 60 && !trimmed.includes('.')) {
      return true;
    }

    return false;
  };

  const isBulletLine = (line: string): boolean => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    if (/^[•\-\*\+–—>]\s*/.test(trimmed)) return true;
    if (/^\d+[\.\)]\s+/.test(trimmed)) return true;
    if (/^[a-zA-Z][\.\)]\s+/.test(trimmed)) return true;
    return false;
  };

  const isSubheadingLine = (line: string): boolean => {
    const trimmed = line.trim();
    if (trimmed.startsWith('###')) return true;
    if (trimmed.startsWith('**') && trimmed.endsWith('**') && !isHeaderLine(line)) return true;
    if (/^\d+\.\s+/.test(trimmed) && !isBulletLine(line)) return true;
    return false;
  };

  const cleanSubheadingLine = (line: string): string => {
    return line.trim()
      .replace(/^###\s*/, '')
      .replace(/^\*\*|\*\*$/g, '')
      .trim();
  };

  const cleanBulletLine = (line: string): string => {
    return line
      .trim()
      .replace(/^[•\-\*\+–—>]\s*/, '')
      .replace(/^\d+[\.\)]\s+/, '')
      .replace(/^[a-zA-Z][\.\)]\s+/, '')
      .trim();
  };

  const sections: Section[] = [];
  let currentSection: Section = { title: undefined, blocks: [] };
  let currentList: string[] = [];
  let currentParaLines: string[] = [];

  const flushPara = () => {
    if (currentParaLines.length > 0) {
      currentSection.blocks.push({
        type: 'paragraph',
        content: currentParaLines.join('\n')
      });
      currentParaLines = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      currentSection.blocks.push({
        type: 'list',
        items: [...currentList]
      });
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed || isDividerLine(line)) {
      flushList();
      flushPara();
      continue;
    }

    if (isHeaderLine(line)) {
      flushList();
      flushPara();

      if (currentSection.blocks.length > 0 || currentSection.title) {
        sections.push(currentSection);
      }

      const cleanTitle = trimmed
        .replace(/^#+\s*/, '')
        .replace(/^\*\*|\*\*$/g, '')
        .replace(/:$/, '')
        .trim();

      currentSection = {
        title: cleanTitle,
        blocks: []
      };
      continue;
    }

    if (isSubheadingLine(line)) {
      flushList();
      flushPara();
      currentSection.blocks.push({
        type: 'subheading',
        content: cleanSubheadingLine(line)
      });
      continue;
    }

    if (isBulletLine(line)) {
      flushPara();
      currentList.push(cleanBulletLine(line));
      continue;
    }

    if (currentList.length > 0) {
      flushList();
    }
    currentParaLines.push(trimmed);
  }

  flushList();
  flushPara();

  if (currentSection.blocks.length > 0 || currentSection.title) {
    sections.push(currentSection);
  }

  if (sections.length === 1 && !sections[0].title) {
    sections[0].title = 'Professional Profile';
  }

  // Ensure absolute correct ordering and uniqueness of sections for Dr. Kinjal Patel's profile
  if (doctorName && doctorName.toLowerCase().includes('kinjal')) {
    const desiredOrder = [
      'professional profile',
      'professional memberships',
      'personal philosophy',
      'advanced training, fellowships & certifications',
      'leadership & management',
      'clinical experience',
      'awards & recognition'
    ];
    
    // Deduplicate: Keep only the first section for each unique title key
    const seen = new Set<string>();
    const uniqueSections: Section[] = [];
    sections.forEach(sec => {
      const titleLower = (sec.title || '').toLowerCase().trim();
      if (!seen.has(titleLower)) {
        seen.add(titleLower);
        uniqueSections.push(sec);
      }
    });

    // Replace the sections array
    sections.length = 0;
    sections.push(...uniqueSections);
    
    sections.sort((a, b) => {
      const titleA = (a.title || '').toLowerCase().trim();
      const titleB = (b.title || '').toLowerCase().trim();
      
      const idxA = desiredOrder.findIndex(item => titleA.startsWith(item) || item.startsWith(titleA) || titleA.includes(item));
      const idxB = desiredOrder.findIndex(item => titleB.startsWith(item) || item.startsWith(titleB) || titleB.includes(item));
      
      const realIdxA = idxA === -1 ? 999 : idxA;
      const realIdxB = idxB === -1 ? 999 : idxB;
      
      return realIdxA - realIdxB;
    });
  }

  return (
    <div className="space-y-8">
      {sections.map((section, sIdx) => {
        const isAdvancedTraining = section.title && (
          section.title.toLowerCase().includes('advanced training') ||
          section.title.toLowerCase().includes('fellowship') ||
          section.title.toLowerCase().includes('certification')
        );

        let renderedContent = null;
        if (isAdvancedTraining) {
          let accordionItems: AccordionItem[] = [];

          if (doctorName && doctorName.toLowerCase().includes('vipul')) {
            // Collect all bullet list items in this section
            const allItems: string[] = [];
            section.blocks.forEach((block) => {
              if (block.type === 'list' && block.items) {
                allItems.push(...block.items);
              }
            });

            const group1: string[] = [];
            const group2: string[] = [];
            const group3: string[] = [];
            const group4: string[] = [];

            allItems.forEach((item) => {
              const clean = item.trim();
              if (!clean) return;

              if (
                clean.includes('Ricardo Kern') ||
                clean.includes('Jose Carlos') ||
                clean.includes('Nelson Pinto')
              ) {
                group4.push(item);
              } else if (
                clean.includes('Costa Nicolopoulos') ||
                clean.includes('Jack T. Krauser') ||
                clean.includes('Rudberg Omri') ||
                clean.includes('Isaac Tawil')
              ) {
                group3.push(item);
              } else if (
                clean.includes('Prosthodontics') ||
                clean.includes('Richard Martin') ||
                clean.includes('Kleanthis') ||
                clean.includes('Byungho Choi')
              ) {
                group2.push(item);
              } else {
                group1.push(item);
              }
            });

            accordionItems = [
              {
                title: "Advanced implant surgery training (12 programmes)",
                description: "Useful for those patients who do not have enough bone for full mouth rehabilitation.",
                blocks: [{ type: 'list', items: group1 }]
              },
              {
                title: "Digital and guided surgery (4 programmes)",
                description: "Bloodless and sutureless, with accurate dental implant placement in the prosthetic position.",
                blocks: [{ type: 'list', items: group2 }]
              },
              {
                title: "Immediate loading and same-day teeth (4 programmes)",
                description: "To give implant-supported fixed teeth in one week, which is exclusively done by Dr. Vipul Patel.",
                blocks: [{ type: 'list', items: group3 }]
              },
              {
                title: "Soft tissue and aesthetics (3 programmes)",
                description: "Plastic surgery of gums and face, mouth opening surgery for patients who have insufficient mouth opening due to pan masala chewing.",
                blocks: [{ type: 'list', items: group4 }]
              }
            ];
          } else if (doctorName && doctorName.toLowerCase().includes('kinjal')) {
            // Collect all bullet list items in this section
            const allItems: string[] = [];
            section.blocks.forEach((block) => {
              if (block.type === 'list' && block.items) {
                allItems.push(...block.items);
              }
            });

            const group1: string[] = []; // Implantology
            const group2: string[] = []; // Pediatric
            const group3: string[] = []; // Endodontic
            const group4: string[] = []; // Clinical/Mentorship

            allItems.forEach((item) => {
              const clean = item.trim();
              if (!clean) return;

              const lower = clean.toLowerCase();
              if (lower.includes('pediatric')) {
                group2.push(item);
              } else if (lower.includes('endodontic') || lower.includes('root canal')) {
                group3.push(item);
              } else if (lower.includes('fellowship') || lower.includes('implantology')) {
                group1.push(item);
              } else {
                group4.push(item);
              }
            });

            accordionItems = [
              {
                title: "Implantology Fellowships (2 programmes)",
                blocks: [{ type: 'list', items: group1 }]
              },
              {
                title: "Pediatric Dentistry Training & Conferences (3 programmes)",
                blocks: [{ type: 'list', items: group2 }]
              },
              {
                title: "Endodontic Training & Conferences (3 programmes)",
                blocks: [{ type: 'list', items: group3 }]
              },
              {
                title: "Clinical Training & Mentorship (2 programmes)",
                blocks: [{ type: 'list', items: group4 }]
              }
            ];
          } else {
            let currentItem: AccordionItem | null = null;
            section.blocks.forEach((block) => {
              if (block.type === 'subheading' && block.content) {
                if (currentItem) {
                  accordionItems.push(currentItem);
                }
                currentItem = { title: block.content, blocks: [] };
              } else {
                if (currentItem) {
                  currentItem.blocks.push(block);
                } else {
                  currentItem = { title: 'General Training', blocks: [block] };
                }
              }
            });
            if (currentItem) {
              accordionItems.push(currentItem);
            }
          }

          renderedContent = <AdvancedTrainingAccordion items={accordionItems} />;
        } else if (section.title && section.title.toLowerCase().includes('clinical experience') && doctorName && doctorName.toLowerCase().includes('kinjal')) {
          const listItems: string[] = [];
          section.blocks.forEach((block) => {
            if (block.type === 'list' && block.items) {
              listItems.push(...block.items);
            }
          });
          renderedContent = (
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                clinicalExpanded ? 'max-h-[800px] opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none mt-0'
              }`}
            >
              <ul className="grid grid-cols-1 gap-2.5 my-3">
                {listItems.map((item, iIdx) => (
                  <li key={iIdx} className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 sm:p-3.5 flex items-start space-x-3 text-gray-800 font-sans text-sm sm:text-base leading-relaxed hover:border-slate-200 hover:bg-slate-100/30 transition-all duration-200 group">
                    <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                    <span className="flex-1 font-sans font-medium text-slate-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        } else {
          renderedContent = (
            <div className="space-y-3.5 pl-0.5">
              {section.blocks.map((block, bIdx) => {
                if (block.type === 'paragraph' && block.content) {
                  return (
                    <p key={bIdx} className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {block.content}
                    </p>
                  );
                } else if (block.type === 'subheading' && block.content) {
                  return (
                    <h5 key={bIdx} className="font-display font-black text-sm sm:text-base text-[#0B1B33] mt-6 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-3.5 bg-[#0D9488] rounded-full inline-block" />
                      {block.content}
                    </h5>
                  );
                } else if (block.type === 'list' && block.items && block.items.length > 0) {
                  return (
                    <ul key={bIdx} className="grid grid-cols-1 gap-2.5 my-3">
                      {block.items.map((item, iIdx) => (
                        <li key={iIdx} className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 sm:p-3.5 flex items-start space-x-3 text-gray-800 font-sans text-sm sm:text-base leading-relaxed hover:border-slate-200 hover:bg-slate-100/30 transition-all duration-200 group">
                          <CheckCircle2 className="h-5 w-5 text-[#0D9488] shrink-0 mt-0.5" />
                          <span className="flex-1 font-sans font-medium text-slate-800">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </div>
          );
        }

        const isClinicalExpForKinjal = section.title && section.title.toLowerCase().includes('clinical experience') && doctorName && doctorName.toLowerCase().includes('kinjal');

        if (isClinicalExpForKinjal) {
          return (
            <div key={sIdx} className="my-8 sm:my-10 space-y-4">
              <button
                type="button"
                onClick={() => setClinicalExpanded(!clinicalExpanded)}
                className="w-full flex items-center justify-between p-4 sm:p-5 border border-slate-200 rounded-2xl bg-white shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] text-left hover:border-[#0D9488]/40 hover:shadow-md transition-all duration-300 cursor-pointer focus:outline-none group/hdr"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-2 bg-slate-100/80 rounded-xl shrink-0 group-hover/hdr:bg-[#0D9488]/5 transition-colors duration-300">
                    {getSectionIcon(section.title)}
                  </div>
                  <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase group-hover/hdr:text-[#0D9488] transition-colors duration-200">
                    {section.title}
                  </h4>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 text-slate-400 transition-transform duration-300 shrink-0 mr-1 group-hover/hdr:text-[#0D9488] ${clinicalExpanded ? 'transform rotate-180 text-[#0D9488]' : ''}`} 
                />
              </button>
              {renderedContent}
            </div>
          );
        }

        return (
          <div key={sIdx} className="space-y-4">
            {section.title && (
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/90">
                <div className="p-2 bg-slate-100/80 rounded-xl shrink-0">
                  {getSectionIcon(section.title)}
                </div>
                <h4 className="font-display font-black text-base sm:text-lg text-[#0B1B33] tracking-wide uppercase">
                  {section.title}
                </h4>
              </div>
            )}
            {renderedContent}
            {/* Removed Download full CV (PDF) link */}
          </div>
        );
      })}
    </div>
  );
}
