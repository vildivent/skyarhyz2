import { motion } from "framer-motion";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { MenuButtonWithArrow } from "./MenuButtonWithArrow";

type CategoryProps = {
  id: string;
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  openedId: string;
  setOpenedId: Dispatch<SetStateAction<string>>;
};
export default function MenuGroup({
  id,
  title,
  children,
  icon,
  openedId,
  setOpenedId,
}: CategoryProps) {
  return (
    <div className="flex flex-col">
      <MenuButtonWithArrow
        title={title}
        icon={icon}
        reverseArrow={openedId === id}
        onClick={() => setOpenedId((prev) => (prev === id ? "" : id))}
      />
      <motion.div
        className={`overflow-hidden ${
          openedId === id ? "" : "pointer-events-none h-0"
        }`}
        animate={{
          height: openedId === id ? "auto" : 0,
          transition: {
            duration: 0.3,
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
