"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/context/MotionProvider";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** Use whileInView (sections below the fold). */
  inView?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  inView = false,
}: RevealProps) {
  const { reveal, duration, ease, shouldAnimate } = useMotion();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  const transition = { duration, ease, delay };

  if (inView) {
    return (
      <motion.div
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: reveal.hidden,
          visible: { ...reveal.visible, transition },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: reveal.hidden,
        visible: { ...reveal.visible, transition },
      }}
    >
      {children}
    </motion.div>
  );
}
