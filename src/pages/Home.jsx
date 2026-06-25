import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Navbar from "../components/Navbar";
import ScrollProgress from "../components/ScrollProgress";
import Magnetic from "../components/Magnetic";
import BorderBeam from "../components/BorderBeam";
import ScrollReveal from "../components/ScrollReveal";
import AnimatedTabs from "../components/AnimatedTabs";
import AnimatedShinyButton from "../components/AnimatedShinyButton";
import GlowingCard from "../components/GlowingCard";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { LeftOrnaments, RightOrnaments, MobileOrnaments } from "../components/HeroOrnaments";
import { getPublicState } from "../lib/inceptionApi";

// Lazy-loaded heavy components (reduces initial bundle)
const RegisterModal = lazy(() => import("../components/RegisterModal"));
const OrganizerDashboard = lazy(() => import("../components/sections/OrganizerDashboard"));

// Section components
import AboutSection      from "../components/sections/AboutSection";
import DetailsSection    from "../components/sections/DetailsSection";
import ScheduleSection   from "../components/sections/ScheduleSection";
import JudgingSection    from "../components/sections/JudgingSection";
import RegistrationSection from "../components/sections/RegistrationSection";
import FAQSection        from "../components/sections/FAQSection";

// Data & constants
import { marqueeItems, day1Schedule, day2Schedule, criteriaList } from "../data/siteData";
import {
  STAT_COUNT_DURATION_MS,
  BEAM_SIZE_SMALL, BEAM_SIZE_MEDIUM, BEAM_SIZE_LARGE, BEAM_SIZE_XL,
  BEAM_DURATION_FAST, BEAM_DURATION_NORMAL, BEAM_DURATION_SLOW, BEAM_DURATION_XSL,
  MAGNETIC_RANGE_SM, MAGNETIC_SCALE_SM,
  HACKATHON_START_ISO,
} from "../lib/constants";

// ─── Stat Counter ──────────────────────────────────────────────────────────────
function StatCounter({ target, suffix = "", isText = false }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    if (isText) return;
    let observer;
    let animationFrameId;

    if (elementRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const end = parseInt(target, 10);
            if (isNaN(end)) { setCount(target); return; }
            const startTime = performance.now();

            const animate = (currentTime) => {
              const elapsed  = currentTime - startTime;
              const progress = Math.min(elapsed / STAT_COUNT_DURATION_MS, 1);
              const eased    = 1 - Math.pow(1 - progress, 4); // easeOutQuart
              setCount(Math.floor(eased * end));
              if (progress < 1) animationFrameId = requestAnimationFrame(animate);
              else setCount(end);
            };

            animationFrameId = requestAnimationFrame(animate);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, isText]);

  if (isText) return <span>{target}</span>;
  return <span ref={elementRef}>{count}{suffix}</span>;
}

// ─── Countdown Banner ─────────────────────────────────────────────────────────
const HACKATHON_DATE = new Date(HACKATHON_START_ISO);

