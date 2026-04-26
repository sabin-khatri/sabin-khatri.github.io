/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaGithub, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaBootstrap, FaPhp } from "react-icons/fa";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";
import { SiTailwindcss, SiMysql } from "react-icons/si";
import { CgClose } from "react-icons/cg";

import chiyaghar from "../assets/projects/chiyaghar.png";
import trekking  from "../assets/projects/trekking.png";
import driving   from "../assets/projects/travel.png";
import carrental from "../assets/projects/carrental.png";

const TAG_ICONS = {
  HTML:          <FaHtml5     className="text-orange-400" />,
  CSS:           <FaCss3Alt   className="text-blue-400"   />,
  JavaScript:    <FaJsSquare  className="text-amber-400"  />,
  React:         <FaReact     className="text-cyan-400"   />,
  "Tailwind CSS":<SiTailwindcss className="text-sky-400"  />,
  Bootstrap:     <FaBootstrap className="text-purple-400" />,
  PHP:           <FaPhp       className="text-indigo-400" />,
  MySQL:         <SiMysql     className="text-blue-300"   />,
};

const PROJECTS = [
  {
    id: 1, num: "01",
    title: "Chiya Ghar",
    subtitle: "Premium Tea Experience",
    description: "A visually stunning landing page for a Nepali tea café. Featuring smooth parallax effects and a warm, inviting aesthetic that captures the essence of local tea culture.",
    image: chiyaghar,
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    liveUrl:   "https://bespoke-twilight-0dc185.netlify.app/",
    githubUrl: "https://github.com/sabin-khatri/ChiyaAdda",
  },
  {
    id: 2, num: "02",
    title: "Trekking Nepal",
    subtitle: "Adventure Expedition",
    description: "An immersive tourism platform designed to showcase the majestic Himalayas. Built with a focus on high-resolution imagery and fluid storytelling transitions.",
    image: trekking,
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    liveUrl:   "https://sabintrek.netlify.app/",
    githubUrl: "https://github.com/sabin-khatri/Trekking-Web",
  },
  {
    id: 3, num: "03",
    title: "Travel App",
    subtitle: "Modern Travel Agency",
    description: "A dynamic SPA built for travel enthusiasts. Features advanced filtering, category exploration, and sleek motion components.",
    image: driving,
    tags: ["React", "Tailwind CSS", "JavaScript"],
    liveUrl:   "https://travel-web-zeta-livid.vercel.app/",
    githubUrl: "https://github.com/sabin-khatri/Travel-web",
  },
  {
    id: 4, num: "04",
    title: "Gadi Rental",
    subtitle: "Automotive Booking",
    description: "A full-scale car rental solution with a focus on UX. Includes a sophisticated booking flow and a modern, responsive dashboard-style interface.",
    image: carrental,
    tags: ["React", "Tailwind CSS", "JavaScript"],
    liveUrl:   "https://gadi-rental.netlify.app/",
    githubUrl: "https://github.com/sabin-khatri/Car-Rental",
  },
];

