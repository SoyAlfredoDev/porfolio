"use client";

import dynamic from "next/dynamic";

const ParticleField = dynamic(
  () => import("./ParticleField").then((m) => m.ParticleField),
  { ssr: false },
);

type Props = { enabled?: boolean; className?: string };

/** Low-opacity energy sparks for Play — does not steal focus from WordGame. */
export function EnergyParticles({ enabled = true, className }: Props) {
  return (
    <div
      className={className}
      aria-hidden
      style={{ opacity: 0.45, position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <ParticleField enabled={enabled} preset="energy" />
    </div>
  );
}
