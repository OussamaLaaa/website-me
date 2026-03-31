import { motion } from 'framer-motion';
import SmoothScroll from '@/components/shared/SmoothScroll';
import Navigation from '@/components/shared/Navigation';
import ExperienceScene from '@/components/home/ExperienceScene';

const stats = [
  { label: 'Focus', value: 'Cinematic UI/UX / WebGL / 3D' },
  { label: 'Approach', value: 'Research-led / Motion-first' },
  { label: 'Availability', value: 'Open for select projects' },
];

const highlights = [
  {
    title: 'Spatial Interfaces',
    description: 'WebGL product moments that feel like immersive films - tactile, responsive, and sharp in monochrome.',
    detail: 'Depth, parallax, camera choreography.',
  },
  {
    title: 'Design Systems',
    description: 'Component libraries that stay expressive while remaining minimal - black, white, and precise typography.',
    detail: 'Grid discipline, responsive scales, accessibility.',
  },
  {
    title: 'Narrative Sites',
    description: 'Story-driven launches with kinetic typography, layered motion, and live 3D to guide every scroll.',
    detail: 'Scroll narratives, sound-ready motion, cinematic pacing.',
  },
];

const process = [
  { title: 'Discovery', copy: "Rapid research to extract the brand's cinematic tone, map constraints, and define the sensory direction." },
  { title: 'Design & Motion', copy: 'Inter-only typography, monochrome palettes, and motion systems that choreograph every word and 3D cue.' },
  { title: 'Build', copy: 'WebGL + React Three Fiber for the stage, refined performance budgets, and QA for clarity across devices.' },
];

