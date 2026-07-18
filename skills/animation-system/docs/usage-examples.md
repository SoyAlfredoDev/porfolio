# Usage examples

Import from `@/skills/animation-system/...` (or the barrel `@/skills/animation-system`).

## Hooks

### `useMousePosition`

```tsx
const { x, y } = useMousePosition(true); // -1..1
```

### `useParallax`

```tsx
const { style } = useParallax(12);
return <div style={style} aria-hidden />;
```

### `useScrollProgress`

```tsx
const ref = useRef<HTMLElement>(null);
const p = useScrollProgress(ref); // 0..1
```

### `useMagneticEffect`

```tsx
const m = useMagneticEffect(0.3);
return <div ref={m.ref} style={m.style} {...m.handlers}>{children}</div>;
```

### `useParticleSystem`

```tsx
const cfg = useParticleSystem("stars");
// cfg.count / density / opacity / enabled
```

### `useInViewPause`

```tsx
const ref = useRef<HTMLDivElement>(null);
const inView = useInViewPause(ref);
// pause rAF when !inView
```

## Primitives

### `FadeIn` / `ScrollReveal` / `Stagger`

```tsx
<FadeIn delay={0.1}>…</FadeIn>
<ScrollReveal inView>…</ScrollReveal>
<Stagger inView className="grid gap-4">{items}</Stagger>
```

### `MagneticButton`

```tsx
<MagneticButton>
  <Link href="/es/contacto"><Button>Contact</Button></Link>
</MagneticButton>
```

### `HoverGlow` / `MouseParallax`

```tsx
<HoverGlow color="rgba(1,198,118,0.35)"><Card /></HoverGlow>
<MouseParallax factor={10}><div className="orb" /></MouseParallax>
```

## Effects (always prefer lazy)

```tsx
const Aurora = dynamic(
  () => import("@/skills/animation-system/effects/AuroraBackground")
    .then(m => m.AuroraBackground),
  { ssr: false },
);
```

| Component | Typical use |
|-----------|-------------|
| `AuroraBackground` | Home modern ambient |
| `ParticleField` | Home retro |
| `FireworksBackground` | Home christmas |
| `FloatingLeaves` | Snow (christmas) |
| `EnergyParticles` | Play background |
| `SpotlightEffect` | Hero / Contact CTAs |
| `WaterShader` | **Opt-in only** — not Home default |

```tsx
// WaterShader demo (single section, lazy)
const Water = dynamic(
  () => import("@/skills/animation-system/effects/WaterShader")
    .then(m => m.WaterShader),
  { ssr: false },
);
<section className="relative h-64"><Water enabled /></section>
```

## Three

```tsx
const HeroAtmosphere = dynamic(
  () => import("@/skills/animation-system/three/HeroAtmosphere")
    .then(m => m.HeroAtmosphere),
  { ssr: false },
);
// Orchestrates InteractiveHero + style ambient via activation map
```

## Providers

```tsx
// layout (inside MotionProvider)
<SmoothScrollProvider>{children}</SmoothScrollProvider>
```

## Style switcher

```tsx
import { StyleSwitcher } from "@/skills/animation-system/components/StyleSwitcher";
<StyleSwitcher />
```

## Activation helper

```tsx
import { getActiveEffects } from "@/skills/animation-system/utils/activation";
const effects = getActiveEffects("home", style, capability);
if (effects.has("aurora")) …;
```
