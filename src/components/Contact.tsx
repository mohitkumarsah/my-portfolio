import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { FiMail, FiPhone, FiSend, FiCheckCircle } from "react-icons/fi";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio inquiry from ${fd.get("name")}`);
    const body = encodeURIComponent(`From: ${fd.get("name")} <${fd.get("email")}>\n\n${fd.get("message")}`);
    setTimeout(() => {
      window.location.href = `mailto:mks994758@gmail.com?subject=${subject}&body=${body}`;
      setLoading(false);
      setSent(true);
    }, 900);
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading kicker="Contact" title="Let's Build Something" subtitle="Available for full-time roles, freelance projects and collaborations." />

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass relative overflow-hidden rounded-3xl p-8"
        >
          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#00F5FF]/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#FF0080]/20 blur-3xl" />

          <div className="relative grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-white/60">Name</span>
              <input required name="name" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none transition focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/30" placeholder="Your name" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-white/60">Email</span>
              <input required type="email" name="email" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none transition focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/30" placeholder="you@domain.com" />
            </label>
            <label className="block md:col-span-2">
              <span className="text-xs uppercase tracking-widest text-white/60">Message</span>
              <textarea required name="message" rows={5} className="mt-2 w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none transition focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/30" placeholder="Tell me about your project..." />
            </label>
          </div>

          <div className="relative mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <a href="mailto:mks994758@gmail.com" className="inline-flex items-center gap-2 hover:text-white transition">
                <FiMail /> mks994758@gmail.com
              </a>
              <a href="tel:+919162471191" className="inline-flex items-center gap-2 hover:text-white transition">
                <FiPhone /> +91 91624 71191
              </a>
            </div>
            <button
              type="submit"
              disabled={loading || sent}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] px-6 py-3 font-medium text-background transition hover:scale-[1.03] disabled:opacity-70"
            >
              {sent ? (<><FiCheckCircle /> Sent</>) : loading ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" /> Sending…</>) : (<><FiSend className="transition group-hover:translate-x-0.5" /> Send Message</>)}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
