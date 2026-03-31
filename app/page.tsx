import SmoothScroll from '@/components/shared/SmoothScroll';
import Navigation from '@/components/shared/Navigation';
import Hero from '@/components/hero/Hero';
import Manifesto from '@/components/manifesto/Manifesto';
import Capabilities from '@/components/capabilities/Capabilities';
import About from '@/components/about/About';
import Contact from '@/components/contact/Contact';
import SceneDivider from '@/components/shared/SceneDivider';

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <main className="relative">
        <Hero />
        <SceneDivider />
        <Manifesto />
        <SceneDivider />
        <Capabilities />
        <SceneDivider />
        <About />
        <SceneDivider />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
