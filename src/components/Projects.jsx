import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaGithub, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaBootstrap, FaPhp, FaNodeJs } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { SiTailwindcss, SiMysql, SiFramer, SiTypescript, SiSupabase } from "react-icons/si";

import chiyaghar from "../assets/projects/chiya.jpg";
import trekking from "../assets/projects/trekking.jpg";
import realtime from "../assets/projects/realtime-complaint.jpg";
import district from "../assets/projects/district-score.jpg";

const TAG_ICONS = {
  HTML: <FaHtml5 className="text-orange-400" />,
  CSS: <FaCss3Alt className="text-blue-400" />,
  JavaScript: <FaJsSquare className="text-amber-400" />,
  React: <FaReact className="text-cyan-400" />,
  "Tailwind CSS": <SiTailwindcss className="text-sky-400" />,
  Bootstrap: <FaBootstrap className="text-purple-400" />,
  PHP: <FaPhp className="text-indigo-400" />,
  MySQL: <SiMysql className="text-blue-300" />,
  "Node.js": <FaNodeJs className="text-green-400" />,
  "Framer Motion": <SiFramer className="text-pink-400" />,
  TypeScript: <SiTypescript className="text-blue-400" />,
  Supabase: <SiSupabase className="text-emerald-400" />,
};

const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "Real-Time Complaint Hub",
    quip: "Bug reports go here",
    subtitle: "Smart Complaint Management System",
    description:
      "A real-time complaint management platform that enables users to submit, track, and monitor complaints efficiently. The system provides instant status updates, role-based dashboards, and a responsive user experience for faster issue resolution.",
    image: realtime,
    tags: ["React", "Tailwind CSS", "Node.js"],
    liveUrl: "https://realtime-complaint-tracking.netlify.app/",
    githubUrl: "https://github.com/sabin-khatri/realtime-complaint-tracking-hub",
    glow: "225, 60, 60",
  },
  {
    id: 2,
    num: "02",
    title: "Chiya Ghar",
    quip: "Freshly brewed UI",
    subtitle: "Modern Tea Café Website",
    description:
      "A modern and responsive website for a Nepali tea café featuring smooth animations, interactive UI, elegant layouts, and an engaging user experience to showcase products, services, and the café's unique atmosphere.",
    image: chiyaghar,
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://chiya-adda.vercel.app/",
    githubUrl: "https://github.com/sabin-khatri/ChiyaAdda",
    glow: "217, 149, 60",
  },
  {
    id: 3,
    num: "03",
    title: "Trekking Nepal",
    quip: "Scroll responsibly",
    subtitle: "Tourism & Adventure Platform",
    description:
      "A visually appealing trekking and tourism platform designed to explore Nepal's natural beauty. It includes responsive layouts, engaging animations, destination highlights, and an immersive browsing experience.",
    image: trekking,
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://trekking-web-mu69.vercel.app/",
    githubUrl: "https://github.com/sabin-khatri/trekking_web",
    glow: "52, 195, 143",
  },
  {
    id: 4,
    num: "04",
    title: "District Score",
    quip: "Data, but make it scenic",
    subtitle: "Hackathon Data Dashboard",
    description:
      "A hackathon project developed collaboratively to visualize district-level data through an interactive dashboard. Built with Supabase for backend services, it offers secure data management, responsive design, and real-time information presentation.",
    image: district,
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    liveUrl: "https://district-scrore.vercel.app/",
    githubUrl: "https://github.com/sabin-khatri/DistrictScrore",
    glow: "56, 135, 230",
  },
];

const ALL_TAGS = ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))];

