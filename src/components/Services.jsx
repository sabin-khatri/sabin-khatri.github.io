import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaCode, FaMobileAlt, FaPalette, FaRocket, FaCogs, FaSearch } from 'react-icons/fa';

const SERVICES = [
  {
    icon: FaCode,
    title: 'Frontend Development',
    desc: 'Pixel-perfect React apps with Vite, Tailwind, and smooth Framer Motion animations.',
    tags: ['React', 'Vite', 'TypeScript'],
  },
  {
    icon: FaMobileAlt,
    title: 'Responsive Design',
    desc: 'Mobile-first layouts that look stunning on every screen — from phone to ultrawide.',
    tags: ['Tailwind', 'CSS Grid', 'Flexbox'],
  },
  {
    icon: FaPalette,
    title: 'UI/UX Design',
    desc: 'Clean interfaces with thoughtful micro-interactions and accessible color systems.',
    tags: ['Figma', 'Design Systems', 'A11y'],
  },
  {
    icon: FaRocket,
    title: 'Performance',
    desc: 'Lazy loading, code splitting, and GPU-friendly animations for blazing-fast sites.',
    tags: ['Lighthouse', 'Core Web Vitals', 'Three.js'],
  },
  {
    icon: FaCogs,
    title: 'Full-Stack Basics',
    desc: 'REST APIs with Node.js, Express, MongoDB — enough to ship complete products.',
    tags: ['Node.js', 'MongoDB', 'Express'],
  },
  {
    icon: FaSearch,
    title: 'SEO & Deployment',
    desc: 'Optimized builds deployed to Netlify, Vercel, and GitHub Pages with CI/CD.',
    tags: ['Netlify', 'Vercel', 'GitHub Actions'],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const Services = () => (
  <section id="services" className="relative bg-section py-24 lg:py-32 overflow-hidden">
    <div className="absolute inset-0 dot-grid-sm opacity-[0.04] pointer-events-none" />
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none blur-[120px] rounded-full"
      style={{ background: 'rgba(var(--accent-rgb), 0.06)' }}
    />

    <div className="container mx-auto max-w-6xl px-5 sm:px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 lg:mb-20"
      >
        <span className="text-accent font-mono tracking-[0.4em] text-xs font-bold uppercase mb-3 block">
          What I Do
        </span>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-os-text"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Services &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">
            Expertise
          </span>
        </h2>
        <p className="text-os-muted mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          From concept to deployment — I craft modern web experiences that are fast, accessible, and visually unique.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        {SERVICES.map((svc) => {
          const Icon = svc.icon;
          return (
            <motion.div
              key={svc.title}
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative p-5 sm:p-6 rounded-2xl border border-os bg-os-card/40 backdrop-blur-sm transition-colors duration-300"
              style={{
                borderColor: 'var(--os-border)',
                background: 'color-mix(in srgb, var(--os-card) 60%, transparent)',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                style={{
                  background: 'rgba(var(--accent-rgb), 0.12)',
                  color: 'var(--os-accent)',
                }}
              >
                <Icon className="text-lg" />
              </div>
              <h3
                className="text-lg font-bold text-os-text mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {svc.title}
              </h3>
              <p className="text-sm text-os-muted leading-relaxed mb-4">{svc.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider"
                    style={{
                      background: 'rgba(var(--accent-rgb), 0.08)',
                      color: 'var(--os-accent)',
                      border: '1px solid rgba(var(--accent-rgb), 0.15)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div
                className="absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
                style={{ background: 'linear-gradient(90deg, transparent, var(--os-accent), transparent)' }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default Services;
