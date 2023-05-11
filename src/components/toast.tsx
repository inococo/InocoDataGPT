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
          "fixed inset-x-