import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─── GLOBAL STYLES ─────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700;800&display=swap');

    :root {
      --ink:        #0d0d1a;
      --ink-2:      #1e1b4b;
      --ink-3:      #4c4980;
      --muted:      #8b87b8;
      --muted-2:    #c4c2dc;
      --surface:    #ffffff;
      --surface-2:  #f8f7ff;
      --surface-3:  #f0effe;
      --line:       rgba(109,40,217,.10);
      --line-2:     rgba(109,40,217,.06);
      --accent-1:   #6d28d9;
      --accent-2:   #7c3aed;
      --accent-mid: #8b5cf6;
      --accent-light:#a78bfa;
      --glow:       rgba(109,40,217,.14);
      --g-primary:  linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #8b5cf6 100%);
      --g-subtle:   linear-gradient(135deg, rgba(109,40,217,.08) 0%, rgba(139,92,246,.05) 100%);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .careers-root {
      font-family: 'Manrope', sans-serif;
      background: var(--surface-2);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
    }

    .g-text {
      background: var(--g-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .g-text-serif {
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      background: var(--g-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .grid-bg {
      background-color: var(--surface-2);
      background-image:
        linear-gradient(rgba(109,40,217,.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(109,40,217,.035) 1px, transparent 1px);
      background-size: 52px 52px;
    }

    .t-label {
      font-size: 10px; font-weight: 800;
      letter-spacing: 0.20em; text-transform: uppercase;
      color: var(--accent-2);
    }
    .t-hero {
      font-family: 'Manrope', sans-serif;
      font-size: clamp(2.8rem, 7vw, 6.4rem);
      font-weight: 800; letter-spacing: -0.04em; line-height: 0.95;
      color: var(--ink);
    }
    .t-section {
      font-family: 'Manrope', sans-serif;
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 800; letter-spacing: -0.03em; line-height: 1.05;
      color: var(--ink);
    }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--g-primary); color: #fff;
      font-family: 'Manrope', sans-serif;
      font-size: 13px; font-weight: 700; letter-spacing: .01em;
      padding: 13px 28px; border-radius: 10px;
      border: none; cursor: pointer; text-decoration: none;
      transition: opacity .18s, transform .14s, box-shadow .18s;
      box-shadow: 0 4px 24px rgba(109,40,217,.30);
    }
    .btn-primary:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 8px 32px rgba(109,40,217,.38); }
    .btn-primary:active { transform: scale(.98); }

    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,.80); color: var(--ink-2);
      font-family: 'Manrope', sans-serif;
      font-size: 13px; font-weight: 600;
      padding: 13px 26px; border-radius: 10px;
      border: 1px solid rgba(109,40,217,.18); cursor: pointer; text-decoration: none;
      backdrop-filter: blur(8px);
      transition: background .18s, border-color .18s, box-shadow .18s;
    }
    .btn-outline:hover { background: #fff; border-color: rgba(109,40,217,.35); box-shadow: 0 4px 18px rgba(109,40,217,.08); }

    .badge {
      display: inline-flex; align-items: center; gap: 7px;
      font-family: 'Manrope', sans-serif;
      font-size: 10px; font-weight: 800;
      letter-spacing: .14em; text-transform: uppercase;
      color: var(--accent-2);
      background: rgba(109,40,217,.07);
      border: 1px solid rgba(109,40,217,.18);
      border-radius: 999px; padding: 5px 14px 5px 10px;
    }

    .card { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; }
    .card-lift { transition: border-color .22s, box-shadow .22s, transform .22s; }
    .card-lift:hover {
      border-color: rgba(109,40,217,.22);
      box-shadow: 0 14px 44px rgba(109,40,217,.09);
      transform: translateY(-2px);
    }

    .icon-box {
      width: 44px; height: 44px; border-radius: 12px;
      background: rgba(109,40,217,.07); border: 1px solid rgba(109,40,217,.14);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: background .2s, border-color .2s;
    }
    .card-lift:hover .icon-box {
      background: linear-gradient(135deg, rgba(109,40,217,.14), rgba(139,92,246,.09));
      border-color: rgba(109,40,217,.26);
    }

    @keyframes pulse-ring {
      0%   { transform: scale(1); opacity: .65; }
      100% { transform: scale(2.4); opacity: 0; }
    }
    .pulse-dot {
      position: relative; width: 7px; height: 7px;
      border-radius: 50%; background: var(--accent-2); flex-shrink: 0;
    }
    .pulse-dot::before {
      content: ''; position: absolute; inset: 0; border-radius: 50%;
      background: var(--accent-2); animation: pulse-ring 2s ease-out infinite;
    }

    @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
    .ticker-inner { display: flex; white-space: nowrap; animation: ticker 36s linear infinite; }

    @keyframes float-a { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
    @keyframes float-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(9px)} }
    @keyframes float-c { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    .float-a { animation: float-a 7s ease-in-out infinite; }
    .float-b { animation: float-b 9s ease-in-out infinite 1.4s; }
    .float-c { animation: float-c 8s ease-in-out infinite 2.8s; }

    .float-widget {
      background: rgba(255,255,255,.90); backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,.95); border-radius: 14px;
      box-shadow: 0 8px 36px rgba(109,40,217,.10), 0 1px 0 rgba(255,255,255,.6) inset;
      padding: 16px 20px; min-width: 200px;
    }

    .value-row {
      border-top: 1px solid var(--line-2); transition: background .18s;
      border-radius: 6px;
    }
    .value-row:hover { background: rgba(109,40,217,.028); }
    .value-row:first-child { border-top: none; }

    .dept-chip {
      font-size: 11px; font-weight: 700;
      font-family: 'Manrope', sans-serif;
      padding: 6px 16px; border-radius: 999px; border: 1px solid transparent;
    }

    .hero-glow {
      position: absolute; border-radius: 50%;
      filter: blur(80px); pointer-events: none;
    }

    /* ── Pay section redesign ── */
    @keyframes scan-line {
      0% { top: 0%; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    .scan-line {
      position: absolute;
      left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(109,40,217,.35), transparent);
      animation: scan-line 4s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes counter-up {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .pay-stat:hover .pay-stat-inner {
      background: rgba(109,40,217,.06);
      border-color: rgba(109,40,217,.22);
    }

    /* ── Hiring section (from HiringSection.jsx) ── */
    @keyframes spine-fill {
      from { width: 0; }
    }
  `}</style>
);

/* ─── SVG ICON SYSTEM ───────────────────────────────────── */
const paths = {
  trendUp:    "M23 6L13.5 15.5 8.5 10.5 1 18M17 6h6v6",
  layers:     "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  cpu:        "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3",
  book:       "M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
  globe:      "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  heart:      "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  clock:      "M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2",
  award:      "M12 15a6 6 0 100-12 6 6 0 000 12zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  search:     "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35",
  send:       "M22 2L11 13M22 2L15 22 11 13 2 9l20-7z",
  mail:       "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  arrowDown:  "M12 5v14M19 12l-7 7-7-7",
  clipBoard:  "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M8 2h8v4H8z",
  phone:      "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  wrench:     "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  gift:       "M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z",
  check:      "M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3",
  barChart:   "M18 20V10M12 20V4M6 20v-6",
  users:      "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  zap:        "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  sparkle:    "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z",
  rupee:      "M6 3h12M6 8h12M6 13l8.5 8M6 13c0 0 4 0 6-3",
  shield:     "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  target:     "M22 12A10 10 0 1112 2M22 12a10 10 0 01-10 10M22 12H12M12 2v10",
  infinite:   "M12 12c-2-2.5-4-4-6-4a4 4 0 000 8c2 0 4-1.5 6-4zM12 12c2 2.5 4 4 6 4a4 4 0 000-8c-2 0-4 1.5-6 4z",
};

const Icon = ({ name, size = 18, color = "currentColor", sw = 1.7 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {(paths[name] || "").split("M").filter(Boolean).map((d, i) => (
      <path key={i} d={"M" + d} />
    ))}
  </svg>
);

/* ─── DATA ──────────────────────────────────────────────── */
const BENEFITS = [
  { icon: "trendUp", title: "Competitive Pay",       body: "Transparent salary bands, project bonuses, and bi-annual reviews tied to impact — not tenure.",   tag: "Pay & Equity",  accent: "#6d28d9" },
  { icon: "layers",  title: "Ship Real Work",        body: "No sandbox projects. Your decisions shape live products used by real businesses from week one.",  tag: "Impact",        accent: "#7c3aed" },
  { icon: "cpu",     title: "AI-Native Stack",       body: "We adopt the best tools aggressively. You stay ahead of the curve — not chasing it.",            tag: "Tools",         accent: "#8b5cf6" },
  { icon: "book",    title: "₹50k Learning Budget",  body: "Courses, conferences, tooling — we invest in people who invest in themselves. No approvals.",     tag: "Growth",        accent: "#6d28d9" },
  { icon: "globe",   title: "Async-First Culture",   body: "Bangalore is home base, but the world is our client list. Work when you're sharpest.",            tag: "Flexibility",   accent: "#7c3aed" },
  { icon: "heart",   title: "Health & Wellness",     body: "Medical coverage for you and your family. Mental health support and wellness allowance included.", tag: "Health",        accent: "#8b5cf6" },
  { icon: "clock",   title: "Fast Decision Loop",    body: "Hire-to-offer in under 48 hours. Flat hierarchy means your ideas reach decision-makers directly.", tag: "Speed",         accent: "#6d28d9" },
  { icon: "award",   title: "Founding Team Energy",  body: "Early hires shape the culture, the process, and the trajectory. Real ownership from day one.",    tag: "Ownership",     accent: "#7c3aed" },
];

const VALUES = [
  { n: "01", h: "Craft over speed",     b: "We move fast but never cut corners. The details matter — clients can always tell the difference between good and exceptional." },
  { n: "02", h: "Radical honesty",      b: "Direct feedback, transparent pay, open post-mortems. No sugarcoating, no corporate euphemisms — ever." },
  { n: "03", h: "Client obsession",     b: "Our reputation is built on outcomes, not deliverables. We are not done until they are genuinely thrilled." },
  { n: "04", h: "Relentless curiosity", b: "Tools, techniques, industries — the moment you stop learning, you stop being useful in this industry." },
];

const STEPS = [
  { n: "01", icon: "clipBoard", title: "Apply online",    body: "Send your CV or portfolio. Every application is reviewed personally by a team lead — no ATS filters, no automated rejections.", time: "~5 min" },
  { n: "02", icon: "phone",     title: "Intro call",      body: "30 minutes with a team lead. No prep required — we want to understand how you think, not test you on trivia.",                time: "30 min" },
  { n: "03", icon: "wrench",    title: "Paid task",       body: "A short real-world task, compensated fairly. Designed to show how you actually work — not how you perform under pressure.",  time: "2–4 hrs · Paid" },
  { n: "04", icon: "gift",      title: "Offer & onboard", body: "A decision within 48 hours. Transparent offer, no lowball tactics — onboarded within days of signing.",                      time: "<48h decision" },
];

const TRUST_HIRING = [
  { icon: "check", label: "No ATS filters" },
  { icon: "clock", label: "Offer in <48 hours" },
  { icon: "rupee", label: "Paid take-home task" },
  { icon: "users", label: "Reviewed by team lead" },
];

const STATS = [
  { n: "20+",  l: "Projects Shipped",    sub: "Since 2023" },
  { n: "98%",  l: "Client Satisfaction", sub: "Based on NPS surveys" },
  { n: "6 mo", l: "Post-Launch Support", sub: "Included with every project" },
  { n: "<48h", l: "Hiring Decision",     sub: "Fastest in the industry" },
];

const DEPTS = [
  { label: "Design",          color: "#6d28d9", bg: "rgba(109,40,217,.07)", bd: "rgba(109,40,217,.18)" },
  { label: "Engineering",     color: "#7c3aed", bg: "rgba(124,58,237,.07)",  bd: "rgba(124,58,237,.18)"  },
  { label: "Growth",          color: "#5b21b6", bg: "rgba(91,33,182,.07)",   bd: "rgba(91,33,182,.18)"   },
  { label: "AI & Automation", color: "#8b5cf6", bg: "rgba(139,92,246,.07)",  bd: "rgba(139,92,246,.18)"  },
];

/* ─── HOOKS ─────────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, vis];
}

/* ─── REDESIGNED BENEFIT CARD (GLASSMORPHISM BENTO) ──────── */
function BenefitCard({ b, i, vis, layout }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: layout === "horizontal" ? "row" : "column",
        alignItems: layout === "horizontal" ? "center" : "flex-start",
        gap: 24,
        background: hovered ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: hovered ? `1px solid ${b.accent}70` : "1px solid rgba(255, 255, 255, 0.8)",
        borderRadius: 24,
        padding: layout === "horizontal" ? "36px 48px" : "32px",
        transition: `all 500ms cubic-bezier(0.4, 0, 0.2, 1) ${i * 45}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? (hovered ? "translateY(-4px)" : "none") : "translateY(22px)",
        boxShadow: hovered
          ? `0 24px 48px rgba(109,40,217,0.08), 0 0 0 1px ${b.accent}15 inset`
          : "0 8px 32px rgba(109,40,217,0.03), 0 0 0 1px rgba(255,255,255,0.4) inset",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* Internal Glass Ambient Glow */}
      <div style={{
        position: "absolute",
        top: -60,
        right: -60,
        width: 160,
        height: 160,
        background: b.accent,
        filter: "blur(70px)",
        opacity: hovered ? 0.35 : 0.1,
        transition: "opacity 0.6s ease",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* High-Contrast Icon Box */}
      <div style={{
        position: "relative",
        zIndex: 1,
        width: layout === "horizontal" ? 64 : 52,
        height: layout === "horizontal" ? 64 : 52,
        borderRadius: 16,
        background: hovered ? b.accent : "var(--surface)",
        border: `1px solid ${hovered ? b.accent : "rgba(109,40,217,.12)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        transition: "all .4s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "scale(1.08) rotate(-6deg)" : "none",
        boxShadow: hovered ? `0 12px 24px ${b.accent}45` : "0 4px 12px rgba(109,40,217,0.05)"
      }}>
        <Icon name={b.icon} size={layout === "horizontal" ? 28 : 22} color={hovered ? "#fff" : b.accent} sw={2} />
      </div>

      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: layout === "horizontal" ? 10 : 16 }}>
          <span style={{
            fontSize: 10, fontWeight: 800, letterSpacing: ".18em",
            textTransform: "uppercase",
            color: hovered ? b.accent : "var(--muted)",
            transition: "color .3s",
          }}>{b.tag}</span>
        </div>

        <h3 style={{
          fontSize: layout === "horizontal" ? 26 : 19,
          fontWeight: 800, letterSpacing: "-.02em",
          color: "var(--ink)", marginBottom: 12,
          lineHeight: 1.15,
        }}>{b.title}</h3>

        <p style={{
          fontSize: 14, lineHeight: 1.7, color: "var(--ink-3)",
          maxWidth: layout === "horizontal" ? "85%" : "100%",
          transition: "color .3s",
        }}>{b.body}</p>
      </div>

      {/* High-Contrast Call to Action Indicator */}
      <div style={{
        position: layout === "horizontal" ? "relative" : "absolute",
        bottom: layout === "horizontal" ? "auto" : 28,
        right: layout === "horizontal" ? "auto" : 28,
        width: 38, height: 38, borderRadius: "50%",
        background: "var(--ink)",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scale(1) translateX(0)" : "scale(0.8) translateX(-15px)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 1,
        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
      }}>
        <Icon name="arrowRight" size={16} color="#fff" sw={2.2} />
      </div>
    </div>
  );
}

/* ─── STEP CARD (Hiring) ─────────────────────────────────── */
function StepCard({ step, index, active, onActivate, visible }) {
  const isActive = active === index;
  return (
    <div
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        flex: 1, padding: "0 10px", cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity 560ms ease ${index * 110}ms, transform 560ms ease ${index * 110}ms`,
      }}
      onClick={() => onActivate(index)}
    >
      {/* Node circle */}
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: "var(--surface)",
        border: `3px solid ${isActive ? "var(--accent-2)" : "rgba(109,40,217,.22)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 2, flexShrink: 0,
        boxShadow: isActive
          ? "0 0 0 10px rgba(109,40,217,.10), 0 8px 28px rgba(109,40,217,.22)"
          : "0 0 0 6px rgba(109,40,217,.06)",
        transition: "border-color .28s, box-shadow .28s, transform .28s",
        transform: isActive ? "scale(1.08)" : "scale(1)",
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: isActive
            ? "linear-gradient(135deg, var(--accent-1), var(--accent-mid))"
            : "rgba(109,40,217,.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background .28s",
        }}>
          <Icon name={step.icon} size={isActive ? 20 : 18} color={isActive ? "#fff" : "var(--accent-2)"} sw={1.8} />
        </div>
        <span style={{
          position: "absolute", top: -6, right: -6,
          fontSize: 9, fontWeight: 800, letterSpacing: ".06em",
          color: "var(--surface)",
          background: isActive ? "var(--accent-2)" : "var(--muted)",
          borderRadius: 999, padding: "2px 7px",
          fontFamily: "'Manrope', sans-serif",
          transition: "background .28s",
        }}>{step.n}</span>
      </div>

      {/* Tick */}
      <div style={{
        width: 2, height: 22,
        background: isActive
          ? "linear-gradient(180deg, rgba(109,40,217,.6), rgba(109,40,217,.1))"
          : "rgba(109,40,217,.12)",
        transition: "background .28s",
      }} />

      {/* Card */}
      <div style={{
        width: "100%", background: "var(--surface)",
        border: `1px solid ${isActive ? "rgba(109,40,217,.30)" : "rgba(109,40,217,.10)"}`,
        borderRadius: 16, padding: "22px 18px",
        position: "relative", overflow: "hidden",
        transition: "border-color .28s, box-shadow .28s, transform .28s",
        boxShadow: isActive ? "0 14px 40px rgba(109,40,217,.10)" : "none",
        transform: isActive ? "translateY(-3px)" : "none",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, var(--accent-1), var(--accent-mid))",
          opacity: isActive ? 1 : 0, transition: "opacity .28s",
          borderRadius: "16px 16px 0 0",
        }} />
        <span style={{
          position: "absolute", bottom: 6, right: 14,
          fontSize: 56, fontWeight: 800,
          color: "rgba(109,40,217,.045)", lineHeight: 1,
          pointerEvents: "none", fontFamily: "'Manrope', sans-serif",
          letterSpacing: "-.04em",
        }}>{step.n}</span>

        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: isActive ? "rgba(109,40,217,.09)" : "rgba(109,40,217,.05)",
          border: `1px solid ${isActive ? "rgba(109,40,217,.22)" : "rgba(109,40,217,.10)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 14, transition: "background .28s, border-color .28s",
        }}>
          <Icon name={step.icon} size={16} color="var(--accent-2)" sw={1.8} />
        </div>

        <h4 style={{
          fontSize: 14, fontWeight: 700, color: "var(--ink)",
          marginBottom: 8, letterSpacing: "-.01em", fontFamily: "'Manrope', sans-serif",
        }}>{step.title}</h4>
        <p style={{ fontSize: 12.5, lineHeight: 1.75, color: "var(--ink-3)", marginBottom: 16 }}>{step.body}</p>
        <span style={{
          display: "inline-block", fontSize: 9, fontWeight: 800,
          letterSpacing: ".16em", textTransform: "uppercase",
          color: "var(--accent-2)", background: "rgba(109,40,217,.06)",
          border: "1px solid rgba(109,40,217,.16)", borderRadius: 999,
          padding: "4px 11px", fontFamily: "'Manrope', sans-serif",
        }}>{step.time}</span>
      </div>
    </div>
  );
}

/* ─── REDESIGNED BENEFITS SECTION (GLASSMORPHISM BENTO) ──── */
function BenefitsSection({ benRef, benVis, reveal }) {
  return (
    <section id="culture" style={{ 
      background: "linear-gradient(180deg, #f0effe 0%, #ffffff 100%)", 
      padding: "120px 0", 
      overflow: "hidden", 
      position: "relative" 
    }}>
      {/* Giant Ambient Gradient Orbs */}
      <div aria-hidden style={{ 
        position: "absolute", top: "10%", left: "-10%", width: "45vw", height: "45vw", 
        background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 60%)", 
        filter: "blur(80px)", zIndex: 0, pointerEvents: "none" 
      }} />
      <div aria-hidden style={{ 
        position: "absolute", bottom: "5%", right: "-5%", width: "40vw", height: "40vw", 
        background: "radial-gradient(circle, rgba(109,40,217,0.10) 0%, transparent 60%)", 
        filter: "blur(80px)", zIndex: 0, pointerEvents: "none" 
      }} />

      <div ref={benRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", ...reveal(benVis), position: "relative", zIndex: 1 }}>

        {/* Header Block */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 72 }}>
          <p className="t-label" style={{ marginBottom: 18 }}>Why Stryvenix</p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(2.8rem, 5vw, 4.8rem)",
            fontWeight: 800, letterSpacing: "-.04em",
            lineHeight: .95, color: "var(--ink)", marginBottom: 24
          }}>
            More than a job.<br />
            <span style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              background: "linear-gradient(120deg, #6d28d9 0%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>A creative playground.</span>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--ink-3)", maxWidth: 600 }}>
            Every part of working at Stryvenix is designed to help you do the best work of your career — from day one through the long haul.
          </p>
        </div>

        {/* Bento Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          position: "relative",
        }}>
          {BENEFITS.map((b, i) => {
            // Bento Grid Sizing Rules
            let colSpan = "span 1";
            let rowSpan = "span 1";
            let layout = "vertical";

            if (i === 0) { colSpan = "span 2"; rowSpan = "span 2"; layout = "vertical"; }
            else if (i === 3) { colSpan = "span 2"; layout = "horizontal"; }
            else if (i === 4) { colSpan = "span 2"; layout = "horizontal"; }
            else if (i === 7) { colSpan = "span 4"; layout = "horizontal"; }

            return (
              <div key={b.title} style={{ gridColumn: colSpan, gridRow: rowSpan }}>
                <BenefitCard b={b} i={i} vis={benVis} layout={layout} />
              </div>
            );
          })}
        </div>

        {/* High-Contrast Bottom Strip */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: 64, paddingTop: 36,
          borderTop: "1px solid rgba(109,40,217,.1)",
        }}>
          <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600, letterSpacing: ".02em" }}>
            Stryvenix · Bangalore, India · Available Worldwide
          </p>
          <a href="#openings" className="btn-primary" style={{ padding: "12px 26px", fontSize: 13, background: "var(--ink)", boxShadow: "0 8px 24px rgba(13,13,26,0.25)" }}>
            Explore open roles <Icon name="arrowRight" size={14} color="#fff" sw={2.2} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── REDESIGNED PAY SECTION (LIGHT THEME) ───────────────────────── */
