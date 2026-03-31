'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  'Multimedia & Digital Communication',
  'UX & Interface Design',
  'Visual Storytelling & Brand Strategy',
  'Collaborative Team Experience',
  'Continuous Growth Mindset',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLUListElement>(null);

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
        y: 80,
        opacity: 0,
        scale: 0.95,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'power4.out',
      });

      // Content animation
      gsap.from(contentRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
      });

      // Highlights animation
      const items = highlightsRef.current?.children;
      if (items) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          x: -40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power4.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-section px-6 md:px-12 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-sans text-display font-black mb-20 md:mb-32 tracking-tighter uppercase text-center"
        >
          Profile
        </h2>

        <div className="grid md:grid-cols-[1.5fr,1fr] gap-16 md:gap-24 items-start">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <p className="text-body-lg text-gray-600 leading-relaxed font-light">
              UI/UX designer focused on creating digital experiences that merge aesthetic vision with functional clarity. My approach combines creative exploration with strategic thinking to craft interfaces that feel both refined and intuitive.
            </p>

            <p className="text-body-lg text-gray-600 leading-relaxed font-light">
              With a background in multimedia and digital communication, I bring a multidisciplinary lens to every project. The best designs emerge from curiosity, collaboration, and understanding the people we serve.
            </p>

            <p className="text-body-lg text-gray-600 leading-relaxed font-light">
              My work spans visual design, user experience, and motion-aware interfaces. I'm drawn to projects that challenge convention—where technology becomes an invisible partner in human interaction.
            </p>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-body font-medium text-foreground leading-relaxed">
                Currently open to freelance projects, collaborative opportunities, and full-time positions where I can contribute to meaningful digital products.
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-32 h-32 border border-gray-100 rounded-full opacity-30" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-gray-100 rounded-full opacity-20" />

            <div className="relative border-l-2 border-foreground pl-8 md:pl-10">
              <h3 className="font-sans text-xl font-bold mb-8 text-foreground uppercase tracking-wider">
                Key Strengths
              </h3>

              <ul ref={highlightsRef} className="space-y-5">
                {highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 text-gray-600 group"
                  >
                    <span className="text-xs font-medium text-gray-400 mt-1 group-hover:text-foreground transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body font-light leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
