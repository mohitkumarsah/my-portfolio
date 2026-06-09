import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

function Heat({ accent }: { accent: string }) {
  const cells = Array.from({ length: 7 * 24 });
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1">
      {cells.map((_, i) => {
        const v = Math.random();
        return (
          <span
            key={i}
            className="h-3 w-3 rounded-sm"
            style={{ background: `rgba(${accent}, ${0.08 + v * 0.6})` }}
          />
        );
      })}
    </div>
  );
}

export function CodeStats() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-7"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiGithub size={22} className="text-[#00F5FF]" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/50">GitHub</div>
                  <div className="font-display text-xl font-bold">@mohitkumarsah</div>
                </div>
              </div>
              <a href="https://github.com/mohitkumarsah" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-3 py-1 text-xs hover:bg-white/5">
                Visit
              </a>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[["20+","Repos"],["120+","Stars"],["500+","Commits"]].map(([v,l]) => (
                <div key={l} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="font-display text-2xl font-bold text-gradient-cyber">{v}</div>
                  <div className="text-[11px] uppercase tracking-wider text-white/60">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-x-auto">
              <Heat accent="0,245,255" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-7"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SiLeetcode size={22} className="text-[#FF0080]" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/50">LeetCode</div>
                  <div className="font-display text-xl font-bold">Daily Grinder</div>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[["150+","Solved"],["1600","Rating"],["35+","Contests"]].map(([v,l]) => (
                <div key={l} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="font-display text-2xl font-bold text-gradient-cyber">{v}</div>
                  <div className="text-[11px] uppercase tracking-wider text-white/60">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-x-auto">
              <Heat accent="255,0,128" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
