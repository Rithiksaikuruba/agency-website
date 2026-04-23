import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useMotionValueEvent, 
  useSpring, 
  useMotionValue 
} from 'framer-motion';
import { Menu, X, Zap, Sparkles, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

/* --- FIX 2: Safe asset import ---
   Ensure the file on disk is named EXACTLY "Navicon.png" (capital N, capital i).
   Linux (Vercel) is case-sensitive — navicon.png ≠ Navicon.png.
   If you ever rename it, update the import below to match exactly.
*/
import navIcon from '../assets/Navicon.png';

/* --- 1. CONSTANTS --- */
const NAV_LINKS = [
  { label: 'Services',     href: '#services',     desc: 'Our expertise'  },
  { label: 'Process',      href: '#process',      desc: 'How we work'    },
  { label: 'Pricing',      href: '#pricing',      desc: 'Costs'          },
  { label: 'Testimonials', href: '#testimonials', desc: 'Client reviews' }, 
];

const SOCIAL_LINKS = [
  { icon: <Twitter   size={20} aria-hidden="true" />, label: "Twitter",   href: "#" }, 
  { icon: <Instagram size={20} aria-hidden="true" />, label: "Instagram", href: "#" }, 
  { icon: <Linkedin  size={20} aria-hidden="true" />, label: "LinkedIn",  href: "#" },
];

const BOOKING_URL = 'https://cal.com/stryvenix/30min';

/* --- SMOOTH SCROLL UTILITY WITH OFFSET --- */
const handleScroll = (e, href) => {
  if (href.startsWith('#')) {
    e.preventDefault();
    const targetId = href.replace('#', '');

    if (targetId === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const elem = document.getElementById(targetId);
      if (elem) {
        const elementPosition = elem.getBoundingClientRect().top + window.scrollY;
        const offset = 100;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      }
    }
  }
};

/* --- FIX 3: Global CSS — NO @import inside a component <style> tag.
   The Google Fonts link has been REMOVED from here and must live in
   your  public/index.html  <head> instead (see comment at bottom of file).
   
   The shimmer keyframe and utility classes remain here because they are
   component-scoped and have no equivalent in Tailwind's base stylesheet.
*/
const GlobalStyles = () => (
  <style>{`
    :root {
      --font-body: 'Plus Jakarta Sans', sans-serif;
    }

    body {
      font-family: var(--font-body);
      overflow-x: hidden;
      background-color: #f8fafc;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-image:
        linear-gradient(to right,  rgba(15, 23, 42, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    .bg-noise {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: 0; opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    @keyframes shimmer {
      100% { transform: translateX(150%); }
    }

    .focus-ring { outline: none; }
    .focus-ring:focus-visible {
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.5);
      border-radius: 9999px;
    }
  `}</style>
);

/* --- 3. MICRO-COMPONENTS --- */

// A. MAGNETIC WRAPPER
const MagneticWrapper = ({ children, strength = 0.25 }) => {
  const ref = useRef(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(position.x, springConfig);
  const springY = useSpring(position.y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    position.x.set((clientX - (left + width  / 2)) * strength);
    position.y.set((clientY - (top  + height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    position.x.set(0);
    position.y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

// B. DESKTOP NAV
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
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
              <span className="flex items-center h-5 text-blue-600" aria-hidden="true">{link.label}</span>
            </motion.div>
          </div>
        </a>
      ))}
    </nav>
  );
};

// C. MOBILE MENU
const MobileMenu = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.nav
        id="mobile-menu"
        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="fixed inset-0 z-40 bg-slate-50/95 backdrop-blur-2xl md:hidden flex flex-col pt-28 px-6 pb-6"
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          aria-hidden="true"
        />

        <div className="flex flex-col flex-1 z-10 space-y-4 overflow-y-auto no-scrollbar pb-6">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => { handleScroll(e, link.href); onClose(); }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 + 0.1, type: "spring", stiffness: 300, damping: 24 }}
              className="group relative flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm active:scale-[0.98] transition-all"
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
        >
          <a
            href="#contact"
            onClick={(e) => { handleScroll(e, '#contact'); onClose(); }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/30 active:scale-[0.98] transition-transform"
          >
            <Zap size={20} fill="currentColor" aria-hidden="true" />
            Let's Work Together
          </a>

          <div className="grid grid-cols-3 gap-3">
            {SOCIAL_LINKS.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={social.label}
                className="flex items-center justify-center py-4 bg-white rounded-2xl border border-slate-200/60 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    )}
  </AnimatePresence>
);

/* --- 4. MAIN NAVBAR COMPONENT --- */
export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = originalStyle; };
  }, [isOpen]);

  return (
    <>
      <GlobalStyles />
      <div className="bg-noise" aria-hidden="true" />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="fixed top-0 w-full z-50 px-3 md:px-4 pt-4 md:pt-6 flex justify-center pointer-events-none"
      >
        <motion.div
          layout
          style={{ width: isScrolled ? "auto" : "100%", maxWidth: "1150px" }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className={`
            pointer-events-auto group relative transition-all duration-500 flex items-center
            ${isScrolled
              ? 'rounded-full bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl shadow-slate-200/20 px-2 py-2'
              : 'rounded-3xl md:rounded-full bg-white/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border border-white/40 md:border-transparent px-4 py-3 md:px-0 md:py-4'}
          `}
        >
          <div className="relative flex items-center justify-between w-full z-10 px-2 md:px-4 pl-4 md:pl-6">

            {/* LOGO */}
            <div className="focus-ring flex items-center shrink-0 pr-4 md:pr-8 group/logo">
              <a
                href="/"
                onClick={(e) => handleScroll(e, '#')}
                className="cursor-pointer outline-none border-none focus:outline-none"
              >
                <img
                  src={navIcon}
                  alt="Logo"
                  className="h-10 md:h-12 w-auto shrink-0 object-contain outline-none border-none ring-0 transition-transform duration-300 group-hover/logo:scale-105"
                />
              </a>
            </div>

            {/* DESKTOP NAV */}
            <DesktopNav links={NAV_LINKS} />

            {/* CTA BUTTON */}
            <div className="hidden md:flex pl-8">
              <MagneticWrapper strength={0.2}>
                <motion.a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="focus-ring cursor-pointer group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white px-7 py-3 text-sm font-bold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-shadow duration-300 border border-white/20 block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_0.75s_ease-in-out]" aria-hidden="true" />
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

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
              className="focus-ring md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-900 active:scale-90 transition-transform"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={20} aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={20} aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* MOBILE FULLSCREEN MENU */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

/*
  ╔══════════════════════════════════════════════════════════════╗
  ║  REQUIRED: Add this to your  public/index.html  <head>      ║
  ║  (or your framework's equivalent — _document.jsx, etc.)     ║
  ║                                                              ║
  ║  <link rel="preconnect" href="https://fonts.googleapis.com"> ║
  ║  <link rel="preconnect" href="https://fonts.gstatic.com"     ║
  ║        crossorigin>                                          ║
  ║  <link href="https://fonts.googleapis.com/css2?family=       ║
  ║    Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"  ║
  ║    rel="stylesheet">                                         ║
  ╚══════════════════════════════════════════════════════════════╝

  REQUIRED: Install missing packages (run once in your project root)
  ─────────────────────────────────────────────────────────────────
  npm install framer-motion lucide-react
*/