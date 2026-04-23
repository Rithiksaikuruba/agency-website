import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { 
  Calendar, 
  Video, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Pizza, 
  Wine,
  Rocket,
  Soup, 
  Sandwich, 
  Utensils,
  Check,
  X,
  Zap
} from 'lucide-react';

/* --- GLOBAL STYLES --- */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700;1,800&family=JetBrains+Mono:wght@500&display=swap');
    :root { --font-body: 'Plus Jakarta Sans', sans-serif; --font-mono: 'JetBrains Mono', monospace; }
    *, body { font-family: var(--font-body); }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes grid-fade {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.9; }
    }
    .card-shimmer::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
      animation: shimmer 1.8s ease infinite;
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   STEP 01 · DISCOVERY  — animated icon grid
───────────────────────────────────────────── */
const DiscoveryVisual = ({ isHovered }) => {
  const icons = [Calendar, Video, MessageSquare, Mail];
  const activeIndex = 1;

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Animated background grid */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute w-full border-t border-dashed border-slate-200"
            style={{ top: `${20 * (i + 1)}%` }}
            animate={{ opacity: isHovered ? [0.4, 0.9, 0.4] : 0.4 }}
            transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute h-full border-l border-dashed border-slate-200"
            style={{ left: `${20 * (i + 1)}%` }}
            animate={{ opacity: isHovered ? [0.4, 0.9, 0.4] : 0.4 }}
            transition={{ duration: 2, delay: i * 0.2 + 0.5, repeat: Infinity }}
          />
        ))}
      </motion.div>

      {/* Icon cards */}
      <div className="flex gap-3 relative z-10">
        {icons.map((Icon, i) => {
          const isActive = i === activeIndex;
          const offset = i - activeIndex;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isHovered || isActive ? 1 : 0.45,
                y: isHovered && isActive ? -8 : isHovered ? offset * -2 : 0,
                scale: isHovered && isActive ? 1.15 : isHovered ? 0.95 : 1,
                rotate: isHovered && !isActive ? offset * 3 : 0,
              }}
              transition={{ type: "spring", stiffness: 380, damping: 22, delay: i * 0.04 }}
              className={`
                w-12 h-12 rounded-[18px] flex items-center justify-center border-[1.5px] bg-white relative overflow-hidden cursor-pointer
                ${isActive
                  ? 'border-indigo-500 text-indigo-500 shadow-[0_8px_24px_-6px_rgba(99,102,241,0.35)]'
                  : 'border-slate-200 text-slate-300'
                }
              `}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-indigo-50"
                  animate={{ opacity: isHovered ? [0.3, 0.7, 0.3] : 0.3 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} className="relative z-10" />

              {/* Active glow ring */}
              {isActive && isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-[18px] border-2 border-indigo-400"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Floating label under active */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-mono shadow-lg"
          >
            Video Call Selected
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────
   STEP 02 · DESIGN  — sliding phone + interactive filter
───────────────────────────────────────────── */
const DesignVisual = ({ isHovered }) => {
  const [activeFilter, setActiveFilter] = useState(1);
  const filters = [
    { Icon: Sandwich }, { Icon: Pizza }, { Icon: Utensils },
    { Icon: Soup }, { Icon: Wine }
  ];

  useEffect(() => {
    if (!isHovered) return;
    const id = setInterval(() => setActiveFilter(p => (p + 1) % 5), 700);
    return () => clearInterval(id);
  }, [isHovered]);

  return (
    <div className="w-full h-full flex items-end justify-center overflow-hidden">
      <motion.div
        animate={{ y: isHovered ? 0 : 14 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="w-[220px] bg-white border border-slate-200 border-b-0 rounded-t-[2.5rem] shadow-[0_-12px_40px_-10px_rgba(0,0,0,0.07)] flex flex-col items-center overflow-hidden"
      >
        <div className="mt-3 w-10 h-2.5 bg-slate-100 rounded-full shrink-0" />

        <div className="w-full pt-4 px-5 flex flex-col gap-3 pb-3">
          {/* Location row */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.div
              animate={{ scale: isHovered ? [1, 1.15, 1] : 1 }}
              transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
              className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-400 shrink-0"
            >
              <MapPin size={14} fill="currentColor" fillOpacity={0.2} />
            </motion.div>
            <div className="flex flex-col gap-1.5 w-full">
              <div className="w-16 h-1.5 bg-slate-100 rounded-full" />
              <div className="w-10 h-1.5 bg-slate-100 rounded-full" />
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex justify-between items-center w-full shrink-0">
            {filters.map((item, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: activeFilter === i ? 1.2 : 1,
                  borderColor: activeFilter === i ? '#6366f1' : '#f1f5f9',
                  color: activeFilter === i ? '#6366f1' : '#cbd5e1',
                  boxShadow: activeFilter === i ? '0 4px 12px -2px rgba(99,102,241,0.3)' : 'none',
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-7 h-7 rounded-full flex items-center justify-center border bg-white shrink-0"
              >
                <item.Icon size={12} strokeWidth={activeFilter === i ? 2.2 : 1.5} />
              </motion.div>
            ))}
          </div>

          {/* Cards */}
          <div className="w-full shrink-0">
            <div className="text-[8px] font-bold text-slate-400 mb-2 tracking-wider uppercase">Popular Cuisines</div>
            <div className="flex gap-2 w-full">
              {[0, 1].map(i => (
                <motion.div
                  key={i}
                  animate={{ backgroundColor: isHovered && activeFilter % 2 === i ? '#eef2ff' : '#f8fafc' }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 h-9 border border-slate-100 rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   STEP 03 · DEVELOPMENT  — typewriter code block
───────────────────────────────────────────── */
const codeLines = [
  { tokens: [{ t: 'function ', c: '#94a3b8' }, { t: 'onMouseMove', c: '#6366f1' }, { t: '(event) {', c: '#64748b' }] },
  { tokens: [{ t: '  const ', c: '#1e293b' }, { t: 'x', c: '#f59e0b' }, { t: ' = event.clientX;', c: '#64748b' }] },
  { tokens: [{ t: '  const ', c: '#1e293b' }, { t: 'y', c: '#f59e0b' }, { t: ' = event.clientY;', c: '#64748b' }] },
  { tokens: [{ t: '  cursor.', c: '#94a3b8' }, { t: 'updatePosition', c: '#6366f1' }, { t: '(x, y);', c: '#64748b' }] },
  { tokens: [{ t: '}', c: '#64748b' }] },
];

const DevelopmentVisual = ({ isHovered }) => {
  const [visibleLines, setVisibleLines] = useState(isHovered ? 5 : 2);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (isHovered) {
      setVisibleLines(0);
      let l = 0;
      const id = setInterval(() => {
        l++;
        setVisibleLines(l);
        if (l >= codeLines.length) clearInterval(id);
      }, 220);
      return () => clearInterval(id);
    } else {
      setVisibleLines(2);
    }
  }, [isHovered]);

  useEffect(() => {
    const id = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center px-2">
      <div className="w-full bg-[#0f172a] rounded-2xl border border-slate-700/60 p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)] relative overflow-hidden">
        {/* Scanline */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-indigo-400/20 pointer-events-none"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Traffic lights */}
        <div className="flex gap-1.5 mb-4">
          {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>

        {/* Code */}
        <div className="font-mono text-[10px] leading-[1.9] min-h-[80px]">
          {codeLines.map((line, li) => (
            <AnimatePresence key={li}>
              {li < visibleLines && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  <span className="w-5 text-slate-600 select-none shrink-0">{li + 1}</span>
                  <span>
                    {line.tokens.map((tok, ti) => (
                      <span key={ti} style={{ color: tok.c }}>{tok.t}</span>
                    ))}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
          {/* Cursor */}
          <span
            className="inline-block w-1.5 h-[11px] bg-indigo-400 ml-1 align-middle"
            style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
          />
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   STEP 04 · TESTING  — animated gauge + status pills
───────────────────────────────────────────── */
const tests = [
  { label: 'Performance', pass: true },
  { label: 'Accessibility', pass: true },
  { label: 'Security', pass: false },
];

const TestingVisual = ({ isHovered }) => {
  const [activeTest, setActiveTest] = useState(null);
  const needleRotate = useSpring(isHovered ? 50 : -85, { stiffness: 60, damping: 14 });

  useEffect(() => {
    needleRotate.set(isHovered ? 55 : -85);
  }, [isHovered]);

  useEffect(() => {
    if (!isHovered) { setActiveTest(null); return; }
    let i = 0;
    const id = setInterval(() => {
      setActiveTest(i);
      i++;
      if (i >= tests.length) clearInterval(id);
    }, 500);
    return () => clearInterval(id);
  }, [isHovered]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      {/* Gauge */}
      <div className="relative w-44 h-22 overflow-hidden flex-shrink-0" style={{ height: '88px' }}>
        <svg viewBox="0 0 160 90" className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          <path d="M 10 80 A 70 70 0 0 1 150 80" fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
          <motion.path
            d="M 10 80 A 70 70 0 0 1 150 80"
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="220"
            animate={{ strokeDashoffset: isHovered ? 60 : 220 }}
            transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.1 }}
          />
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          {/* Needle */}
          <motion.line
            x1="80" y1="80" x2="80" y2="18"
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ originX: '80px', originY: '80px', rotate: needleRotate }}
          />
          <circle cx="80" cy="80" r="5" fill="#1e293b" />
        </svg>

        {/* Score label */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[11px] font-black text-slate-700 font-mono"
        >
          98/100
        </motion.div>
      </div>

      {/* Test result pills */}
      <div className="flex gap-2">
        {tests.map((test, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: activeTest !== null && i <= activeTest ? 1 : 0.25,
              scale: activeTest === i ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[9px] font-bold tracking-wide font-mono
              ${test.pass
                ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                : 'bg-red-50 border-red-200 text-red-500'
              }`}
          >
            {test.pass
              ? <Check size={9} strokeWidth={3} />
              : <X size={9} strokeWidth={3} />
            }
            {test.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   STEP 05 · DEPLOYMENT  — rocket with exhaust trail
───────────────────────────────────────────── */
const Particle = ({ isHovered, delay }) => {
  const angle = Math.random() * 60 - 30;
  const distance = 20 + Math.random() * 30;
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          key={delay}
          className="absolute bottom-[38%] left-1/2 w-1 h-1 rounded-full bg-orange-400"
          initial={{ x: '-50%', y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: `calc(-50% + ${Math.sin(angle) * distance}px)`,
            y: distance * 1.5,
            opacity: 0,
            scale: 0.2,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 + Math.random() * 0.4, delay, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  );
};

const DeploymentVisual = ({ isHovered }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!isHovered) return;
    const id = setInterval(() => {
      setParticles(p => [...p.slice(-12), { id: Date.now(), delay: 0 }]);
    }, 120);
    return () => { clearInterval(id); setParticles([]); };
  }, [isHovered]);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Stars */}
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-slate-300 rounded-full"
          style={{
            top: `${10 + Math.sin(i * 1.7) * 35 + 35}%`,
            left: `${5 + (i / 14) * 90}%`,
          }}
          animate={{ opacity: isHovered ? [0.3, 1, 0.3] : 0.3 }}
          transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}

      {/* Exhaust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <React.Fragment key={p.id}>
            {[0, 0.06, 0.12].map((d, i) => (
              <Particle key={i} isHovered={isHovered} delay={d} />
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Exhaust glow */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: [0.6, 0.3, 0.6], scaleX: [0.8, 1.2, 0.8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, repeat: Infinity }}
            className="absolute bg-gradient-to-b from-orange-400 to-transparent rounded-full pointer-events-none"
            style={{ width: 18, height: 40, bottom: '29%', left: '50%', transform: 'translateX(-50%)' }}
          />
        )}
      </AnimatePresence>

      {/* Rocket */}
      <motion.div
        animate={{
          y: isHovered ? -26 : 0,
          scale: isHovered ? 1.08 : 1,
          rotate: isHovered ? [-1, 1, -1] : 0,
        }}
        transition={{
          y: { type: "spring", stiffness: 180, damping: 14 },
          scale: { type: "spring", stiffness: 200, damping: 14 },
          rotate: { duration: 0.4, repeat: isHovered ? Infinity : 0 },
        }}
        className="relative z-10"
      >
        <Rocket size={58} strokeWidth={1.2} className="text-indigo-500" style={{ fill: 'white' }} />
        {/* Glow under rocket */}
        <motion.div
          animate={{ opacity: isHovered ? [0.5, 1, 0.5] : 0, scale: isHovered ? [0.8, 1.2, 0.8] : 0 }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-indigo-400/40 rounded-full blur-sm"
        />
      </motion.div>

      {/* Status badge */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            className="absolute bottom-5 flex items-center gap-1.5 bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full font-mono shadow-lg"
          >
            <Zap size={9} fill="white" />
            Live in Production
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CARD COMPONENT — magnetic tilt + glow border
───────────────────────────────────────────── */
const Card = ({ step, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (rect.height / 2)) * 4,
      y: ((cx - e.clientX) / (rect.width / 2)) * 4,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow border on hover */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-px rounded-[1.5rem] pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa, #6366f1)', padding: 1.5, borderRadius: '1.5rem' }}
      >
        <div className="w-full h-full rounded-[1.4rem] bg-white" />
      </motion.div>

      <div
        className={`relative bg-white border border-slate-200 rounded-[1.5rem] p-7 flex flex-col justify-between h-[380px] transition-shadow duration-300 ${isHovered ? 'shadow-[0_24px_48px_-12px_rgba(99,102,241,0.15)]' : ''}`}
      >
        <div className="text-indigo-500 font-medium text-[11px] tracking-wide mb-2 font-mono">
          • Step — {step.id}
        </div>

        <div className="flex-1 relative flex items-center justify-center">
          {React.cloneElement(step.visual, { isHovered })}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-2 leading-tight">
            {step.title}
          </h3>
          <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   CTA CARD
───────────────────────────────────────────── */
const CTACard = () => (
  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[1.5rem] p-8 flex flex-col justify-center items-start h-[380px] relative overflow-hidden group hover:shadow-[0_24px_48px_-12px_rgba(99,102,241,0.45)] transition-shadow duration-300">
    <motion.div
      className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"
      animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.div
      className="absolute bottom-0 -left-12 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl pointer-events-none"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
    />

    <div className="relative z-10 flex flex-col items-start h-full justify-center w-full">
      <h3 className="text-[38px] font-black text-white uppercase leading-[0.95] tracking-tighter mb-8">
        Let's Transform<br />Your Idea Into<br />Reality
      </h3>
      <button className="w-full bg-[#1e293b] text-white py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-950 transition-all shadow-xl flex justify-center items-center gap-2 group-hover:gap-3 active:scale-[0.98]">
        Book a Free Consultation
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >→</motion.span>
      </button>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const steps = [
  {
    id: "01", title: "Discovery Call",
    description: "First, we learn your vision and requirements to define a clear project strategy.",
    visual: <DiscoveryVisual />
  },
  {
    id: "02", title: "Design",
    description: "We craft intuitive, user-centric interfaces and map out seamless user journeys.",
    visual: <DesignVisual />
  },
  {
    id: "03", title: "Development",
    description: "Our engineers turn your designs into clean, scalable code built for the future.",
    visual: <DevelopmentVisual />
  },
  {
    id: "04", title: "Testing",
    description: "Rigorous testing ensures your app is bug-free, responsive, and secure.",
    visual: <TestingVisual />
  },
  {
    id: "05", title: "Deployment",
    description: "Your product goes live with secure hosting and seamless pipeline integrations.",
    visual: <DeploymentVisual />
  }
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ProcessSection() {
  return (
    <section className="bg-slate-50 min-h-screen py-24 flex items-center justify-center">
      <GlobalStyles />
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6 w-fit mx-auto md:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 font-mono">Our Workflow</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1]">
              How we build <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
                great products.
              </span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-sm text-sm md:text-base leading-relaxed mx-auto md:mx-0">
            A streamlined, transparent five-step process designed to take your idea from concept to a market-ready reality without the friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step) => (
            <Card key={step.id} step={step} />
          ))}
          <CTACard />
        </div>
      </div>
    </section>
  );
}