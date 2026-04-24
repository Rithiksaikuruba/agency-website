import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowUpRight, TrendingUp, Clock, Users, Zap, Globe,
  BarChart3, Star, CheckCircle2, Code2, Bot, Workflow
} from 'lucide-react';

const BOOKING_URL = 'https://cal.com/stryvenix/30min';

/* ── Case Studies Data ── */
const caseStudies = [
  {
    id: '01',
    client: 'NexGen Edutech',
    location: 'Hyderabad, India',
    category: 'Web Design & Development',
    service: 'website-design',
    industry: 'EdTech',
    year: '2025',
    icon: Globe,
    color: '#6366f1',
    gradient: 'from-indigo-500 to-blue-600',
    bgLight: 'bg-indigo-50',
    bgDark: 'bg-indigo-500/10',
    borderLight: 'border-indigo-100',
    borderDark: 'border-indigo-500/20',
    challenge: 'NexGen Edutech had a dated WordPress site with a 68% bounce rate and near-zero organic traffic. Students couldn\'t find their courses on Google, and the mobile experience was unusable.',
    solution: 'Rebuilt the site in React with a mobile-first approach, implemented structured data for course schema, added local SEO for Hyderabad, and redesigned the conversion funnel.',
    results: [
      { metric: '62%', label: 'Bounce rate drop', icon: TrendingUp, color: 'text-emerald-500' },
      { metric: '3.8×', label: 'Organic traffic increase', icon: BarChart3, color: 'text-blue-500' },
      { metric: '2.4s', label: 'Load time (was 8.1s)', icon: Zap, color: 'text-amber-500' },
      { metric: '41%', label: 'More enquiries/month', icon: Users, color: 'text-purple-500' },
    ],
    testimonial: '"They did not just build a website — they rebuilt our entire digital presence. Enquiries went up 41% in the first month post-launch."',
    author: 'Aditi N., HR Head — NexGen Edutech',
    tags: ['React', 'SEO', 'Mobile-First', 'Schema Markup'],
    deliveryTime: '3 weeks',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop',
    imgAlt: 'NexGen Edutech website redesign by Stryvenix — EdTech platform in Hyderabad showing improved mobile-first design and course discovery',
  },
  {
    id: '02',
    client: 'QuickShift Logistics',
    location: 'Delhi, India',
    category: 'AI & Automation',
    service: 'automation',
    industry: 'Logistics',
    year: '2025',
    icon: Bot,
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
    bgDark: 'bg-violet-500/10',
    borderLight: 'border-violet-100',
    borderDark: 'border-violet-500/20',
    challenge: 'QuickShift was handling 200+ daily deliveries with manual order tracking via WhatsApp and Excel. Dispatchers spent 4 hours/day copying data between systems, causing frequent errors and delayed deliveries.',
    solution: 'Built an n8n-powered automation pipeline connecting their booking system, WhatsApp Business API, and Google Sheets. Added a real-time driver tracking dashboard and automated SMS alerts for customers.',
    results: [
      { metric: '14hrs', label: 'Saved per week', icon: Clock, color: 'text-emerald-500' },
      { metric: '98%', label: 'Delivery accuracy', icon: CheckCircle2, color: 'text-blue-500' },
      { metric: '0', label: 'Manual data entry errors', icon: Zap, color: 'text-amber-500' },
      { metric: '23%', label: 'Faster dispatch time', icon: TrendingUp, color: 'text-purple-500' },
    ],
    testimonial: '"The UI they designed for our delivery boys\' app is very straightforward. It took almost zero training time for our staff to start using it."',
    author: 'Vikas T., Operations Manager — QuickShift Logistics',
    tags: ['n8n', 'WhatsApp API', 'Google Sheets', 'Automation'],
    deliveryTime: '4 weeks',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop',
    imgAlt: 'QuickShift Logistics automation dashboard by Stryvenix — real-time delivery tracking and WhatsApp automation for Delhi logistics company',
  },
  {
    id: '03',
    client: 'Urban Eat',
    location: 'Bangalore, India',
    category: 'Web Design & SEO Migration',
    service: 'website-design',
    industry: 'Food & Restaurant',
    year: '2024',
    icon: Code2,
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50',
    bgDark: 'bg-emerald-500/10',
    borderLight: 'border-emerald-100',
    borderDark: 'border-emerald-500/20',
    challenge: 'Urban Eat\'s WordPress site was ranking for several Bangalore food keywords but loading at 9 seconds. They wanted to migrate to React without losing 2 years of SEO equity and ranking positions.',
    solution: 'Performed a full technical SEO audit, mapped all existing URLs, and migrated to a Next.js build preserving all redirects, structured data, and canonical tags. Implemented restaurant schema and local business schema.',
    results: [
      { metric: '0%', label: 'Organic traffic lost in migration', icon: TrendingUp, color: 'text-emerald-500' },
      { metric: '1.9s', label: 'Page load time (was 9s)', icon: Zap, color: 'text-amber-500' },
      { metric: '+18%', label: 'Keyword rankings improvement', icon: BarChart3, color: 'text-blue-500' },
      { metric: '28%', label: 'Bounce rate decrease', icon: Users, color: 'text-purple-500' },
    ],
    testimonial: '"The SEO migration was handled perfectly; we didn\'t lose any of our organic traffic during the switch. Highly capable technical team."',
    author: 'Arun Verma, Digital Marketing — Urban Eat Bangalore',
    tags: ['Next.js', 'SEO Migration', 'Local Schema', 'Core Web Vitals'],
    deliveryTime: '3 weeks',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2667&auto=format&fit=crop',
    imgAlt: 'Urban Eat restaurant website redesign by Stryvenix — SEO migration from WordPress to React with zero traffic loss for Bangalore restaurant',
  },
  {
    id: '04',
    client: 'Menon Exports',
    location: 'Kochi, India',
    category: 'AI Chatbot & Automation',
    service: 'ai-solutions',
    industry: 'B2B Wholesale',
    year: '2024',
    icon: Bot,
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50',
    bgDark: 'bg-amber-500/10',
    borderLight: 'border-amber-100',
    borderDark: 'border-amber-500/20',
    challenge: 'Menon Exports processed wholesale orders via phone calls and WhatsApp, losing leads outside business hours. They needed an online ordering system with a smart chatbot to qualify B2B leads 24/7.',
    solution: 'Built a custom AI chatbot trained on their product catalogue and pricing tiers. Integrated WhatsApp Business API, automated invoice generation via Zoho, and set up SMS order confirmations.',
    results: [
      { metric: '24/7', label: 'Lead capture active', icon: Bot, color: 'text-emerald-500' },
      { metric: '3.2×', label: 'More qualified leads/month', icon: TrendingUp, color: 'text-blue-500' },
      { metric: '60%', label: 'Fewer phone interruptions', icon: Clock, color: 'text-amber-500' },
      { metric: '₹0', label: 'Extra staff cost', icon: Users, color: 'text-purple-500' },
    ],
    testimonial: '"They advised us on the best payment gateway and SMS alerts. Very supportive partners — not just developers."',
    author: 'Anjali Menon, Director — Menon Exports Kochi',
    tags: ['AI Chatbot', 'WhatsApp API', 'Zoho Integration', 'Lead Automation'],
    deliveryTime: '5 weeks',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop',
    imgAlt: 'Menon Exports AI chatbot and automation by Stryvenix — B2B wholesale online ordering system with WhatsApp integration for Kochi exporter',
  },
  {
    id: '05',
    client: 'Fintegrate',
    location: 'Austin, TX — USA',
    category: 'MVP Development',
    service: 'mvp-development',
    industry: 'FinTech',
    year: '2025',
    icon: Code2,
    color: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50',
    bgDark: 'bg-blue-500/10',
    borderLight: 'border-blue-100',
    borderDark: 'border-blue-500/20',
    challenge: 'Fintegrate had a legacy codebase from a previous agency that had accrued significant technical debt. A new billing flow had to be shipped without breaking the existing app for 1,200 active users.',
    solution: 'Methodically refactored the codebase into a clean module structure, rewrote the billing flow with Stripe integration, added comprehensive test coverage, and deployed via a zero-downtime blue-green deployment.',
    results: [
      { metric: '0', label: 'Downtime during migration', icon: CheckCircle2, color: 'text-emerald-500' },
      { metric: '100%', label: 'On-schedule delivery', icon: Clock, color: 'text-blue-500' },
      { metric: '40%', label: 'Codebase size reduction', icon: Code2, color: 'text-amber-500' },
      { metric: '1,200+', label: 'Users migrated seamlessly', icon: Users, color: 'text-purple-500' },
    ],
    testimonial: '"Their communication was what stood out. They methodically refactored our codebase while keeping the app live. Shipped our new billing flow right on schedule."',
    author: 'Marcus D., CTO — Fintegrate Austin TX',
    tags: ['React', 'Stripe', 'Refactoring', 'Zero-Downtime Deploy'],
    deliveryTime: '6 weeks',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    imgAlt: 'Fintegrate FinTech MVP development by Stryvenix — billing flow rebuild and codebase refactoring for Austin Texas startup with zero downtime',
  },
];

