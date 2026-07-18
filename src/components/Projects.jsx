import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaBootstrap, FaPhp } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { SiTailwindcss, SiMysql } from "react-icons/si";

import chiyaghar from "../assets/projects/chiyaghar.jpg";
import trekking from "../assets/projects/trekking-react.jpg";
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
};


const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "Real-Time Complaint Hub",
    subtitle: "Smart Complaint Management System",
    description:
      "A real-time complaint management platform that enables users to submit, track, and monitor complaints efficiently. The system provides instant status updates, role-based dashboards, and a responsive user experience for faster issue resolution.",
    image: realtime,
    tags: ["React", "Tailwind CSS", "Node.js"],
    liveUrl: "https://realtime-complaint-tracking.netlify.app/",
    githubUrl: "https://github.com/sabin-khatri/realtime-complaint-tracking-hub",
    color: "from-red-900/40 to-section",
  },
  {
    id: 2,
    num: "02",
    title: "Chiya Ghar",
    subtitle: "Modern Tea Café Website",
    description:
      "A modern and responsive website for a Nepali tea café featuring smooth animations, interactive UI, elegant layouts, and an engaging user experience to showcase products, services, and the café's unique atmosphere.",
    image: chiyaghar,
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://bespoke-twilight-0dc185.netlify.app/",
    githubUrl: "https://github.com/sabin-khatri/ChiyaAdda",
    color: "from-amber-900/40 to-section",
  },
  {
    id: 3,
    num: "03",
    title: "Trekking Nepal",
    subtitle: "Tourism & Adventure Platform",
    description:
      "A visually appealing trekking and tourism platform designed to explore Nepal's natural beauty. It includes responsive layouts, engaging animations, destination highlights, and an immersive browsing experience.",
    image: trekking,
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://sabintrek.netlify.app/",
    githubUrl: "https://github.com/sabin-khatri/trekking_web",
    color: "from-emerald-900/40 to-section",
  },
  {
    id: 4,
    num: "04",
    title: "District Score",
    subtitle: "Hackathon Data Dashboard",
    description:
      "A hackathon project developed collaboratively to visualize district-level data through an interactive dashboard. Built with Supabase for backend services, it offers secure data management, responsive design, and real-time information presentation.",
    image: district,
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    liveUrl: "https://district-scrore.vercel.app/",
    githubUrl: "https://github.com/sabin-khatri/DistrictScrore",
    color: "from-blue-900/40 to-section",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const flipVariants = {
  front: {
    initial: { rotateX: 90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: -90, opacity: 0 },
  },
  back: {
    initial: { rotateX: -90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: 90, opacity: 0 },
  },
};

const ProjectCard = ({ project, index, isMobile }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);


  const jsonData = {
    id: project.id,
    title: project.title,
    subtitle: project.subtitle,
    stack: project.tags,
    repository: project.githubUrl,
    deployment: project.liveUrl,
  };

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={`w-full bg-gradient-to-br ${project.color} border border-white/10 rounded-2xl sm:rounded-[2rem] shadow-2xl p-4 sm:p-6 lg:p-10 overflow-visible backdrop-blur-xl sticky mb-16 lg:mb-24`}
      style={{
        top: isMobile ? `calc(80px + ${index * 24}px)` : `${100 + index * 36}px`,
        perspective: "1000px",
      }}
    >
      <AnimatePresence mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            {...flipVariants.front}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center"
          >
            {/* Image */}
            <div className="order-1 lg:order-2 relative group">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto max-h-[220px] sm:max-h-none object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Text */}
            <div className="order-2 lg:order-1 flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
                <span className="text-2xl sm:text-4xl font-black text-white/20">{project.num}</span>
                <div className="h-px flex-1 max-w-[48px] bg-white/20" />
                <span className="text-accent font-mono text-[10px] sm:text-sm tracking-widest uppercase truncate">
                  {project.subtitle}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(true);
                  }}
                  className="ml-auto shrink-0 text-[10px] sm:text-xs font-mono px-2 py-1 rounded bg-black/30 border border-white/10 text-slate-400 hover:text-accent hover:border-accent/40 transition-colors"
                >
                  {"{ }"} JSON
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 sm:mb-5 tracking-tight">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-5 sm:mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-black/30 border border-white/5 text-xs sm:text-sm font-medium text-slate-200 flex items-center gap-1.5"
                  >
                    <span className="text-sm sm:text-base leading-none">{TAG_ICONS[tag]}</span>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-white text-black font-bold rounded-full hover:bg-accent transition-colors duration-300 text-sm sm:text-base"
                >
                  Visit Site <FiExternalLink className="text-base sm:text-lg" />
                </motion.a>
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 border border-white/15 text-white hover:text-accent hover:border-accent/40 font-medium transition-colors rounded-full text-sm sm:text-base"
                >
                  <FaGithub className="text-base sm:text-lg" /> Source Code
                </motion.a>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            {...flipVariants.back}
            transition={{ duration: 0.3 }}
            className="w-full bg-[#1e1e1e]/95 backdrop-blur-3xl p-6 sm:p-10 rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-center min-h-[300px] sm:min-h-[400px]"
          >
            <div className="flex items-center justify-between mb-4 bg-black/40 p-3 rounded-lg border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-xs font-mono text-slate-400">project_data.json</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
            <pre className="text-xs sm:text-sm md:text-base text-green-400 font-mono whitespace-pre-wrap overflow-y-auto custom-scrollbar flex-1">
              {JSON.stringify(jsonData, null, 4)}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

const Projects = () => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section id="projects" className="relative bg-section py-16 sm:py-24 lg:py-36 overflow-visible">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20 lg:mb-28"
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

        <div className="relative pb-8 sm:pb-16">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;