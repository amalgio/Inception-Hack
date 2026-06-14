import { motion } from "motion/react";

// 1. Concentric circles with pulse (replaces Lightbulb for Innovation)
export function AbstractInnovateIcon() {
  return (
    <svg className="w-6 h-6 text-[#ff8c42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <motion.circle
        cx="12"
        cy="12"
        r="8"
        strokeDasharray="4 2"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="4"
        animate={{ scale: [0.9, 1.15, 0.9] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 2. Interlocking vector matrix nodes (replaces Factory for Real-World Problems)
export function AbstractRealWorldIcon() {
  return (
    <svg className="w-6 h-6 text-[#ff8c42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <motion.path
        d="M3 12h18M12 3v18"
        strokeDasharray="3 3"
        opacity="0.4"
      />
      <rect x="10" y="10" width="4" height="4" rx="1" fill="currentColor" />
      <motion.circle
        cx="4"
        cy="12"
        r="2"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
      />
      <motion.circle
        cx="20"
        cy="12"
        r="2"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
      />
      <motion.circle
        cx="12"
        cy="4"
        r="2"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1.0 }}
      />
      <motion.circle
        cx="12"
        cy="20"
        r="2"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1.4 }}
      />
    </svg>
  );
}

// 3. Curved overlapping wave bridge paths (replaces Handshake for Bridge)
export function AbstractBridgeIcon() {
  return (
    <svg className="w-6 h-6 text-[#ff8c42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <motion.path
        d="M4 16c4-6 6-6 10 0s6-10 6-10"
        animate={{ strokeDashoffset: [0, -20] }}
        strokeDasharray="5 5"
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />
      <path d="M4 8c4 6 6 6 10 0s6 10 6 10" opacity="0.5" />
    </svg>
  );
}

// 4. Kinetic vector diamond vector coordinates (replaces Rocket for Startup)
export function AbstractStartupIcon() {
  return (
    <svg className="w-6 h-6 text-[#ff8c42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <motion.polygon
        points="12,2 20,12 12,22 4,12"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.line
        x1="12"
        y1="6"
        x2="12"
        y2="18"
        animate={{ y1: [6, 12, 6], y2: [18, 12, 18] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    </svg>
  );
}

// 5. Criteria: Exploding grid nodes (Innovation)
export function CriteriaInnovationIcon() {
  return (
    <svg className="w-5 h-5 text-[#ff8c42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <motion.path
        d="M12 2v4M12 18v4M2 12h4M18 12h4"
        animate={{ strokeDashoffset: [0, 8] }}
        strokeDasharray="2 2"
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
    </svg>
  );
}

// 6. Criteria: Balanced gauge box (Feasibility)
export function CriteriaFeasibilityIcon() {
  return (
    <svg className="w-5 h-5 text-[#ff8c42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <motion.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        animate={{ y1: [12, 8, 16, 12], y2: [12, 8, 16, 12] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 7. Criteria: Nested isometric box (Technical Complexity)
export function CriteriaComplexityIcon() {
  return (
    <svg className="w-5 h-5 text-[#ff8c42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
      <motion.path
        d="M12 12L4 7M12 12v10M12 12l8-7"
        animate={{ strokeWidth: [1.5, 2.5, 1.5] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
    </svg>
  );
}

// 8. Criteria: Screen boundary brackets (UI/UX)
export function CriteriaUIIcon() {
  return (
    <svg className="w-5 h-5 text-[#ff8c42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 3H3v3M18 3h3v3M6 21H3v-3M18 21h3v-3" />
      <motion.circle
        cx="12"
        cy="12"
        r="4"
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
    </svg>
  );
}

// 9. Criteria: Wave ripple coordinates (Impact)
export function CriteriaImpactIcon() {
  return (
    <svg className="w-5 h-5 text-[#ff8c42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <motion.circle
        cx="12"
        cy="12"
        r="2"
        animate={{ r: [2, 9], opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
      />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

// 10. Criteria: Diagonal warnings constraints grid (Surprise Constraints)
export function CriteriaConstraintIcon() {
  return (
    <svg className="w-5 h-5 text-[#ff8c42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
      <motion.path
        d="M3 21L21 3"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </svg>
  );
}
