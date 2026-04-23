import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  Rocket,
  Store,
  TrendingUp,
  CreditCard,
  Shield,
  IndianRupee,
  Sparkles,
  Zap,
  // New icons for AI & Automation
  Bot,
  Cpu,
  Layers
} from 'lucide-react';

/* ─── GLOBAL STYLES ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    :root { 
      --font-body: 'Plus Jakarta Sans', sans-serif; 
    }
    
    body { 
      font-family: var(--font-body); 
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .bg-grain {
      background-image: url("https://grainy-gradients.vercel.app/noise.svg");
      opacity: 0.04;
      pointer-events: none;
    }

    @keyframes border-spin {
      100% { transform: rotate(360deg); }
    }
    .popular-border-spin {
      animation: border-spin 4s linear infinite;
    }

    @keyframes shimmer-btn {
      0%   { transform: translateX(-100%) skewX(-15deg); }
      100% { transform: translateX(250%) skewX(-15deg); }
    }
    
    .btn-shimmer { 
      position: relative; 
      overflow: hidden; 
    }
    
    .btn-shimmer::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
      transform: translateX(-100%) skewX(-15deg);
      transition: transform 0.7s ease;
    }
    
    .btn-shimmer:hover::after {
      animation: shimmer-btn 0.7s ease forwards;
    }

    @keyframes pulse-ring {
      0%   { transform: scale(1);   opacity: 0.6; }
      100% { transform: scale(1.8); opacity: 0; }
    }
    
    .pulse-ring-anim {
      animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    }
    
    /* Accessibility focus styles */
    .focus-ring {
      outline: none;
    }
    .focus-ring:focus-visible {
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5);
    }
  `}</style>
);

/* ─── DATA ─── */
const webPlans = [
  {
    title: 'Launch Website',
    price: 499,
    icon: Rocket,
    color: '#6366f1',
    gradient: 'from-indigo-500 to-blue-500',
    shadowColor: 'rgba(99,102,241,0.22)',
    popular: false,
    features: [
      '1-page scrolling website',
      'Mobile-first design',
      'Sections: Services, About, Reviews',
      'Contact form + Google Maps',
      'Basic SEO setup',
      'WordPress CMS',
      '7 days post-launch support',
    ],
  },
  {
    title: 'Small Business',
    price: 999,
    icon: Store,
    color: '#6366f1',
    gradient: 'from-indigo-500 to-blue-600',
    shadowColor: 'rgba(99,102,241,0.38)',
    popular: true,
    tag: 'Best Value',
    features: [
      'Up to 5 custom pages',
      'Conversion-focused layout',
      'Local SEO (Google Business)',
      'Speed optimization (90+ Score)',
      'WhatsApp Integration',
      '2 rounds of revisions',
      '30 days post-launch support',
      '1 month hosting included',
    ],
  },
  {
    title: 'Growth Engine',
    price: 1799,
    icon: TrendingUp,
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-500',
    shadowColor: 'rgba(245,158,11,0.22)',
    popular: false,
    features: [
      'Up to 8 pages + Blog setup',
      'Advanced On-page SEO',
      'Schema Markup (Rich Snippets)',
      'CMS Training Video',
      'Analytics Dashboard Setup',
      'Newsletter Integration',
      '2 months support & hosting',
      'Priority delivery',
    ],
  },
];

const aiPlans = [
  {
    title: 'AI Chatbot',
    price: 799,
    icon: Bot,
    color: '#10b981',
    gradient: 'from-emerald-400 to-teal-500',
    shadowColor: 'rgba(16,185,129,0.22)',
    popular: false,
    features: [
      'Custom LLM configuration',
      'Trained on your specific data',
      'Website & WhatsApp deployment',
      'Lead generation capture',
      'Multilingual capability',
      'Analytics dashboard',
      '14 days monitoring & tuning',
    ],
  },
  {
    title: 'Workflow Automation',
    price: 1299,
    icon: Cpu,
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
    shadowColor: 'rgba(139,92,246,0.38)',
    popular: true,
    tag: 'High ROI',
    features: [
      'Zapier/Make complex integration',
      'CRM & Email marketing sync',
      'Automated invoicing/receipts',
      'Custom API connections',
      'Error logging & alert system',
      'Workflow mapping document',
      '30 days post-launch support',
      'Team training session',
    ],
  },
  {
    title: 'Custom AI Solution',
    price: 2999,
    icon: Layers,
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-500',
    shadowColor: 'rgba(236,72,153,0.22)',
    popular: false,
    features: [
      'Predictive analytics setup',
      'Custom Machine Learning models',
      'Advanced data pipelines',
      'Dedicated cloud architecture',
      'System integration consulting',
      'Performance benchmarking',
      'Ongoing optimization plan',
      'Priority technical support',
    ],
  },
];

const BOOKING_URL = 'https://cal.com/stryvenix/30min';

/* ─── ANIMATED PRICE COUNTER ─── */
const AnimatedPrice = ({ target }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = null;
    let animationFrameId;
    const duration = 1200; 
    
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setDisplayed(Math.floor(ease * target));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };
    
    animationFrameId = requestAnimationFrame(step);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-extrabold text-slate-900 dark:text-white tracking-tight text-4xl md:text-5xl tabular-nums">
      ${displayed.toLocaleString()}
    </span>
  );
};

/* ─── SPOTLIGHT CARD ─── */
const SpotlightCard = ({ data, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  const Icon = data.icon;
  const isPopular = data.popular;

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.12, duration: 0.6, type: 'spring', stiffness: 55, damping: 18 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col rounded-[2rem] p-[1.5px] cursor-default h-full"
      style={{
        scale: isPopular ? 1.025 : 1,
        zIndex: isPopular ? 10 : 0,
        boxShadow: hovered
          ? `0 32px 64px -16px ${data.shadowColor}`
          : isPopular
          ? `0 20px 48px -12px ${data.shadowColor}`
          : '0 4px 24px -8px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.4s ease, transform 0.3s ease',
      }}
    >
      {isPopular && (
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="popular-border-spin absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
            style={{
              background: 'conic-gradient(from 0deg, #6366f1 0%, #818cf8 25%, #c4b5fd 50%, #818cf8 75%, #6366f1 100%)',
            }}
          />
        </div>
      )}

      <div
        className={`
          relative flex flex-col rounded-[calc(2rem-1.5px)] h-full flex-grow
          bg-slate-50 dark:bg-[#080d1a]
          ${!isPopular ? 'border border-slate-200/80 dark:border-white/[0.06]' : ''}
          p-8 md:p-10 z-10
        `}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[calc(2rem-1.5px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                480px circle at ${mouseX}px ${mouseY}px,
                ${data.color}12,
                transparent 75%
              )
            `,
            opacity: hovered ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {isPopular && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-5 rounded-b-2xl shadow-lg flex items-center gap-1.5">
              <Sparkles size={10} className="text-indigo-200" aria-hidden="true" />
              {data.tag}
            </div>
          </div>
        )}

        <div className="relative z-20 mb-7 mt-3">
          <div className="relative w-fit mb-6">
            <motion.div
              animate={hovered ? { scale: 1.12, rotate: 6 } : { scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 20 }}
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${data.gradient} flex items-center justify-center text-white shadow-lg`}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
            </motion.div>
            {isPopular && (
              <div
                className="pulse-ring-anim absolute inset-0 rounded-xl border-2 border-indigo-400 opacity-0 pointer-events-none"
                aria-hidden="true"
              />
            )}
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
            {data.title}
          </h3>

          <div className="flex items-baseline gap-1.5">
            <AnimatedPrice target={data.price} />
            <span className="text-slate-500 font-medium text-sm">/project</span>
          </div>
        </div>

        <div
          className="w-full h-px mb-7 relative z-20"
          style={{
            background: isPopular
              ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.35), transparent)'
              : 'rgba(148,163,184,0.18)',
          }}
          aria-hidden="true"
        />

        <ul className="space-y-3.5 flex-1 relative z-20 mb-8" aria-label={`Features for ${data.title} plan`}>
          {data.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 + index * 0.05 + i * 0.04, duration: 0.35 }}
              className="flex items-start gap-3 text-[14px] text-slate-600 dark:text-slate-300 font-medium leading-snug"
            >
              <motion.div
                animate={hovered ? { scale: 1.2 } : { scale: 1 }}
                transition={{ delay: i * 0.025, type: 'spring', stiffness: 400 }}
                className="shrink-0 mt-0.5"
              >
                <CheckCircle2
                  className={`w-4 h-4 ${
                    isPopular ? 'text-indigo-500' : 'text-slate-400 dark:text-slate-500'
                  }`}
                  aria-hidden="true"
                />
              </motion.div>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto relative z-20">
          <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')}
            className={`
              focus-ring w-full py-4 rounded-xl font-bold text-sm
              flex items-center justify-center gap-2 group/btn
              transition-colors duration-300 btn-shimmer
              ${isPopular
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/25'
                : 'bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10'
              }
            `}
            aria-label={`Get started with the ${data.title} plan`}
          >
            {isPopular && <Zap size={14} className="fill-white shrink-0" aria-hidden="true" />}
            {isPopular ? 'Get Started Now' : 'Get Started'}
            <ArrowRight
              size={16}
              className={`transition-transform duration-300 group-hover/btn:translate-x-1 ${
                !isPopular ? 'text-slate-400 -rotate-45 group-hover/btn:rotate-0' : ''
              }`}
              aria-hidden="true"
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── MILESTONE STEP ─── */
const MilestoneStep = ({ val, lbl, sub, active, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.15, type: 'spring', stiffness: 80 }}
      className="flex items-center gap-4"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-base border shrink-0 transition-all duration-300
          ${active
            ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30 shadow-lg shadow-indigo-500/15'
            : 'bg-white dark:bg-white/5 text-slate-700 dark:text-white border-slate-200 dark:border-white/10'
          }
        `}
      >
        {val}
      </motion.div>
      <div>
        <div className="font-bold text-slate-900 dark:text-white text-sm">{lbl}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub}</div>
      </div>
    </motion.div>
  );
};