const textReveal = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.1 * index, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    if (typeof window === 'undefined') return;
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SmoothScroll>
      <Navigation />
      <main className="relative bg-background text-foreground">
        <section
          id="hero"
          className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-12"
        >
          <ExperienceScene />

          <div className="absolute inset-x-6 md:inset-x-12 top-24 h-px bg-gradient-to-r from-transparent via-gray-200/40 to-transparent" />
          <div className="absolute inset-y-12 left-1/2 w-px bg-gradient-to-b from-transparent via-gray-200/30 to-transparent hidden xl:block" />

          <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.15fr,0.85fr] gap-12 lg:gap-16 items-center">
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-3 px-5 py-2 border border-gray-200/30 bg-white/5 uppercase tracking-[0.28em] text-[11px] text-gray-500"
              >
                <span className="h-1 w-1 rounded-full bg-foreground animate-glow-pulse" />
                <span>Monochrome Lab</span>
                <span className="text-gray-600">/ UI/UX Direction</span>
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  className="font-sans text-hero font-black tracking-tight leading-[0.9]"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.08 },
                    },
                  }}
                >
                  {['Oussama', 'Lassoued'].map((word, index) => (
                    <motion.span key={word} className="block" variants={textReveal} custom={index} data-word>
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>

                <motion.p
                  className="text-subheading md:text-heading-xl font-light text-gray-600 max-w-3xl tracking-tight leading-tight"
                  initial="hidden"
                  animate="visible"
                  variants={textReveal}
                  custom={3}
                >
                  Designing cinematic digital spaces - where clean Inter typography, monochrome palettes, and live 3D guide every interaction.
                </motion.p>

                <div className="flex flex-col sm:flex-row gap-6">
                  <motion.button
                    onClick={() => scrollToSection('work')}
                    className="group relative px-10 py-5 bg-foreground text-background font-semibold text-lg uppercase tracking-wider rounded-none overflow-hidden"
                    initial="hidden"
                    animate="visible"
                    variants={textReveal}
                    custom={4}
                  >
                    <span className="relative z-10">See Direction</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-0 group-hover:opacity-30 transform -translate-x-full group-hover:translate-x-full transition-transform duration-900" />
                  </motion.button>

                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    className="px-10 py-5 border border-foreground text-foreground font-semibold text-lg uppercase tracking-wider rounded-none hover:bg-foreground hover:text-background transition-all duration-500"
                    initial="hidden"
                    animate="visible"
                    variants={textReveal}
                    custom={5}
                  >
                    Start a Project
                  </motion.button>
                </div>
              </div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-gray-200/30 bg-white/5 p-6 backdrop-cinematic"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.12 } },
                }}
              >
                {stats.map((stat, index) => (
                  <motion.div key={stat.label} className="flex flex-col gap-2" variants={textReveal} custom={index}>
                    <span className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-medium">{stat.label}</span>
                    <span className="text-body-lg text-foreground font-medium leading-tight">{stat.value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="relative w-full h-full"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="relative aspect-[4/5] bg-white/5 border border-gray-200/20 overflow-hidden backdrop-cinematic">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/5 to-gray-100/10" />
                <ExperienceScene className="absolute inset-0 opacity-60" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between text-xs uppercase tracking-[0.28em] text-gray-500">
                  <span>Real-time WebGL</span>
                  <span>Inter / Mono</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          >
            <span className="text-[11px] uppercase tracking-[0.32em] text-gray-500">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-gray-300 to-transparent" />
          </motion.div>
        </section>

        <section id="studio" className="relative py-section px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-10">
            <div className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)',
                backgroundSize: '140px 140px',
              }}
            />
            <div className="absolute top-0 left-1/4 w-px h-48 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
            <div className="absolute bottom-10 right-1/3 w-px h-40 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr,1.1fr] gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <div className="text-xs uppercase tracking-[0.35em] text-gray-500">Studio Note</div>
              <motion.h2
                className="font-sans text-display font-black tracking-tighter uppercase"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={textReveal}
              >
                Monochrome, intentional, alive.
              </motion.h2>
              <motion.p
                className="text-body-lg text-gray-600 leading-relaxed"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={textReveal}
                custom={1}
              >
                I craft atmospheres where UI feels cinematic but stays minimal. Every interaction is choreographed with motion and 3D cues to guide people - not overwhelm them.
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="group relative border border-gray-200/30 bg-white/5 p-8 min-h-[220px] overflow-hidden backdrop-cinematic transition-all duration-700 hover:border-foreground/60 hover:shadow-[0_20px_80px_rgba(255,255,255,0.08)]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={textReveal}
                  custom={index * 0.4}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-radial from-white/10 via-transparent to-transparent" />
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-gray-500">{String(index + 1).padStart(2, '0')}</span>
                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  </div>
                  <h3 className="font-sans text-heading font-bold mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-body text-gray-600 mb-4">{item.description}</p>
                  <span className="text-xs uppercase tracking-[0.28em] text-gray-500">{item.detail}</span>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="relative py-section px-6 md:px-12 overflow-hidden bg-white/5 border-y border-gray-200/20">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex flex-col gap-3">
              <div className="text-xs uppercase tracking-[0.35em] text-gray-500">Featured Craft</div>
              <motion.h2
                className="font-sans text-display font-black tracking-tighter uppercase"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={textReveal}
              >
                Motion-led interfaces.
              </motion.h2>
              <motion.p
                className="text-body-lg text-gray-600 max-w-3xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={textReveal}
                custom={1}
              >
                Each concept balances restraint with drama - clear grids, kinetic typography, and WebGL stages that respond to scroll and intent.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {['Kinetic Product Launch', '3D Brand System', 'Interactive Archive'].map((title, index) => (
                <motion.div
                  key={title}
                  className="group relative aspect-[4/5] border border-gray-200/30 bg-background overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 } }}
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <ExperienceScene className="absolute inset-0 opacity-70 mix-blend-screen" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Concept {String(index + 1).padStart(2, '0')}</p>
                    <h3 className="font-sans text-heading font-semibold">{title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="relative py-section px-6 md:px-12 overflow-hidden">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex flex-col gap-3">
              <div className="text-xs uppercase tracking-[0.35em] text-gray-500">Process</div>
              <motion.h2
                className="font-sans text-display font-black tracking-tighter uppercase"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={textReveal}
              >
                Precision through motion.
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {process.map((step, index) => (
                <motion.article
                  key={step.title}
                  className="border border-gray-200/30 bg-white/5 p-8 backdrop-cinematic flex flex-col gap-4 relative overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 } }}
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 bg-gradient-radial from-white/10 via-transparent to-transparent" />
                  <span className="text-[11px] uppercase tracking-[0.3em] text-gray-500">Step {String(index + 1).padStart(2, '0')}</span>
                  <h3 className="font-sans text-heading font-bold tracking-tight">{step.title}</h3>
                  <p className="text-body text-gray-600 leading-relaxed">{step.copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative py-section px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-10">
            <div className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0, transparent 32%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.07) 0, transparent 28%)',
              }}
            />
          </div>

          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="text-xs uppercase tracking-[0.35em] text-gray-500">Collaboration</div>
            <motion.h2
              className="font-sans text-display font-black tracking-tighter uppercase"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={textReveal}
            >
              Build the next monochrome experience.
            </motion.h2>
            <motion.p
              className="text-body-lg text-gray-600 max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={textReveal}
              custom={1}
            >
              I partner with teams that want bold, minimal, motion-rich products. Let&apos;s craft interfaces that feel intentional and alive.
            </motion.p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="mailto:hello@oussama.studio"
                className="px-10 py-4 bg-foreground text-background uppercase tracking-[0.28em] font-semibold"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={textReveal}
              >
                Email
              </motion.a>
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('hero');
                }}
                className="px-10 py-4 border border-foreground text-foreground uppercase tracking-[0.28em] font-semibold hover:bg-foreground hover:text-background transition-all duration-500"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={textReveal}
                custom={1}
              >
                Back to top
              </motion.a>
            </div>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}
