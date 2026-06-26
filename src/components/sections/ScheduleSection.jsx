import { useRef, useMemo, useState } from "react";
import { motion, useScroll, useSpring, useInView } from "motion/react";
import { 
  User, 
  Megaphone, 
  Code2, 
  Box, 
  Users, 
  Puzzle, 
  Flag, 
  Rocket, 
  ShieldAlert,
  Lock, 
  Presentation, 
  Trophy, 
  Zap 
} from "lucide-react";
import BorderBeam from "../BorderBeam";
import ScrollReveal from "../ScrollReveal";
import AnimatedTabs from "../AnimatedTabs";
import { day1Schedule, day2Schedule } from "../../data/siteData";

// Helper to determine icon, badge label, and color theme for each timeline event
const getMobileNodeMeta = (item) => {
  switch (item.text) {
    case "Registration & Arrival":
      return {
        icon: User,
        badgeText: "START",
        colorClass: "text-[#ff5500] bg-[#ff5500]/8 border-[#ff5500]/15",
        badgeClass: "bg-[#ff5500]/8 text-[#ff5500]"
      };
    case "Inauguration & Briefing":
      return {
        icon: Megaphone,
        badgeText: "SESSION",
        colorClass: "text-amber-500 bg-amber-500/8 border-amber-500/15",
        badgeClass: "bg-amber-500/8 text-amber-500"
      };
    case "Hackathon Begins":
      return {
        icon: Code2,
        badgeText: "BUILD",
        colorClass: "text-[#ef4444] bg-[#ef4444]/8 border-[#ef4444]/15",
        badgeClass: "bg-[#ef4444]/8 text-[#ef4444]"
      };
    case "Constraint 1 Released":
      return {
        icon: Box,
        badgeText: "MILESTONE",
        colorClass: "text-purple-500 bg-purple-500/8 border-purple-500/15",
        badgeClass: "bg-purple-500/8 text-purple-500"
      };
    case "Review 1 with Mentors":
      return {
        icon: Users,
        badgeText: "CONNECT",
        colorClass: "text-blue-500 bg-blue-500/8 border-blue-500/15",
        badgeClass: "bg-blue-500/8 text-blue-500"
      };
    case "Constraint 2 Released":
      return {
        icon: Puzzle,
        badgeText: "CHALLENGE",
        colorClass: "text-orange-500 bg-orange-500/8 border-orange-500/15",
        badgeClass: "bg-orange-500/8 text-orange-500"
      };
    case "Day 1 Ends":
      return {
        icon: Flag,
        badgeText: "FINISH",
        colorClass: "text-emerald-500 bg-emerald-500/8 border-emerald-500/15",
        badgeClass: "bg-emerald-500/8 text-emerald-500"
      };
    case "Hackathon Resumes":
      return {
        icon: Rocket,
        badgeText: "RESUME",
        colorClass: "text-[#ff5500] bg-[#ff5500]/8 border-[#ff5500]/15",
        badgeClass: "bg-[#ff5500]/8 text-[#ff5500]"
      };
    case "Review 2 with Mentors":
      return {
        icon: Users,
        badgeText: "CONNECT",
        colorClass: "text-blue-500 bg-blue-500/8 border-blue-500/15",
        badgeClass: "bg-blue-500/8 text-blue-500"
      };
    case "Final Progress Check":
      return {
        icon: ShieldAlert,
        badgeText: "CHECK",
        colorClass: "text-indigo-500 bg-indigo-500/8 border-indigo-500/15",
        badgeClass: "bg-indigo-500/8 text-indigo-500"
      };
    case "Hackathon Ends":
      return {
        icon: Lock,
        badgeText: "FINISH",
        colorClass: "text-red-500 bg-red-500/8 border-red-500/15",
        badgeClass: "bg-red-500/8 text-red-500"
      };
    case "Final Presentations & Judging":
      return {
        icon: Presentation,
        badgeText: "PITCH",
        colorClass: "text-amber-500 bg-amber-500/8 border-amber-500/15",
        badgeClass: "bg-amber-500/8 text-amber-500"
      };
    case "Valedictory & Prize Distribution":
      return {
        icon: Trophy,
        badgeText: "AWARDS",
        colorClass: "text-yellow-600 bg-yellow-500/8 border-yellow-500/15",
        badgeClass: "bg-yellow-500/8 text-yellow-650"
      };
    default:
      return {
        icon: Zap,
        badgeText: "EVENT",
        colorClass: "text-stone-550 bg-stone-100 border-stone-200",
        badgeClass: "bg-stone-100 text-stone-555"
      };
  }
};

