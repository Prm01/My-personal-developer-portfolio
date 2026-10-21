import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// Starfield particles background
function StarField({ count = 120 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#38bdf8'), // cyan
      new THREE.Color('#818cf8'), // indigo
      new THREE.Color('#c084fc'), // purple
      new THREE.Color('#ffffff')  // white
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Central rotating wireframe globe with node network
function WireframeGlobe() {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.06;
      meshRef.current.rotation.x = Math.sin(t * 0.04) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.08;
      innerRef.current.rotation.z = t * 0.04;
    }
  });

  return (
    <group position={[2.2, -0.2, -1]}>
      {/* Outer neon wireframe globe */}
      <mesh ref={meshRef} scale={[1.8, 1.8, 1.8]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#2563eb"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Inner rotating node core */}
      <mesh ref={innerRef} scale={[1.2, 1.2, 1.2]}>
        <octahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#7c3aed"
          emissiveIntensity={0.7}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}

// Tech Cube Component (Python, React, AWS, Docker)
function TechCube({ position, color, emissiveColor, label, labelSub, speed = 2, rotSpeed = 0.5 }) {
  const cubeRef = useRef();

  useFrame((state) => {
    if (!cubeRef.current) return;
    cubeRef.current.rotation.x = state.clock.elapsedTime * rotSpeed * 0.3;
    cubeRef.current.rotation.y = state.clock.elapsedTime * rotSpeed * 0.5;
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6} position={position}>
      <group ref={cubeRef}>
        {/* Glow cube mesh */}
        <mesh scale={[0.85, 0.85, 0.85]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={emissiveColor}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Text Label on Cube */}
        <Text
          position={[0, 0, 0.46]}
          fontSize={0.22}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {label}
        </Text>
        {labelSub && (
          <Text
            position={[0, -0.22, 0.46]}
            fontSize={0.12}
            color={color}
            anchorX="center"
            anchorY="middle"
          >
            {labelSub}
          </Text>
        )}
      </group>
    </Float>
  );
}

// Glowing 3D Code Bracket Object
function CodeBracket({ text, position, color = '#38bdf8', scale = 1, speed = 1.8 }) {
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5} position={position}>
      <Text
        fontSize={0.7 * scale}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#4338ca"
      >
        {text}
      </Text>
    </Float>
  );
}

// Interactive Parallax Scene Root
function InteractiveScene({ mouse }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    // Smooth lerp based on mouse position
    const targetX = -mouse.y * 0.25;
    const targetY = mouse.x * 0.35 + state.clock.elapsedTime * 0.02;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[-5, 3, 2]} intensity={0.8} color="#38bdf8" />
      <pointLight position={[5, -3, 2]} intensity={0.8} color="#a855f7" />

      {/* Background Starfield */}
      <StarField count={100} />

      {/* Central Wireframe Globe */}
      <WireframeGlobe />

      {/* Floating Code Brackets */}
      <CodeBracket text="{ }" position={[-2.8, 1.6, -1.5]} color="#38bdf8" scale={1.2} speed={2} />
      <CodeBracket text="</>" position={[3.2, 1.8, -2]} color="#a855f7" scale={1.1} speed={1.7} />

      {/* Floating Tech Cubes */}
      <TechCube
        position={[-2.4, -0.9, -1]}
        color="#38bdf8"
        emissiveColor="#0284c7"
        label="React"
        labelSub="Full Stack"
        speed={1.9}
        rotSpeed={0.4}
      />
      <TechCube
        position={[1.5, 2.0, -1.8]}
        color="#3b82f6"
        emissiveColor="#1d4ed8"
        label="Python"
        labelSub="FastAPI"
        speed={2.2}
        rotSpeed={0.5}
      />
      <TechCube
        position={[-1.2, 2.2, -2.2]}
        color="#f59e0b"
        emissiveColor="#b45309"
        label="AWS"
        labelSub="Bedrock"
        speed={1.7}
        rotSpeed={0.35}
      />
      <TechCube
        position={[3.0, -1.5, -1.5]}
        color="#06b6d4"
        emissiveColor="#0e7490"
        label="Docker"
        labelSub="DevOps"
        speed={2.4}
        rotSpeed={0.45}
      />
    </group>
  );
}

export default function Hero3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!webglSupported) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-slate-950 to-purple-950/40 pointer-events-none" />
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <InteractiveScene mouse={mouse} />
      </Canvas>
    </div>
  );
}
