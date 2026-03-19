import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D particle system - floating dots that drift slowly.
 */
function Particles() {
  const count = 80;
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#8b5cf6"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * 3D floating objects + particles for Hero background.
 */
export default function Scene3D() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.9} />
      <pointLight position={[-10, -10, 5]} intensity={0.25} color="#8b5cf6" />
      <pointLight position={[0, 10, -5]} intensity={0.3} color="#c084fc" />

      {/* Floating particles */}
      <Particles />

      {/* Main distorted mesh */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh position={[0, 0, -3]} scale={[3.5, 3.5, 3.5]}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            distort={0.25}
            speed={1.2}
            roughness={0.8}
            metalness={0.15}
            opacity={0.12}
            transparent
          />
        </mesh>
      </Float>

      {/* Secondary shapes */}
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh position={[3, 1, -4]} scale={[1.8, 1.8, 1.8]}>
          <torusGeometry args={[0.7, 0.18, 16, 32]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.06} />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={0.18} floatIntensity={0.35}>
        <mesh position={[-2.5, -1, -3.5]} scale={[1.4, 1.4, 1.4]}>
          <octahedronGeometry args={[1]} />
          <meshBasicMaterial color="#f43f5e" transparent opacity={0.05} />
        </mesh>
      </Float>
    </group>
  );
}
