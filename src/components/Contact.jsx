import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, MessageSquare,
  Github, Twitter, Linkedin, CheckCircle2,
  Calendar, Send, ArrowUpRight, Sparkles, Clock
} from 'lucide-react';

import stryvenixLogo from '../assets/Stryvenix-Transparent-Logo1.png';

/* --- GLOBAL STYLES --- */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; }

    :root {
      --font: 'Plus Jakarta Sans', sans-serif;
      --indigo: #6366f1;
      --blue: #3b82f6;
    }

    body { font-family: var(--font); margin: 0; }

    .float-label-wrap { position: relative; }
    .float-label-wrap input,
    .float-label-wrap textarea {
      width: 100%;
      background: transparent;
      border: 1.5px solid rgba(148,163,184,0.25);
      border-radius: 14px;
      padding: 20px 18px 8px;
      font-family: var(--font);
      font-size: 14px;
      font-weight: 500;
      color: #0f172a;
      outline: none;
      transition: border-color 0.25s, box-shadow 0.25s;
      resize: none;
    }
    .float-label-wrap input:focus,
    .float-label-wrap textarea:focus {
      border-color: var(--indigo);
      box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
    }
    .float-label-wrap label {
      position: absolute;
      left: 18px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      font-weight: 500;
      color: #94a3b8;
      pointer-events: none;
      transition: all 0.2s ease;
    }
    .float-label-wrap textarea ~ label { top: 20px; transform: none; }
    .float-label-wrap input:focus ~ label,
    .float-label-wrap input:not(:placeholder-shown) ~ label,
    .float-label-wrap textarea:focus ~ label,
    .float-label-wrap textarea:not(:placeholder-shown) ~ label {
      top: 8px;
      transform: none;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--indigo);
    }

    .dark-input input, .dark-input textarea {
      color: #f1f5f9;
      border-color: rgba(255,255,255,0.08);
    }
    .dark-input input:focus, .dark-input textarea:focus {
      border-color: var(--indigo);
    }

    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    .shimmer-btn {
      background-size: 200% auto;
      animation: shimmer 3s linear infinite;
    }

    @keyframes orbit {
      from { transform: rotate(0deg) translateX(60px) rotate(0deg); }
      to   { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
    }
    .orbit-dot { animation: orbit 8s linear infinite; }

    .ping-ring::before {
      content: '';
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 2px solid rgba(99,102,241,0.3);
      animation: ping-expand 2s ease-out infinite;
    }
    @keyframes ping-expand {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.8); opacity: 0; }
    }
  `}</style>
);

/* --- FLOATING LABEL INPUT --- */
const FloatInput = ({ label, type = 'text', name, value, onChange, dark }) => (
  <div className={`float-label-wrap ${dark ? 'dark-input' : ''}`}>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      autoComplete="off"
    />
    <label>{label}</label>
  </div>
);

/* --- FLOATING LABEL TEXTAREA --- */
const FloatTextarea = ({ label, name, value, onChange, dark }) => (
  <div className={`float-label-wrap ${dark ? 'dark-input' : ''}`}>
    <textarea name={name} value={value} onChange={onChange} rows={4} placeholder=" " />
    <label>{label}</label>
  </div>
);

/* --- GLASS CARD --- */
const GlassCard = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, type: 'spring', stiffness: 55, damping: 14 }}
    className={`relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-[#0a0f1e]/70 backdrop-blur-2xl shadow-2xl ${className}`}
  >
    {children}
  </motion.div>
);

