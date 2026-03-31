'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function GeometricComposition() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main central sphere */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </Sphere>
      </Float>

      {/* Orbiting cube */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.3}>
        <Box args={[0.8, 0.8, 0.8]} position={[3, 1, -1]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.2}
            wireframe={false}
          />
        </Box>
      </Float>

      {/* Torus ring */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.4}>
        <Torus args={[1, 0.3, 16, 32]} position={[-2.5, -0.5, 1]} rotation={[0.5, 0.5, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.85}
            roughness={0.15}
          />
        </Torus>
      </Float>

      {/* Smaller accent spheres */}
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <Sphere args={[0.4, 32, 32]} position={[2, -1.5, 2]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
      </Float>

      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.5}>
        <Sphere args={[0.5, 32, 32]} position={[-3, 1.5, -2]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function BackgroundScene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-15">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Suspense fallback={null}>
          {/* Lighting setup */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-10, -5, -5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[0, 5, 5]} intensity={1} color="#ffffff" />

          {/* Fog for depth */}
          <fog attach="fog" args={['#000000', 5, 15]} />

          <GeometricComposition />
        </Suspense>
      </Canvas>
    </div>
  );
}
