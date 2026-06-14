import { motion } from "motion/react";
import { cn } from "../lib/utils";

export default function TextEffect({ children, per = "char", delay = 0, className }) {
  const text = children || "";
  
  if (typeof text !== "string") return <span>{text}</span>;

  // Split text based on chosen unit (character vs word)
  const items = per === "word" ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: per === "word" ? 0.08 : 0.015,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("inline-block", className)}
    >
      {items.map((item, idx) => (
        <motion.span
          key={idx}
          variants={itemVariants}
          className="inline-block"
          style={{ marginRight: per === "word" ? "0.25em" : "0px" }}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </motion.span>
  );
}
