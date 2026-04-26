
import * as THREE from "three";
import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Environment, 
  Text, 
  useTexture, 
  Float, 
  PerspectiveCamera,
  PerformanceMonitor
} from "@react-three/drei";
import { EffectComposer, N8AO, Bloom } from "@react-three/postprocessing";
import { BallCollider, Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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
const SPHERE_COUNT = 20; 
const SPHERE_GEOMETRY = new THREE.IcosahedronGeometry(1, 3); // smoother & lighter than SphereGeo

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
      <mesh scale={scale} geometry={SPHERE_GEOMETRY} castShadow>
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
function Scene() {
  const textures = useTexture(IMAGE_URLS);
  const { viewport } = useThree();
  
  // Adjust scale based on screen size
  const isMobile = viewport.width < 10;
  const sphereScale = isMobile ? 0.8 : 1.2;

  const spheres = useMemo(() => {
    return [...Array(SPHERE_COUNT)].map((_, i) => ({
      texture: textures[i % textures.length],
      scale: (0.6 + Math.random() * 0.5) * sphereScale,
      position: [
        THREE.MathUtils.randFloatSpread(10),
        THREE.MathUtils.randFloatSpread(10),
        THREE.MathUtils.randFloatSpread(5)
      ]
    }));
  }, [textures, sphereScale]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#f59e0b" />

      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        <Borders />
        {spheres.map((props, i) => (
          <Sphere key={i} {...props} />
        ))}
      </Physics>

      <Environment preset="night" />
      
      <EffectComposer multisampling={0} disableNormalPass>
        <N8AO aoRadius={0.5} intensity={1} color="#f59e0b" />
        <Bloom luminanceThreshold={1} intensity={0.5} levels={9} mipmapBlur />
      </EffectComposer>
    </>
  );
}

/* ── Main Component ── */
const TechStack = () => {
  return (
    <section id="skills" className="relative w-full h-screen bg-[#060606] overflow-hidden">
      
      {/* HUD / UI Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-between py-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-amber-500 font-mono tracking-[0.5em] text-[10px] sm:text-xs font-bold uppercase mb-2">
            Skill Laboratory
          </p>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter">
            TECH <span className="text-amber-500 transition-all duration-500 hover:italic">STACK</span>
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

      {/* 3D Context */}
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          dpr={[1, 2]} // Performance optimization for high-res screens
          gl={{ 
            antialias: false, // Turned off because EffectComposer handles it
            powerPreference: "high-performance" 
          }}
          camera={{ position: [0, 0, 20], fov: 35 }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Decorative Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default TechStack;