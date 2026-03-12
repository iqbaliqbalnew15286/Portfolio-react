import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export const RevealOnScroll = ({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const directionVariants = {
    up: { hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -75 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: 75 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: -75 }, visible: { opacity: 1, x: 0 } },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={directionVariants[direction]}
      transition={{ duration, delay, type: "spring", bounce: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export const RevealSection = ({ children, className = "" }) => {
  return (
    <RevealOnScroll direction="up" duration={0.6} className={className}>
      {children}
    </RevealOnScroll>
  );
};

export default RevealOnScroll;
