import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = ["home", "about", "skills", "projects", "achievements", "education", "contact"];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="fixed left-1/2 top-5 z-50 -translate-x-1/2 px-4 w-[min(1100px,calc(100%-1.5rem))]"
    >
      <div className="glass flex items-center justify-between rounded-full px-5 py-3">
        <button onClick={() => go("home")} className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-[#00F5FF] to-[#8B5CF6] font-display text-sm font-bold text-background">
            M
          </span>
          <span className="font-display font-semibold tracking-wide">MOHIT<span className="text-[#00F5FF]">.</span></span>
        </button>

        <ul className="hidden gap-1 md:flex">
          {sections.map((s) => (
            <li key={s}>
              <button
                onClick={() => go(s)}
                className="relative rounded-full px-3 py-1.5 text-sm capitalize text-white/70 transition hover:text-white"
              >
                {active === s && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-[#00F5FF]/60"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{s}</span>
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => go("contact")}
          className="hidden md:inline-flex rounded-full bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] px-4 py-1.5 text-sm font-medium text-background hover:opacity-90"
        >
          Hire Me
        </button>

        <button onClick={() => setOpen((o) => !o)} className="md:hidden text-white/80" aria-label="Menu">
          <div className="space-y-1.5">
            <span className="block h-[2px] w-6 bg-current" />
            <span className="block h-[2px] w-6 bg-current" />
          </div>
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mt-2 rounded-2xl p-3 md:hidden"
        >
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => go(s)}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm capitalize hover:bg-white/5"
            >
              {s}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
