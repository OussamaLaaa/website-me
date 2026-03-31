'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // GRAND CINEMATIC FINALE - Everything reveals with depth and scale
      const elements = contentRef.current?.children;
      if (elements) {
        Array.from(elements).forEach((element, index) => {
          gsap.fromTo(
            element,
            {
              y: 120,
              opacity: 0,
              scale: 0.9,
              filter: 'blur(20px)',
            },
            {
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 1.5,
              },
              y: 0,
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              ease: 'power3.out',
            }
          );

          // Layered parallax for final depth
          gsap.to(element, {
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
            y: -40 * (index % 2 === 0 ? 1 : 0.6),
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
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
               backgroundSize: '80px 80px'
             }}
        />

        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] 
                      bg-gradient-radial from-gray-100/10 via-transparent to-transparent rounded-full" />

        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-gray-200 rounded-full animate-float opacity-40" />
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-gray-300 rounded-full animate-float opacity-30" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-gray-200 rounded-full animate-float opacity-25" 
             style={{ animationDelay: '2s' }} />
      </div>

      <div ref={contentRef} className="max-w-5xl mx-auto text-center space-y-16">
        <h2 className="font-sans text-display md:text-hero font-black tracking-tighter text-foreground glow">
          Let&apos;s Create Something Exceptional
        </h2>

        <p className="text-body-lg md:text-heading-xl text-gray-600 leading-tight font-light max-w-3xl mx-auto tracking-tight">
          Whether you&apos;re looking for a designer for your next project, seeking a creative collaborator, or considering me for your team—I&apos;d love to hear from you.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12">
          <a
            href="mailto:contact@oussamalassoued.com"
            className="group relative px-12 py-6 bg-foreground text-background font-semibold text-lg
                     rounded-none hover:bg-white transition-all duration-500
                     hover:scale-105 hover:tracking-wider hover:shadow-2xl
                     focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-4
                     focus:ring-offset-background overflow-hidden uppercase tracking-wider"
            aria-label="Send email to Oussama"
          >
            <span className="relative z-10">Send Email</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent 
                          opacity-0 group-hover:opacity-25 transform translate-x-[-100%] 
                          group-hover:translate-x-[100%] transition-transform duration-1000" />
          </a>

          <a
            href="https://linkedin.com/in/oussamalassoued"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-12 py-6 border-2 border-foreground text-foreground font-semibold
                     text-lg rounded-none hover:bg-foreground hover:text-background
                     transition-all duration-500 hover:scale-105 hover:tracking-wider hover:shadow-2xl
                     focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-4
                     focus:ring-offset-background uppercase tracking-wider"
            aria-label="Visit LinkedIn profile"
          >
            <span className="relative z-10">LinkedIn</span>
          </a>
        </div>

        <div className="pt-16 space-y-6 border-t border-gray-200/30">
          <p className="text-gray-500 text-xs uppercase tracking-[0.4em] font-medium">
            Connect
          </p>
          <div className="flex justify-center gap-10">
            <a
              href="https://www.behance.net/oussamalassoued"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-foreground transition-all duration-500
                       focus:outline-none focus:text-foreground text-sm uppercase tracking-wider font-medium
                       hover:translate-y-[-2px]"
              aria-label="Behance profile"
            >
              Behance
            </a>
            <a
              href="https://dribbble.com/oussamalassoued"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-foreground transition-all duration-500
                       focus:outline-none focus:text-foreground text-sm uppercase tracking-wider font-medium
                       hover:translate-y-[-2px]"
              aria-label="Dribbble profile"
            >
              Dribbble
            </a>
            <a
              href="https://twitter.com/oussamalassoued"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-foreground transition-all duration-500
                       focus:outline-none focus:text-foreground text-sm uppercase tracking-wider font-medium
                       hover:translate-y-[-2px]"
              aria-label="Twitter profile"
            >
              Twitter
            </a>
          </div>
        </div>

        <div className="pt-24">
          <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-medium">
            © 2026 Oussama Lassoued
          </p>
          <p className="text-gray-400 text-xs mt-2 font-light">
            Designed with intention, built with craft
          </p>
        </div>
      </div>
    </section>
  );
}
