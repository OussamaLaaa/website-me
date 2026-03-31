'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: 'UI/UX Design',
    description: 'Intuitive interfaces where beauty serves usability, ensuring every interaction feels natural and purposeful.',
  },
  {
    title: 'Visual Design',
    description: 'Compelling visual systems that communicate brand identity and establish emotional connections.',
  },
  {
    title: 'Brand-Driven Interfaces',
    description: 'Translating brand values into cohesive digital experiences that resonate with audiences.',
  },
  {
    title: 'Motion & Interaction',
    description: 'Micro-interactions and animations that guide users and bring interfaces to life with purpose.',
  },
  {
    title: 'Design Systems',
    description: 'Scalable frameworks that ensure consistency and efficiency across digital products.',
  },
  {
    title: 'Digital Storytelling',
    description: 'Weaving narrative into interfaces to create memorable experiences worth exploring.',
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
      // Title animation with scale
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        scale: 0.95,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'power4.out',
      });

      // Grid cards animation with blur
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          y: 80,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
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
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="font-sans text-display font-black text-center mb-24 md:mb-32 tracking-tighter uppercase"
        >
          What I Do
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
                       hover:border-foreground hover:z-10
                       focus-within:ring-2 focus-within:ring-foreground"
              tabIndex={0}
              role="article"
              aria-label={capability.title}
            >
              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-transparent group-hover:border-foreground transition-all duration-700 opacity-0 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-8">
                  <span className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 group-hover:text-gray-600 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-sans text-2xl md:text-3xl font-bold mb-6 text-foreground
                             tracking-tight leading-tight">
                  {capability.title}
                </h3>

                <p className="text-body text-gray-600 leading-relaxed group-hover:text-gray-800
                            transition-colors duration-500 font-light">
                  {capability.description}
                </p>

                {/* Subtle hover indicator */}
                <div className="absolute bottom-12 left-12 w-8 h-px bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            </article>
          ))}
        </div>

        {/* Future work section */}
        <div className="mt-24 text-center border-t border-gray-200 pt-12">
          <p className="text-gray-500 text-sm uppercase tracking-[0.3em] font-medium">
            Case studies in development
          </p>
        </div>
      </div>
    </section>
  );
}
