import type { AnimationCapability, DeviceTier, MotionLevel } from "./types";
import { hasWebGL } from "@/skills/animation-system/utils/raf";

function readDeviceTier(): DeviceTier {
  if (typeof navigator === "undefined") return "medium";

  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (connection?.saveData) return "low";
  if (
    connection?.effectiveType === "2g" ||
    connection?.effectiveType === "slow-2g"
  ) {
    return "low";
  }
  if (memory <= 2 || cores <= 2) return "low";
  if (memory >= 8 && cores >= 6) return "high";
  return "medium";
}

/**
 * Client-only capability snapshot. Call after mount (or from MotionProvider).
 * SSR-safe default: medium tier, reduced until hydrated if unknown.
 */
export function detectCapability(
  reducedMotion: boolean | null,
): AnimationCapability {
  const isMobile =
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false;

  const saveData =
    typeof navigator !== "undefined"
      ? Boolean(
          (
            navigator as Navigator & {
              connection?: { saveData?: boolean };
            }
          ).connection?.saveData,
        )
      : false;

  const prefersReduced = Boolean(reducedMotion);
  const deviceTier = readDeviceTier();

  let motionLevel: MotionLevel = "full";
  if (prefersReduced) motionLevel = "none";
  else if (deviceTier === "low" || saveData) motionLevel = "reduced";
  else if (isMobile && deviceTier === "medium") motionLevel = "reduced";

  const canHeavyFx =
    motionLevel === "full" && deviceTier !== "low" && !saveData;

  // Hero R3F: desktop (or high-tier tablet) with WebGL; never on low / reduced.
  const can3D =
    motionLevel === "full" &&
    deviceTier !== "low" &&
    !saveData &&
    hasWebGL() &&
    (!isMobile || deviceTier === "high");

  return {
    motionLevel,
    deviceTier,
    reducedMotion: prefersReduced,
    isMobile,
    saveData,
    canHeavyFx,
    can3D,
  };
}

export const SSR_CAPABILITY: AnimationCapability = {
  motionLevel: "reduced",
  deviceTier: "medium",
  reducedMotion: false,
  isMobile: false,
  saveData: false,
  canHeavyFx: false,
  can3D: false,
};
