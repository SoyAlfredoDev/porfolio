import type { AnimationCapability, VisualStyle } from "@/lib/animation";

export type SiteView = "home" | "portfolio" | "play" | "contact";

export type EffectId =
  | "lenis"
  | "reveal"
  | "magnetic"
  | "hoverGlow"
  | "mouseParallax"
  | "interactiveHero"
  | "aurora"
  | "particleField"
  | "spotlight"
  | "fireworks"
  | "snow"
  | "energyParticles"
  | "waterShader";

/**
 * Single source of truth: which heavy/light effects may run per view × style.
 * Budget: at most one ambient particle/aurora/fireworks system + one 3D scene.
 */
export function getActiveEffects(
  view: SiteView,
  style: VisualStyle,
  cap: AnimationCapability,
): Set<EffectId> {
  const out = new Set<EffectId>();

  if (cap.motionLevel !== "none") {
    out.add("lenis");
    out.add("reveal");
  }

  if (cap.motionLevel === "full" && !cap.isMobile) {
    out.add("magnetic");
    out.add("hoverGlow");
  } else if (cap.motionLevel === "reduced") {
    out.add("hoverGlow");
  }

  // Christmas owns ambient across all views.
  // No interactiveHero: the 3D orb paints a large blob over the festive hero.
  if (style === "christmas") {
    if (cap.motionLevel === "none") {
      return out;
    }

    out.add("snow");

    if (view === "home" && cap.canHeavyFx && !cap.isMobile) {
      out.add("fireworks");
    }

    return out;
  }

  // Retro owns arcade ambient — ParticleField on Home only; SVG decor is separate.
  // No interactiveHero: the 3D orb fights the platformer scene and covers content.
  if (style === "retro") {
    if (cap.motionLevel === "none") {
      return out;
    }

    if (view === "home" && cap.canHeavyFx && !cap.isMobile) {
      out.add("particleField");
    }

    return out;
  }

  // Modern: soft site CSS lives in ModernLayer; Hero keeps aurora / 3D
  if (style === "modern") {
    if (cap.motionLevel === "none") {
      return out;
    }

    if (view === "home" && cap.canHeavyFx) {
      out.add("aurora");
      out.add("spotlight");
      if (cap.can3D && !cap.isMobile) out.add("interactiveHero");
      if (!cap.isMobile) out.add("mouseParallax");
    }

    if (view === "play" && cap.canHeavyFx) {
      out.add("energyParticles");
    }

    if (view === "contact" && cap.motionLevel === "full" && !cap.isMobile) {
      out.add("magnetic");
      out.add("spotlight");
    }

    return out;
  }

  return out;
}

export function effectEnabled(
  effects: Set<EffectId>,
  id: EffectId,
): boolean {
  return effects.has(id);
}
