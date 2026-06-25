import { motion } from "motion/react";
import ScrollReveal from "../ScrollReveal";

import imgAtom from "../../assets/3d_atom.png";
import imgMentors from "../../assets/3d_mentors.png";
import imgCubes from "../../assets/3d_cubes.png";
import imgBtmMentorship from "../../assets/3d_icon_mentorship.png";
import imgBtmClipboard from "../../assets/3d_icon_clipboard.png";
import imgBtmFeedback from "../../assets/3d_icon_feedback.png";
import imgBtmShield from "../../assets/3d_icon_shield.png";
import imgStackedLayers from "../../assets/3d_stacked_layers.png";
import imgDonut from "../../assets/3d_donut.png";
import imgBarChart from "../../assets/3d_bar_chart.png";
import imgPuzzle from "../../assets/3d_icon_puzzle.png";

// ─── 3D Atom Component for Left Hero Card ──────────────────────────────────────
function Atom3D() {
  return (
    <div className="w-full flex justify-center mt-2">
      <img 
        src={imgAtom} 
        alt="3D Atom" 
        className="w-32 md:w-40 h-auto object-contain select-none pointer-events-none animate-float"
      />
    </div>
  );
}

// ─── 3D Mentor Ecosystem Component for Top Right Card ──────────────────────────
function Mentors3D() {
  return (
    <div className="absolute right-5 md:right-8 bottom-5 md:bottom-8 w-32 h-26 md:w-44 md:h-36 flex items-end justify-end pointer-events-none select-none">
      <img 
        src={imgMentors} 
        alt="3D Mentors" 
        className="w-24 md:w-36 h-auto object-contain select-none pointer-events-none"
      />
    </div>
  );
}

// ─── 3D Stacked Cubes Component for Center Wide Card ───────────────────────────
function Cubes3D() {
  return (
    <div className="absolute right-2 bottom-5 md:bottom-8 w-36 h-26 md:w-48 md:h-36 flex items-end justify-end pointer-events-none select-none">
      <img 
        src={imgCubes} 
        alt="3D Cubes" 
        className="w-28 md:w-40 h-auto object-contain select-none pointer-events-none animate-float"
      />
    </div>
  );
}

// ─── Bottom Info Strip Icons ───────────────────────────────────────────────────
function BottomMentorIcon() {
  return (
    <img 
      src={imgBtmMentorship} 
      alt="Mentorship Excellence" 
      className="h-12 md:h-14 w-auto shrink-0 object-contain select-none pointer-events-none"
    />
  );
}

// ─── Bottom Info Strip Icons ───────────────────────────────────────────────────
function BottomReviewIcon() {
  return (
    <img 
      src={imgBtmClipboard} 
      alt="Expert Review" 
      className="h-12 md:h-14 w-auto shrink-0 object-contain select-none pointer-events-none"
    />
  );
}

// ─── Bottom Info Strip Icons ───────────────────────────────────────────────────
function BottomFeedbackIcon() {
  return (
    <img 
      src={imgBtmFeedback} 
      alt="Constructive Feedback" 
      className="h-12 md:h-14 w-auto shrink-0 object-contain select-none pointer-events-none"
    />
  );
}

// ─── Bottom Info Strip Icons ───────────────────────────────────────────────────
function BottomShieldIcon() {
  return (
    <img 
      src={imgBtmShield} 
      alt="Fair, Ethical & Confidential" 
      className="h-12 md:h-14 w-auto shrink-0 object-contain select-none pointer-events-none"
    />
  );
}

