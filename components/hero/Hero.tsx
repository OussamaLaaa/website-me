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

    if (prefersReducedMotion || !heroRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          ctaRef.current?.children ?? [],
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          '-=0.5'
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
      {/* 3D Background */}
      <BackgroundScene />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h1
          ref={titleRef}
          className="font-display text-hero font-bold text-gradient glow mb-8"
        >
          Oussama Lassoued
        </h1>

        <p
          ref={subtitleRef}
          className="text-subheading md:text-heading text-foreground/80 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Designing experiences where art meets interaction
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => scrollToSection('capabilities')}
            className="group px-8 py-4 bg-accent text-background font-medium rounded-full
                     hover:bg-accent/90 transition-all duration-300 hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                     focus:ring-offset-background"
            aria-label="View work and capabilities"
          >
            Explore Work
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="group px-8 py-4 border-2 border-accent text-accent font-medium
                     rounded-full hover:bg-accent hover:text-background transition-all
                     duration-300 hover:scale-105 focus:outline-none focus:ring-2
                     focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Contact Oussama"
          >
            Get in Touch
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
