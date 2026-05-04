"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.08,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 py-28 sm:py-36 md:py-44"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Glass container */}
        <div className="glass-section rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="about-reveal mb-6">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase text-white/40">
              Established 1998
            </span>
          </div>

          <h2 className="about-reveal text-white max-w-3xl mb-8">
            Quartz Kingdom:
            <br />
            <span className="font-light text-white/60">The Global Standard.</span>
          </h2>

          <div className="about-reveal w-20 h-px bg-white/20 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <div className="about-reveal">
              <p className="text-white/70 mb-6">
                Since 1998, Quartz Kingdom has established the global standard for
                industrial mineral extraction. We are dedicated to delivering pristine
                quality, merging raw earth with cutting-edge refinement technology.
              </p>
              <p className="text-white/60">
                Our process strips away imperfection, unlocking materials essential to
                the world&apos;s most demanding industries — from advanced semiconductor
                manufacturing to architectural surfaces of unparalleled elegance.
              </p>
            </div>

            <div className="about-reveal space-y-8">
              {[
                { title: "Sustainable Mining", desc: "Eco-conscious extraction preserving natural landscapes for future generations." },
                { title: "Precision Processing", desc: "State-of-the-art facilities ensuring consistent 99.9% purity across every batch." },
                { title: "Global Distribution", desc: "Reliable logistics serving 40+ countries with on-time delivery." },
              ].map((item) => (
                <div key={item.title} className="flex gap-5 items-start group">
                  <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/70 transition-colors" />
                  </div>
                  <div>
                    <h3 className="!text-lg !font-semibold mb-1 text-white/90">{item.title}</h3>
                    <p className="!text-sm text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image row */}
          <div className="about-reveal grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-white/5">
              <img src="/raw_quartz_cluster.png" alt="Raw Quartz" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-white/5">
              <img src="/refinement_machinery.png" alt="Refinement" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-white/5">
              <img src="/innovation_wafer.png" alt="Innovation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
