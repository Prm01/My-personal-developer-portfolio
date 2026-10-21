import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
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

function SkillWord({ position, skill, hoveredSkill, setHoveredSkill, selectedCategory }) {
  const isHovered = hoveredSkill === skill.name;
  const isMatchCategory = !selectedCategory || selectedCategory === 'All' || skill.category === selectedCategory;
  const textRef = useRef();

  useFrame(({ camera }) => {
    if (!textRef.current) return;
    textRef.current.quaternion.copy(camera.quaternion);
  });

  return (
    <group position={position}>
      <Text
        ref={textRef}
        fontSize={isHovered ? 0.3 : isMatchCategory ? 0.22 : 0.16}
        color={isHovered ? '#ffffff' : isMatchCategory ? skill.color : '#64748b'}
        anchorX="center"
        anchorY="middle"
        outlineWidth={isHovered ? 0.03 : 0.01}
        outlineColor={isHovered ? '#8b5cf6' : '#090d16'}
        fillOpacity={isMatchCategory ? 1 : 0.35}
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

function SphereCloud({ hoveredSkill, setHoveredSkill, selectedCategory }) {
  const radius = 2.45;

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

  return (
    <group>
      {/* Inner glowing wireframe cage */}
      <mesh scale={[1.8, 1.8, 1.8]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#38bdf8"
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
          selectedCategory={selectedCategory}
        />
      ))}
    </group>
  );
}

export default function SkillSphere3D() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [webglSupported, setWebglSupported] = useState(true);

  const categories = ['All', 'Frontend', 'Backend', 'Cloud & DevOps', 'AI-ML', 'Languages'];

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
    <div className="relative w-full rounded-2xl overflow-hidden card-glass border border-blue-500/20 dark:border-purple-500/20 shadow-2xl mb-12">
      {/* Category Pills directly above canvas */}
      <div className="p-4 border-b border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3 bg-slate-100/50 dark:bg-slate-900/50">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          3D Interactive Skill Sphere:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-200/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center">
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
          <SphereCloud
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
            selectedCategory={selectedCategory}
          />
          <OrbitControls
            enableZoom={false}
            autoRotate={!hoveredSkill}
            autoRotateSpeed={0.8}
            enablePan={false}
          />
        </Canvas>

        {/* Floating Status & Instruction */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none text-xs text-slate-400">
          <span className="font-semibold text-blue-500 dark:text-purple-400 bg-slate-900/85 px-3 py-1.5 rounded-lg backdrop-blur-md border border-blue-500/20">
            {hoveredSkill ? `Inspecting: ${hoveredSkill}` : 'Click & Drag to Rotate in 3D'}
          </span>
          <span className="hidden sm:inline bg-slate-900/85 px-3 py-1.5 rounded-lg backdrop-blur-md border border-slate-800">
            Interactive Orbit · Billboarded 3D Chips
          </span>
        </div>
      </div>
    </div>
  );
}
