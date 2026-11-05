import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural planet texture using canvas
function createPlanetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base gradient — deep ocean/terrain
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#0a0a1a');
  grad.addColorStop(0.3, '#0d1b4b');
  grad.addColorStop(0.6, '#1a0533');
  grad.addColorStop(1, '#050d2e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add terrain patches
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 60 + 10;
    const alpha = Math.random() * 0.4 + 0.1;
    const hue = Math.random() > 0.5 ? '220, 100, 180' : '260, 50, 120';
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${hue}, ${alpha})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Bright spots (cities / aurora)
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 15 + 3;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(100, 180, 255, 0.8)');
    g.addColorStop(0.5, 'rgba(80, 100, 255, 0.3)');
    g.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

function createRingTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, 512, 32);

  // Ring bands
  const bands = [
    { x: 0, w: 60, color: 'rgba(80,120,255,0.3)' },
    { x: 70, w: 30, color: 'rgba(120,80,255,0.5)' },
    { x: 110, w: 80, color: 'rgba(60,100,220,0.4)' },
    { x: 200, w: 50, color: 'rgba(100,60,200,0.6)' },
    { x: 260, w: 100, color: 'rgba(80,120,255,0.35)' },
    { x: 370, w: 60, color: 'rgba(140,80,255,0.45)' },
    { x: 440, w: 72, color: 'rgba(60,80,200,0.3)' },
  ];

  bands.forEach(({ x, w, color }) => {
    const g = ctx.createLinearGradient(x, 0, x + w, 0);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(0.3, color);
    g.addColorStop(0.7, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, 0, w, 32);
  });

  return new THREE.CanvasTexture(canvas);
}

export default function Planet({ mousePosition }) {
  const planetRef = useRef();
  const ringsRef = useRef();
  const atmosphereRef = useRef();
  const glowRef = useRef();

  const planetTexture = useMemo(() => createPlanetTexture(), []);
  const ringTexture = useMemo(() => createRingTexture(), []);

  // Ring geometry — flat torus-like shape
  const ringGeometry = useMemo(() => {
    const geo = new THREE.RingGeometry(5.5, 8.5, 128, 4);
    // UV mapping for ring texture
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const r = Math.sqrt(x * x + y * y);
      uv.setXY(i, (r - 5.5) / 3, 0.5);
    }
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (planetRef.current) {
      // Auto rotation
      planetRef.current.rotation.y = t * 0.08;

      // Mouse interaction — gentle tilt
      if (mousePosition) {
        planetRef.current.rotation.x = THREE.MathUtils.lerp(
          planetRef.current.rotation.x,
          mousePosition.y * 0.15,
          0.05
        );
        planetRef.current.position.x = THREE.MathUtils.lerp(
          planetRef.current.position.x,
          mousePosition.x * 0.8,
          0.03
        );
        planetRef.current.position.y = THREE.MathUtils.lerp(
          planetRef.current.position.y,
          mousePosition.y * 0.5,
          0.03
        );
      }
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.02;
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = t * 0.04;
    }

    if (glowRef.current) {
      glowRef.current.material.opacity = 0.3 + Math.sin(t * 0.5) * 0.08;
    }
  });

  return (
    <group>
      {/* Main planet */}
      <group ref={planetRef}>
        {/* Planet sphere */}
        <mesh castShadow>
          <sphereGeometry args={[4.5, 128, 128]} />
          <meshStandardMaterial
            map={planetTexture}
            roughness={0.7}
            metalness={0.1}
            emissiveMap={planetTexture}
            emissive={new THREE.Color(0x0a1a4a)}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Atmosphere layer */}
        <mesh ref={atmosphereRef} scale={[1.05, 1.05, 1.05]}>
          <sphereGeometry args={[4.5, 64, 64]} />
          <meshStandardMaterial
            color="#1a2a8a"
            transparent
            opacity={0.15}
            side={THREE.FrontSide}
            depthWrite={false}
          />
        </mesh>

        {/* Outer glow atmosphere */}
        <mesh ref={glowRef} scale={[1.15, 1.15, 1.15]}>
          <sphereGeometry args={[4.5, 32, 32]} />
          <meshStandardMaterial
            color="#2244cc"
            transparent
            opacity={0.3}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>

        {/* Rings */}
        <group ref={ringsRef} rotation={[Math.PI * 0.42, 0, 0]}>
          <mesh geometry={ringGeometry}>
            <meshBasicMaterial
              map={ringTexture}
              side={THREE.DoubleSide}
              transparent
              opacity={0.85}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* Inner ring glow */}
        <group rotation={[Math.PI * 0.42, 0, 0]}>
          <mesh>
            <ringGeometry args={[5.4, 8.6, 128]} />
            <meshBasicMaterial
              color="#4466ff"
              side={THREE.DoubleSide}
              transparent
              opacity={0.08}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>

      {/* Cinematic lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[15, 10, 5]}
        intensity={2.5}
        color="#c8d8ff"
        castShadow
      />
      <pointLight position={[-10, -5, -10]} intensity={0.8} color="#6633ff" />
      <pointLight position={[8, 8, 8]} intensity={0.5} color="#3399ff" />
    </group>
  );
}

