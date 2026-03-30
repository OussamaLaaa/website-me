'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  'Multimedia & Digital Communication Background',
  'UX & Interface Design Expertise',
  'Visual Storytelling & Brand Strategy',
  'Collaborative Team Experience',
  'Continuous Learning & Growth Mindset',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Content animation
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
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
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
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
        <div className="grid md:grid-cols-[1.2fr,1fr] gap-12 md:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <h2 className="font-display text-display font-bold mb-8">
              About Me
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-foreground/70 leading-relaxed">
              <p>
                I'm a UI/UX designer with a passion for creating digital experiences that
                blend aesthetic vision with functional excellence. My approach combines
                creative exploration with strategic thinking to craft interfaces that feel
                both beautiful and intuitive.
              </p>

              <p>
                With a background in multimedia and digital communication, I bring a
                multidisciplinary perspective to every project. I believe the best designs
                emerge from curiosity, collaboration, and a deep understanding of the people
                we're designing for.
              </p>

              <p>
                My work spans visual design, user experience, and motion-aware interfaces.
                I'm particularly drawn to projects that challenge convention and push the
                boundaries of what digital experiences can be—where technology becomes an
                invisible partner in human interaction.
              </p>

              <p className="text-accent font-medium">
                Currently open to freelance projects, collaborative opportunities, and full-time
                positions where I can contribute to building meaningful digital products.
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
            <div
              ref={highlightsRef}
              className="relative bg-foreground/5 backdrop-blur-sm border border-foreground/10
                       rounded-2xl p-8 md:p-10 space-y-4"
            >
              <h3 className="font-display text-2xl font-semibold mb-6 text-accent">
                Key Strengths
              </h3>

              <ul className="space-y-4">
                {highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-foreground/80"
                  >
                    <svg
                      className="w-6 h-6 text-accent flex-shrink-0 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="leading-relaxed">{highlight}</span>
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
