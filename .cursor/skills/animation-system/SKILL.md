---
name: animation-system
description: >-
  Performance-first motion system for this multipage Next.js portfolio
  (skills/animation-system: hooks, primitives, effects, R3F Hero, Lenis,
  style modern/retro/christmas). Use when adding or changing animations,
  backgrounds, 3D, particles, or smooth scroll.
---

# Animation System

Canonical code: `skills/animation-system/`.

## Rules

- Quality > quantity. Max 1 ambient + 1 3D scene.
- Use `getActiveEffects(view, style, capability)` before mounting heavy FX.
- Lazy: `next/dynamic` + `{ ssr: false }`.
- Respect `useMotion()` / reduced-motion.
- Do **not** mount `WaterShader` on Home by default.
- Keep `framer-motion` (already installed); don’t add GSAP unless a complex timeline needs it.

## Docs

- [README](../../../skills/animation-system/README.md)
- [usage-examples](../../../skills/animation-system/docs/usage-examples.md)
