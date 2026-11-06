import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useSettings } from "../lib/SettingsContext";
import OrbitingSkills from "./ui/orbiting-skills";

// Eagerly prefetch 3D physics chunk in background
const SkillsScene = lazy(() => import("./SkillsScene"));
const TECH_CHIPS = ["React", "Next.js", "Node.js", "MongoDB", "Tailwind", "TypeScript"];

const SectionChrome = ({ compact }) => (
  <div className={`absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-between ${compact ? "py-8 px-4" : "py-10 sm:py-12 px-4 sm:px-6"}`}>
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-accent font-mono tracking-[0.5em] text-[10px] sm:text-xs font-bold uppercase mb-2">
        Skill Laboratory
      </p>
      <h2 className={`${compact ? "text-4xl" : "text-4xl sm:text-7xl lg:text-8xl"} font-black text-os-text tracking-tighter`}>
        TECH <span className="text-accent">STACK</span>
      </h2>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.25 }}
      className="flex flex-wrap justify-center gap-1.5 sm:gap-3 max-w-2xl px-2"
    >
      {TECH_CHIPS.map((tech) => (
        <span key={tech} className="px-2.5 sm:px-4 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest backdrop-blur-sm">
          {tech}
        </span>
      ))}
    </motion.div>
  </div>
);

const SkillsLoadingFallback = () => (
  <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none select-none">
    <div className="relative flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border border-accent/30 animate-ping opacity-25" />
      <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur flex items-center justify-center shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]">
        <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
      </div>
    </div>
    <span className="font-mono text-[11px] text-slate-400 mt-3 tracking-widest uppercase">
      INITIALIZING 3D LAB...
    </span>
  </div>
);

const TechStack = () => {
  const { theme, accent } = useSettings();
  const sectionRef = useRef(null);
  const [sceneActive, setSceneActive] = useState(true);
  const [lowFx, setLowFx] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [accentColor, setAccentColor] = useState("#f59e0b");
  const [glFailed, setGlFailed] = useState(false);

  useEffect(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue("--os-accent").trim();
    if (color) setAccentColor(color);
  }, [theme, accent]);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const lowPowerDevice = (navigator.hardwareConcurrency || 8) <= 4 || navigator.connection?.saveData;
      setReducedMotion(motionPreference.matches);
      setLowFx(window.innerWidth < 1024 || motionPreference.matches || lowPowerDevice);
    };
    const updateVisibility = () => setPageVisible(!document.hidden);
    update();
    updateVisibility();
    window.addEventListener("resize", update, { passive: true });
    document.addEventListener("visibilitychange", updateVisibility);
    motionPreference.addEventListener?.("change", update);
    return () => {
      window.removeEventListener("resize", update);
      document.removeEventListener("visibilitychange", updateVisibility);
      motionPreference.removeEventListener?.("change", update);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || glFailed) {
      setSceneActive(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSceneActive(entry.isIntersecting);
      },
      // Keep active slightly beyond viewport so entering has zero lag
      { rootMargin: "600px", threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [glFailed]);

  const useFallback = glFailed;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full bg-section overflow-hidden"
      style={{ minHeight: 'max(100svh, 560px)' }}
    >
      <SectionChrome compact={useFallback} />

      {useFallback ? (
        <div className="absolute inset-0 flex items-center justify-center pt-20 pb-24 px-4">
          <div className="w-full max-w-[420px] h-[min(420px,58vh)]">
            <OrbitingSkills />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y">
          <Suspense fallback={<SkillsLoadingFallback />}>
            <SkillsScene
              active={sceneActive && pageVisible && !reducedMotion}
              lowFx={lowFx}
              accentColor={accentColor}
              onContextLost={() => setGlFailed(true)}
            />
          </Suspense>
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(500px,80vw)] h-[min(500px,80vw)] blur-[120px] rounded-full pointer-events-none" style={{ background: "rgba(var(--accent-rgb), 0.1)" }} />
    </section>
  );
};

export default TechStack;
