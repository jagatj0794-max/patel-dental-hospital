import React from 'react';
import { 
  UserCheck, ShieldCheck, GraduationCap, Microscope, Award, Clock, BookOpen, CheckCircle2 
} from 'lucide-react';

interface Block {
  type: 'paragraph' | 'list';
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

export function DoctorBioRenderer({ bioText, doctorName }: { bioText?: string; doctorName?: string }) {
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
    if (/^[•\-\*\+–—>]\s+/.test(trimmed)) return true;
    if (/^\d+[\.\)]\s+/.test(trimmed)) return true;
    if (/^[a-zA-Z][\.\)]\s+/.test(trimmed)) return true;
    return false;
  };

  const cleanBulletLine = (line: string): string => {
    return line
      .trim()
      .replace(/^[•\-\*\+–—>]\s+/, '')
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

  return (
    <div className="space-y-8">
      {sections.map((section, sIdx) => (
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

          <div className="space-y-3.5 pl-0.5">
            {section.blocks.map((block, bIdx) => {
              if (block.type === 'paragraph' && block.content) {
                return (
                  <p key={bIdx} className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {block.content}
                  </p>
                );
              } else if (block.type === 'list' && block.items && block.items.length > 0) {
                return (
                  <ul key={bIdx} className="grid grid-cols-1 gap-2.5 my-3">
                    {block.items.map((item, iIdx) => (
                      <li key={iIdx} className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 sm:p-3.5 flex items-start space-x-3 text-gray-800 font-sans text-sm sm:text-base leading-relaxed hover:border-slate-200 transition-colors">
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
        </div>
      ))}
    </div>
  );
}
