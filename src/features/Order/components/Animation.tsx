import { motion } from "framer-motion";

type AnimateProps = {
  children: React.ReactNode;
  isOpen: boolean;
};
export default function Animation({ children, isOpen }: AnimateProps) {
  return (
    <motion.div
      className={`overflow-hidden ${isOpen ? "" : "pointer-events-none h-0"}`}
      animate={{
        height: isOpen ? "auto" : 0,
        transition: {
          duration: 0.3,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
