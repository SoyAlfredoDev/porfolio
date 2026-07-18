"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useMotion } from "@/context/MotionProvider";
import { cn } from "@/lib/utils";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Override stagger seconds. */
  stagger?: number;
  inView?: boolean;
};

/**
 * Wraps each child in a staggered reveal. Prefer a flat list of elements.
 */
export function Stagger({
  children,
  className,
  stagger: staggerProp,
  inView = true,
}: StaggerProps) {
  const { reveal, duration, ease, stagger, shouldAnimate } = useMotion();
  const gap = staggerProp ?? stagger;

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: gap },
    },
  };

  const item = {
    hidden: reveal.hidden,
    visible: {
      ...reveal.visible,
      transition: { duration, ease },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      {...(inView
        ? {
            whileInView: "visible" as const,
            viewport: { once: true, margin: "-40px" },
          }
        : { animate: "visible" as const })}
      variants={container}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        return (
          <motion.div key={child.key ?? index} variants={item}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
