import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AmbientScrollParticles({ scrollYProgress }) {
  const pointsRef = useRef();
  const lightRef = useRef();

  const count = 90;
  const positions = useRef(new Float32Array(count * 3));
  const colors = useRef(new Float32Array(count * 3));

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 20;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;

      colors.current[i * 3] = 0.22;
      colors.current[i * 3 + 1] = 0.74;
      colors.current[i * 3 + 2] = 0.97;
    }
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const scrollP = scrollYProgress.current || 0;

    // Shift camera & particle rotation with scroll
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01 + scrollP * 0.5;
    pointsRef.current.rotation.x = scrollP * 0.3;

    // Shift color subtly based on scroll
    if (lightRef.current) {
      const hue = (0.55 + scrollP * 0.3) % 1; // cyan -> purple -> magenta
      lightRef.current.color.setHSL(hue, 0.8, 0.5);
    }
  });

  return (
    <>
      <pointLight ref={lightRef} position={[0, 0, 2]} intensity={0.6} />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions.current}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#818cf8"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </points>
    </>
  );
}

export default function ScrollBackground3D() {
  const scrollYProgress = useRef(0);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    const onScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        scrollYProgress.current = window.scrollY / totalScroll;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!webglSupported) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1]}
      >
        <AmbientScrollParticles scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
