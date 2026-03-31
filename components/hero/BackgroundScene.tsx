'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

// Particle system for atmospheric depth
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleGeometry = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spread particles in 3D space
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    return geometry;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      // Subtle drift animation
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} geometry={particleGeometry}>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Enhanced geometric composition with cinematic movement
function GeometricComposition() {
  const groupRef = useRef<THREE.Group>(null);
  const mainSphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Cinematic camera-like rotation
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.3;
      groupRef.current.rotation.x = Math.cos(t * 0.08) * 0.15;
    }

    if (mainSphereRef.current) {
      // Breathing effect on main sphere
      const scale = 1 + Math.sin(t * 0.5) * 0.1;
      mainSphereRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main central sphere with distortion */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <Sphere ref={mainSphereRef} args={[1.5, 128, 128]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#ffffff"
            metalness={0.95}
            roughness={0.05}
            distort={0.3}
            speed={1.5}
          />
        </Sphere>
      </Float>

      {/* Orbiting geometric ring */}
      <Float speed={2.2} rotationIntensity={1} floatIntensity={0.5}>
        <Torus args={[2, 0.15, 32, 64]} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            wireframe
            transparent
            opacity={0.6}
          />
        </Torus>
      </Float>

      {/* Inner rotating ring */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.3}>
        <Torus args={[1.2, 0.08, 16, 48]} position={[0, 0, 0]} rotation={[0, Math.PI / 2, Math.PI / 6]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.85}
            roughness={0.15}
          />
        </Torus>
      </Float>

      {/* Floating cubes for depth */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={0.6}>
        <Box args={[0.6, 0.6, 0.6]} position={[3.5, 1.5, -2]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.2}
            wireframe
            transparent
            opacity={0.4}
          />
        </Box>
      </Float>

      <Float speed={2.8} rotationIntensity={1.2} floatIntensity={0.5}>
        <Box args={[0.5, 0.5, 0.5]} position={[-3, -1, 2]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      </Float>

      {/* Accent spheres for layering */}
      <Float speed={3} rotationIntensity={0.4} floatIntensity={0.7}>
        <Sphere args={[0.35, 32, 32]} position={[2.5, -2, 3]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.95}
            roughness={0.05}
          />
        </Sphere>
      </Float>

      <Float speed={2.6} rotationIntensity={0.5} floatIntensity={0.6}>
        <Sphere args={[0.4, 32, 32]} position={[-2.8, 2, -3]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.95}
            roughness={0.05}
          />
        </Sphere>
      </Float>

      {/* Additional wireframe geometry for complexity */}
      <Float speed={1.9} rotationIntensity={0.6} floatIntensity={0.4}>
        <Sphere args={[3, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.5}
            roughness={0.5}
            wireframe
            transparent
            opacity={0.1}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function BackgroundScene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-30">
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
          {/* Enhanced lighting for cinematic quality */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -5, -5]} intensity={1.2} color="#ffffff" />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-5, -5, 5]} intensity={1} color="#ffffff" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            color="#ffffff"
          />

          {/* Atmospheric fog for depth */}
          <fog attach="fog" args={['#000000', 8, 20]} />

          {/* Particle system for atmosphere */}
          <Particles />

          {/* Main geometric composition */}
          <GeometricComposition />
        </Suspense>
      </Canvas>
    </div>
  );
}
