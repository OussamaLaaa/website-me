'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/85 backdrop-cinematic border-b border-white/10 shadow-[0_10px_60px_rgba(0,0,0,0.45)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="font-sans text-xl font-bold text-foreground hover:text-gray-500
                     transition-colors duration-300 focus:outline-none focus:text-gray-500
                     tracking-tighter"
            aria-label="Go to home"
          >
            OL
          </button>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <button
                onClick={() => scrollToSection('manifesto')}
                className="text-gray-500 hover:text-foreground transition-colors duration-300
                         font-medium focus:outline-none focus:text-foreground text-sm uppercase tracking-wider"
              >
                Principles
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('capabilities')}
                className="text-gray-500 hover:text-foreground transition-colors duration-300
                         font-medium focus:outline-none focus:text-foreground text-sm uppercase tracking-wider"
              >
                Work
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-500 hover:text-foreground transition-colors duration-300
                         font-medium focus:outline-none focus:text-foreground text-sm uppercase tracking-wider"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2 border border-foreground text-foreground rounded-none
                         hover:bg-foreground hover:text-background transition-all duration-300
                         font-medium focus:outline-none focus:ring-2 focus:ring-foreground
                         text-sm uppercase tracking-wider"
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => scrollToSection('contact')}
            className="md:hidden px-6 py-2 border border-foreground text-foreground rounded-none
                     hover:bg-foreground hover:text-background transition-all duration-300
                     font-medium text-sm focus:outline-none focus:ring-2 focus:ring-foreground
                     uppercase tracking-wider"
            aria-label="Contact"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
