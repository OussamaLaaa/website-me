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
      gsap.from(contentRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12
               bg-background overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div ref={contentRef} className="max-w-4xl mx-auto text-center space-y-12">
        {/* Title */}
        <h2 className="font-display text-display md:text-hero font-bold text-gradient">
          Let's Create Something Exceptional
        </h2>

        {/* Description */}
        <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
          Whether you're looking for a designer for your next project, seeking a creative
          collaborator, or considering me for your team—I'd love to hear from you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
          <a
            href="mailto:contact@oussamalassoued.com"
            className="group px-10 py-5 bg-accent text-background font-semibold text-lg
                     rounded-full hover:bg-accent/90 transition-all duration-300
                     hover:scale-105 hover:shadow-2xl hover:shadow-accent/20
                     focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                     focus:ring-offset-background"
            aria-label="Send email to Oussama"
          >
            Send Email
          </a>

          <a
            href="https://linkedin.com/in/oussamalassoued"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-10 py-5 border-2 border-accent text-accent font-semibold
                     text-lg rounded-full hover:bg-accent hover:text-background
                     transition-all duration-300 hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                     focus:ring-offset-background"
            aria-label="Visit LinkedIn profile"
          >
            LinkedIn
          </a>
        </div>

        {/* Social Links Placeholder */}
        <div className="pt-12 space-y-4">
          <p className="text-foreground/40 text-sm uppercase tracking-widest">
            Connect
          </p>
          <div className="flex justify-center gap-8">
            <a
              href="#"
              className="text-foreground/60 hover:text-accent transition-colors duration-300
                       focus:outline-none focus:text-accent"
              aria-label="Behance profile"
            >
              <span className="text-sm font-medium">Behance</span>
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-accent transition-colors duration-300
                       focus:outline-none focus:text-accent"
              aria-label="Dribbble profile"
            >
              <span className="text-sm font-medium">Dribbble</span>
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-accent transition-colors duration-300
                       focus:outline-none focus:text-accent"
              aria-label="Twitter profile"
            >
              <span className="text-sm font-medium">Twitter</span>
            </a>
          </div>
        </div>

        {/* Footer note */}
        <div className="pt-20 border-t border-foreground/10">
          <p className="text-foreground/40 text-sm">
            © 2026 Oussama Lassoued. Designed with intention, built with craft.
          </p>
        </div>
      </div>
    </section>
  );
}
