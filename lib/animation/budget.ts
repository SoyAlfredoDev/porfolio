/**
 * Global soft budget: at most one heavy ambient + one 3D scene visible.
 * Components call claim/release so we never stack WebGL + particle fields.
 */

type Slot = "ambient" | "scene3d";

const holders: Partial<Record<Slot, string>> = {};

export function claimAnimationSlot(slot: Slot, ownerId: string): boolean {
  if (typeof window === "undefined") return false;
  if (holders[slot] && holders[slot] !== ownerId) return false;
  holders[slot] = ownerId;
  return true;
}

export function releaseAnimationSlot(slot: Slot, ownerId: string): void {
  if (holders[slot] === ownerId) {
    delete holders[slot];
  }
}

export function isSlotFree(slot: Slot): boolean {
  return !holders[slot];
}
