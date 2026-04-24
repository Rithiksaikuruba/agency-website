import React, { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate, useInView, AnimatePresence } from 'framer-motion';
import {
  DollarSign, Smartphone, TrendingUp, Shield, Headphones,
  CheckCircle2, Clock, Zap, Star, ArrowRight, X, Check,
  Layers, MessageSquare, Users
} from 'lucide-react';

/* ─── 1. GLOBAL STYLES ─────────────────────────────────────────── */
const GlobalStyles = memo(() => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,700;1,800&display=swap');

    :root { --font: 'Plus Jakarta Sans', sans-serif; }
    *, body { font-family: var(--font); }
    
    .grain {
      background-image: url("https://grainy-gradients.vercel.app/noise.svg");
      opacity: 0.03;
      pointer-events: none;
    }
    .dot-grid {
      background-image: radial-gradient(circle, rgba(99,102,241,0.16) 1px, transparent 1px);
      background-size: 30px 30px;
    }
    .hex-grid {
      background-image: radial-gradient(circle, rgba(99,102,241,0.08) 1.5px, transparent 1.5px);
      background-size: 22px 22px;
    }
    @keyframes ticker { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
    .ticker-track { animation: ticker 26s linear infinite; }
    .ticker-track:hover { animation-play-state: paused; }
    
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    .shimmer-text {
      background: linear-gradient(90deg, #6366f1, #a78bfa, #818cf8, #6366f1);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4s linear infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(-3deg); }
      50% { transform: translateY(-8px) rotate(-1deg); }
    }
    .float-badge { animation: float 4s ease-in-out infinite; }

    .glow-card { transition: box-shadow 0.4s ease, transform 0.3s ease; }
    .glow-card:hover {
      box-shadow: 0 0 0 1px rgba(99,102,241,0.4), 0 30px 80px -15px rgba(99,102,241,0.15);
      transform: translateY(-2px);
    }
    
    .vs-row-highlight { transition: background 0.2s ease; }
    .vs-row-highlight:hover { background: rgba(99,102,241,0.04); }
    
    .progress-ring {
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
  `}</style>
));

/* ─── 2. ANIMATED COUNTER ───────────────────────────────────────── */
const Counter = memo(({ to, suffix = '', prefix = '', duration = 1.8, decimals = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration, ease: [0.22, 1, 0.36, 1],
      onUpdate: v => setDisplay(decimals > 0 ? v.toFixed(decimals) : Math.round(v)),
    });
    return controls.stop;
  }, [inView, to, duration, decimals]);
  
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
});

/* ─── 3. ANIMATED TEXT ──────────────────────────────────────────── */
const AnimatedText = memo(({ text, className, delay = 0 }) => {
  const words = useMemo(() => text.split(' '), [text]);
  const container = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: delay } },
  }), [delay]);
  const child = useMemo(() => ({
    visible: { opacity: 1, y: 0,  transition: { type: 'spring', damping: 14, stiffness: 120 } },
    hidden:  { opacity: 0, y: 24, transition: { type: 'spring', damping: 14, stiffness: 120 } },
  }), []);

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
      variants={container} initial="hidden"
      whileInView="visible" viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span variants={child} style={{ marginRight: '0.28em' }} key={i}>{word}</motion.span>
      ))}
    </motion.div>
  );
});

/* ─── 4. VARIANTS ───────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ─── 5. SPOTLIGHT CARD ─────────────────────────────────────────── */
const SpotlightCard = memo(({ children, className = '' }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // useCallback prevents creating a new handler function on every render
  const handleMove = useCallback(({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mx.set(clientX - left);
    my.set(clientY - top);
  }, [mx, my]);

  const gradientLight = useMotionTemplate`radial-gradient(540px circle at ${mx}px ${my}px, rgba(99,102,241,0.08), transparent 80%)`;
  const gradientDark  = useMotionTemplate`radial-gradient(540px circle at ${mx}px ${my}px, rgba(139,92,246,0.16), transparent 80%)`;

  return (
    <motion.div
      variants={fadeUp}
      className={`relative border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-slate-900/70 overflow-hidden group glow-card ${className}`}
      onMouseMove={handleMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{ background: gradientLight }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 hidden dark:block"
        style={{ background: gradientDark }}
      />
      <div className="relative h-full z-20">{children}</div>
    </motion.div>
  );
});

/* ─── 6. RING PROGRESS ──────────────────────────────────────────── */
const RingProgress = memo(({ value, size = 56, stroke = 4, color = '#6366f1', bg = 'rgba(99,102,241,0.1)' }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="progress-ring">
        <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke} stroke={bg} />
        <motion.circle
          cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke} stroke={color}
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: circ - (value / 100) * circ } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
    </div>
  );
});

/* ─── 7. STAT PILL ──────────────────────────────────────────────── */
const StatPill = memo(({ icon: Icon, value, label, color, ringColor, ringValue }) => (
  <motion.div
    variants={fadeUp}
    className="flex items-center gap-3 bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-2xl px-4 py-3 shadow-sm backdrop-blur-sm"
  >
    <div className="relative flex items-center justify-center flex-shrink-0">
      <RingProgress value={ringValue ?? 90} size={46} stroke={3} color={ringColor ?? '#6366f1'} />
      <div className={`absolute w-7 h-7 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
    </div>
    <div>
      <div className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-0.5">{value}</div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  </motion.div>
));

/* ─── 8. TICKER ─────────────────────────────────────────────────── */
const badges = [
  { text: 'Clear Pricing', symbol: '◆' }, { text: '6-Month Support', symbol: '◆' },
  { text: 'Mobile First', symbol: '◆' }, { text: 'Built to Scale', symbol: '◆' },
  { text: 'WCAG Compliant', symbol: '◆' }, { text: 'On-Time Delivery', symbol: '◆' },
  { text: 'Zero Hidden Fees', symbol: '◆' }, { text: 'Agile Process', symbol: '◆' },
];
// Computed once at module level — never recreated
const allBadges = [...badges, ...badges];

const TickerStripe = memo(() => (
  <div className="w-full overflow-hidden border-y border-slate-100 dark:border-white/[0.05] py-3.5 mb-20 relative">
    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-[#020617] to-transparent z-10 pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-[#020617] to-transparent z-10 pointer-events-none" />
    <div className="flex whitespace-nowrap ticker-track">
      {allBadges.map((b, i) => (
        <span key={i} className="inline-flex items-center gap-2 px-7 text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-[0.15em] uppercase">
          <span className="text-indigo-400 dark:text-indigo-500 text-[8px]">{b.symbol}</span>
          {b.text}
        </span>
      ))}
    </div>
  </div>
));

/* ─── 9. ANIMATED CLOCK ─────────────────────────────────────────── */
const AnimatedClock = memo(() => {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT(s => (s + 1) % 720), 60);
    return () => clearInterval(id);
  }, []);
  const hour = (t / 720) * 360;
  const min  = ((t % 60) / 60) * 360;
  
  return (
    <div className="relative w-24 h-24 mx-auto">
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <defs>
          <radialGradient id="clockFace" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(99,102,241,0.06)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0)" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="37" fill="url(#clockFace)" stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-white/10" />
        <circle cx="40" cy="40" r="33" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" className="text-indigo-300 dark:text-indigo-800 opacity-50" />
        {[...Array(12)].map((_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const inner = i % 3 === 0 ? 28 : 30;
          return (
            <line key={i}
              x1={40 + inner * Math.cos(a)} y1={40 + inner * Math.sin(a)}
              x2={40 + 33 * Math.cos(a)} y2={40 + 33 * Math.sin(a)}
              stroke="currentColor" strokeWidth={i % 3 === 0 ? 2 : 1}
              className={i % 3 === 0 ? 'text-slate-400 dark:text-white/30' : 'text-slate-200 dark:text-white/10'}
            />
          );
        })}
        <line x1="40" y1="40"
          x2={40 + 14 * Math.cos((hour - 90) * Math.PI / 180)}
          y2={40 + 14 * Math.sin((hour - 90) * Math.PI / 180)}
          stroke="#6366f1" strokeWidth="3" strokeLinecap="round"
        />
        <line x1="40" y1="40"
          x2={40 + 22 * Math.cos((min - 90) * Math.PI / 180)}
          y2={40 + 22 * Math.sin((min - 90) * Math.PI / 180)}
          stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"
        />
        <circle cx="40" cy="40" r="3" fill="#6366f1" />
        <circle cx="40" cy="40" r="1.5" fill="white" />
      </svg>
    </div>
  );
});

