import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

/**
 * 3D cube that reacts to mouse movement.
 * Renders in a fixed corner, receives mouse position as props.
 */
function Cube({ mouse }) {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current) return;
    const smooth = 0.05;
    meshRef.current.rotation.y += (mouse.x * 0.5 - meshRef.current.rotation.y) * smooth;
    meshRef.current.rotation.x += (mouse.y * 0.5 - meshRef.current.rotation.x) * smooth;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.6}
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Floating3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = -(e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed top-24 right-8 z-30 w-28 h-28 md:w-36 md:h-36 pointer-events-none hidden sm:block"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, -3, 2]} intensity={0.3} color="#c084fc" />
        <Cube mouse={mouse} />
      </Canvas>
    </div>
  );
}
