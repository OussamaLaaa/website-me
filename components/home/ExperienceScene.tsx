'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sphere, Torus, Box } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

const createSeededRandom = (seed: number) => {
  let state = seed;
  return () => {
    state ^= state << 13;
    state ^= state >> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967295;
  };
};

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const generator = createSeededRandom(24);
    for (let i = 0; i < count; i++) {
      const radius = 26;
      positions[i * 3] = (generator() - 0.5) * radius;
      positions[i * 3 + 1] = (generator() - 0.5) * radius;
      positions[i * 3 + 2] = (generator() - 0.5) * radius;
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Ribbon() {
  const points = useMemo(() => {
    const temp: THREE.Vector3[] = [];
    for (let i = 0; i < 120; i++) {
      const angle = (i / 120) * Math.PI * 2;
      const radius = 6 + Math.sin(angle * 1.4) * 0.8;
      const z = Math.cos(angle * 2) * 0.6;
      temp.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.35, z));
    }
    return temp;
  }, []);

  return (
    <Line
      points={points}
      color="#ffffff"
      linewidth={1}
      transparent
      opacity={0.35}
      dashed
      dashSize={0.4}
      gapSize={0.25}
    />
  );
}

function Sculpture() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.25;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <Sphere args={[1.8, 96, 96]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.95}
            roughness={0.06}
            emissive="#ffffff"
            emissiveIntensity={0.32}
          />
        </Sphere>
      </Float>

      <Float speed={2.1} rotationIntensity={0.7} floatIntensity={0.4}>
        <Torus args={[3.5, 0.14, 64, 220]} rotation={[Math.PI / 3.4, Math.PI / 5, Math.PI / 9]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.25}
            transparent
            opacity={0.45}
            wireframe
          />
        </Torus>
      </Float>

      <Float speed={1.6} rotationIntensity={0.9} floatIntensity={0.5}>
        <Torus args={[2.2, 0.22, 48, 120]} rotation={[Math.PI / 1.8, Math.PI / 3, 0]}>
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.15} />
        </Torus>
      </Float>

      <Float speed={2.4} rotationIntensity={0.5} floatIntensity={0.3}>
        <Box args={[0.6, 0.6, 0.6]} position={[2.8, -1.6, 2.2]}>
          <meshStandardMaterial color="#ffffff" metalness={0.78} roughness={0.18} />
        </Box>
      </Float>

      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.4}>
        <Box args={[0.9, 0.16, 0.9]} position={[-2.4, 1.2, -1.8]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.82}
            roughness={0.24}
            transparent
            opacity={0.5}
          />
        </Box>
      </Float>
    </group>
  );
}

type ExperienceSceneProps = {
  className?: string;
};

export default function ExperienceScene({ className = 'absolute inset-0 -z-10 opacity-70' }: ExperienceSceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 52 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['transparent']} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 12, 8]} intensity={2.4} color="#ffffff" />
          <directionalLight position={[-8, -6, -10]} intensity={1.2} color="#ffffff" />
          <spotLight position={[0, 14, 0]} angle={0.4} penumbra={1} intensity={2.1} color="#ffffff" />

          <fog attach="fog" args={['#000000', 12, 26]} />

          <ParticleField />
          <Ribbon />
          <Sculpture />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-background/60 to-background" />
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06) 0, transparent 26%), radial-gradient(circle at 70% 40%, rgba(255,255,255,0.05) 0, transparent 22%), radial-gradient(circle at 50% 70%, rgba(255,255,255,0.04) 0, transparent 24%)',
        }}
      />
    </div>
  );
}