export default function JudgingSection() {
  return (
    <section 
      id="judging" 
      className="pt-10 pb-16 md:pt-14 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto border-t border-stone-200/50 relative overflow-visible rounded-3xl bg-[#FAF8F5] select-none"
    >
      {/* Background Soft Glows & Gradients */}
      <div className="absolute top-1/4 left-10 w-[45vw] h-[45vw] max-w-[400px] max-h-[400px] bg-amber-500/[0.02] rounded-full filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-[45vw] h-[45vw] max-w-[400px] max-h-[400px] bg-[#FF6A00]/[0.02] rounded-full filter blur-[120px] pointer-events-none z-0" />

      <ScrollReveal className="text-center mb-6 relative select-none z-10">
        <motion.div
          initial={{ letterSpacing: "0.05em", opacity: 0, scale: 0.85 }}
          whileInView={{ letterSpacing: "0.25em", opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 text-8xl md:text-9xl font-black text-stone-200/15 select-none pointer-events-none font-sans"
        >
          04
        </motion.div>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#e04d00] bg-[#ff5500]/8 px-4 py-2 rounded-full inline-flex items-center shadow-sm border border-[#ff5500]/5 relative z-10">
          Judging & Criteria
        </span>
      </ScrollReveal>

      <ScrollReveal className="w-full relative z-10 mb-0">
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-3 w-full">
          
          {/* 1. Left Hero Card (Tall Vertical) */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-start-1 md:row-start-1 md:col-span-3 md:row-span-2 flex flex-col justify-between bg-gradient-to-br from-[#FF4500] to-[#FFA200] rounded-[24px] p-5 md:p-6 text-white relative overflow-hidden shadow-[0_12px_36px_rgba(255,106,0,0.12)] min-h-[340px] md:min-h-[380px] border border-white/10 h-full"
          >
            {/* Ambient inner card glows */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-white/[0.06] rounded-full filter blur-xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-start text-left">
              <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-white/80 select-none">
                Judging
              </span>
              <div className="w-8 h-[2px] bg-white mt-2 mb-4" />
              
              {/* Title */}
              <h3 
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-xl md:text-[26px] font-black tracking-tight leading-none uppercase mt-6 text-left"
              >
                Judging<br />
                Criteria &<br />
                Mentors
              </h3>
              
              {/* Divider */}
              <div className="w-12 h-[2px] bg-white/70 my-4 rounded-full" />
              
              {/* Supporting Text */}
              <p className="text-white/95 text-xs leading-relaxed font-normal text-left max-w-[200px]">
                Ideas are assessed across key dimensions by experts.
              </p>
            </div>

            {/* 3D Atom Illustration */}
            <div className="relative z-10 w-full -mb-4 md:-mb-5">
              <Atom3D />
            </div>
          </motion.div>

          {/* 2. Top Middle Card: OUR MENTOR ECOSYSTEM */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-start-4 md:row-start-1 md:col-span-5 bg-white rounded-[24px] p-5 md:p-6 border border-stone-200/40 shadow-[0_8px_30px_rgba(28,25,23,0.02)] flex flex-col justify-between relative overflow-hidden min-h-[165px] md:min-h-[185px] h-full"
          >
            <div className="relative z-10 flex flex-col text-left max-w-[55%]">
              <span className="text-[#FF6A00] font-extrabold text-[10px] tracking-[0.2em] uppercase">
                Our Mentor Ecosystem
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A00] mt-2 mb-4" />
              
              <h4 
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-stone-900 font-extrabold text-lg md:text-[20px] tracking-tight leading-tight mt-1"
              >
                Guided by experts.<br />
                Built on insights.
              </h4>
              
              <p className="text-stone-550 text-[10px] md:text-xs leading-relaxed font-normal mt-1.5 max-w-[240px]">
                Learn, build & grow with the guidance of industry experts.
              </p>
            </div>

            {/* 3D Mentor Podium */}
            <Mentors3D />
          </motion.div>

          {/* 3. Bottom Middle Card: THE PROCESS */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-start-4 md:row-start-2 md:col-span-5 bg-white rounded-[24px] p-5 md:p-6 border border-stone-200/40 shadow-[0_8px_30px_rgba(28,25,23,0.02)] flex flex-col justify-between relative overflow-hidden min-h-[165px] md:min-h-[185px] h-full"
          >
            <div className="relative z-10 flex flex-col text-left max-w-[55%]">
              <span className="text-[#FF6A00] font-extrabold text-[10px] tracking-[0.2em] uppercase">
                The Process
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A00] mt-2 mb-4" />
              
              <h4 
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-stone-900 font-extrabold text-lg md:text-[20px] tracking-tight leading-tight mt-1"
              >
                How winners<br />
                are <span className="text-[#FF6A00]">chosen.</span>
              </h4>
              
              <p className="text-stone-555 text-[10px] md:text-xs leading-relaxed font-normal mt-2.5 max-w-[240px]">
                A fair and transparent review by expert mentors and judges.
              </p>
            </div>
            
            <Cubes3D />
          </motion.div>

          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-start-9 md:row-start-1 md:col-span-4 md:row-span-2 bg-white rounded-[24px] border border-stone-200/40 shadow-[0_8px_30px_rgba(28,25,23,0.02)] grid grid-rows-5 overflow-hidden h-full"
          >
            {[
              {
                icon: imgAtom,
                percent: "40%",
                title: "Innovation",
                desc: "Originality and uniqueness of the conceptual solution.",
              },
              {
                icon: imgStackedLayers,
                percent: "25%",
                title: "Technical Complexity",
                desc: "Depth of software, hardware integration, and efficiency.",
              },
              {
                icon: imgDonut,
                percent: "15%",
                title: "UI / UX",
                desc: "Intuitiveness, visual appeal, and user experience.",
              },
              {
                icon: imgBarChart,
                percent: "10%",
                title: "Impact & Scalability",
                desc: "Scope of solving broad consumer or industrial needs.",
              },
              {
                icon: imgPuzzle,
                percent: "10%",
                title: "Constraint Implementation",
                desc: "Success in integrating surprise constraints released during the hack.",
              },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`grid grid-cols-[56px_48px_1fr] md:grid-cols-[64px_48px_1fr] gap-3 items-center p-2.5 md:p-3.5 ${
                  idx < 4 ? "border-b border-stone-100" : ""
                } hover:bg-stone-50/50 transition-colors duration-200`}
              >
                {/* 3D Icon */}
                <div className="w-14 md:w-16 h-12 md:h-14 shrink-0 flex items-center justify-center select-none pointer-events-none">
                  <img 
                    src={item.icon} 
                    alt={item.title} 
                    className="h-10 md:h-12 w-auto object-contain"
                  />
                </div>
                
                {/* Percentage */}
                <span 
                  style={{ fontFamily: "'Outfit', sans-serif" }} 
                  className="text-xl md:text-2xl font-semibold text-[#FF6A00] tracking-tight shrink-0 w-full text-left"
                >
                  {item.percent}
                </span>
                
                {/* Title & Description */}
                <div className="flex flex-col text-left">
                  <span 
                    style={{ fontFamily: "'Outfit', sans-serif" }} 
                    className="font-extrabold text-stone-900 text-xs tracking-wider uppercase leading-tight"
                  >
                    {item.title}
                  </span>
                  <span className="text-stone-500 text-[10px] leading-snug font-normal mt-1.5">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* 5. Bottom Information Strip (Spans all columns on desktop) */}
          <div className="md:col-span-12 bg-white rounded-[24px] p-5 md:p-6 border border-stone-200/40 shadow-[0_8px_30px_rgba(28,25,23,0.02)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
            
            {/* Block 1 */}
            <div className="flex flex-row items-start gap-4 text-left select-none group">
              <BottomMentorIcon />
              <div className="flex flex-col">
                <h5 
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="font-extrabold text-stone-900 text-[11px] tracking-wider uppercase mb-1.5 group-hover:text-[#FF6A00] transition-colors"
                >
                  Mentorship Excellence
                </h5>
                <p className="text-stone-550 text-[10px] leading-relaxed font-normal">
                  Guidance from experienced mentors who help teams refine ideas and build impactful solutions.
                </p>
              </div>
            </div>

            {/* Block 2 */}
            <div className="flex flex-row items-start gap-4 text-left select-none group">
              <BottomReviewIcon />
              <div className="flex flex-col">
                <h5 
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="font-extrabold text-stone-900 text-[11px] tracking-wider uppercase mb-1.5 group-hover:text-[#FF6A00] transition-colors"
                >
                  Expert Review
                </h5>
                <p className="text-stone-550 text-[10px] leading-relaxed font-normal">
                  Solutions are reviewed by industry experts who assess ideas with depth and relevance.
                </p>
              </div>
            </div>

            {/* Block 3 */}
            <div className="flex flex-row items-start gap-4 text-left select-none group">
              <BottomFeedbackIcon />
              <div className="flex flex-col">
                <h5 
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="font-extrabold text-stone-900 text-[11px] tracking-wider uppercase mb-1.5 group-hover:text-[#FF6A00] transition-colors"
                >
                  Constructive Feedback
                </h5>
                <p className="text-stone-550 text-[10px] leading-relaxed font-normal">
                  Teams receive meaningful feedback that helps them improve and innovate further.
                </p>
              </div>
            </div>

            {/* Block 4 */}
            <div className="flex flex-row items-start gap-4 text-left select-none group">
              <BottomShieldIcon />
              <div className="flex flex-col">
                <h5 
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="font-extrabold text-stone-900 text-[11px] tracking-wider uppercase mb-1.5 group-hover:text-[#FF6A00] transition-colors"
                >
                  Fair, Ethical & Confidential
                </h5>
                <p className="text-stone-550 text-[10px] leading-relaxed font-normal">
                  A consistent and unbiased process that ensures fairness, confidentiality, and the highest standards of integrity.
                </p>
              </div>
            </div>

          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
