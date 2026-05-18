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

      /* Primary violet → purple gradient (matching main site) */
      --accent-1:   #6d28d9;
      --accent-2:   #7c3aed;
      --accent-mid: #8b5cf6;
      --accent-light:#a78bfa;
      --glow:       rgba(109,40,217,.14);

      /* Gradient definitions */
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

    /* ── Gradient text utilities ── */
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

    /* ── Grid background ── */
    .grid-bg {
      background-color: var(--surface-2);
      background-image:
        linear-gradient(rgba(109,40,217,.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(109,40,217,.035) 1px, transparent 1px);
      background-size: 52px 52px;
    }

    /* ── Typography scale ── */
    .t-label {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.20em;
      text-transform: uppercase;
      color: var(--accent-2);
    }
    .t-hero {
      font-family: 'Manrope', sans-serif;
      font-size: clamp(2.8rem, 7vw, 6.4rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 0.95;
      color: var(--ink);
    }
    .t-section {
      font-family: 'Manrope', sans-serif;
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.05;
      color: var(--ink);
    }

    /* ── Buttons ── */
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--g-primary);
      color: #fff;
      font-family: 'Manrope', sans-serif;
      font-size: 13px; font-weight: 700; letter-spacing: .01em;
      padding: 13px 28px; border-radius: 10px;
      border: none; cursor: pointer; text-decoration: none;
      transition: opacity .18s, transform .14s, box-shadow .18s;
      box-shadow: 0 4px 24px rgba(109,40,217,.30);
    }
    .btn-primary:hover  { opacity: .9; transform: translateY(-1px); box-shadow: 0 8px 32px rgba(109,40,217,.38); }
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

    /* ── Badge / pill ── */
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

    /* ── Cards ── */
    .card { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; }
    .card-lift {
      transition: border-color .22s, box-shadow .22s, transform .22s;
    }
    .card-lift:hover {
      border-color: rgba(109,40,217,.22);
      box-shadow: 0 14px 44px rgba(109,40,217,.09);
      transform: translateY(-2px);
    }

    /* ── Icon box ── */
    .icon-box {
      width: 44px; height: 44px; border-radius: 12px;
      background: rgba(109,40,217,.07);
      border: 1px solid rgba(109,40,217,.14);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: background .2s, border-color .2s;
    }
    .card-lift:hover .icon-box {
      background: linear-gradient(135deg, rgba(109,40,217,.14), rgba(139,92,246,.09));
      border-color: rgba(109,40,217,.26);
    }

    /* ── Pulse dot ── */
    @keyframes pulse-ring {
      0%   { transform: scale(1); opacity: .65; }
      100% { transform: scale(2.4); opacity: 0; }
    }
    .pulse-dot {
      position: relative; width: 7px; height: 7px;
      border-radius: 50%; background: var(--accent-2); flex-shrink: 0;
    }
    .pulse-dot::before {
      content: ''; position: absolute; inset: 0;
      border-radius: 50%; background: var(--accent-2);
      animation: pulse-ring 2s ease-out infinite;
    }

    /* ── Ticker ── */
    @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
    .ticker-inner { display: flex; white-space: nowrap; animation: ticker 36s linear infinite; }

    /* ── Float animations ── */
    @keyframes float-a { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
    @keyframes float-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(9px)} }
    @keyframes float-c { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    .float-a { animation: float-a 7s ease-in-out infinite; }
    .float-b { animation: float-b 9s ease-in-out infinite 1.4s; }
    .float-c { animation: float-c 8s ease-in-out infinite 2.8s; }

    .float-widget {
      background: rgba(255,255,255,.90);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,.95);
      border-radius: 14px;
      box-shadow: 0 8px 36px rgba(109,40,217,.10), 0 1px 0 rgba(255,255,255,.6) inset;
      padding: 16px 20px; min-width: 200px;
    }

    /* ── Value rows ── */
    .value-row {
      border-top: 1px solid var(--line-2);
      transition: background .18s;
      border-radius: 6px;
    }
    .value-row:hover { background: rgba(109,40,217,.028); }
    .value-row:first-child { border-top: none; }

    /* ── Dept chips ── */
    .dept-chip {
      font-size: 11px; font-weight: 700;
      font-family: 'Manrope', sans-serif;
      padding: 6px 16px; border-radius: 999px;
      border: 1px solid transparent;
    }

    /* ── Glow orb behind hero ── */
    .hero-glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }

    /* ── Subtle noise overlay ── */
    .noise::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      opacity: .4;
      pointer-events: none;
    }
  `}</style>
);

/* ─── SVG ICON SYSTEM ───────────────────────────────────── */
const paths = {
  trendUp:     "M23 6L13.5 15.5 8.5 10.5 1 18M17 6h6v6",
  layers:      "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  cpu:         "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3",
  book:        "M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
  globe:       "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  heart:       "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  clock:       "M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2",
  award:       "M12 15a6 6 0 100-12 6 6 0 000 12zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  search:      "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35",
  send:        "M22 2L11 13M22 2L15 22 11 13 2 9l20-7z",
  mail:        "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  arrowRight:  "M5 12h14M12 5l7 7-7 7",
  arrowDown:   "M12 5v14M19 12l-7 7-7-7",
  clipBoard:   "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M8 2h8v4H8z",
  phone:       "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  wrench:      "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  gift:        "M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z",
  check:       "M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3",
  barChart:    "M18 20V10M12 20V4M6 20v-6",
  users:       "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  zap:         "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  sparkle:     "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z",
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
  { icon: "trendUp", title: "Competitive Pay",       body: "Transparent salary bands, project bonuses, and bi-annual reviews tied to impact — not tenure.",   tag: "Pay & Equity" },
  { icon: "layers",  title: "Ship Real Work",         body: "No sandbox projects. Your decisions shape live products used by real businesses from week one.",  tag: "Impact" },
  { icon: "cpu",     title: "AI-Native Stack",        body: "We adopt the best tools aggressively. You stay ahead of the curve — not chasing it.",             tag: "Tools" },
  { icon: "book",    title: "₹50k Learning Budget",   body: "Courses, conferences, tooling — we invest in people who invest in themselves. No approvals.",     tag: "Growth" },
  { icon: "globe",   title: "Async-First Culture",    body: "Bangalore is home base, but the world is our client list. Work when you're sharpest.",            tag: "Flexibility" },
  { icon: "heart",   title: "Health & Wellness",      body: "Medical coverage for you and your family. Mental health support and wellness allowance included.", tag: "Health" },
  { icon: "clock",   title: "Fast Decision Loop",     body: "Hire-to-offer in under 48 hours. Flat hierarchy means your ideas reach decision-makers directly.", tag: "Speed" },
  { icon: "award",   title: "Founding Team Energy",   body: "Early hires shape the culture, the process, and the trajectory. Real ownership from day one.",    tag: "Ownership" },
];

const VALUES = [
  { n: "01", h: "Craft over speed",     b: "We move fast but never cut corners. The details matter — clients can always tell the difference between good and exceptional." },
  { n: "02", h: "Radical honesty",      b: "Direct feedback, transparent pay, open post-mortems. No sugarcoating, no corporate euphemisms — ever." },
  { n: "03", h: "Client obsession",     b: "Our reputation is built on outcomes, not deliverables. We are not done until they are genuinely thrilled." },
  { n: "04", h: "Relentless curiosity", b: "Tools, techniques, industries — the moment you stop learning, you stop being useful in this industry." },
];

const STEPS = [
  { n: "01", icon: "clipBoard", title: "Apply online",    body: "Send your CV or portfolio. Every application is reviewed personally by a team lead — no ATS filters, no automated rejections.", time: "~5 min" },
  { n: "02", icon: "phone",     title: "Intro call",      body: "30 minutes with a team lead. No prep required — we want to understand how you think, not test you on trivia.",               time: "30 min" },
  { n: "03", icon: "wrench",    title: "Paid task",       body: "A short real-world task, compensated fairly. Designed to show how you actually work — not how you perform under pressure.",  time: "2–4 hrs · Paid" },
  { n: "04", icon: "gift",      title: "Offer & onboard", body: "A decision within 48 hours. Transparent offer, no lowball tactics — onboarded within days of signing.",                      time: "<48h decision" },
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

/* ─── BENEFIT CARD ──────────────────────────────────────── */
function BenefitCard({ b, i, vis }) {
  return (
    <div
      className="card card-lift"
      style={{
        padding: "28px 24px", cursor: "default",
        transition: `opacity 500ms ease ${i * 45}ms, transform 500ms ease ${i * 45}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(22px)",
      }}
    >
      <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>{b.tag}</p>
      <div className="icon-box" style={{ marginBottom: 20 }}>
        <Icon name={b.icon} size={17} color="var(--accent-2)" sw={1.8} />
      </div>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 8, letterSpacing: "-.01em" }}>{b.title}</h3>
      <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--ink-3)" }}>{b.body}</p>
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function Careers() {
  const [heroRef,  heroVis]  = useReveal(0.05);
  const [statRef,  statVis]  = useReveal(0.1);
  const [benRef,   benVis]   = useReveal(0.08);
  const [valRef,   valVis]   = useReveal(0.08);
  const [noRef,    noVis]    = useReveal(0.08);
  const [stepRef,  stepVis]  = useReveal(0.06);

  const reveal = (vis, delay = 0) => ({
    transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(22px)",
  });

  return (
    <div className="careers-root">
      <GlobalStyles />
      <Navbar />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section
        className="grid-bg"
        style={{ minHeight: "92vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}
      >
        {/* Violet glow orbs */}
        <div className="hero-glow" style={{ width: 600, height: 600, top: -180, right: -60, background: "radial-gradient(circle, rgba(139,92,246,.18) 0%, rgba(109,40,217,.08) 50%, transparent 70%)" }} />
        <div className="hero-glow" style={{ width: 400, height: 400, bottom: -80, left: -60, background: "radial-gradient(circle, rgba(109,40,217,.10) 0%, transparent 70%)" }} />

        {/* Floating widgets */}
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
            Building the team ·Bangalore &amp; Remote
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
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 14, overflow: "hidden", maxWidth: 720,
              boxShadow: "0 4px 24px rgba(109,40,217,.06)",
              ...reveal(statVis, 320),
            }}
          >
            {STATS.map(({ n, l, sub }, i) => (
              <div key={l} style={{ padding: "22px 26px", borderLeft: i > 0 ? "1px solid var(--line)" : "none", position: "relative" }}>
                {/* violet top accent on first stat */}
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
          BENEFITS
      ══════════════════════════════ */}
      <section id="culture" style={{ background: "var(--surface-3)", padding: "96px 0" }}>
        <div ref={benRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", ...reveal(benVis) }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 28, marginBottom: 52 }}>
            <div>
              <p className="t-label" style={{ marginBottom: 14 }}>Why Stryvenix</p>
              <h2 className="t-section">More than a job.<br /><span className="g-text-serif">A career.</span></h2>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--ink-3)", maxWidth: 340 }}>
              Every part of working at Stryvenix is designed to help you do the best work of your career.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
            {BENEFITS.map((b, i) => <BenefitCard key={b.title} b={b} i={i} vis={benVis} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          VALUES
      ══════════════════════════════ */}
      <section style={{ background: "var(--surface)", padding: "96px 0" }} ref={valRef}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", ...reveal(valVis) }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px 80px", alignItems: "start" }}>

            {/* left */}
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

            {/* right */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="card" style={{ padding: 36, position: "relative", overflow: "hidden" }}>
                {/* violet accent strip */}
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

          {/* empty state */}
          <div className="card" style={{ padding: "80px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 65% 55% at 50% 105%, rgba(109,40,217,.06) 0%, transparent 70%)" }} />

            <div style={{ width: 72, height: 72, borderRadius: 20, margin: "0 auto 28px", background: "linear-gradient(135deg, rgba(109,40,217,.10), rgba(139,92,246,.07))", border: "1px solid rgba(109,40,217,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="search" size={28} color="var(--accent-2)" sw={1.6} />
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)", letterSpacing: "-.025em", marginBottom: 14 }}>
              No open roles right now
            </h3>
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

          {/* CTA banner — deep violet to match main site */}
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
          PAY PHILOSOPHY
      ══════════════════════════════ */}
      <section style={{ background: "var(--surface)", padding: "80px 0", borderTop: "1px solid var(--line-2)", borderBottom: "1px solid var(--line-2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2.2fr", gap: "48px 72px", alignItems: "center" }}>
            <div>
              <p className="t-label" style={{ marginBottom: 14 }}>Pay Philosophy</p>
              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.025em", color: "var(--ink)", lineHeight: 1.2 }}>
                Transparent.<br />Competitive.<br /><span className="g-text-serif">Fair.</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[
                { icon: "barChart", t: "Open pay bands",      d: "Every role has a published salary range. No mystery, no negotiation games." },
                { icon: "trendUp",  t: "Performance reviews", d: "Bi-annual reviews tied to impact and growth — not time served." },
                { icon: "gift",     t: "Bonus & perks",       d: "Project bonuses, ₹50k learning budget, health coverage, and more." },
              ].map((c) => (
                <div key={c.t} className="card card-lift" style={{ padding: 24 }}>
                  <div className="icon-box" style={{ marginBottom: 18 }}>
                    <Icon name={c.icon} size={16} color="var(--accent-2)" sw={1.8} />
                  </div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 8, letterSpacing: "-.01em" }}>{c.t}</h4>
                  <p style={{ fontSize: 12, lineHeight: 1.7, color: "var(--ink-3)" }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          HIRING PROCESS
      ══════════════════════════════ */}
      <section style={{ background: "var(--surface-3)", padding: "96px 0" }} ref={stepRef}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", ...reveal(stepVis) }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 28, marginBottom: 52 }}>
            <div>
              <p className="t-label" style={{ marginBottom: 14 }}>How we hire</p>
              <h2 className="t-section">Simple. Fast. <span className="g-text-serif">Human.</span></h2>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--ink-3)", maxWidth: 340 }}>
              No six-round gauntlets. We respect your time and make decisions with urgency — not bureaucracy.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, position: "relative" }}>
            {/* connector line */}
            <div className="hidden lg:block" style={{ position: "absolute", top: 28, left: "12.5%", right: "12.5%", height: 1, background: "linear-gradient(90deg, rgba(109,40,217,.24) 0%, rgba(139,92,246,.10) 100%)" }} />

            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="card card-lift"
                style={{ padding: 28, position: "relative", transition: `opacity 500ms ease ${i * 90}ms, transform 500ms ease ${i * 90}ms`, opacity: stepVis ? 1 : 0, transform: stepVis ? "none" : "translateY(22px)" }}
              >
                {/* step number accent */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--g-primary)", borderRadius: "16px 16px 0 0", opacity: .7 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
                  <div className="icon-box">
                    <Icon name={s.icon} size={17} color="var(--accent-2)" sw={1.8} />
                  </div>
                  <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-.05em", color: "rgba(109,40,217,.07)", lineHeight: 1 }}>{s.n}</span>
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 10, letterSpacing: "-.01em", textTransform: "capitalize" }}>{s.title}</h4>
                <p style={{ fontSize: 12, lineHeight: 1.75, color: "var(--ink-3)", marginBottom: 20 }}>{s.body}</p>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent-2)", background: "rgba(109,40,217,.06)", border: "1px solid rgba(109,40,217,.14)", borderRadius: 999, padding: "4px 11px", display: "inline-block" }}>
                  {s.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          BOTTOM CTA
      ══════════════════════════════ */}
      <section className="grid-bg" style={{ padding: "100px 0 120px", position: "relative", overflow: "hidden" }}>
        {/* Violet glow */}
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

          {/* trust row */}
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

      <Footer />
    </div>
  );
}