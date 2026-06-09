import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Environment, Html, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const MONITOR_TITLES = ["ScanKart", "RoomDekho", "Fitness Trainer", "IPL Win Analysis"];

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      <planeGeometry args={[60, 60, 60, 60]} />
      <meshBasicMaterial color="#00F5FF" wireframe transparent opacity={0.18} />
    </mesh>
  );
}

function Monitor({ position, rotation, label, color }: { position: [number, number, number]; rotation: [number, number, number]; label: string; color: string }) {
  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={position} rotation={rotation}>
        <mesh>
          <boxGeometry args={[1.6, 1, 0.05]} />
          <meshStandardMaterial color="#0b1228" emissive={color} emissiveIntensity={0.4} metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.5, 0.9]} />
          <meshBasicMaterial color={color} transparent opacity={0.15} />
        </mesh>
        <Html transform position={[0, 0, 0.04]} distanceFactor={2.4} occlude={false}>
          <div className="w-[180px] rounded-md border border-white/15 bg-black/60 p-2 font-mono text-[10px] text-white">
            <div className="mb-1 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF0080]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FF88]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#00F5FF]" />
              <span className="ml-auto opacity-50">~/project</span>
            </div>
            <div className="font-display text-[13px] font-bold text-[#00F5FF]">{label}</div>
            <div className="mt-1 text-[9px] leading-[1.4] text-white/70">
              {"> npm run build"}<br />
              {"✓ compiled · 0 errors"}<br />
              {"deploying to edge…"}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function HoloOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.4;
  });
  return (
    <Float speed={1} floatIntensity={1.2}>
      <mesh ref={ref} position={[0, 0.4, 0]}>
        <icosahedronGeometry args={[1.1, 4]} />
        <MeshDistortMaterial color="#8B5CF6" emissive="#00F5FF" emissiveIntensity={0.5} distort={0.35} speed={1.6} metalness={0.8} roughness={0.15} />
      </mesh>
    </Float>
  );
}

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00F5FF" size={0.03} transparent opacity={0.7} />
    </points>
  );
}

function Rig() {
  useFrame(({ camera, mouse, clock }) => {
    const tx = mouse.x * 1.2;
    const ty = 0.3 + mouse.y * 0.6;
    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.position.y += (ty - camera.position.y) * 0.04;
    camera.position.z = 6 + Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
    camera.lookAt(0, 0.3, 0);
  });
  return null;
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.5, 6], fov: 55 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#050816"]} />
      <fog attach="fog" args={["#050816", 8, 22]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00F5FF" />
      <pointLight position={[-5, -2, 3]} intensity={2} color="#FF0080" />
      <pointLight position={[0, 4, -4]} intensity={1.5} color="#8B5CF6" />

      <Suspense fallback={null}>
        <Stars radius={60} depth={40} count={1500} factor={3} fade speed={1} />
        <Particles />
        <GridFloor />
        <HoloOrb />
        <Monitor position={[-3, 1.2, -1]} rotation={[0, 0.4, 0]} label={MONITOR_TITLES[0]} color="#00F5FF" />
        <Monitor position={[3, 1.4, -1.2]} rotation={[0, -0.4, 0]} label={MONITOR_TITLES[1]} color="#8B5CF6" />
        <Monitor position={[-2.4, -0.8, 1.2]} rotation={[0, 0.3, 0]} label={MONITOR_TITLES[2]} color="#FF0080" />
        <Monitor position={[2.6, -0.7, 1.0]} rotation={[0, -0.3, 0]} label={MONITOR_TITLES[3]} color="#00FF88" />
        <Environment preset="night" />
      </Suspense>
      <Rig />
    </Canvas>
  );
}