/* ─── 10. MINI BAR CHART ────────────────────────────────────────── */
const bars = [28, 44, 38, 60, 52, 74, 68, 88, 82, 95];
const barColors = ['#6366f1', '#818cf8', '#a78bfa', '#c4b5fd'];

const MiniBarChart = memo(() => (
  <div className="flex items-end gap-1 h-16 mt-4">
    {bars.map((h, i) => (
      <div key={i} className="flex-1 rounded-t relative" style={{ height: '100%', background: 'rgba(99,102,241,0.06)' }}>
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-t"
          style={{ background: `linear-gradient(to top, ${barColors[i % 4]}, ${barColors[(i+1) % 4]}80)` }}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    ))}
  </div>
));

/* ─── 11. VS COMPARISON TABLE ───────────────────────────────────── */
const ComparisonRow = memo(({ label, us = true, them = false, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }} transition={{ delay, duration: 0.4 }}
    className="vs-row-highlight flex items-center gap-4 py-2.5 px-3 rounded-xl"
  >
    <span className="flex-1 text-sm text-slate-600 dark:text-slate-400 font-medium">{label}</span>
    <div className="w-20 flex justify-center">
      {us
        ? <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <Check className="w-3.5 h-3.5" /> Yes
          </span>
        : <X className="w-4 h-4 text-slate-300 dark:text-slate-600" />}
    </div>
    <div className="w-20 flex justify-center">
      {them
        ? <span className="flex items-center gap-1 text-xs font-bold text-emerald-600"><Check className="w-3.5 h-3.5" /> Yes</span>
        : <X className="w-4 h-4 text-slate-300 dark:text-slate-600" />}
    </div>
  </motion.div>
));

