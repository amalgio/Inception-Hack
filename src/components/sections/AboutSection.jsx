import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import ScrollReveal from "../ScrollReveal";

import imgLightbulb from "../../assets/3d_about_lightbulb.png";
import imgTarget from "../../assets/3d_about_target.png";
import imgBridge from "../../assets/3d_about_bridge.png";
import imgCubes from "../../assets/3d_about_cubes.png";
import imgNetwork from "../../assets/3d_about_network.png";
import imgCollaboration from "../../assets/3d_about_collaboration.png";
import imgMentorsPlatform from "../../assets/3d_about_mentors_platform.png";
import imgMagnifyingGlass from "../../assets/3d_about_magnifying_glass.png";

// Custom minimal arch bridge icon
function BridgeIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 16h18" />
      <path d="M6 16c0-6 12-6 12 0" />
      <path d="M12 10v6" />
    </svg>
  );
}

// 3D glossy circular node component
function OrbitNode({ image, title1, title2, desc, positionStyle, labelPosition, labelVerticalAlign, delay }) {
  const isLabelLeft = labelPosition === "left";
  const isLabelRight = labelPosition === "right";
  const isLabelTop = labelPosition === "top";
  const isLabelBottom = labelPosition === "bottom";

  const verticalAlignClass = labelVerticalAlign || "top-1/2 -translate-y-1/2";

  return (
    <div
      style={positionStyle}
      className="absolute z-20 group transform -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="flex items-center justify-center relative"
      >
        {/* Node Button */}
        <motion.div
          whileHover={{ scale: 1.08, translateY: -2 }}
          className="w-[90px] h-[90px] flex items-center justify-center cursor-pointer relative shrink-0"
        >
          <img src={image} alt={title1} className="w-[90px] h-[90px] object-contain relative z-10 select-none pointer-events-none" />
        </motion.div>

        {/* Label Content */}
        <div
          className={`absolute pointer-events-none select-none flex flex-col w-[170px] md:w-[180px] transition-all duration-300 group-hover:scale-[1.02] ${
            isLabelTop ? "bottom-[115%] left-1/2 -translate-x-1/2 mb-3 text-center" : ""
          } ${
            isLabelBottom ? "top-[115%] left-1/2 -translate-x-1/2 mt-3 text-center" : ""
          } ${
            isLabelRight ? `left-[115%] ${verticalAlignClass} ml-4 text-left` : ""
          } ${
            isLabelLeft ? `right-[115%] ${verticalAlignClass} mr-4 text-right` : ""
          }`}
        >
          <span 
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className="text-stone-900 font-extrabold text-[12px] tracking-wider uppercase leading-tight"
          >
            {title1}
          </span>
          {title2 && (
            <span 
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-stone-900 font-extrabold text-[12px] tracking-wider uppercase leading-tight"
            >
              {title2}
            </span>
          )}
          <span className="text-stone-500 text-[10px] md:text-[10.5px] leading-normal font-normal mt-1">
            {desc}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// Mobile Card component for About section
function AboutMobileCard({ image, title, desc, accentColor, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-white/70 border border-stone-200/50 backdrop-blur-md rounded-2xl p-5 flex items-start gap-4 shadow-[0_4px_20px_-4px_rgba(28,25,23,0.03)] relative overflow-hidden group select-none active:border-[#ff5500]/25 transition-all duration-300"
    >
      {/* Accent color left bar */}
      <div 
        style={{ backgroundColor: accentColor }}
        className="absolute left-0 top-0 bottom-0 w-[3px]" 
      />

      {/* Icon Wrapper with glowing background */}
      <div 
        style={{ backgroundColor: `${accentColor}08`, borderColor: `${accentColor}15` }}
        className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 relative"
      >
        <img src={image} className="w-6 h-6 object-contain" alt="" />
      </div>

      {/* Text column */}
      <div className="flex flex-col text-left">
        <h4 
          style={{ fontFamily: "'Outfit', sans-serif" }}
          className="text-stone-900 font-extrabold text-[12px] tracking-wider uppercase mb-1 transition-colors duration-300 group-active:text-[#ff5500]"
        >
          {title}
        </h4>
        <p className="text-stone-500 text-[10.5px] leading-relaxed font-light">
          {desc}
        </p>
      </div>

    </motion.div>
  );
}

// Structured category data array for mobile slider
const categories = [
  {
    id: 0,
    title: "Encourage Innovation",
    desc: "Push the boundaries of embedded and software development through unconstrained, creative problem solving.",
    accentColor: "#FF5A1F",
    image: imgLightbulb,
    badge: "01 / INNOVATE"
  },
  {
    id: 1,
    title: "Real-World Problems",
    desc: "Industry partners bring live challenges. Your solutions won’t just win prizes — they could see actual deployment.",
    accentColor: "#FF5A1F",
    image: imgTarget,
    badge: "02 / SOLUTIONS"
  },
  {
    id: 2,
    title: "Academia-Industry Bridge",
    desc: "Work alongside industry mentors from Tamizh, Inspire Solutions, and Infintin Mobility Solutions Pvt Ltd.",
    accentColor: "#FF5A1F",
    image: imgBridge,
    badge: "03 / PARTNERSHIPS"
  },
  {
    id: 3,
    title: "Startup Culture",
    desc: "Top solutions may be considered for pilot implementation and incubation support. Think product, not assignment.",
    accentColor: "#FF5A1F",
    image: imgCubes,
    badge: "04 / LAUNCHPAD"
  }
];

// Interactive horizontal card slider for mobile
function AboutMobileSlider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const activeIndex = (page % 4 + 4) % 4;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const activeCategory = categories[activeIndex];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 160 : dir < 0 ? -160 : 0,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 160 : dir > 0 ? -160 : 0,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div className="w-full flex flex-col gap-5 select-none overflow-visible">
      {/* Slider View Area with AnimatePresence */}
      <div className="relative w-full overflow-hidden min-h-[160px] flex items-stretch">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 280, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            className="w-full bg-white border border-stone-200/50 rounded-2xl p-5 flex flex-row items-center justify-between text-left shadow-[0_6px_20px_rgba(28,25,23,0.03)] relative overflow-hidden"
            style={{
              borderColor: `${activeCategory.accentColor}18`,
              boxShadow: `0 8px 24px rgba(28, 25, 23, 0.02), 0 0 20px ${activeCategory.accentColor}02`
            }}
          >
            {/* Colored left bar accent */}
            <div 
              style={{ backgroundColor: activeCategory.accentColor }}
              className="absolute left-0 top-0 bottom-0 w-[4px]" 
            />

            {/* Left Column: Text Content */}
            <div className="flex-1 pr-4 z-10 flex flex-col justify-center">
              <span 
                style={{ fontFamily: "'Outfit', sans-serif", color: activeCategory.accentColor }}
                className="text-[10px] font-extrabold tracking-wider uppercase mb-1"
              >
                {activeCategory.badge}
              </span>
              
              <h4 
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-stone-900 font-extrabold text-[14px] tracking-wide uppercase mb-1.5 leading-tight"
              >
                {activeCategory.title}
              </h4>
              
              <p className="text-stone-550 text-[10.5px] leading-relaxed font-normal">
                {activeCategory.desc}
              </p>
            </div>

            {/* Right Column: 3D Image */}
            <div className="w-20 h-20 shrink-0 flex items-center justify-center relative select-none pointer-events-none z-10">
              <div 
                className="absolute inset-0 rounded-full filter blur-md"
                style={{ backgroundColor: `${activeCategory.accentColor}12` }}
              />
              <img src={activeCategory.image} className="w-16 h-16 object-contain relative z-10 animate-float" alt="" />
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation and Arrow Row */}
      <div className="flex items-center justify-between px-1.5 w-full select-none mt-1">
        
        {/* Left Arrow Button */}
        <button
          onClick={() => paginate(-1)}
          className="w-8 h-8 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center text-stone-500 active:text-[#FF5A1F] active:border-[#FF5A1F]/30 active:scale-95 transition-all duration-200"
        >
          <ChevronLeft size={16} strokeWidth={2.4} />
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5">
          {categories.map((cat, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  const newDir = idx > activeIndex ? 1 : -1;
                  setPage([idx, newDir]);
                }}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: isSelected ? "20px" : "6px",
                  backgroundColor: isSelected ? cat.accentColor : "rgba(220, 220, 220, 0.8)"
                }}
              />
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => paginate(1)}
          className="w-8 h-8 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center text-stone-500 active:text-[#FF5A1F] active:border-[#FF5A1F]/30 active:scale-95 transition-all duration-200"
        >
          <ChevronRight size={16} strokeWidth={2.4} />
        </button>

      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-80px)] pt-12 pb-6 md:pt-14 md:pb-6 px-4 md:px-6 max-w-7xl mx-auto border-t border-stone-200/50 relative overflow-visible rounded-3xl z-10"
    >
      {/* Background Soft Glows & Corner Gradient Shades */}
      <div className="absolute top-1/4 left-10 w-[45vw] h-[45vw] max-w-[400px] max-h-[400px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle, rgba(245, 158, 11, 0.03) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-10 w-[45vw] h-[45vw] max-w-[400px] max-h-[400px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle, rgba(255, 90, 31, 0.03) 0%, transparent 70%)" }} />
      
      {/* Top Right Gradient Shade */}
      <div className="absolute -top-16 md:-top-24 -right-16 md:-right-32 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle at top right, rgba(255, 90, 31, 0.15) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 70%)" }} />
      
      {/* Bottom Left Gradient Shade */}
      <div className="absolute -bottom-16 md:-bottom-24 -left-16 md:-left-32 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle at bottom left, rgba(255, 90, 31, 0.15) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 70%)" }} />

      <div className="flex flex-col md:flex-row items-start justify-start gap-12 md:gap-20 relative z-10 w-full">
        
        {/* Left Column: Heading and Description */}
        <ScrollReveal className="w-full md:w-[38%] lg:w-[36%] flex flex-col items-center text-center md:items-start md:text-left pt-2 md:pt-0 md:-mt-[35px]">
          <div className="bg-white shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-stone-200/50 rounded-full px-4 py-1.5 flex items-center gap-2 mb-6 select-none">
            <Zap size={11} className="text-[#FF5A1F] fill-[#FF5A1F]/15" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#FF5A1F]">
              What is Inception?
            </span>
          </div>

          <h2
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className="text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight text-stone-900 flex flex-col items-center md:items-start leading-[0.95] uppercase select-none w-full"
          >
            <span>Engineer.</span>
            <span className="text-[#FF5A1F] my-1">Innovate.</span>
            <span>Launch.</span>
          </h2>
          
          <div className="h-[2px] w-12 bg-[#FF5A1F] mt-6 mb-6 rounded-full" />
          
          <p className="text-stone-500 text-sm md:text-[14.5px] leading-relaxed font-normal max-w-[280px] lg:max-w-[320px] text-center md:text-left">
            Uniting innovation, purpose,<br />and people to build solutions<br />that matter.
          </p>
        </ScrollReveal>

        {/* Mobile View Interactive Card Slider (Visible on mobile only) */}
        <div className="md:hidden w-full mt-4">
          <AboutMobileSlider />
        </div>

        {/* Right Column: Interactive Orbital Track System */}
        <div className="hidden md:flex flex-1 items-center justify-start relative min-h-[440px] overflow-visible">
          
          {/* Responsive scale wrapper to fit orbit perfectly on mobile viewports */}
          <div className="scale-[0.62] xs:scale-[0.7] sm:scale-[0.85] md:scale-[0.8] lg:scale-100 origin-left transition-transform duration-300 flex items-center justify-center shrink-0 w-[560px] h-[420px] relative">
            
            {/* Orbital system container (unrotated relative parent for nodes) */}
            <div className="w-[560px] h-[420px] relative">
              
              {/* Concentric Elliptical Tracks (SVG for dashed/solid design matching image) */}
              <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 560 420">
                <g transform="rotate(-19, 280, 210)">
                  {/* Track 1 (Outer dashed track passing through nodes) */}
                  <ellipse cx="280" cy="210" rx="260" ry="150" fill="none" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="1" strokeDasharray="4 4" />
                  
                  {/* Track 2 */}
                  <ellipse cx="280" cy="210" rx="195" ry="112.5" fill="none" stroke="rgba(220, 220, 220, 0.45)" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {/* Track 3 */}
                  <ellipse cx="280" cy="210" rx="130" ry="75" fill="none" stroke="rgba(220, 220, 220, 0.3)" strokeWidth="1" />
                  
                  {/* Track 4 */}
                  <ellipse cx="280" cy="210" rx="65" ry="37.5" fill="none" stroke="rgba(220, 220, 220, 0.2)" strokeWidth="1" />

                  {/* Path helpers for animateMotion */}
                  <path id="trackPath1" d="M 540,210 A 260,150 0 1,1 20,210 A 260,150 0 1,1 540,210" fill="none" stroke="none" />
                  <path id="trackPath2" d="M 475,210 A 195,112.5 0 1,0 85,210 A 195,112.5 0 1,0 475,210" fill="none" stroke="none" />
                  <path id="trackPath3" d="M 410,210 A 130,75 0 1,1 150,210 A 130,75 0 1,1 410,210" fill="none" stroke="none" />

                  {/* Static orange dots matching mockup positions exactly */}
                  {/* Dot on outer track at 220 degrees */}
                  <circle cx={280 + 260 * -0.766} cy={210 + 150 * -0.643} r="3.5" fill="#FF5A1F" />
                  {/* Dot on outer track at 40 degrees */}
                  <circle cx={280 + 260 * 0.766} cy={210 + 150 * 0.643} r="3.5" fill="#FF5A1F" />
                  {/* Dot on track 2 at 310 degrees */}
                  <circle cx={280 + 195 * 0.643} cy={210 + 112.5 * -0.766} r="3" fill="#FF5A1F" opacity="0.8" />
                  {/* Dot on track 2 at 130 degrees */}
                  <circle cx={280 + 195 * -0.643} cy={210 + 112.5 * 0.766} r="3" fill="#FF5A1F" opacity="0.8" />
                  {/* Dot on track 3 at 80 degrees */}
                  <circle cx={280 + 130 * 0.174} cy={210 + 75 * 0.985} r="2.5" fill="#FF5A1F" opacity="0.6" />

                  {/* Animated traveling nodes along paths */}
                  <circle r="4" fill="#FF5A1F" className="shadow-[0_0_8px_#FF5A1F]">
                    <animateMotion dur="32s" repeatCount="indefinite">
                      <mpath href="#trackPath1" />
                    </animateMotion>
                  </circle>
                  <circle r="3" fill="#FF5A1F" opacity="0.8">
                    <animateMotion dur="24s" repeatCount="indefinite">
                      <mpath href="#trackPath2" />
                    </animateMotion>
                  </circle>
                  <circle r="2.5" fill="#FF5A1F" opacity="0.65">
                    <animateMotion dur="16s" repeatCount="indefinite">
                      <mpath href="#trackPath3" />
                    </animateMotion>
                  </circle>
                </g>
              </svg>

              {/* Central pulsing sun core (renders exactly at center of tracks) */}
              <div className="absolute left-[280px] top-[210px] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FF5A1F]/10 flex items-center justify-center pointer-events-none">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF5A1F] shadow-[0_0_12px_#FF5A1F] animate-pulse" />
                <div className="absolute w-8 h-8 rounded-full border border-[#FF5A1F]/25 animate-ping-slow" />
                <div className="absolute w-8 h-8 rounded-full border border-[#FF5A1F]/15 animate-ping-slower" />
              </div>

              {/* Orbit Nodes with upright text labels (pre-calculated rotated coordinates) */}
              
              {/* 1. Top Node: Encourage Innovation */}
              <OrbitNode
                image={imgLightbulb}
                title1="Encourage"
                title2="Innovation"
                desc={
                  <span>
                    Push the boundaries of<br />
                    embedded and software<br />
                    development.
                  </span>
                }
                positionStyle={{ left: "calc(50% - 27px)", top: "calc(50% - 149px)" }}
                labelPosition="left"
                labelVerticalAlign="-translate-y-[68%]"
                delay={0.1}
              />

              {/* 2. Right Node: Real-World Problems */}
              <OrbitNode
                image={imgTarget}
                title1="Real-World"
                title2="Problems"
                desc={
                  <span>
                    Solve challenges that<br />
                    matter in industry and<br />
                    society.
                  </span>
                }
                positionStyle={{ left: "calc(50% + 250px)", top: "calc(50% - 48px)" }}
                labelPosition="right"
                delay={0.2}
              />

              {/* 3. Bottom Node: Startup Culture */}
              <OrbitNode
                image={imgCubes}
                title1="Startup"
                title2="Culture"
                desc={
                  <span>
                    Support early ideas and<br />
                    pilot-ready solutions.
                  </span>
                }
                positionStyle={{ left: "calc(50% + 27px)", top: "calc(50% + 149px)" }}
                labelPosition="right"
                labelVerticalAlign="translate-y-[50%]"
                delay={0.3}
              />

              {/* 4. Left Node: Academia-Industry Bridge */}
              <OrbitNode
                image={imgBridge}
                title1="Academia-Industry"
                title2="Bridge"
                desc={
                  <span>
                    Connect with mentors<br />
                    and industry partners.
                  </span>
                }
                positionStyle={{ left: "calc(50% - 250px)", top: "calc(50% + 48px)" }}
                labelPosition="left"
                delay={0.4}
              />

            </div>
          </div>
        </div>

      </div>

      {/* Bottom Summary Glass Card Panel */}
      <div className="glass-panel w-full py-4 px-6 md:py-5 md:px-8 rounded-[24px] border border-stone-200/50 bg-white/40 flex flex-col md:flex-row justify-between items-stretch gap-8 md:gap-4 mt-10 relative overflow-hidden select-none shadow-[0_12px_32px_-8px_rgba(28,25,23,0.04)]">
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-500/[0.01] via-transparent to-amber-500/[0.01] pointer-events-none" />
        
        {/* Item 1 */}
        <div className="flex items-center gap-4 relative z-10 flex-1 pl-2">
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <img src={imgMagnifyingGlass} className="w-11 h-11 object-contain select-none pointer-events-none" alt="" />
          </div>
          <div className="flex flex-col text-left">
            <span style={{ fontFamily: "'Outfit', sans-serif" }} className="text-stone-900 font-extrabold text-[12px] tracking-wider uppercase leading-none">
              Ideas Connect
            </span>
            <span className="text-stone-500 text-[10px] leading-relaxed font-light mt-1.5 max-w-[190px]">
              Where curiosity meets real-world opportunities.
            </span>
          </div>
        </div>

        {/* Divider 1 */}
        <div className="hidden md:block w-[1px] bg-stone-200/60 self-stretch my-2 opacity-50" />

        {/* Item 2 */}
        <div className="flex items-center gap-4 relative z-10 flex-1 pl-2">
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <img src={imgCollaboration} className="w-11 h-11 object-contain select-none pointer-events-none" alt="" />
          </div>
          <div className="flex flex-col text-left">
            <span style={{ fontFamily: "'Outfit', sans-serif" }} className="text-stone-900 font-extrabold text-[12px] tracking-wider uppercase leading-none">
              Collaborate
            </span>
            <span className="text-stone-500 text-[10px] leading-relaxed font-light mt-1.5 max-w-[190px]">
              Work alongside bright minds from diverse backgrounds.
            </span>
          </div>
        </div>

        {/* Divider 2 */}
        <div className="hidden md:block w-[1px] bg-stone-200/60 self-stretch my-2 opacity-50" />

        {/* Item 3 */}
        <div className="flex items-center gap-4 relative z-10 flex-1 pl-2">
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <img src={imgNetwork} className="w-11 h-11 object-contain select-none pointer-events-none" alt="" />
          </div>
          <div className="flex flex-col text-left">
            <span style={{ fontFamily: "'Outfit', sans-serif" }} className="text-stone-900 font-extrabold text-[12px] tracking-wider uppercase leading-none">
              Build Solutions
            </span>
            <span className="text-stone-500 text-[10px] leading-relaxed font-light mt-1.5 max-w-[190px]">
              Turn ideas into impactful prototypes and products.
            </span>
          </div>
        </div>

        {/* Divider 3 */}
        <div className="hidden md:block w-[1px] bg-stone-200/60 self-stretch my-2 opacity-50" />

        {/* Item 4 */}
        <div className="flex items-center gap-4 relative z-10 flex-1 pl-2">
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <img src={imgMentorsPlatform} className="w-11 h-11 object-contain select-none pointer-events-none" alt="" />
          </div>
          <div className="flex flex-col text-left">
            <span style={{ fontFamily: "'Outfit', sans-serif" }} className="text-stone-900 font-extrabold text-[12px] tracking-wider uppercase leading-none">
              Create Impact
            </span>
            <span className="text-stone-500 text-[10px] leading-relaxed font-light mt-1.5 max-w-[190px]">
              Deliver solutions that shape a better tomorrow.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