/* ─── MAIN ─── */
export default function Pricing() {
  const [activeTab, setActiveTab] = useState('web');
  
  const currentPlans = useMemo(() => {
    return activeTab === 'web' ? webPlans : aiPlans;
  }, [activeTab]);

  return (
    <section
      className="relative py-24 md:py-36 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden"
      id="pricing"
      aria-labelledby="pricing-heading"
    >
      <GlobalStyles />

      <div className="absolute inset-0 bg-grain z-0" aria-hidden="true" />

      <div className="absolute top-[-15%] right-[-8%] w-[700px] h-[700px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-10%] left-[-12%] w-[560px] h-[560px] bg-blue-400/5 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* ─── HEADER ─── */}
        <header className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm mb-6 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 relative" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Transparent Pricing
            </span>
          </motion.div>

          <motion.h2
            id="pricing-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight"
          >
            Invest in your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 dark:from-indigo-400 dark:via-blue-400 dark:to-purple-400">
              digital future.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed"
          >
            One-time payment. Ownership is yours. Choose the package that fits your current growth stage with zero hidden fees.
          </motion.p>
        </header>

        {/* ─── TAB NAVIGATION ─── */}
        <div className="flex justify-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800/50 p-1.5 rounded-2xl inline-flex shadow-sm border border-slate-200 dark:border-white/10 backdrop-blur-md"
          >
            <button
               onClick={() => setActiveTab('web')}
               className={`focus-ring px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                 activeTab === 'web' 
                 ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 shadow-sm' 
                 : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
               }`}
            >
              Web Development
            </button>
            <button
               onClick={() => setActiveTab('ai')}
               className={`focus-ring px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                 activeTab === 'ai' 
                 ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 shadow-sm' 
                 : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
               }`}
            >
              AI & Automation
            </button>
          </motion.div>
        </div>

        {/* ─── CARDS ─── */}
        <div className="max-w-[70rem] mx-auto mb-24 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === 'web' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === 'web' ? 20 : -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch h-full"
            >
              {currentPlans.map((pkg, i) => (
                <SpotlightCard key={pkg.title} data={pkg} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── INDIA BANNER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="group relative overflow-hidden rounded-2xl p-px shadow-xl shadow-slate-200/60 dark:shadow-none"
            style={{
              background: 'linear-gradient(135deg, rgba(249,115,22,0.35), rgba(203,213,225,0.25) 50%, rgba(22,163,74,0.35))',
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,153,51,0.07), transparent 50%, rgba(19,136,8,0.07))',
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 rounded-[calc(1rem-1px)] bg-white dark:bg-[#080d1a] p-7 md:p-8">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-[calc(1rem-1px)] flex flex-col overflow-hidden" aria-hidden="true">
                <div className="flex-1 bg-orange-500" />
                <div className="flex-1 bg-white dark:bg-slate-100" />
                <div className="flex-1 bg-green-600" />
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 pl-4 text-center sm:text-left">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 380 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-50 to-green-50 dark:from-orange-500/10 dark:to-green-500/10 border border-orange-100/60 dark:border-white/5 flex items-center justify-center shrink-0"
                >
                  <IndianRupee className="w-6 h-6 text-slate-800 dark:text-white" aria-hidden="true" />
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                    Building from India?
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                    We support domestic startups and businesses with adjusted pricing parity based on regional economics.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')}
                className="focus-ring px-8 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-lg whitespace-nowrap btn-shimmer w-full sm:w-auto"
              >
                Request Consultation
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ─── MILESTONE PAYMENT ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-white/70 dark:bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-slate-200/80 dark:border-white/[0.07] relative overflow-hidden shadow-2xl shadow-slate-200/30 dark:shadow-none mb-16"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-indigo-400/50 dark:via-indigo-500/30 to-transparent pointer-events-none" aria-hidden="true" />

          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-10 relative z-10">
            <div className="flex items-center gap-4 shrink-0">
              <motion.div
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 360 }}
                className="p-3.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-100 dark:border-emerald-500/20"
              >
                <CreditCard className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  Milestone Payment
                </h3>
                <p className="text-sm text-slate-500 mt-1">Safe, secure, and entirely risk-free.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0 w-full xl:w-auto flex-1 xl:justify-end overflow-x-auto pb-4 sm:pb-0 hide-scrollbar">
              {[
                { val: '30%', lbl: 'Upfront', sub: 'To Start',  active: false },
                { val: '40%', lbl: 'Design',  sub: 'Approval',  active: false },
                { val: '30%', lbl: 'Launch',  sub: 'Handover',  active: true  },
              ].map((step, i) => (
                <React.Fragment key={step.lbl}>
                  <MilestoneStep {...step} index={i} />
                  {i < 2 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.5, ease: 'easeOut' }}
                      className="hidden sm:block h-[2px] bg-slate-200 dark:bg-white/10 mx-4 md:mx-6 origin-left rounded-full"
                      style={{ minWidth: '30px', maxWidth: '64px', flex: '1 1 auto' }}
                      aria-hidden="true"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─── FOOTER ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2 text-sm font-medium flex-wrap">
            <Shield className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" aria-hidden="true" />
            Not sure which architecture suits your project?{' '}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring text-slate-900 dark:text-white font-bold underline underline-offset-4 decoration-indigo-300 dark:decoration-indigo-700 hover:decoration-indigo-600 dark:hover:decoration-indigo-400 transition-all rounded-sm"
            >
              Book a free technical discovery call.
            </a>
          </p>
        </motion.div>

      </div>
    </section>
  );
}