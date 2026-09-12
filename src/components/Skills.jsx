
import * as THREE from "three";
import React, { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Environment, 
  useTexture, 
} from "@react-three/drei";
import { BallCollider, Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useSettings } from '../lib/SettingsContext';
import OrbitingSkills from "./ui/orbiting-skills";

// Assets
import imgNext from "../assets/image/next2.webp";
import imgNode from "../assets/image/node2.webp";
import imgExpress from "../assets/image/express.webp";
import imgMongo from "../assets/image/mongo.webp";
import imgMysql from "../assets/image/mysql.webp";
import imgTypescript from "../assets/image/typescript.webp";
import imgJavascript from "../assets/image/javascript.webp";
import imgReact from "../assets/image/react.webp";
import imgTailwind from "../assets/image/tailwind.png";

const IMAGE_URLS = [
  imgNext, imgNode, imgExpress, imgMongo, imgMysql,
  imgTypescript, imgJavascript, imgReact, imgTailwind,
];

const TECH_CHIPS = ["React", "Next.js", "Node.js", "MongoDB", "Tailwind", "TypeScript"];

const SPHERE_COUNT_DESKTOP = 16;
const SPHERE_GEOMETRY = new THREE.IcosahedronGeometry(1, 2);

function Borders() {
  const { viewport } = useThree();
  const w = viewport.width / 2;
  const h = viewport.height / 2;
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[w, 1, 4]} position={[0, -h - 0.6, 0]} />
      <CuboidCollider args={[w, 1, 4]} position={[0, h + 0.6, 0]} />
      <CuboidCollider args={[1, h, 4]} position={[-w - 0.6, 0, 0]} />
      <CuboidCollider args={[1, h, 4]} position={[w + 0.6, 0, 0]} />
      <CuboidCollider args={[w, h, 1]} position={[0, 0, -2.5]} />
      <CuboidCollider args={[w, h, 1]} position={[0, 0, 2.5]} />
    </RigidBody>
  );
}

function Sphere({ vec = new THREE.Vector3(), scale, texture, ...props }) {
  const api = useRef();
  
  useFrame((_state, delta) => {
    if (!api.current) return;
    const impulse = vec.copy(api.current.translation()).negate().multiplyScalar(8 * Math.min(delta, 0.033));
    impulse.z *= 2.4;
    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody 
      ref={api} 
      colliders={false} 
      linearDamping={0.65} 
      angularDamping={0.65} 
      {...props}
    >
      <BallCollider args={[scale]} />
      <mesh scale={scale} geometry={SPHERE_GEOMETRY}>
        <meshStandardMaterial 
          map={texture} 
          metalness={0.2} 
          roughness={0.2} 
          emissive="#ffffff"
          emissiveIntensity={0.1}
          emissiveMap={texture}
        />
      </mesh>
    </RigidBody>
  );
}

function Pointer() {
  const ref = useRef();
  const vec = new THREE.Vector3();
  const { viewport, pointer } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0);
    ref.current.setNextKinematicTranslation(vec);
  });

  return (
    <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[0.85]} />
    </RigidBody>
  );
}

function Scene({ sphereCount, lowFx, accentColor }) {
  const textures = useTexture(IMAGE_URLS);
  
  const spheres = useMemo(() => {
    return [...Array(sphereCount)].map((_, i) => ({
      texture: textures[i % textures.length],
      scale: 0.85 + Math.random() * 0.45,
      position: [
        THREE.MathUtils.randFloatSpread(5),
        THREE.MathUtils.randFloatSpread(3.2),
        THREE.MathUtils.randFloatSpread(0.6),
      ]
    }));
  }, [textures, sphereCount]);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} color={accentColor} />

      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        <Borders />
        {spheres.map((props, i) => (
          <Sphere key={i} {...props} />
        ))}
      </Physics>

      {!lowFx && <Environment preset="city" />}
    </>
  );
}

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
  const [accentColor, setAccentColor] = useState('#f59e0b');
  const [glFailed, setGlFailed] = useState(false);

  useEffect(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--os-accent').trim();
    if (color) setAccentColor(color);
  }, [theme, accent]);

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setLowFx(mobile || window.innerWidth < 1024);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || isMobile) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanvasReady(true);
          setSceneActive(true);
        } else {
          setSceneActive(false);
        }
      },
      { rootMargin: '120px', threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isMobile]);

  const useFallback = isMobile || glFailed;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full min-h-[100dvh] bg-section overflow-hidden"
    >
      <SectionChrome compact={useFallback} />

      {useFallback ? (
        <div className="absolute inset-0 flex items-center justify-center pt-16 pb-20">
          <div className="w-full max-w-[420px] h-[min(420px,58vh)]">
            <OrbitingSkills />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
          {canvasReady ? (
            <Canvas
              dpr={[1, 1.25]}
              frameloop={sceneActive ? "always" : "demand"}
              gl={{
                antialias: false,
                powerPreference: 'high-performance',
                alpha: true,
                failIfMajorPerformanceCaveat: false,
              }}
              camera={{ position: [0, 0, 16], fov: 38 }}
              onCreated={({ gl }) => {
                const canvas = gl.domElement;
                const onLost = (e) => {
                  e.preventDefault();
                  setGlFailed(true);
                };
                canvas.addEventListener("webglcontextlost", onLost, false);
              }}
            >
              <Suspense fallback={null}>
                <Scene sphereCount={SPHERE_COUNT_DESKTOP} lowFx={lowFx} accentColor={accentColor} />
              </Suspense>
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 rounded-full animate-spin spinner-accent" />
            </div>
          )}
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(500px,80vw)] h-[min(500px,80vw)] blur-[120px] rounded-full pointer-events-none" style={{ background: 'rgba(var(--accent-rgb), 0.1)' }} />
    </section>
  );
};

export default TechStack;
