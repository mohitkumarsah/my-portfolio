import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [
  "Initializing Portfolio...",
  "Loading Projects...",
  "Loading 3D Assets...",
  "Welcome.",
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = 3200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      setProgress(p);
      setStep(Math.min(steps.length - 1, Math.floor(p * steps.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setShow(false);
          setTimeout(onDone, 700);
        }, 500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* grid bg */}
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,255,0.18),transparent_60%)]" />

          {/* rings */}
          <motion.div
            className="absolute h-[520px] w-[520px] rounded-full border border-[#00F5FF]/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute h-[360px] w-[360px] rounded-full border border-[#8B5CF6]/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-10">
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.25em" }}
              transition={{ duration: 1.2 }}
              className="font-display text-4xl md:text-6xl font-bold text-gradient-cyber"
            >
              MOHIT KUMAR
            </motion.h1>

            <div className="w-[280px] md:w-[420px]">
              <div className="h-[2px] w-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00F5FF] via-[#8B5CF6] to-[#FF0080]"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-white/60">
                <span>{Math.round(progress * 100)}%</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={step}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-[#00F5FF]"
                  >
                    {steps[step]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
