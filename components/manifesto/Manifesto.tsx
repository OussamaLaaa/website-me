'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: 'Art Meets Technology',
    description: 'Every interface is a canvas. Every interaction tells a story. I blend aesthetic vision with functional precision to create digital experiences that resonate.',
  },
  {
    title: 'Design with Intention',
    description: 'Beauty without purpose is decoration. I design with deliberate thought—where every element serves the user journey and elevates the experience.',
  },
  {
    title: 'Craft Digital Moments',
    description: 'The best experiences feel alive. Through motion, depth, and atmosphere, I transform static screens into memorable moments people want to return to.',
  },
  {
    title: 'Empathy in Every Pixel',
    description: 'Great design understands people. I approach every project with curiosity about the human experience, creating interfaces that feel intuitive and welcoming.',
  },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

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
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        scale: 0.95,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'power4.out',
      });

      // Principles stagger animation with blur
      const principles = principlesRef.current?.children;
      if (principles) {
        gsap.from(principles, {
          scrollTrigger: {
            trigger: principlesRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse',
          },
          y: 100,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 1,
          stagger: 0.25,
          ease: 'power4.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative py-section px-6 md:px-12 bg-background"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-sans text-display font-black text-center mb-24 md:mb-40 tracking-tighter uppercase"
        >
          Design Philosophy
        </h2>

        <div ref={principlesRef} className="space-y-20 md:space-y-32">
          {principles.map((principle, index) => (
            <article
              key={index}
              className="group grid md:grid-cols-[1fr,2fr] gap-10 md:gap-16 items-start border-l-2 border-transparent hover:border-foreground transition-all duration-700 pl-0 md:pl-8"
            >
              <div className="relative">
                <span className="text-7xl md:text-9xl font-sans text-gray-100 font-black leading-none tracking-tighter">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-sans text-heading-xl font-bold mt-6 text-foreground tracking-tight">
                  {principle.title}
                </h3>
              </div>

              <div className="relative flex items-center min-h-[200px]">
                <p className="text-body-lg text-gray-600 leading-relaxed font-light">
                  {principle.description}
                </p>

                {/* Hover line decoration */}
                <div
                  className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b
                           from-transparent via-foreground to-transparent opacity-0
                           group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
