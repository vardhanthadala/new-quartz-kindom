"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Entrance stagger ── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.8 });
      tl.fromTo(headingRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 })
        .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.7")
        .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3");

      /* ── Parallax: content moves up faster on scroll ── */
      gsap.to(sectionRef.current, {
        y: -150,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ── Scroll indicator bounce ── */
      gsap.to(scrollRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 sm:px-8"
    >
      <h1 ref={headingRef} className="text-white drop-shadow-2xl mb-6 max-w-5xl">
        Crafting Purity,
        <br />
        <span className="font-light text-white/80">Defining Excellence.</span>
      </h1>

      <p
        ref={subRef}
        className="text-white/70 max-w-2xl mx-auto mb-10 text-lg sm:text-xl md:text-2xl font-light"
      >
        World-class quartz mining &amp; processing — 25 years of
        unmatched expertise, delivering 99.9% purity to global markets.
      </p>

      <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#products"
          className="px-8 py-3.5 rounded-full bg-white text-slate-900 text-sm sm:text-base font-semibold hover:bg-white/90 transition-all active:scale-95 shadow-lg shadow-black/20"
        >
          Explore Products
        </a>
        <a
          href="#about"
          className="px-8 py-3.5 rounded-full border border-white/30 text-white text-sm sm:text-base font-medium hover:bg-white/10 transition-all active:scale-95"
        >
          Our Story
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
