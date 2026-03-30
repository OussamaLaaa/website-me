# Oussama Lassoued — Portfolio Website

A premium cinematic portfolio website showcasing the work of UI/UX designer Oussama Lassoued.

## Overview

This website is designed as an immersive visual experience that blends art with technology. It features cinematic scene transitions, 3D ambient backgrounds, and motion-aware interactions to create a memorable digital presence.

## Features

- **Cinematic Scene Structure**: 5 distinct scenes that flow like a visual narrative
- **3D Ambient Background**: WebGL-powered Three.js sphere with distortion effects
- **Smooth Scroll Experience**: Lenis-powered smooth scrolling with reduced-motion support
- **Premium Animations**: GSAP-powered scroll-triggered animations with sophisticated timing
- **Fully Responsive**: Mobile-first design that works across all devices
- **Accessibility-First**: Keyboard navigable, semantic HTML, ARIA labels, reduced-motion support
- **Performance Optimized**: Lazy loading, efficient animations, WebGL fallbacks

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: GSAP + Framer Motion
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Smooth Scroll**: Lenis
- **Build Tool**: Turbopack

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles and theme variables
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main page composition
├── components/
│   ├── hero/             # Hero section with 3D background
│   ├── manifesto/        # Design philosophy section
│   ├── capabilities/     # Skills and capabilities grid
│   ├── about/            # About profile section
│   ├── contact/          # Contact CTA section
│   └── shared/           # Shared components (Navigation, SmoothScroll)
└── public/               # Static assets
```

## Design Philosophy

The website embodies four core principles:

1. **Art Meets Technology** - Blending aesthetic vision with functional precision
2. **Design with Intention** - Every element serves the user journey
3. **Craft Digital Moments** - Transforming static screens into memorable experiences
4. **Empathy in Every Pixel** - Understanding people through design

## Accessibility

This website includes:

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Reduced motion preference support
- High contrast text
- Screen reader optimizations

## Performance

Optimizations include:

- Code splitting with Next.js App Router
- Lazy loading of 3D components
- Efficient GSAP animations with cleanup
- WebGL fallbacks for unsupported devices
- Optimized font loading
- Minimal bundle size

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2026 Oussama Lassoued. All rights reserved.

## Contact

For inquiries:
- Email: contact@oussamalassoued.com
- LinkedIn: [linkedin.com/in/oussamalassoued](https://linkedin.com/in/oussamalassoued)
