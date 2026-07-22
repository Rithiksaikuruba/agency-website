import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { Menu, X, Zap, Sparkles, Instagram, ArrowRight, ArrowUpRight } from 'lucide-react';

/* ─── ASSET ───────────────────────────────────────────────────────────────── */
import navIcon from '../assets/Navicon.png';

/* ─── CONSTANTS ───────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Work',     href: '/#work',        desc: 'Case studies'   },
  { label: 'Services', href: '/services',     desc: 'What we offer'  },
  { label: 'Process',  href: '/#process',     desc: 'How we work'    },
  { label: 'Pricing',  href: '/#pricing',     desc: 'Custom quotes'  },
  { label: 'About',    href: '/#about',       desc: 'Our story'      },
  { label: 'Careers',  href: '/careers',      desc: 'Join the team'  },
  { label: 'FAQ',      href: '/#faq',         desc: 'Common questions'},
];

const BOOKING_URL = 'https://cal.com/stryvenix/30min';

/* ─── SMOOTH SCROLL ───────────────────────────────────────────────────────── */
const handleScroll = (e, href) => {
  // Handles absolute hash links like '/#work'
  if (href.startsWith('/#')) {
    const isHome = window.location.pathname === '/';
    if (isHome) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        const top = elem.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
    // If not on home, let standard navigation route the user to the homepage hash
    return;
  }

  // Handle purely local hash links (fallback)
  if (href.startsWith('#')) {
    e.preventDefault();
    const targetId = href.replace('#', '');
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(targetId);
    if (elem) {
      const top = elem.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
};

/* ─── GLOBAL STYLES (defined ONCE outside the component tree) ───────────── */
const GLOBAL_CSS = `
  :root { --font-body: 'Plus Jakarta Sans', sans-serif; }

  body {
    font-family: var(--font-body);
    overflow-x: hidden;
    background-color: #f8fafc;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-image:
      linear-gradient(to right,  rgba(15,23,42,.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(15,23,42,.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .navbar-root { will-change: transform; }

  .bg-noise {
    position: fixed; top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none; z-index: 0; opacity: .03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  @keyframes shimmer { 100% { transform: translateX(150%); } }

  .focus-ring { outline: none; }
  .focus-ring:focus-visible {
    box-shadow: 0 0 0 3px rgba(37,99,235,.5);
    border-radius: 9999px;
  }

  .navbar-pill {
    transition:
      width          0.45s cubic-bezier(0.34,1.56,0.64,1),
      border-radius  0.45s cubic-bezier(0.34,1.56,0.64,1),
      background     0.3s  ease,
      box-shadow     0.3s  ease,
      border-color   0.3s  ease,
      padding        0.3s  ease;
  }
`;

if (typeof document !== 'undefined') {
  const tag = document.getElementById('navbar-styles');
  if (!tag) {
    const s = document.createElement('style');
    s.id = 'navbar-styles';
    s.textContent = GLOBAL_CSS;
    document.head.appendChild(s);
  }
}

/* ─── MAGNETIC WRAPPER ──────────────────────────────────────────────────── */
const MagneticWrapper = ({ children, strength = 0.25 }) => {
  const ref    = useRef(null);
  const rafId  = useRef(null);
  const mx     = useMotionValue(0);
  const my     = useMotionValue(0);
  const sx     = useSpring(mx, { damping: 20, stiffness: 200, mass: 0.5 });
  const sy     = useSpring(my, { damping: 20, stiffness: 200, mass: 0.5 });

  const handleMouseMove = useCallback((e) => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      mx.set((e.clientX - (left + width  / 2)) * strength);
      my.set((e.clientY - (top  + height / 2)) * strength);
    });
  }, [mx, my, strength]);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = null; }
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

/* ─── DESKTOP NAV ─────────────────────────────────────────────────────────── */
const DesktopNav = ({ links }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <nav
      className="hidden md:flex items-center bg-slate-100/50 backdrop-blur-sm rounded-full px-1.5 py-1.5 border border-slate-200/50"
      onMouseLeave={() => setHoveredIndex(null)}
      aria-label="Desktop Main Navigation"
    >
      {links.map((link, index) => (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => handleScroll(e, link.href)}
          onMouseEnter={() => setHoveredIndex(index)}
          onFocus={() => setHoveredIndex(index)}
          className="focus-ring relative px-5 py-2 text-sm font-bold text-slate-600 transition-colors delay-100 hover:text-slate-900 focus:text-slate-900 rounded-full"
        >
          {hoveredIndex === index && (
            <motion.div
              layoutId="nav-pill"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-200/60"
              style={{ zIndex: 0 }}
            />
          )}
          <div className="relative z-10 overflow-hidden h-5 flex flex-col justify-start">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: hoveredIndex === index ? -20 : 0 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            >
              <span className="flex items-center h-5">{link.label}</span>
              <span className="flex items-center h-5 text-blue-600" aria-hidden="true">
                {link.label}
              </span>
            </motion.div>
          </div>
        </a>
      ))}
    </nav>
  );
};

