'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus, MeshDistortMaterial, Line } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
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

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleGeometry = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    const generator = createSeededRandom(42);

    for (let i = 0; i < count; i++) {
      const spread = 32;
      positions[i * 3] = (generator() - 0.5) * spread;
      positions[i * 3 + 1] = (generator() - 0.5) * spread;
      positions[i * 3 + 2] = (generator() - 0.5) * 24;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return geometry;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.6 + i) * 0.0015;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={particleGeometry}>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitRings() {
  const rings = useMemo(() => {
    const generator = createSeededRandom(7);
    return Array.from({ length: 3 }).map((_, index) => {
      const radius = 1.4 + index * 0.8;
      const points = Array.from({ length: 80 }, (_, i) => {
        const angle = (i / 80) * Math.PI * 2;
        const wobble = Math.sin(angle * 3 + index) * 0.05;
        const z = Math.cos(angle * 1.2) * 0.2 * (index + 1);
        return new THREE.Vector3(
          Math.cos(angle) * radius + wobble * generator(),
          Math.sin(angle) * radius + wobble * generator(),
          z,
        );
      });
      return { points, radius };
    });
  }, []);

  return (
    <group>
      {rings.map((ring, ringIndex) => (
        <Line
          key={ring.radius}
          points={ring.points}
          color="#ffffff"
          opacity={0.25 + ringIndex * 0.15}
          lineWidth={1}
          transparent
          dashed
          dashSize={0.3}
          gapSize={0.2}
        />
      ))}
    </group>
  );
}

function SignalColumns() {
  const bars = useMemo(() => {
    const generator = createSeededRandom(99);
    return Array.from({ length: 12 }).map((_, idx) => {
      const radius = 4.8 + generator() * 2;
      const angle = (idx / 12) * Math.PI * 2;
      const height = 0.4 + generator() * 1.4;
      return {
        position: [
          Math.cos(angle) * radius,
          -1.5 + generator(),
          Math.sin(angle) * radius,
        ] as [number, number, number],
        height,
      };
    });
  }, []);

  return (
    <group>
      {bars.map((bar, index) => (
        <Box key={index} args={[0.08, bar.height, 0.08]} position={bar.position}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.7}
            roughness={0.35}
            transparent
            opacity={0.4}
          />
        </Box>
      ))}
    </group>
  );
}

function GeometricComposition() {
  const groupRef = useRef<THREE.Group>(null);
  const mainSphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.3;
      groupRef.current.rotation.x = Math.cos(t * 0.08) * 0.14;
    }

    if (mainSphereRef.current) {
      const scale = 1 + Math.sin(t * 0.6) * 0.1;
      mainSphereRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.45}>
        <Sphere ref={mainSphereRef} args={[1.35, 128, 128]} position={[0, 0.2, 0]}>
          <MeshDistortMaterial
            color="#ffffff"
            metalness={0.92}
            roughness={0.08}
            distort={0.25}
            speed={1.8}
          />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={1} floatIntensity={0.4}>
        <Torus args={[2, 0.14, 48, 120]} position={[0, 0, 0]} rotation={[Math.PI / 5, 0, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.15}
            wireframe
            transparent
            opacity={0.5}
          />
        </Torus>
      </Float>

      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={0.35}>
        <Torus args={[1.1, 0.08, 32, 80]} position={[0, 0, 0]} rotation={[0, Math.PI / 2, Math.PI / 8]}>
          <meshStandardMaterial color="#ffffff" metalness={0.85} roughness={0.18} />
        </Torus>
      </Float>

      <Float speed={2.6} rotationIntensity={0.6} floatIntensity={0.6}>
        <Box args={[0.55, 0.55, 0.55]} position={[3.2, 1.1, -2.3]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.78}
            roughness={0.24}
            wireframe
            transparent
            opacity={0.35}
          />
        </Box>
      </Float>

      <Float speed={2.3} rotationIntensity={0.9} floatIntensity={0.5}>
        <Box args={[0.48, 0.48, 0.48]} position={[-2.9, -0.8, 2.4]}>
          <meshStandardMaterial color="#ffffff" metalness={0.82} roughness={0.2} />
        </Box>
      </Float>

      <Float speed={2.9} rotationIntensity={0.5} floatIntensity={0.55}>
        <Sphere args={[0.42, 32, 32]} position={[2.4, -1.8, 2.8]}>
          <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.06} />
        </Sphere>
      </Float>

      <Float speed={2.1} rotationIntensity={0.55} floatIntensity={0.6}>
        <Sphere args={[0.38, 32, 32]} position={[-2.6, 1.9, -2.7]}>
          <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.06} />
        </Sphere>
      </Float>

      <Float speed={1.7} rotationIntensity={0.4} floatIntensity={0.35}>
        <Sphere args={[3.1, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.45}
            roughness={0.5}
            wireframe
            transparent
            opacity={0.12}
          />
        </Sphere>
      </Float>

      <OrbitRings />
      <SignalColumns />
    </group>
  );
}

export default function BackgroundScene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-35">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['transparent']} />
          <ambientLight intensity={0.45} />
          <directionalLight position={[10, 10, 5]} intensity={2.1} color="#ffffff" />
          <directionalLight position={[-10, -5, -5]} intensity={1.3} color="#ffffff" />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-5, -5, 5]} intensity={1.1} color="#ffffff" />
          <spotLight position={[0, 9, 0]} angle={0.32} penumbra={1} intensity={2.1} color="#ffffff" />

          <fog attach="fog" args={['#000000', 8.5, 22]} />

          <Particles />
          <GeometricComposition />
        </Suspense>
      </Canvas>
    </div>
  );
}
