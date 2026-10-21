import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// Particle starfield background (Purple, Fuchsia, Emerald, White)
function StarField({ count = 140 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#c084fc'), // purple
      new THREE.Color('#f472b6'), // fuchsia
      new THREE.Color('#34d399'), // emerald
      new THREE.Color('#ffffff')  // white
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;

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
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.04;
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
        size={0.065}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Neural Network / Connected Nodes Cluster (Purple & Emerald)
function NeuralNetworkGlobe() {
  const groupRef = useRef();
  const innerRef = useRef();

  const nodes = useMemo(() => {
    const pts = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.35 + Math.random() * 0.2;
      const sinPhi = Math.sin(phi);
      pts.push(new THREE.Vector3(r * sinPhi * Math.cos(theta), r * sinPhi * Math.sin(theta), r * Math.cos(phi)));
    }
    return pts;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.12;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.09;
      innerRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group position={[2.6, 0.2, -1.2]} ref={groupRef}>
      {/* Outer neon wireframe globe */}
      <mesh scale={[1.7, 1.7, 1.7]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.65}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Inner geometric core */}
      <mesh ref={innerRef} scale={[1.1, 1.1, 1.1]}>
        <octahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Glowing neural nodes */}
      {nodes.map((pos, idx) => (
        <mesh key={idx} position={pos.toArray()}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color={idx % 2 === 0 ? '#c084fc' : '#34d399'} />
        </mesh>
      ))}
    </group>
  );
}

