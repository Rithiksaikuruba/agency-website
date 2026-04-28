import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  MapPin, Linkedin, ArrowUpRight,
  Globe, Bot, Zap, Star, Award, TrendingUp,
  CheckCircle2, XCircle,
} from 'lucide-react';

const BOOKING_URL = 'https://cal.com/stryvenix/30min';
const LINKEDIN_URL = 'https://www.linkedin.com/in/rithik-sai-gowda';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const metrics = [
  { value: '20+', label: 'Projects Delivered',    sub: 'Across India, US & UK',         icon: TrendingUp },
  { value: '3',   label: 'Countries',              sub: 'India · US · UK',               icon: Globe      },
  { value: '98%', label: 'Client Satisfaction',   sub: 'Based on project reviews',       icon: Star       },
  { value: '6mo', label: 'Post-Launch Support',   sub: 'Included on every project',      icon: Award      },
];

const capabilities = [
  {
    icon: Globe,
    label: 'Websites That Convert',
    desc:  'SEO-optimised websites built to rank on Google and generate consistent inbound leads.',
    color: 'text-blue-500',
    bg:    'bg-blue-50 dark:bg-blue-500/10',
    border:'border-blue-100 dark:border-blue-500/20',
  },
  {
    icon: Bot,
    label: 'AI That Actually Works',
    desc:  'Custom AI systems and chatbots that reduce manual work and automate real client workflows.',
    color: 'text-purple-500',
    bg:    'bg-purple-50 dark:bg-purple-500/10',
    border:'border-purple-100 dark:border-purple-500/20',
  },
  {
    icon: Zap,
    label: 'Automation at Scale',
    desc:  'End-to-end automations that save hours per week and keep your pipeline moving without manual effort.',
    color: 'text-amber-500',
    bg:    'bg-amber-50 dark:bg-amber-500/10',
    border:'border-amber-100 dark:border-amber-500/20',
  },
];

const comparison = {
  them: [
    'Hand off work to juniors',
    'Optimise for design awards',
    'Slow delivery, vague timelines',
  ],
  us: [
    'Senior team, direct execution',
    'SEO-first, built for performance',
    'Launched in 3–6 weeks, guaranteed',
  ],
};

