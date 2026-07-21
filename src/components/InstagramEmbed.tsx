import React, { useState } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

interface InstagramEmbedProps {
  url: string;
  title?: string;
}

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
  url,
  title
}) => {
  const [iframeError, setIframeError] = useState(false);

  // Helper to extract Reel/Post ID from Instagram URL
  const getInstagramId = (link: string): string | null => {
    if (!link) return null;
    const match = link.match(/instagram\.com\/(?:reel|p|tv)\/([a-zA-Z0-9_-]+)/i);
    return match ? match[1] : null;
  };

  const reelId = getInstagramId(url);

  if (!reelId) {
    return null;
  }

  const embedUrl = `https://www.instagram.com/reel/${reelId}/embed`;
  const cleanReelUrl = `https://www.instagram.com/reel/${reelId}/`;

  if (iframeError) {
    return (
      <div className="relative aspect-[9/16] w-full max-h-[500px] sm:max-h-[540px] overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-200 shadow-md flex flex-col items-center justify-center p-6 text-center space-y-4 mx-auto">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-lg">
          <Instagram className="h-8 w-8" />
        </div>
        <div className="space-y-1.5">
          <h4 className="text-sm font-black text-white">{title || "Clinical Procedure Reel"}</h4>
          <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
            Watch Dr. Vipul Patel's procedure video directly on Instagram.
          </p>
        </div>
        <a
          href={cleanReelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E1306C] hover:bg-[#C13584] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md hover:shadow-lg active:scale-95 cursor-pointer mt-2"
        >
          <Instagram className="h-4 w-4" />
          <span>Open in Instagram</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[430px] mx-auto overflow-hidden">
      <iframe
        src={embedUrl}
        title={title || "Instagram Video"}
        className="w-full h-[460px] sm:h-[480px] border-0 rounded-xl overflow-hidden bg-white"
        allowtransparency="true"
        scrolling="no"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        onError={() => setIframeError(true)}
      />
    </div>
  );
};

export default InstagramEmbed;
