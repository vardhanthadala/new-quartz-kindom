"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: "Lumina Silicon",
    category: "Semiconductors",
    purity: "99.99%",
    desc: "Ultra-pure quartz for high-performance silicon wafers used in global microchip manufacturing.",
    image: "/innovation_wafer.png",
  },
  {
    name: "Crystal Facades",
    category: "Architecture",
    purity: "99.95%",
    desc: "Translucent quartz panels engineered for premium structural glazing and artistic interiors.",
    image: "/raw_quartz_cluster.png",
  },
  {
    name: "Industrial Core",
    category: "Glass Foundry",
    purity: "99.9%",
    desc: "High-grade industrial quartz optimized for high-temperature precision glass production.",
    image: "/refinement_machinery.png",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.1,
          }
        );
      });

      gsap.fromTo(
        ".projects-heading",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 py-24 sm:py-32 md:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="projects-heading mb-4">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase text-white/40">
            Selected Projects
          </span>
        </div>

        <div className="projects-heading flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <h2 className="text-white max-w-2xl">
            Powering Global
            <br />
            <span className="font-light text-white/60">Industries.</span>
          </h2>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-all"
          >
            View All Work
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="project-card glass-card rounded-[32px] overflow-hidden group"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest">
                  {project.purity}
                </div>
              </div>
              <div className="p-8">
                <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white/80 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
