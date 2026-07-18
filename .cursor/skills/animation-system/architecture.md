# Animation system architecture

## Goals

- Apple / Vercel / Linear feel: few effects, high craft, ~60 FPS when possible.
- Multipage website (Home lobby, Portfolio, Play, Contact) — not a single landing scroll circus.
- Ready for `modern` | `retro` | `christmas` without rewriting call sites.
- Lighthouse-friendly: degrade on mobile, Save-Data, low memory, `prefers-reduced-motion`.

## Layers

1. **Capability** (`lib/animation/capability.ts`)  
   Derives `motionLevel`, `canHeavyFx`, `can3D` from reduced-motion, viewport, network, hardware.

2. **Budget** (`lib/animation/budget.ts`)  
   Soft singleton slots: `ambient` | `scene3d`. Claim/release by owner id.

3. **Style** (`VisualStyleContext`)  
   Brand mode. Affects reveal presets and ambient tint. Full theme packs later.

4. **Motion context** (`MotionProvider`)  
   Merges capability + style → `duration`, `reveal`, `stagger`, flags.

5. **Primitives** (`components/animation/*`)  
   Only place most features should import from.

## Integration map (current)

| File | Integration |
|------|-------------|
| `layout.tsx` | VisualStyleProvider → MotionProvider → VisualStyleSync |
| `Hero.tsx` | AmbientField + Reveal |
| `About.tsx` | Reveal inView |
| `LobbyExplore.tsx` | Reveal + Stagger |
| `Contact.tsx` | Reveal header |
| `PortfolioWorks.tsx` | Own interactive motion (filters); no AmbientField |

## Future styles

- `modern`: CSS ambient, soft reveals (default).
- `retro`: snappier stagger; optional CRT/scanline CSS (not WebGL by default).
- `christmas`: warmer ambient tint; keep particles optional and gated.

## Performance checklist

- [ ] No new continuous `requestAnimationFrame` without pause-offscreen.
- [ ] No Three/R3F in the critical path.
- [ ] iframes in PortfolioWorks already `pointer-events: none` — don't animate them.
- [ ] Prefer `transform` / `opacity` only in presets.
