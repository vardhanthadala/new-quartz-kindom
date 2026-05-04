"use client";

import Header from "@/components/Header";
import VideoBackground from "@/components/VideoBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* 
        Fixed Video Background (z-index: -1) 
        and Dark Gradient Overlay (z-index: 0) 
      */}
      <VideoBackground />

      {/* 
        Navigation Header (z-index: 50) 
      */}
      <Header />

      {/* 
        Main Content Layers (z-index: 10)
        Using a relative container with a subtle global gradient to ensure
        smooth visual transitions between different sections.
      */}
      <main className="relative min-h-screen">
        <HeroSection />
        
        {/* 
          Connecting sections with a very subtle glass overlay to prevent 
          any abrupt black background gaps while scrolling.
        */}
        <div className="relative z-10 bg-gradient-to-b from-transparent via-black/5 to-black/20 backdrop-blur-[2px]">
          <AboutSection />
          <ServicesSection />
          <StatsSection />
          <ProjectsSection />
        </div>
      </main>

      {/* 
        Footer (z-index: 10) 
      */}
      <Footer />
    </>
  );
}