const milestones = [
  {
    year: '2025',
    event:
      'Founded Stryvenix with a focus on building SEO-first websites that generate consistent inbound leads instead of just looking good.',
  },
  {
    year: '2025 (Mid)',
    event:
      'Delivered initial client projects — improving search visibility, lead flow, and website conversions within the first 60–90 days.',
  },
  {
    year: '2025 (Late)',
    event:
      'Expanded into AI and automation — implementing chatbots and workflow systems to reduce manual work and improve business efficiency.',
  },
  {
    year: '2026',
    event:
      'Scaling Stryvenix into a performance-driven growth partner — combining SEO, AI, and automation into a unified system that turns websites into lead-generation engines.',
  },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Scroll-linked animation for the timeline
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 50%"]
  });

  // Map scroll progress to line height and playhead tip
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 bg-slate-50 dark:bg-[#020617] overflow-hidden"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      {/* ── Ambient Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[5%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
            backgroundSize:  '30px 30px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

        {/* ══════════════════════════════════════
            HEADER
        ══════════════════════════════════════ */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] shadow-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
              About Stryvenix
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4"
          >
            Most businesses struggle to get consistent traffic and leads — we fix that.
          </motion.p>

          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-5"
          >
            SEO-first websites that{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 italic">
              rank and generate leads
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            We help businesses turn their website into a consistent lead-generation system
            using SEO, AI, and automation — without relying on paid ads.
          </motion.p>
        </div>

        {/* ══════════════════════════════════════
            MAIN GRID
        ══════════════════════════════════════ */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">

          {/* ── Founder Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div
              className="bg-white dark:bg-slate-900/70 rounded-[2rem] border border-slate-200 dark:border-white/[0.07] p-8 h-full flex flex-col"
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-indigo-500/20">
                  RS
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1" itemProp="name">
                Rithik Sai Gowda
              </h3>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1" itemProp="jobTitle">
                Founder & CEO — Stryvenix
              </p>
              <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-5" itemProp="address">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                <span>Hyderabad, India · Serving India, US & UK</span>
              </div>

              <p
                className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed mb-3"
                itemProp="description"
              >
                I work with a focused team of designers, developers, and automation specialists
                to build performance-driven websites and growth systems. I stay directly involved
                in every project to ensure quality, speed, and real results.
              </p>

              <p className="text-[13px] font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
                No account managers. No handoffs. Direct execution.
              </p>

              <div className="inline-flex items-center self-start text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-3 py-1.5 rounded-full mb-6">
                Built for performance — not portfolios.
              </div>

              <div className="flex gap-2.5 mb-6 mt-auto">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rithik on LinkedIn"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                  itemProp="sameAs"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </div>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:scale-[1.02] transition-transform"
              >
                Talk to the Founder
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {metrics.map(({ value, label, sub, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-white/[0.07] p-5 text-center"
                >
                  <Icon className="w-5 h-5 text-indigo-500 mx-auto mb-2" aria-hidden="true" />
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">
                    {value}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    {label}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
                    {sub}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-white/[0.07] p-7"
            >
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-5">
                The agency model is broken. We fixed it.
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Most Agencies
                  </p>
                  <ul className="space-y-2.5">
                    {comparison.them.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-[13px] text-slate-500 dark:text-slate-400 leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-500 mb-3">
                    Stryvenix
                  </p>
                  <ul className="space-y-2.5">
                    {comparison.us.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-[13px] text-slate-700 dark:text-slate-200 font-medium leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-5 text-[13px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/[0.06] pt-4">
                We measure success by your results — not our portfolio screenshots.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="grid sm:grid-cols-3 gap-4"
            >
              {capabilities.map(({ icon: Icon, label, desc, color, bg, border }) => (
                <div
                  key={label}
                  className="flex flex-col gap-3 bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-white/[0.07] p-5"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${bg} ${border} border flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {label}
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* ══════════════════════════════════════
            TIMELINE — SCROLL-LINKED UPGRADE
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-900/70 rounded-[2rem] border border-slate-200 dark:border-white/[0.07] p-8 md:p-12 overflow-hidden"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <meta itemProp="name"            content="Stryvenix"         />
          <meta itemProp="foundingDate"    content="2022"              />
          <meta itemProp="foundingLocation"content="Hyderabad, India"  />

          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-12">
            Our Journey
          </h3>

          <div className="relative" ref={timelineRef}>
            {/* Base Faint Track */}
            <div 
              className="absolute left-[5.5rem] top-3 bottom-0 w-[2px] bg-slate-100 dark:bg-white/[0.03] hidden sm:block rounded-full" 
              aria-hidden="true" 
            />
            
            {/* Scroll-Linked Dynamic Line */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[5.5rem] top-3 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 hidden sm:block rounded-full z-0"
              aria-hidden="true"
            >
              {/* Glowing Playhead Tip */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-8 bg-indigo-500/50 blur-md rounded-full" />
            </motion.div>
            
            <div className="space-y-12">
              {milestones.map(({ year, event }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ type: "spring", stiffness: 80, damping: 20 }}
                  className="flex flex-col sm:flex-row sm:items-start gap-6 group cursor-default"
                >
                  <div className="flex items-center gap-6 sm:flex-shrink-0 sm:w-28 mt-0.5">
                    {/* Year Label */}
                    <span className="text-sm font-extrabold text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 tabular-nums w-12 text-right">
                      {year}
                    </span>
                    
                    {/* Premium Animated Node */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="hidden sm:flex relative z-10 flex-shrink-0 items-center justify-center w-5 h-5"
                      aria-hidden="true"
                    >
                      {/* 1. Ambient Hover Glow (Expands far outward) */}
                      <div className="absolute inset-0 rounded-full bg-indigo-500/30 dark:bg-indigo-400/30 scale-50 opacity-0 group-hover:scale-[2.5] group-hover:opacity-100 transition-all duration-500 ease-out blur-[6px]" />
                      
                      {/* 2. Main Outer Ring (Hollow at rest, illuminates on hover) */}
                      <div className="absolute inset-0 rounded-full bg-white dark:bg-[#020617] border-[2.5px] border-slate-200 dark:border-white/[0.1] group-hover:border-indigo-500 dark:group-hover:border-indigo-400 transition-colors duration-300 z-10" />
                      
                      {/* 3. Inner Core Dot (Pops in dynamically on hover) */}
                      <div className="relative w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out z-20" />
                    </motion.div>
                  </div>
                  
                  {/* Event Content Box with Premium Hover State */}
                  <div className="flex-1 rounded-2xl p-4 sm:p-5 -my-4 sm:-my-5 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-white/[0.02] hover:scale-[1.01] hover:shadow-sm border border-transparent hover:border-slate-100 dark:hover:border-white/[0.05]">
                    <p className="text-[14.5px] text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                      {event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}