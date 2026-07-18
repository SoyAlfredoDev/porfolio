"use client";

import { useEffect, useId, useRef } from "react";
import {
  claimAnimationSlot,
  releaseAnimationSlot,
} from "@/lib/animation";
import { useInViewPause } from "../hooks/useInViewPause";
import { cappedDpr } from "../utils/raf";

type Props = { className?: string; enabled?: boolean };

/** Soft CSS+canvas aurora — modern ambient (not stacked with ParticleField). */
export function AuroraBackground({ className, enabled = true }: Props) {
  const ownerId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInViewPause(wrapRef);
  const claimed = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    claimed.current = claimAnimationSlot("ambient", ownerId);
    return () => {
      releaseAnimationSlot("ambient", ownerId);
      claimed.current = false;
    };
  }, [enabled, ownerId]);

  useEffect(() => {
    if (!enabled || !claimed.current) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = cappedDpr(1.5);
      const { width, height } = wrap.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!inView) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const { width, height } = wrap.getBoundingClientRect();
      t += 0.008;
      ctx.clearRect(0, 0, width, height);

      const bands = [
        { y: 0.25, c: "rgba(1, 198, 118, 0.18)" },
        { y: 0.45, c: "rgba(14, 165, 233, 0.12)" },
        { y: 0.65, c: "rgba(52, 211, 153, 0.1)" },
      ];

      for (const band of bands) {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, band.c);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        const wave = Math.sin(t + band.y * 8) * 24;
        ctx.beginPath();
        ctx.ellipse(
          width * 0.5 + wave,
          height * band.y,
          width * 0.55,
          height * 0.18,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
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
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
