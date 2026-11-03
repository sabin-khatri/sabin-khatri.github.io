import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
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
    color: "from-red-900/40 to-section",
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
    color: "from-amber-900/40 to-section",
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
    color: "from-emerald-900/40 to-section",
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
    color: "from-blue-900/40 to-section",
    glow: "56, 135, 230",
  },
];

const ALL_TAGS = ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))];

const canUseProjectStack = () => (
  window.innerWidth >= 1200 &&
  window.innerHeight >= 800 &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches
);

const FilterTabs = ({ active, onChange }) => (
  <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-14 lg:mb-20 font-mono text-xs sm:text-sm">
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

const CardBody = ({ project }) => (
  <>
          <div className="relative grid grid-cols-1 lg:grid-cols-[1.08fr_.92fr] gap-5 sm:gap-8 lg:gap-10 items-stretch">
            <div className="relative group min-w-0">
              <div className="relative h-full min-h-56 sm:min-h-72 lg:min-h-[390px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black/40">
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
                <span className="absolute bottom-3 right-4 font-mono text-5xl sm:text-7xl font-black tracking-tighter text-white/75 drop-shadow-lg select-none" aria-hidden="true">
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

const ProjectCardShell = ({ project, children, className = "", style, stacked = false }) => {
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
      initial={stacked ? false : { opacity: 1, y: 20, scale: 0.985 }}
      whileInView={stacked ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={stacked ? undefined : { once: true, amount: 0.12 }}
      transition={stacked ? undefined : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`group/card relative bg-[#101116] border border-white/[0.12] rounded-2xl sm:rounded-[2rem] shadow-[0_32px_100px_rgba(0,0,0,.5)] p-3 sm:p-5 lg:p-6 ${stacked ? "overflow-visible" : "overflow-hidden"} backdrop-blur-xl ${className}`}
      style={{
        perspective: "1000px",
        "--mx": "50%",
        "--my": "50%",
        "--glow": project.glow,
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

const PaperCarrier = ({ opacity }) => (
  <motion.div aria-hidden="true" style={{ opacity }} className="pointer-events-none absolute -top-[3.4rem] right-6 z-40 flex flex-col items-center text-accent drop-shadow-[0_0_12px_rgba(255,160,70,.45)]">
    <svg viewBox="0 0 72 48" className="h-10 w-14 overflow-visible">
      <path d="M36 8 8 2l16 12-9 4 18-3 18 3-9-4L64 2 36 8Z" fill="currentColor" stroke="white" strokeOpacity=".65" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m36 8-3 10 3 5 3-5-3-10Z" fill="#fff" fillOpacity=".8" />
      <path d="M36 23v21" stroke="white" strokeOpacity=".75" strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="m32 43 4 4 4-4" fill="none" stroke="white" strokeOpacity=".75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="mt-0.5 rounded-full border border-white/10 bg-black/70 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[.18em] text-white/65 backdrop-blur">next up</span>
  </motion.div>
);

const PaperProjectCard = ({ project, index, total, progress, activeIndex }) => {
  const segment = 1 / Math.max(total, 1);
  const start = index * segment;
  const enter = Math.max(0, start - segment * 0.16);
  const exit = Math.min(1, start + segment + segment * 0.16);
  const entryRange = [enter, enter + segment * 0.18, exit - segment * 0.18, exit];
  const y = useTransform(
    progress,
    entryRange,
    [index === 0 ? 0 : 18, 0, 0, index === total - 1 ? 0 : -12]
  );
  const x = useTransform(
    progress,
    entryRange,
    [index === 0 ? "0vw" : "105vw", "0vw", "0vw", index === total - 1 ? "0vw" : "-105vw"]
  );
  const carrierOpacity = useTransform(
    progress,
    entryRange,
    [index === 0 ? 0 : 0, index === 0 ? 0 : 1, 0, 0]
  );
  const opacity = useTransform(
    progress,
    entryRange,
    [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0]
  );
  const scale = useTransform(
    progress,
    entryRange,
    [index === 0 ? 1 : 0.985, 1, 1, index === total - 1 ? 1 : 0.99]
  );
  const isInteractive = index === activeIndex;

  return (
    <ProjectCardShell
      project={project}
      stacked
      className="absolute inset-0 mx-auto h-full w-full max-w-5xl origin-bottom overflow-visible"
      style={{ x, y, opacity, scale, zIndex: index, pointerEvents: isInteractive ? "auto" : "none" }}
    >
      {index > 0 && <PaperCarrier opacity={carrierOpacity} />}
      <CardBody project={project} />
    </ProjectCardShell>
  );
};

const StaticProjectCard = ({ project }) => {
  return (
    <ProjectCardShell project={project} className="relative w-full">
      <CardBody project={project} />
    </ProjectCardShell>
  );
};

const StackedProjectList = ({ projects }) => {
  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.25,
    restDelta: 0.001,
  });
  const [activeIndex, setActiveIndex] = React.useState(0);

  useMotionValueEvent(progress, "change", (latest) => {
    const nextIndex = Math.min(projects.length - 1, Math.floor(latest * projects.length));
    setActiveIndex((current) => current === nextIndex ? current : nextIndex);
  });

  return (
    <div ref={targetRef} className="relative" style={{ height: `${(projects.length + 1) * 100}vh` }}>
      <div className="sticky top-0 relative flex h-[100dvh] items-center justify-center overflow-hidden px-4 py-16">
        <div aria-live="polite" aria-atomic="true" className="absolute left-1/2 top-20 z-20 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-black/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 backdrop-blur">
          Project <motion.span key={activeIndex} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="font-bold text-accent">{String(activeIndex + 1).padStart(2, "0")}</motion.span>
          <span aria-hidden="true">/</span>
          {String(projects.length).padStart(2, "0")}
          <span className="hidden text-slate-500 sm:inline">· scroll to explore</span>
        </div>
        <div className="relative h-[min(72dvh,650px)] w-full max-w-5xl" style={{ perspective: 1200 }}>
          {projects.map((project, index) => (
            <PaperProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              progress={progress}
              activeIndex={activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [isDesktop, setIsDesktop] = React.useState(
    typeof window !== "undefined" ? canUseProjectStack() : false
  );
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    const update = () => setIsDesktop(canUseProjectStack());
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

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

      {isDesktop && !prefersReducedMotion ? (
        <StackedProjectList projects={filteredProjects} />
      ) : (
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10 pb-16 sm:pb-24 lg:pb-32">
          <div className="flex flex-col gap-5 sm:gap-7">
            {filteredProjects.map((project) => (
              <StaticProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;
