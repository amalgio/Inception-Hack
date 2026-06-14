import { motion } from "motion/react";
import { useId } from "react";

export default function BorderBeam({
  colorFrom = "#ff5500",
  colorTo = "#ff8c42",
  duration = 6,
  borderWidth = 1.5,
  borderRadius = 16,
  size = 0.2,
}) {
  const gradientId = useId();

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorFrom} stopOpacity={1} />
          <stop offset="50%" stopColor={colorTo} stopOpacity={0.8} />
          <stop offset="100%" stopColor={colorFrom} stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.rect
        x={borderWidth / 2}
        y={borderWidth / 2}
        width={`calc(100% - ${borderWidth}px)`}
        height={`calc(100% - ${borderWidth}px)`}
        rx={borderRadius}
        ry={borderRadius}
        stroke={`url(#${gradientId})`}
        strokeWidth={borderWidth}
        pathLength="1"
        strokeDasharray={`${size} ${1 - size}`}
        animate={{ strokeDashoffset: [0, -1] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </svg>
  );
}
