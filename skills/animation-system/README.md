# Animation system (performance-first)

Reusable motion stack for this multipage Next.js portfolio.  
**Quality > quantity.** Never stack every effect on every page.

## Technical decisions

| Choice | Why |
|--------|-----|
| Keep `framer-motion` | Already in the app; same Motion API family. Migrating all imports to `motion/react` adds churn without gain. |
| R3F + drei **Hero only** | One WebGL scene max; lazy via `next/dynamic` + `ssr: false`. |
| Lenis | Smooth scroll globally; destroyed when `prefers-reduced-motion` / `motionLevel === "none"`. |
| `@tsparticles/slim` | One particle system at a time (budget slot `ambient`). |
| No GSAP default | Fireworks use a tiny canvas loop; GSAP only if a complex timeline appears later. |
| `WaterShader` not on Home | Implemented + documented; opt-in for a future single lazy section. |

## Why effects don’t all run together

1. **Budget slots** (`lib/animation/budget.ts`): `ambient` XOR one particle/aurora/fireworks; `scene3d` for one R3F scene.
2. **Activation map** (`utils/activation.ts`): view × style × capability.
3. **Capability** (`lib/animation/capability.ts`): reduced-motion, Save-Data, tier, WebGL, mobile.

If an effect doesn’t add hierarchy or brand, it stays off.

## Folder map

```
skills/animation-system/
  hooks/           useMousePosition, useParallax, useScrollProgress,
                   useMagneticEffect, useParticleSystem, useInViewPause
  primitives/      FadeIn, ScrollReveal, Stagger, MagneticButton,
                   HoverGlow, MouseParallax
  effects/         Aurora, ParticleField, Fireworks, FloatingLeaves,
                   EnergyParticles, Spotlight, WaterShader
  three/           InteractiveHero, HeroAtmosphere
  providers/       SmoothScrollProvider (Lenis)
  utils/           activation, raf
  components/      StyleSwitcher
  docs/            usage-examples.md
```

Also wired: `context/MotionProvider`, `context/VisualStyleContext` (`data-style` on `<html>`).

## Vista × estilo × efectos

| Vista | modern | retro | christmas |
|-------|--------|-------|-----------|
| **Global** | Lenis*, Reveal/Stagger, Magnetic/HoverGlow* | same | same |
| **Home** | InteractiveHero* + **Aurora** + Spotlight + MouseParallax decor | **ParticleField** (stars/scanlines); Hero 3D only if high-tier | **Fireworks** + **Snow**; Hero 3D off on typical mobile |
| **Portafolio** | ScrollReveal/Stagger + HoverGlow/lift — **no** FX heavy | same | same |
| **Juega** | EnergyParticles (low opacity)* | same | same |
| **Contacto** | Magnetic submit + subtle Spotlight — no 3D/dense particles | same | same |

\* gated by capability. Fallback Home: Motion `Reveal` + static orbs only.

`WaterShader`: **never** auto-activated.

## Style system

- `VisualStyleProvider` + Navbar `StyleSwitcher`
- Default `modern`; persisted `localStorage`
- `document.documentElement.dataset.style`
- Light/dark remains `next-themes`

## How to add a new effect

1. Create component under `effects/` (or `three/`).
2. Use `next/dynamic` + `{ ssr: false }` from the page.
3. Pause with `useInViewPause`; cap DPR with `cappedDpr()`; `aria-hidden`.
4. Claim `ambient` or `scene3d` via budget helpers if heavy.
5. Register in `utils/activation.ts` for the right view/style.
6. Document in `docs/usage-examples.md`.

## Usage examples

See [docs/usage-examples.md](docs/usage-examples.md).
