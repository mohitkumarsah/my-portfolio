import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HeroScene } from "./HeroScene";
import { FiDownload, FiArrowRight, FiMail } from "react-icons/fi";

const roles = ["Full Stack Developer", "AI Enthusiast", "Software Engineer"];

function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = roles[i % roles.length];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1300);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI(i + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="text-gradient-cyber">
      {text}<span className="ml-0.5 inline-block h-7 w-[3px] translate-y-1 bg-[#00F5FF] animate-pulse" />
    </span>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/80">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00FF88]" />
            Available for opportunities
          </div>

          <p className="font-mono text-sm text-[#00F5FF]">{"> Hello, I'm"}</p>
          <h1 className="mt-2 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            MOHIT <span className="text-gradient-cyber">KUMAR</span>
          </h1>
          <h2 className="mt-4 font-display text-2xl font-medium md:text-4xl">
            <Typewriter />
          </h2>
          <p className="mt-6 max-w-xl text-base text-white/70 md:text-lg">
            Crafting scalable web applications, AI-powered solutions, and cinematic interfaces — engineered with obsessive attention to performance and detail.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] px-6 py-3 font-medium text-background transition hover:scale-[1.03]"
            >
              View Projects <FiArrowRight className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium hover:bg-white/10"
            >
              <FiDownload /> Download Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 rounded-full border border-[#FF0080]/60 px-6 py-3 font-medium text-[#FF0080] hover:bg-[#FF0080]/10"
            >
              <FiMail /> Hire Me
            </a>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-white/50"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-[#00F5FF] to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
