'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import BackgroundScene from './BackgroundScene';

const stats = [
  { label: 'Focus', value: 'UI/UX · Product Systems' },
  { label: 'Approach', value: 'Cinematic, research-led' },
  { label: 'Availability', value: 'Open for select collaborations' },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !heroRef.current || !titleRef.current) {
      return;
    }

    const titleEl = titleRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      const words = titleEl.querySelectorAll('[data-word]');
      const ctas = ctaRef.current?.children ?? [];
      const statsItems = statRef.current?.children ?? [];

      gsap.set(
        [titleRef.current, subtitleRef.current, ctaRef.current, scrollIndicatorRef.current, statRef.current],
        {
          opacity: 0,
        },
      );

      tl.fromTo(
        words,
        {
          y: 180,
          opacity: 0,
          filter: 'blur(30px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          stagger: 0.08,
        },
      )
        .fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 80,
            filter: 'blur(15px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=1',
        )
        .fromTo(
          ctas,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'back.out(1.6)',
          },
          '-=0.5',
        )
        .fromTo(
          statsItems,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
          },
          '-=0.6',
        )
        .fromTo(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: -30,
          },
          {
            opacity: 0.7,
            y: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.6',
        );

      gsap.to(scrollIndicatorRef.current, {
        opacity: 0.35,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
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
      <BackgroundScene />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06) 0, transparent 28%), radial-gradient(circle at 80% 40%, rgba(255,255,255,0.05) 0, transparent 25%), radial-gradient(circle at 60% 80%, rgba(255,255,255,0.04) 0, transparent 22%)',
          }}
        />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff12 1px, transparent 1px), linear-gradient(90deg, #ffffff12 1px, transparent 1px)',
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          <div className="flex-1 space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 uppercase tracking-[0.24em] text-xs text-gray-500">
              <span className="h-1 w-1 rounded-full bg-foreground animate-pulse" />
              <span>Design Director</span>
              <span className="text-gray-600">· Monochrome Narrative</span>
            </div>

            <div className="space-y-6">
              <h1
                ref={titleRef}
                className="font-sans text-hero font-black text-foreground tracking-tight leading-[0.9]"
              >
                <span data-word className="block">Oussama</span>
                <span data-word className="block">Lassoued</span>
              </h1>

              <p
                ref={subtitleRef}
                className="text-subheading md:text-heading-xl font-light text-gray-600 max-w-3xl tracking-tight leading-tight"
              >
                Designing experiences where art meets interaction—fusing research, motion, and product thinking into cinematic interfaces.
              </p>

              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6">
                <button
                  onClick={() => scrollToSection('capabilities')}
                  className="group relative px-10 py-5 bg-foreground text-background font-semibold text-lg uppercase tracking-wider
                           rounded-none hover:bg-white transition-all duration-500 hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-4
                           focus:ring-offset-background overflow-hidden"
                  aria-label="View work and capabilities"
                >
                  <span className="relative z-10">Explore Work</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-0 group-hover:opacity-30 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="group px-10 py-5 border border-foreground text-foreground font-semibold text-lg uppercase tracking-wider
                           rounded-none hover:bg-foreground hover:text-background transition-all duration-500 hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-4 focus:ring-offset-background"
                  aria-label="Contact Oussama"
                >
                  <span className="relative z-10">Get in Touch</span>
                </button>
              </div>
            </div>

            <div
              ref={statRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-gray-200/20 bg-white/5 p-6 backdrop-cinematic"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.28em] text-gray-500 font-medium">
                    {stat.label}
                  </span>
                  <span className="text-body-lg text-foreground font-medium leading-tight">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-6 text-right pt-6">
            <div className="uppercase tracking-[0.35em] text-gray-500 text-xs">Cinematic Portfolio</div>
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
            <div className="text-gray-400 max-w-sm text-sm leading-relaxed">
              Built with motion-first thinking, real-time 3D, and a monochrome system that keeps the focus on precision.
            </div>
          </div>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-gray-500 font-medium">Scroll</span>
          <div className="w-px h-20 bg-gradient-to-b from-gray-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