/* ── Case Study Card ── */
const CaseStudyCard = ({ study, isActive, onClick }) => {
  const Icon = study.icon;
  return (
    <motion.article
      layout
      onClick={onClick}
      className={`group relative cursor-pointer rounded-[1.5rem] border transition-all duration-300 overflow-hidden ${
        isActive
          ? 'border-indigo-200 dark:border-indigo-500/30 shadow-xl shadow-indigo-500/10'
          : 'border-slate-200 dark:border-white/[0.07] hover:border-slate-300 dark:hover:border-white/[0.12] hover:shadow-lg'
      } bg-white dark:bg-slate-900/70`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      itemScope
      itemType="https://schema.org/CreativeWork"
      aria-label={`${study.client} case study — ${study.category} by Stryvenix`}
    >
      <meta itemProp="name" content={`${study.client} — ${study.category}`} />
      <meta itemProp="description" content={study.challenge} />
      <meta itemProp="creator" content="Stryvenix" />
      <meta itemProp="dateCreated" content={study.year} />

      {/* Image */}
      <div className="relative h-48 overflow-hidden rounded-t-[1.5rem]">
        <img
          src={study.img}
          alt={study.imgAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          width="600"
          height="300"
          itemProp="image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

        {/* Overlays */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${study.gradient} text-white text-[10px] font-bold uppercase tracking-wider shadow-lg`}>
            {study.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold border border-white/10">
            {study.location}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className="text-5xl font-black text-white/10 select-none">{study.id}</span>
          <div>
            <h3 className="text-lg font-extrabold text-white leading-tight" itemProp="name">{study.client}</h3>
            <p className="text-xs text-white/60 font-medium">{study.industry} · {study.year}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {study.tags.map(tag => (
            <span key={tag} className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${study.bgLight} dark:${study.bgDark} ${study.borderLight} dark:${study.borderDark} border`}
              style={{ color: study.color }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Challenge */}
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {study.challenge}
        </p>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {study.results.slice(0, 2).map(({ metric, label, color }) => (
            <div key={label} className="bg-slate-50 dark:bg-white/[0.03] rounded-xl p-3 border border-slate-100 dark:border-white/[0.05]">
              <div className={`text-xl font-extrabold ${color} leading-none`}>{metric}</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            <span>Delivered in {study.deliveryTime}</span>
          </div>
          <div className={`flex items-center gap-1 text-xs font-bold transition-colors ${isActive ? 'text-indigo-500' : 'text-slate-400 group-hover:text-indigo-500'}`}>
            View case study
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* ── Expanded Case Study Detail ── */
const CaseStudyDetail = ({ study, onClose }) => {
  const Icon = study.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-full bg-white dark:bg-slate-900/80 rounded-[2rem] border border-slate-200 dark:border-white/[0.08] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-black/40"
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <meta itemProp="name" content={`${study.client} — ${study.category} by Stryvenix`} />
      <meta itemProp="description" content={`${study.challenge} Solution: ${study.solution}`} />

      {/* Hero image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={study.img}
          alt={study.imgAlt}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width="1200"
          height="400"
          itemProp="image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label="Close case study"
        >
          ×
        </button>

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${study.gradient} text-white text-xs font-bold shadow-lg`}>
                {study.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white text-xs font-medium">
                {study.location}
              </span>
            </div>
            <h3 className="text-3xl font-extrabold text-white" itemProp="name">{study.client}</h3>
            <p className="text-white/60 text-sm mt-1">{study.industry} · {study.year} · Delivered in {study.deliveryTime}</p>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-10">
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Challenge */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">The Challenge</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]" itemProp="abstract">
              {study.challenge}
            </p>
          </div>
          {/* Solution */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">Our Solution</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
              {study.solution}
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="mb-10">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">Results & Impact</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {study.results.map(({ metric, label, icon: ResultIcon, color }) => (
              <div key={label} className="bg-slate-50 dark:bg-white/[0.03] rounded-2xl p-5 border border-slate-100 dark:border-white/[0.05] text-center">
                <ResultIcon className={`w-5 h-5 ${color} mx-auto mb-2`} aria-hidden="true" />
                <div className={`text-3xl font-extrabold ${color} leading-none mb-1`}>{metric}</div>
                <div className="text-xs text-slate-400 font-medium leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-slate-50 dark:bg-white/[0.03] rounded-2xl p-6 border border-slate-100 dark:border-white/[0.05] mb-8"
          itemScope itemType="https://schema.org/Review">
          <meta itemProp="itemReviewed" content="Stryvenix" />
          <div className="flex gap-0.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
            ))}
          </div>
          <blockquote className="text-slate-700 dark:text-slate-200 text-base leading-relaxed italic mb-4" itemProp="reviewBody">
            {study.testimonial}
          </blockquote>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400" itemProp="author">{study.author}</p>
        </div>

        {/* Tags + CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {study.tags.map(tag => (
              <span key={tag} className={`px-3 py-1 rounded-lg text-xs font-bold border`}
                style={{ color: study.color, borderColor: `${study.color}30`, backgroundColor: `${study.color}08` }}>
                {tag}
              </span>
            ))}
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${study.color}, ${study.color}cc)` }}
          >
            Start a Similar Project
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Service Filter ── */
const filters = [
  { label: 'All Work', value: 'all' },
  { label: 'Web Design', value: 'website-design' },
  { label: 'AI & Automation', value: 'automation' },
  { label: 'AI Solutions', value: 'ai-solutions' },
  { label: 'MVP Dev', value: 'mvp-development' },
];

/* ── Main Export ── */
export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeStudy, setActiveStudy] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = activeFilter === 'all'
    ? caseStudies
    : caseStudies.filter(s => s.service === activeFilter || s.category.toLowerCase().includes(activeFilter));

  const toggleStudy = (id) => {
    setActiveStudy(prev => prev === id ? null : id);
    // scroll to detail
    if (activeStudy !== id) {
      setTimeout(() => {
        document.getElementById(`case-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <section
      id="work"
      ref={ref}
      className="relative py-24 md:py-32 bg-slate-50 dark:bg-[#020617] overflow-hidden"
      aria-labelledby="case-studies-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemProp="name" content="Stryvenix Case Studies — Website Design, AI & Automation Projects" />
      <meta itemProp="description" content="Real case studies from Stryvenix: website design, AI chatbots, business automation and MVP development projects for startups in India, US and UK." />
      <meta itemProp="numberOfItems" content={caseStudies.length} />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] shadow-sm mb-6 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
              Real Client Work · Real Results
            </span>
          </motion.div>

          <motion.h2
            id="case-studies-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-5"
          >
            Case Studies &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 italic">
              Proven Results
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl"
          >
            We don't just show pretty screenshots. These are real projects with real metrics — websites, AI systems, and automation builds for startups and businesses across India, the US, and UK.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => { setActiveFilter(value); setActiveStudy(null); }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === value
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((study, i) => (
              <React.Fragment key={study.id}>
                {/* Card */}
                <div
                  itemScope
                  itemType="https://schema.org/ListItem"
                  itemProp="itemListElement"
                >
                  <meta itemProp="position" content={i + 1} />
                  <CaseStudyCard
                    study={study}
                    isActive={activeStudy === study.id}
                    onClick={() => toggleStudy(study.id)}
                  />
                </div>

                {/* Expanded detail — inlined after every 3rd card on desktop */}
                {activeStudy === study.id && (
                  <div id={`case-${study.id}`} className="col-span-full">
                    <AnimatePresence>
                      <CaseStudyDetail
                        key={study.id}
                        study={study}
                        onClose={() => setActiveStudy(null)}
                      />
                    </AnimatePresence>
                  </div>
                )}
              </React.Fragment>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-base">
            Want results like these for your business?
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-base shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
          >
            Book a Free Strategy Call
            <ArrowUpRight className="w-5 h-5" />
          </a>
          <p className="text-xs text-slate-400 mt-3">30 minutes · No commitment · We'll share a custom growth plan</p>
        </motion.div>
      </div>
    </section>
  );
}
