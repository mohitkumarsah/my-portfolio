import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "./SectionHeading";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const stats = [
  { value: 150, suffix: "+", label: "DSA Problems Solved" },
  { value: 10, suffix: "+", label: "Projects Completed" },
  { value: 1000, suffix: "+", label: "Coding Hours" },
  { value: 5, suffix: "+", label: "Major Technologies" },
];

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="About" title="The Developer Behind the Pixels" />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
            style={{ perspective: 1200 }}
          >
            <div className="group glass relative overflow-hidden rounded-3xl p-8 transition-transform duration-500 hover:[transform:rotateY(-6deg)_rotateX(4deg)]">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#00F5FF]/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#8B5CF6]/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#00F5FF] to-[#8B5CF6] font-display text-2xl font-bold text-background">
                    M
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold">Mohit Kumar</div>
                    <div className="text-sm text-white/60">Full Stack Developer · AI Enthusiast</div>
                  </div>
                </div>

                <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-white/50">Education</dt>
                    <dd className="mt-1">B.Tech Computer Science</dd>
                  </div>
                  <div>
                    <dt className="text-white/50">Specialization </dt>
                    <dd className="mt-1 text-[#00FF88]">Cyber Security & Ethical Hacking</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-white/50">College</dt>
                    <dd className="mt-1">Government Engineering College, Gopalganj</dd>
                  </div>
                </dl>

                <p className="mt-6 leading-relaxed text-white/75">
                  Passionate Full Stack Developer focused on building scalable web applications, AI-powered solutions, and modern user experiences that blend engineering rigor with cinematic craft.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass relative overflow-hidden rounded-2xl p-6"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent opacity-60" />
                <div className="font-display text-4xl font-bold text-gradient-cyber md:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm uppercase tracking-wider text-white/60">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
