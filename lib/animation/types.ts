/** Visual brand styles (full skins = future phase; motion already keys off these). */
export type VisualStyle = "modern" | "retro" | "christmas";

/** Effective motion budget after capability + a11y checks. */
export type MotionLevel = "full" | "reduced" | "none";

export type DeviceTier = "high" | "medium" | "low";

export type AnimationCapability = {
  motionLevel: MotionLevel;
  deviceTier: DeviceTier;
  reducedMotion: boolean;
  isMobile: boolean;
  saveData: boolean;
  /** CSS ambient / soft particles — never with a heavy 3D scene. */
  canHeavyFx: boolean;
  /** Reserved for lazy R3F scenes; false until a scene is wired + tier allows. */
  can3D: boolean;
};

export type RevealPreset = {
  hidden: { opacity: number; y?: number; x?: number; scale?: number };
  visible: { opacity: number; y?: number; x?: number; scale?: number };
};
