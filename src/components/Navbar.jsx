import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Magnetic from "./Magnetic";
import AnimatedShinyButton from "./AnimatedShinyButton";

export default function Navbar({ onRegisterClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Details", href: "#details" },
    { name: "Schedule", href: "#timeline" },
    { name: "Judging", href: "#judging" },
    { name: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["about", "details", "timeline", "judging", "faq"];
    
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // triggers when section dominates middle of view
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
      style={{ left: "50%" }}
      className={`fixed top-6 z-50 rounded-2xl px-8 py-3.5 flex items-center justify-between gap-8 w-[92vw] max-w-6xl backdrop-blur-lg border transition-all duration-300 ${
        isScrolled 
          ? "bg-white/75 border-[#ff5500]/25 shadow-[0_12px_45px_-12px_rgba(255,85,0,0.18)] py-3" 
          : "bg-white/50 border-[#ff5500]/15 shadow-[0_10px_35px_-10px_rgba(255,85,0,0.1)]"
      }`}
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center gap-2 group">
        <span className="text-lg md:text-xl font-bold tracking-widest text-[#1c1917] transition-all duration-300">
          IN<span className="text-[#ff5500] group-hover:text-[#ff8c42] transition-colors">CEPTION</span>
        </span>
      </a>

      {/* Desktop Links */}
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.3,
            }
          }
        }}
        initial="hidden"
        animate="visible"
        className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide"
      >
        {navLinks.map((link) => {
          const isActive = link.href === `#${activeSection}`;
          return (
            <motion.a
              variants={{
                hidden: { opacity: 0, y: -8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              key={link.name}
              href={link.href}
              className={`relative transition-colors py-1 group uppercase ${
                isActive ? "text-[#ff5500] font-semibold" : "text-stone-705 hover:text-[#ff5500]"
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#ff5500] transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </motion.a>
          );
        })}
      </motion.div>

      {/* CTA Button Desktop */}
      <div className="hidden md:flex items-center">
        <Magnetic range={50} actionScale={0.3}>
          <button 
            onClick={onRegisterClick}
            className="bg-[#ff5500] hover:bg-[#e04d00] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full flex items-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Register <span className="text-[14px] font-sans font-normal leading-none">→</span>
          </button>
        </Magnetic>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-stone-700 hover:text-[#ff5500] transition-colors p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-2 rounded"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[120%] left-0 w-full bg-white/95 border border-[#ff5500]/15 rounded-2xl p-5 flex flex-col items-center gap-4 md:hidden backdrop-blur-lg shadow-xl"
          >
            {navLinks.map((link) => {
              const isActive = link.href === `#${activeSection}`;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm tracking-widest uppercase transition-colors ${
                    isActive ? "text-[#ff5500] font-bold" : "text-stone-700 hover:text-[#ff5500]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <AnimatedShinyButton
              onClick={() => {
                setIsOpen(false);
                onRegisterClick();
              }}
              className="w-full text-center mt-2"
            >
              Register Now
            </AnimatedShinyButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
