import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap } from "lucide-react";
import GlowingCard from "../GlowingCard";
import ScrollReveal from "../ScrollReveal";
import imageDetailsBG from "../../assets/Image_Details_BG.png";
import imgSaturn from "../../assets/3d_saturn.png";

// The Saturn/Sun component matching the design aesthetic
function SunSystem() {
  return (
    <div className="absolute right-[-18%] top-[-15%] w-[390px] h-[390px] pointer-events-none select-none z-10 flex items-center justify-center">
      {/* 3D Saturn Image */}
      <img
        src={imgSaturn}
        alt="3D Saturn"
        className="w-[350px] h-auto object-contain z-10 animate-float opacity-80"
      />
    </div>
  );
}

export default function DetailsSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeIndexRef = useRef(0);

  // Helper to calculate top offset relative to document
  const getElementTop = (el) => {
    let top = 0;
    while (el) {
      top += el.offsetTop;
      el = el.offsetParent;
    }
    return top;
  };

  // Custom Smooth Scroll Animator using native smooth behavior (delegated to Lenis)
  const animateScrollTo = useCallback((target, index) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
    window.scrollTo({
      top: target,
      behavior: "smooth"
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrolledPast = -rect.top;
      const totalScrollRange = rect.height - window.innerHeight;

      let index = 0;
      if (rect.top > 0) {
        index = 0;
      } else if (scrolledPast >= totalScrollRange) {
        index = 3;
      } else {
        const progress = scrolledPast / totalScrollRange;
        index = Math.min(3, Math.floor(progress * 4));
      }

      if (activeIndexRef.current !== index) {
        activeIndexRef.current = index;
        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const steps = useMemo(() => [
    {
      num: "01",
      title: "Eligibility & Format",
      shortDesc: "Inter-college design hackathon for UG engineering students. March 26–27, 2025 at LICET Campus.",
      watermark: "FORMAT",
      title1: "ELIGIBILITY",
      title2: "& FORMAT.",
      bullets: [
        "Open to all undergraduate engineering students across all colleges and departments.",
        "Teams must be composed of exactly 4 members to balance hardware and software roles.",
        "Offline development format conducted at G01 & F11 Laboratories, LICET Campus.",
        "Duration is 24 hours of live building, prototyping, and pitch preparations."
      ],
      sphereGlow: "from-[#e04d00] via-[#ff5500] to-[#ffb088]",
      sphereShadow: "rgba(255,85,0,0.22)"
    },
    {
      num: "02",
      title: "Partners & Mentors",
      shortDesc: "Active guidance from industry leaders: Tamizh, Inspire Solutions, and Infintin Mobility.",
      watermark: "MENTORS",
      title1: "PARTNERS",
      title2: "& MENTORS.",
      bullets: [
        "Tamizh — offering industry-aligned embedded system tools, components, and advisory.",
        "Inspire Solutions — providing Cloud & IoT development infrastructure and APIs.",
        "Infintin Mobility Solutions — offering specialized mentoring and tech check-ins."
      ],
      sphereGlow: "from-[#b45309] via-[#f59e0b] to-[#fde68a]",
      sphereShadow: "rgba(245,158,11,0.22)"
    },
    {
      num: "03",
      title: "Rules & Instructions",
      shortDesc: "24-hour offline build rules. Bring your own laptops and hardware components.",
      watermark: "RULES",
      title1: "RULES",
      title2: "& INSTRUCTIONS.",
      bullets: [
        "Bring your own development laptops and multi-plug extension boxes.",
        "All hardware components and development modules must be carried by teams.",
        "No pre-coded templates. All code must be written during the offline window.",
        "Plagiarism or utilizing unauthorized pre-made designs results in disqualification."
      ],
      sphereGlow: "from-[#854d0e] via-[#eab308] to-[#fef9c3]",
      sphereShadow: "rgba(234,179,8,0.22)"
    },
    {
      num: "04",
      title: "Screening & shortlisting",
      shortDesc: "Online screening quiz, early problem release, and surprise constraints.",
      watermark: "SCREENING",
      title1: "SCREENING",
      title2: "& SHORTLISTING.",
      bullets: [
        "Online Quiz Screening — a preliminary assessment of core technical concepts.",
        "Shortlist Announcement — results published within 2 days after the quiz closes.",
        "Problem Statement Release — core prompts shared 48 hours prior for architectural planning.",
        "Live Surprise Constraints — two surprise parameters announced during the hackathon to test adaptability."
      ],
      sphereGlow: "from-[#ea580c] via-[#f97316] to-[#ffedd5]",
      sphereShadow: "rgba(249,115,22,0.22)"
    }
  ], []);



  const handleStepClick = (index) => {
    if (!containerRef.current) return;
    const totalScrollRange = containerRef.current.offsetHeight - window.innerHeight;
    const S_start = getElementTop(containerRef.current) - 112;
    const targetScroll = S_start + (index / 3) * totalScrollRange;
    
    animateScrollTo(targetScroll, index);
  };

  const activeStep = steps[activeIndex];

  return (
    <section id="details" className="w-full py-16 md:py-24 border-t border-stone-200/50 relative overflow-visible z-10">
      
      {/* Pinned Viewport Full-Width Background Image */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <img
            src={imageDetailsBG}
            alt=""
            className="w-full h-full object-cover object-left opacity-95 select-none"
          />
        </div>
      </div>

      {/* Smooth transition edge overlays */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#faf9f6] to-transparent pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#faf9f6] to-transparent pointer-events-none -z-10" />

      <div className="absolute bottom-10 right-0 w-[50vw] h-[50vw] max-w-[450px] max-h-[450px] bg-[#ff8c42]/6 rounded-full filter blur-[110px] pointer-events-none -z-20 animate-slow-pulse-3" />

      {/* Centered Content Wrapper */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative">

      {/* Main Section Header (mobile only, scrolls normally first) */}
      <ScrollReveal className="lg:hidden text-center mb-10 relative">
        <motion.div
          initial={{ letterSpacing: "0.05em", opacity: 0, scale: 0.85 }}
          whileInView={{ letterSpacing: "0.25em", opacity: 0.15, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 text-8xl md:text-9xl font-black text-stone-200/15 select-none pointer-events-none font-sans"
        >
          02
        </motion.div>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#e04d00] bg-[#ff5500]/8 px-4 py-2 rounded-full inline-flex items-center shadow-sm border border-[#ff5500]/5 relative z-10">
          Event Details
        </span>
      </ScrollReveal>

      {/* ─── DESKTOP STICKY SCROLL LAYOUT (lg and up) ─────────────────────────── */}
      <div ref={containerRef} className="hidden lg:block relative h-[380vh] w-full mt-2">
        <div className="sticky top-28 h-[78vh] max-h-[640px] w-full flex flex-col gap-4">
          
          {/* Pinned Desktop Header */}
          <div className="text-center relative select-none shrink-0 pt-2 pb-1">
            <div 
              className="absolute -top-10 left-1/2 -translate-x-1/2 text-7xl font-black text-stone-200/10 select-none pointer-events-none font-sans"
            >
              02
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e04d00] bg-[#ff5500]/8 px-3.5 py-1.5 rounded-full inline-flex items-center shadow-sm border border-[#ff5500]/5 relative z-10">
              Event Details
            </span>
          </div>

          {/* Columns Container */}
          <div className="flex-1 flex gap-6 items-stretch min-h-0">
          
          {/* Left Column: Steps Navigation */}
          <div className="w-[32%] glass-panel py-8 px-6 border border-stone-200/50 rounded-3xl flex flex-col justify-center bg-white/40 shadow-sm relative overflow-hidden select-none">
            <div className="relative pl-6 flex flex-col justify-between h-[85%] gap-4">
              
              {/* Vertical timeline line */}
              <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-stone-200/60" />
              
              {steps.map((step, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div 
                    key={idx}
                    onClick={() => handleStepClick(idx)}
                    className="relative flex gap-4 cursor-pointer py-5 group transition-all duration-300"
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="detailsActiveDot" 
                        className="w-3.5 h-3.5 rounded-full bg-[#ff5500] absolute left-[-23px] top-[32px] -translate-x-1/2 shadow-[0_0_10px_rgba(255,85,0,0.6)] z-10"
                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                      />
                    )}
                    
                    <span 
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      className={`text-5xl font-normal transition-colors duration-300 w-12 shrink-0 select-none leading-none ${
                        isActive ? "text-[#ff5500]" : "text-stone-300 group-hover:text-stone-400"
                      }`}
                    >
                      {step.num}
                    </span>
                    
                    <div className="flex flex-col justify-center">
                      <h4 className={`font-bold text-sm tracking-wider transition-colors duration-300 uppercase ${
                        isActive ? "text-[#ff5500]" : "text-stone-700 group-hover:text-[#ff5500]"
                      }`}>
                        {step.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Card Details */}
          <div className="w-[68%] glass-panel rounded-3xl border border-stone-200/50 shadow-sm relative overflow-visible bg-white/40 flex flex-col justify-between p-10 min-h-[520px]">
            
            <div className="absolute inset-0 bg-gradient-to-tr from-stone-500/[0.01] via-transparent to-amber-500/[0.02] pointer-events-none" />

            <AnimatePresence>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute inset-0 p-10 flex flex-col justify-start z-20"
              >
                {/* Background Watermark Ghost Number */}
                <div 
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  className="absolute top-[-2%] right-[-5%] text-[20rem] font-normal text-stone-200/10 select-none pointer-events-none leading-none z-0"
                >
                  {activeStep.num}
                </div>

                {/* Background Watermark Faded Text */}
                <div className="absolute bottom-6 left-10 text-7xl font-black tracking-widest text-stone-200 opacity-[0.03] select-none pointer-events-none uppercase font-sans z-0">
                  {activeStep.watermark}
                </div>

                {/* Orbiting rings system */}
                <SunSystem sphereGlow={activeStep.sphereGlow} sphereShadow={activeStep.sphereShadow} />

                {/* Content Area */}
                <div className="relative z-10 max-w-lg">
                  <span 
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    className="bg-[#ff5500] text-white font-normal px-3 py-0.5 text-lg rounded-lg w-max mb-5 inline-block uppercase tracking-wider"
                  >
                    {activeStep.num}
                  </span>

                  <h3
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-850 uppercase leading-tight"
                  >
                    {activeStep.title1}
                  </h3>
                  <h3
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#ff5500] uppercase leading-tight mt-1"
                  >
                    {activeStep.title2}
                  </h3>

                  <p className="text-stone-800 text-sm font-semibold mt-4 max-w-md">
                    {activeStep.shortDesc}
                  </p>

                  <div className="h-[2px] w-16 bg-[#ff5500] my-4 rounded-full" />

                  {/* Bullet points */}
                  <ul className="space-y-3 mt-4 relative z-10">
                    {activeStep.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] shrink-0 mt-2" />
                        <span className="text-stone-600 text-xs md:text-sm leading-relaxed font-light">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </div>
    </div>

      {/* ─── MOBILE SCROLL LAYOUT (below lg) ─────────────────────────────────── */}
      <div className="lg:hidden flex flex-col gap-6 mt-2">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className="glass-panel p-6 rounded-3xl border border-stone-250/20 shadow-sm relative overflow-hidden flex flex-col bg-white/40"
          >
            <div 
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="absolute -top-6 -right-6 text-7xl font-normal text-stone-200/10 pointer-events-none select-none z-0"
            >
              {step.num}
            </div>
            
            <span 
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="bg-[#ff5500] text-white font-normal px-2.5 py-0.5 text-xs rounded-md w-max mb-3 uppercase tracking-wider z-10"
            >
              {step.num}
            </span>
            
            <h3 
              style={{ fontFamily: "'Outfit', sans-serif" }} 
              className="text-lg font-bold uppercase tracking-wider text-stone-850 z-10"
            >
              {step.title}
            </h3>
            
            <div className="h-[2px] w-12 bg-[#ff5500] my-3 rounded-full z-10" />

            <p className="text-stone-800 text-xs font-semibold leading-relaxed mb-2 z-10">
              {step.shortDesc}
            </p>
            
            <ul className="space-y-2 mb-6 z-10">
              {step.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#ff5500] mt-1.5 shrink-0" />
                  <span className="text-stone-600 text-xs leading-relaxed font-light">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="absolute right-3 bottom-16 w-28 h-28 opacity-15 pointer-events-none select-none z-0 flex items-center justify-center">
              <img src={imgSaturn} className="w-full h-full object-contain animate-float opacity-80" alt="" />
            </div>


          </div>
        ))}
      </div>

      </div>
    </section>
  );
}