/* ─── MOBILE MENU ─────────────────────────────────────────────────────────── */
const MobileMenu = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.nav
        id="mobile-menu"
        initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
        animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
        exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="fixed inset-0 z-40 bg-slate-50/95 backdrop-blur-2xl md:hidden flex flex-col pt-28 px-6 pb-6"
        style={{ willChange: 'clip-path, opacity' }}
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#000 1px,transparent 1px)', backgroundSize: '24px 24px' }}
          aria-hidden="true"
        />

        <div className="flex flex-col flex-1 z-10 space-y-4 overflow-y-auto no-scrollbar pb-6">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => { handleScroll(e, link.href); onClose(); }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0,  opacity: 1 }}
              transition={{ delay: i * 0.05 + 0.1, type: 'spring', stiffness: 300, damping: 24 }}
              className="group relative flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm active:scale-[0.98] transition-all"
              style={{ willChange: 'transform, opacity' }}
            >
              <div>
                <span className="block text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {link.label}
                </span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1 block">
                  {link.desc}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-300">
                <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform" aria-hidden="true" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-auto z-10 pt-4 space-y-4"
          style={{ willChange: 'transform, opacity' }}
        >
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/30 active:scale-[0.98] transition-transform"
          >
            <Zap size={20} fill="currentColor" aria-hidden="true" />
            Let's Work Together
          </a>

          {/* Upgraded Instagram Button */}
          <a
            href="https://www.instagram.com/stryvenix/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-4 bg-white rounded-2xl border border-slate-200/60 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all w-full group active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold">@stryvenix on Instagram</span>
            </div>
            <ArrowUpRight size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </motion.nav>
    )}
  </AnimatePresence>
);

/* ─── MAIN NAVBAR ─────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [isOpen,     setIsOpen]     = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const crossed = latest > 20;
    setIsScrolled((prev) => (prev !== crossed ? crossed : prev));
  });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  return (
    <>
      <div className="bg-noise" aria-hidden="true" />

      <motion.header
        className="navbar-root fixed top-0 w-full z-50 px-3 md:px-4 pt-4 md:pt-6 flex justify-center pointer-events-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
      >
        <div
          className={`
            navbar-pill
            pointer-events-auto relative flex items-center mx-auto
            ${isScrolled
              ? 'w-auto max-w-none rounded-full bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl shadow-slate-200/20 px-2 py-2'
              : 'w-full max-w-[1150px] rounded-3xl md:rounded-full bg-white/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border border-white/40 md:border-transparent px-4 py-3 md:px-0 md:py-4'
            }
          `}
        >
          <div className="relative flex items-center justify-between w-full z-10 px-2 md:px-4 pl-4 md:pl-6">
            <div className="focus-ring flex items-center shrink-0 pr-4 md:pr-8 group/logo">
              <a
                href="/"
                className="cursor-pointer outline-none border-none focus:outline-none"
              >
                <img
                  src={navIcon}
                  alt="Logo"
                  className="h-10 md:h-12 w-auto shrink-0 object-contain outline-none border-none ring-0 transition-transform duration-300 group-hover/logo:scale-105"
                />
              </a>
            </div>

            <DesktopNav links={NAV_LINKS} />

            <div className="hidden md:flex pl-8">
              <MagneticWrapper strength={0.2}>
                <motion.a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="focus-ring cursor-pointer group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white px-7 py-3 text-sm font-bold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-shadow duration-300 border border-white/20 block"
                  style={{ willChange: 'transform' }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_0.75s_ease-in-out]"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center gap-2 tracking-wide">
                    Let's Talk
                    <motion.span
                      animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                    >
                      <Sparkles size={16} className="text-blue-100" aria-hidden="true" />
                    </motion.span>
                  </span>
                </motion.a>
              </MagneticWrapper>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
              className="focus-ring md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-900 active:scale-90 transition-transform"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <X size={20} aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0,  opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <Menu size={20} aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}