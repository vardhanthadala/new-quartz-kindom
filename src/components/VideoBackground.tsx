"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Parallax: video moves slightly for depth ── */
      gsap.fromTo(
        videoRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden" 
      style={{ zIndex: -1 }}
    >
      {/* Video Layer - Increased height to handle parallax movement without gaps */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-[-10%] left-0 w-full h-[120%] object-cover will-change-transform"
        style={{ transform: "translateZ(0)" }}
      >
        <source src="/bg-video-quartz.mp4" type="video/mp4" />
      </video>

      {/* 
        Smooth Gradient Overlay (Requirement 2)
        Fades from transparent at top to a subtle dark middle, then deep dark at bottom.
        This ensures readability and a seamless transition into the footer area.
      */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.95) 100%)",
          zIndex: 1,
        }}
      />
    </div>
  );
}
