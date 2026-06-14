import { motion } from "motion/react";
import iconCubeClusterTop from "../assets/icon_cube_cluster_top.png";
import iconAtom from "../assets/icon_atom.png";
import iconCodeBrackets from "../assets/icon_code_brackets.png";
import iconCubeClusterBottom from "../assets/icon_cube_cluster_bottom.png";
import iconGear from "../assets/icon_gear.png";
import iconPieChart from "../assets/icon_pie_chart.png";

// Helper to pre-calculate points along an elliptical orbit
const getEllipseKeyframes = (rx, ry, clockwise, startAngle) => {
  const steps = 60;
  const xVals = [];
  const yVals = [];
  const direction = clockwise ? 1 : -1;
  for (let i = 0; i <= steps; i++) {
    const angleRad = ((startAngle + (360 * i) / steps * direction) * Math.PI) / 180;
    xVals.push(rx * Math.cos(angleRad));
    yVals.push(ry * Math.sin(angleRad));
  }
  return { x: xVals, y: yVals };
};

// Helper to get static coordinate position on an ellipse
const getEllipsePos = (rx, ry, angleDegrees) => {
  const angleRad = (angleDegrees * Math.PI) / 180;
  return {
    x: rx * Math.cos(angleRad),
    y: ry * Math.sin(angleRad)
  };
};

// Helper component for static orbit rings (ellipses)
const OrbitRing = ({ rx, ry, color = "orange", opacity = "30" }) => {
  const borderColors = {
    orange: `border-orange-500/${opacity}`,
    zinc: `border-zinc-400/${opacity}`
  };
  return (
    <div
      style={{
        width: rx * 2,
        height: ry * 2,
        marginLeft: -rx,
        marginTop: -ry
      }}
      className={`absolute left-1/2 top-1/2 rounded-full border border-dashed ${borderColors[color] || borderColors.orange}`}
    />
  );
};

// Helper component for spinning glowing orbital ellipses
const SpinningOrbitRing = ({ rx, ry, duration, clockwise = true, color = "orange", shadowClass = "" }) => {
  const direction = clockwise ? 360 : -360;
  return (
    <motion.div
      animate={{ rotate: direction }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
      className="absolute inset-0 pointer-events-none"
    >
      <div
        style={{
          width: rx * 2,
          height: ry * 2,
          marginLeft: -rx,
          marginTop: -ry
        }}
        className={`absolute left-1/2 top-1/2 rounded-full border border-dashed ${
          color === "orange" ? "border-orange-400/40" : "border-zinc-400/40"
        } ${shadowClass}`}
      />
    </motion.div>
  );
};

// Helper component for glowing nodes sliding along the elliptical orbits
const OrbitDot = ({ rx, ry, duration, clockwise = true, color = "orange", startAngle = 0, size = 6 }) => {
  const keyframes = getEllipseKeyframes(rx, ry, clockwise, startAngle);
  const halfSize = size / 2;
  
  const glowColors = {
    orange: "#ff7028",
    white: "#ffffff",
    zinc: "#a1a1aa"
  };
  const bgColors = {
    orange: "bg-orange-500",
    white: "bg-white",
    zinc: "bg-zinc-400"
  };
  
  const glowHex = glowColors[color] || glowColors.orange;
  const bgClass = bgColors[color] || bgColors.orange;

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        marginLeft: -halfSize,
        marginTop: -halfSize
      }}
      className="absolute left-1/2 top-1/2 pointer-events-none"
      animate={{ x: keyframes.x, y: keyframes.y }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div
        style={{
          width: size,
          height: size,
          boxShadow: `0 0 ${size * 1.0}px ${glowHex}`
        }}
        className={`rounded-full ${bgClass}`}
      />
    </motion.div>
  );
};

