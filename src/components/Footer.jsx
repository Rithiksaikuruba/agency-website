import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Twitter, Github, Linkedin, Instagram, Check, MapPin, Mail, Phone } from 'lucide-react';
import logo from '../assets/Stryvenix-Transparent-Logo.png';

const BOOKING_URL = 'https://cal.com/stryvenix/30min';

const scrollToSection = (e, id) => {
  e.preventDefault();
  const elem = document.getElementById(id);
  if (elem) {
    const offset = 100;
    const top = elem.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

/* ─── NAP SCHEMA ── */
const NAPSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.stryvenix.com/#organization",
      "name": "Stryvenix",
      "url": "https://www.stryvenix.com/",
      "logo": "https://www.stryvenix.com/src/assets/Navicon.png",
      "image": "https://www.stryvenix.com/og-image.png",
      "description": "Stryvenix is a creative tech agency specializing in website design, AI solutions, and business automation for clients in the US, UK, and India.",
      "telephone": "+91-98765-43210",
      "email": "hello@stryvenix.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "17.3850",
        "longitude": "78.4867"
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" }
      ],
      "priceRange": "$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "founder": {
        "@type": "Person",
        "@id": "https://www.stryvenix.com/#founder",
        "name": "Rithik Sai Kuruba",
        "jobTitle": "Founder & CEO",
        "sameAs": ["https://www.linkedin.com/in/rithiksaikuruba"]
      },
      "sameAs": [
        "https://twitter.com/stryvenix",
        "https://www.linkedin.com/company/stryvenix",
        "https://www.instagram.com/stryvenix"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Stryvenix Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Design & Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Solutions" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Automation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Audit" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Maintenance" } }
        ]
      }
    })}}
  />
);

/* ─── GLOBAL STYLES ── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700&display=swap');
    :root { --font: 'Plus Jakarta Sans', sans-serif; }
    *, body { font-family: var(--font); }

    .footer-grain {
      background-image: url("https://grainy-gradients.vercel.app/noise.svg");
      opacity: 0.025;
      pointer-events: none;
    }
    .footer-dot-grid {
      background-image: radial-gradient(circle, rgba(99,102,241,0.14) 1px, transparent 1px);
      background-size: 28px 28px;
    }
    @keyframes footer-ticker {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .footer-ticker { animation: footer-ticker 30s linear infinite; }
    .footer-ticker:hover { animation-play-state: paused; }

    .social-btn { transition: box-shadow 0.3s ease, transform 0.2s ease, background 0.2s ease; }
    .social-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -6px rgba(99,102,241,0.4); }
    
    .footer-link-arrow { transition: opacity 0.2s, transform 0.2s; opacity: 0; transform: translateX(-4px); }
    .footer-link:hover .footer-link-arrow { opacity: 1; transform: translateX(0); }
    .footer-link:hover { color: #6366f1; }
  `}</style>
);

/* ─── TICKER ── */
const tickerItems = [
  '✦ Based in Hyderabad', '✦ Available Worldwide', '✦ 20+ Projects Delivered',
  '✦ 6-Month Support', '✦ Zero Hidden Fees', '✦ On-Time Every Time',
  '✦ Based in Hyderabad', '✦ Available Worldwide', '✦ 20+ Projects Delivered',
  '✦ 6-Month Support', '✦ Zero Hidden Fees', '✦ On-Time Every Time',
];

/* ─── NEWSLETTER INPUT ── */
const NewsletterInput = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setEmail('');
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="your@email.com"
          className="w-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-indigo-400 dark:focus:border-indigo-500 transition-colors pr-12"
        />
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="absolute right-1.5 top-1.5 w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 transition-all"
        >
          <AnimatePresence mode="wait">
            {sent
              ? <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={13} /></motion.div>
              : <motion.div key="arrow" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><ArrowRight size={13} /></motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </div>
      <AnimatePresence>
        {sent && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1.5"
          >
            <Check size={11} /> You're in! Welcome to the list.
          </motion.p>
        )}
      </AnimatePresence>
      <p className="text-[11px] text-slate-400 dark:text-slate-500">
        Join 5,000+ founders. No spam, unsubscribe anytime.
      </p>
    </div>
  );
};

/* ─── SOCIAL BUTTON ── */
const SocialBtn = ({ icon: Icon, href, label }) => (
  <a href={href} aria-label={label}
    className="social-btn w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 dark:hover:bg-indigo-500 dark:hover:border-indigo-500 dark:hover:text-white"
  >
    <Icon size={15} />
  </a>
);

