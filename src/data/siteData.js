// Centralised static site data — extracted from Home.jsx
// Keeps section components clean and data easy to update

export const marqueeItems = [
  "24-HOUR HACKATHON",
  "MARCH 26–27, 2025",
  "LOYOLA-ICAM ECE",
  "30 TEAMS SELECTED",
  "INCEPTION 2025",
  "BUILD · INNOVATE · LAUNCH",
  "INTER-COLLEGE HACK",
  "INDUSTRY MENTORS",
];

export const aboutCards = [
  {
    title: "Encourage Innovation",
    desc: "Push the boundaries of embedded and software development through unconstrained, creative problem solving.",
  },
  {
    title: "Real-World Problems",
    desc: "Industry partners bring live challenges. Your solutions won’t just win prizes — they could see actual deployment.",
  },
  {
    title: "Academia–Industry Bridge",
    desc: "Work alongside industry mentors from Tamizh, Inspire Solutions, and Infintin Mobility Solutions Pvt Ltd.",
  },
  {
    title: "Startup Culture",
    desc: "Top solutions may be considered for pilot implementation and incubation support. Think product, not assignment.",
  },
];

export const day1Schedule = [
  { 
    time: "08:00 AM", 
    text: "Registration & Arrival", 
    bold: false,
    desc: "Shortlisted teams check in at the LICET campus, verify registrations, and set up workstations."
  },
  { 
    time: "08:30 AM", 
    text: "Inauguration & Briefing", 
    bold: false,
    desc: "Welcome address from the department and briefing on general rules, surprise constraints, and final rubric."
  },
  { 
    time: "09:00 AM", 
    text: "Hackathon Begins", 
    type: "orange", 
    bold: true,
    desc: "The countdown starts! 24 hours of continuous development, hardware assembly, and integration begins."
  },
  { 
    time: "11:30 AM", 
    text: "Constraint 1 Released", 
    type: "warning", 
    bold: false,
    desc: "The first surprise technical constraint is released to challenge team adaptiveness and design flex."
  },
  { 
    time: "01:30 PM", 
    text: "Review 1 with Mentors", 
    bold: false,
    desc: "Industry mentors inspect workstation progress, validating architecture and hardware setups."
  },
  { 
    time: "05:30 PM", 
    text: "Constraint 2 Released", 
    type: "warning", 
    bold: false,
    desc: "The second surprise constraint is introduced to test feature prioritization and pivot agility."
  },
  { 
    time: "08:00 PM", 
    text: "Day 1 Ends", 
    bold: true,
    desc: "First 11 hours completed. Labs close for the day as teams rest and prepare presentation materials."
  },
];

export const day2Schedule = [
  { 
    time: "08:00 AM", 
    text: "Hackathon Resumes", 
    type: "orange", 
    bold: true,
    desc: "Labs reopen! Teams jump straight back into debugging, testing integrations, and UI refinement."
  },
  { 
    time: "10:30 AM", 
    text: "Review 2 with Mentors", 
    bold: false,
    desc: "Mentors review advanced features, communication protocols, and pitch preparation."
  },
  { 
    time: "01:30 PM", 
    text: "Final Progress Check", 
    bold: false,
    desc: "Final checks for software deployment and hardware stability before code freeze."
  },
  { 
    time: "04:00 PM", 
    text: "Hackathon Ends", 
    type: "danger", 
    bold: true,
    desc: "Time is up! All code commits and hardware submissions are locked on the server."
  },
  { 
    time: "04:00 PM – 05:30 PM", 
    text: "Final Presentations & Judging", 
    bold: false,
    desc: "Teams pitch their solutions live to the industry jury panel, demonstrating physical prototypes."
  },
  { 
    time: "05:30 PM – 07:00 PM", 
    text: "Valedictory & Prize Distribution", 
    type: "orange", 
    bold: true,
    desc: "Announcing the winners, cash prize awards, and concluding ceremonies."
  },
];

export const criteriaList = [
  { label: "Innovation", desc: "Originality and uniqueness of the conceptual solution." },
  { label: "Feasibility", desc: "Viability of implementing the proposed prototype in the real world." },
  { label: "Technical Complexity", desc: "Depth of software, hardware integration, and coding efficiency." },
  { label: "UI / UX", desc: "Intuitiveness, visual appeal, and responsiveness of the user interface." },
  { label: "Impact & Scalability", desc: "Scope of solving broad consumer or industrial needs." },
  { label: "Constraint Implementation", desc: "Success in integrating surprise constraints released during the hack." },
];

export const faqItems = [
  {
    q: "Who can participate?",
    a: "INCEPTION is open to all undergraduate engineering students from any college. Teams must consist of exactly 4 members.",
  },
  {
    q: "How do we register?",
    a: "Click the Register button in the menu bar or hero section to open our registration portal. Fill in your team name, college details, and team member information to submit. Once registered, our organizing team will verify your details and send a confirmation email.",
  },
  {
    q: "What should we bring?",
    a: "Please bring your own laptops, extension boxes, chargers, and all hardware components you plan to build with. Wi-Fi and power outlets will be provided at the venue.",
  },
  {
    q: "Will problem statements be given beforehand?",
    a: "Yes! Problem statements will be released 2 days prior to the event. During the live hackathon, two surprise constraints will also be introduced.",
  },
  {
    q: "Are there mentors during the event?",
    a: "Yes. Expert LICET staff mentors will guide you technically throughout the hackathon, and industry jury members will evaluate the final submissions.",
  },
  {
    q: "What is the shortlisting process?",
    a: "Teams first go through an online screening quiz. Results are announced 2 days after the quiz, and only shortlisted teams will compete in the offline event.",
  },
];
