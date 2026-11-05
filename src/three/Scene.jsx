import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Planet from './Planet';
import { StarField, FloatingParticles, DustRing } from './ParticleSystem';

export default function Scene({ mousePosition, isMobile }) {
  return (
    <Canvas
      camera={{ position: [0, 2, 18], fov: 55 }}
      style={{ background: 'transparent' }}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: isMobile ? 'low-power' : 'high-performance',
      }}
      shadows={!isMobile}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
    >
      <Suspense fallback={null}>
        <StarField count={isMobile ? 1200 : 3000} />
        <FloatingParticles count={isMobile ? 80 : 200} color="#3b82f6" radius={18} />
        <FloatingParticles count={isMobile ? 60 : 150} color="#8b5cf6" radius={25} />
        {!isMobile && <DustRing count={800} />}
        <Planet mousePosition={mousePosition} />
      </Suspense>
    </Canvas>
  );
}

