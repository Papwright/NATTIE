import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function FadeLine({
  children,
  delay = 0,
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      ref={ref as never}
      initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 24, filter: "blur(12px)" }
      }
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
