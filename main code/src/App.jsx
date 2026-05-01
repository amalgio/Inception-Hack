import { useEffect, useState } from 'react'
import {
  Lightbulb, Factory, Handshake, Rocket,
  Users, MapPin, ClipboardList, Building2,
  Calendar, Trophy, Zap,
  Star, Wrench, Palette, Globe, Target, Cpu,
  Phone, ChevronDown, ChevronUp
} from 'lucide-react'
import './App.css'


function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useCountUp(target, duration = 1800, startDelay = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let startTime = null
    let raf
    const delayTimer = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        setCount(Math.floor(eased * target))
        if (progress < 1) raf = requestAnimationFrame(step)
        else setCount(target)
      }
      raf = requestAnimationFrame(step)
    }, startDelay)
    return () => { clearTimeout(delayTimer); cancelAnimationFrame(raf) }
  }, [target, duration, startDelay])
  return count
}

function StatNum({ value, suffix = '', isText = false }) {
  const num = useCountUp(isText ? 0 : value)
  if (isText) return <span>{value}</span>
  return <span>{num}{suffix}</span>
}

// ── Marquee Banner (cleaned up) ──
const marqueeItems = [
  '24-HOUR HACKATHON',
  'MARCH 26–27',
  'LOYOLA-ICAM ECE',
  '30 TEAMS',
  '₹INCEPTION 2025',
  'BUILD · INNOVATE · LAUNCH',
  'INTER-COLLEGE',
  'INDUSTRY MENTORS',
]

function MarqueeBanner() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item} <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

const aboutCards = [
  { icon: <Lightbulb size={20} />, title: 'Encourage Innovation', desc: 'Push the boundaries of embedded and software development through unconstrained creative problem solving.' },
  { icon: <Factory size={20} />, title: 'Real-World Problems', desc: "Industry partners bring live challenges. Your solutions won't just win — they could see actual deployment." },
  { icon: <Handshake size={20} />, title: 'Academia–Industry Bridge', desc: 'Work alongside mentors from Tamizh, Inspire Solutions, and Infintin Mobility Solutions Pvt Ltd.' },
  { icon: <Rocket size={20} />, title: 'Startup Culture', desc: 'Top solutions may be considered for pilot implementation and incubation support. Think product, not assignment.' },
]

const day1 = [
  { time: '8:00 AM',  text: 'Registration',              type: '' },
  { time: '8:30 AM',  text: 'Inauguration & Briefing',   type: '' },
  { time: '9:00 AM',  text: 'Hackathon Begins 🚀',       type: 'teal', bold: true },
  { time: '11:30 AM', text: 'Constraint 1 Released ⚡',  type: '' },
  { time: '1:30 PM',  text: 'Review 1 with Mentors',     type: '' },
  { time: '5:30 PM',  text: 'Constraint 2 Released ⚡',  type: '' },
  { time: '8:00 PM',  text: 'Day 1 Ends — 11 Hours Done', type: 'gold' },
]

const day2 = [
  { time: '8:00 AM',   text: 'Hackathon Resumes',                type: 'teal', bold: true },
  { time: '10:30 AM',  text: 'Review 2 with Mentors',           type: '' },
  { time: '1:30 PM',   text: 'Final Progress Check',            type: '' },
  { time: '4:00 PM',   text: 'Hackathon Ends 🏁',               type: 'gold', bold: true },
  { time: '4–5:30 PM', text: 'Final Presentations & Judging',   type: '' },
  { time: '5:30–7 PM', text: 'Valedictory & Prize Distribution 🏆', type: 'teal' },
]

const criteria = [
  { icon: <Star size={18} />,    label: 'Innovation' },
  { icon: <Wrench size={18} />,  label: 'Feasibility' },
  { icon: <Cpu size={18} />,     label: 'Technical Complexity' },
  { icon: <Palette size={18} />, label: 'UI / UX' },
  { icon: <Globe size={18} />,   label: 'Impact & Scalability' },
  { icon: <Target size={18} />,  label: 'Constraint Implementation' },
]

