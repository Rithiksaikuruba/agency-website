import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layout, Bot, Zap, Search, Wrench, Monitor, RefreshCw, TrendingUp, Cpu, Sparkles,
  ArrowRight, Check, ChevronRight
} from 'lucide-react';

import { servicesByCategory } from '../data/services';

const BOOKING_URL = 'https://cal.com/stryvenix/30min';

/* ─── ICON MAP ── */
const iconMap = {
  layout: Layout,
  monitor: Monitor,
  'refresh-cw': RefreshCw,
  'trending-up': TrendingUp,
  bot: Bot,
  cpu: Cpu,
  zap: Zap,
  sparkles: Sparkles,
  search: Search,
  wrench: Wrench,
};

/* ─── CATEGORY META ── */
const CATEGORY_META = [
  {
    category: 'Website Design',
    anchor: 'web-design-development',
    label: 'Web Design & Development',
    icon: Layout,
    blurb: 'Custom-built, fast, SEO-ready websites — from single landing pages to full business sites and redesigns.',
    image: '/Assets/Service_Website.png'
  },
  {
    category: 'AI Solutions',
    anchor: 'ai-solutions',
    label: 'AI Solutions',
    icon: Bot,
    blurb: 'Chatbots and AI integrations that handle real work — support, lead qualification, content, and search.',
    image: '/Assets/Service_ai.png'
  },
  {
    category: 'Automation',
    anchor: 'automation',
    label: 'Automation',
    icon: Zap,
    blurb: 'Workflow and AI-powered automation that connects your tools and removes repetitive manual work.',
    image: '/Assets/Service_Automation.png'
  },
  {
    category: 'SEO Audit',
    anchor: 'seo-audit',
    label: 'SEO Audit',
    icon: Search,
    blurb: 'A clear, prioritized audit of what’s holding your site back in search — and how to fix it.',
    image: '/Assets/Service_Seo.png'
  },
  {
    category: 'Maintenance',
    anchor: 'maintenance',
    label: 'Maintenance',
    icon: Wrench,
    blurb: 'Ongoing care after launch — updates, backups, monitoring, and small changes, handled for you.',
    image: '/Assets/Service_Maintenance.png'
  },
];

/* ─── GLOBAL STYLES ── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    .services-root, .services-root * { font-family: 'Plus Jakarta Sans', sans-serif; }
    .services-dot-grid {
      background-image: radial-gradient(circle, rgba(99,102,241,0.14) 1px, transparent 1px);
      background-size: 28px 28px;
    }
  `}</style>
);

/* ─── SCROLL TO HASH ON LOAD ── */
function useScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const scroll = () => {
      const el = document.getElementById(hash);
      if (!el) return false;
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
      return true;
    };
    if (!scroll()) {
      const t = setTimeout(scroll, 150);
      return () => clearTimeout(t);
    }
  }, []);
}

