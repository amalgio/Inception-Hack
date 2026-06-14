import { motion } from "motion/react";
import { cn } from "../lib/utils";

export default function AnimatedTabs({
  tabs = [],
  activeTab = 0,
  onChange,
  className,
}) {
  return (
    <div
      className={cn(
        "flex space-x-1 bg-stone-100/90 p-1.5 rounded-full border border-stone-200/50 backdrop-blur-md max-w-xs md:max-w-sm mx-auto shadow-sm",
        className
      )}
    >
      {tabs.map((tab, idx) => {
        const isActive = activeTab === idx;
        return (
          <button
            key={tab}
            onClick={() => onChange?.(idx)}
            className={cn(
              "relative px-6 py-2.5 font-sans text-[10px] md:text-xs font-medium uppercase tracking-widest rounded-full transition-colors duration-300 w-full focus-visible:outline-none select-none",
              isActive ? "text-white" : "text-stone-600 hover:text-[#ff5500]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute inset-0 bg-[#ff5500] rounded-full -z-10 shadow-sm"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
