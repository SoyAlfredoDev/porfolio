"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import {
  claimAnimationSlot,
  releaseAnimationSlot,
} from "@/lib/animation";
import { useParticleSystem } from "../hooks/useParticleSystem";
import { useInViewPause } from "../hooks/useInViewPause";
import { useMotion } from "@/context/MotionProvider";

type Props = {
  enabled?: boolean;
  preset?: "stars" | "energy";
  className?: string;
};

export function ParticleField({
  enabled = true,
  preset = "stars",
  className,
}: Props) {
  const ownerId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInViewPause(wrapRef);
  const { style } = useMotion();
  const config = useParticleSystem(preset === "energy" ? "energy" : "stars");
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    if (!enabled || !config.enabled) return;
    const ok = claimAnimationSlot("ambient", ownerId);
    setClaimed(ok);
    return () => {
      releaseAnimationSlot("ambient", ownerId);
      setClaimed(false);
    };
  }, [enabled, config.enabled, ownerId]);

  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 45,
      detectRetina: true,
      particles: {
        number: { value: config.count },
        color: {
          value:
            style === "retro"
              ? ["#86efac", "#fde047", "#f0abfc"]
              : ["#01c676", "#34d399", "#e2e8f0"],
        },
        opacity: { value: { min: 0.15, max: config.opacity } },
        size: { value: { min: 0.6, max: style === "retro" ? 2.2 : 1.6 } },
        move: {
          enable: true,
          speed: style === "retro" ? 0.35 : 0.25,
          outModes: { default: "out" as const },
        },
        links:
          style === "retro"
            ? {
                enable: true,
                distance: 90,
                opacity: 0.08,
                color: "#01c676",
              }
            : { enable: false },
      },
      interactivity: { events: { onHover: { enable: false } } },
    }),
    [config.count, config.opacity, style],
  );

  if (!enabled || !config.enabled || !claimed) return null;

  const particleId = `particles-${ownerId.replace(/:/g, "")}`;

  return (
    <div
      ref={wrapRef}
      className={className}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: inView ? 1 : 0,
        transition: "opacity 0.3s",
      }}
    >
      {inView && (
        <ParticlesProvider init={init}>
          <Particles
            id={particleId}
            options={options}
            className="h-full w-full"
          />
        </ParticlesProvider>
      )}
      {style === "retro" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.35) 3px)",
          }}
        />
      )}
    </div>
  );
}
