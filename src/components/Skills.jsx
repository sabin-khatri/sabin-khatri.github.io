/* eslint-disable no-unused-vars */
import * as THREE from "three";
import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { BallCollider, Physics, RigidBody, CylinderCollider } from "@react-three/rapier";
import { motion, useInView } from "framer-motion";

import imgNext       from "../assets/image/next2.webp";
import imgNode       from "../assets/image/node2.webp";
import imgExpress    from "../assets/image/express.webp";
import imgMongo      from "../assets/image/mongo.webp";
import imgMysql      from "../assets/image/mysql.webp";
import imgTypescript from "../assets/image/typescript.webp";
import imgJavascript from "../assets/image/javascript.webp";
import imgReact      from "../assets/image/react.webp";
import imgTailwind   from "../assets/image/tailwind.png";

const IMAGE_URLS = [
  imgNext, imgNode, imgExpress, imgMongo, imgMysql,
  imgTypescript, imgJavascript, imgReact, imgTailwind,
];

/* ── sphere count — fewer = faster ── */
const SPHERE_COUNT    = 18; // was 30
const SPHERE_GEOMETRY = new THREE.SphereGeometry(1, 24, 24); // was 32,32

/* stable random array — created once outside component */
const SPHERES = [...Array(SPHERE_COUNT)].map((_, i) => ({
  scale:         [0.7, 1, 0.8, 1, 0.9][i % 5],
  materialIndex: i % IMAGE_URLS.length,
  position: [
    THREE.MathUtils.randFloatSpread(18),
    THREE.MathUtils.randFloatSpread(18) - 22,
    THREE.MathUtils.randFloatSpread(14) - 8,
  ],
}));

/* ── Single sphere ───────────────────────────────────────────────────────── */
const vecPool = new THREE.Vector3();
const mulVec  = new THREE.Vector3();

function SphereGeo({ scale, material, position }) {
  const api = useRef(null);

  useFrame((_, delta) => {
    if (!api.current) return;
    const d = Math.min(0.1, delta);
    api.current.applyImpulse(
      vecPool
        .copy(api.current.translation())
        .normalize()
        .multiply(mulVec.set(-50 * d * scale, -150 * d * scale, -50 * d * scale)),
      true
    );
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={position}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh castShadow receiveShadow scale={scale} geometry={SPHERE_GEOMETRY}>
        <meshStandardMaterial
          map={material.map}
          emissive={new THREE.Color("#ffffff")}
          emissiveMap={material.map}
          emissiveIntensity={0.12}
          metalness={0.1}
          roughness={0.45}
        />
      </mesh>
    </RigidBody>
  );
}

/* ── Mouse pointer collider ──────────────────────────────────────────────── */
const pVec = new THREE.Vector3();
function Pointer() {
  const ref = useRef(null);
  useFrame(({ pointer, viewport }) => {
    if (!ref.current) return;
    ref.current.setNextKinematicTranslation(
      pVec.lerp(
        new THREE.Vector3(
          (pointer.x * viewport.width)  / 2,
          (pointer.y * viewport.height) / 2,
          0
        ),
        0.2
      )
    );
  });
  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

/* ── 3-D Scene ───────────────────────────────────────────────────────────── */
function Scene({ materials }) {
  return (
    <>
      <ambientLight intensity={1.0} />
      <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} castShadow={false} intensity={1.8} />
      <directionalLight position={[-10, 10, 5]} intensity={0.8} />

      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        {SPHERES.map((s, i) => (
          <SphereGeo key={i} scale={s.scale} position={s.position} material={materials[s.materialIndex]} />
        ))}
      </Physics>

      {/* lighter preset = faster load */}
      <Environment preset="sunset" />

      <EffectComposer disableNormalPass>
        <N8AO color="#f59e0b" aoRadius={1.5} intensity={0.8} />
      </EffectComposer>
    </>
  );
}

/* ── Loading placeholder ─────────────────────────────────────────────────── */
const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin" />
      <p className="text-slate-500 text-xs font-mono tracking-widest">Loading 3D scene…</p>
    </div>
  </div>
);

