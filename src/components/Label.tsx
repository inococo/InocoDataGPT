import React from "react";
import Tooltip from "./Tooltip";
import type { toolTipProperties } from "./types";

interface LabelProps {
  left?: React.ReactNode;
  type?: string;
  toolTipProperties?: toolTipProperties;
}

const Label = ({ type, left, toolTipProperties }: LabelProps) => {
  const isTypeTextArea = () => {
    return type === "textarea";
  };

  return (
    <Tooltip
      child={
        <div
          className={`center flex items-center rounded-xl rounded-r-none ${
            type !== "range" ? "bo