import React, { useRef, useState } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import {
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaBootstrap,
  FaPhp,
  FaNodeJs,
} from "react-icons/fa";
import {
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiBookOpen,
} from "react-icons/fi";
import {
  SiTailwindcss,
  SiMysql,
  SiFramer,
  SiTypescript,
  SiSupabase,
} from "react-icons/si";
import { playClickSound } from "../utils/audio";

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
  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 font-mono text-xs">
    {ALL_TAGS.map((tag) => {
      const isActive = tag === active;
      return (
        <button
          key={tag}
          type="button"
          onClick={() => onChange(tag)}
          aria-pressed={isActive}
          className={`relative px-3 sm:px-4 py-1.5 rounded-full border transition-colors duration-300 ${
            isActive
              ? "text-black border-transparent font-bold"
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
/* Card Body (Editorial Book Plate Layout)                             */
/* ------------------------------------------------------------------ */
const CardBody = ({ project, total }) => (
  <div className="flex flex-col h-full justify-between">
    {/* Page Header Strip */}
    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 sm:mb-4 text-[11px] font-mono text-slate-400 select-none">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--os-accent)]" />
        <span className="tracking-wider uppercase text-slate-300">
          PLATE // {project.num} OF {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-slate-500 tracking-widest text-[10px]">
          SABIN-OS // ARCHIVE
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ACTIVE
        </span>
      </div>
    </div>

    {/* Main Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-4 sm:gap-6 lg:gap-8 items-stretch flex-1 min-h-0">
      {/* Image Preview Window */}
      <div className="relative group min-w-0 flex flex-col justify-center">
        <div className="relative h-44 sm:h-56 lg:h-full lg:min-h-[290px] max-h-[360px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black/50">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30 pointer-events-none" />

          {/* Quip Pill */}
          <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/90 backdrop-blur">
            {project.quip}
          </span>

          {/* Watermark Number */}
          <span
            className="absolute bottom-2 right-3 font-mono text-4xl sm:text-6xl font-black tracking-tighter text-white/50 drop-shadow-lg select-none"
            aria-hidden="true"
          >
            {project.num}
          </span>

          {/* Featured Tag */}
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]" />
            Featured work
          </span>
        </div>
      </div>

      {/* Details Column */}
      <div className="flex flex-col justify-between min-w-0 py-1 sm:py-2">
        <div>
          {/* Subtitle */}
          <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
            <span className="h-px w-6 bg-accent/70" />
            <span className="text-accent font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase truncate">
              {project.subtitle}
            </span>
          </div>

          {/* Title */}
          <h3 className="break-words text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 tracking-[-0.035em] leading-[1.1]">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-slate-300/80 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 sm:line-clamp-4">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-medium text-slate-200 flex items-center gap-1.5 backdrop-blur"
              >
                <span className="text-sm leading-none">{TAG_ICONS[tag]}</span>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative z-20 pt-3 border-t border-white/10 flex flex-wrap gap-2.5 w-full">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 flex-1 sm:flex-initial min-h-10 px-5 py-2.5 bg-white text-black font-bold rounded-full hover:bg-accent active:scale-[0.97] transition-all duration-300 text-xs sm:text-sm shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
          >
            Live Preview <FiExternalLink className="text-sm" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 flex-1 sm:flex-initial min-h-10 px-5 py-2.5 border border-white/20 text-white hover:text-accent hover:border-accent/40 font-medium transition-all rounded-full text-xs sm:text-sm active:scale-[0.97]"
          >
            <FaGithub className="text-sm" /> Source Code
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Dog-ear corner fold */}
    <div
      className="absolute bottom-0 right-0 w-7 h-7 pointer-events-none overflow-hidden rounded-br-2xl"
      aria-hidden="true"
    >
      <div className="absolute bottom-0 right-0 w-0 h-0 border-solid border-t-[18px] border-l-[18px] border-b-0 border-r-0 border-t-[#22242e] border-l-transparent shadow-[-2px_-2px_4px_rgba(0,0,0,0.6)]" />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Individual Book Page with 3D Scroll Physics & Reverse Face          */
/* ------------------------------------------------------------------ */
const BookPage = ({
  project,
  index,
  total,
  scrollYProgress,
  isActive,
  reducedMotion,
}) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const isFirst = index === 0;
  const isLast = index === total - 1;
  const S = total > 1 ? 1 / total : 1;

  // Timeline for this page emerging from underneath the previous page
  const prevStart = isFirst ? 0 : (index - 1 + 0.32) * S;
  const prevEnd = isFirst ? 0 : (index - 1 + 0.92) * S;

  // Timeline for this page flipping away to reveal the next page
  const myStart = isLast ? 1 : (index + 0.32) * S;
  const myMid = isLast ? 1 : (index + 0.64) * S;
  const myEnd = isLast ? 1 : (index + 0.92) * S;

  // Monotonic input array for page flip transforms
  const flipRange = isLast ? [0, 1] : [0, myStart, myMid, myEnd, 1];
  const rotateYRange = isLast || reducedMotion ? [0, 0] : [0, 0, -80, -135, -135];
  const opacityRange = isLast || reducedMotion ? [1, 1] : [1, 1, 1, 0, 0];
  const shadowRange = isLast || reducedMotion ? [0, 0] : [0, 0, 0.82, 0, 0];
  const xRange = isLast || reducedMotion ? [0, 0] : [0, 0, -25, -60, -60];
  const zRange = isLast || reducedMotion ? [0, 0] : [0, 0, 45, -20, -20];

  // Monotonic input array for emerging from underneath
  const emergeRange = isFirst ? [0, 1] : [0, prevStart, prevEnd, 1];
  const scaleRange = isFirst || reducedMotion ? [1, 1] : [0.965, 0.965, 1, 1];
  const dimRange = isFirst || reducedMotion ? [0, 0] : [0.38, 0.38, 0, 0];

  const rotateY = useTransform(scrollYProgress, flipRange, rotateYRange);
  const pageOpacity = useTransform(scrollYProgress, flipRange, opacityRange);
  const frontShadow = useTransform(scrollYProgress, flipRange, shadowRange);
  const pageX = useTransform(scrollYProgress, flipRange, xRange);
  const pageZ = useTransform(scrollYProgress, flipRange, zRange);
  const scale = useTransform(scrollYProgress, emergeRange, scaleRange);
  const dimOverlay = useTransform(scrollYProgress, emergeRange, dimRange);

  const zIndex = (total - index) * 10;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "absolute",
        inset: 0,
        zIndex,
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
        rotateY,
        opacity: pageOpacity,
        scale,
        x: pageX,
        z: pageZ,
        pointerEvents: isActive ? "auto" : "none",
        "--mx": "50%",
        "--my": "50%",
        "--glow": project.glow,
      }}
      className="w-full h-full"
    >
      {/* ─── FRONT FACE (Project Presentation) ─────────────────── */}
      <div
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        className="absolute inset-0 rounded-2xl sm:rounded-[2rem] bg-[#101116] border border-white/[0.12] shadow-[0_24px_70px_rgba(0,0,0,0.65)] p-3.5 sm:p-6 lg:p-7 overflow-y-auto overflow-x-hidden overscroll-contain backdrop-blur-xl"
      >
        {/* Mouse Spotlight Glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-[2rem] opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(420px circle at var(--mx) var(--my), rgba(var(--glow), 0.14), transparent 65%)`,
          }}
        />

        {/* Left Book Spine Crease Shadow */}
        <div
          className="pointer-events-none absolute left-0 inset-y-0 w-8 z-10 bg-gradient-to-r from-black/70 via-black/20 to-transparent"
          aria-hidden="true"
        />

        {/* Content */}
        <CardBody project={project} total={total} />

        {/* Dynamic Shadow Cast When Turning (gives paper thickness & lighting) */}
        <motion.div
          style={{ opacity: frontShadow }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-30"
          aria-hidden="true"
        />

        {/* Dim Overlay when sitting underneath previous page */}
        <motion.div
          style={{ opacity: dimOverlay }}
          className="pointer-events-none absolute inset-0 bg-black/60 z-30"
          aria-hidden="true"
        />
      </div>

      {/* ─── BACK FACE (Seen when page turns past 90 degrees) ─── */}
      <div
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
        className="absolute inset-0 rounded-2xl sm:rounded-[2rem] bg-[#0c0d12] border border-white/10 p-5 sm:p-7 flex flex-col justify-between overflow-hidden shadow-2xl select-none"
      >
        {/* Blueprint Paper Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Flipped spine seam shadow (now on right side) */}
        <div
          className="absolute right-0 inset-y-0 w-10 pointer-events-none bg-gradient-to-l from-black/85 via-black/30 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[10px] sm:text-xs text-slate-500">
          <span>SPECIFICATION SHEET // REVERSE</span>
          <span>SABIN-OS FOLIO</span>
        </div>

        <div className="relative z-10 my-auto text-center py-6">
          <span className="font-mono text-6xl sm:text-8xl font-black text-white/[0.08] block select-none">
            {project.num}
          </span>
          <h4 className="font-mono text-sm sm:text-base text-accent font-bold tracking-widest uppercase mt-1">
            {project.title}
          </h4>
          <p className="font-mono text-[10px] sm:text-xs text-slate-500 mt-2">
            // TURNED PAGE • ARCHIVED
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] text-slate-600">
          <span>PLATE {project.num} OF {String(total).padStart(2, "0")}</span>
          <span className="text-accent/60">SABIN KHATRI • 2026</span>
        </div>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Main Projects Component with Stacked Book Experience                */
/* ------------------------------------------------------------------ */
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags.includes(activeFilter));

  const total = filteredProjects.length;

  // Outer scroll track height: proportional to project count
  const sectionHeight = total <= 1 ? "auto" : `${total * 95 + 15}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track the active page based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (total <= 1) {
      if (currentPage !== 0) setCurrentPage(0);
      return;
    }
    const S = 1 / total;
    let active = 0;
    for (let i = 0; i < total; i++) {
      const threshold = (i + 0.6) * S;
      if (latest >= threshold && i < total - 1) {
        active = i + 1;
      }
    }
    if (active !== currentPage) {
      setCurrentPage(active);
    }
  });

  // Smooth scroll to a specific page
  const goToPage = (pageIndex) => {
    if (!containerRef.current || total <= 1) return;
    const targetIndex = Math.max(0, Math.min(total - 1, pageIndex));
    const el = containerRef.current;
    const rect = el.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const totalScrollable = el.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    let targetProgress;
    if (targetIndex === 0) {
      targetProgress = 0.02;
    } else if (targetIndex === total - 1) {
      targetProgress = 0.98;
    } else {
      targetProgress = (targetIndex + 0.12) / total;
    }

    const targetY = containerTop + targetProgress * totalScrollable;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
    playClickSound();
  };

  const handleFilterChange = (tag) => {
    setActiveFilter(tag);
    setCurrentPage(0);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const targetTop = rect.top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    }
    playClickSound();
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-section overflow-x-clip h-auto md:h-[var(--projects-height)]"
      style={{ "--projects-height": sectionHeight }}
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Sticky Viewport Container */}
      <div className="md:sticky md:top-0 md:h-[100svh] w-full flex flex-col justify-start md:justify-between items-center py-8 md:py-6 lg:py-8 px-4 sm:px-6 md:overflow-hidden">
        {/* ─── Top Header & Filter ─────────────────────────── */}
        <div className="w-full max-w-5xl text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <FiBookOpen className="text-accent text-xs sm:text-sm" />
              <span className="text-accent font-mono tracking-[0.3em] text-[11px] sm:text-xs font-bold uppercase">
                Interactive Folio // Selected Works
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-os-text mb-3 sm:mb-4">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">
                Projects.
              </span>
            </h2>
          </motion.div>

          <div className="hidden md:block"><FilterTabs active={activeFilter} onChange={handleFilterChange} /></div>
        </div>

        <div className="md:hidden w-full max-w-xl min-w-0 mt-2 pb-8">
          <FilterTabs active={activeFilter} onChange={handleFilterChange} />
          <div className="space-y-5">
            {filteredProjects.map((project) => (
              <article key={project.id} className="min-w-0 rounded-2xl border border-white/10 bg-[#101116] shadow-xl">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-black/60">
                  <img src={project.image} alt={project.title} className="h-full w-full object-contain" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 right-3 font-mono text-5xl font-black text-white/60">{project.num}</span>
                </div>
                <div className="min-w-0 p-4 sm:p-5">
                  <p className="mb-2 break-words font-mono text-[10px] uppercase tracking-[0.12em] leading-relaxed text-accent">{project.subtitle}</p>
                  <h3 className="mb-2 break-words text-2xl font-bold leading-tight text-white">{project.title}</h3>
                  <p className="mb-4 break-words text-sm leading-relaxed text-slate-300">{project.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-200"><span>{TAG_ICONS[tag]}</span>{tag}</span>)}
                  </div>
                  <div className="flex flex-col min-[380px]:flex-row gap-2 border-t border-white/10 pt-3">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-white px-3 text-xs font-bold text-black">Live Preview <FiExternalLink className="shrink-0" /></a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-3 text-xs text-white"><FaGithub className="shrink-0" /> Source Code</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ─── The Book Stack ──────────────────────────────── */}
        <div className="hidden md:flex w-full max-w-5xl relative z-10 flex-1 flex-col justify-center min-h-0 py-1 sm:py-2">
          {/* Outer Book Binder Frame */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#090a0d]/90 border border-white/10 p-2 sm:p-3 sm:pl-9 lg:pl-11 shadow-[0_30px_100px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
            {/* Left Book Spine & Binding Rivets */}
            <div
              className="absolute left-0 top-0 bottom-0 w-7 sm:w-9 lg:w-11 z-40 rounded-l-2xl sm:rounded-l-3xl flex flex-col items-center justify-between py-6 select-none pointer-events-none border-r border-white/15 bg-gradient-to-r from-[#0d0e12] via-[#14151b] to-[#0a0b0e] shadow-[4px_0_15px_rgba(0,0,0,0.6)]"
              aria-hidden="true"
            >
              {[0, 1, 2, 3].map((ring) => (
                <div key={ring} className="relative flex flex-col items-center">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-white/30 via-slate-400/20 to-black/80 border border-white/20 shadow-inner flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/90 shadow-inner" />
                  </div>
                  <div className="w-0.5 h-6 bg-white/15 -my-0.5" />
                </div>
              ))}
              <div className="text-[9px] font-mono tracking-widest text-white/30 -rotate-90 whitespace-nowrap uppercase">
                BINDING // FOLIO
              </div>
            </div>

            {/* Stacked Paper Deck Layers (Thickness of pages beneath) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-2 -right-3 left-6 -z-30 rounded-2xl sm:rounded-[2rem] border border-white/5 bg-[#07080a] shadow-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-1.5 -right-2 left-4 -z-20 rounded-2xl sm:rounded-[2rem] border border-white/[0.08] bg-[#0b0c10] shadow-xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0.5 -right-1 left-2 -z-10 rounded-2xl sm:rounded-[2rem] border border-white/[0.12] bg-[#0f1015]"
            />

            {/* Book Top Toolbar: Chapter Tabs & Page Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 sm:px-4 py-2 mb-2 rounded-xl bg-white/[0.025] border border-white/[0.08]">
              {/* Chapter Tabs */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5">
                {filteredProjects.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => goToPage(idx)}
                    className={`px-2.5 sm:px-3 py-1 rounded-lg font-mono text-[11px] sm:text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      currentPage === idx
                        ? "bg-accent text-black font-bold shadow-[0_0_12px_rgba(var(--accent-rgb),0.35)]"
                        : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
                    }`}
                  >
                    <span>{p.num}</span>
                    <span className="hidden md:inline">{p.title}</span>
                  </button>
                ))}
              </div>

              {/* Page Counter & Controls */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="font-mono text-xs text-slate-300 flex items-center gap-1.5">
                  <span className="text-accent font-bold">
                    PAGE {String(currentPage + 1).padStart(2, "0")}
                  </span>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-400">
                    {String(total).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 0}
                    aria-label="Previous Page"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/15 disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center text-white transition-colors"
                  >
                    <FiChevronLeft className="text-sm sm:text-base" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= total - 1}
                    aria-label="Next Page"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/15 disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center text-white transition-colors"
                  >
                    <FiChevronRight className="text-sm sm:text-base" />
                  </button>
                </div>
              </div>
            </div>

            {/* ─── The Stack of Pages (3D Perspective Container) ── */}
            <div
              className="relative w-full h-[min(56svh,490px)] min-h-[300px] sm:h-[480px] sm:min-h-0 lg:h-[490px] [perspective:1800px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {filteredProjects.map((project, index) => (
                <BookPage
                  key={`${activeFilter}-${project.id}`}
                  project={project}
                  index={index}
                  total={total}
                  scrollYProgress={scrollYProgress}
                  isActive={currentPage === index}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom Status & Scroll Hint ─────────────────── */}
        <div className="hidden md:flex w-full max-w-5xl items-center justify-between text-slate-400 font-mono text-[10px] sm:text-xs pt-1 sm:pt-2 border-t border-white/5 relative z-20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="hidden sm:inline">
              Scroll down to flip pages like a book • or click tabs
            </span>
            <span className="sm:hidden">Scroll to turn pages</span>
          </div>

          {/* Mini Page Progress Dots */}
          <div className="flex items-center gap-1.5">
            {filteredProjects.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i)}
                aria-label={`Jump to page ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  currentPage === i
                    ? "w-5 h-1.5 bg-accent"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