/* --- CONTACT ROW --- */
const ContactRow = ({ icon: Icon, title, value, href, delay, badge }) => (
  <motion.a
    href={href || undefined}
    initial={{ opacity: 0, x: -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className={`flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 group ${href ? 'cursor-pointer' : 'cursor-default'}`}
  >
    <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500 group-hover:border-indigo-500 transition-all duration-300">
      <Icon className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400 group-hover:text-white transition-colors" size={18} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">{title}</p>
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{value}</p>
    </div>
    {badge && (
      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
        {badge}
      </span>
    )}
    {href && <ArrowUpRight size={14} className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0" />}
  </motion.a>
);

/* --- SUCCESS OVERLAY --- */
const SuccessOverlay = ({ onReset }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 dark:bg-[#0a0f1e]/95 backdrop-blur-sm z-20 rounded-[2rem] p-8 text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-5 mx-auto"
    >
      <CheckCircle2 className="w-8 h-8 text-white" />
    </motion.div>
    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
    <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-xs">
      We've received your message and will get back to you within 24 hours.
    </p>
    <button
      onClick={onReset}
      className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-white/15 transition-colors"
    >
      Send another message
    </button>
  </motion.div>
);

/* === MAIN COMPONENT === */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSending(true);
  //   await new Promise(r => setTimeout(r, 1600));
  //   setSending(false);
  //   setSent(true);
  // };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setSending(true);

//   const formData = new FormData();
//   formData.append("name", form.name);
//   formData.append("email", form.email);
//   formData.append("message", form.message);

//   await fetch("https://formsubmit.co/contact.stryvenix@gmail.com", {
//     method: "POST",
//     body: formData
//   });

//   setSending(false);
//   setSent(true);
// };
const handleSubmit = async (e) => {
  e.preventDefault();
  setSending(true);

  try {
    const response = await fetch("https://formsubmit.co/ajax/contact.stryvenix@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
        _captcha: "false",
      }),
    });

    const result = await response.json();

    if (result.success === "true" || result.success === true) {
      setSent(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error("Form error:", err);
    alert("Failed to send. Please check your connection.");
  } finally {
    setSending(false);
  }
};

  const reset = () => { setSent(false); setForm({ name: '', email: '', message: '' }); };

  const socials = [
    { Icon: Github, href: '#', label: 'GitHub' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <section className="relative min-h-screen py-24 md:py-32 bg-slate-50 dark:bg-[#020617] overflow-hidden" id="contact">
      <GlobalStyles />

      {/* Background blobs */}
      <div className="absolute top-[-15%] left-[-5%] w-[700px] h-[700px] bg-indigo-500/[0.06] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* ── HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-500 dark:text-slate-400 font-mono">
              Available for new projects
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.05] mb-6 tracking-tight"
          >
            Let's build
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-500 dark:from-indigo-400 dark:via-violet-400 dark:to-blue-400">
              something great.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed"
          >
            Drop us a message or book a free call — we respond within 24 hours, every time.
          </motion.p>
        </div>

        {/* ── GRID ── */}
        <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">

          {/* LEFT — Info (2/5) */}
          <GlassCard className="lg:col-span-2 p-8 flex flex-col justify-between" delay={0}>

            {/* Orbiting accent */}
            <div className="absolute top-8 right-8 w-10 h-10 opacity-20 pointer-events-none">
              <div className="orbit-dot w-2.5 h-2.5 rounded-full bg-indigo-500" />
            </div>

            <div>
              <div className="flex items-center mb-8">
                {/* Added w-48 md:w-56 to make it much bigger.
                  Added mix-blend-multiply to remove the solid white background via CSS blending! 
                */}
                <img 
                  src={stryvenixLogo} 
                  alt="Stryvenix Logo" 
                  className="w-48 md:w-56 h-auto object-contain mix-blend-multiply dark:mix-blend-normal" 
                />
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">Get In Touch</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-7 leading-relaxed">
                Prefer the direct approach? Reach out through any of the channels below.
              </p>

              <div className="space-y-1">
                <ContactRow delay={0.1} icon={Phone}  title="Phone"    value="+91 9550192069"          href="tel:+919550192069" badge="Direct" />
                <ContactRow delay={0.2} icon={Mail}   title="Email"    value="contact.stryvenix@gmail.com" href="mailto:contact.stryvenix@gmail.com" />
                <ContactRow delay={0.3} icon={MapPin} title="Location" value="Working remotely worldwide" />
                <ContactRow delay={0.4} icon={Clock}  title="Response" value="Within 24 hours" badge="Fast" />
              </div>
            </div>

            {/* Social links */}
            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-white/10">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-4">Follow the journey</p>
              <div className="flex gap-3">
                {socials.map(({ Icon, href, label }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    aria-label={label}
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 hover:border-transparent transition-all duration-300"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* RIGHT — Form (3/5) */}
          <GlassCard className="lg:col-span-3 p-8 md:p-10" delay={0.15}>

            {/* Gradient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-blue-500/[0.04] pointer-events-none rounded-[2rem]" />

            <AnimatePresence mode="wait">
              {sent ? (
                <SuccessOverlay key="success" onReset={reset} />
              ) : null}
            </AnimatePresence>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">Send a Message</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">We'll get back to you within 24 hours.</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/15 flex items-center justify-center">
                  <MessageSquare size={18} className="text-indigo-500" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FloatInput label="Your name" name="name" value={form.name} onChange={handleChange} />
                  <FloatInput label="Email address" type="email" name="email" value={form.email} onChange={handleChange} />
                </div>

                <FloatTextarea label="Tell us about your project..." name="message" value={form.message} onChange={handleChange} />

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Free consultation', '24h response', 'No commitment'].map((pill, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <CheckCircle2 size={10} className="text-emerald-500" />
                      {pill}
                    </span>
                  ))}
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.975 }}
                  className="w-full mt-2 relative overflow-hidden flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-[15px] text-white shadow-xl shadow-indigo-500/25 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #3b82f6 100%)',
                    backgroundSize: '200% auto',
                  }}
                >
                  <AnimatePresence mode="wait">
                    {sending ? (
                      <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </motion.span>
                    ) : (
                      <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Send size={16} />
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-7">
                <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
              </div>

              {/* Book a Call CTA */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
               onClick={() => window.open('https://cal.com/stryvenix/30min', '_blank', 'noopener,noreferrer')}
                className="w-full flex items-center justify-between px-6 py-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                    <Calendar size={16} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Book a Free Call</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">30 min · No commitment</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" />
              </motion.button>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}