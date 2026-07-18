# Examples

## Section enter (preferred)

```tsx
import { Reveal } from "@/components/animation";

export function Section() {
  return (
    <Reveal inView className="max-w-3xl mx-auto">
      <h2>Title</h2>
      <p>Copy</p>
    </Reveal>
  );
}
```

## Staggered lobby cards

```tsx
import { Stagger } from "@/components/animation";

<Stagger inView className="grid md:grid-cols-3 gap-6">
  {items.map((item) => (
    <a key={item.id} href={item.href}>{item.label}</a>
  ))}
</Stagger>
```

## Home-only ambient

```tsx
import { AmbientField } from "@/components/animation";

<section className="relative overflow-hidden">
  <AmbientField enabled />
  {/* content */}
</section>
```

## Gate custom FX

```tsx
const { canHeavyFx, motionLevel } = useMotion();
if (motionLevel === "none") return <StaticVersion />;
if (!canHeavyFx) return <SimpleGradient />;
return <FancyButCheapFx />;
```

## Future R3F (do not enable yet)

```tsx
<SceneSlot
  enabled
  load={() => import("@/components/three/HeroOrb")}
  fallback={null}
/>
```

Requires flipping `can3D` in `lib/animation/capability.ts` and installing fiber/three.
