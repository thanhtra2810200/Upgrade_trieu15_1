import { useRef, useEffect } from 'react';
import type { VideoItem } from '@/data/videoData';

interface VideoCardProps {
  video: VideoItem;
}

export default function VideoCard({ video }: VideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const el = videoRef.current;
    if (!container || !el) return;

    const tryPlay = () => {
      el.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (el.readyState >= 2) {
              tryPlay();
            } else {
              el.addEventListener('canplay', tryPlay, { once: true });
            }
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      el.removeEventListener('canplay', tryPlay);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative h-full w-full overflow-hidden rounded-sm bg-[#f0ebe2] transition-all duration-700 ease-out hover:-translate-y-0.5"
    >
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />

      {/* Subtle bottom gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-80" />
    </div>
  );
}
