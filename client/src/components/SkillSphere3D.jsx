import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, TrackballControls } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS_LIST = [
  { name: 'React.js', category: 'Frontend', color: '#38bdf8' },
  { name: 'FastAPI', category: 'Backend', color: '#06b6d4' },
  { name: 'AWS Bedrock', category: 'Cloud & DevOps', color: '#f59e0b' },
  { name: 'Python', category: 'Languages', color: '#3b82f6' },
  { name: 'TrOCR', category: 'AI-ML', color: '#a855f7' },
  { name: 'LangChain', category: 'AI-ML', color: '#818cf8' },
  { name: 'PostgreSQL', category: 'Backend', color: '#38bdf8' },
  { name: 'Node.js', category: 'Backend', color: '#22c55e' },
  { name: 'Docker', category: 'Cloud & DevOps', color: '#0284c7' },
  { name: 'C++', category: 'Languages', color: '#6366f1' },
  { name: 'Tailwind CSS', category: 'Frontend', color: '#38bdf8' },
  { name: 'AWS S3', category: 'Cloud & DevOps', color: '#f59e0b' },
  { name: 'MongoDB', category: 'Backend', color: '#10b981' },
  { name: 'MCP', category: 'AI-ML', color: '#c084fc' },
  { name: 'Vite', category: 'Frontend', color: '#8b5cf6' },
  { name: 'Express.js', category: 'Backend', color: '#e2e8f0' },
  { name: 'JavaScript', category: 'Languages', color: '#fbbf24' },
  { name: 'SQL', category: 'Languages', color: '#60a5fa' },
  { name: 'CloudFront', category: 'Cloud & DevOps', color: '#f59e0b' },
  { name: 'GitHub Actions', category: 'Cloud & DevOps', color: '#93c5fd' },
  { name: 'Web Push', category: 'Backend', color: '#f43f5e' },
  { name: 'scikit-learn', category: 'AI-ML', color: '#f97316' },
  { name: 'REST APIs', category: 'Backend', color: '#34d399' },
  { name: 'Gemini API', category: 'AI-ML', color: '#818cf8' }
];

function SkillWord({ position, skill, hoveredSkill, setHoveredSkill }) {
  const isHovered = hoveredSkill === skill.name;
  const textRef = useRef();

  useFrame(({ camera }) => {
    if (!textRef.current) return;
    // Always face the camera (billboard)
    textRef.current.quaternion.copy(camera.quaternion);
  });

  return (
    <group position={position}>
      <Text
        ref={textRef}
        fontSize={isHovered ? 0.28 : 0.2}
        color={isHovered ? '#ffffff' : skill.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={isHovered ? 0.025 : 0.01}
        outlineColor={isHovered ? '#8b5cf6' : '#1e1b4b'}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredSkill(skill.name);
        }}
        onPointerOut={() => setHoveredSkill(null)}
      >
        {skill.name}
      </Text>
    </group>
  );
}

function SphereCloud({ hoveredSkill, setHoveredSkill }) {
  const groupRef = useRef();
  const radius = 2.4;

  // Distribute skills evenly on a 3D sphere using golden spiral (Fibonacci)
  const sphereWords = useMemo(() => {
    const words = [];
    const count = SKILLS_LIST.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      words.push({
        position: [x * radius, y * radius, z * radius],
        skill: SKILLS_LIST[i]
      });
    }
    return words;
  }, [radius]);

  useFrame((state, delta) => {
    if (groupRef.current && !hoveredSkill) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Subtle core cage */}
      <mesh scale={[1.8, 1.8, 1.8]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {sphereWords.map(({ position, skill }) => (
        <SkillWord
          key={skill.name}
          position={position}
          skill={skill}
          hoveredSkill={hoveredSkill}
          setHoveredSkill={setHoveredSkill}
        />
      ))}
    </group>
  );
}

export default function SkillSphere3D() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className="h-64 flex items-center justify-center p-4 text-xs text-slate-400">
        Interactive 3D Skill Sphere
      </div>
    );
  }

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden card-glass border border-blue-500/20 dark:border-purple-500/20 shadow-2xl flex items-center justify-center mb-10">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a855f7" />
        <SphereCloud hoveredSkill={hoveredSkill} setHoveredSkill={setHoveredSkill} />
      </Canvas>

      {/* Floating Status & Instruction */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none text-xs text-slate-400">
        <span className="font-semibold text-blue-500 dark:text-purple-400 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-md border border-blue-500/20">
          {hoveredSkill ? `Skill: ${hoveredSkill}` : '3D Interactive Skill Sphere'}
        </span>
        <span className="hidden sm:inline bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-md border border-slate-800">
          Hover to inspect · Auto-orbits in 3D
        </span>
      </div>
    </div>
  );
}