/* ─── 13. REVIEW STARS ──────────────────────────────────────────── */
const ReviewStars = memo(({ count = 5, size = 12 }) => (
  <div className="flex gap-0.5">
    {[...Array(count)].map((_, i) => (
      <Star key={i} style={{ width: size, height: size }} className="text-amber-400 fill-amber-400" />
    ))}
  </div>
));

/* ─── 14. POST-LAUNCH CARD ──────────────────────────────────────── */

const CHAT_SEQUENCE = [
  { id: 1, side: 'them', text: 'Just noticed our load time dropped to 0.8s 🔥', time: '2:41 PM', delay: 500 },
  { id: 2, side: 'us',   text: 'Yep — we pushed a caching update overnight.', time: '2:42 PM', delay: 2000 },
  { id: 3, side: 'them', text: 'Amazing. Can we also add a promo banner for Friday?', time: '2:42 PM', delay: 3600 },
  { id: 4, side: 'us',   text: "On it — will be live within the hour ⚡", time: '2:43 PM', delay: 5200 },
  { id: 5, side: 'resolved', delay: 6800 },
];

const ACTIVITY_EVENTS = [
  { icon: '🚀', label: 'Deploy pushed to production',    tag: 'Deploy',   tagColor: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500', time: 'just now' },
  { icon: '⚡', label: 'Caching optimised — 38% faster', tag: 'Perf',     tagColor: 'bg-teal-50 dark:bg-teal-500/10 text-teal-500',    time: '4m ago' },
  { icon: '🛡️', label: 'SSL certificate auto-renewed',   tag: 'Security', tagColor: 'bg-blue-50 dark:bg-blue-500/10 text-blue-500',    time: '1h ago' },
  { icon: '🐛', label: 'Edge-case bug detected & fixed',  tag: 'Fix',      tagColor: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600', time: '3h ago' },
  { icon: '📊', label: 'Weekly health report sent',       tag: 'Report',   tagColor: 'bg-purple-50 dark:bg-purple-500/10 text-purple-500', time: '1d ago' },
  { icon: '🔄', label: 'Dependencies updated & tested',   tag: 'Update',   tagColor: 'bg-rose-50 dark:bg-rose-500/10 text-rose-500',   time: '2d ago' },
];

const SPARK = [99.1, 99.5, 98.9, 99.7, 99.9, 99.6, 99.8, 99.9, 99.7, 99.9];

/* ── Typing bubble ── */
const TypingBubble = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 6, scale: 0.92 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.15 } }}
    className="flex items-end gap-2 max-w-[78%]"
  >
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex-shrink-0 flex items-center justify-center shadow-sm">
      <Headphones style={{ width: 11, height: 11 }} className="text-white" />
    </div>
    <div className="bg-slate-100 dark:bg-white/[0.08] px-3.5 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
      {[0, 0.18, 0.36].map((d, i) => (
        <motion.span key={i}
          className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.65, repeat: Infinity, delay: d, ease: 'easeInOut' }}
        />
      ))}
    </div>
  </motion.div>
));

