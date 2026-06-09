import { motion } from "framer-motion";

export function SectionHeading({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-14 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="font-mono text-xs uppercase tracking-[0.4em] text-[#00F5FF]"
      >
        // {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.1 }}
        className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-white/60">{subtitle}</p>
      )}
    </div>
  );
}