/* ─── Project Card ───────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index, onImageClick }) => {
  const ref    = useRef(null);
  /* amount: 0 → triggers as soon as 1px enters viewport = instant feel */
  const inView = useInView(ref, { once: true, amount: 0 });
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      /* shorter duration + no heavy ease curve = snappier */
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center"
    >
      {/* ── Content ── */}
      <div className={`${isEven ? "lg:order-1" : "lg:order-2"} space-y-5`}>

        {/* number + subtitle */}
        <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
          <span className="text-amber-500 font-mono text-base font-bold tracking-widest">
            {project.num}
          </span>
          <div className="h-px w-10 bg-amber-500/50" />
          <span className="text-slate-400 uppercase tracking-[0.25em] text-xs font-semibold">
            {project.subtitle}
          </span>
        </div>

        {/* title */}
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tighter text-center lg:text-left">
          {project.title}
        </h3>

        {/* description */}
        <p className="text-slate-400 text-base leading-relaxed text-center lg:text-left max-w-lg mx-auto lg:mx-0">
          {project.description}
        </p>

        {/* tags — no per-tag animation to avoid cascade delay */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                         bg-white/[0.04] border border-white/10 text-slate-300
                         text-xs font-medium hover:border-amber-500/40 transition-colors"
            >
              {TAG_ICONS[tag]} {tag}
            </span>
          ))}
        </div>

        {/* action buttons */}
        <div className="flex items-center gap-5 justify-center lg:justify-start pt-2">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500
                       hover:bg-amber-400 text-black font-bold text-sm rounded-xl
                       transition-colors duration-200"
          >
            Live Preview <FiExternalLink />
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-slate-400
                       hover:text-amber-400 font-semibold text-sm transition-colors"
          >
            <FaGithub size={18} /> View Code
          </motion.a>
        </div>
      </div>

      {/* ── Image ── */}
      <div
        className={`${isEven ? "lg:order-2" : "lg:order-1"} relative group cursor-pointer`}
        onClick={() => onImageClick(project.image)}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-xl">
          {/* hover amber tint */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />

          <img
            src={project.image}
            alt={project.title}
            /* will-change: transform tells browser to GPU-composite this layer */
            className="w-full aspect-video object-cover
                       group-hover:scale-105 transition-transform duration-500 ease-out
                       will-change-transform"
            loading="lazy"
          />

          {/* expand label */}
          <div className="absolute inset-0 z-20 flex items-center justify-center
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          bg-black/35 backdrop-blur-[2px]">
            <span className="px-5 py-2 bg-white text-black rounded-full font-bold text-sm">
              Expand
            </span>
          </div>

          {/* project number badge */}
          <div className="absolute top-3 left-3 z-20 text-xs font-black text-amber-400/80
                          bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-400/20">
            {project.num}
          </div>
        </div>

        {/* decorative blur blob */}
        <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-amber-500/10
                        rounded-full blur-2xl -z-10 pointer-events-none" />
      </div>
    </motion.article>
  );
};

/* ─── Divider ────────────────────────────────────────────────────────────── */
const Divider = () => (
  <div className="flex items-center gap-4">
    <div className="flex-1 h-px bg-white/[0.05]" />
    <div className="flex gap-1.5">
      {[0,1,2].map((i) => <div key={i} className="w-1 h-1 rounded-full bg-amber-500/30" />)}
    </div>
    <div className="flex-1 h-px bg-white/[0.05]" />
  </div>
);

/* ─── Projects Section ───────────────────────────────────────────────────── */
const Projects = () => {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  return (
    <section id="projects" className="relative bg-[#0a0a0a] py-24 lg:py-36 overflow-hidden">

      {/* dot-grid — static, no JS cost */}
      <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(#f59e0b_0.8px,transparent_1px)]
                      [background-size:60px_60px] opacity-10" />

      {/* ambient blobs — static */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-600/4 blur-[110px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-5 sm:px-6 relative z-10">

        {/* Section header */}
        <div className="text-center lg:text-left mb-16 lg:mb-24 space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 justify-center lg:justify-start"
          >
            <span className="w-10 h-[2px] bg-amber-500" />
            <span className="text-amber-500 font-mono tracking-widest text-xs uppercase font-bold">
              Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tighter"
          >
            Selected <span className="text-amber-500">Works</span>
          </motion.h2>
        </div>

        {/* Project cards */}
        <div className="space-y-16 lg:space-y-28">
          {PROJECTS.map((project, index) => (
            <React.Fragment key={project.id}>
              <ProjectCard
                project={project}
                index={index}
                onImageClick={setLightboxSrc}
              />
              {index < PROJECTS.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20 lg:mt-32 text-center py-12 lg:py-16 rounded-3xl
                     bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm"
        >
          <p className="text-slate-500 text-xs font-mono tracking-widest uppercase mb-3">
            That's not all
          </p>
          <h4 className="text-xl sm:text-2xl font-bold text-white mb-6">
            More projects on <span className="text-amber-400">GitHub</span>
          </h4>
          <motion.a
            href="https://github.com/sabin-khatri"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-3 px-8 py-3.5
                       border border-amber-500 text-amber-500 hover:bg-amber-500
                       hover:text-black font-bold rounded-xl transition-all duration-250 text-sm"
          >
            <FaGithub size={18} /> Explore My GitHub <FiArrowRight />
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center
                       bg-black/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxSrc(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-amber-400
                         transition-colors"
              onClick={() => setLightboxSrc(null)}
            >
              <CgClose size={36} />
            </button>
            <motion.img
              src={lightboxSrc}
              alt="Project preview"
              className="max-w-full max-h-[88vh] rounded-2xl shadow-2xl border border-white/10"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;