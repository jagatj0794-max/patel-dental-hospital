import React, { useEffect, useState } from 'react';
import { Instagram, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

interface InstagramEmbedProps {
  url: string;
  title?: string;
  onLoad?: () => void;
}

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ 
  url, 
  title,
  onLoad 
}) => {
  const [iframeError, setIframeError] = useState(false);
  const [mountKey, setMountKey] = useState(0);

  // Helper to extract Reel/Post ID from Instagram URL
  const getInstagramId = (link: string): string | null => {
    if (!link) return null;
    const match = link.match(/instagram\.com\/(?:reel|p|tv)\/([a-zA-Z0-9_-]+)/i);
    return match ? match[1] : null;
  };

  const reelId = getInstagramId(url);

  useEffect(() => {
    if (!reelId) return;

    // Standard Instagram embeds script injection
    const scriptId = 'instagram-embed-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const handleProcess = () => {
      if ((window as any).instgrm?.Embeds) {
        try {
          (window as any).instgrm.Embeds.process();
          if (onLoad) onLoad();
        } catch (e) {
          console.error("Failed to process Instagram embed:", e);
        }
      }
    };

    if ((window as any).instgrm?.Embeds) {
      handleProcess();
    } else {
      script.addEventListener('load', handleProcess);
    }

    return () => {
      if (script) {
        script.removeEventListener('load', handleProcess);
      }
    };
  }, [url, reelId]);

  if (!reelId) {
    return (
      <div className="p-4 bg-amber-50 text-amber-800 text-xs rounded-xl flex items-center gap-2">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>Invalid Instagram URL provided. Please check the URL format.</span>
      </div>
    );
  }

  const embedUrl = `https://www.instagram.com/reel/${reelId}/embed/?cr=1&v=12&rd=${encodeURIComponent(window.location.origin)}&rp=${encodeURIComponent(window.location.pathname)}&cb=${mountKey}`;
  const cleanReelUrl = `https://www.instagram.com/reel/${reelId}/`;

  if (iframeError) {
    return (
      <div className="p-5 bg-slate-100 text-slate-700 text-center rounded-xl border border-slate-200 shadow-2xs max-w-[430px] mx-auto">
        <AlertCircle className="h-5 w-5 text-slate-500 mx-auto mb-2" />
        <h4 className="text-xs font-black text-[#081C3A] uppercase tracking-wider mb-1">Unable to Load Embed</h4>
        <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
          Due to privacy settings or cross-origin restrictions, this Instagram reel could not load in the frame.
        </p>
        <div className="flex items-center justify-center gap-2">
          <button 
            onClick={() => { setIframeError(false); setMountKey(prev => prev + 1); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-[#0D9488] text-white rounded-lg hover:bg-[#0F766E] transition-colors shadow-2xs cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" /> Retry
          </button>
          <a 
            href={cleanReelUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Watch on Instagram <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full max-w-[430px] mx-auto overflow-hidden rounded-xl bg-transparent" 
      style={{ background: 'transparent', backgroundColor: 'transparent' }}
    >
      <iframe
        key={mountKey}
        src={embedUrl}
        title={title || "Instagram Video"}
        className="instagram-media w-full h-[460px] sm:h-[480px] border-0 rounded-xl overflow-hidden"
        allowtransparency="true"
        style={{ background: 'transparent', backgroundColor: 'transparent' }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        onError={() => setIframeError(true)}
      />
    </div>
  );
};

export default InstagramEmbed;