// ── FAQ data ──
const faqItems = [
  {
    q: 'Who can participate?',
    a: 'INCEPTION is open to all undergraduate students from any college. Teams must be exactly 4 members.',
  },
  {
    q: 'How do we register?',
    a: 'Fill out the Google Form linked in the Register section. After submission, you will receive a payment link to complete your registration.',
  },
  {
    q: 'What should we bring?',
    a: 'Bring your own laptop, extension box, and all hardware components you plan to use. Wi-Fi will be provided at the venue.',
  },
  {
    q: 'Will problem statements be given beforehand?',
    a: 'Yes — problem statements will be shared 2 days before the event. During the hackathon, two surprise constraints will be introduced.',
  },
  {
    q: 'Are there mentors during the event?',
    a: 'Absolutely. LICET staff mentors will guide you throughout, and industry jury members will evaluate your final submission.',
  },
  {
    q: 'What is the shortlisting process?',
    a: 'Teams go through an online quiz. Results are announced 2 days after the quiz. Only shortlisted teams participate in the hackathon.',
  },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className="section" id="faq">
      <div className="reveal">
        <div className="section-tag"><Zap size={12} /> Got Questions?</div>
        <div className="sep" />
        <h2 className="section-title">Frequently <em>Asked</em></h2>
        <div className="faq-list">
          {faqItems.map((item, i) => (
            <div
              className={`faq-item ${open === i ? 'open' : ''}`}
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="faq-q">
                <span>{item.q}</span>
                {open === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              {open === i && <div className="faq-a">{item.a}</div>}
            </div>
          ))}
        </div>
        <div className="faq-callout">
          <Phone size={16} />
          <div>
            <div className="faq-callout-title">Still have questions?</div>
            <div className="faq-callout-sub">Call us directly — we're happy to help</div>
          </div>
          <div className="faq-numbers">
            <a href="tel:+919876543210" className="faq-number">+91 98765 43210</a>
            <a href="tel:+919876543211" className="faq-number">+91 98765 43211</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Loader ──
function Loader({ hide }) {
  return (
    <div className={`loader-wrap ${hide ? 'hide' : ''}`}>
      <div className="loader-title">INCEPTION</div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" />
      </div>
    </div>
  )
}

// ── Nav ──
function Nav() {
  return (
    <nav className="nav">
      <span className="nav-logo">INCEPTION</span>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#timeline">Schedule</a>
        <a href="#judging">Judging</a>
        <a href="#faq">FAQ</a>
        <a href="#register" className="nav-register">Register →</a>
      </div>
    </nav>
  )
}

// ── Hero ──
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="grid-lines" />
      <div className="hero-orb" />
      <div className="hero-badge">
        <span className="dot" />
        LOYOLA-ICAM ECE · The Genesis Edition
      </div>
      <h1 className="hero-title">INCEPTION</h1>
      <p className="hero-subtitle">The Genesis Edition</p>
      <p className="hero-desc">
        A 24-hour inter-college hackathon crafted for engineers who build.
        Solve real-world industry problems, prototype bold ideas, and bridge
        the gap between academia and industry.
      </p>
      <div className="hero-cta">
        <a href="#register" className="btn-primary">
          <Zap size={16} /> Register Now
        </a>
        <a href="#about" className="btn-outline">
          Learn More
        </a>
      </div>
      <div className="hero-stats">
        <div style={{ textAlign: 'center' }}>
          <div className="stat-num"><StatNum value={24} suffix="H" /></div>
          <div className="stat-label">Duration</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="stat-num"><StatNum value={30} /></div>
          <div className="stat-label">Teams</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="stat-num"><StatNum value={120} /></div>
          <div className="stat-label">Participants</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="stat-num"><StatNum value="MAR 26" isText /></div>
          <div className="stat-label">Kick-off</div>
        </div>
      </div>
    </section>
  )
}

