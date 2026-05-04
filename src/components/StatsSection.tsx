"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "25", suffix: "+", label: "Years of Excellence" },
  { value: "40", suffix: "+", label: "Countries Served" },
  { value: "99.9", suffix: "%", label: "Quartz Purity" },
  { value: "12", suffix: "", label: "Active Mines" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".stat-count").forEach((el) => {
        const target = parseFloat(el.getAttribute("data-value") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        const isDecimal = target % 1 !== 0;

        gsap.fromTo(
          { val: 0 },
          { val: target },
          {
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
            onUpdate: function () {
              const current = this.targets()[0].val;
              el.textContent =
                (isDecimal
                  ? current.toFixed(1)
                  : Math.round(current).toString()) + suffix;
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="glass-section rounded-[40px] py-16 sm:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 sm:gap-x-8 lg:gap-x-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`stat-item text-center ${
                  i < STATS.length - 1 ? "lg:border-r lg:border-white/10" : ""
                }`}
              >
                <div
                  className="stat-count stat-number text-white"
                  data-value={stat.value}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </div>
                <div className="stat-label text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
