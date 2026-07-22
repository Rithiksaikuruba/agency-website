import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Tag } from 'lucide-react';

/* ─── GLOBAL STYLES ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    :root { --font-body: 'Plus Jakarta Sans', sans-serif; }
    body { font-family: var(--font-body); }
    
    .bg-grain {
      background-image: url("https://grainy-gradients.vercel.app/noise.svg");
      opacity: 0.04;
      pointer-events: none;
    }
  `}</style>
);

const BOOKING_URL = 'https://cal.com/stryvenix/30min';

/* ─── ANIMATION VARIANTS ─── */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 120, damping: 20 } 
  },
};

export default function Pricing() {
  return (
    <section
      className="relative py-24 md:py-36 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden font-sans"
      id="pricing"
      aria-labelledby="pricing-heading"
    >
      <GlobalStyles />
      <div className="absolute inset-0 bg-grain z-0" aria-hidden="true" />

      {/* Ambient background glows */}
      <div className="absolute top-[0%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[40%] right-[-10%] w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-10%] left-[20%] w-[560px] h-[560px] bg-blue-400/10 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      {/* Subtle Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300/50 dark:border-white/10 text-slate-700 dark:text-slate-300 font-medium text-sm backdrop-blur-sm">
              <Tag size={16} className="text-indigo-600 dark:text-indigo-400" />
              <span>Investment & Pricing</span>
            </div>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight"
          >
            Simple, Transparent, and <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400">
              Built for Your Growth.
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            We don't force you into rigid tiers. We analyze your requirements and build a strategy that maximizes your return on investment.
          </motion.p>
        </motion.div>

        {/* Main Custom Quote Card */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative overflow-hidden rounded-[2.5rem] p-[1.5px] bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 shadow-2xl shadow-indigo-500/20 group"
          >
            {/* Inner Card */}
            <div className="relative flex flex-col items-center text-center rounded-[calc(2.5rem-1.5px)] bg-white dark:bg-[#080d1a] px-6 py-16 md:px-16 md:py-24 z-10 overflow-hidden">
              
              {/* Inner ambient light to draw focus to center */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent dark:from-indigo-900/15 dark:via-transparent dark:to-transparent pointer-events-none" />

              <motion.div 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative z-10 flex flex-col items-center w-full"
              >
                {/* Modern Pill Badge */}
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-8 shadow-sm"
                >
                  <Sparkles size={16} className="text-indigo-500 dark:text-indigo-400" />
                  <span>Tailored Solutions</span>
                </motion.div>

                {/* Card Heading */}
                <motion.h3 
                  variants={itemVariants}
                  className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.15] mb-6 tracking-tight max-w-3xl"
                >
                  Because every business is <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 relative">
                    fundamentally different.
                    {/* Decorative underline */}
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-purple-500/30 dark:text-purple-400/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="transparent" />
                    </svg>
                  </span>
                </motion.h3>

                {/* Description */}
                <motion.p 
                  variants={itemVariants}
                  className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
                >
                  Skip the one-size-fits-all packages. Let's discuss your goals, timeline, and features to create a custom proposal that works exactly for what you need.
                </motion.p>

                {/* CTA Button */}
                <motion.div variants={itemVariants} className="w-full sm:w-auto mb-16">
                  <button
                    onClick={() => window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')}
                    className="group relative w-full sm:w-auto px-10 py-5 rounded-2xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center gap-3 overflow-hidden shadow-xl shadow-indigo-600/30 transition-all hover:shadow-indigo-600/40 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
                  >
                    {/* Button hover gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <span className="relative flex items-center gap-3">
                      <Zap size={22} className="fill-white/20" />
                      Get Your Free Quote
                      <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </button>
                </motion.div>

                {/* Trust Indicators (Redesigned as Glass Pills) */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap justify-center gap-4 w-full pt-10 border-t border-slate-200/60 dark:border-white/10"
                >
                  {[
                    "No hidden fees",
                    "Detailed project roadmap",
                    "Clear deliverables"
                  ].map((text, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 transition-all hover:-translate-y-0.5 text-slate-700 dark:text-slate-300 font-medium text-sm md:text-base cursor-default"
                    >
                      <ShieldCheck size={20} className="text-emerald-500" />
                      <span>{text}</span>
                    </div>
                  ))}
                </motion.div>

              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}