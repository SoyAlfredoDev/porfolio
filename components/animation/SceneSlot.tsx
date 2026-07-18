"use client";

import {
  useEffect,
  useId,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { useMotion } from "@/context/MotionProvider";
import {
  claimAnimationSlot,
  releaseAnimationSlot,
} from "@/lib/animation";

type SceneSlotProps = {
  /**
   * Lazy factory for a future R3F scene. Not loaded until can3D + budget allow.
   * Keep three/fiber out of the main bundle until this returns a real module.
   */
  load?: () => Promise<{ default: ComponentType }>;
  fallback?: ReactNode;
  enabled?: boolean;
};

/**
 * Reservation point for one WebGL/R3F scene. Currently a no-op shell:
 * `can3D` is false until packages + a scene are intentionally added.
 * When ready: set can3D in capability.ts and pass `load`.
 */
export function SceneSlot({
  load,
  fallback = null,
  enabled = true,
}: SceneSlotProps) {
  const ownerId = useId();
  const { can3D, shouldAnimate } = useMotion();
  const [Scene, setScene] = useState<ComponentType | null>(null);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!enabled || !can3D || !shouldAnimate || !load) {
      setAllowed(false);
      setScene(null);
      return;
    }
    const ok = claimAnimationSlot("scene3d", ownerId);
    setAllowed(ok);
    if (!ok) return;

    let cancelled = false;
    load().then((mod) => {
      if (!cancelled) setScene(() => mod.default);
    });

    return () => {
      cancelled = true;
      releaseAnimationSlot("scene3d", ownerId);
    };
  }, [enabled, can3D, shouldAnimate, load, ownerId]);

  if (!allowed || !Scene) return <>{fallback}</>;
  return <Scene />;
}
