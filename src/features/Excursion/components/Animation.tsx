"use client";
import style from "~/styles/insetBorder.module.css";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useExcursionMenuStore } from "../lib/store";

export default function Animation({ children }: { children: ReactNode }) {
  const isOpen = useExcursionMenuStore((state) => state.isOpen);
  return (
    <AnimatePresence initial={false}>
      <motion.div
        transition={{ bounce: false }}
        className={
          "sticky top-24 z-10 grid w-full grid-cols-4 bg-darkgray" +
          (style["inset-border"] ? " " + style["inset-border"] : "")
        }
        key={isOpen ? "children" : "empty"}
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
      >
        {isOpen && children}
      </motion.div>
    </AnimatePresence>
  );
}