/* ── Chat bubble ── */
const ChatBubble = memo(({ msg }) => {
  const isUs = msg.side === 'us';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 220 }}
      className={`flex items-end gap-2 ${isUs ? 'flex-row-reverse ml-auto max-w-[82%]' : 'max-w-[82%]'}`}
    >
      {!isUs && (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex-shrink-0 flex items-center justify-center shadow-sm mb-0.5">
          <Headphones style={{ width: 11, height: 11 }} className="text-white" />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <div className={`px-3.5 py-2.5 rounded-2xl text-[11.5px] leading-relaxed font-medium shadow-sm ${
          isUs
            ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-br-sm'
            : 'bg-slate-100 dark:bg-white/[0.08] text-slate-700 dark:text-slate-200 rounded-bl-sm'
        }`}>
          {msg.text}
        </div>
        <div className={`flex items-center gap-1 text-[9px] text-slate-400 ${isUs ? 'justify-end' : ''}`}>
          <span>{msg.time}</span>
          {isUs && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}>
              <CheckCircle2 className="w-2.5 h-2.5 text-indigo-400" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

/* ── Animated chat widget — isolated so it never triggers parent re-render ── */
const AnimatedChatWidget = memo(() => {
  const [visibleMsgs, setVisibleMsgs] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [phase, setPhase] = useState(0);
  const timersRef = useRef([]);

  useEffect(() => {
    let active = true;
    const clearAll = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

    const run = () => {
      if (!active) return;
      clearAll();
      setVisibleMsgs([]);
      setShowTyping(false);
      setPhase(p => p + 1);

      CHAT_SEQUENCE.forEach((msg, i) => {
        if (i > 0 && msg.side !== 'resolved') {
          timersRef.current.push(setTimeout(() => { if (active) setShowTyping(true); }, msg.delay - 950));
        }
        timersRef.current.push(setTimeout(() => {
          if (!active) return;
          setShowTyping(false);
          setVisibleMsgs(m => [...m, msg]);
        }, msg.delay));
      });

      timersRef.current.push(setTimeout(() => {
        if (!active) return;
        setVisibleMsgs([]);
        setShowTyping(false);
        timersRef.current.push(setTimeout(run, 700));
      }, 10500));
    };

    run();
    return () => { active = false; clearAll(); };
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-white/[0.09] rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-black/40 overflow-hidden w-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-md">
            <Headphones style={{ width: 16, height: 16 }} className="text-white" />
          </div>
          <motion.div className="absolute inset-0 rounded-full border-2 border-green-400"
            animate={{ scale: [1, 1.65], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] font-extrabold text-slate-900 dark:text-white leading-none">Support Team</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <motion.span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"
              animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="text-[10px] text-green-500 font-semibold">Online · replies in ~5 min</span>
          </div>
        </div>
        <motion.div className="relative flex-shrink-0"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: 'spring', damping: 10 }}
        >
          <div className="w-7 h-7 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <motion.div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2.2, repeat: Infinity }}
          >
            <span className="text-[7px] font-extrabold text-white">1</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Messages */}
      <div className="px-4 pt-3 pb-2 h-[168px] overflow-hidden flex flex-col justify-end gap-2.5">
        <AnimatePresence mode="popLayout">
          {visibleMsgs.map(msg =>
            msg.side === 'resolved' ? (
              <motion.div key={`resolved-${phase}`}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ type: 'spring', damping: 18 }}
                className="flex items-center gap-2 py-0.5"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-200 dark:via-green-800/30 to-transparent" />
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 8, delay: 0.1 }}>
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                  </motion.div>
                  <span className="text-[9.5px] font-extrabold text-green-600 dark:text-green-400">Resolved · 3 min avg</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-green-200 dark:via-green-800/30 to-transparent" />
              </motion.div>
            ) : <ChatBubble key={msg.id} msg={msg} />
          )}
          {showTyping && <TypingBubble key={`typing-${phase}`} />}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="px-3 py-2.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center gap-2">
        <div className="flex-1 h-8 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center px-3 gap-2 overflow-hidden">
          <motion.div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-600"
            animate={{ width: ['25%', '52%', '38%', '62%', '25%'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span className="text-slate-300 dark:text-slate-600 text-sm leading-none"
            animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.1, repeat: Infinity }}
          >|</motion.span>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
          className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center cursor-pointer shadow-md shadow-indigo-200/60 dark:shadow-indigo-900/50 flex-shrink-0"
        >
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </motion.div>
      </div>
    </div>
  );
});

