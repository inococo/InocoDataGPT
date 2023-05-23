import * as ToastPrimitive from "@radix-ui/react-toast";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import clsx from "clsx";
import { useTranslation  } from "next-i18next";

type Props = {
  model: [boolean, Dispatch<SetStateAction<boolean>>];
  onAction?: () => void;
  title: string;
  description?: string;
  className?: string;
};

const Toast = (props: Props) => {
  const [ t ] = useTranslation();
  const [open, setOpen] = props.model;

  return (
    <ToastPrimitive.Provider swipeDirection={"right"}>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className={clsx(
          "fixed inset-x-4 bottom-4 z-50 w-auto rounded-2xl shadow-lg md:left-auto md:right-4 md:w-full md:max-w-sm",
          "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
          "radix-state-closed:animate-toast-hide",
          "radix-swipe-direction-right:radix-swipe-end:animate-toast-swipe-out-x",
          "radix-swipe-direction-right:translate-x-radix-toast-swipe-move-x",
          "radix-swipe-direction-down:radix-swipe-end:animate-toast-swipe-out-y",
          "radix-swipe-direction-down:translate-y-radix-toast-swipe-move-y",
          "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
          props.className
        )}
      >
        <div className="flex">
          <div className="flex w-0 flex-1 items-center py-4 pl-5">
            <