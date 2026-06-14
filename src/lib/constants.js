// Animation & UI constants for INCEPTION website
// Extracted from magic literals scattered across components

// Scroll-based parallax ranges
export const PARALLAX_HERO_SCALE   = [0, 800];
export const PARALLAX_HERO_OPACITY = [0, 800];
export const PARALLAX_GRID_Y       = [0, 1000];

// Hero title animation
export const STAT_COUNT_DURATION_MS = 1600;

// BorderBeam sizes
export const BEAM_SIZE_SMALL  = 0.12;
export const BEAM_SIZE_MEDIUM = 0.16;
export const BEAM_SIZE_LARGE  = 0.25;
export const BEAM_SIZE_XL     = 0.3;

// BorderBeam durations
export const BEAM_DURATION_FAST   = 5;
export const BEAM_DURATION_NORMAL = 7;
export const BEAM_DURATION_SLOW   = 8;
export const BEAM_DURATION_XSL    = 10;

// Magnetic component settings
export const MAGNETIC_RANGE_SM  = 50;
export const MAGNETIC_RANGE_LG  = 60;
export const MAGNETIC_SCALE_SM  = 0.35;
export const MAGNETIC_SCALE_LG  = 0.4;

// Countdown target date (Mar 26 2025 08:00 IST)
export const HACKATHON_START_ISO = "2025-03-26T08:00:00+05:30";

// Section watermark numbers
export const SECTION_NUM = {
  ABOUT:        "01",
  DETAILS:      "02",
  SCHEDULE:     "03",
  JUDGING:      "04",
  REGISTRATION: "05",
  FAQ:          "06",
};

// Google Form fallback (read from env at runtime)
export const GOOGLE_FORM_URL =
  import.meta.env.VITE_GOOGLE_FORM_URL || "https://forms.gle/YOUR_GOOGLE_FORM_LINK";
