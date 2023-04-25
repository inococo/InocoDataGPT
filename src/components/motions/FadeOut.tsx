import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface MotionProps extends PropsWithChildren {
  className?: string;
  delay?: number;
}

const FadeOut = (props: MotionProps) => (
  <motion.div
    exit={{ opacity: 0, x: -100 }}
    animate={{ scale: 1 }}
    transition={{