"use client";

import { useEffect, useRef } from "react";
import { useInViewPause } from "../hooks/useInViewPause";
import { cappedDpr } from "../utils/raf";

type Props = {
  enabled?: boolean;
  className?: string;
};

/**
 * Decorative water-like canvas shader.
 * NOT mounted on Home by default — opt-in for a future single section only.
 * Always lazy-load from the consumer: next/dynamic + ssr:false.
 */
export function WaterShader({ enabled = true, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInViewPause(wrapRef);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;

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
        t += 0.02;
        ctx.clearRect(0, 0, width, height);
        const g = ctx.createLinearGradient(0, 0, 0, height);
        g.addColorStop(0, "rgba(2, 31, 65, 0.15)");
        g.addColorStop(1, "rgba(1, 198, 118, 0.12)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "rgba(1, 198, 118, 0.25)";
        ctx.lineWidth = 1.25;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          for (let x = 0; x <= width; x += 8) {
            const y =
              height * (0.35 + i * 0.1) +
              Math.sin(x * 0.015 + t + i) * 10 +
              Math.cos(x * 0.008 + t * 0.7) * 6;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
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
  }, [enabled, inView]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      className={className}
      aria-hidden
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
