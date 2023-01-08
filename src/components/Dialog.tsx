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
  const [ t ] = useTrans