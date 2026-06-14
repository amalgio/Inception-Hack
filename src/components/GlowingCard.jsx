import { useRef, useState } from "react";
import { cn } from "../lib/utils";

export default function GlowingCard({ children, className, containerClassName, showCorners = false }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCoords({ x, y });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-2xl overflow-hidden border border-stone-200/20 bg-[#faf6f0]/30 backdrop-blur-xl transition-all duration-300 p-[1px] group h-full w-full flex flex-col",
        containerClassName
      )}
    >
      {/* Outer border glow following the mouse */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(255, 85, 0, 0.25), transparent 80%)`,
          }}
        />
      )}

      {/* Inner card background container */}
      <div className={cn(
        "relative rounded-[15px] bg-white/60 w-full h-full p-5 md:p-8 z-10 transition-colors duration-300 group-hover:bg-white/75 border border-white/60", 
        className
      )}>
        {/* Subtle Glass Dotted Texture Layer */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.25] glass-texture rounded-[15px]" />

        {/* Subtle inner ambient mouse shine */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[15px] transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(255, 85, 0, 0.04), transparent 80%)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}
