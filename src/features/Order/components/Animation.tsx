import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

type AnimateProps = {
  isOpen: boolean;
  children: React.ReactNode;
  infoBlock: React.ReactNode;
  element: React.RefObject<HTMLDivElement>;
};
export default function Animation({
  children,
  isOpen,
  infoBlock,
  element,
}: AnimateProps) {
  const [ref, { height }] = useMeasure();
  return (
    <motion.div
      className="overflow-hidden"
      animate={{
        height: height || "auto",
      }}
      onAnimationStart={() => {
        if (isOpen)
          setTimeout(() => {
            console.log("before scroll");
            element.current?.scrollIntoView({
              block: "center",
              behavior: "smooth",
            });
          }, 300);
      }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={isOpen ? "children" : "infoBlock"}
          animate={isOpen ? { opacity: 1 } : {}}
          exit={isOpen ? { opacity: 0 } : {}}
        >
          <div ref={ref}>{isOpen ? children : infoBlock}</div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
