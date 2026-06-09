import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { SectionHeading } from "./SectionHeading";

const skills = [
  { name: "React", level: 95, color: "#00F5FF" },
  { name: "TypeScript", level: 90, color: "#3178c6" },
  { name: "JavaScript", level: 92, color: "#f7df1e" },
  { name: "Tailwind", level: 95, color: "#06b6d4" },
  { name: "Firebase", level: 88, color: "#FFCA28" },
  { name: "MongoDB", level: 80, color: "#00FF88" },
  { name: "MySQL", level: 82, color: "#00758F" },
  { name: "Node.js", level: 85, color: "#8CC84B" },
  { name: "Python", level: 88, color: "#FFD43B" },
  { name: "ML", level: 78, color: "#FF0080" },
  { name: "Git", level: 90, color: "#F05032" },
  { name: "GitHub", level: 92, color: "#8B5CF6" },
  { name: "Data Science", level: 82, color: "#00D8FF" },
];

function SkillNode({ pos, name, color }: { pos: [number, number, number]; name: string; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.6;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.3;
    }
  });
  return (
    <Float speed={2} floatIntensity={1.2} rotationIntensity={0.6}>
      <group position={pos}>
        <mesh ref={ref}>
          <icosahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} metalness={0.7} roughness={0.2} />
        </mesh>
        <Html center distanceFactor={8}>
          <div className="pointer-events-none whitespace-nowrap rounded-md border border-white/20 bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white">
            {name}
          </div>
        </Html>
      </group>
    </Float>
  );
}

function SkillUniverse() {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 7], fov: 55 }}>
      <color attach="background" args={["#050816"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00F5FF" />
      <pointLight position={[-5, -5, 2]} intensity={1.2} color="#FF0080" />
      <Suspense fallback={null}>
        {skills.map((s, i) => {
          const phi = Math.acos(-1 + (2 * i) / skills.length);
          const theta = Math.sqrt(skills.length * Math.PI) * phi;
          const r = 3;
          const pos: [number, number, number] = [
            r * Math.cos(theta) * Math.sin(phi),
            r * Math.sin(theta) * Math.sin(phi),
            r * Math.cos(phi),
          ];
          return <SkillNode key={s.name} pos={pos} name={s.name} color={s.color} />;
        })}
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Skills" title="A 3D Universe of Tech" subtitle="Drag the orb. Each node is a tool I use to ship real products." />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="glass relative h-[480px] overflow-hidden rounded-3xl">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <SkillUniverse />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass rounded-xl p-4"
              >
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{s.name}</span>
                  <span className="font-mono text-white/60">{s.level}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 + i * 0.04 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${s.color}, #8B5CF6)` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
