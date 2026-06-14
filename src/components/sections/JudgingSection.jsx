import { useMemo } from "react";
import { motion } from "motion/react";
import GlowingCard from "../GlowingCard";
import BorderBeam from "../BorderBeam";
import ScrollReveal from "../ScrollReveal";
import { criteriaList } from "../../data/siteData";
import { BEAM_SIZE_LARGE, BEAM_DURATION_XSL } from "../../lib/constants";

export default function JudgingSection() {
  const criteria = useMemo(() => criteriaList, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="judging" className="py-12 md:py-24 px-4 md:px-6 max-w-6xl mx-auto border-t border-stone-200/50 relative overflow-hidden rounded-3xl bg-gradient-to-b from-transparent via-stone-500/[0.015] to-transparent">
      <div className="absolute bottom-1/4 right-10 w-[45vw] h-[45vw] max-w-[400px] max-h-[400px] bg-stone-300/40 rounded-full filter blur-[100px] pointer-events-none -z-20 animate-slow-pulse-2" />

      <ScrollReveal className="text-center mb-16 relative">
        <motion.div
          initial={{ letterSpacing: "0.05em", opacity: 0, scale: 0.85 }}
          whileInView={{ letterSpacing: "0.25em", opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 text-8xl md:text-9xl font-black text-stone-200/15 select-none pointer-events-none font-sans"
        >
          04
        </motion.div>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#e04d00] bg-[#ff5500]/8 px-4 py-2 rounded-full inline-flex items-center mb-4 shadow-sm border border-[#ff5500]/5 relative z-10">
          Evaluation
        </span>
        <h2
          style={{ fontFamily: "'Outfit', sans-serif" }}
          className="text-2xl md:text-4xl font-bold uppercase tracking-wider text-[#1c1917] relative z-10"
        >
          Judging <span className="text-[#ff5500]">Criteria & Mentors</span>
        </h2>
        <div className="h-[3px] w-16 bg-gradient-to-r from-[#ff5500] to-[#ff8c42] mx-auto mt-4 rounded-full relative z-10" />
      </ScrollReveal>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {criteria.map((crit, i) => (
          <motion.div key={i} variants={itemVariants} className="h-full flex flex-col">
            <GlowingCard 
              containerClassName="h-full flex flex-col hover:-translate-y-1.5 hover:shadow-lg hover:scale-[1.02] transition-all duration-300" 
              className="flex flex-col justify-between h-full p-6"
            >
              <div>
                <h3
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="font-bold uppercase text-base tracking-wider text-[#1c1917] mb-1"
                >
                  {crit.label}
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed font-light">{crit.desc}</p>
              </div>
            </GlowingCard>
          </motion.div>
        ))}
      </motion.div>

      <ScrollReveal>
        <div className="relative glass-panel-orange p-8 rounded-2xl orange-glow overflow-hidden">
          <BorderBeam colorFrom="#ff5500" colorTo="#ffb84d" duration={BEAM_DURATION_XSL} size={BEAM_SIZE_LARGE} />
          <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-light">
            <strong
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-lg text-stone-800 mr-1 tracking-wider uppercase font-semibold text-stone-850"
            >
              Staff Mentors (LICET ECE Department)
            </strong>{" "}
            will guide teams technically, providing deep domain support. Progress checks occur at designated review
            checkpoints.{" "}
            <strong
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-lg text-stone-800 mx-1 tracking-wider uppercase font-semibold text-stone-850"
            >
              Jury evaluation
            </strong>{" "}
            is conducted by experienced technology company representatives. Promising prototypes stand to receive
            incubation support, startup incubation entries, and potential internship pathways.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
