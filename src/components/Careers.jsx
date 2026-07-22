import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─── GLOBAL STYLES ─────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,700;1,800&display=swap');

    :root {
      --ink:        #0f172a;
      --ink-2:      #1e293b;
      --ink-3:      #64748b;
      --muted:      #94a3b8;
      --muted-2:    #cbd5e1;
      --surface:    #ffffff;
      --surface-2:  #f8fafc;
      --surface-3:  #eef2ff;
      --line:       rgba(79,70,229,.10);
      --line-2:     rgba(79,70,229,.06);
      --accent-1:   #4f46e5;
      --accent-2:   #6366f1;
      --accent-mid: #818cf8;
      --accent-light:#a78bfa;
      --glow:       rgba(79,70,229,.14);
      --g-primary:  linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%);
      --g-subtle:   linear-gradient(135deg, rgba(79,70,229,.08) 0%, rgba(129,140,248,.05) 100%);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .careers-root {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--surface-2);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
    }

    @keyframes textShine {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .g-text {
      background: var(--g-primary);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: textShine 4s ease infinite;
    }
    .g-text-serif {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-style: italic;
      background: var(--g-primary);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: textShine 4s ease infinite;
    }

    .grid-bg {
      background-color: var(--surface-2);
      background-image:
        linear-gradient(rgba(79,70,229,.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(79,70,229,.035) 1px, transparent 1px);
      background-size: 52px 52px;
    }

    .t-label {
      font-size: 10px; font-weight: 800;
      letter-spacing: 0.20em; text-transform: uppercase;
      color: var(--accent-2);
    }
    .t-hero {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: clamp(2.8rem, 7vw, 6.4rem);
      font-weight: 800; letter-spacing: -0.04em; line-height: 0.95;
      color: var(--ink);
    }
    .t-section {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 800; letter-spacing: -0.03em; line-height: 1.05;
      color: var(--ink);
    }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--g-primary); color: #fff;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 13px; font-weight: 700; letter-spacing: .01em;
      padding: 13px 28px; border-radius: 10px;
      border: none; cursor: pointer; text-decoration: none;
      transition: opacity .18s, transform .14s, box-shadow .18s;
      box-shadow: 0 4px 24px rgba(79,70,229,.30);
    }
    .btn-primary:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 8px 32px rgba(79,70,229,.38); }
    .btn-primary:active { transform: scale(.98); }

    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,.80); color: var(--ink-2);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 13px; font-weight: 600;
      padding: 13px 26px; border-radius: 10px;
      border: 1px solid rgba(79,70,229,.18); cursor: pointer; text-decoration: none;
      backdrop-filter: blur(8px);
      transition: background .18s, border-color .18s, box-shadow .18s;
    }
    .btn-outline:hover { background: #fff; border-color: rgba(79,70,229,.35); box-shadow: 0 4px 18px rgba(79,70,229,.08); }

    .badge {
      display: inline-flex; align-items: center; gap: 7px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 10px; font-weight: 800;
      letter-spacing: .14em; text-transform: uppercase;
      color: var(--accent-2);
      background: rgba(79,70,229,.07);
      border: 1px solid rgba(79,70,229,.18);
      border-radius: 999px; padding: 5px 14px 5px 10px;
    }

    .card { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; }
    .card-lift { transition: border-color .22s, box-shadow .22s, transform .22s; }
    .card-lift:hover {
      border-color: rgba(79,70,229,.22);
      box-shadow: 0 14px 44px rgba(79,70,229,.09);
      transform: translateY(-2px);
    }

    .icon-box {
      width: 44px; height: 44px; border-radius: 12px;
      background: rgba(79,70,229,.07); border: 1px solid rgba(79,70,229,.14);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: background .2s, border-color .2s;
    }
    .card-lift:hover .icon-box {
      background: linear-gradient(135deg, rgba(79,70,229,.14), rgba(129,140,248,.09));
      border-color: rgba(79,70,229,.26);
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

    .value-row {
      border-top: 1px solid var(--line-2); transition: background .18s;
      border-radius: 6px;
    }
    .value-row:hover { background: rgba(79,70,229,.028); }
    .value-row:first-child { border-top: none; }

    .dept-chip {
      font-size: 11px; font-weight: 700;
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 6px 16px; border-radius: 999px; border: 1px solid transparent;
    }

    .hero-glow {
      position: absolute; border-radius: 50%;
      filter: blur(80px); pointer-events: none;
    }

    /* ── Image Bento Grid Styles ── */
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 24px;
      position: relative;
    }
    .bento-wrapper {
      grid-column: span 12; /* Full width on mobile */
      perspective: 1000px;
    }
    .bento-item {
      display: flex;
      width: 100%;
      height: 100%;
      background: var(--surface);
      border-radius: 20px;
      border: 1px solid rgba(79,70,229,.08);
      overflow: hidden;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s;
      box-shadow: 0 4px 20px rgba(79,70,229,.03);
      cursor: default;
    }
    .bento-item:hover {
      transform: translateY(-6px) scale(1.01);
      box-shadow: 0 20px 48px rgba(79,70,229,.12);
      border-color: rgba(79,70,229,.20);
    }
    .bento-img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    /* Responsive Spans */
    @media (min-width: 768px) {
      .bento-wrapper.cols-4 { grid-column: span 4; }
      .bento-wrapper.cols-6 { grid-column: span 6; }
      .bento-wrapper.cols-12 { grid-column: span 12; }
    }

    /* ── Hiring section horizontal scroll ── */
    .hiring-sticky-container {
      position: sticky;
      top: 0;
      height: 100vh;
      height: 100dvh; /* modern mobile viewport fix */
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      padding: 20px 0;
    }
    
    .hiring-header {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 32px;
      width: 100%;
      margin-bottom: 40px;
      flex-shrink: 0;
    }

    .hiring-footer {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 32px;
      width: 100%;
      margin-top: 52px;
      flex-shrink: 0;
    }

    .hiring-scroll-track {
      display: flex;
      gap: 40px;
      width: max-content;
      /* Dynamic padding so it strictly aligns with the max-width: 1280px containers */
      padding-left: max(32px, calc((100vw - 1280px) / 2 + 32px));
      padding-right: max(32px, calc((100vw - 1280px) / 2 + 32px));
    }
    
    .hiring-scroll-item {
      width: 380px;
      flex-shrink: 0;
      border-radius: 20px;
      overflow: hidden;
      background: transparent;
      box-shadow: 0 10px 30px rgba(79,70,229,.05);
      transition: transform 0.4s ease, box-shadow 0.4s ease;
    }
    
    .hiring-scroll-item:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 45px rgba(79,70,229,.12);
    }
    
    .hiring-img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
    }
    
    @media (min-width: 1024px) {
      .hiring-scroll-item { width: 440px; }
    }
    
    @media (max-width: 768px) {
      .hiring-sticky-container {
        justify-content: flex-start;
        padding-top: max(12vh, 80px); /* Safeguards header from cutoff */
      }
      .hiring-header { margin-bottom: 24px; }
      .hiring-footer { margin-top: 24px; }
      .hiring-scroll-item { width: 72vw; }
      .hiring-scroll-track { gap: 20px; }
    }

    @media (max-height: 700px) {
      .hiring-sticky-container {
        justify-content: flex-start;
        padding-top: 10vh; 
      }
      .hiring-header { margin-bottom: 20px; }
      .hiring-footer { margin-top: 20px; }
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
      background: linear-gradient(90deg, transparent, rgba(79,70,229,.35), transparent);
      animation: scan-line 4s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes counter-up {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ── Hero section responsive ── */
    .hero-outer {
      min-height: 92vh;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .hero-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 96px 32px;
      width: 100%;
    }
    .hero-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 40px;
    }
    .hero-text-col {
      flex: 1 1 min(100%, 500px);
      min-width: 0;
    }
    .hero-image-col {
      flex: 1 1 320px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;
      min-width: 0;
    }
    .hero-image {
      max-width: 100%;
      width: 540px;
      height: auto;
      object-fit: contain;
      mix-blend-mode: multiply;
      opacity: .95;
      transform: translateY(-80px);
    }
    .hero-badge-wrap {
      margin-bottom: 36px;
      max-width: 100%;
      height: auto;
      white-space: normal;
      line-height: 1.4;
    }
    .hero-title {
      max-width: 820px;
      margin-bottom: 28px;
    }
    .hero-desc {
      font-size: 17px;
      line-height: 1.8;
      color: var(--ink-3);
      max-width: 490px;
      margin-bottom: 44px;
    }
    .hero-btn-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 80px;
    }
    .hero-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 14px;
      overflow: hidden;
      max-width: 720px;
      box-shadow: 0 4px 24px rgba(79,70,229,.06);
    }
    .hero-stat-item {
      padding: 22px 26px;
      border-left: 1px solid var(--line);
      position: relative;
    }
    .hero-stat-item:first-child { border-left: none; }
    .hero-stat-num {
      font-size: 24px; font-weight: 800; letter-spacing: -.03em;
      line-height: 1; margin-bottom: 5px;
    }
    .hero-stat-label { font-size: 11px; font-weight: 700; color: var(--ink-2); margin-bottom: 2px; }
    .hero-stat-sub { font-size: 10px; color: var(--muted); font-weight: 500; }

    @media (max-width: 900px) {
      .hero-image { width: 380px; transform: translateY(-40px); }
    }

    @media (max-width: 768px) {
      .hero-outer { min-height: auto; padding: 20px 0 0; }
      .hero-container { padding: 56px 20px 40px; }
      .hero-row { gap: 28px; }
      .hero-image-col { order: 2; margin-top: 8px; }
      .hero-image { width: 300px; transform: translateY(0); }
      .hero-badge-wrap { margin-bottom: 28px; }
      .hero-title { margin-bottom: 20px; }
      .hero-desc { font-size: 15.5px; margin-bottom: 32px; }
      .hero-btn-row { margin-bottom: 40px; }
      .hero-stats { grid-template-columns: repeat(2, 1fr); max-width: 100%; }
      .hero-stat-item { padding: 16px 16px; }
      .hero-stat-item:nth-child(odd) { border-left: none; }
      .hero-stat-item:nth-child(n+3) { border-top: 1px solid var(--line); }
    }

    @media (max-width: 480px) {
      .hero-container { padding: 44px 16px 32px; }
      .hero-image { width: 220px; }
      .hero-btn-row a { flex: 1 1 100%; justify-content: center; }
      .hero-stat-item { padding: 14px 12px; }
      .hero-stat-num { font-size: 20px; }
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
const BENEFITS_IMAGES = [
  { src: "/Assets/Career/Work.png",     alt: "Ship Real Work",      cols: 6,  width: 1467, height: 950 },
  { src: "/Assets/Career/AI.png",       alt: "AI-Native Stack",     cols: 6,  width: 1480, height: 966 },
  { src: "/Assets/Career/Learning.png", alt: "₹50k Learning Budget", cols: 4,  width: 1480, height: 946 },
  { src: "/Assets/Career/Culture.png",  alt: "Async-First Culture",  cols: 4,  width: 1466, height: 934 },
  { src: "/Assets/Career/Decision.png", alt: "Fast Decision Loop",   cols: 4,  width: 1447, height: 899 },
  { src: "/Assets/Career/Health.png",   alt: "Health & Wellness",    cols: 6,  width: 1470, height: 949 },
  { src: "/Assets/Career/Pay.png",      alt: "Competitive Pay",      cols: 6,  width: 1462, height: 937 },
  { src: "/Assets/Career/Team.png",     alt: "Founding Team Energy", cols: 12, width: 1657, height: 799 },
];

const VALUES = [
  { n: "01", h: "Craft over speed",     b: "We move fast but never cut corners. The details matter — clients can always tell the difference between good and exceptional." },
  { n: "02", h: "Radical honesty",      b: "Direct feedback, transparent pay, open post-mortems. No sugarcoating, no corporate euphemisms — ever." },
  { n: "03", h: "Client obsession",     b: "Our reputation is built on outcomes, not deliverables. We are not done until they are genuinely thrilled." },
  { n: "04", h: "Relentless curiosity", b: "Tools, techniques, industries — the moment you stop learning, you stop being useful in this industry." },
];

const HIRING_IMAGES = [
  { src: "/Assets/How we hire/Apply Online.png", alt: "01 Apply online",   width: 1162, height: 1148 },
  { src: "/Assets/How we hire/Intro call.png",   alt: "02 Intro call",     width: 1162, height: 1162 },
  { src: "/Assets/How we hire/Paid task.png",    alt: "03 Paid task",      width: 1192, height: 1194 },
  { src: "/Assets/How we hire/Offer & onboard.png", alt: "04 Offer & onboard", width: 1191, height: 1191 },
];

const TRUST_HIRING = [
  { icon: "check", label: "No ATS filters" },
  { icon: "clock", label: "Offer in <48 hours" },
  { icon: "rupee", label: "Paid take-home task" },
  { icon: "users", label: "Reviewed by team lead" },
];

const STATS = [
  { n: "20+",  l: "Projects Shipped",  sub: "Since 2023" },
  { n: "98%",  l: "Client Satisfaction", sub: "Based on NPS surveys" },
  { n: "6 mo", l: "Post-Launch Support", sub: "Included with every project" },
  { n: "<48h", l: "Hiring Decision",     sub: "Fastest in the industry" },
];

const DEPTS = [
  { label: "Design",          color: "#4f46e5", bg: "rgba(79,70,229,.07)",  bd: "rgba(79,70,229,.18)"  },
  { label: "Engineering",     color: "#6366f1", bg: "rgba(99,102,241,.07)", bd: "rgba(99,102,241,.18)" },
  { label: "Growth",          color: "#4338ca", bg: "rgba(67,56,202,.07)",  bd: "rgba(67,56,202,.18)"  },
  { label: "AI & Automation", color: "#818cf8", bg: "rgba(129,140,248,.07)",bd: "rgba(129,140,248,.18)"},
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

/* ─── REDESIGNED BENEFITS SECTION (IMAGE BENTO GRID) ──── */
function BenefitsSection({ benRef, benVis, reveal }) {
  return (
    <section id="culture" style={{ background: "linear-gradient(180deg, #eef2ff 0%, #ffffff 100%)", padding: "120px 0", overflow: "hidden", position: "relative" }}>
      <div aria-hidden style={{ position: "absolute", top: "10%", left: "-10%", width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 60%)", filter: "blur(80px)", zIndex: 0, pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: "5%", right: "-5%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(79,70,229,0.10) 0%, transparent 60%)", filter: "blur(80px)", zIndex: 0, pointerEvents: "none" }} />

      <div ref={benRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", ...reveal(benVis), position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 72 }}>
          <p className="t-label" style={{ marginBottom: 18 }}>Why Stryvenix</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2.8rem, 5vw, 4.8rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: .95, color: "var(--ink)", marginBottom: 24 }}>
            More than a job.<br />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: "italic", background: "linear-gradient(120deg, #4f46e5 0%, #818cf8 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "textShine 4s ease infinite" }}>A creative playground.</span>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--ink-3)", maxWidth: 600 }}>
            Every part of working at Stryvenix is designed to help you do the best work of your career — from day one through the long haul.
          </p>
        </div>

        {/* BENTO GRID REPLACING CARDS */}
        <div className="bento-grid">
          {BENEFITS_IMAGES.map((b, i) => (
            <div
              key={b.alt}
              className={`bento-wrapper cols-${b.cols}`}
              style={{
                opacity: benVis ? 1 : 0,
                transform: benVis ? "none" : "translateY(30px)",
                transition: `opacity 600ms cubic-bezier(0.4, 0, 0.2, 1) ${i * 75}ms, transform 600ms cubic-bezier(0.4, 0, 0.2, 1) ${i * 75}ms`
              }}
            >
              <div className="bento-item">
                <img 
                  src={b.src} 
                  alt={b.alt} 
                  width={b.width} 
                  height={b.height} 
                  className="bento-img" 
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 64, paddingTop: 36, borderTop: "1px solid rgba(79,70,229,.1)" }}>
          <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600, letterSpacing: ".02em" }}>Stryvenix · Bangalore, India · Available Worldwide</p>
          <a href="#openings" className="btn-primary" style={{ padding: "12px 26px", fontSize: 13, background: "var(--ink)", boxShadow: "0 8px 24px rgba(15,23,42,0.25)" }}>
            Explore open roles <Icon name="arrowRight" size={14} color="#fff" sw={2.2} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── HIRING SECTION (STICKY HORIZONTAL SCROLL + PROGRESS BAR) ─────────────────────── */
function HiringSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    let rafId;
    
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const distance = rect.height - windowHeight;
      
      let p = 0;
      if (distance > 0) {
         p = -rect.top / distance;
      }

      if (p < 0) p = 0;
      if (p > 1) p = 1;

      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const maxTranslate = Math.max(0, trackWidth - windowWidth);

      trackRef.current.style.transform = `translateX(-${p * maxTranslate}px)`;
      
      if (progressRef.current) {
        progressRef.current.style.width = `${p * 100}%`;
      }
    };

    const loop = () => {
      handleScroll();
      rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section ref={containerRef} style={{ background: "var(--surface-3)", height: "400vh", position: "relative" }}>
      <div className="hiring-sticky-container">
        
        {/* Header aligned to 1280px main container flow */}
        <div className="hiring-header">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 24 }}>
            <div>
              <p className="t-label" style={{ marginBottom: 14 }}>How we hire</p>
              <h2 className="t-section">
                Simple. Fast.{" "}
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: "italic", background: "linear-gradient(120deg, var(--accent-1) 0%, var(--accent-mid) 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "textShine 4s ease infinite" }}>Human.</span>
              </h2>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--ink-3)", maxWidth: 340 }}>
              No six-round gauntlets. We respect your time and make decisions with urgency — not bureaucracy.
            </p>
          </div>

          {/* Progress Bar Container */}
          <div style={{ width: "100%", height: 4, background: "rgba(79,70,229,.10)", borderRadius: 4, overflow: "hidden" }}>
            {/* Progress Indicator */}
            <div ref={progressRef} style={{ height: "100%", background: "var(--g-primary)", width: "0%", willChange: "width", borderRadius: 4 }} />
          </div>
          
          {/* Progress Labels */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
             <span style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>Start</span>
             <span style={{ fontSize: 10, fontWeight: 700, color: "var(--accent-2)", textTransform: "uppercase", letterSpacing: ".05em" }}>Scroll to explore</span>
             <span style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>Finish</span>
          </div>
        </div>

        {/* Scroll Track */}
        <div 
          ref={trackRef} 
          className="hiring-scroll-track"
          style={{ willChange: "transform" }}
        >
          {HIRING_IMAGES.map((img) => (
            <div key={img.alt} className="hiring-scroll-item">
              <img 
                src={img.src} 
                alt={img.alt} 
                width={img.width} 
                height={img.height} 
                className="hiring-img" 
              />
            </div>
          ))}
        </div>

        {/* Footer badges aligned to 1280px main container flow */}
        <div className="hiring-footer">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, paddingTop: 36, borderTop: "1px solid var(--line-2)" }}>
            {TRUST_HIRING.map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name={icon} size={14} color="var(--accent-2)" sw={2} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-3)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>
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
      <section className="grid-bg hero-outer">
        <div className="hero-glow" style={{ width: 600, height: 600, top: -180, right: -60, background: "radial-gradient(circle, rgba(129,140,248,.18) 0%, rgba(79,70,229,.08) 50%, transparent 70%)" }} />
        <div className="hero-glow" style={{ width: 400, height: 400, bottom: -80, left: -60, background: "radial-gradient(circle, rgba(79,70,229,.10) 0%, transparent 70%)" }} />

        <div ref={heroRef} className="hero-container" style={{ ...reveal(heroVis), transition: "opacity .9s ease, transform .9s ease" }}>
          <div className="hero-row">
            
            {/* Left Hero Text Side */}
            <div className="hero-text-col">
              {/* Added responsive wrap properties to this badge specifically */}
              <div className="badge hero-badge-wrap">
                <span className="pulse-dot" style={{ marginTop: 2 }} />
                <span>Building the team · Bangalore &amp; Remote</span>
              </div>

              <h1 className="t-hero hero-title">
                Build work you're <span className="g-text-serif">proud</span> of.
              </h1>

              <p className="hero-desc">
                Stryvenix is a focused digital agency building premium websites and
                AI-powered systems for ambitious brands globally. We look for people
                who obsess over craft — not just output.
              </p>

              <div className="hero-btn-row">
                <a href="#openings" className="btn-primary">
                  See open roles <Icon name="arrowDown" size={15} color="#fff" sw={2.2} />
                </a>
                <a href="#culture" className="btn-outline">
                  Our culture <Icon name="arrowRight" size={14} color="var(--ink-2)" sw={2} />
                </a>
              </div>

              {/* stat strip */}
              <div ref={statRef} className="hero-stats" style={{ ...reveal(statVis, 320) }}>
                {STATS.map(({ n, l, sub }, i) => (
                  <div key={l} className="hero-stat-item">
                    {i === 0 && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--g-primary)", borderRadius: "0 0 2px 2px" }} />}
                    <div className="hero-stat-num g-text">{n}</div>
                    <div className="hero-stat-label">{l}</div>
                    <div className="hero-stat-sub">{sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Image Side */}
            <div className="hero-image-col">
              <img 
                src="/Assets/Career_1.png" 
                alt="Career at Stryvenix" 
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          TICKER
      ══════════════════════════════ */}
      <div style={{ overflow: "hidden", background: "var(--g-primary)", padding: "11px 0", boxShadow: "0 2px 20px rgba(79,70,229,.25)" }} aria-hidden="true">
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
      <BenefitsSection benRef={benRef} benVis={benVis} reveal={reveal} />

      {/* ══════════════════════════════
          VALUES & TEAM (Updated for Responsiveness)
      ══════════════════════════════ */}
      <section style={{ background: "var(--surface)", padding: "96px 0" }} ref={valRef}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", ...reveal(valVis) }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "64px 5vw", alignItems: "start" }}>
            <div style={{ flex: "1 1 min(100%, 450px)" }}>
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

            <div style={{ flex: "1 1 min(100%, 450px)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="card" style={{ padding: "clamp(24px, 5vw, 36px)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--g-primary)" }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: 280, height: 280, pointerEvents: "none", background: "radial-gradient(circle at 100% 0%, rgba(79,70,229,.06) 0%, transparent 60%)" }} />
                
                <p className="t-label" style={{ marginBottom: 16 }}>The team</p>
                <h3 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.03em", color: "var(--ink)", lineHeight: 1.1, marginBottom: 18 }}>
                  Small team.<br /><span className="g-text-serif">Outsized impact.</span>
                </h3>

                <div style={{ display: "flex", flexWrap: "wrap-reverse", gap: "20px", alignItems: "center", marginBottom: "28px" }}>
                  <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--ink-3)", flex: "1 1 min(100%, 250px)" }}>
                    We keep the team intentionally lean. Fewer meetings, more shipping. Everyone touches real client work — designers who think in systems, developers who care about UX, strategists who write clean briefs. No passengers. No politics.
                  </p>
                  <img 
                    src="/Assets/Career_2.png" 
                    alt="Team Building Puzzle" 
                    style={{ 
                      width: "140px", 
                      maxWidth: "100%",
                      height: "auto", 
                      objectFit: "contain", 
                      mixBlendMode: "multiply",
                      flexShrink: 0
                    }} 
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 10 }}>
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
                    <span key={t} style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-2)", background: "rgba(79,70,229,.06)", border: "1px solid rgba(79,70,229,.14)", borderRadius: 7, padding: "5px 11px" }}>{t}</span>
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
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 65% 55% at 50% 105%, rgba(79,70,229,.06) 0%, transparent 70%)" }} />
            <div style={{ width: 72, height: 72, borderRadius: 20, margin: "0 auto 28px", background: "linear-gradient(135deg, rgba(79,70,229,.10), rgba(129,140,248,.07))", border: "1px solid rgba(79,70,229,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="search" size={28} color="var(--accent-2)" sw={1.6} />
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)", letterSpacing: "-.025em", marginBottom: 14 }}>No open roles right now</h3>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--ink-3)", maxWidth: 460, margin: "0 auto 40px" }}>
              We don't hire until we're confident it's the right time and the right fit.
              When a role opens, we move in days — not weeks. Introduce yourself now and we'll keep you in mind.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 52 }}>
              <a href="mailto:contact@stryvenix.com?subject=Open Application" className="btn-primary">
                <Icon name="send" size={14} color="#fff" sw={2} /> Send an open application
              </a>
              <a href="mailto:contact@stryvenix.com?subject=Question about roles" className="btn-outline">
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

          <div className="card" style={{ marginTop: 12, padding: "26px 36px", background: "linear-gradient(128deg, #312e81 0%, #3730a3 50%, #4338ca 100%)", border: "none", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20, boxShadow: "0 8px 32px rgba(79,70,229,.30)" }}>
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 5, letterSpacing: "-.01em" }}>Already know you'd be a great fit?</h4>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.65 }}>Drop us a message with your work and the role you'd want. We read every one.</p>
            </div>
            <a
              href="mailto:contact@stryvenix.com?subject=Open Application"
              style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.20)", color: "#fff", fontSize: 13, fontWeight: 700, padding: "11px 22px", borderRadius: 9, textDecoration: "none", transition: "background .18s" }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,.22)"}
              onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,.12)"}
            >
              contact@stryvenix.com <Icon name="arrowRight" size={14} color="#fff" sw={2} />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          HIRING PROCESS (STICKY HORIZONTAL)
      ══════════════════════════════ */}
      <HiringSection />

      {/* ══════════════════════════════
          BOTTOM CTA
      ══════════════════════════════ */}
      <section className="grid-bg" style={{ padding: "100px 0 120px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(79,70,229,.10) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", textAlign: "center", position: "relative" }}>
          <div className="badge" style={{ margin: "0 auto 32px" }}>
            <span className="pulse-dot" />
            Watching for exceptional talent · Always
          </div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(2.4rem,6.5vw,5.2rem)", fontWeight: 800, letterSpacing: "-.04em", color: "var(--ink)", lineHeight: .96, marginBottom: 22 }}>
            Ready to do the{" "}
            <span className="g-text-serif">best work</span>
            <br />of your life?
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--ink-3)", maxWidth: 400, margin: "0 auto 44px" }}>
            Based in Bangalore. Available worldwide.<br />Transparent pay. Zero politics.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 52 }}>
            <a href="mailto:contact@stryvenix.com?subject=Open Application" className="btn-primary" style={{ padding: "15px 32px", fontSize: 14 }}>
              <Icon name="send" size={15} color="#fff" sw={2} /> Send an open application
            </a>
            <a href="mailto:contact@stryvenix.com" className="btn-outline" style={{ padding: "15px 28px", fontSize: 14 }}>
              <Icon name="mail" size={15} color="var(--ink-2)" sw={1.8} /> contact@stryvenix.com
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