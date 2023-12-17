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
      initial={{ x: "-100%" }}
      animate={{
        x: isOpen ? 0 : "-100%",
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
