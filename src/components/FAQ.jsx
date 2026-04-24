import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, MessageCircle, ArrowUpRight, HelpCircle } from 'lucide-react';

const BOOKING_URL = 'https://cal.com/stryvenix/30min';
const SITE_URL = 'https://www.stryvenix.com';

/* ── FAQ Data ── */
const faqs = [
  {
    id: 1,
    category: 'Services',
    question: 'What services does Stryvenix offer?',
    answer: `Stryvenix offers four core services for startups and businesses in India, the US, and UK:

• **Website Design & Development** — Custom high-converting websites built in React and Next.js, from landing pages to full multi-page sites. Starting from ₹41,000 / $499.
• **AI Solutions & Integration** — Custom AI chatbots, lead automation, and AI-powered tools trained on your business data. Starting from $799.
• **Business Process Automation** — End-to-end workflow automation using n8n, Zapier, and Make — saving teams 10–20 hours per week. Starting from $1,299.
• **MVP Development** — Fast-launch MVP builds for early-stage startups — from idea to live product in 3–6 weeks.

We also offer Landing Page Design & CRO, SEO audits, and 6-month post-launch support as part of every package.`,
    link: { text: 'View all pricing', href: '#pricing' },
  },
  {
    id: 2,
    category: 'Timeline',
    question: 'How quickly can Stryvenix build and launch a website?',
    answer: `Most Stryvenix website projects launch within **2–4 weeks** depending on the scope:

• **1-page landing site:** 1–2 weeks
• **5-page business website:** 2–3 weeks  
• **Full multi-page site with SEO:** 3–4 weeks
• **MVP / SaaS product:** 4–6 weeks

We work in agile sprints with live previews at every milestone, so you always know where the project stands. 97% of our projects are delivered on time.`,
    link: { text: 'See our process', href: '#process' },
  },
  {
    id: 3,
    category: 'Pricing',
    question: 'How much does a website from Stryvenix cost?',
    answer: `Stryvenix pricing is transparent and one-time — no monthly fees, no hidden costs:

• **Launch Website:** $499 / ₹41,000 — 1-page scrolling site
• **Small Business:** $999 / ₹83,000 — Up to 5 pages, local SEO, 30-day support
• **Growth Engine:** $1,799 / ₹1,49,000 — Up to 8 pages, advanced SEO, 2 months support

Businesses based in India can request **India pricing parity** for adjusted rates. All packages include a 6-month post-launch support period. Payment is milestone-based: 30% upfront, 40% at design approval, 30% at launch.`,
    link: { text: 'View full pricing', href: '#pricing' },
  },
  {
    id: 4,
    category: 'AI & Automation',
    question: 'What AI automation services does Stryvenix provide?',
    answer: `Stryvenix builds custom AI and automation systems that save businesses 10–20 hours per week:

• **AI Chatbots** — Custom-trained on your product catalogue, FAQs, and pricing. Deployable on website, WhatsApp, and Instagram. Multilingual support available.
• **Workflow Automation** — Connect your CRM, email, invoicing, and messaging tools. We use n8n, Zapier, and Make to build complex automation pipelines.
• **Lead Capture Automation** — Automated lead qualification, CRM sync, and follow-up sequences that run 24/7 without staff involvement.
• **Custom AI Solutions** — Predictive analytics, custom ML models, and data pipelines for data-rich businesses.

Our automation clients save an average of 14 hours per week within the first month of going live.`,
    link: { text: 'Explore AI services', href: '#pricing' },
  },
  {
    id: 5,
    category: 'India',
    question: 'Does Stryvenix work with businesses in India?',
    answer: `Yes — Stryvenix is based in Hyderabad and serves businesses across India including Hyderabad, Bangalore, Delhi, Mumbai, Chennai, Kochi, and Pune. 

We offer **India pricing parity** — adjusted rates that reflect regional economics while maintaining the same quality as our international projects. We work with Indian startups, SMEs, and established businesses across industries including EdTech, Logistics, Food & Restaurant, Manufacturing, and Professional Services.

Past Indian clients include businesses in Hyderabad, Bangalore, Delhi, Surat, and Kochi — see our case studies for real examples and results.`,
    link: { text: 'View Indian case studies', href: '#work' },
  },
  {
    id: 6,
    category: 'SEO',
    question: 'Will my new Stryvenix website rank on Google?',
    answer: `All Stryvenix websites are built with on-page SEO fundamentals included as standard:

• Proper HTML5 heading structure (H1, H2, H3)
• JSON-LD structured data / rich snippets
• Core Web Vitals optimization (target: 90+ score)
• Meta titles, descriptions, and Open Graph tags
• Image alt texts and lazy loading
• XML sitemap and robots.txt
• Google Analytics 4 and Search Console setup

For stronger ranking results, our **Growth Engine** package adds advanced on-page SEO, schema markup, and analytics dashboards. For local businesses, we set up Google Business Profile and local schema markup.

Note: SEO is a long-term process — we lay the technical foundation; ongoing ranking growth requires consistent content and backlinks over time.`,
    link: { text: 'See Growth Engine plan', href: '#pricing' },
  },
  {
    id: 7,
    category: 'Support',
    question: 'What happens after my website launches?',
    answer: `Every Stryvenix project includes post-launch support as standard:

• **7 days** (Launch Website plan)
• **30 days** (Small Business plan)
• **2 months** (Growth Engine plan)
• **6 months** (included with all AI & Automation packages)

During the support period, we handle bug fixes, browser compatibility issues, content updates, and performance monitoring. Our average response time is under 5 minutes during business hours.

After the support period, we offer monthly retainer plans for ongoing maintenance, updates, and continuous improvement.`,
    link: null,
  },
  {
    id: 8,
    category: 'Getting Started',
    question: 'How do I get started with Stryvenix?',
    answer: `Getting started takes 3 simple steps:

1. **Book a free 30-minute discovery call** — We'll understand your business, goals, and which service fits best. No commitment required.

2. **Receive a custom proposal in 48 hours** — A tailored scope, timeline, and fixed-price quote for your project.

3. **Kick off and launch** — We begin with a project brief call, then work in sprints with regular live previews until your site or system goes live.

The entire process from first call to launch typically takes 2–6 weeks depending on scope. We currently have limited client slots available each quarter.`,
    link: { text: 'Book a free call', href: BOOKING_URL, external: true },
  },
];

