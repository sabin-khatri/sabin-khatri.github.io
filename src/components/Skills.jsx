import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useSettings } from "../lib/SettingsContext";
import OrbitingSkills from "./ui/orbiting-skills";

const SkillsScene = lazy(() => import("./SkillsScene"));
const TECH_CHIPS = ["React", "Next.js", "Node.js", "MongoDB", "Tailwind", "TypeScript"];

const SectionChrome = ({ compact }) => (
  <div className={`absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-between ${compact ? "py-8 px-4" : "py-12 px-6"}`}>
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-accent font-mono tracking-[0.5em] text-[10px] sm:text-xs font-bold uppercase mb-2">
        Skill Laboratory
      </p>
      <h2 className={`${compact ? "text-4xl" : "text-5xl sm:text-7xl lg:text-8xl"} font-black text-os-text tracking-tighter`}>
        TECH <span className="text-accent">STACK</span>
      </h2>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.25 }}
      className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-2xl"
    >
      {TECH_CHIPS.map((tech) => (
        <span key={tech} className="px-3 sm:px-4 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 font-mono text-[10px] uppercase tracking-widest">
          {tech}
        </span>
      ))}
    </motion.div>
  </div>
);

const TechStack = () => {
  const { theme, accent } = useSettings();
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : true
  );
  const [canvasReady, setCanvasReady] = useState(false);
  const [sceneActive, setSceneActive] = useState(false);
  const [lowFx, setLowFx] = useState(true);
  const [accentColor, setAccentColor] = useState("#f59e0b");
  const [glFailed, setGlFailed] = useState(false);

  useEffect(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue("--os-accent").trim();
    if (color) setAccentColor(color);
  }, [theme, accent]);

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setLowFx(mobile || window.innerWidth < 1024);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isMobile || glFailed) {
      setCanvasReady(false);
      setSceneActive(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanvasReady(true);
          setSceneActive(true);
        } else {
          setSceneActive(false);
        }
      },
      // Start downloading the 3D scene and its textures well before this section enters view.
      { rootMargin: "1600px", threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [isMobile, glFailed]);

  const useFallback = glFailed || isMobile;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full min-h-[100dvh] bg-section overflow-hidden"
    >
      <SectionChrome compact={useFallback} />

      {useFallback ? (
        <div className="absolute inset-0 flex items-center justify-center pt-20 pb-24 px-4">
          <div className="w-full max-w-[420px] h-[min(420px,58vh)]">
            <OrbitingSkills />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
          {canvasReady ? (
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-8 h-8 rounded-full animate-spin spinner-accent" /></div>}>
              <SkillsScene
                active={sceneActive}
                lowFx={lowFx}
                accentColor={accentColor}
                onContextLost={() => setGlFailed(true)}
              />
            </Suspense>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 rounded-full animate-spin spinner-accent" />
            </div>
          )}
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(500px,80vw)] h-[min(500px,80vw)] blur-[120px] rounded-full pointer-events-none" style={{ background: "rgba(var(--accent-rgb), 0.1)" }} />
    </section>
  );
};

export default TechStack;
