import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const timeline = [
  { school: "High School Samardah, Siwan", title: "Class 10", detail: "2019 to 2020", color: "#00F5FF" },
  { school: "High School cum Inter College Samardah, Siwan, Bihar", title: "Class 12", detail: "2020 to 2022", color: "#FF0080" },
  { school: "Government Engineering College, Gopalganj", title: "B.Tech CSE", detail: "2022 to 2026", color: "#8B5CF6" },
];

export function Education() {
  return (
    <section id="education" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading kicker="Education" title="Academic Timeline" />
        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-2 top-2 h-[calc(100%-1rem)] w-[2px] bg-gradient-to-b from-[#00F5FF] via-[#8B5CF6] to-[#FF0080] md:left-4" />
          {timeline.map((t, i) => (
            <motion.div
              key={t.school}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative mb-8 last:mb-0"
            >
              <span
                className="absolute -left-[26px] top-3 grid h-4 w-4 place-items-center rounded-full md:-left-[34px]"
                style={{ background: t.color, boxShadow: `0 0 20px ${t.color}` }}
              />
              <div className="glass rounded-2xl p-6">
                <div className="font-mono text-xs uppercase tracking-widest" style={{ color: t.color }}>{t.title}</div>
                <div className="mt-1 font-display text-xl font-bold">{t.school}</div>
                <div className="mt-1 text-sm text-white/70">{t.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