/* ─── LINK GROUP ── */
const LinkGroup = ({ title, links }) => (
  <div>
    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-900 dark:text-white mb-5">{title}</p>
    <ul className="space-y-3.5">
      {links.map(({ label, href }) => (
        <li key={label}>
          <a href={href}
            className="footer-link flex items-center gap-1.5 text-[13px] font-medium text-slate-500 dark:text-slate-400 transition-colors"
          >
            <ArrowRight size={11} className="footer-link-arrow text-indigo-500 flex-shrink-0" />
            {label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

/* ─── STAT CHIP ── */
const StatChip = ({ value, label }) => (
  <div className="flex flex-col items-center px-5 py-3 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] rounded-2xl">
    <span className="text-xl font-extrabold text-slate-900 dark:text-white leading-none">{value}</span>
    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">{label}</span>
  </div>
);

/* ─── FOOTER ── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 dark:bg-[#020617] border-t border-slate-200 dark:border-white/[0.05] overflow-hidden transition-colors duration-500">
      <GlobalStyles />
      <NAPSchema />

      {/* Backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 footer-grain z-10" />
        <div className="absolute inset-0 footer-dot-grid opacity-50 dark:opacity-30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-500/[0.06] rounded-full blur-[120px]" />
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[100px]" />
      </div>

      {/* ── CTA BANNER ── */}
      <div className="relative z-10 border-b border-slate-200 dark:border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-500 mb-3">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse inline-block" />
                Currently taking on new projects
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                Ready to build something<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-400 italic">
                  extraordinary?
                </span>
              </h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 flex-shrink-0"
          >
            {/* Book a Free Call — opens cal.com in new tab */}
            <motion.a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
            >
              Book a Free Call
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </motion.a>

            {/* View Our Work — smooth scrolls to #services */}
            <motion.a
              href="#services"
              onClick={(e) => scrollToSection(e, 'services')}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 text-sm font-bold hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              View Our Work
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ── TICKER ── */}
      <div className="relative z-10 overflow-hidden border-b border-slate-200 dark:border-white/[0.05] py-3">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#020617] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#020617] to-transparent z-10 pointer-events-none" />
        <div className="flex whitespace-nowrap footer-ticker">
          {tickerItems.map((item, i) => (
            <span key={i} className="inline-block px-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-14">

          {/* Brand col */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2.5 mb-2">
              <img
                src={logo}
                alt="Stryvenix — Website Design, AI & Automation Agency"
                className="w-48 sm:w-56 h-auto object-contain"
              />
            </div>

            <p className="text-[13.5px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Premium digital experiences for ambitious brands. We turn visitors into loyal customers through strategic design and engineering.
            </p>

            {/* Stats row */}
            <div className="flex gap-2">
              <StatChip value="20+" label="Projects" />
              <StatChip value="98%" label="Satisfied" />
              <StatChip value="6mo" label="Support" />
            </div>

            {/* Socials */}
            <div className="flex gap-2.5">
              <SocialBtn icon={Twitter}   href="https://twitter.com/stryvenix"                    label="Stryvenix on Twitter" />
              <SocialBtn icon={Github}    href="#"                                                 label="Stryvenix on GitHub" />
              <SocialBtn icon={Linkedin}  href="https://www.linkedin.com/company/stryvenix"       label="Stryvenix on LinkedIn" />
              <SocialBtn icon={Instagram} href="https://www.instagram.com/stryvenix"              label="Stryvenix on Instagram" />
            </div>
          </div>

          {/* Company links */}
          <div className="lg:col-span-2">
            <LinkGroup title="Company" links={[
              { label: 'About Us',  href: '/about' },
              { label: 'Our Work',  href: '/work' },
              { label: 'Process',   href: '/#process' },
              { label: 'Pricing',   href: '/pricing' },
              { label: 'Careers',   href: '/careers' },
            ]} />
          </div>

          {/* Services links */}
          <div className="lg:col-span-2">
            <LinkGroup title="Services" links={[
              { label: 'Web Design & Development', href: '/services/web-design' },
              { label: 'AI Solutions',             href: '/services/ai' },
              { label: 'Automation',               href: '/services/automation' },
              { label: 'SEO Audit',                href: '/services/seo-audit' },
              { label: 'Maintenance',              href: '/services/maintenance' },
            ]} />
          </div>

          {/* Newsletter + Contact */}
          <div className="lg:col-span-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-900 dark:text-white mb-5">Stay Updated</p>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
              Weekly design insights, project breakdowns and agency tips — straight to your inbox.
            </p>
            <NewsletterInput />

            {/* NAP */}
            <address className="mt-7 space-y-2.5 not-italic">
              {[
                { icon: Mail,   text: 'contact.stryvenix@gmail.com', href: 'mailto:contact.stryvenix@gmail.com' },
                { icon: Phone,  text: '+91 9550192069',               href: 'tel:+919550192069' },
                { icon: MapPin, text: 'Hyderabad, India',              href: null },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-2.5 text-[12.5px] text-slate-500 dark:text-slate-400">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={12} className="text-indigo-500" />
                  </div>
                  {href
                    ? <a href={href} className="hover:text-indigo-500 transition-colors">{text}</a>
                    : <span>{text}</span>
                  }
                </div>
              ))}
            </address>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12.5px] text-slate-400 dark:text-slate-500">
            © {year} Stryvenix. Crafted with care in Hyderabad 🇮🇳
          </p>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11.5px] font-semibold text-slate-400 dark:text-slate-500">All systems operational</span>
          </div>

          <div className="flex gap-6">
            {[
              { label: 'Privacy Policy',   href: '/privacy-policy' },
              { label: 'Terms of Service', href: '/terms-of-service' },
              { label: 'Cookie Policy',    href: '/cookie-policy' },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                className="text-[12.5px] text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}