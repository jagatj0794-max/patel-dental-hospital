import React, { useState } from 'react';
import { Instagram, Play, ExternalLink } from 'lucide-react';

interface InstagramEmbedProps {
  url: string;
  thumbnailUrl?: string;
  title?: string;
}

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
  url,
  thumbnailUrl,
  title
}) => {
  const [played, setPlayed] = useState(false);

  // Helper to extract Reel/Post ID from Instagram URL
  const getInstagramId = (link: string): string | null => {
    if (!link) return null;
    const match = link.match(/instagram\.com\/(?:reel|p|tv)\/([a-zA-Z0-9_-]+)/i);
    return match ? match[1] : null;
  };

  const reelId = getInstagramId(url);
  const fallbackThumbnail = thumbnailUrl || 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800';

  if (!reelId) {
    return (
      <div className="aspect-[9/16] w-full max-h-[480px] bg-slate-100 rounded-2xl flex flex-col items-center justify-center border border-dashed border-slate-200 p-4 text-center">
        <Instagram className="h-8 w-8 text-slate-400 mb-2" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Please provide a valid Instagram Reel URL</span>
      </div>
    );
  }

  const embedUrl = `https://www.instagram.com/reel/${reelId}/embed`;

  return (
    <div className="relative aspect-[9/16] w-full max-h-[480px] sm:max-h-[500px] overflow-hidden rounded-2xl bg-slate-950 border border-slate-150 shadow-md group flex flex-col justify-between">
      {!played ? (
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-4">
          {/* Top Info */}
          <div className="flex items-center justify-between pointer-events-none">
            <span className="text-[10px] font-black text-white uppercase tracking-wider block bg-black/60 border border-white/20 px-2.5 py-1 rounded-md shadow-xs backdrop-blur-xs flex items-center gap-1">
              <Instagram className="h-3 w-3 text-[#E1306C]" /> Reel Preview
            </span>
          </div>

          {/* Background Image / Thumbnail */}
          <img
            src={fallbackThumbnail}
            alt={title || "Instagram Reel Preview"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] -z-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-300 -z-10" />

          {/* Centered Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setPlayed(true)}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-white/95 text-teal-600 shadow-xl group-hover:scale-110 transition-all duration-300 hover:bg-white cursor-pointer"
              aria-label="Play Reel Embed"
            >
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            </button>
          </div>

          {/* Bottom Action Area */}
          <div className="w-full mt-auto flex flex-col gap-2 z-10">
            {title && (
              <p className="text-xs font-black text-white drop-shadow-sm text-left line-clamp-2">
                {title}
              </p>
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#E1306C] hover:bg-[#C13584] text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span>View on Instagram</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          {/* Embed iframe */}
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            allowtransparency="true"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          />
          
          {/* Overlay small bar with direct Link option just in case of any loading failure or user convenience */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-[90%] flex items-center justify-between gap-2 px-3 py-1.5 bg-black/80 rounded-xl border border-white/10 shadow-lg">
            <span className="text-[9px] text-white/80 font-bold flex items-center gap-1">
              <Instagram className="h-2.5 w-2.5 text-[#E1306C]" /> Embed Mode
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 bg-[#E1306C] hover:bg-[#C13584] text-white text-[9px] font-extrabold uppercase tracking-wider rounded-md transition flex items-center gap-1 cursor-pointer"
            >
              <span>View Original</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramEmbed;
