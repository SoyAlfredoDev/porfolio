"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/context/MotionProvider";
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  inView = false,
}: FadeInProps) {
  const { duration, ease, shouldAnimate } = useMotion();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  const props = inView
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-40px" },
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };

  return (
    <motion.div
      className={cn(className)}
      transition={{ duration, ease, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