/* ------------------------------------------------------------------ */
/* Filter tabs                                                         */
/* ------------------------------------------------------------------ */
const FilterTabs = ({ active, onChange }) => (
  <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-14 lg:mb-10 font-mono text-xs sm:text-sm">
    {ALL_TAGS.map((tag) => {
      const isActive = tag === active;
      return (
        <button
          key={tag}
          type="button"
          onClick={() => onChange(tag)}
          aria-pressed={isActive}
          className={`relative px-4 py-2 rounded-full border transition-colors duration-300 ${
            isActive
              ? "text-black border-transparent"
              : "text-slate-400 border-white/10 hover:text-white hover:border-white/30"
          }`}
        >
          {isActive && (
            <motion.span
              layoutId="activeTabPill"
              className="absolute inset-0 rounded-full bg-accent"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          <span className="relative z-10">{tag === "All" ? "// all" : tag}</span>
        </button>
      );
    })}
  </div>
);

/* ------------------------------------------------------------------ */
/* Card content (same for book + static layouts)                       */
/* ------------------------------------------------------------------ */
const CardBody = ({ project }) => (
  <>
    <div className="relative grid grid-cols-1 lg:grid-cols-[1.08fr_.92fr] gap-5 sm:gap-8 lg:gap-10 items-stretch">
      <div className="relative group min-w-0">
        <div className="relative h-full min-h-56 sm:min-h-72 lg:min-h-[340px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black/40">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.045]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/25" />
          <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-white/90 backdrop-blur sm:left-4 sm:top-4 sm:text-[10px]">
            {project.quip}
          </span>
          <span
            className="absolute bottom-3 right-4 font-mono text-5xl sm:text-7xl font-black tracking-tighter text-white/75 drop-shadow-lg select-none"
            aria-hidden="true"
          >
            {project.num}
          </span>
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" /> Featured work
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center min-w-0 py-1 sm:py-3 lg:py-5">
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
          <span className="h-px w-8 bg-accent/70" />
          <span className="text-accent font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase truncate">
            {project.subtitle}
          </span>
        </div>

        <h3 className="break-words text-[clamp(1.65rem,7vw,2.2rem)] sm:text-4xl lg:text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-white mb-3 sm:mb-5 tracking-[-0.045em] leading-[1.04]">
          {project.title}
        </h3>
        <p className="text-slate-300/75 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 line-clamp-3 sm:line-clamp-none">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1.5 rounded-lg bg-white/[0.045] border border-white/[0.09] text-[11px] sm:text-xs font-medium text-slate-200 flex items-center gap-1.5"
            >
              <span className="text-sm sm:text-base leading-none">{TAG_ICONS[tag]}</span>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="relative z-20 mt-5 sm:mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3 w-full">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-12 px-6 py-3 sm:px-8 sm:py-3.5 bg-white text-black font-bold rounded-full hover:bg-accent active:scale-[0.97] transition-colors duration-300 text-sm sm:text-base"
      >
        Live Preview <FiExternalLink className="text-base sm:text-lg" />
      </a>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-12 px-6 py-3 sm:px-8 sm:py-3.5 border border-white/20 text-white hover:text-accent hover:border-accent/40 font-medium transition-colors rounded-full text-sm sm:text-base active:scale-[0.97]"
      >
        <FaGithub className="text-base sm:text-lg" /> Source Code
      </a>
    </div>
  </>
);

/* ------------------------------------------------------------------ */
/* Card shell (glow follows the mouse)                                 */
/* ------------------------------------------------------------------ */
const ProjectCardShell = ({ project, children, className = "", style, bookPage = false }) => {
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={bookPage ? { opacity: 1, rotateY: -72, x: -12 } : { opacity: 1, y: 20, scale: 0.985 }}
      whileInView={bookPage ? { opacity: 1, rotateY: 0, x: 0 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: bookPage ? 0.85 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`group/card relative bg-[#101116] border border-white/[0.12] rounded-2xl sm:rounded-[2rem] shadow-[0_32px_100px_rgba(0,0,0,.5)] p-3 sm:p-5 lg:p-6 ${
        "overflow-hidden backdrop-blur-xl"
      } ${className}`}
      style={{
        "--mx": "50%",
        "--my": "50%",
        "--glow": project.glow,
        transformOrigin: bookPage ? "left center" : undefined,
        backfaceVisibility: bookPage ? "hidden" : undefined,
        ...style,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-[2rem] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(480px circle at var(--mx) var(--my), rgba(var(--glow), 0.12), transparent 60%)`,
        }}
      />
      {children}
    </motion.article>
  );
};

const BookProjectCard = ({ project }) => (
  <div className="relative pr-2 sm:pr-3">
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-2 -right-1 left-5 -z-10 rounded-[2rem] border border-white/10 bg-[#0b0c10]" />
    <ProjectCardShell project={project} bookPage className="relative w-full origin-left">
      <CardBody project={project} />
    </ProjectCardShell>
  </div>
);

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
const Projects = () => {
  const [activeFilter, setActiveFilter] = React.useState("All");

  const filteredProjects =
    activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="projects" className="relative bg-section overflow-x-clip">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10 pt-16 sm:pt-24 lg:pt-36">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-accent font-mono tracking-[0.3em] sm:tracking-[0.4em] text-xs font-bold uppercase mb-3 sm:mb-4 block">
            Selected Works
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-os-text">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">
              Projects.
            </span>
          </h2>
        </motion.div>

        <FilterTabs active={activeFilter} onChange={setActiveFilter} />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10 pb-16 sm:pb-24 lg:pb-32">
        <div className="relative isolate pl-4 [perspective:1600px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-20 w-4 rounded-full bg-gradient-to-r from-black via-white/15 to-transparent" />
          <div className="flex flex-col gap-7 sm:gap-10">
            {filteredProjects.map((project) => (
              <BookProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
