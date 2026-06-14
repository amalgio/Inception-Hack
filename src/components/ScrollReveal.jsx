import { motion } from "motion/react";

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 25,
  x = 0,
  scale = 1,
  className,
  once = true,
  margin = "-100px",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutQuart-like premium transition
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
