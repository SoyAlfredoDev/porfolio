"use client";

import { useEffect, useMemo, useRef } from "react";
import { useInViewPause } from "../hooks/useInViewPause";
import { useParticleSystem } from "../hooks/useParticleSystem";
import { cappedDpr } from "../utils/raf";

type Props = {
  enabled?: boolean;
  mode?: "snow" | "leaves";
  className?: string;
  /** full = Home density; light = other views / mobile-friendly */
  intensity?: "full" | "light";
};

/** Lightweight falling flakes (snow) or leaves — canvas, low count. */
export function FloatingLeaves({
  enabled = true,
  mode = "snow",
  className,
  intensity = "full",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInViewPause(wrapRef);
  const config = useParticleSystem(mode === "snow" ? "snow" : "aurora-dust");

  const flakes = useMemo(() => {
    if (!config.enabled) return [];
    const count =
      intensity === "light"
        ? Math.max(10, Math.round(config.count * 0.45))
        : config.count;
    return Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1 + Math.random() * 2.2,
      speed: 0.15 + Math.random() * 0.35,
      drift: (Math.random() - 0.5) * 0.25,
    }));
  }, [config.count, config.enabled, intensity]);

  useEffect(() => {
    if (!enabled || !config.enabled) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const local = flakes.map((f) => ({ ...f }));

    const resize = () => {
      const dpr = cappedDpr(1.25);
      const { width, height } = wrap.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (inView) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle =
          mode === "snow"
            ? "rgba(244,239,230,0.7)"
            : "rgba(1,198,118,0.35)";
        for (const f of local) {
          f.y += f.speed * 0.004;
          f.x += f.drift * 0.004;
          if (f.y > 1) f.y = -0.05;
          if (f.x < 0) f.x = 1;
          if (f.x > 1) f.x = 0;
          ctx.beginPath();
          ctx.arc(f.x * width, f.y * height, f.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [enabled, config.enabled, flakes, inView, mode]);

  if (!enabled || !config.enabled) return null;

  return (
    <div
      ref={wrapRef}
      className={className}
      aria-hidden
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