// ── About ──
function About() {
  return (
    <section className="section" id="about">
      <div className="reveal">
        <div className="section-tag"><Zap size={12} /> What is Inception?</div>
        <div className="sep" />
        <h2 className="section-title">Engineer. <em>Innovate.</em> Launch.</h2>
        <div className="about-grid">
          {aboutCards.map(c => (
            <div className="about-card" key={c.title}>
              <div className="about-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Details ──
function Details() {
  return (
    <section className="section" id="details" style={{ paddingTop: 0 }}>
      <div className="reveal">
        <div className="section-tag"><ClipboardList size={12} /> Event Details</div>
        <div className="sep" />
        <h2 className="section-title">Everything you <em>need to know</em></h2>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card-title"><Users size={16} /> Eligibility & Format</div>
            <ul className="info-list">
              <li>Open to all UG students (inter-college)</li>
              <li>Teams of exactly 4 members</li>
              <li>20–30 teams selected (80–120 participants)</li>
              <li>Offline · Venue: G01 & F11, LICET</li>
              <li>March 26–27, 2025</li>
            </ul>
          </div>
          <div className="info-card">
            <div className="info-card-title"><ClipboardList size={16} /> General Instructions</div>
            <ul className="info-list">
              <li>Bring your own laptop + extension box</li>
              <li>All hardware components must be carried</li>
              <li>Development happens during hackathon only</li>
              <li>Submit all deliverables before deadline</li>
              <li>Plagiarism = immediate disqualification</li>
            </ul>
          </div>
          <div className="info-card">
            <div className="info-card-title"><Zap size={16} /> Shortlisting Process</div>
            <ul className="info-list">
              <li>Online screening via quiz platform</li>
              <li>Shortlisted teams announced 2 days after quiz</li>
              <li>Problem statements released 2 days before</li>
              <li>Two surprise constraints during the event</li>
            </ul>
          </div>
          <div className="info-card">
            <div className="info-card-title"><Building2 size={16} /> Industry Partners</div>
            <div className="partners">
              {['Tamizh', 'Inspire Solutions', 'Infintin Mobility Solutions Pvt Ltd'].map(p => (
                <span className="partner-pill" key={p}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Timeline ──
function Timeline() {
  return (
    <div className="timeline-wrap" id="timeline">
      <div className="timeline-inner reveal">
        <div className="section-tag"><Calendar size={12} /> Hackathon Schedule</div>
        <div className="sep" />
        <h2 className="section-title">24 Hours of <em>Pure Build</em></h2>
        <div className="timeline-days">
          <div>
            <div className="day-label"><Calendar size={16} /> Day 1 — March 26</div>
            {day1.map((item, i) => (
              <div className="tl-item" key={i}>
                <div className="tl-time">{item.time}</div>
                <div className={`tl-dot ${item.type}`} />
                <div className="tl-text">
                  {item.bold ? <strong>{item.text}</strong> : item.text}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="day-label"><Calendar size={16} /> Day 2 — March 27</div>
            {day2.map((item, i) => (
              <div className="tl-item" key={i}>
                <div className="tl-time">{item.time}</div>
                <div className={`tl-dot ${item.type}`} />
                <div className="tl-text">
                  {item.bold ? <strong>{item.text}</strong> : item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Judging ──
function Judging() {
  return (
    <section className="section" id="judging">
      <div className="reveal">
        <div className="section-tag"><Trophy size={12} /> Evaluation</div>
        <div className="sep" />
        <h2 className="section-title">Judged by <em>Industry Experts</em></h2>
        <div className="criteria-grid">
          {criteria.map(c => (
            <div className="criterion" key={c.label}>
              <div className="criterion-icon">{c.icon}</div>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
        <div className="judge-note">
          <strong>Mentors (LICET Staff)</strong> will guide teams technically, provide domain
          knowledge, and review progress at checkpoints.&nbsp;&nbsp;
          <strong>Jury (Company Representatives)</strong> will evaluate final submissions.
          Top solutions may receive incubation support and internship opportunities.
        </div>
      </div>
    </section>
  )
}

// ── Register ──
function Register() {
  return (
    <div className="register-section" id="register">
      <div className="register-box reveal">
        <div className="section-tag" style={{ justifyContent: 'center', display: 'flex' }}>
          <Rocket size={12} /> Ready to Build?
        </div>
        <h2 className="section-title" style={{ marginBottom: 14 }}>
          Join <em>INCEPTION</em>
        </h2>
        <p className="register-desc">
          Gather your team of 4, sharpen your ideas, and show what you can build under pressure.
        </p>
        <a
          href="https://forms.gle/YOUR_GOOGLE_FORM_LINK"
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ fontSize: 16, padding: '17px 52px' }}
        >
          <Zap size={18} /> Register Your Team
        </a>
        <p className="payment-note">
          💳 After form submission, you'll receive a <strong>Razorpay / UPI payment link</strong><br />
          to complete your registration fee securely.<br /><br />
          <MapPin size={12} style={{ display: 'inline' }} /> <strong>Venue:</strong> G01 & F11, LICET &nbsp;·&nbsp;
          <Calendar size={12} style={{ display: 'inline' }} /> <strong>Date:</strong> March 26–27, 2025
        </p>
      </div>
    </div>
  )
}

// ── Footer ──
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo-block">
          <img src="/licet-logo.png" alt="LICET Logo" className="footer-logo" />
        </div>
        <div className="footer-divider" />
        <div className="footer-text-block">
          <strong>INCEPTION — The Genesis Edition</strong>
          <span>Organized by The Spectrum of Engineers Association (SEA)</span>
        </div>
        <div className="footer-divider" />
        <div className="footer-text-block">
          <span>Department of Electronics &amp; Communication Engineering</span>
        </div>
        <div className="footer-divider" />
        <div className="footer-text-block">
          <span>LOYOLA-ICAM COLLEGE OF ENGINEERING &amp; TECHNOLOGY</span>
          <span className="footer-city">Chennai, India</span>
        </div>
      </div>
      <div className="footer-copy">
        © 2025 LOYOLA-ICAM ECE. All rights reserved.
      </div>
    </footer>
  )
}

// ── Main App ──
export default function App() {
  const [loaderHide, setLoaderHide] = useState(false)
  useReveal()

  useEffect(() => {
    const t = setTimeout(() => setLoaderHide(true), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Loader hide={loaderHide} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <Hero />
        <MarqueeBanner />
        <About />
        <Details />
        <Timeline />
        <Judging />
        <FAQ />
        <Register />
        <Footer />
      </div>
    </>
  )
}
