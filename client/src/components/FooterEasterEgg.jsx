import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function DraggableGem() {
  const meshRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0.02, y: 0.015 });

  useFrame(() => {
    if (!meshRef.current) return;
    if (!isDragging) {
      meshRef.current.rotation.x += velocity.current.x;
      meshRef.current.rotation.y += velocity.current.y;
      velocity.current.x *= 0.985;
      velocity.current.y *= 0.985;

      if (Math.abs(velocity.current.x) < 0.005) velocity.current.x = 0.005;
      if (Math.abs(velocity.current.y) < 0.008) velocity.current.y = 0.008;
    }
  });

  const onPointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  const onPointerMove = (e) => {
    if (!isDragging || !meshRef.current) return;
    const dx = (e.clientX - prevMouse.current.x) * 0.02;
    const dy = (e.clientY - prevMouse.current.y) * 0.02;

    meshRef.current.rotation.y += dx;
    meshRef.current.rotation.x += dy;

    velocity.current = { x: dy, y: dx };
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        scale={[1.1, 1.1, 1.1]}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerUp}
        onPointerMove={onPointerMove}
        className="cursor-grab active:cursor-grabbing"
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#7c3aed"
          emissiveIntensity={0.6}
          wireframe
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function FooterEasterEgg() {
  return (
    <div className="relative w-full max-w-xs mx-auto text-center my-6">
      <div className="w-full h-36 rounded-2xl card-glass border border-purple-500/20 dark:border-emerald-500/20 overflow-hidden relative flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#a855f7" />
          <pointLight position={[-5, -5, -5]} intensity={1} color="#10b981" />
          <DraggableGem />
        </Canvas>

        <span className="absolute bottom-2 text-[10px] font-semibold text-slate-400 bg-slate-900/80 px-2.5 py-0.5 rounded-full backdrop-blur-md pointer-events-none border border-slate-800">
          Easter Egg: Drag &amp; toss the 3D Polyhedron
        </span>
      </div>
    </div>
  );
}
