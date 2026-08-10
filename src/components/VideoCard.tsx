import { useRef, useEffect, useState } from 'react';
import type { VideoItem } from '@/data/videoData';

interface VideoCardProps {
  video: VideoItem;
}

export default function VideoCard({ video }: VideoCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const el = videoRef.current;

    if (!container || !el) return;

    setVideoReady(false);

    const tryPlay = () => {
      el.play().catch(() => {});
    };

    const handleLoadedData = () => {
      setVideoReady(true);
    };

    el.addEventListener('loadeddata', handleLoadedData);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (el.readyState >= 2) {
              tryPlay();
            } else {
              el.addEventListener('canplay', tryPlay, {
                once: true,
              });
            }
          } else {
            el.pause();
          }
        }
      },
      {
        threshold: 0.6,
      },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      el.removeEventListener('canplay', tryPlay);
      el.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [video.src]);

  return (
    <div
      ref={containerRef}
      className="group relative h-full w-full overflow-hidden rounded-[2px]"
    >
      {/* Actual video */}
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Poster shown while video is loading */}
      <img
        src={video.poster}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className={`pointer-events-none absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-500 ease-out ${
          videoReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Subtle bottom gradient */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-80" />
    </div>
  );
}