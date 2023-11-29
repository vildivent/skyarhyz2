import { motion } from "framer-motion";
import { useProfileMenuStore } from "../lib/store";

type ViewProps = {
  content: React.ReactNode;
};
export default function View({ content }: ViewProps) {
  const { isOpen } = useProfileMenuStore();
  return (
    <motion.div
      className={`absolute right-0 flex flex-col border-b border-l bg-darkgray ${
        isOpen ? "" : "pointer-events-none opacity-0"
      }`}
      animate={{
        y: isOpen ? -1 : 20,
        opacity: isOpen ? 100 : 0,
        transition: {
          duration: 0.15,
        },
      }}
    >
      {content}
    </motion.div>
  );
}
