import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { ArrowRight } from "lucide-react";

export default function AnimatedShinyButton({
  children,
  onClick,
  className,
  url,
  ...props
}) {
  const content = (
    <span className="relative flex items-center justify-center gap-1.5 z-10 text-[11px] md:text-xs font-medium uppercase tracking-widest text-white">
      {children}
      <motion.span
        variants={{
          initial: { x: 0 },
          hover: { x: 3 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <ArrowRight size={13} className="stroke-[2]" />
      </motion.span>
    </span>
  );

  const sharedClasses = cn(
    "relative overflow-hidden cursor-pointer rounded-full px-8 py-3.5 bg-[#ff5500] hover:bg-[#ff8c42] border border-[#ff8c42]/30 shadow-[0_4px_25px_-5px_rgba(255,85,0,0.5)] hover:shadow-[0_8px_30px_0_rgba(255,85,0,0.7)] transition-all duration-300 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-2 text-center inline-flex items-center justify-center",
    className
  );

  const sharedContent = (
    <>
      {/* Moving Shine Layer */}
      <motion.div
        className="absolute inset-0 w-[60%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-20 z-0 pointer-events-none"
        initial={{ left: "-100%" }}
        animate={{ left: "200%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2.0,
          ease: "easeInOut",
          repeatDelay: 1.2
        }}
      />
      {content}
    </>
  );

  if (url) {
    return (
      <motion.a
        href={url}
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        className={sharedClasses}
        {...props}
      >
        {sharedContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className={sharedClasses}
      {...props}
    >
      {sharedContent}
    </motion.button>
  );
}
