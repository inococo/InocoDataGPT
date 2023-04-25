import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface MotionProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  type?: "spring" | "tween";
}

const Expand = (props: MotionProps) => (
  <motion.