/* ─── QUICK JUMP NAV ── */
const QuickNav = ({ active }) => {
  const jump = (e, anchor) => {
    e.preventDefault();
    const el = document.getElementById(anchor);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
      window.history.replaceState(null, '', `#${anchor}`);
    }
  };

  return (
    <nav
      aria-label="Jump to a service category"
      className="sticky top-[72px] sm:top-[88px] z-30 w-full py-3 mb-6 bg-slate-50/90 dark:bg-[#020617]/90 backdrop-blur-md border-y border-slate-200 dark:border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 overflow-x-auto no-scrollbar">
        {CATEGORY_META.map(({ anchor, label, icon: Icon }) => (
          <a
            key={anchor}
            href={`#${anchor}`}
            onClick={(e) => jump(e, anchor)}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
              active === anchor
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/[0.08] hover:border-indigo-400'
            }`}
          >
            <Icon size={13} />
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
};

/* ─── SERVICE CARD ── */
const ServiceCard = ({ svc }) => {
  const Icon = iconMap[svc.icon] || Layout;
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
      className="flex flex-col h-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 sm:p-6 lg:p-7 hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/[0.06] transition-all duration-300"
      itemScope
      itemType="https://schema.org/Service"
    >
      <meta itemProp="name" content={svc.title} />
      <meta itemProp="description" content={svc.description} />
      <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-5">
        <Icon size={19} className="text-indigo-500" />
      </div>

      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight" itemProp="name">
        {svc.title}
      </h3>
      <p className="text-[13.5px] text-slate-500 dark:text-slate-400 leading-relaxed mb-5" itemProp="description">
        {svc.description}
      </p>

      <ul className="space-y-2 mb-6">
        {svc.features.slice(0, 4).map((f) => (
          <li key={f} className="flex items-start gap-2 text-[12.5px] text-slate-600 dark:text-slate-300">
            <Check size={13} className="text-indigo-500 mt-0.5 flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5 border-t border-slate-100 dark:border-white/[0.06] flex justify-end">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[12.5px] font-bold text-indigo-600 dark:text-indigo-400 hover:gap-2 transition-all flex-shrink-0"
        >
          Get a quote <ArrowRight size={13} />
        </a>
      </div>
    </motion.article>
  );
};

/* ─── CATEGORY SECTION ── */
const CategorySection = ({ meta }) => {
  const items = servicesByCategory[meta.category] || [];
  const Icon = meta.icon;

  return (
    <section
      id={meta.anchor}
      className="scroll-mt-24 py-12 sm:py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.06] last:border-b-0"
      aria-label={`${meta.label} services`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 ${
          meta.anchor === 'ai-solutions' ? 'mb-8 lg:mb-12' : 'mb-10 lg:mb-12'
        }`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/25">
              <Icon size={22} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              {meta.label}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              {meta.blurb}
            </p>
          </motion.div>

          {meta.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            >
              <img 
                src={meta.image} 
                alt={`${meta.label} illustration`} 
                className={`block mx-auto lg:mx-0 w-full h-auto object-contain drop-shadow-xl max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] ${
                  meta.anchor === 'ai-solutions' ? 'xl:max-w-[460px]' : ''
                }`}
              />
            </motion.div>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((svc) => (
              <ServiceCard key={svc.id} svc={svc} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center lg:text-left mt-8">More details coming soon — reach out and we'll walk you through it.</p>
        )}
      </div>
    </section>
  );
};

/* ─── PAGE ── */
export default function ServicesPage() {
  useScrollToHash();

  const [active, setActive] = useState(CATEGORY_META[0].anchor);

  useEffect(() => {
    const sections = CATEGORY_META
      .map(({ anchor }) => document.getElementById(anchor))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.title = 'Services — Website Design, AI & Automation | Stryvenix';
  }, []);

  return (
    <div className="services-root relative bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-x-hidden">
      <GlobalStyles />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 services-dot-grid opacity-50 dark:opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-500/[0.06] rounded-full blur-[120px]" />
      </div>

      {/* ── HERO ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-40 pb-8 sm:pb-14">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-[12.5px] text-slate-400 dark:text-slate-500">
            <li><a href="/" className="hover:text-indigo-500 transition-colors font-medium">Home</a></li>
            <li><ChevronRight size={12} /></li>
            <li className="text-slate-600 dark:text-slate-300 font-semibold">Services</li>
          </ol>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-500 mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse inline-block" />
            What We Do
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight max-w-3xl">
            Everything you need to launch, grow, and{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-400 italic">
              run
            </span>{' '}
            online.
          </h1>
          <p className="mt-5 text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Website design and development, AI solutions, automation, SEO audits, and ongoing maintenance —
            all under one roof, built by the same team that ships your project.
          </p>
        </motion.div>
      </div>

      {/* ── QUICK NAV ── */}
      <QuickNav active={active} />

      {/* ── CATEGORY SECTIONS ── */}
      <div className="relative z-10">
        {CATEGORY_META.map((meta) => (
          <CategorySection key={meta.anchor} meta={meta} />
        ))}
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Not sure which service you need?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8 text-sm sm:text-base">
          Book a free 30-minute call and we'll help you figure out the right starting point for your project and budget.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 w-full sm:w-auto rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
        >
          Book a Free Call
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}