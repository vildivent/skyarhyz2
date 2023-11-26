import { motion } from "framer-motion";

type ViewProps = {
  content: React.ReactNode;
  menuIsOpen: boolean;
};
export default function View({ content, menuIsOpen }: ViewProps) {
  return (
    <motion.div
      className={`absolute right-0 flex flex-col border-b border-l bg-darkgray ${
        menuIsOpen ? "" : "pointer-events-none opacity-0"
      }`}
      animate={{
        y: menuIsOpen ? -1 : 20,
        opacity: menuIsOpen ? 100 : 0,
        transition: {
          duration: 0.15,
        },
      }}
    >
      {content}
    </motion.div>
  );
}