/* ── Single FAQ Item ── */
const FAQItem = ({ faq, isOpen, onToggle }) => {
  return (
    <motion.div
      layout
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-indigo-200 dark:border-indigo-500/30 bg-white dark:bg-slate-900/60 shadow-lg shadow-indigo-500/5'
          : 'border-slate-200 dark:border-white/[0.07] bg-white/70 dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/[0.12]'
      }`}
      itemScope
      itemType="https://schema.org/Question"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className={`flex-shrink-0 mt-0.5 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
            isOpen
              ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
              : 'bg-slate-100 dark:bg-white/[0.05] text-slate-400 dark:text-slate-500'
          }`}>
            {faq.category}
          </span>
          <h3
            className={`font-bold leading-snug text-[15px] transition-colors ${
              isOpen ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'
            }`}
            itemProp="name"
          >
            {faq.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
            isOpen
              ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
              : 'bg-slate-100 dark:bg-white/[0.05] text-slate-400'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
            itemScope
            itemType="https://schema.org/Answer"
            itemProp="acceptedAnswer"
          >
            <div className="px-6 pb-6 pl-6">
              <div className="pl-0 border-t border-slate-100 dark:border-white/[0.05] pt-5">
                <div
                  className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap space-y-2"
                  itemProp="text"
                  dangerouslySetInnerHTML={{
                    __html: faq.answer
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/^•\s/gm, '<span class="mr-1">•</span>')
                  }}
                />
                {faq.link && (
                  <motion.a
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    href={faq.link.href}
                    target={faq.link.external ? '_blank' : undefined}
                    rel={faq.link.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    {faq.link.text}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Main Export ── */
export default function FAQ() {
  const [openId, setOpenId] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="faq"
      ref={ref}
      className="relative py-24 md:py-32 bg-white dark:bg-[#030812] overflow-hidden"
      aria-labelledby="faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/[0.03] rounded-full blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] shadow-sm mb-6"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-500" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
              Frequently Asked Questions
            </span>
          </motion.div>

          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-5"
          >
            Everything you want to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              know about us
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Answers to the most common questions about our services, pricing, timelines, and how we work with businesses across India, the US, and UK.
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3 mb-16">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <FAQItem
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(prev => prev === faq.id ? null : faq.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-indigo-50 to-purple-50/50 dark:from-indigo-500/[0.06] dark:to-purple-500/[0.04] rounded-[2rem] border border-indigo-100 dark:border-indigo-500/[0.15] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">
                Still have questions?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Book a free 30-minute call — we'll answer everything and give you a custom plan.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 hover:scale-[1.02] transition-all"
            >
              Book a Free Call
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact.stryvenix@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-200 font-bold text-sm hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors"
            >
              Send an Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
