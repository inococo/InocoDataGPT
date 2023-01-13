import React from "react";
import Button from "./Button";

import { useTranslation } from "next-i18next";

export default function Dialog({
  header,
  children,
  isShown,
  close,
  footerButton,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  isShown: boolean;
  close: () => void;
  footerButton?: React.ReactNode;
}) {
  const [ t ] = useTranslation()
  if (!isShown) {
    return <>{null}</>;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/70 p-3 font-mono text-white outline-none transition-all">
      <div
        className="absolute bottom-0 left-0 right-0 top-0 "
        onClick={close}
      />
      <div className="relative mx-auto my-6 w-auto max-w-3xl rounded-lg border-2 border-zinc-600">
        {/*content*/}
        <