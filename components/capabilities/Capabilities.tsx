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
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Grid cards animation
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
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
          className="font-display text-display font-bold text-center mb-20"
        >
          Capabilities
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {capabilities.map((capability, index) => (
            <article
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative p-8 md:p-10 bg-foreground/5 backdrop-blur-sm
                       border border-foreground/10 rounded-2xl overflow-hidden
                       transition-all duration-500 hover:bg-foreground/10
                       hover:border-accent/50 hover:scale-[1.02]
                       focus-within:ring-2 focus-within:ring-accent"
              tabIndex={0}
              role="article"
              aria-label={capability.title}
            >
              {/* Background glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent
                           opacity-0 group-hover:opacity-100 transition-opacity duration-500
                           ${hoveredIndex === index ? 'blur-xl' : ''}`}
              />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-display text-2xl font-semibold mb-4 text-foreground
                             group-hover:text-accent transition-colors duration-300">
                  {capability.title}
                </h3>

                <p className="text-foreground/60 leading-relaxed group-hover:text-foreground/80
                            transition-colors duration-300">
                  {capability.description}
                </p>

                {/* Decorative element */}
                <div className="absolute top-6 right-6 w-12 h-12 border-2 border-accent/20
                              rounded-full group-hover:scale-110 group-hover:border-accent/50
                              transition-all duration-500" />
              </div>
            </article>
          ))}
        </div>

        {/* Future work section */}
        <div className="mt-20 text-center">
          <p className="text-foreground/50 text-lg italic">
            Selected case studies coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
