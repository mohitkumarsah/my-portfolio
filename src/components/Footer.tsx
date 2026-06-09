import { FiArrowUp, FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-12">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-[#00F5FF] to-[#8B5CF6] font-display text-sm font-bold text-background">M</span>
          <div>
            <div className="font-display font-semibold">MOHIT KUMAR</div>
            <div className="text-xs text-white/50">© {new Date().getFullYear()} · Crafted with obsession.</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {[
            { href: "https://github.com/mohitkumarsah", Icon: FiGithub, color: "#00F5FF" },
            { href: "#", Icon: FiLinkedin, color: "#8B5CF6" },
            { href: "mailto:mks994758@gmail.com", Icon: FiMail, color: "#FF0080" },
            { href: "tel:+919162471191", Icon: FiPhone, color: "#22C55E" },
          ].map(({ href, Icon, color }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:scale-110"
              style={{ color }}
            >
              <Icon />
            </a>
          ))}

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-2 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#00F5FF] to-[#8B5CF6] text-background transition hover:scale-110"
            aria-label="Back to top"
          >
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
