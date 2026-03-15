"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimateInViewProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimateInView({ children, className, delay = 0 }: AnimateInViewProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
