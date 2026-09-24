"use client";

import { useEffect, useRef } from "react";

export default function DemoVideo({
  webm,
  mp4,
  poster,
  label,
}: {
  webm: string;
  mp4: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label={label}
      className="w-full rounded-lg border border-line"
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
