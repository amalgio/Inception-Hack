import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "../ScrollReveal";
import { faqItems } from "../../data/siteData";

function FAQAccordionItem({ item, isOpen, onClick }) {
  return (
    <div className="border-b border-stone-200/40 last:border-0 py-4">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left py-2 font-semibold text-lg hover:text-[#ff5500] transition-colors group animate-none"
      >
        <span className="flex items-center font-semibold text-stone-800">{item.q}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-[#ff5500] font-bold text-xl leading-none select-none inline-block origin-center"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-stone-600 text-sm leading-relaxed mt-2 pl-2 pb-2 font-light">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="faq" className="py-12 md:py-24 px-4 md:px-6 max-w-4xl mx-auto border-t border-stone-200/50 relative overflow-hidden rounded-3xl bg-gradient-to-b from-transparent via-[#ff5500]/[0.005] to-transparent">
      <div className="absolute top-1/4 left-10 w-[40vw] h-[40vw] max-w-[350px] max-h-[350px] bg-[#ff5500]/2 rounded-full filter blur-[80px] pointer-events-none -z-20 animate-slow-pulse-3" />

      <ScrollReveal className="text-center mb-16 relative">
        <motion.div
          initial={{ letterSpacing: "0.05em", opacity: 0, scale: 0.85 }}
          whileInView={{ letterSpacing: "0.25em", opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 text-8xl md:text-9xl font-black text-stone-200/15 select-none pointer-events-none font-sans"
        >
          06
        </motion.div>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#e04d00] bg-[#ff5500]/8 px-4 py-2 rounded-full inline-flex items-center mb-4 shadow-sm border border-[#ff5500]/5 relative z-10">
          Got Questions?
        </span>
        <h2
          style={{ fontFamily: "'Outfit', sans-serif" }}
          className="text-2xl md:text-4xl font-bold uppercase tracking-wider text-[#1c1917] relative z-10"
        >
          Frequently <span className="text-[#ff5500]">Asked</span>
        </h2>
        <div className="h-[3px] w-16 bg-gradient-to-r from-[#ff5500] to-[#ff8c42] mx-auto mt-4 rounded-full relative z-10" />
      </ScrollReveal>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="glass-panel p-6 md:p-8 rounded-3xl mb-12"
      >
        {faqItems.map((item, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <FAQAccordionItem
              item={item}
              isOpen={openFaq === idx}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            />
          </motion.div>
        ))}
      </motion.div>

      <ScrollReveal>
        <div className="glass-panel-orange p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="text-left">
              <h4
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="font-bold text-lg text-[#1c1917] tracking-wider"
              >
                Still have inquiries?
              </h4>
              <p className="text-stone-550 text-xs font-light">Reach out to our organizing team directly</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-xs">
            <a
              style={{ fontFamily: "'Outfit', sans-serif" }}
              href="tel:+919876543210"
              className="px-5 py-2.5 bg-white/80 border border-[#ff5500]/18 rounded-full text-[#e04d00] tracking-wider font-bold hover:border-[#ff5500]/40 hover:bg-[#ff5500]/5 transition-all text-center"
            >
              +91 98765 43210
            </a>
            <a
              style={{ fontFamily: "'Outfit', sans-serif" }}
              href="tel:+919876543211"
              className="px-5 py-2.5 bg-white/80 border border-[#ff5500]/18 rounded-full text-[#e04d00] tracking-wider font-bold hover:border-[#ff5500]/40 hover:bg-[#ff5500]/5 transition-all text-center"
            >
              +91 98765 43211
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
