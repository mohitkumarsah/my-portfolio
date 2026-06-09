import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    document.body.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hover = t.closest("a, button, [data-cursor='hover']");
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.current.x - 22}px, ${pos.current.y - 22}px, 0) scale(${hover ? 1.6 : 1})`;
        ring.current.style.borderColor = hover ? "rgba(255,0,128,0.9)" : "rgba(0,245,255,0.8)";
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (ring.current) {
        const t = ring.current.style.transform.match(/scale\(([\d.]+)\)/);
        const scale = t ? t[1] : "1";
        ring.current.style.transform = `translate3d(${pos.current.x - 22}px, ${pos.current.y - 22}px, 0) scale(${scale})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[#00F5FF] mix-blend-difference"
        style={{ boxShadow: "0 0 12px #00F5FF" }}
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-11 w-11 rounded-full border-2 transition-[border-color] duration-200"
        style={{ borderColor: "rgba(0,245,255,0.8)" }}
      />
    </>
  );
}
