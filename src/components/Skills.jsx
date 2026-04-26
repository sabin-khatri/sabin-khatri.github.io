
import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
} from "@react-three/rapier";

const imageUrls = [
  "src/assets/image/react.webp",
  "src/assets/image/next2.webp",
  "src/assets/image/node2.webp",
  "src/assets/image/express.webp",
  "src/assets/image/mongo.webp",
  "src/assets/image/mysql.webp",
  "src/assets/image/typescript.webp",
  "src/assets/image/javascript.webp",
  "src/assets/image/react.webp",
  "src/assets/image/typescript.webp",
  "src/assets/image/tailwind.png"
];

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const spheresArray = [...Array(30)].map((_, i) => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
  materialIndex: i % imageUrls.length,
  position: [
    THREE.MathUtils.randFloatSpread(20),
    THREE.MathUtils.randFloatSpread(20) - 25,
    THREE.MathUtils.randFloatSpread(20) - 10,
  ],
}));

function SphereGeo({ vec = new THREE.Vector3(), scale, material, position }) {
  const api = useRef(null);

  useFrame((_state, delta) => {
    if (!api.current) return;
    delta = Math.min(0.1, delta);
    api.current.applyImpulse(
      vec
        .copy(api.current.translation())
        .normalize()
        .multiply(
          new THREE.Vector3(
            -50 * delta * scale,
            -150 * delta * scale,
            -50 * delta * scale
          )
        ),
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
      {/* FIX: Use meshStandardMaterial directly on mesh for reliable texture display */}
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
      >
        <meshStandardMaterial
          map={material.map}
          emissive={new THREE.Color("#ffffff")}
          emissiveMap={material.map}
          emissiveIntensity={0.15}
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef(null);

  useFrame(({ pointer, viewport }) => {
    if (!ref.current) return;
    ref.current.setNextKinematicTranslation(
      vec.lerp(
        new THREE.Vector3(
          (pointer.x * viewport.width) / 2,
          (pointer.y * viewport.height) / 2,
          0
        ),
        0.2
      )
    );
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

// FIX: Load textures inside the component using useLoader pattern
function Scene({ materials }) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} castShadow intensity={2} />
      <directionalLight position={[-10, 10, 5]} intensity={1} />

      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        {spheresArray.map((props, i) => (
          <SphereGeo
            key={i}
            scale={props.scale}
            position={props.position}
            material={materials[props.materialIndex]}
          />
        ))}
      </Physics>

      <Environment preset="city" />

      <EffectComposer disableNormalPass>
        <N8AO color="#f59e0b" aoRadius={2} intensity={1} />
      </EffectComposer>
    </>
  );
}

const TechStack = () => {
  // FIX: Create textures with proper settings inside useMemo
  const materials = useMemo(() => {
    return imageUrls.map((url) => {
      const texture = new THREE.TextureLoader().load(
        url,
        (tex) => {
          // Called when texture loads successfully
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.needsUpdate = true;
        },
        undefined,
        (err) => {
          console.error(`Failed to load texture: ${url}`, err);
        }
      );
      texture.colorSpace = THREE.SRGBColorSpace;

      return {
        map: texture,
      };
    });
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden"
    >
      <div className="absolute top-24 left-0 w-full text-center z-10 pointer-events-none">
        <h2 className="text-amber-500 font-mono tracking-[0.4em] text-xs font-bold uppercase mb-4">
          Stack Playground
        </h2>
        <h3 className="text-5xl lg:text-7xl font-black text-white tracking-tighter">
          TECH <span className="text-amber-500">Stack</span>
        </h3>
      </div>

      <Canvas
        shadows
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace, 
        }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
      >
        <Scene materials={materials} />
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_0.8px,transparent_1px)] [background-size:60px_60px] opacity-10 pointer-events-none" />
    </section>
  );
};

export default TechStack;