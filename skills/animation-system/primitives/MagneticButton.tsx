"use client";

import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useMagneticEffect } from "../hooks/useMagneticEffect";

type MagneticButtonProps = HTMLAttributes<HTMLDivElement> & {
  strength?: number;
  children: ReactNode;
};

export const MagneticButton = forwardRef<HTMLDivElement, MagneticButtonProps>(
  function MagneticButton(
    { className, children, strength = 0.32, style, ...props },
    forwardedRef,
  ) {
    const magnetic = useMagneticEffect(strength);

    return (
      <div
        ref={(node) => {
          magnetic.ref.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={cn("relative inline-flex", className)}
        style={{ ...magnetic.style, ...(style as CSSProperties) }}
        {...magnetic.handlers}
        {...props}
      >
        {children}
      </div>
    );
  },
);
