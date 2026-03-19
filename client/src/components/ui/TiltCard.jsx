import { useMemo, useRef, useState } from 'react';

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function TiltCard({
  as: Comp = 'div',
  children,
  className = '',
  tilt = 10
}) {
  const ref = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, a: 0 });

  const style = useMemo(
    () => ({
      transform: `perspective(1200px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) translateZ(0)`,
      transformStyle: 'preserve-3d',
      '--glow-x': `${glow.x}%`,
      '--glow-y': `${glow.y}%`,
      '--glow-a': glow.a
    }),
    [rot, glow]
  );

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = clamp(((e.clientX - r.left) / r.width) * 100, 0, 100);
    const py = clamp(((e.clientY - r.top) / r.height) * 100, 0, 100);

    const dx = (px - 50) / 50;
    const dy = (py - 50) / 50;

    setRot({ x: dy * tilt, y: dx * -tilt });
    setGlow({ x: px, y: py, a: 1 });
  };

  const onLeave = () => {
    setRot({ x: 0, y: 0 });
    setGlow((g) => ({ ...g, a: 0 }));
  };

  return (
    <Comp
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={`group relative card-glass rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden transition-transform duration-300 will-change-transform ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(139,92,246,0.22), transparent 40%)',
            opacity: 'var(--glow-a)'
          }}
        />
        <div className="absolute inset-0 grid-pattern opacity-40" />
      </div>
      <div className="relative">{children}</div>
    </Comp>
  );
}

