/* eslint-disable no-unused-vars */
import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaGithub, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaBootstrap, FaPhp } from "react-icons/fa";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";
import { SiTailwindcss, SiMysql } from "react-icons/si";
import { CgClose } from "react-icons/cg";

// Assets
import chiyaghar from "../assets/projects/chiyaghar.png";
import trekking from "../assets/projects/trekking.png";
import driving from "../assets/projects/travel.png";
import carrental from "../assets/projects/carrental.png";

const TAG_ICONS = {
  HTML: <FaHtml5 className="text-orange-400" />,
  CSS: <FaCss3Alt className="text-blue-400" />,
  JavaScript: <FaJsSquare className="text-amber-400" />,
  React: <FaReact className="text-cyan-400" />,
  "Tailwind CSS": <SiTailwindcss className="text-sky-400" />,
  Bootstrap: <FaBootstrap className="text-purple-400" />,
  PHP: <FaPhp className="text-indigo-400" />,
  MySQL: <SiMysql className="text-blue-300" />,
};

const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "Chiya Ghar",
    subtitle: "Premium Tea Experience",
    description: "A visually stunning landing page for a Nepali tea café. Featuring smooth parallax effects and a warm, inviting aesthetic that captures the essence of local tea culture.",
    image: chiyaghar,
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://bespoke-twilight-0dc185.netlify.app/",
    githubUrl: "https://github.com/sabin-khatri/ChiyaAdda",
  },
  {
    id: 2,
    num: "02",
    title: "Trekking Nepal",
    subtitle: "Adventure Expedition",
    description: "An immersive tourism platform designed to showcase the majestic Himalayas. Built with a focus on high-resolution imagery and fluid storytelling transitions.",
    image: trekking,
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://sabintrek.netlify.app/",
    githubUrl: "https://github.com/sabin-khatri/Trekking-Web",
  },
  {
    id: 3,
    num: "03",
    title: "Travel App",
    subtitle: "Modern Travel Agency",
    description: "A dynamic Single Page Application (SPA) built for travel enthusiasts. Features advanced filtering, category exploration, and sleek motion components.",
    image: driving,
    tags: ["React", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://travel-web-zeta-livid.vercel.app/",
    githubUrl: "https://github.com/sabin-khatri/Travel-web",
  },
  {
    id: 4,
    num: "04",
    title: "Gadi Rental",
    subtitle: "Automotive Booking",
    description: "A full-scale car rental solution with a focus on User Experience. Includes a sophisticated booking flow and a modern, responsive dashboard-style interface.",
    image: carrental,
    tags: ["React", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://gadi-rental.netlify.app/",
    githubUrl: "https://github.com/sabin-khatri/Car-Rental",
  },
];

/* --- Small Decorative Particle Component --- */
const FloatingParticle = ({ count = 15 }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 5 + 5,
    })), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-500/20"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

/* --- Project Card Component --- */
const ProjectCard = ({ project, index, onImageClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
    >
      {/* Content Side */}
      <div className={`${isEven ? "lg:order-1" : "lg:order-2"} space-y-6`}>
        <div className="flex items-center gap-4">
          <span className="text-amber-500 font-mono text-lg font-bold tracking-widest">{project.num}</span>
          <div className="h-[1px] w-12 bg-amber-500/50" />
          <span className="text-slate-400 uppercase tracking-[0.3em] text-xs font-semibold">{project.subtitle}</span>
        </div>

        <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter">
          {project.title}
        </h3>

        <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
          {project.description}
        </p>

        {/* Tags with Staggered Entrance */}
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:border-amber-500/50 transition-colors"
            >
              {TAG_ICONS[tag]} {tag}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6 pt-4">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            className="group flex items-center gap-2 text-white font-bold text-sm bg-amber-500 px-6 py-3 rounded-xl hover:bg-amber-400 transition-all"
          >
            Live Preview <FiExternalLink />
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            className="flex items-center gap-2 text-slate-400 hover:text-amber-500 font-bold text-sm transition-all"
          >
            <FaGithub size={20} /> View Code
          </motion.a>
        </div>
      </div>

      {/* Image Side */}
      <motion.div
        className={`${isEven ? "lg:order-2" : "lg:order-1"} relative group`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <div 
          className="relative overflow-hidden rounded-2xl border border-white/10 cursor-pointer shadow-2xl"
          onClick={() => onImageClick(project.image)}
        >
          {/* Overlay Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Click to View Indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
            <span className="px-5 py-2 bg-white text-black rounded-full font-bold text-sm">Expand Project</span>
          </div>
        </div>

        {/* Geometric Decoration */}
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -z-10" />
      </motion.div>
    </motion.article>
  );
};

const Projects = () => {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  return (
    <section id="projects" className="relative bg-[#0a0a0a] py-24 lg:py-40 overflow-hidden">
      {/* Shared Background with Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_0.8px,transparent_1px)] [background-size:60px_60px] opacity-10" />
      <FloatingParticle />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center lg:text-left mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 justify-center lg:justify-start"
          >
            <span className="w-12 h-[2px] bg-amber-500" />
            <span className="text-amber-500 font-mono tracking-widest text-sm uppercase font-bold">Portfolio</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-bold text-white tracking-tighter"
          >
            Selected <span className="text-amber-500">Works</span>
          </motion.h2>
        </div>

        {/* Projects List */}
        <div className="space-y-32 lg:space-y-48">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onImageClick={setLightboxSrc}
            />
          ))}
        </div>

        {/* View More Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center py-16 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl"
        >
          <h4 className="text-2xl font-bold text-white mb-6">Want to see more?</h4>
          <motion.a
            href="https://github.com/sabin-khatri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-bold rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My GitHub <FiArrowRight />
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxSrc(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <CgClose size={40} />
            </button>
            <motion.img
              src={lightboxSrc}
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl border border-white/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;