/* ── Sparkline SVG ── */
const Sparkline = memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const min = 98.5, max = 100;
  const w = 120, h = 28;
  const pts = SPARK.map((v, i) => {
    const x = (i / (SPARK.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${x},${y}`;
  }).join(' ');
  const area = `0,${h} ${pts} ${w},${h}`;
  return (
    <div ref={ref} className="flex items-center gap-2">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
          <clipPath id="sparkClip">
            <motion.rect x="0" y="0" height={h}
              initial={{ width: 0 }} animate={inView ? { width: w } : {}}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </clipPath>
        </defs>
        <g clipPath="url(#sparkClip)">
          <polygon points={area} fill="url(#sparkGrad)" />
          <polyline points={pts} stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
        <motion.circle cx={w} cy={h - ((SPARK[SPARK.length-1] - min) / (max - min)) * h} r="2.5" fill="#22c55e"
          animate={{ r: [2, 4, 2], opacity: [1, 0.5, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
        />
      </svg>
      <span className="text-[10px] font-extrabold text-green-500">99.9%</span>
    </div>
  );
});

/* ── Live activity feed — isolated to prevent polluting parent renders ── */
const LiveFeed = memo(() => {
  const [events, setEvents] = useState(() =>
    ACTIVITY_EVENTS.map((ev, i) => ({ ...ev, id: `init-${i}` }))
  );

  useEffect(() => {
    let tickCount = 0;
    const id = setInterval(() => {
      tickCount++;
      setEvents(prev => {
        const next = [...prev];
        next.pop();
        const newItem = {
          ...ACTIVITY_EVENTS[tickCount % ACTIVITY_EVENTS.length],
          time: 'just now',
          id: `live-${tickCount}`,
        };
        return [newItem, ...next];
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-white/[0.09] rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-black/40 overflow-hidden w-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <motion.span className="w-2 h-2 rounded-full bg-green-500 inline-block"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[12px] font-extrabold text-slate-900 dark:text-white">Live Activity</span>
        </div>
        <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 px-2 py-0.5 rounded-full">
          Last 48h
        </span>
      </div>

      <div className="divide-y divide-slate-50 dark:divide-white/[0.04]">
        <AnimatePresence mode="popLayout">
          {events.slice(0, 3).map((ev, i) => (
            <motion.div key={ev.id}
              initial={{ opacity: 0, x: -10, backgroundColor: 'rgba(99,102,241,0.06)' }}
              animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(99,102,241,0)' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, backgroundColor: { duration: 1.2 } }}
              className="flex items-center gap-3 px-4 py-2"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-[13px]">
                {ev.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">{ev.label}</p>
                <p className="text-[9.5px] text-slate-400 mt-0.5">{i === 0 ? 'just now' : ev.time}</p>
              </div>
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-current/20 flex-shrink-0 ${ev.tagColor}`}>
                {ev.tag}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="px-4 py-2.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
        <div>
          <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Uptime (30d)</p>
          <Sparkline />
        </div>
        <div className="text-right">
          <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Incidents</p>
          <p className="text-sm font-extrabold text-slate-900 dark:text-white">0 <span className="text-[10px] text-slate-400 font-semibold">this month</span></p>
        </div>
      </div>
    </div>
  );
});

const PostLaunchCard = memo(() => (
  <SpotlightCard className="md:col-span-2 lg:col-span-3 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/15 to-indigo-50/10 dark:from-slate-900 dark:via-rose-900/[0.05] dark:to-indigo-900/[0.05] pointer-events-none" />
    <motion.div className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none opacity-60"
      style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.07), transparent 70%)' }}
      animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />

    <div className="relative z-10 flex flex-col lg:flex-row gap-8">

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 bg-pink-50 dark:bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-600 dark:text-pink-400 border border-pink-100 dark:border-pink-500/20 flex-shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20"
          >
            <motion.span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10.5px] font-extrabold text-green-600 dark:text-green-400">Support Active</span>
          </motion.div>
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight">
          Post-Launch Partnership
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-[13.5px] leading-relaxed mb-5 max-w-xs">
          6 months of dedicated support included —
          <span className="font-extrabold text-slate-800 dark:text-white"> monitoring, fixes, and updates</span>.
        </p>

        <div className="flex flex-wrap gap-2.5 mb-5">
          {[
            { value: <Counter to={6} suffix="mo" />,  label: 'Support',   color: 'text-pink-500',  ring: '#f43f5e', bg: 'bg-pink-50 dark:bg-pink-500/10',   val: 100 },
            { value: <Counter to={99} suffix="%" />,  label: 'Uptime',    color: 'text-green-500',  ring: '#22c55e', bg: 'bg-green-50 dark:bg-green-500/10',  val: 99  },
            { value: <><Counter to={5} />m</>,          label: 'Avg Reply', color: 'text-indigo-500', ring: '#6366f1', bg: 'bg-indigo-50 dark:bg-indigo-500/10', val: 94  },
          ].map(({ value, label, color, ring, bg, val }) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="relative flex items-center gap-2 bg-white dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.07] rounded-xl px-3 py-2 overflow-hidden flex-1 min-w-[120px]"
            >
              <div className={`absolute inset-0 opacity-20 rounded-xl ${bg}`} />
              <RingProgress value={val} size={28} stroke={2.5} color={ring} />
              <div>
                <div className={`text-[11px] font-extrabold ${color} leading-none`}>{value}</div>
                <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-2 mb-5">
          {[
            { text: 'Real-time uptime & performance monitoring', delay: 0.1 },
            { text: 'Bug fixes deployed within hours, not days',  delay: 0.18 },
            { text: 'Proactive security patches & updates',       delay: 0.26 },
          ].map(({ text, delay }) => (
            <motion.div key={text}
              initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay }}
              className="flex items-center gap-2"
            >
              <div className="w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 text-indigo-500" />
              </div>
              <span className="text-[12px] text-slate-600 dark:text-slate-400">{text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="flex items-center gap-3 bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.07] rounded-xl px-3.5 py-2.5 shadow-sm"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-[9px] font-extrabold">SM</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11.5px] text-slate-600 dark:text-slate-300 italic truncate">"Their support saved us during a traffic spike."</p>
            <p className="text-[9.5px] text-slate-400 font-bold mt-0.5">Sarah M., Founder @ FinScale</p>
          </div>
          <ReviewStars count={5} size={9} />
        </motion.div>
      </div>

      <motion.div className="flex-shrink-0 w-full lg:w-[268px]"
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.15 }}
      >
        <LiveFeed />
      </motion.div>

      <motion.div className="flex-shrink-0 w-full lg:w-[268px]"
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.28 }}
      >
        <AnimatedChatWidget />
      </motion.div>

    </div>
  </SpotlightCard>
));

