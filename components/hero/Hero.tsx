'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import BackgroundScene from './BackgroundScene';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !heroRef.current || !titleRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Enhanced title animation with scale and opacity
      tl.from(titleRef.current, {
        opacity: 0,
        y: 120,
        scale: 0.9,
        filter: 'blur(20px)',
        duration: 1.8,
        delay: 0.3,
        ease: 'power4.out',
      });

      // Subtitle reveal with blur
      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 60,
          filter: 'blur(10px)',
          duration: 1.2,
        },
        '-=1'
      );

      // CTA buttons with stagger and scale
      tl.from(
        ctaRef.current?.children ?? [],
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 1,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        },
        '-=0.6'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced 3D Background */}
      <BackgroundScene />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h1
          ref={titleRef}
          className="font-sans text-hero font-black text-foreground mb-8 tracking-tighter glow"
        >
          Oussama Lassoued
        </h1>

        <p
          ref={subtitleRef}
          className="text-subheading md:text-heading-xl font-light text-gray-600 max-w-4xl mx-auto mb-16 tracking-tight leading-tight"
        >
          Designing experiences where art meets interaction
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => scrollToSection('capabilities')}
            className="group relative px-10 py-5 bg-foreground text-background font-medium text-lg rounded-none
                     hover:bg-gray-800 transition-all duration-500 hover:scale-105 hover:tracking-wider
                     focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-4
                     focus:ring-offset-background overflow-hidden"
            aria-label="View work and capabilities"
          >
            <span className="relative z-10">View Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-0 group-hover:opacity-20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="group px-10 py-5 border-2 border-foreground text-foreground font-medium text-lg
                     rounded-none hover:bg-foreground hover:text-background transition-all
                     duration-500 hover:scale-105 hover:tracking-wider focus:outline-none focus:ring-2
                     focus:ring-foreground focus:ring-offset-4 focus:ring-offset-background"
            aria-label="Contact Oussama"
          >
            <span className="relative z-10">Get in Touch</span>
          </button>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-medium">Scroll</span>
          <div className="w-px h-20 bg-gradient-to-b from-gray-500 to-transparent" />
        </div>
      </div>
    </section>
  );
}
