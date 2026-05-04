"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative z-10 pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="glass-section rounded-[48px] p-8 sm:p-12 lg:p-16 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div>
              <span className="footer-reveal block text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase text-white/40 mb-6">
                Start a Conversation
              </span>
              <h2 className="footer-reveal text-white max-w-2xl mb-0">
                Let&apos;s Refine the
                <br />
                <span className="font-light text-white/60">
                  Future Together.
                </span>
              </h2>
            </div>
            <a
              href="mailto:hello@quartz.com"
              className="footer-reveal self-start lg:self-auto px-10 py-5 rounded-full bg-white text-black text-base font-bold hover:bg-white/90 transition-all active:scale-95 shadow-xl shadow-black/20"
            >
              hello@quartz.com
            </a>
          </div>

          <div className="footer-reveal h-px bg-white/10 my-16" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="footer-reveal col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">QUARTZ</span>
              </div>
              <p className="text-sm text-white/40 max-w-sm leading-relaxed">
                Premium industrial mineral extraction and refinement. 
                Merging geological heritage with technological precision since 1998.
              </p>
            </div>
            <div className="footer-reveal">
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-6">Company</h4>
              <ul className="space-y-4">
                {["About Us", "Services", "Projects", "Safety"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-reveal">
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-6">Connect</h4>
              <ul className="space-y-4">
                {["LinkedIn", "Instagram", "Twitter", "Email"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-reveal flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-medium">
            &copy; {new Date().getFullYear()} Quartz Industries. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] text-white/30 hover:text-white uppercase tracking-widest transition-colors font-medium">Privacy</a>
            <a href="#" className="text-[10px] text-white/30 hover:text-white uppercase tracking-widest transition-colors font-medium">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
