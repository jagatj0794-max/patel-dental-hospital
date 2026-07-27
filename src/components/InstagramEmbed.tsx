import React, { useState, useEffect } from 'react';
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
  const [mountKey, setMountKey] = useState(() => Math.random().toString(36).substring(2, 9));

  // Helper to extract Reel/Post ID from Instagram URL
  const getInstagramId = (link: string): string | null => {
    if (!link) return null;
    const match = link.match(/instagram\.com\/(?:reel|p|tv)\/([a-zA-Z0-9_-]+)/i);
    return match ? match[1] : null;
  };

  const reelId = getInstagramId(url);

  useEffect(() => {
    if (!reelId) return;

    // Handle bfcache (Back/Forward Cache) restorations by forcing a fresh mount key
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setMountKey(Math.random().toString(36).substring(2, 9));
      }
    };
    window.addEventListener('pageshow', handlePageShow);

    // Dynamic execution / reinitialization of official Instagram embed script
    const scriptId = 'instagram-embed-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const runProcess = () => {
      if ((window as any).instgrm) {
        try {
          (window as any).instgrm.Embeds.process();
        } catch (err) {
          console.error('Error re-processing Instagram embeds:', err);
        }
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        setTimeout(runProcess, 50);
      };
      document.body.appendChild(script);
    } else {
      // Script exists, trigger the process call after a short delay
      // to let React finish rendering the new iframe in the DOM.
      setTimeout(runProcess, 100);
    }

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [url, reelId]);

  if (!reelId) {
    return null;
  }

  // Use the canonical trailing slash '/embed/' to prevent Instagram's servers 
  // from redirecting (which would cause the browser to cache the parameter-less URL).
  // Include 'rd' and 'rp' so the iframe registers its parent domain & path for security handshakes.
  const embedUrl = `https://www.instagram.com/reel/${reelId}/embed/?cr=1&v=12&rd=${encodeURIComponent(window.location.origin)}&rp=${encodeURIComponent(window.location.pathname)}&cb=${mountKey}`;
  const cleanReelUrl = `https://www.instagram.com/reel/${reelId}/`;

  if (iframeError) {
    return (
      <div 
        className="relative aspect-[9/16] w-full max-h-[500px] sm:max-h-[540px] overflow-hidden rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(8,28,58,0.03)] flex flex-col items-center justify-center p-6 text-center space-y-4 mx-auto"
        style={{ background: 'transparent', backgroundColor: 'transparent' }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-lg">
          <Instagram className="h-8 w-8" />
        </div>
        <div className="space-y-1.5">
          <h4 className="text-sm font-black text-[#081C3A]">{title || "Clinical Procedure Reel"}</h4>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
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
