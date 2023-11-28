"use client";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "~/shared/ui/Button";
import IconButton from "~/shared/ui/IconButton";

type DeleteModalProps = {
  title: string | ReactNode;
  deleteHandler: () => void;
} & Omit<ModalBlackscreenProps, "children">;
export const DeleteModal = ({
  title,
  isOpen,
  setIsOpen,
  deleteHandler,
}: DeleteModalProps) => {
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col items-center gap-2">
        {typeof title === "string" ? (
          <h2 className="text-center font-p text-xl">{title}</h2>
        ) : (
          title
        )}
        <div className="grid w-fit grid-cols-2 gap-5">
          <Button
            color="red"
            onClick={() => {
              deleteHandler();
              setIsOpen(false);
            }}
          >
            Удалить
          </Button>
          <Button
            color="gray"
            className="!w-full"
            onClick={() => setIsOpen(false)}
          >
            Отмена
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export const ModalContainer = ({
  children,
  isOpen,
  setIsOpen,
}: ModalBlackscreenProps) => {
  return (
    <ModalBlackscreen isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        className={`${
          isOpen ? "scale-100" : "scale-75 opacity-0"
        } rounded-md border bg-darkgray p-10 transition-all duration-300`}
      >
        <div className="absolute right-2 top-2">
          <IconButton btntype="close" onClick={() => setIsOpen(false)} />
        </div>

        {children}
      </div>
    </ModalBlackscreen>
  );
};

type ModalBlackscreenProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>> | ((isOpen: boolean) => void);
};
export const ModalBlackscreen = ({
  children,
  isOpen,
  setIsOpen,
}: ModalBlackscreenProps) => {
  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <Portal id="#modal">
      <div
        className={`${isOpen ? "" : "pointer-events-none"} fixed inset-0 z-50`}
      >
        <div
          className={`${
            isOpen ? "" : "opacity-0"
          } absolute z-0 h-full w-full bg-darkgray/50 transition-opacity duration-500`}
          onClick={() => setIsOpen(false)}
        />
        <div className="z-10 flex h-full w-full items-center justify-center overflow-y-auto">
          {children}
        </div>
      </div>
    </Portal>
  );
};

type PortalProps = {
  id: string;
  children: ReactNode;
};
export const Portal = ({ children, id }: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>(id);
    setMounted(true);
  }, [id]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
};