// ─── MOBILE VIEW COMPONENTS (As per user's reference image) ───────────────────
function MobileTimelineRow({ item, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  const meta = getMobileNodeMeta(item);
  const IconComponent = meta.icon;

  const activeColor = 
    item.type === "orange"
      ? "#ff5500"
      : item.type === "warning"
      ? "#ff8c42"
      : item.type === "danger"
      ? "#ef4444"
      : "#ff5500";

  return (
    <div 
      ref={ref} 
      className={`relative flex items-stretch min-h-[90px] py-4 ${
        !isLast ? "border-b border-stone-100/80" : ""
      }`}
    >
      {/* 1. Left: Icon + Time + Badge */}
      <div className="w-[115px] shrink-0 flex items-center gap-2 pl-0.5 select-none">
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${meta.colorClass}`}>
          <IconComponent size={15} strokeWidth={2.4} />
        </div>
        <div className="flex flex-col text-left justify-center min-w-0">
          <span 
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className={`text-[10.5px] font-extrabold tracking-tight leading-none mb-1 ${
              isInView ? "text-[#ff5500]" : "text-stone-900"
            }`}
          >
            {item.time}
          </span>
          <span className={`text-[8px] font-extrabold tracking-wider px-1.5 py-0.5 rounded-sm inline-block w-max ${meta.badgeClass}`}>
            {meta.badgeText}
          </span>
        </div>
      </div>

      {/* 2. Middle: Line and Dot */}
      <div className="w-[30px] shrink-0 flex items-center justify-center relative">
        <div className="absolute top-0 bottom-0 w-[1.5px] bg-stone-200/60" />
        <motion.div
          animate={{
            scale: isInView ? 1.35 : 1,
            borderColor: isInView ? activeColor : "#d6d3d1",
            backgroundColor: isInView ? "#ffffff" : "#d6d3d1",
          }}
          className="w-3.5 h-3.5 rounded-full border-[2.5px] z-10 flex items-center justify-center relative bg-white transition-all duration-300 shadow-sm"
        >
          {isInView && (
            <motion.div 
              layoutId="mobile-pulse-core"
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: activeColor }}
            />
          )}
        </motion.div>
      </div>

      {/* 3. Right: Title + Description */}
      <div className="flex-1 flex flex-col justify-center pl-3 pr-0.5">
        <h4 
          style={{ fontFamily: "'Outfit', sans-serif" }}
          className={`text-[12.5px] font-bold leading-snug mb-1 transition-colors duration-300 ${
            isInView ? "text-[#ff5500]" : "text-stone-900"
          }`}
        >
          {item.text}
        </h4>
        <p className="text-stone-500 text-[10.5px] leading-relaxed font-light">
          {item.desc}
        </p>
      </div>

    </div>
  );
}

function MobileTimelineCard({ title, items }) {
  return (
    <div className="flex flex-col items-center w-full mb-12 last:mb-0">
      <div className="w-full bg-white/90 border border-stone-200/50 shadow-[0_12px_40px_-12px_rgba(28,25,23,0.05)] rounded-3xl p-4 relative overflow-hidden backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-50/[0.01] via-transparent to-amber-500/[0.01] pointer-events-none" />
        <div className="flex flex-col w-full relative animate-fadeIn duration-500">
          {items.map((item, idx) => (
            <MobileTimelineRow 
              key={idx} 
              item={item} 
              index={idx} 
              isLast={idx === items.length - 1} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DESKTOP/TABLET VIEW COMPONENTS ──────────────────────────────────────────
function LuminousNode({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  const activeColor = 
    item.type === "orange"
      ? "#ff5500"
      : item.type === "warning"
      ? "#ff8c42"
      : item.type === "danger"
      ? "#ef4444"
      : "#ff5500";

  return (
    <div 
      ref={ref} 
      className={`relative flex items-center ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row pl-12 md:pl-0 w-full`}
    >
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-25">
        <motion.div
          animate={{ 
            scale: isInView ? 1.4 : 1, 
            backgroundColor: isInView ? "#ffffff" : "#f5f5f4",
            borderColor: isInView ? activeColor : "#d6d3d1"
          }}
          className="w-4 h-4 rounded-full border-2 z-20 transition-all duration-500 flex items-center justify-center relative shadow-sm"
        >
          {isInView && (
            <>
              <motion.div 
                layoutId="pulse-core" 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ backgroundColor: activeColor }}
              />
              <motion.div 
                layoutId="pulse-glow" 
                className="absolute inset-0 rounded-full blur-[4px] animate-ping opacity-40" 
                style={{ backgroundColor: activeColor }}
              />
            </>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full md:w-[45%] p-5 md:p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 group shadow-[0_8px_32px_rgba(28,25,23,0.02)] relative overflow-hidden bg-white/45 ${
          index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
        } ${
          isInView 
            ? "border-[#ff5500]/25 shadow-[0_12px_36px_rgba(255,85,0,0.04)]" 
            : "border-stone-200/60 hover:border-[#ff5500]/15"
        }`}
      >
        {isInView && (item.type === "orange" || item.type === "danger") && (
          <BorderBeam size={0.25} duration={6} colorFrom={activeColor} colorTo="#ff8c42" />
        )}

        <div className="flex items-center justify-between gap-2 mb-2.5 select-none">
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-stone-400 font-bold">
            {item.dayLabel}
          </span>
          <span className={`text-[10px] md:text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
            item.type === "orange" 
              ? "bg-[#ff5500]/8 text-[#ff5500]" 
              : item.type === "warning"
              ? "bg-[#ff8c42]/8 text-[#ff8c42]"
              : item.type === "danger"
              ? "bg-red-500/8 text-red-500"
              : "bg-stone-100 text-stone-555"
          }`}>
            {item.time}
          </span>
        </div>

        <h3 
          style={{ fontFamily: "'Outfit', sans-serif" }}
          className={`text-lg md:text-xl font-bold mb-2 transition-colors duration-300 ${
            isInView ? "text-[#ff5500]" : "text-stone-900 group-hover:text-[#ff5500]"
          }`}
        >
          {item.text}
        </h3>
        
        <p className="text-stone-500 text-xs md:text-[13px] leading-relaxed font-light">
          {item.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function ScheduleSection() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  
  // Memoize separate data for mobile cards & combined data for desktop
  const day1ScheduleWithLabel = useMemo(() => {
    return day1Schedule.map(item => ({ ...item, dayLabel: "DAY 1 — MARCH 26" }));
  }, []);

  const day2ScheduleWithLabel = useMemo(() => {
    return day2Schedule.map(item => ({ ...item, dayLabel: "DAY 2 — MARCH 27" }));
  }, []);

  // Selected schedule depending on the active tab
  const schedule = useMemo(() => {
    return activeTab === 0 ? day1ScheduleWithLabel : day2ScheduleWithLabel;
  }, [activeTab, day1ScheduleWithLabel, day2ScheduleWithLabel]);

  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start end", "end end"] 
  });
  
  const scaleY = useSpring(scrollYProgress, { stiffness: 85, damping: 25 });

  const mobileCardTitle = activeTab === 0 ? "Day 1 — March 26" : "Day 2 — March 27";

  return (
    <section 
      id="timeline" 
      ref={containerRef}
      className="py-16 md:py-28 px-4 md:px-6 max-w-5xl mx-auto border-t border-stone-200/50 relative overflow-visible rounded-3xl"
    >
      <div className="absolute top-10 left-10 w-[40vw] h-[40vw] max-w-[350px] max-h-[350px] rounded-full pointer-events-none -z-20" style={{ background: "radial-gradient(circle, rgba(255, 85, 0, 0.03) 0%, transparent 70%)" }} />
      <div className="absolute bottom-10 right-10 w-[40vw] h-[40vw] max-w-[350px] max-h-[350px] rounded-full pointer-events-none -z-20" style={{ background: "radial-gradient(circle, rgba(255, 85, 0, 0.02) 0%, transparent 70%)" }} />

      {/* Section Header */}
      <ScrollReveal className="text-center mb-16 relative select-none">
        <motion.div
          initial={{ letterSpacing: "0.05em", opacity: 0, scale: 0.85 }}
          whileInView={{ letterSpacing: "0.25em", opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 text-8xl md:text-9xl font-black text-stone-200/15 select-none pointer-events-none font-sans"
        >
          03
        </motion.div>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#e04d00] bg-[#ff5500]/8 px-4 py-2 rounded-full inline-flex items-center mb-4 shadow-sm border border-[#ff5500]/5 relative z-10">
          Event Timeline
        </span>
        <h2
          style={{ fontFamily: "'Outfit', sans-serif" }}
          className="text-2xl md:text-4xl font-bold uppercase tracking-wider text-[#1c1917] relative z-10"
        >
          24 Hours of <span className="text-[#ff5500]">Pure Build</span>
        </h2>
        <p className="text-stone-500 text-xs md:text-sm tracking-widest mt-3.5 relative z-10 font-semibold uppercase select-none">
          Build. Learn. Create impact.
        </p>
        <div className="h-[3px] w-16 bg-gradient-to-r from-[#ff5500] to-[#ff8c42] mx-auto mt-4 rounded-full relative z-10" />
      </ScrollReveal>

      {/* Day Toggler */}
      <ScrollReveal className="mb-14 relative z-20">
        <AnimatedTabs
          tabs={["Day 1 - March 26", "Day 2 - March 27"]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </ScrollReveal>

      {/* DESKTOP VIEW: Alternating Luminous Cards */}
      <div className="hidden md:block relative max-w-4xl mx-auto mt-2">
        <div className="absolute left-[15px] md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-stone-200/60 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="w-full h-full bg-gradient-to-b from-[#ff5500] via-[#ff8c42] to-[#ff5500] shadow-[0_0_12px_rgba(255,85,0,0.6)]"
          />
        </div>

        <div className="space-y-12 md:space-y-16 relative w-full">
          {schedule.map((item, idx) => (
            <LuminousNode key={`${activeTab}-${idx}`} item={item} index={idx} />
          ))}
        </div>
      </div>

      {/* MOBILE VIEW: Compact Table-Style Cards as per user's reference image */}
      <div className="md:hidden relative w-full max-w-[420px] mx-auto mt-2">
        <MobileTimelineCard 
          key={activeTab}
          title={mobileCardTitle} 
          items={schedule} 
        />
      </div>

      {/* Bottom Day Navigation Button */}
      <ScrollReveal className="flex justify-center mt-12 md:mt-16">
        {activeTab === 0 ? (
          <button
            onClick={() => {
              setActiveTab(1);
              document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group px-6 py-3 bg-[#FF5A1F] text-white font-extrabold text-[10px] tracking-[0.18em] uppercase rounded-full hover:bg-[#E04D00] shadow-[0_6px_18px_rgba(255,90,31,0.18)] hover:shadow-[0_8px_22px_rgba(255,90,31,0.28)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-2 select-none cursor-pointer"
          >
            <span>See Day 2 Schedule</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="inline-block"
            >
              →
            </motion.span>
          </button>
        ) : (
          <button
            onClick={() => {
              setActiveTab(0);
              document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group px-6 py-3 bg-white border border-[#FF5A1F]/30 text-[#FF5A1F] font-extrabold text-[10px] tracking-[0.18em] uppercase rounded-full hover:bg-[#FF5A1F]/5 shadow-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-2 select-none cursor-pointer"
          >
            <motion.span
              animate={{ x: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="inline-block"
            >
              ←
            </motion.span>
            <span>Back To Day 1</span>
          </button>
        )}
      </ScrollReveal>

    </section>
  );
}
