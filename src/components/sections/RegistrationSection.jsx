import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "../ScrollReveal";

export default function RegistrationSection({ onRegisterClick }) {
  // Generate 80 ticks for the circular countdown ring
  const ticksCount = 80;
  const tickLines = [];
  
  for (let i = 0; i < ticksCount; i++) {
    const angleDeg = (i * 360) / ticksCount - 90; // Start from top center (-90 deg)
    const angleRad = (angleDeg * Math.PI) / 180;
    
    const rInner = 195;
    const rOuter = 205;
    
    const x1 = 220 + rInner * Math.cos(angleRad);
    const y1 = 220 + rInner * Math.sin(angleRad);
    const x2 = 220 + rOuter * Math.cos(angleRad);
    const y2 = 220 + rOuter * Math.sin(angleRad);
    
    // Opacity fades clockwise starting from top center
    const opacity = 1.0 - (i / ticksCount) * 0.85;
    
    tickLines.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#FF5A1F"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity={opacity}
      />
    );
  }



  return (
    <section id="register" className="py-16 md:py-24 px-4 md:px-6 max-w-4xl mx-auto border-t border-stone-200/50 relative overflow-visible">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[#ff5500]/[0.02] filter blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" />

      <ScrollReveal className="flex flex-col items-center justify-center w-full relative">
        
        {/* Concentric Countdown Dial System */}
        <div className="w-[330px] xs:w-[390px] md:w-[500px] aspect-square relative flex items-center justify-center overflow-visible select-none mb-4">
          
          {/* Radial SVG Dial background and lines */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0" viewBox="0 0 440 440">
            <defs>
              <linearGradient id="arc-glow" x1="380" y1="59" x2="60" y2="380" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF5A1F" stopOpacity="1" />
                <stop offset="60%" stopColor="#FF5A1F" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>



            {/* Faint orange backing track for the progress arc */}
            <circle cx="220" cy="220" r="205" fill="none" stroke="rgba(255, 90, 31, 0.05)" strokeWidth="4" />

            {/* Dial Tick Marks (stay static) */}
            {tickLines}

            {/* Rotating group for progress arc and pulsing orb (orbits clockwise) */}
            <motion.g
              style={{ originX: 0.5, originY: 0.5, transformBox: "view-box" }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              <rect x="0" y="0" width="440" height="440" fill="transparent" pointerEvents="none" />
              
              {/* Glowing Orange Progress Arc */}
              <path
                d="M 220,15 A 205,205 0 1,1 42.5,322.5"
                fill="none"
                stroke="url(#arc-glow)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                opacity="0.6"
              />
              <path
                d="M 220,15 A 205,205 0 1,1 42.5,322.5"
                fill="none"
                stroke="url(#arc-glow)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Pulsing Orb */}
              <circle cx="220" cy="15" r="4.5" fill="#FF5A1F" />
              <motion.circle
                cx="220"
                cy="15"
                r="4.5"
                fill="#FF5A1F"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.3, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                style={{ transformOrigin: "220px 15px" }}
              />
            </motion.g>

            {/* Centered dial information card rendered inside SVG coordinate space so it scales perfectly */}
            <foreignObject x="60" y="60" width="320" height="320" className="pointer-events-auto">
              <div className="w-full h-full flex flex-col items-center justify-center text-center select-none">
                <span className="text-stone-400 text-[10px] font-extrabold tracking-[0.25em] uppercase mb-2.5 leading-none">
                  The Countdown Begins
                </span>
                
                <h3 className="text-[#FF5A1F] text-[80px] font-black leading-none tracking-tighter select-none font-sans mt-1">
                  24
                </h3>
                
                <span className="text-stone-900 text-[32px] font-black leading-none tracking-tight select-none font-sans mb-3">
                  HOURS
                </span>
                
                <div className="w-8 h-[1.5px] bg-stone-200/80 mb-3" />
                
                <span className="text-[#FF5A1F] text-[10px] font-extrabold tracking-[0.2em] uppercase mb-6 leading-none">
                  March 26 – 27
                </span>

                {/* Register Button */}
                <button
                  onClick={onRegisterClick}
                  className="px-6 py-3 bg-[#FF5A1F] text-white font-extrabold text-[10px] tracking-[0.18em] uppercase rounded-full hover:bg-[#E04D00] shadow-[0_6px_18px_rgba(255,90,31,0.22)] hover:shadow-[0_8px_22px_rgba(255,90,31,0.32)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-1.5 justify-center relative z-10 select-none cursor-pointer"
                >
                  <span>Register Your Team</span>
                  <ArrowRight size={13} strokeWidth={2.8} />
                </button>

                <span className="text-stone-400 text-[9px] font-bold tracking-[0.18em] uppercase mt-3.5 leading-none">
                  Build. Innovate. Impact.
                </span>
              </div>
            </foreignObject>
          </svg>

        </div>

        {/* Bottom Wavy Decoration */}
        <div className="w-full flex flex-col items-center select-none mt-6 relative overflow-visible">
          <svg className="w-full max-w-[480px] h-8 overflow-visible select-none pointer-events-none" viewBox="0 0 600 40">
            {/* Wave Path */}
            <path 
              d="M 0,20 C 100,28 200,12 300,20 C 400,28 500,12 600,20" 
              fill="none" 
              stroke="rgba(255, 90, 31, 0.15)" 
              strokeWidth="1.2" 
            />
            {/* Small nodes on the wave */}
            <circle cx="100" cy="24" r="2.5" fill="#FF5A1F" opacity="0.4" />
            <circle cx="200" cy="16" r="2.5" fill="#FF5A1F" opacity="0.5" />
            <circle cx="400" cy="24" r="2.5" fill="#FF5A1F" opacity="0.5" />
            <circle cx="500" cy="16" r="2.5" fill="#FF5A1F" opacity="0.4" />
            
            {/* Pulsing center node */}
            <circle cx="300" cy="20" r="4.5" fill="#FF5A1F" />
            <motion.circle
              cx="300"
              cy="20"
              r="4.5"
              fill="#FF5A1F"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.3, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              style={{ transformOrigin: "300px 20px" }}
            />
          </svg>

          {/* Spaced label */}
          <span className="text-[#FF5A1F] text-[9.5px] font-extrabold tracking-[0.38em] uppercase mt-2.5 select-none">
            Be Part of Something Big
          </span>
        </div>

      </ScrollReveal>
    </section>
  );
}