function useCountdown() {
  const calc = () => {
    const diff = Math.max(0, HACKATHON_DATE - Date.now());
    return {
      days:  Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins:  Math.floor((diff % 3600000) / 60000),
      secs:  Math.floor((diff % 60000) / 1000),
      past:  diff === 0,
    };
  };
  const [cd, setCd] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setCd(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return cd;
}

function CountdownBanner() {
  const { days, hours, mins, secs, past } = useCountdown();
  const pad = (n) => String(n).padStart(2, "0");
  if (past) return null;
  return (
    <div
      style={{ fontFamily: "'Outfit', monospace" }}
      className="flex items-center justify-center gap-3 py-2 px-5 rounded-2xl bg-white/50 border border-[#ff5500]/10 shadow-sm backdrop-blur-sm text-xs text-stone-600 tracking-widest uppercase w-full max-w-2xl mx-auto mb-4"
    >
      <span className="text-[#ff5500] font-bold text-[10px] tracking-[0.2em]">⏰ Starts in</span>
      <span className="font-mono font-semibold text-stone-800">
        {pad(days)}<span className="text-stone-400 text-[10px]">d</span>&nbsp;
        {pad(hours)}<span className="text-stone-400 text-[10px]">h</span>&nbsp;
        {pad(mins)}<span className="text-stone-400 text-[10px]">m</span>&nbsp;
        <span className="animate-cd-tick">{pad(secs)}</span><span className="text-stone-400 text-[10px]">s</span>
      </span>
    </div>
  );
}



// ─── Home (orchestrator) ──────────────────────────────────────────────────────
export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [publicState, setPublicState] = useState(null);

  const { scrollY, scrollYProgress } = useScroll();
  const heroScale   = useTransform(scrollY, [0, 800], [1, 1.05]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0.35]);
  const gridY       = useTransform(scrollY, [0, 1000], [0, 150]);

  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);
  const settings = publicState?.settings || {};
  const announcements = publicState?.announcements || [];

  const clickCountRef = useRef(0);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShowScrollTop(latest > 400);
    });
  }, [scrollY]);

  useEffect(() => {
    getPublicState()
      .then(setPublicState)
      .catch((error) => console.error("Failed to load Supabase public content:", error));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "o") {
        e.preventDefault();
        setIsDashboardOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleHashLinkClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;
      
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetId = href.substring(1);
        
        if (targetId === "hero") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, null, "#hero");
          return;
        }

        const element = document.getElementById(targetId);
        if (element) {
          e.preventDefault();
          
          let absoluteElementTop = 0;
          let el = element;
          while (el) {
            absoluteElementTop += el.offsetTop;
            el = el.offsetParent;
          }

          const isMobile = window.innerWidth < 1024;
          const navbarOffset = isMobile ? 85 : 112;

          let targetScrollY;
          if (isMobile) {
            // On mobile view, align all sections to top with a consistent offset of 85px (navbar height + safety gap)
            targetScrollY = absoluteElementTop - 85;
          } else {
            // Desktop specific offsets (unchanged)
            if (targetId === "details") {
              const container = element.querySelector('.relative.h-\\[380vh\\]') || element;
              let containerTop = 0;
              let cel = container;
              while (cel) {
                containerTop += cel.offsetTop;
                cel = cel.offsetParent;
              }
              targetScrollY = containerTop - 112;
            } else if (targetId === "about") {
              targetScrollY = absoluteElementTop - 80;
            } else if (targetId === "judging") {
              const sectionHeight = element.offsetHeight || 700;
              const viewportHeight = window.innerHeight;
              targetScrollY = absoluteElementTop - 112 - (viewportHeight - 112 - sectionHeight) / 2;
            } else if (targetId === "timeline") {
              targetScrollY = absoluteElementTop;
            } else if (targetId === "faq") {
              targetScrollY = absoluteElementTop - 20;
            } else {
              targetScrollY = absoluteElementTop - 112;
            }
          }

          targetScrollY = Math.max(0, targetScrollY);

          window.scrollTo({
            top: targetScrollY,
            behavior: "smooth"
          });

          window.history.pushState(null, null, `#${targetId}`);
        }
      }
    };

    document.addEventListener("click", handleHashLinkClick);
    return () => document.removeEventListener("click", handleHashLinkClick);
  }, []);

  const handleLogoClick = () => {
    clickCountRef.current += 1;
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      setIsDashboardOpen(true);
    }
    setTimeout(() => {
      clickCountRef.current = 0;
    }, 1000);
  };

  return (
    <div className="relative min-h-screen text-[#1c1917] selection:bg-[#ff5500] selection:text-white overflow-x-clip">
      <ScrollProgress />

      {/* Background Stacking Layers */}
      <div className="fixed inset-0 -z-30 animated-mesh-bg" />
      
      {/* Fixed background image - resolved parallax empty space & visibility overlay */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <img
          src="/src/assets/Image_Hero_BG_2.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-[0.08] filter grayscale contrast-75"
        />
      </div>

      <div className="fixed inset-0 -z-10 grid-overlay pointer-events-none" />

      <Navbar onRegisterClick={openRegister} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="hero" className="relative flex flex-col items-center justify-center text-center px-6 pt-48 pb-28 w-full max-w-[1400px] mx-auto overflow-visible">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-[#ff5500]/6 rounded-full filter blur-[80px] pointer-events-none -z-20 animate-slow-pulse-1" />



        {/* Left and Right Orbits Ornaments */}
        <LeftOrnaments />
        <RightOrnaments />
        <MobileOrnaments />

        {/* Center Content Wrapper */}
        <div className="relative z-20 flex flex-col items-center justify-center max-w-2xl mx-auto">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
            <span className="glass-panel-orange px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.25em] text-[#e04d00] inline-flex items-center">
              Loyola-Icam ECE
            </span>
          </motion.div>

          {/* Title */}
          <div className="flex flex-col items-center gap-2 mb-6 select-none">
            <h1
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight drop-shadow-[0_0_50px_rgba(255,85,0,0.18)]"
            >
              <motion.span
                initial={{ opacity: 0, filter: "blur(12px)", scale: 0.94 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                style={{ scale: heroScale, opacity: heroOpacity, display: "inline-block" }}
                className="shimmer-title"
              >
                {settings.hero_title || "INCEPTION"}
              </motion.span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="text-stone-600 text-sm md:text-base max-w-xl leading-relaxed tracking-wide mb-8 font-light text-center px-4">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              {settings.hero_subtitle || "A premium 24-hour inter-college hackathon crafted for developers and engineers who build. Solve real-world industry problems, prototype bold ideas, and bridge the gap between academia and industry."}
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-16 justify-center w-full sm:w-auto items-center"
          >
            <Magnetic range={MAGNETIC_RANGE_SM} actionScale={MAGNETIC_SCALE_SM}>
              <AnimatedShinyButton onClick={openRegister} className="px-10 py-4">
                Register Your Team
              </AnimatedShinyButton>
            </Magnetic>
            <Magnetic range={MAGNETIC_RANGE_SM} actionScale={MAGNETIC_SCALE_SM}>
              <a
                href="#about"
                className="glass-panel text-stone-700 hover:text-[#ff5500] font-semibold px-10 py-4 rounded-full uppercase tracking-wider text-sm transition-all duration-300 border border-stone-200/50 hover:border-[#ff5500]/30 inline-block shadow-sm"
              >
                Learn More
              </a>
            </Magnetic>
          </motion.div>

          {/* Countdown */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }}>
            <CountdownBanner />
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative grid grid-cols-2 md:grid-cols-4 gap-4 w-full py-4 glass-panel px-4 rounded-2xl overflow-hidden shadow-sm max-w-2xl mx-auto"
          >
            <BorderBeam size={BEAM_SIZE_SMALL} duration={8} />
            {[
              { value: 24, suffix: "H", label: "Duration" },
              { value: publicState?.registrationCount ?? 30, suffix: "",  label: "Teams" },
              { value: 120, suffix: "+", label: "Participants" },
              { value: "MAR 26", suffix: "", label: "Launch Date", isText: true },
            ].map((stat, i) => (
              <div key={i} className={`text-center ${i > 0 ? "border-l border-stone-200/60" : ""}`}>
                <h3
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-xl md:text-2xl font-bold text-[#ff5500] tracking-wide tabular-nums"
                >
                  <StatCounter target={stat.value} suffix={stat.suffix} isText={stat.isText} />
                </h3>
                <p className="text-stone-550 text-[9px] md:text-[10px] uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sections ─────────────────────────────────────────── */}
      {announcements.length > 0 && (
        <section id="announcements" className="relative px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ff5500]">Live Updates</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Announcements
                </h2>
              </div>
              <span className="text-xs uppercase tracking-widest text-stone-500">Synced from Supabase CMS</span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {announcements.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-2xl border border-stone-200 bg-white/85 p-5 shadow-sm backdrop-blur">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                  <h3 className="text-base font-black text-stone-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <ErrorBoundary><AboutSection /></ErrorBoundary>
      <ErrorBoundary><DetailsSection /></ErrorBoundary>
      <ErrorBoundary><ScheduleSection /></ErrorBoundary>
      <ErrorBoundary><JudgingSection /></ErrorBoundary>
      <ErrorBoundary><RegistrationSection onRegisterClick={openRegister} /></ErrorBoundary>
      <ErrorBoundary><FAQSection /></ErrorBoundary>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-[#faf8f4] border-t border-stone-200/60 py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="flex flex-col gap-2">
              <span
                onClick={handleLogoClick}
                className="text-lg font-black tracking-widest text-[#ff5500] hover:text-[#ff8c42] transition-colors cursor-pointer select-none"
              >
                INCEPTION
              </span>
              <span className="text-stone-500 text-xs font-semibold">
                Organized by the Department of Electronics and Communication Engineering
              </span>
            </div>

            {/* Quick Links Column */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-wider text-stone-600">
              <a href="#about" className="hover:text-[#ff5500] transition-colors">About</a>
              <a href="#details" className="hover:text-[#ff5500] transition-colors">Details</a>
              <a href="#timeline" className="hover:text-[#ff5500] transition-colors">Timeline</a>
              <a href="#faq" className="hover:text-[#ff5500] transition-colors">FAQ</a>
            </div>

            <div className="text-xs text-stone-600 flex flex-col gap-1 md:items-end font-light">
              <span>Department of Electronics & Communication Engineering</span>
              <span>Loyola-Icam College of Engineering & Technology (LICET)</span>
              <span className="text-stone-500">Chennai, Tamil Nadu, India</span>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-stone-200/40 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4 font-light">
            <span>© 2025 LOYOLA-ICAM ECE. All rights reserved.</span>
            <span className="hover:text-[#ff5500] transition-colors cursor-pointer">Terms & Conditions</span>
          </div>
        </motion.div>
      </footer>

      {/* ── Modal (lazy loaded) ───────────────────────────────── */}
      <Suspense fallback={null}>
        <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} />
        <OrganizerDashboard isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} />
      </Suspense>

      {/* Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white/90 border border-stone-200 shadow-lg flex items-center justify-center cursor-pointer hover:border-[#ff5500]/30 hover:text-[#ff5500] text-stone-600 transition-colors backdrop-blur-md"
            aria-label="Scroll to top"
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="22"
                stroke="rgba(220, 220, 220, 0.4)"
                strokeWidth="2.5"
                fill="transparent"
              />
              <motion.circle
                cx="25"
                cy="25"
                r="22"
                stroke="#ff5500"
                strokeWidth="2.5"
                fill="transparent"
                style={{ pathLength: scrollYProgress }}
                className="opacity-80"
              />
            </svg>
            <svg
              className="w-5 h-5 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
