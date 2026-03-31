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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // CINEMATIC TITLE with depth
      gsap.fromTo(
        titleRef.current,
        {
          y: 110,
          opacity: 0,
          scale: 0.93,
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

      // CONTENT PARAGRAPHS - Layered depth animation
      const paragraphs = contentRef.current?.children;
      if (paragraphs) {
        Array.from(paragraphs).forEach((paragraph, index) => {
          gsap.fromTo(
            paragraph,
            {
              y: 80,
              opacity: 0,
              filter: 'blur(8px)',
            },
            {
              scrollTrigger: {
                trigger: paragraph,
                start: 'top 88%',
                end: 'top 68%',
                scrub: 1.2,
              },
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'power2.out',
            }
          );

          // Subtle parallax for depth
          gsap.to(paragraph, {
            scrollTrigger: {
              trigger: paragraph,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
            y: -15 * (index % 2 === 0 ? 1 : 0.7),
            ease: 'none',
          });
        });
      }

      // HIGHLIGHTS - Staggered entrance
      const items = highlightsRef.current?.children;
      if (items) {
        Array.from(items).forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              x: -50,
              opacity: 0,
            },
            {
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                end: 'top 75%',
                scrub: 1,
              },
              x: 0,
              opacity: 1,
              ease: 'power2.out',
            }
          );
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
      {/* Cinematic background atmosphere */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 right-1/5 w-96 h-96 border border-gray-100 rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 border border-gray-100 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-sans text-display font-black mb-20 md:mb-32 tracking-tighter uppercase text-center"
        >
          About Me
        </h2>

        <div className="grid md:grid-cols-[1.5fr,1fr] gap-16 md:gap-24 items-start">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <p className="text-body-lg text-gray-600 leading-relaxed font-light">
              I'm a UI/UX designer with a passion for creating digital experiences that blend aesthetic vision with functional excellence. My approach combines creative exploration with strategic thinking to craft interfaces that feel both beautiful and intuitive.
            </p>

            <p className="text-body-lg text-gray-600 leading-relaxed font-light">
              With a background in multimedia and digital communication, I bring a multidisciplinary perspective to every project. I believe the best designs emerge from curiosity, collaboration, and a deep understanding of the people we're designing for.
            </p>

            <p className="text-body-lg text-gray-600 leading-relaxed font-light">
              My work spans visual design, user experience, and motion-aware interfaces. I'm particularly drawn to projects that challenge convention and push the boundaries of what digital experiences can be—where technology becomes an invisible partner in human interaction.
            </p>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-body font-medium text-foreground leading-relaxed">
                Currently open to freelance projects, collaborative opportunities, and full-time positions where I can contribute to building meaningful digital products.
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="relative">
            {/* Decorative elements with subtle animation */}
            <div className="absolute -top-12 -right-12 w-32 h-32 border border-gray-100 rounded-full opacity-20" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-gray-100 rounded-full opacity-15" />

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
                    <span className="text-xs font-medium text-gray-400 mt-1 group-hover:text-foreground 
                                   transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body font-light leading-relaxed group-hover:text-foreground 
                                   transition-all duration-300 group-hover:translate-x-1">
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
