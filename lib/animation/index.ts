export type {
  AnimationCapability,
  DeviceTier,
  MotionLevel,
  RevealPreset,
  VisualStyle,
} from "./types";

export { detectCapability, SSR_CAPABILITY } from "./capability";
export {
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_EASE_RETRO,
  MOTION_EASE_CHRISTMAS,
  REVEAL_BY_STYLE,
  REVEAL_NONE,
  REVEAL_STATIC,
  getStagger,
  getMotionDuration,
} from "./presets";
export {
  claimAnimationSlot,
  releaseAnimationSlot,
  isSlotFree,
} from "./budget";
