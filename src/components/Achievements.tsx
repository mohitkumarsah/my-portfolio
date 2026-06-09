import { motion } from "framer-motion";
import { FiAward, FiCode, FiLayers, FiTarget } from "react-icons/fi";
import { SectionHeading } from "./SectionHeading";

const items = [
  { icon: FiCode,   title: "150+ DSA Problems Solved", sub: "Across LeetCode, GFG and more", color: "#00F5FF" },
  { icon: FiAward,  title: "Industry-Relevant Achievements – RoomDekho",          sub: "2.5k real user & 35 cities ",   color: "#FF0080" },
  { icon: FiLayers, title: "10+ Projects Built",       sub: "Full-stack, AI and ML systems", color: "#8B5CF6" },
  { icon: FiTarget, title: "Strong Problem Solving",   sub: "Algorithms · DS · Systems",     color: "#00FF88" },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Achievements" title="Milestones & Wins" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-30 transition group-hover:opacity-60" style={{ background: it.color }} />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-xl border" style={{ borderColor: `${it.color}66`, background: `${it.color}1a` }}>
                  <it.icon size={22} style={{ color: it.color }} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold leading-snug">{it.title}</h3>
                <p className="mt-1 text-sm text-white/60">{it.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