export function LeftOrnaments() {
  // Ellipse radii configurations
  const innerRx = 165, innerRy = 135;
  const middleRx = 245, middleRy = 195;
  const outerRx = 315, outerRy = 250;

  // Offsets from the center (concentric-like but uneven/shifted)
  const innerOffset = "translate(-10px, 5px)";
  const middleOffset = "translate(-20px, -10px)";
  const outerOffset = "translate(10px, 15px)";

  // Static icon coordinates on the outer ellipse (angles in degrees)
  const topIconPos = getEllipsePos(outerRx, outerRy, -50);
  const bottomIconPos = getEllipsePos(outerRx, outerRy, 50);

  return (
    <div className="hidden md:block absolute left-0 top-0 h-full w-[35%] z-10 pointer-events-none origin-left transition-all duration-500 scale-[0.7] lg:scale-[0.85] xl:scale-100">
      
      {/* Centered orbits container (aligned around the middle Atom model) */}
      <div className="absolute left-[30%] sm:left-[8%] top-[50%] w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2">
        
        {/* FADING LAYER: Background glow, orbit lines, and dots (hidden on mobile, shown on desktop) */}
        <div className="hidden sm:block absolute inset-0 opacity-40 sm:opacity-50 md:opacity-75 lg:opacity-100 transition-opacity duration-500">
          
          {/* Soft Radial Background Orange Glow (shifted slightly inward and toned down) */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_-20%_50%,rgba(255,85,0,0.60)_0%,rgba(255,85,0,0.25)_50%,transparent_90%)] pointer-events-none filter blur-3xl" />

          {/* 1. Inner Orbit System */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: innerOffset }}>
            <OrbitRing rx={innerRx} ry={innerRy} color="orange" opacity="20" />
            <OrbitDot rx={innerRx} ry={innerRy} duration={12} clockwise={true} color="orange" startAngle={45} size={5} />
            <OrbitDot rx={innerRx} ry={innerRy} duration={12} clockwise={true} color="orange" startAngle={225} size={8} />
          </div>

          {/* 2. Middle Orbit System */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: middleOffset }}>
            <OrbitRing rx={middleRx} ry={middleRy} color="orange" opacity="25" />
            <OrbitDot rx={middleRx} ry={middleRy} duration={18} clockwise={false} color="orange" startAngle={180} size={7} />
            <OrbitDot rx={middleRx} ry={middleRy} duration={18} clockwise={false} color="orange" startAngle={0} size={4} />
          </div>

          {/* 3. Outer Orbit System */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: outerOffset }}>
            <OrbitRing rx={outerRx} ry={outerRy} color="orange" opacity="30" />
            <OrbitDot rx={outerRx} ry={outerRy} duration={25} clockwise={true} color="orange" startAngle={270} size={9} />
            <OrbitDot rx={outerRx} ry={outerRy} duration={25} clockwise={true} color="orange" startAngle={90} size={5} />
            <OrbitDot rx={outerRx} ry={outerRy} duration={25} clockwise={true} color="orange" startAngle={170} size={3} />
          </div>

          {/* 4. Spinning Glowing Ellipse 1 */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: "translate(-15px, -25px)" }}>
            <SpinningOrbitRing rx={280} ry={220} duration={16} clockwise={true} color="orange" shadowClass="shadow-[0_0_8px_rgba(251,146,60,0.06)]" />
          </div>

          {/* 5. Spinning Glowing Ellipse 2 */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: "translate(35px, -10px)" }}>
            <SpinningOrbitRing rx={210} ry={170} duration={24} clockwise={false} color="orange" shadowClass="shadow-[0_0_6px_rgba(251,146,60,0.04)]" />
          </div>

        </div>

        {/* SOLID LAYER: 3D Image Assets (kept outside fading layer to stay 100% opaque on all viewports, preventing glow bleed-through) */}
        <div className="absolute inset-0 pointer-events-none">

          {/* Left Middle Anchor Icon: Atom Model */}
          <div className="absolute left-1/2 top-1/2 w-[180px] h-[180px] -ml-[90px] -mt-[90px] z-20">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7.0, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-full cursor-pointer pointer-events-auto"
            >
              <img
                src={iconAtom}
                alt="Atom Model"
                className="w-full h-full object-contain opacity-100"
              />
            </motion.div>
          </div>

          {/* Left Top Icon (aligned perfectly on the outer offset ellipse - hidden on mobile) */}
          <div 
            className="hidden sm:block absolute w-24 h-24 z-20" 
            style={{ 
              left: `calc(50% + ${topIconPos.x}px)`, 
              top: `calc(50% + ${topIconPos.y}px)`, 
              transform: `translate(-50%, -50%) ${outerOffset}` 
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6.0, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-full cursor-pointer pointer-events-auto"
            >
              <img
                src={iconCubeClusterTop}
                alt="Cube Cluster Top"
                className="w-full h-full object-contain opacity-100"
              />
            </motion.div>
          </div>

          {/* Left Bottom Icon (aligned perfectly on the outer offset ellipse - hidden on mobile) */}
          <div 
            className="hidden sm:block absolute w-24 h-24 z-20" 
            style={{ 
              left: `calc(50% + ${bottomIconPos.x}px)`, 
              top: `calc(50% + ${bottomIconPos.y}px)`, 
              transform: `translate(-50%, -50%) ${outerOffset}` 
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-full cursor-pointer pointer-events-auto"
            >
              <img
                src={iconCubeClusterBottom}
                alt="Cube Cluster Bottom"
                className="w-full h-full object-contain opacity-100"
              />
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
}

export function RightOrnaments() {
  // Ellipse radii configurations
  const innerRx = 165, innerRy = 135;
  const middleRx = 245, middleRy = 195;
  const outerRx = 315, outerRy = 250;

  // Offsets from the center (concentric-like but uneven/shifted)
  const innerOffset = "translate(10px, -5px)";
  const middleOffset = "translate(20px, 10px)";
  const outerOffset = "translate(-10px, -15px)";

  // Static icon coordinates on the outer ellipse (angles in degrees)
  const topIconPos = getEllipsePos(outerRx, outerRy, -130);
  const bottomIconPos = getEllipsePos(outerRx, outerRy, 130);

  return (
    <div className="hidden md:block absolute right-0 top-0 h-full w-[35%] z-10 pointer-events-none origin-right transition-all duration-500 scale-[0.7] lg:scale-[0.85] xl:scale-100">
      
      {/* Centered orbits container (aligned around the middle Gear model) */}
      <div className="absolute right-[30%] sm:right-[12%] top-[50%] w-[650px] h-[650px] translate-x-1/2 -translate-y-1/2">
        
        {/* FADING LAYER: Background glow, orbit lines, and dots (hidden on mobile, shown on desktop) */}
        <div className="hidden sm:block absolute inset-0 opacity-40 sm:opacity-50 md:opacity-75 lg:opacity-100 transition-opacity duration-500">
          
          {/* Soft Radial Background Slate/Gray Glow (shifted slightly inward and toned down) */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_120%_50%,rgba(100,116,139,0.60)_0%,rgba(100,116,139,0.25)_50%,transparent_90%)] pointer-events-none filter blur-3xl" />

          {/* 1. Inner Orbit System */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: innerOffset }}>
            <OrbitRing rx={innerRx} ry={innerRy} color="zinc" opacity="25" />
            <OrbitDot rx={innerRx} ry={innerRy} duration={14} clockwise={false} color="zinc" startAngle={120} size={5} />
            <OrbitDot rx={innerRx} ry={innerRy} duration={14} clockwise={false} color="zinc" startAngle={300} size={8} />
          </div>

          {/* 2. Middle Orbit System */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: middleOffset }}>
            <OrbitRing rx={middleRx} ry={middleRy} color="zinc" opacity="30" />
            <OrbitDot rx={middleRx} ry={middleRy} duration={20} clockwise={true} color="zinc" startAngle={0} size={8} />
            <OrbitDot rx={middleRx} ry={middleRy} duration={20} clockwise={true} color="zinc" startAngle={180} size={4} />
          </div>

          {/* 3. Outer Orbit System */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: outerOffset }}>
            <OrbitRing rx={outerRx} ry={outerRy} color="zinc" opacity="35" />
            <OrbitDot rx={outerRx} ry={outerRy} duration={28} clockwise={false} color="white" startAngle={300} size={7} />
            <OrbitDot rx={outerRx} ry={outerRy} duration={28} clockwise={false} color="white" startAngle={120} size={10} />
            <OrbitDot rx={outerRx} ry={outerRy} duration={28} clockwise={false} color="zinc" startAngle={210} size={5} />
          </div>

          {/* 4. Spinning Glowing Ellipse 1 */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: "translate(20px, 25px)" }}>
            <SpinningOrbitRing rx={280} ry={220} duration={20} clockwise={false} color="zinc" shadowClass="shadow-[0_0_8px_rgba(255,255,255,0.06)]" />
          </div>

          {/* 5. Spinning Glowing Ellipse 2 */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: "translate(-35px, -10px)" }}>
            <SpinningOrbitRing rx={210} ry={170} duration={28} clockwise={true} color="zinc" shadowClass="shadow-[0_0_6px_rgba(255,255,255,0.04)]" />
          </div>

        </div>

        {/* SOLID LAYER: 3D Image Assets (kept outside fading layer to stay 100% opaque on all viewports, preventing glow bleed-through) */}
        <div className="absolute inset-0 pointer-events-none">

          {/* Right Middle Anchor Icon: Mechanical Gear */}
          <div className="absolute left-1/2 top-1/2 w-[120px] h-[120px] -ml-[60px] -mt-[60px] z-20">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-full cursor-pointer pointer-events-auto"
            >
              <img
                src={iconGear}
                alt="Mechanical Gear"
                className="w-full h-full object-contain opacity-100"
              />
            </motion.div>
          </div>

          {/* Right Top Icon (aligned perfectly on the outer offset ellipse - hidden on mobile) */}
          <div 
            className="hidden sm:block absolute w-24 h-24 z-20" 
            style={{ 
              left: `calc(50% + ${topIconPos.x}px)`, 
              top: `calc(50% + ${topIconPos.y}px)`, 
              transform: `translate(-50%, -50%) ${outerOffset}` 
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-full cursor-pointer pointer-events-auto"
            >
              <img
                src={iconCodeBrackets}
                alt="Code Brackets"
                className="w-full h-full object-contain opacity-100"
              />
            </motion.div>
          </div>

          {/* Right Bottom Icon (aligned perfectly on the outer offset ellipse - hidden on mobile) */}
          <div 
            className="hidden sm:block absolute w-24 h-24 z-20" 
            style={{ 
              left: `calc(50% + ${bottomIconPos.x}px)`, 
              top: `calc(50% + ${bottomIconPos.y}px)`, 
              transform: `translate(-50%, -50%) ${outerOffset}` 
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-full cursor-pointer pointer-events-auto"
            >
              <img
                src={iconPieChart}
                alt="Pie Chart"
                className="w-full h-full object-contain opacity-100"
              />
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
}

export function MobileOrnaments() {
  return (
    <div className="block md:hidden absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10">
      {/* 1. Atom Model (Top Left) */}
      <div className="absolute left-[6%] top-[80px] w-[52px] h-[52px] z-10">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5.0, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <img
            src={iconAtom}
            alt="Atom Model"
            className="w-full h-full object-contain opacity-85"
          />
        </motion.div>
      </div>

      {/* 2. Mechanical Gear (Top Right) */}
      <div className="absolute right-[6%] top-[95px] w-[52px] h-[52px] z-10">
        <motion.div
          animate={{ y: [0, -6, 0], rotate: 360 }}
          transition={{
            y: { duration: 6.0, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 25.0, repeat: Infinity, ease: "linear" }
          }}
          className="w-full h-full"
        >
          <img
            src={iconGear}
            alt="Mechanical Gear"
            className="w-full h-full object-contain opacity-85"
          />
        </motion.div>
      </div>

      {/* 3. Code Brackets (Bottom Left) */}
      <div className="absolute left-[8%] top-[690px] w-[48px] h-[48px] z-10">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="w-full h-full"
        >
          <img
            src={iconCodeBrackets}
            alt="Code Brackets"
            className="w-full h-full object-contain opacity-85"
          />
        </motion.div>
      </div>

      {/* 4. Pie Chart (Bottom Right) */}
      <div className="absolute right-[10%] top-[670px] w-[48px] h-[48px] z-10">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="w-full h-full"
        >
          <img
            src={iconPieChart}
            alt="Pie Chart"
            className="w-full h-full object-contain opacity-85"
          />
        </motion.div>
      </div>
    </div>
  );
}
