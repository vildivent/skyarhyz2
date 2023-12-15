"use client";
import { motion } from "framer-motion";

type AnimateProps = {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
};
export default function Animation({
  children,
  isOpen,
  className = "",
}: AnimateProps) {
  return (
    <motion.div
      className={className}
      animate={{
        x: isOpen ? "100%" : 0,
        pointerEvents: isOpen ? "auto" : "none",
        transition: {
          duration: 0.3,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