/* Drop-in replacement for the existing PaySection component  */

function PaySection() {
  const [ref, vis] = useReveal(0.1);
  const [activePillar, setActivePillar] = useState(null);
  const [ticker, setTicker] = useState(0);

  /* Subtle number ticker for the big stat */
  useEffect(() => {
    if (!vis) return;
    const id = setInterval(() => setTicker(t => (t + 1) % 3), 3200);
    return () => clearInterval(id);
  }, [vis]);

  const PILLARS = [
    {
      id: "bands",
      icon: "barChart",
      kicker: "No secrets",
      headline: "Open pay bands",
      bigStat: "100%",
      bigUnit: "Transparent",
      color: "#6d28d9", // Deep purple
      colorSoft: "rgba(109,40,217,.06)",
      desc: "Every role has a published salary range. No mystery, no negotiation games — you'll know before your first call.",
      chips: ["Published before interview", "Updated bi-annually", "Tied to market data"],
    },
    {
      id: "reviews",
      icon: "trendUp",
      kicker: "Twice a year",
      headline: "Performance reviews",
      bigStat: "2×",
      bigUnit: "Per year",
      color: "#7c3aed",
      colorSoft: "rgba(124,58,237,.06)",
      desc: "Bi-annual reviews tied to real impact and growth — not time served or managerial favouritism.",
      chips: ["Impact-based scoring", "360° peer feedback", "Fast-track promotions"],
    },
    {
      id: "perks",
      icon: "gift",
      kicker: "Day one",
      headline: "Bonus & perks",
      bigStat: "₹50k",
      bigUnit: "Learning budget",
      color: "#8b5cf6",
      colorSoft: "rgba(139,92,246,.06)",
      desc: "Project bonuses, a real learning budget, health coverage for your family, and a wellness allowance.",
      chips: ["Project performance bonus", "Health + family coverage", "Wellness allowance"],
    },
  ];

  const cycleStats = [
    { n: "100%", l: "Pay transparency" },
    { n: "2×",   l: "Annual reviews" },
    { n: "₹50k", l: "Learning budget" },
  ];

  return (
    <section
      style={{
        background: "#ffffff", // Light background
        padding: "0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Noise overlay for texture ── */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: 0.6, // Softened for light mode
        }}
      />

      {/* ── Subtle grid lines ── */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `linear-gradient(rgba(0,0,0,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Glow orbs (reduced opacity for light mode) ── */}
      <div aria-hidden style={{ position: "absolute", top: -200, right: -100, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,40,217,.08) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute", bottom: -160, left: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,.06) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

      <div
        ref={ref}
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}
      >

        {/* ══════════════════════════════════════
            TOP EDITORIAL HEADER BAND
        ══════════════════════════════════════ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "end",
          gap: 40,
          padding: "96px 0 64px",
          borderBottom: "1px solid rgba(0,0,0,.08)",
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(28px)",
          transition: "opacity .8s ease, transform .8s ease",
        }}>
          <div>
            {/* Kicker */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 28, height: 1, background: "rgba(109,40,217,.6)" }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".22em", textTransform: "uppercase", color: "#6d28d9" }}>
                Pay philosophy
              </span>
            </div>

            {/* Giant headline — editorial split */}
            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(3.4rem, 6.5vw, 6rem)",
              fontWeight: 800, letterSpacing: "-.05em",
              lineHeight: .9, color: "#0f172a", // Dark slate
              margin: 0,
            }}>
              <span style={{ display: "block" }}>Transparent.</span>
              <span style={{ display: "block" }}>Competitive.</span>
              <span
                style={{
                  display: "block",
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  background: "linear-gradient(120deg, #5b21b6 0%, #7c3aed 60%, #a78bfa 100%)", // Darker gradient for legibility
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >Fair.</span>
            </h2>
          </div>

          {/* Right side — animated cycling stat */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, paddingBottom: 8,
          }}>
            <div style={{
              background: "rgba(0,0,0,.02)",
              border: "1px solid rgba(0,0,0,.06)",
              borderRadius: 16,
              padding: "24px 32px",
              textAlign: "right",
              minWidth: 180,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0, borderRadius: 16,
                background: "linear-gradient(135deg, rgba(109,40,217,.06) 0%, rgba(139,92,246,.03) 100%)",
              }} />
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: "clamp(2.8rem, 4vw, 3.8rem)", fontWeight: 800, letterSpacing: "-.05em", lineHeight: 1, color: "#6d28d9", fontFamily: "'Manrope',sans-serif" }}>
                  {cycleStats[ticker].n}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".10em", textTransform: "uppercase", color: "rgba(0,0,0,.55)", marginTop: 6 }}>
                  {cycleStats[ticker].l}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 4, marginTop: 14 }}>
                  {cycleStats.map((_, i) => (
                    <div key={i} style={{ width: i === ticker ? 18 : 5, height: 3, borderRadius: 99, background: i === ticker ? "#6d28d9" : "rgba(0,0,0,.12)", transition: "width .4s ease, background .4s ease" }} />
                  ))}
                </div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: "rgba(0,0,0,.55)", fontWeight: 500, textAlign: "right", maxWidth: 200, lineHeight: 1.6 }}>
              What you earn shouldn't be a secret.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════
            THREE PILLARS — HORIZONTAL ACCORDION
        ══════════════════════════════════════ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          padding: "1px 0",
          background: "rgba(0,0,0,.05)", // Divider lines between cards
          marginBottom: 1,
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(32px)",
          transition: "opacity .8s ease .15s, transform .8s ease .15s",
        }}>
          {PILLARS.map((p, i) => {
            const isActive = activePillar === i;
            return (
              <div
                key={p.id}
                onMouseEnter={() => setActivePillar(i)}
                onMouseLeave={() => setActivePillar(null)}
                style={{
                  background: isActive ? "rgba(250,250,250,1)" : "#ffffff", // Subtle hover state
                  padding: "48px 40px 52px",
                  cursor: "default",
                  transition: "background .3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Hover color wash */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(145deg, ${p.colorSoft} 0%, transparent 65%)`,
                  opacity: isActive ? 1 : 0,
                  transition: "opacity .35s ease",
                  pointerEvents: "none",
                }} />

                {/* Left accent bar */}
                <div style={{
                  position: "absolute", top: 0, left: 0, bottom: 0, width: 2,
                  background: `linear-gradient(180deg, transparent, ${p.color}, transparent)`,
                  opacity: isActive ? 1 : 0,
                  transition: "opacity .35s ease",
                }} />

                {/* Top accent line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${p.color}88, transparent)`,
                  opacity: isActive ? 1 : 0,
                  transition: "opacity .35s ease",
                }} />

                <div style={{ position: "relative" }}>
                  {/* Kicker */}
                  <span style={{
                    fontSize: 9, fontWeight: 800, letterSpacing: ".20em",
                    textTransform: "uppercase",
                    color: isActive ? p.color : "rgba(0,0,0,.45)",
                    transition: "color .3s ease",
                    display: "block", marginBottom: 20,
                  }}>{p.kicker}</span>

                  {/* Icon ring */}
                  <div style={{
                    width: 50, height: 50, borderRadius: "50%",
                    border: `1.5px solid ${isActive ? p.color : "rgba(0,0,0,.12)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 28,
                    background: isActive ? `${p.color}18` : "transparent",
                    transition: "border-color .3s, background .3s, transform .3s",
                    transform: isActive ? "scale(1.08)" : "none",
                  }}>
                    <Icon name={p.icon} size={18} color={isActive ? p.color : "rgba(0,0,0,.45)"} sw={1.8} />
                  </div>

                  {/* Big stat */}
                  <div style={{ marginBottom: 24 }}>
                    <span style={{
                      display: "block",
                      fontSize: "clamp(2.4rem, 3.5vw, 3.4rem)",
                      fontWeight: 800, letterSpacing: "-.05em", lineHeight: 1,
                      color: isActive ? p.color : "rgba(0,0,0,.85)",
                      transition: "color .3s ease",
                      fontFamily: "'Manrope',sans-serif",
                    }}>{p.bigStat}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "rgba(0,0,0,.45)",
                      marginTop: 5, display: "block",
                    }}>{p.bigUnit}</span>
                  </div>

                  {/* Rule */}
                  <div style={{
                    height: 1,
                    background: isActive ? `linear-gradient(90deg, ${p.color}50, transparent)` : "rgba(0,0,0,.08)",
                    marginBottom: 24,
                    transition: "background .3s",
                  }} />

                  <h3 style={{
                    fontSize: 16, fontWeight: 800, letterSpacing: "-.025em",
                    color: "#0f172a", marginBottom: 12,
                    fontFamily: "'Manrope',sans-serif",
                  }}>{p.headline}</h3>

                  <p style={{
                    fontSize: 13, lineHeight: 1.8,
                    color: "rgba(0,0,0,.60)",
                    marginBottom: 28,
                  }}>{p.desc}</p>

                  {/* Chips */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {p.chips.map((c, ci) => (
                      <div
                        key={c}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateX(0)" : "translateX(-8px)",
                          transition: `opacity .3s ease ${ci * 60}ms, transform .3s ease ${ci * 60}ms`,
                        }}
                      >
                        <div style={{
                          width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                          border: `1px solid ${p.color}55`,
                          background: `${p.color}18`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Icon name="check" size={9} color={p.color} sw={2.5} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(0,0,0,.65)" }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════
            BOTTOM PROMISE STRIP
        ══════════════════════════════════════ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap: 40,
          padding: "40px 0 96px",
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(20px)",
          transition: "opacity .8s ease .3s, transform .8s ease .3s",
        }}>
          {/* Left — tag strip */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              { icon: "shield",   label: "No lowball offers" },
              { icon: "clock",    label: "Know before your first call" },
              { icon: "infinite", label: "No expiry on learning budget" },
              { icon: "users",    label: "Flat hierarchy, fair comp" },
            ].map(({ icon, label }) => (
              <div key={label} style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "rgba(0,0,0,.03)",
                border: "1px solid rgba(0,0,0,.06)",
                borderRadius: 999, padding: "7px 14px",
              }}>
                <Icon name={icon} size={12} color="#6d28d9" sw={1.8} />
                <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(0,0,0,.65)" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Right — promise lockup */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            background: "rgba(0,0,0,.02)",
            border: "1px solid rgba(0,0,0,.06)",
            borderRadius: 12, padding: "16px 22px",
            flexShrink: 0,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: "linear-gradient(135deg, #6d28d9, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(109,40,217,.25)", // Softened shadow for light mode
            }}>
              <Icon name="shield" size={16} color="#fff" sw={1.8} />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(0,0,0,.85)", letterSpacing: "-.01em", lineHeight: 1.3 }}>
                Our promise to you
              </p>
              <p style={{ fontSize: 11, color: "rgba(0,0,0,.55)", fontStyle: "italic", marginTop: 2, lineHeight: 1.3 }}>
                "No surprises at offer time — ever."
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── HIRING SECTION ─────────────────────────────────────── */
function HiringSection() {
  const [sectionRef, visible] = useReveal(0.06);
  const [active, setActive] = useState(0);

  return (
    <section style={{ background: "var(--surface-3)", padding: "96px 0" }}>
      <div
        ref={sectionRef}
        style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 32px",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(22px)",
          transition: "opacity .7s ease, transform .7s ease",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          alignItems: "flex-end", justifyContent: "space-between",
          gap: 28, marginBottom: 60,
        }}>
          <div>
            <p className="t-label" style={{ marginBottom: 14 }}>How we hire</p>
            <h2 className="t-section">
              Simple. Fast.{" "}
              <span style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
                background: "linear-gradient(120deg, var(--accent-1) 0%, var(--accent-mid) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Human.</span>
            </h2>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--ink-3)", maxWidth: 340 }}>
            No six-round gauntlets. We respect your time and make decisions with urgency — not bureaucracy.
          </p>
        </div>

        {/* Steps track */}
        <div style={{ position: "relative" }}>
          {/* Background spine */}
          <div style={{
            position: "absolute",
            top: 36, left: "calc(10% + 10px)", right: "calc(10% + 10px)",
            height: 3, background: "rgba(109,40,217,.10)", borderRadius: 2, zIndex: 0,
          }} />
          {/* Filled spine */}
          <div style={{
            position: "absolute",
            top: 36, left: "calc(10% + 10px)",
            width: `calc(${(active / 3) * 80}% * 0.8)`,
            height: 3,
            background: "linear-gradient(90deg, var(--accent-1), var(--accent-mid))",
            borderRadius: 2, zIndex: 1,
            transition: "width .6s cubic-bezier(.4,0,.2,1)",
          }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", position: "relative", zIndex: 2 }}>
            {STEPS.map((s, i) => (
              <StepCard key={s.n} step={s} index={i} active={active} onActivate={setActive} visible={visible} />
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          gap: 32, marginTop: 52, paddingTop: 36,
          borderTop: "1px solid var(--line-2)",
        }}>
          {TRUST_HIRING.map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name={icon} size={14} color="var(--accent-2)" sw={2} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-3)", fontFamily: "'Manrope', sans-serif" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function Careers() {
  const [heroRef,  heroVis]  = useReveal(0.05);
  const [statRef,  statVis]  = useReveal(0.1);
  const [benRef,   benVis]   = useReveal(0.08);
  const [valRef,   valVis]   = useReveal(0.08);
  const [noRef,    noVis]    = useReveal(0.08);

  const reveal = (vis, delay = 0) => ({
    transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(22px)",
  });

  return (
    <div className="careers-root">
      <GlobalStyles />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section
        className="grid-bg"
        style={{ minHeight: "92vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}
      >
        <div className="hero-glow" style={{ width: 600, height: 600, top: -180, right: -60, background: "radial-gradient(circle, rgba(139,92,246,.18) 0%, rgba(109,40,217,.08) 50%, transparent 70%)" }} />
        <div className="hero-glow" style={{ width: 400, height: 400, bottom: -80, left: -60, background: "radial-gradient(circle, rgba(109,40,217,.10) 0%, transparent 70%)" }} />

        <div className="float-widget float-a" style={{ position: "absolute", right: 56, top: 120 }}>
          <div className="hidden xl:block">
            <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>Stryvenix</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>20+ Projects Shipped</p>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
              <p style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 500 }}>Growing fast · Since 2023</p>
            </div>
          </div>
        </div>

        <div className="float-widget float-b" style={{ position: "absolute", right: 148, top: 300 }}>
          <div className="hidden xl:block">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--g-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(109,40,217,.35)" }}>
                <Icon name="globe" size={15} color="#fff" sw={1.8} />
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Remote-Friendly</p>
                <p style={{ fontSize: 10, color: "var(--muted)", fontWeight: 500, marginTop: 1 }}>Bangalore & Worldwide</p>
              </div>
            </div>
          </div>
        </div>

        <div className="float-widget float-c" style={{ position: "absolute", right: 64, bottom: 160 }}>
          <div className="hidden xl:block">
            <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>Culture</p>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Async-First · No Politics</p>
            <p style={{ fontSize: 11, color: "var(--accent-2)", fontWeight: 600, marginTop: 4 }}>₹50k learning budget</p>
          </div>
        </div>

        <div
          ref={heroRef}
          style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 32px", width: "100%", ...reveal(heroVis), transition: "opacity .9s ease, transform .9s ease" }}
        >
          <div className="badge" style={{ marginBottom: 36 }}>
            <span className="pulse-dot" />
            Building the team · Bangalore &amp; Remote
          </div>

          <h1 className="t-hero" style={{ maxWidth: 820, marginBottom: 28 }}>
            Build work you're <span className="g-text-serif">proud</span> of.
          </h1>

          <p style={{ fontSize: 17, lineHeight: 1.8, color: "var(--ink-3)", maxWidth: 490, marginBottom: 44 }}>
            Stryvenix is a focused digital agency building premium websites and
            AI-powered systems for ambitious brands globally. We look for people
            who obsess over craft — not just output.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 80 }}>
            <a href="#openings" className="btn-primary">
              See open roles <Icon name="arrowDown" size={15} color="#fff" sw={2.2} />
            </a>
            <a href="#culture" className="btn-outline">
              Our culture <Icon name="arrowRight" size={14} color="var(--ink-2)" sw={2} />
            </a>
          </div>

          {/* stat strip */}
          <div
            ref={statRef}
            style={{
              display: "grid", gridTemplateColumns: "repeat(4,1fr)",
              background: "var(--surface)", border: "1px solid var(--line)",
              borderRadius: 14, overflow: "hidden", maxWidth: 720,
              boxShadow: "0 4px 24px rgba(109,40,217,.06)",
              ...reveal(statVis, 320),
            }}
          >
            {STATS.map(({ n, l, sub }, i) => (
              <div key={l} style={{ padding: "22px 26px", borderLeft: i > 0 ? "1px solid var(--line)" : "none", position: "relative" }}>
                {i === 0 && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--g-primary)", borderRadius: "0 0 2px 2px" }} />}
                <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1, marginBottom: 5 }} className="g-text">{n}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-2)", marginBottom: 2 }}>{l}</div>
                <div style={{ fontSize: 10, color: "var(--muted)", fontWeight: 500 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          TICKER
      ══════════════════════════════ */}
      <div style={{ overflow: "hidden", background: "var(--g-primary)", padding: "11px 0", boxShadow: "0 2px 20px rgba(109,40,217,.25)" }} aria-hidden="true">
        <div className="ticker-inner">
          {Array(3).fill(["Bangalore & Remote","Transparent Pay","Async-First Culture","AI-Native Stack","Zero Politics","₹50k Learning Budget","20+ Projects Shipped","98% Client Satisfaction","Offers in 48 Hours"]).flat().map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,.85)", fontSize: 10, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", padding: "0 28px" }}>
              <span style={{ display: "block", width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,.45)" }} />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          BENEFITS — REDESIGNED
      ══════════════════════════════ */}
      <BenefitsSection benRef={benRef} benVis={benVis} reveal={reveal} />

      {/* ══════════════════════════════
          VALUES
      ══════════════════════════════ */}
      <section style={{ background: "var(--surface)", padding: "96px 0" }} ref={valRef}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", ...reveal(valVis) }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px 80px", alignItems: "start" }}>
            <div>
              <p className="t-label" style={{ marginBottom: 14 }}>How we operate</p>
              <h2 className="t-section" style={{ marginBottom: 48 }}>
                Strong opinions.<br /><span className="g-text-serif">Loosely held.</span>
              </h2>
              <div>
                {VALUES.map(({ n, h, b }) => (
                  <div key={h} className="value-row" style={{ display: "flex", gap: 20, padding: "22px 6px", cursor: "default" }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: "var(--muted-2)", marginTop: 2, width: 20, flexShrink: 0 }}>{n}</span>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 7, letterSpacing: "-.01em" }}>{h}</h4>
                      <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--ink-3)" }}>{b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="card" style={{ padding: 36, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--g-primary)" }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: 280, height: 280, pointerEvents: "none", background: "radial-gradient(circle at 100% 0%, rgba(109,40,217,.06) 0%, transparent 60%)" }} />
                <p className="t-label" style={{ marginBottom: 16 }}>The team</p>
                <h3 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.03em", color: "var(--ink)", lineHeight: 1.1, marginBottom: 18 }}>
                  Small team.<br /><span className="g-text-serif">Outsized impact.</span>
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--ink-3)", marginBottom: 28 }}>
                  We keep the team intentionally lean. Fewer meetings, more shipping. Everyone touches real client work — designers who think in systems, developers who care about UX, strategists who write clean briefs. No passengers. No politics.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[["Async-first","Work when you're sharpest"],["No micromanagement","Own your work end-to-end"],["AI-augmented","Always ahead of the curve"],["₹50k learning budget","Grow constantly"]].map(([t, s]) => (
                    <div key={t} style={{ background: "var(--surface-2)", border: "1px solid var(--line-2)", borderRadius: 11, padding: "13px 15px" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>{t}</p>
                      <p style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.45 }}>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: "22px 26px" }}>
                <p className="t-label" style={{ marginBottom: 14 }}>Our Stack</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {["Figma-native","React / Next.js","Node.js / AWS","AI-first","GSAP / Framer","Flat hierarchy","Remote-friendly"].map((t) => (
                    <span key={t} style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-2)", background: "rgba(109,40,217,.06)", border: "1px solid rgba(109,40,217,.14)", borderRadius: 7, padding: "5px 11px" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          NO OPENINGS
      ══════════════════════════════ */}
      <section id="openings" style={{ background: "var(--surface-2)", padding: "96px 0" }}>
        <div ref={noRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", ...reveal(noVis) }}>
          <div style={{ marginBottom: 44 }}>
            <p className="t-label" style={{ marginBottom: 14 }}>Open Positions</p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
              <h2 className="t-section">Find your <span className="g-text-serif">role.</span></h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--ink-3)", maxWidth: 340 }}>
                We hire for craft, not credentials. When the right opportunity opens, we move fast.
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: "80px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 65% 55% at 50% 105%, rgba(109,40,217,.06) 0%, transparent 70%)" }} />
            <div style={{ width: 72, height: 72, borderRadius: 20, margin: "0 auto 28px", background: "linear-gradient(135deg, rgba(109,40,217,.10), rgba(139,92,246,.07))", border: "1px solid rgba(109,40,217,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="search" size={28} color="var(--accent-2)" sw={1.6} />
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)", letterSpacing: "-.025em", marginBottom: 14 }}>No open roles right now</h3>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--ink-3)", maxWidth: 460, margin: "0 auto 40px" }}>
              We don't hire until we're confident it's the right time and the right fit.
              When a role opens, we move in days — not weeks. Introduce yourself now and we'll keep you in mind.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 52 }}>
              <a href="mailto:contact.stryvenix@gmail.com?subject=Open Application" className="btn-primary">
                <Icon name="send" size={14} color="#fff" sw={2} /> Send an open application
              </a>
              <a href="mailto:contact.stryvenix@gmail.com?subject=Question about roles" className="btn-outline">
                <Icon name="mail" size={14} color="var(--ink-2)" sw={1.8} /> Ask us a question
              </a>
            </div>
            <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 40 }}>
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 18 }}>Departments we hire in</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9, justifyContent: "center" }}>
                {DEPTS.map(({ label, color, bg, bd }) => (
                  <span key={label} className="dept-chip" style={{ color, background: bg, borderColor: bd }}>{label}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 12, padding: "26px 36px", background: "linear-gradient(128deg, #3b0764 0%, #4c1d95 50%, #5b21b6 100%)", border: "none", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20, boxShadow: "0 8px 32px rgba(109,40,217,.30)" }}>
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 5, letterSpacing: "-.01em" }}>Already know you'd be a great fit?</h4>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.65 }}>Drop us a message with your work and the role you'd want. We read every one.</p>
            </div>
            <a
              href="mailto:contact.stryvenix@gmail.com?subject=Open Application"
              style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.20)", color: "#fff", fontSize: 13, fontWeight: 700, padding: "11px 22px", borderRadius: 9, textDecoration: "none", transition: "background .18s" }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,.22)"}
              onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,.12)"}
            >
              contact.stryvenix@gmail.com <Icon name="arrowRight" size={14} color="#fff" sw={2} />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PAY PHILOSOPHY — REDESIGNED
      ══════════════════════════════ */}
      <PaySection />

      {/* ══════════════════════════════
          HIRING PROCESS — REPLACED
      ══════════════════════════════ */}
      <HiringSection />

      {/* ══════════════════════════════
          BOTTOM CTA
      ══════════════════════════════ */}
      <section className="grid-bg" style={{ padding: "100px 0 120px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(109,40,217,.10) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", textAlign: "center", position: "relative" }}>
          <div className="badge" style={{ margin: "0 auto 32px" }}>
            <span className="pulse-dot" />
            Watching for exceptional talent · Always
          </div>
          <h2 style={{ fontFamily: "'Manrope',sans-serif", fontSize: "clamp(2.4rem,6.5vw,5.2rem)", fontWeight: 800, letterSpacing: "-.04em", color: "var(--ink)", lineHeight: .96, marginBottom: 22 }}>
            Ready to do the{" "}
            <span className="g-text-serif">best work</span>
            <br />of your life?
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--ink-3)", maxWidth: 400, margin: "0 auto 44px" }}>
            Based in Bangalore. Available worldwide.<br />Transparent pay. Zero politics.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 52 }}>
            <a href="mailto:contact.stryvenix@gmail.com?subject=Open Application" className="btn-primary" style={{ padding: "15px 32px", fontSize: 14 }}>
              <Icon name="send" size={15} color="#fff" sw={2} /> Send an open application
            </a>
            <a href="mailto:contact.stryvenix@gmail.com" className="btn-outline" style={{ padding: "15px 28px", fontSize: 14 }}>
              <Icon name="mail" size={15} color="var(--ink-2)" sw={1.8} /> contact.stryvenix@gmail.com
            </a>
          </div>
          <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 32, justifyContent: "center", borderTop: "1px solid var(--line)", paddingTop: 40 }}>
            {[{ icon: "check", l: "No ATS filters" }, { icon: "clock", l: "Offer in <48h" }, { icon: "users", l: "Flat hierarchy" }, { icon: "zap", l: "AI-native stack" }].map(({ icon, l }) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name={icon} size={14} color="var(--accent-2)" sw={2} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-3)" }}>{l}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 36, fontSize: 10, color: "var(--muted)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>
            Stryvenix · Bangalore, India · Available Worldwide
          </p>
        </div>
      </section>
    </div>
  );
}