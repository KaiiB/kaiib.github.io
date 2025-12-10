import { useEffect, useRef } from "react";
export const NebulaFog = () => {

  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      // Parallax scaling based on scroll depth
      if (layer1.current) {
        layer1.current.style.transform = `translateY(${y * 0.03}px)`;
      }
      if (layer2.current) {
        layer2.current.style.transform = `translateY(${y * 0.015}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* NEBULA LAYER 1 — large soft fog */}
      <div
        ref={layer1}
        className="absolute inset-0 animate-nebula-drift opacity-40"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, rgba(120, 80, 200, 0.35), transparent 70%),
            radial-gradient(circle at 20% 10%, rgba(60, 160, 255, 0.25), transparent 35%)
          `,
          filter: "blur(120px)",
        }}
      />

      {/* NEBULA LAYER 2 — more colorful accents */}
      <div
        ref={layer2}
        className="absolute inset-0 animate-nebula-drift-slow opacity-30"
        style={{
          background: `
            radial-gradient(circle at 70% 20%, rgba(240, 80, 200, 0.35), transparent 60%),
            radial-gradient(circle at 30% 80%, rgba(18, 83, 175, 0.25), transparent 60%)
          `,
          filter: "blur(150px)",
        }}
      />
    </div>
  );
};
