
import * as THREE from "three";
import React, { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Environment, 
  useTexture, 
} from "@react-three/drei";
import { BallCollider, Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { motion } from "framer-motion";
import { useSettings } from '../lib/SettingsContext';

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

/* ── Configuration ── */
const SPHERE_COUNT_DESKTOP = 16;
const SPHERE_COUNT_MOBILE = 8;
const SPHERE_GEOMETRY = new THREE.IcosahedronGeometry(1, 2);

/* ── Invisible Walls to keep balls inside screen ── */
function Borders() {
  const { viewport } = useThree();
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[viewport.width / 2, 1, 10]} position={[0, -viewport.height / 2 - 1, 0]} /> {/* Floor */}
      <CuboidCollider args={[viewport.width / 2, 1, 10]} position={[0, viewport.height / 2 + 1, 0]} />  {/* Ceiling */}
      <CuboidCollider args={[1, viewport.height / 2, 10]} position={[-viewport.width / 2 - 1, 0, 0]} /> {/* Left */}
      <CuboidCollider args={[1, viewport.height / 2, 10]} position={[viewport.width / 2 + 1, 0, 0]} />  {/* Right */}
    </RigidBody>
  );
}

/* ── Individual Tech Sphere ── */
function Sphere({ vec = new THREE.Vector3(), scale, texture, ...props }) {
  const api = useRef();
  
  useFrame((state, delta) => {
    if (!api.current) return;
    // Gentle gravity toward center to keep them clustered
    const impulse = vec.copy(api.current.translation()).negate().multiplyScalar(10 * delta);
    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody 
      ref={api} 
      colliders={false} 
      linearDamping={0.5} 
      angularDamping={0.5} 
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

/* ── Interactive Pointer ── */
function Pointer() {
  const ref = useRef();
  const vec = new THREE.Vector3();
  const { viewport, pointer } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    // Map mouse/touch to 3D space
    vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0);
    ref.current.setNextKinematicTranslation(vec);
  });

  return (
    <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1.5]} />
    </RigidBody>
  );
}

/* ── Scene Components ── */
function Scene({ sphereCount, lowFx, accentColor }) {
  const textures = useTexture(IMAGE_URLS);
  const { viewport } = useThree();
  
  const isMobile = viewport.width < 10;
  const sphereScale = isMobile ? 0.8 : 1.2;

  const spheres = useMemo(() => {
    return [...Array(sphereCount)].map((_, i) => ({
      texture: textures[i % textures.length],
      scale: (0.6 + Math.random() * 0.5) * sphereScale,
      position: [
        THREE.MathUtils.randFloatSpread(10),
        THREE.MathUtils.randFloatSpread(10),
        THREE.MathUtils.randFloatSpread(5)
      ]
    }));
  }, [textures, sphereScale, sphereCount]);

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

/* ── Main Component ── */
const TechStack = () => {
  const { theme, accent } = useSettings();
  const sectionRef = useRef(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [sphereCount, setSphereCount] = useState(SPHERE_COUNT_DESKTOP);
  const [lowFx, setLowFx] = useState(false);
  const [accentColor, setAccentColor] = useState('#f59e0b');

  useEffect(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--os-accent').trim();
    if (color) setAccentColor(color);
  }, [theme, accent]);

  useEffect(() => {
    const updateCount = () => {
      const mobile = window.innerWidth < 768;
      setSphereCount(mobile ? SPHERE_COUNT_MOBILE : SPHERE_COUNT_DESKTOP);
      setLowFx(mobile || window.innerWidth < 1024);
    };
    updateCount();
    window.addEventListener('resize', updateCount, { passive: true });
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCanvasReady(true); },
      { rootMargin: '150px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative w-full h-screen bg-section overflow-hidden">
      
      {/* HUD / UI Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-between py-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-accent font-mono tracking-[0.5em] text-[10px] sm:text-xs font-bold uppercase mb-2">
            Skill Laboratory
          </p>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-os-text tracking-tighter">
            TECH <span className="text-accent transition-all duration-500 hover:italic">STACK</span>
          </h2>
        </motion.div>

        {/* Bottom Description */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 max-w-2xl"
        >
          {["React", "Next.js", "Node.js", "MongoDB", "Tailwind"].map((tech) => (
            <span key={tech} className="px-4 py-1 rounded-full border border-white/10 bg-white/5 text-white/40 font-mono text-[10px] uppercase tracking-widest">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* 3D Context — only mounts when section is near viewport */}
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
        {canvasReady ? (
          <Canvas
            dpr={[1, 1.5]}
            gl={{
              antialias: false,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            camera={{ position: [0, 0, 20], fov: 35 }}
          >
            <Suspense fallback={null}>
              <Scene sphereCount={sphereCount} lowFx={lowFx} accentColor={accentColor} />
            </Suspense>
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 rounded-full animate-spin spinner-accent" />
          </div>
        )}
      </div>

      {/* Decorative Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none" style={{ background: 'rgba(var(--accent-rgb), 0.1)' }} />
    </section>
  );
};

export default TechStack;
