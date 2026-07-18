"use client";

import { useVisualStyle } from "@/context/VisualStyleContext";
import type { VisualStyle } from "@/lib/animation";
import { cn } from "@/lib/utils";

const OPTIONS: { id: VisualStyle; label: string; short: string }[] = [
  { id: "modern", label: "Modern", short: "Mod" },
  { id: "retro", label: "Retro", short: "Ret" },
  { id: "christmas", label: "Xmas", short: "Xmas" },
];

export function StyleSwitcher({ className }: { className?: string }) {
  const { style, setStyle } = useVisualStyle();

  return (
    <div
      className={cn(
        "style-switcher relative z-[60] pointer-events-auto flex shrink-0 items-center gap-1 rounded-full border border-border/40 bg-background/80 p-1 backdrop-blur",
        className,
      )}
      role="group"
      aria-label="Visual style"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {OPTIONS.map((opt) => {
        const active = style === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setStyle(opt.id);
            }}
            className={cn(
              "pointer-events-auto relative z-[61] cursor-pointer touch-manipulation rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition-colors min-h-9 sm:min-h-8 inline-flex items-center justify-center active:scale-[0.97]",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground active:bg-muted/60",
            )}
            aria-pressed={active}
            aria-label={opt.label}
            data-style-option={opt.id}
          >
            <span className="sm:hidden">{opt.short}</span>
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