/* ─── 15. TYPED CODE BLOCK — isolated component ────────────────────
   KEY OPTIMIZATION: This component owns its own 75ms interval state.
   Previously this lived in the WhyChooseUs parent, causing the ENTIRE
   tree (all bento cards, counters, animations) to re-render every 75ms.
   Now only this tiny component re-renders on each tick.
─────────────────────────────────────────────────────────────────── */
const CODE_STRING = `const project = {\n  pricing: "transparent",\n  hidden_fees: 0,\n  surprises: null,\n  trust: Infinity\n};`;

const TypedCodeBlock = memo(() => {
  const [typedCode, setTypedCode] = useState('');

  useEffect(() => {
    let i = 0, reset = false;
    const id = setInterval(() => {
      if (reset) { setTypedCode(''); i = 0; reset = false; return; }
      setTypedCode(CODE_STRING.slice(0, i));
      i++;
      if (i > CODE_STRING.length) { setTimeout(() => { reset = true; }, 2800); }
    }, 75);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden lg:block absolute right-4 top-6 bottom-6 w-[42%] overflow-hidden rounded-xl pointer-events-none select-none">
      <div className="absolute inset-0 bg-gradient-to-l from-slate-50/0 dark:from-[#0B1121]/0 to-slate-50 dark:to-[#0B1121] z-10" />
      <div className="p-4 bg-slate-900 dark:bg-slate-950 rounded-xl h-full border border-white/10">
        <div className="flex gap-1.5 mb-3">
          {['#ff5f57','#ffbd2e','#28ca42'].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
        </div>
        <div className="text-[11px] leading-6 font-mono">
          <span className="text-purple-400">const </span>
          <span className="text-blue-300">project</span>
          <span className="text-white"> = {'{'}</span>
          {typedCode.includes('\n') && (
            <>
              {typedCode.split('\n').slice(1).map((line, i) => (
                <div key={i} className="pl-3">
                  {line.includes('pricing')     && <><span className="text-teal-300">pricing</span><span className="text-white">: </span><span className="text-amber-300">"transparent"</span><span className="text-slate-400">,</span></>}
                  {line.includes('hidden_fees') && <><span className="text-teal-300">hidden_fees</span><span className="text-white">: </span><span className="text-orange-400">0</span><span className="text-slate-400">,</span></>}
                  {line.includes('surprises')   && <><span className="text-teal-300">surprises</span><span className="text-white">: </span><span className="text-slate-400">null</span><span className="text-slate-400">,</span></>}
                  {line.includes('trust')       && <><span className="text-teal-300">trust</span><span className="text-white">: </span><span className="text-purple-300">Infinity</span></>}
                  {line.includes('}')           && <span className="text-white">{'}'}</span>}
                  {line.includes('}')           && <span className="text-slate-400">;</span>}
                </div>
              ))}
            </>
          )}
          <span className="animate-pulse text-indigo-400">▌</span>
        </div>
      </div>
    </div>
  );
});

/* ─── 16. MAIN EXPORT ───────────────────────────────────────────── */
export default function WhyChooseUs() {
  // typedCode state is now gone from this component entirely
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500" id="why">
      <GlobalStyles />

      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grain z-10" />
        <div className="absolute inset-0 dot-grid opacity-50 dark:opacity-40 z-0" />
        <motion.div
          className="absolute top-[8%] left-[-15%] w-[750px] h-[750px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)' }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[5%] right-[-10%] w-[650px] h-[650px] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08), transparent 70%)' }}
          animate={{ x: [0, -20, 0], y: [0, -30, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute top-[45%] left-[35%] w-[500px] h-[500px] bg-teal-500/[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-20">

        {/* ── HEADER ── */}
        <div className="mb-16 max-w-4xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] shadow-sm mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">The Advantage</span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            <div className="flex-1">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight leading-[1.05]">
                <AnimatedText text="Why choose us over" className="text-slate-900 dark:text-white" />
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 italic">
                  <AnimatedText text="the rest?" delay={0.35} />
                </span>
              </h2>
              <motion.p
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed"
              >
                We don't just ship code — we engineer outcomes. Here's how we ensure your project succeeds where others fall short.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.5 }}
              className="flex-shrink-0 hidden lg:block max-w-xs bg-white dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.06] rounded-2xl p-5 shadow-sm"
            >
              <ReviewStars count={5} size={13} />
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed italic">
                "Honestly the most transparent agency we've worked with — no surprises, just results."
              </p>
              <div className="flex items-center gap-2.5 mt-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Jordan K.</p>
                  <p className="text-[10px] text-slate-400">CTO, FinScale</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── STAT PILLS ── */}
        <motion.div className="flex flex-wrap gap-3 mb-10"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          <StatPill icon={Star}         value={<><Counter to={98} suffix="%" /> Satisfaction</>} label="Avg. client rating"        color="bg-amber-50 dark:bg-amber-500/10 text-amber-500"   ringColor="#f59e0b" ringValue={98} />
          <StatPill icon={CheckCircle2} value={<><Counter to={20} suffix="+" /> Projects</>}    label="Successfully delivered"   color="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500" ringColor="#6366f1" ringValue={100} />
          <StatPill icon={Zap}          value={<><Counter to={6} /> Mo. Support</>}             label="Post-launch included"      color="bg-teal-50 dark:bg-teal-500/10 text-teal-500"       ringColor="#14b8a6" ringValue={100} />
          <StatPill icon={Clock}        value={<><Counter to={97} suffix="%" /> On-Time</>}      label="Delivery rate"            color="bg-purple-50 dark:bg-purple-500/10 text-purple-500"  ringColor="#a78bfa" ringValue={97} />
          <StatPill icon={Users}        value={<><Counter to={6} suffix="+" /> Clients</>}      label="Long-term partnerships"   color="bg-rose-50 dark:bg-rose-500/10 text-rose-500"        ringColor="#f43f5e" ringValue={85} />
        </motion.div>

        <TickerStripe />

        {/* ── BENTO GRID ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-40px' }} variants={stagger}
        >

          {/* ── CARD 1: CLEAR PRICING (wide) ── */}
          <SpotlightCard className="md:col-span-2 rounded-[2rem] p-6 sm:p-10 flex flex-col justify-center min-h-[300px] relative">
            {/* TypedCodeBlock is now its own isolated component — no more full-tree re-renders */}
            <TypedCodeBlock />

            <motion.div
              className="hidden lg:flex float-badge absolute top-8 right-[calc(42%-16px)] bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-500/30 shadow-lg shadow-indigo-100/40 dark:shadow-indigo-900/30 rounded-2xl px-4 py-2.5 items-center gap-2.5 z-10"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-500/20 flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white">No hidden fees</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            </motion.div>

            <div className="relative z-10 max-w-full lg:max-w-[52%]">
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                <DollarSign className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">Clear Scope & Pricing</h3>
              <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                Transparent pricing from day one. You know exactly what you're paying for — and what you'll receive.
              </p>
              <div className="mt-7 space-y-3">
                {[
                  { label: 'Design', pct: 100, color: 'from-indigo-500 to-indigo-400' },
                  { label: 'Development', pct: 100, color: 'from-purple-500 to-purple-400' },
                  { label: 'Support', pct: 100, color: 'from-teal-500 to-teal-400' },
                ].map(({ label, pct, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 w-24">{label}</span>
                    <div className="flex-1 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${color} rounded-full`}
                        initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <span className="text-xs font-extrabold text-indigo-500">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* ── CARD 2: MOBILE FIRST (tall) ── */}
          <SpotlightCard className="md:col-span-1 lg:col-span-1 lg:row-span-2 rounded-[2rem] p-6 sm:p-8 flex flex-col relative overflow-hidden">
            <div className="relative z-10 flex-1">
              <div className="w-14 h-14 bg-white dark:bg-white/[0.04] rounded-2xl flex items-center justify-center mb-6 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 shadow-sm">
                <Smartphone className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Mobile First</h3>
              <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-5">
                60%+ of traffic is mobile. We design for the smallest screen first, then expand upward.
              </p>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }} whileInView={{ width: '62%' }}
                    viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className="text-xs font-extrabold text-indigo-500">62% Mobile</span>
              </div>
            </div>

            <div className="relative w-[85%] mx-auto mt-6">
              <div className="w-full bg-slate-900 rounded-t-[28px] border-t-[10px] border-x-[10px] border-slate-800 dark:border-slate-700 shadow-2xl shadow-indigo-900/20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-[60px] bg-black rounded-b-2xl z-20" />
                <div className="w-full bg-slate-50 dark:bg-[#020617] pt-7 p-3 space-y-2.5">
                  <div className="flex justify-between items-center px-1 mb-1">
                    <span className="text-[8px] font-bold text-slate-400">9:41</span>
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <motion.div key={i} className="w-1 rounded-sm bg-indigo-400"
                          style={{ height: `${(i + 1) * 2.5}px` }}
                          animate={{ opacity: i < 3 ? 1 : 0.3 }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.3 }}
                        />
                      ))}
                    </div>
                  </div>
                  <motion.div
                    animate={{ y: [12, 0], opacity: [0, 1] }}
                    transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 1 }}
                    className="bg-white dark:bg-slate-800 p-2.5 rounded-2xl shadow-md flex items-center gap-2.5 border border-slate-100 dark:border-white/10"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-600 rounded-full" />
                      <div className="h-1.5 w-10 bg-slate-100 dark:bg-slate-700 rounded-full" />
                    </div>
                    <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center">
                      <ArrowRight className="w-2.5 h-2.5 text-indigo-500" />
                    </div>
                  </motion.div>
                  <div className="h-24 w-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-9 flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-white/10" />
                    <motion.div
                      className="h-9 flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-[9px] font-bold text-white">Get Started</span>
                    </motion.div>
                  </div>
                  <div className="flex justify-around pt-2 pb-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`h-1 rounded-full ${i === 0 ? 'w-8 bg-indigo-500' : 'w-4 bg-slate-200 dark:bg-slate-700'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* ── CARD 3: BUILT TO SCALE ── */}
          <SpotlightCard className="md:col-span-1 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 bg-teal-50 dark:bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-500/20">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400"><Counter to={10} suffix="×" /></div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scale Ready</div>
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Built to Scale</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Architecture designed for growth. Your site handles 10× traffic without rewrites.
              </p>
              <MiniBarChart />
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-2 h-2 rounded-full bg-teal-400" />
                <span className="text-[10px] text-slate-400 font-medium">Traffic growth over 8 months</span>
              </div>
            </div>
          </SpotlightCard>

          {/* ── CARD 3b: FAST DELIVERY ── */}
          <SpotlightCard className="md:col-span-1 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 bg-purple-50 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-500/20">
                  <Clock className="w-7 h-7" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-500/20"
                >
                  97% On-Time
                </motion.div>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Fast Delivery</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">
                Defined milestones, agile sprints, and a track record of shipping on schedule.
              </p>
              <AnimatedClock />
              <div className="mt-3 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-semibold text-slate-400">Always moving forward</span>
              </div>
            </div>
          </SpotlightCard>

          {/* ── CARD 4: VS COMPARISON ── */}
          <SpotlightCard className="md:col-span-2 lg:col-span-2 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-violet-50 dark:bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-500/20 flex-shrink-0">
                  <Layers className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Us vs. The Rest</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">See why clients choose us and stay with us.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-2 px-3">
                <span className="flex-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Feature</span>
                <div className="w-20 text-center">
                  <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Us</span>
                </div>
                <div className="w-20 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Others</span>
                </div>
              </div>
              <div className="space-y-0.5">
                <ComparisonRow label="Fixed-price contracts"       us={true}  them={false} delay={0.1} />
                <ComparisonRow label="6-month post-launch support" us={true}  them={false} delay={0.15} />
                <ComparisonRow label="Mobile-first approach"       us={true}  them={true}  delay={0.2} />
                <ComparisonRow label="Dedicated project manager"   us={true}  them={false} delay={0.25} />
                <ComparisonRow label="WCAG 2.2 compliance"         us={true}  them={false} delay={0.3} />
                <ComparisonRow label="Weekly progress updates"     us={true}  them={false} delay={0.35} />
              </div>
            </div>
          </SpotlightCard>

          {/* ── CARD 5: INTERNATIONAL STANDARDS ── */}
          <SpotlightCard className="md:col-span-2 lg:col-span-1 rounded-[2rem] p-6 sm:p-8">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-5 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">World-Class Standards</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">
                WCAG compliance, performance, and global security standards baked in from the start.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'WCAG 2.2', color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20' },
                  { label: 'ISO 27001', color: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20' },
                  { label: 'GDPR Ready', color: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-500/20' },
                  { label: 'SSL/TLS', color: 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-500/20' },
                  { label: 'SOC 2', color: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20' },
                ].map(({ label, color }) => (
                  <span key={label} className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${color}`}>{label}</span>
                ))}
              </div>
              <motion.div
                className="absolute bottom-4 right-4 w-20 h-20 opacity-[0.04] dark:opacity-[0.07]"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Shield className="w-full h-full text-blue-600" />
              </motion.div>
            </div>
          </SpotlightCard>

          {/* ── POST-LAUNCH SUPPORT (full width) ── */}
          <PostLaunchCard />

        </motion.div>
      </div>
    </section>
  );
}