// Stylized 3D Laptop / Cyber Terminal showing code (Emerald & Violet theme)
function StylizedLaptop({ mouse }) {
  const laptopRef = useRef();

  useFrame((state) => {
    if (!laptopRef.current) return;
    const t = state.clock.elapsedTime;
    laptopRef.current.rotation.y = THREE.MathUtils.lerp(
      laptopRef.current.rotation.y,
      -0.35 + mouse.x * 0.25,
      0.05
    );
    laptopRef.current.rotation.x = THREE.MathUtils.lerp(
      laptopRef.current.rotation.x,
      0.15 - mouse.y * 0.2,
      0.05
    );
    laptopRef.current.position.y = -1.1 + Math.sin(t * 1.5) * 0.08;
  });

  return (
    <group ref={laptopRef} position={[2.4, -1.1, 0.4]} scale={[0.85, 0.85, 0.85]}>
      {/* Laptop Base (chassis) */}
      <mesh position={[0, -0.04, 0.6]} receiveShadow castShadow>
        <boxGeometry args={[2.0, 0.08, 1.3]} />
        <meshStandardMaterial color="#1a102a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.005, 0.95]}>
        <boxGeometry args={[0.65, 0.002, 0.4]} />
        <meshStandardMaterial color="#2d1b46" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Keyboard Bed */}
      <mesh position={[0, 0.005, 0.45]}>
        <boxGeometry args={[1.7, 0.002, 0.55]} />
        <meshStandardMaterial color="#0e0719" roughness={0.8} />
      </mesh>

      {/* Glowing Accent line under keyboard (Emerald) */}
      <mesh position={[0, 0.006, 0.16]}>
        <boxGeometry args={[1.65, 0.002, 0.02]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* Laptop Screen Lid */}
      <group position={[0, 0, 0]} rotation={[-Math.PI / 8, 0, 0]}>
        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[2.0, 1.3, 0.06]} />
          <meshStandardMaterial color="#1a102a" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Display Panel */}
        <mesh position={[0, 0.65, 0.032]}>
          <planeGeometry args={[1.86, 1.16]} />
          <meshStandardMaterial color="#0b0615" emissive="#7c3aed" emissiveIntensity={0.18} />
        </mesh>

        {/* Top window dots */}
        <mesh position={[-0.75, 1.15, 0.035]}>
          <circleGeometry args={[0.025, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
        <mesh position={[-0.67, 1.15, 0.035]}>
          <circleGeometry args={[0.025, 8]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
        <mesh position={[-0.59, 1.15, 0.035]}>
          <circleGeometry args={[0.025, 8]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>

        {/* Terminal Text on Screen (Neon Emerald) */}
        <Text
          position={[-0.82, 0.98, 0.036]}
          fontSize={0.065}
          color="#34d399"
          anchorX="left"
          anchorY="top"
          fontFamily="monospace"
        >
          {`// Rahat & BhoomiAI Core
const wardAlert = await rahat.dispatch({
  zone: "Delhi Wards 290",
  engine: "AWS Bedrock + TrOCR"
});
// 500+ DSA · RGIPT '27`}
        </Text>
      </group>
    </group>
  );
}

// Floating Tech Cube (React=Fuchsia, Python=Amber, Node=Emerald, AWS=Orange, Docker=Purple)
function TechCube({ position, color, emissiveColor, label, labelSub, speed = 2, rotSpeed = 0.5 }) {
  const cubeRef = useRef();

  useFrame((state) => {
    if (!cubeRef.current) return;
    cubeRef.current.rotation.x = state.clock.elapsedTime * rotSpeed * 0.3;
    cubeRef.current.rotation.y = state.clock.elapsedTime * rotSpeed * 0.5;
  });

  return (
    <Float speed={speed} rotationIntensity={0.35} floatIntensity={0.55} position={position}>
      <group ref={cubeRef}>
        <mesh scale={[0.85, 0.85, 0.85]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={emissiveColor}
            emissiveIntensity={0.55}
            roughness={0.25}
            metalness={0.75}
            wireframe
            transparent
            opacity={0.75}
          />
        </mesh>

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

// Glowing 3D Code Bracket Object (Purple / Emerald)
function CodeBracket({ text, position, color = '#c084fc', outlineColor = '#7c3aed', scale = 1, speed = 1.8 }) {
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5} position={position}>
      <Text
        fontSize={0.7 * scale}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor={outlineColor}
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
    const targetX = -mouse.y * 0.22;
    const targetY = mouse.x * 0.32 + state.clock.elapsedTime * 0.02;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      {/* Lighting (Purple & Emerald) */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[-5, 3, 2]} intensity={0.9} color="#c084fc" />
      <pointLight position={[5, -3, 2]} intensity={0.9} color="#34d399" />

      {/* Background Starfield */}
      <StarField count={120} />

      {/* Central Neural Network & Globe */}
      <NeuralNetworkGlobe />

      {/* Stylized 3D Cyber Laptop */}
      <StylizedLaptop mouse={mouse} />

      {/* Floating Code Brackets */}
      <CodeBracket text="{ }" position={[-2.8, 1.6, -1.5]} color="#c084fc" outlineColor="#7c3aed" scale={1.2} speed={2} />
      <CodeBracket text="</>" position={[3.2, 1.8, -2]} color="#34d399" outlineColor="#059669" scale={1.1} speed={1.7} />

      {/* Floating Tech Cubes: React (Fuchsia), Python (Amber), Node (Emerald), AWS (Orange), Docker (Purple) */}
      <TechCube
        position={[-2.4, -0.9, -1]}
        color="#e879f9"
        emissiveColor="#c026d3"
        label="React"
        labelSub="Full Stack"
        speed={1.9}
        rotSpeed={0.4}
      />
      <TechCube
        position={[1.2, 2.3, -1.8]}
        color="#fbbf24"
        emissiveColor="#d97706"
        label="Python"
        labelSub="FastAPI"
        speed={2.2}
        rotSpeed={0.5}
      />
      <TechCube
        position={[-1.2, 2.3, -2.2]}
        color="#f97316"
        emissiveColor="#c2410c"
        label="AWS"
        labelSub="Bedrock"
        speed={1.7}
        rotSpeed={0.35}
      />
      <TechCube
        position={[3.2, -1.8, -1.5]}
        color="#a855f7"
        emissiveColor="#7c3aed"
        label="Docker"
        labelSub="DevOps"
        speed={2.4}
        rotSpeed={0.45}
      />
      <TechCube
        position={[-3.1, 0.4, -1.8]}
        color="#10b981"
        emissiveColor="#059669"
        label="Node"
        labelSub="Express"
        speed={1.8}
        rotSpeed={0.4}
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
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-slate-950 to-emerald-950/30 pointer-events-none" />
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
