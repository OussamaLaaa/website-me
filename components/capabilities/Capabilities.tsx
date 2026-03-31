'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // CINEMATIC TITLE ENTRANCE with depth
      gsap.fromTo(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.92,
          filter: 'blur(12px)',
        },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1.5,
          },
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
        }
      );

      // GRID CARDS - Cinematic staggered entrance with parallax
      const cards = gridRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card, index) => {
          // Main entrance animation
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
            }
          );

          // Layered parallax for spatial depth
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2.5,
            },
            y: -20 * ((index % 3) + 1), // Different speeds for depth
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
      className="relative py-section px-6 md:px-12 bg-background"
    >
      {/* Atmospheric background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-gray-100 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 border border-gray-100 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="font-sans text-display font-black text-center mb-24 md:mb-32 tracking-tighter uppercase"
        >
          Capabilities
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-1"
        >
          {capabilities.map((capability, index) => (
            <article
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative p-12 md:p-14 bg-background
                       border border-gray-200 rounded-none overflow-hidden
                       transition-all duration-700 hover:bg-gray-50
                       hover:border-foreground hover:z-10 hover:shadow-2xl
                       focus-within:ring-2 focus-within:ring-foreground"
              tabIndex={0}
              role="article"
              aria-label={capability.title}
            >
              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-transparent 
                            group-hover:border-foreground transition-all duration-700 opacity-0 
                            group-hover:opacity-100" />

              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                            bg-gradient-radial from-gray-100/20 via-transparent to-transparent" />

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-8">
                  <span className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 
                               group-hover:text-gray-600 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-sans text-2xl md:text-3xl font-bold mb-6 text-foreground
                             tracking-tight leading-tight transition-all duration-500
                             group-hover:tracking-tight group-hover:translate-x-0.5">
                  {capability.title}
                </h3>

                <p className="text-body text-gray-600 leading-relaxed group-hover:text-gray-800
                            transition-colors duration-500 font-light">
                  {capability.description}
                </p>

                {/* Subtle hover indicator */}
                <div className="absolute bottom-12 left-12 w-8 h-px bg-foreground transform scale-x-0 
                             group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            </article>
          ))}
        </div>

        {/* Future work section */}
        <div className="mt-24 text-center border-t border-gray-200 pt-12">
          <p className="text-gray-500 text-sm uppercase tracking-[0.3em] font-medium">
            Selected case studies coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
