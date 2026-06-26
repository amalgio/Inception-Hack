---
name: inception-hack
description: High-performance React/Vite website for the Inception design hackathon, optimized for smooth physics scrolling and premium visual feedback.
---

# Inception Hackathon Website Plugin

This plugin provides instructions for coding agents to maintain, edit, and refine the Inception Hackathon website workspace.

## Tech Stack & Architecture

- **Core:** React 19, Vite, Tailwind CSS (v3), FlyonUI.
- **Scroll Physics:** Lenis for smooth momentum scrolling.
- **Animations:** motion (framer-motion) for smooth micro-animations.

## Guidelines for Refinement

1. **Scroll Safety:** 
   - Never add window-level scroll listeners or wheel events that call `e.preventDefault()`. Any scroll interception will lock up Lenis scrolling and break user experience.
   - For section highlights or triggers, rely on intersection observers or passive scroll listeners.
2. **GPU Performance:**
   - Avoid applying heavy blurring filters (`filter: blur(...)`) to elements animated with scale or translations. Instead, use static `radial-gradient` backgrounds to emulate glowing orbs at zero rendering cost.
3. **Responsive layout:**
   - Keep navigation items inside the mobile drawer menu on small viewports.
