import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function AmbientScrollParticles({ scrollYProgress }) {
  const pointsRef = useRef();
  const lightRef = useRef();

  const count = 90;
  const positions = useRef(new Float32Array(count * 3));

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 20;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const scrollP = scrollYProgress.current || 0;

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01 + scrollP * 0.5;
    pointsRef.current.rotation.x = scrollP * 0.3;

    if (lightRef.current) {
      // Shift hue across Purple (0.78), Fuchsia (0.88), and Emerald (0.42)
      const hue = scrollP > 0.5 ? 0.42 : 0.78 + scrollP * 0.2;
      lightRef.current.color.setHSL(hue, 0.85, 0.55);
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
          color="#a855f7"
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
