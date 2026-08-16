import React, { useState, useEffect, useRef } from 'react';

interface Mp4ReelPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  containerClassName?: string;
}

export const Mp4ReelPlayer: React.FC<Mp4ReelPlayerProps> = ({
  src,
  poster,
  className = "w-full h-full object-cover rounded-xl",
  containerClassName = "aspect-[9/16] w-full max-w-[240px] mx-auto rounded-2xl overflow-hidden bg-black border border-slate-100/80 shadow-[0_6px_18px_rgba(0,0,0,0.22)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 transition-all duration-300"
}) => {
  const [posterUrl, setPosterUrl] = useState<string | undefined>(poster);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;

    let isMounted = true;
    let video: HTMLVideoElement | null = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.src = src;
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    const cleanup = () => {
      if (video) {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('seeked', handleSeeked);
        video.removeEventListener('error', handleError);
        video.pause();
        video.removeAttribute('src');
        video.load();
        video = null;
      }
    };

    const handleLoadedData = () => {
      if (video) {
        // Seek to 0.5s to capture a valid non-blank frame
        video.currentTime = 0.5;
      }
    };

    const handleSeeked = () => {
      if (!isMounted || !video) return;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 720;
        canvas.height = video.videoHeight || 1280;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          if (dataUrl && dataUrl.length > 100) {
            setPosterUrl(dataUrl);
          }
        }
      } catch {
        // CORS or canvas extraction fallback - silent
      } finally {
        cleanup();
      }
    };

    const handleError = () => {
      cleanup();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('error', handleError);

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [src]);

  const handlePlay = () => {
    // If the video was at the media fragment timestamp (0.5s) before playing, reset to start 0:00
    if (videoRef.current && !hasStartedPlaying) {
      if (videoRef.current.currentTime >= 0.4 && videoRef.current.currentTime <= 0.6) {
        videoRef.current.currentTime = 0;
      }
      setHasStartedPlaying(true);
    }
  };

  // Append #t=0.5 so standard HTML5 video player also defaults to 0.5s frame natively before play
  const effectiveSrc = src ? (src.includes('#t=') ? src : `${src}#t=0.5`) : src;

  return (
    <div className={containerClassName}>
      <video
        ref={videoRef}
        src={effectiveSrc}
        poster={poster || posterUrl}
        controls
        playsInline
        className={className}
        preload="metadata"
        onPlay={handlePlay}
      />
    </div>
  );
};

export default Mp4ReelPlayer;