/* ── Mobile fallback grid ────────────────────────────────────────────────── */
const TECH_NAMES = [
  "Next.js","Node.js","Express","MongoDB",
  "MySQL","TypeScript","JavaScript","React","Tailwind",
];
const MobileFallback = ({ images }) => (
  <div className="grid grid-cols-3 gap-4 px-4 py-8">
    {images.map((src, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.06, duration: 0.4 }}
        className="flex flex-col items-center gap-2"
      >
        <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10
                        flex items-center justify-center p-3 hover:border-amber-400/30
                        transition-colors duration-300">
          <img src={src} alt={TECH_NAMES[i]} className="w-full h-full object-contain" />
        </div>
        <span className="text-[10px] text-slate-500 font-mono">{TECH_NAMES[i]}</span>
      </motion.div>
    ))}
  </div>
);

/* ── Main Section ────────────────────────────────────────────────────────── */
const TechStack = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [show3D,   setShow3D]   = useState(false);
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 });

  /* detect mobile */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* lazy-mount canvas only when section is visible */
  useEffect(() => {
    if (inView && !isMobile) setShow3D(true);
  }, [inView, isMobile]);

  /* textures — created once */
  const materials = useMemo(() =>
    IMAGE_URLS.map((url) => {
      const tex = new THREE.TextureLoader().load(url, (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.needsUpdate = true;
      });
      tex.colorSpace = THREE.SRGBColorSpace;
      return { map: tex };
    }),
  []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] overflow-hidden"
      style={{ minHeight: isMobile ? "auto" : "100vh" }}
    >
      {/* dot-grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_0.8px,transparent_1px)]
                      [background-size:60px_60px] opacity-10 pointer-events-none" />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative z-10 pt-20 pb-4 text-center pointer-events-none"
      >
        <p className="text-amber-500 font-mono tracking-[0.4em] text-xs font-bold uppercase mb-3">
          Stack Playground
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter">
          TECH <span className="text-amber-500">Stack</span>
        </h2>
      </motion.div>

      {/* ── MOBILE: icon grid ── */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 pb-16"
        >
          <MobileFallback images={IMAGE_URLS} />
        </motion.div>
      )}

      {/* ── DESKTOP: 3-D canvas ── */}
      {!isMobile && (
        <div className="relative" style={{ height: "calc(100vh - 140px)" }}>
          {/* show loader until canvas mounts */}
          {!show3D && <Loader />}

          {show3D && (
            <Canvas
              shadows={false}          /* shadows off = big perf win */
              frameloop="demand"       /* only render when something changes */
              dpr={[1, 1.5]}           /* cap pixel ratio */
              gl={{
                antialias:          true,
                toneMapping:        THREE.ACESFilmicToneMapping,
                toneMappingExposure:1.1,
                outputColorSpace:   THREE.SRGBColorSpace,
                powerPreference:    "high-performance",
              }}
              camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
            >
              <Suspense fallback={null}>
                <Scene materials={materials} />
              </Suspense>
            </Canvas>
          )}
        </div>
      )}

      {/* bottom stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4
                   px-6 pb-16 max-w-4xl mx-auto"
      >
        {[
          { label: "Frontend",     value: "React · Next.js · Tailwind" },
          { label: "Backend",      value: "Node.js · MongoDB" },
          { label: "Tools & DB",   value: "TypeScript · MySQL · Git"   },
        ].map((s, i) => (
          <div key={i}
            className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]
                       hover:border-amber-500/30 transition-colors text-center"
          >
            <div className="text-amber-500 font-semibold text-xs sm:text-sm mb-1">{s.value}</div>
            <div className="text-slate-500 text-[10px] uppercase tracking-widest font-mono">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default TechStack;