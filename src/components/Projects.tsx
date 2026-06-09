import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type MouseEvent, useRef } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { SectionHeading } from "./SectionHeading";

type Project = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  accent: string;
  liveUrl?: string;
  githubUrl?: string;
};

const projects: Project[] = [
  {
    name: "ScanKart",
    tagline: "Smart QR Shopping Platform",
    description: "Scan products via QR, build a smart cart, pay through Razorpay, and download digital invoices instantly.",
    features: ["QR Scanning", "Smart Cart", "Firebase Backend", "Razorpay", "Analytics", "Invoice Generator"],
    tech: ["React", "TypeScript", "Firebase", "Firestore", "Razorpay"],
    accent: "#00F5FF",
    liveUrl: "https://scankart-5ob2.onrender.com",
  },
  {
    name: "RoomDekho",
    tagline: "Room Rental Platform",
    description: "Discover nearby rooms and properties with owner dashboards, real-time data, and integrated maps.",
    features: ["Property Listings", "Owner Dashboard", "Google Maps", "Inquiry System", "Auth", "Realtime Data"],
    tech: ["React", "Firebase", "Firestore", "Google Maps API"],
    accent: "#8B5CF6",
  },
  {
    name: "Fitness Trainer",
    tagline: "AI Fitness Tracking Platform",
    description: "Personalized workouts, BMI calculator, goal tracking and progress dashboards powered by smart recommendations.",
    features: ["Goal Tracking", "BMI Calculator", "Progress Monitoring", "Personalized Plans", "Dashboard"],
    tech: ["React", "Firebase", "TypeScript"],
    accent: "#00FF88",
  },
  {
    name: "Personal Finance Tracker",
    tagline: "Full-Stack Budget & Expense Manager",
    description: "Track expenses, monitor income, and manage budgets through a clean and responsive interface powered by Supabase.",
    features: ["Expense Tracking", "Income Monitoring", "Budget Management", "Supabase Backend", "Responsive UI", "Real-time Sync"],
    tech: ["React", "Vite", "Supabase", "TypeScript", "Tailwind CSS"],
    accent: "#F59E0B",
    liveUrl: "https://financetrackerapk.netlify.app/login",
    githubUrl: "https://github.com/mohitkumarsah/Personal-finance-tracker.git",
  },
  {
    name: "IPL Win Analysis",
    tagline: "Machine Learning Prediction System",
    description: "Predict IPL match winners from historical data, visualize probabilities and explore performance insights.",
    features: ["Prediction Engine", "Data Visualization", "Performance Analysis", "Match Insights", "Probability"],
    tech: ["Python", "Scikit-Learn", "Pandas", "Streamlit"],
    accent: "#FF0080",
    liveUrl: "https://ipl-win-analysis-uvihg7vmi9zsbqrr2ruvl4.streamlit.app/",
    githubUrl: "https://github.com/mohitkumarsah/ipl-win-analysis.git",
  },
];

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
        className="group glass relative h-full overflow-hidden rounded-3xl p-7"
      >
        {/* glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(400px circle at var(--mx,50%) var(--my,50%), ${p.accent}30, transparent 60%)` }}
        />
        {/* animated border */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${p.accent}66, transparent 30%)`,
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
            opacity: 0.6,
          }}
        />

        <div className="relative" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest" style={{ color: p.accent }}>
                0{i + 1} / Featured
              </div>
              <h3 className="mt-2 font-display text-3xl font-bold">{p.name}</h3>
              <p className="text-sm text-white/60">{p.tagline}</p>
            </div>
            <div
              className="grid h-12 w-12 place-items-center rounded-xl border"
              style={{ borderColor: `${p.accent}55`, background: `${p.accent}10` }}
            >
              <span className="font-display text-lg font-bold" style={{ color: p.accent }}>
                {p.name[0]}
              </span>
            </div>
          </div>

          <p className="mt-4 text-white/75">{p.description}</p>

          <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-white/70">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span key={t} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/80">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex gap-3">
            <a
              href={p.liveUrl || "#"}
              target={p.liveUrl ? "_blank" : undefined}
              rel={p.liveUrl ? "noreferrer" : undefined}
              onClick={p.liveUrl ? undefined : (e) => e.preventDefault()}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-background transition hover:scale-[1.03]"
              style={{ background: `linear-gradient(135deg, ${p.accent}, #8B5CF6)` }}
            >
              <FiExternalLink /> Live Demo
            </a>
            <a
              href={p.githubUrl || "#"}
              target={p.githubUrl ? "_blank" : undefined}
              rel={p.githubUrl ? "noreferrer" : undefined}
              onClick={p.githubUrl ? undefined : (e) => e.preventDefault()}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
            >
              <FiGithub /> GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Projects" title="Selected Work" subtitle="Shipped products engineered with care — from QR commerce to ML-driven predictions." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
