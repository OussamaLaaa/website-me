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
      // CINEMATIC SCENE ENTRANCE
      // Title animation with parallax-like movement
      gsap.fromTo(
        titleRef.current,
        {
          y: 120,
          opacity: 0,
          scale: 0.9,
          filter: 'blur(15px)',
        },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1.5,
          },
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
        }
      );

      // Principles - layered depth with stagger and parallax
      const principleElements = principlesRef.current?.children;
      if (principleElements) {
        Array.from(principleElements).forEach((element, index) => {
          // Main entrance animation
          gsap.fromTo(
            element,
            {
              y: 150,
              opacity: 0,
              filter: 'blur(12px)',
              scale: 0.95,
            },
            {
              scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                end: 'top 60%',
                scrub: 1.2,
              },
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              scale: 1,
              ease: 'power2.out',
            }
          );

          // Parallax movement for depth
          gsap.to(element, {
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
            y: -30 * (index % 2 === 0 ? 1 : -1), // Alternate direction
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
      id="manifesto"
      className="relative py-section px-6 md:px-12 bg-background"
    >
      {/* Cinematic background decoration with parallax */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-1/4 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
        {/* Additional depth lines */}
        <div className="absolute top-1/2 left-1/3 w-px h-24 bg-gradient-to-b from-transparent via-gray-100 to-transparent" />
        <div className="absolute top-2/3 right-1/4 w-px h-16 bg-gradient-to-b from-transparent via-gray-100 to-transparent" />
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
              className="group grid md:grid-cols-[1fr,2fr] gap-10 md:gap-16 items-start 
                       border-l-2 border-transparent hover:border-foreground 
                       transition-all duration-700 pl-0 md:pl-8"
            >
              <div className="relative">
                <span className="text-7xl md:text-9xl font-sans text-gray-100 font-black leading-none tracking-tighter
                               transition-all duration-700 group-hover:text-gray-200">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-sans text-heading-xl font-bold mt-6 text-foreground tracking-tight
                             transition-all duration-500 group-hover:tracking-tight group-hover:translate-x-1">
                  {principle.title}
                </h3>
              </div>

              <div className="relative flex items-center min-h-[200px]">
                <p className="text-body-lg text-gray-600 leading-relaxed font-light
                            transition-all duration-500 group-hover:text-gray-700">
                  {principle.description}
                </p>

                {/* Animated hover line decoration */}
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
