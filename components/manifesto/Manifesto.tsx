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
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Principles stagger animation
      const principles = principlesRef.current?.children;
      if (principles) {
        gsap.from(principles, {
          scrollTrigger: {
            trigger: principlesRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse',
          },
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
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
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display text-display font-bold text-center mb-20 md:mb-32"
        >
          Design Philosophy
        </h2>

        <div ref={principlesRef} className="space-y-16 md:space-y-24">
          {principles.map((principle, index) => (
            <article
              key={index}
              className="group grid md:grid-cols-[1fr,2fr] gap-8 items-start"
            >
              <div className="relative">
                <span className="text-6xl md:text-8xl font-display text-accent/20 font-bold">
                  0{index + 1}
                </span>
                <h3 className="font-display text-heading font-semibold mt-4 text-foreground">
                  {principle.title}
                </h3>
              </div>

              <div className="relative">
                <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                  {principle.description}
                </p>
                <div
                  className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b
                           from-transparent via-accent/50 to-transparent opacity-0
                           group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
