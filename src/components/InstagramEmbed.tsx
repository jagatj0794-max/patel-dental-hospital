import React, { useEffect } from 'react';
import { Play } from 'lucide-react';

interface InstagramEmbedProps {
  url: string;
  title?: string;
  thumbnail?: string;
  onLoad?: () => void;
}

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ 
  url, 
  title,
  thumbnail,
  onLoad
}) => {
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  // Helper to extract Reel/Post ID from Instagram URL
  const getInstagramId = (link: string): string | null => {
    if (!link) return null;
    const match = link.match(/instagram\.com\/(?:reel|p|tv)\/([a-zA-Z0-9_-]+)/i);
    return match ? match[1] : null;
  };

  const reelId = getInstagramId(url);
  const cleanReelUrl = reelId ? `https://www.instagram.com/reel/${reelId}/` : url;

  // Determine if it has an admin-uploaded custom thumbnail
  const isCustomThumbnail = !!(thumbnail && thumbnail.trim());

  return (
    <a
      href={cleanReelUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-[240px] mx-auto group focus:outline-none"
    >
      <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 shadow-[0_6px_18px_rgba(0,0,0,0.22)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-center">
        
        {/* Thumbnail Background */}
        {isCustomThumbnail ? (
          <img
            src={thumbnail}
            alt={title || "Instagram Reel"}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          /* Branded Fallback Background when no thumbnail is uploaded */
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#11B5D8] to-[#0D9488] opacity-95 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
          </>
        )}

        {/* Subtle dark gradient overlay for play button contrast */}
        {!isCustomThumbnail && (
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        )}

        {/* Centered Play Button ONLY */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-black/35 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-[#0D9488] group-hover:border-[#0D9488] duration-300 transition-all">
            <Play className="h-5 w-5 fill-current translate-x-0.5 text-white" />
          </div>
        </div>

      </div>
    </a>
  );
};

export default InstagramEmbed;
