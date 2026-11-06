import * as THREE from "three";
import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { BallCollider, Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

import imgNext from "../assets/image/next2.webp";
import imgNode from "../assets/image/node2.webp";
import imgExpress from "../assets/image/express.webp";
import imgMongo from "../assets/image/mongo.webp";
import imgMysql from "../assets/image/mysql.webp";
import imgTypescript from "../assets/image/typescript.webp";
import imgJavascript from "../assets/image/javascript.webp";
import imgReact from "../assets/image/react.webp";
import imgTailwind from "../assets/image/tailwind.png";

export const IMAGE_URLS = [
  imgNext,
  imgNode,
  imgExpress,
  imgMongo,
  imgMysql,
  imgTypescript,
  imgJavascript,
  imgReact,
  imgTailwind,
];

export const MOBILE_IMAGE_URLS = [
  imgNext,
  imgNode,
  imgExpress,
  imgMongo,
  imgMysql,
  imgTypescript,
  imgJavascript,
];

// Preload all textures into three.js cache immediately
useTexture.preload(IMAGE_URLS);
useTexture.preload(MOBILE_IMAGE_URLS);

// Preload in DOM image cache immediately
if (typeof window !== "undefined") {
  IMAGE_URLS.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

const SPHERE_COUNT_DESKTOP = 14;
const SPHERE_COUNT_MOBILE = 7;
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
    const impulse = vec
      .copy(api.current.translation())
      .negate()
      .multiplyScalar(8 * Math.min(delta, 0.033));
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
          metalness={0.25}
          roughness={0.25}
          emissive="#ffffff"
          emissiveIntensity={0.08}
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
    vec.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );
    ref.current.setNextKinematicTranslation(vec);
  });

  return (
    <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[0.85]} />
    </RigidBody>
  );
}

function Scene({ lowFx, accentColor }) {
  const textures = useTexture(lowFx ? MOBILE_IMAGE_URLS : IMAGE_URLS);
  const { viewport } = useThree();
  const sphereCount = lowFx ? SPHERE_COUNT_MOBILE : SPHERE_COUNT_DESKTOP;
  const spheres = useMemo(
    () =>
      Array.from({ length: sphereCount }, (_, i) => ({
        texture: textures[i % textures.length],
        scale: 0.85 + Math.random() * 0.45,
        position: [
          THREE.MathUtils.randFloatSpread(Math.max(1, viewport.width - 2.2)),
          THREE.MathUtils.randFloatSpread(Math.max(1, viewport.height - 2.2)),
          THREE.MathUtils.randFloatSpread(0.6),
        ],
      })),
    [textures, sphereCount, viewport.width, viewport.height]
  );

  return (
    <>
      {/* Studio Lighting - Zero remote network delay */}
      <ambientLight intensity={1.1} />
      <directionalLight position={[12, 14, 10]} intensity={2.0} />
      <directionalLight position={[-10, -6, -8]} intensity={0.8} color="#60a5fa" />
      <pointLight position={[0, -5, 5]} intensity={1.4} color={accentColor} />
      <hemisphereLight intensity={0.4} groundColor="#0a0a0f" />

      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        <Borders />
        {spheres.map((props, i) => (
          <Sphere key={i} {...props} />
        ))}
      </Physics>
    </>
  );
}

export default function SkillsScene({
  active,
  lowFx,
  accentColor,
  onContextLost,
}) {
  return (
    <Canvas
      dpr={lowFx ? 1 : [1, 1.25]}
      frameloop={active ? "always" : "demand"}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: true,
        failIfMajorPerformanceCaveat: false,
      }}
      camera={{ position: [0, 0, 16], fov: 38 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          "webglcontextlost",
          (event) => {
            event.preventDefault();
            onContextLost();
          },
          false
        );
      }}
    >
      <Suspense fallback={null}>
        <Scene lowFx={lowFx} accentColor={accentColor} />
      </Suspense>
    </Canvas>
  );
}
