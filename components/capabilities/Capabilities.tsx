'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: 'UI/UX Design',
    description: 'Crafting intuitive interfaces that balance beauty with usability, ensuring every interaction feels natural and purposeful.',
  },
  {
    title: 'Visual Design',
    description: 'Creating compelling visual systems that communicate brand identity and establish emotional connections with users.',
  },
  {
    title: 'Brand-Driven Interfaces',
    description: 'Translating brand values into cohesive digital experiences that resonate with target audiences.',
  },
  {
    title: 'Motion & Interaction',
    description: 'Designing micro-interactions and animations that guide users and bring interfaces to life with purpose.',
  },
  {
    title: 'Design Systems',
    description: 'Building scalable design frameworks that ensure consistency and efficiency across digital products.',
  },
  {
    title: 'Digital Storytelling',
    description: 'Weaving narrative into interfaces to create memorable experiences that users want to explore and share.',
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          y: 90,
          opacity: 0,
          scale: 0.92,
          filter: 'blur(12px)',
        },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1.4,
          },
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
        },
      );

      const cards = gridRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              y: 120,
              opacity: 0,
              filter: 'blur(10px)',
              scale: 0.92,
            },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 65%',
                scrub: 1.2,
              },
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              scale: 1,
              ease: 'power2.out',
            },
          );

          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2.4,
            },
            y: -20 * ((index % 3) + 1),
            ease: 'none',
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative py-section px-6 md:px-12 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff12 1px, transparent 1px), linear-gradient(90deg, #ffffff12 1px, transparent 1px)',
            backgroundSize: '140px 140px',
          }}
        />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-gray-100 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 border border-gray-100 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-gray-500">Core Expertise</div>
          <h2
            ref={titleRef}
            className="font-sans text-display font-black text-foreground tracking-tighter uppercase"
          >
            Capabilities
          </h2>
          <p className="text-body-lg text-gray-600 max-w-3xl">
            A versatile toolkit shaped by product strategy, motion design, and systems thinking to keep brands cohesive and interfaces alive.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {capabilities.map((capability, index) => (
            <article
              key={capability.title}
              className="group relative p-12 bg-background/60 border border-gray-200/30 overflow-hidden
                       transition-all duration-700 hover:bg-white/5 hover:border-foreground/60
                       hover:shadow-[0_20px_80px_rgba(255,255,255,0.08)] focus-within:ring-2 focus-within:ring-foreground"
              tabIndex={0}
              role="article"
              aria-label={capability.title}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-radial from-white/10 via-transparent to-transparent" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-white/30" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-white/20" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>

                <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight transition-transform duration-500 group-hover:translate-x-1">
                  {capability.title}
                </h3>

                <p className="text-body text-gray-600 leading-relaxed transition-colors duration-500 group-hover:text-gray-200">
                  {capability.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center border-t border-gray-200/30 pt-10">
          <p className="text-gray-500 text-sm uppercase tracking-[0.3em] font-medium">
            Curated case studies available on request
          </p>
        </div>
      </div>
    </section>
  );
}
