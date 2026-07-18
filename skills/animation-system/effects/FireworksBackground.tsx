"use client";

import { useEffect, useId, useRef } from "react";
import {
  claimAnimationSlot,
  releaseAnimationSlot,
} from "@/lib/animation";
import { useInViewPause } from "../hooks/useInViewPause";
import { cappedDpr } from "../utils/raf";

type Props = { enabled?: boolean; className?: string };

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
};

/** Low-count canvas fireworks — no GSAP. Christmas ambient only. */
export function FireworksBackground({ enabled = true, className }: Props) {
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
    const sparks: Spark[] = [];
    const colors = ["#C41E3A", "#D4AF37", "#2E8B57", "#F4EFE6"];
    let burstTimer = 0;

    const resize = () => {
      const dpr = cappedDpr(1.25);
      const { width, height } = wrap.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const burst = (w: number, h: number) => {
      const cx = w * (0.2 + Math.random() * 0.6);
      const cy = h * (0.15 + Math.random() * 0.35);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const n = 18;
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n;
        const speed = 1.2 + Math.random() * 1.8;
        sparks.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          life: 1,
          color,
        });
      }
    };

    const draw = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (inView) {
        burstTimer++;
        if (burstTimer > 90) {
          burstTimer = 0;
          if (sparks.length < 80) burst(width, height);
        }
        ctx.clearRect(0, 0, width, height);
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.02;
          s.life -= 0.016;
          if (s.life <= 0) {
            sparks.splice(i, 1);
            continue;
          }
          ctx.globalAlpha = s.life * 0.7;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      sparks.length = 0;
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
