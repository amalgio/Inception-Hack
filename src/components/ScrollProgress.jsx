import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ff5500] via-[#ff8c42] to-[#ff5500] origin-left z-[100] shadow-[0_0_12px_2px_rgba(255,85,0,0.65)] pointer-events-none"
    />
  );
}
