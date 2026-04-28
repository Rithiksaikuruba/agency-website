// // import React, { useRef } from 'react';
// // import { motion, useInView } from 'framer-motion';
// // import {
// //   MapPin, Linkedin, Twitter, Globe, ArrowUpRight,
// //   Code2, Bot, Zap, Star, Award, Users, TrendingUp
// // } from 'lucide-react';

// // const BOOKING_URL = 'https://cal.com/stryvenix/30min';
// // const LINKEDIN_URL = 'https://www.linkedin.com/in/rithiksaikuruba';

// // /* ── Skills / Expertise ── */
// // const expertise = [
// //   { icon: Globe, label: 'Web Design & Development', desc: 'React, Next.js, Tailwind — fast, SEO-ready sites', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-100 dark:border-blue-500/20' },
// //   { icon: Bot, label: 'AI Solutions & Chatbots', desc: 'OpenAI, Anthropic Claude, custom LLM pipelines', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10', border: 'border-purple-100 dark:border-purple-500/20' },
// //   { icon: Zap, label: 'Business Automation', desc: 'n8n, Zapier, Make — workflow automation at scale', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-100 dark:border-amber-500/20' },
// //   { icon: Code2, label: 'MVP Development', desc: 'From idea to live product in 3–6 weeks', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-100 dark:border-emerald-500/20' },
// // ];

// // /* ── Trust Metrics ── */
// // const metrics = [
// //   { value: '20+', label: 'Projects Delivered', icon: TrendingUp },
// //   { value: '3', label: 'Countries Served', icon: Globe },
// //   { value: '98%', label: 'Client Satisfaction', icon: Star },
// //   { value: '6mo', label: 'Post-Launch Support', icon: Award },
// // ];

// // /* ── Timeline ── */
// // const milestones = [
// //   { year: '2022', event: 'Founded Stryvenix in Hyderabad with a focus on conversion-focused website design for Indian startups.' },
// //   { year: '2023', event: 'Expanded into AI automation services. Delivered first AI chatbot and workflow automation projects for clients in Hyderabad and Delhi.' },
// //   { year: '2024', event: 'Started serving US and UK clients. Grew to 15+ successful projects across EdTech, Logistics, FinTech, and Food industries.' },
// //   { year: '2025', event: 'Launched the Stryvenix AI Framework V2 — proprietary automation platform powering client growth dashboards and lead systems.' },
// // ];

// // /* ── Main Export ── */
// // export default function About() {
// //   const ref = useRef(null);
// //   const inView = useInView(ref, { once: true, margin: '-60px' });

// //   return (
// //     <section
// //       id="about"
// //       ref={ref}
// //       className="relative py-24 md:py-32 bg-slate-50 dark:bg-[#020617] overflow-hidden"
// //       aria-labelledby="about-heading"
// //       itemScope
// //       itemType="https://schema.org/AboutPage"
// //     >
// //       {/* Background */}
// //       <div className="absolute inset-0 pointer-events-none overflow-hidden">
// //         <div className="absolute top-[5%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-[100px]" />
// //         <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[80px]" />
// //         <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
// //           style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
// //       </div>

// //       <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

// //         {/* Header */}
// //         <div className="text-center mb-16">
// //           <motion.div
// //             initial={{ opacity: 0, y: 12 }}
// //             animate={inView ? { opacity: 1, y: 0 } : {}}
// //             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] shadow-sm mb-6"
// //           >
// //             <span className="relative flex h-2 w-2">
// //               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
// //               <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
// //             </span>
// //             <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">About Stryvenix</span>
// //           </motion.div>

// //           <motion.h2
// //             id="about-heading"
// //             initial={{ opacity: 0, y: 16 }}
// //             animate={inView ? { opacity: 1, y: 0 } : {}}
// //             transition={{ delay: 0.1 }}
// //             className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-5"
// //           >
// //             Built by founders{' '}
// //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 italic">
// //               for founders
// //             </span>
// //           </motion.h2>

// //           <motion.p
// //             initial={{ opacity: 0, y: 12 }}
// //             animate={inView ? { opacity: 1, y: 0 } : {}}
// //             transition={{ delay: 0.2 }}
// //             className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
// //           >
// //             Stryvenix is a website design, AI, and automation agency based in Hyderabad, India — serving startups and growing businesses across India, the US, and UK since 2022.
// //           </motion.p>
// //         </div>

// //         {/* Main Layout */}
// //         <div className="grid lg:grid-cols-12 gap-8 mb-16">

// //           {/* Founder Card */}
// //           <motion.div
// //             initial={{ opacity: 0, x: -20 }}
// //             animate={inView ? { opacity: 1, x: 0 } : {}}
// //             transition={{ delay: 0.2 }}
// //             className="lg:col-span-4"
// //           >
// //             <div
// //               className="bg-white dark:bg-slate-900/70 rounded-[2rem] border border-slate-200 dark:border-white/[0.07] p-8 h-full"
// //               itemScope
// //               itemType="https://schema.org/Person"
// //             >
// //               {/* Founder Avatar */}
// //               <div className="relative mb-6">
// //                 <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-indigo-500/20">
// //                   RS
// //                 </div>
// //                 <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center">
// //                   <span className="text-white text-xs font-bold">✓</span>
// //                 </div>
// //               </div>

// //               <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1" itemProp="name">
// //                 Rithik Sai Kuruba
// //               </h3>
// //               <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1" itemProp="jobTitle">
// //                 Founder & CEO — Stryvenix
// //               </p>
// //               <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-5" itemProp="address">
// //                 <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
// //                 <span>Hyderabad, Telangana, India</span>
// //               </div>

// //               <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed mb-6" itemProp="description">
// //                 Rithik founded Stryvenix in 2022 with a single goal: help startups and businesses build a serious digital presence without overpaying enterprise agencies. Specialising in React development, AI integration, and growth automation, he has led 20+ projects for clients across India, the US, and UK.
// //               </p>

// //               {/* Expertise tags */}
// //               <div className="flex flex-wrap gap-2 mb-6">
// //                 {['React / Next.js', 'AI Integration', 'n8n Automation', 'Conversion Design', 'Technical SEO'].map(skill => (
// //                   <span key={skill} className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-[11px] font-bold text-slate-500 dark:text-slate-400">
// //                     {skill}
// //                   </span>
// //                 ))}
// //               </div>

// //               {/* Social links */}
// //               <div className="flex gap-2.5 mb-6">
// //                 <a
// //                   href={LINKEDIN_URL}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   aria-label="Rithik Sai Kuruba on LinkedIn"
// //                   className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
// //                   itemProp="sameAs"
// //                 >
// //                   <Linkedin className="w-3.5 h-3.5" />
// //                   LinkedIn
// //                 </a>
// //                 <a
// //                   href="https://twitter.com/stryvenix"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   aria-label="Stryvenix on Twitter"
// //                   className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 text-xs font-bold hover:border-slate-300 transition-colors"
// //                 >
// //                   <Twitter className="w-3.5 h-3.5" />
// //                   Twitter
// //                 </a>
// //               </div>

// //               <a
// //                 href={BOOKING_URL}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:scale-[1.02] transition-transform"
// //               >
// //                 Book a Call with Rithik
// //                 <ArrowUpRight className="w-4 h-4" />
// //               </a>
// //             </div>
// //           </motion.div>

// //           {/* Right Column */}
// //           <div className="lg:col-span-8 flex flex-col gap-6">

// //             {/* Metrics */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 16 }}
// //               animate={inView ? { opacity: 1, y: 0 } : {}}
// //               transition={{ delay: 0.25 }}
// //               className="grid grid-cols-2 md:grid-cols-4 gap-4"
// //             >
// //               {metrics.map(({ value, label, icon: Icon }) => (
// //                 <div key={label} className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-white/[0.07] p-5 text-center">
// //                   <Icon className="w-5 h-5 text-indigo-500 mx-auto mb-2" aria-hidden="true" />
// //                   <div className="text-3xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">{value}</div>
// //                   <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{label}</div>
// //                 </div>
// //               ))}
// //             </motion.div>

// //             {/* Mission Statement */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 16 }}
// //               animate={inView ? { opacity: 1, y: 0 } : {}}
// //               transition={{ delay: 0.3 }}
// //               className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-white/[0.07] p-7"
// //             >
// //               <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-3">Why We Built Stryvenix</h3>
// //               <p className="text-[14.5px] text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
// //                 Too many startups and small businesses in India — and internationally — are paying too much for website agencies that deliver slow, generic sites that don't convert or rank. Meanwhile, AI automation is transforming how businesses operate, but most agencies charge enterprise prices for it.
// //               </p>
// //               <p className="text-[14.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
// //                 Stryvenix exists to close that gap: premium-quality website design, AI integration, and automation at pricing that makes sense for startups and growing businesses — with the transparency, speed, and post-launch support that larger agencies consistently fail to deliver.
// //               </p>
// //             </motion.div>

// //             {/* Expertise Grid */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 16 }}
// //               animate={inView ? { opacity: 1, y: 0 } : {}}
// //               transition={{ delay: 0.35 }}
// //               className="grid sm:grid-cols-2 gap-4"
// //             >
// //               {expertise.map(({ icon: Icon, label, desc, color, bg, border }) => (
// //                 <div key={label} className="flex items-start gap-3 bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-white/[0.07] p-5">
// //                   <div className={`w-10 h-10 rounded-xl ${bg} ${border} border flex items-center justify-center flex-shrink-0`}>
// //                     <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
// //                   </div>
// //                   <div>
// //                     <div className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{label}</div>
// //                     <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </motion.div>
// //           </div>
// //         </div>

// //         {/* Timeline */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={inView ? { opacity: 1, y: 0 } : {}}
// //           transition={{ delay: 0.4 }}
// //           className="bg-white dark:bg-slate-900/70 rounded-[2rem] border border-slate-200 dark:border-white/[0.07] p-8 md:p-10"
// //           itemScope
// //           itemType="https://schema.org/Organization"
// //         >
// //           <meta itemProp="name" content="Stryvenix" />
// //           <meta itemProp="foundingDate" content="2022" />
// //           <meta itemProp="foundingLocation" content="Hyderabad, India" />

// //           <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-8">Our Journey</h3>
// //           <div className="relative">
// //             {/* Timeline line */}
// //             <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-slate-100 dark:bg-white/[0.06] hidden sm:block" aria-hidden="true" />

// //             <div className="space-y-8">
// //               {milestones.map(({ year, event }, i) => (
// //                 <motion.div
// //                   key={year}
// //                   initial={{ opacity: 0, x: -12 }}
// //                   animate={inView ? { opacity: 1, x: 0 } : {}}
// //                   transition={{ delay: 0.45 + i * 0.08 }}
// //                   className="flex flex-col sm:flex-row sm:items-start gap-4"
// //                 >
// //                   <div className="flex items-center gap-4 sm:flex-shrink-0 sm:w-24">
// //                     <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">{year}</span>
// //                     <div className="hidden sm:block w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-100 dark:ring-indigo-500/20 relative z-10 flex-shrink-0" aria-hidden="true" />
// //                   </div>
// //                   <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed sm:pl-4">
// //                     {event}
// //                   </p>
// //                 </motion.div>
// //               ))}
// //             </div>
// //           </div>
// //         </motion.div>

// //         {/* Locations */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 16 }}
// //           animate={inView ? { opacity: 1, y: 0 } : {}}
// //           transition={{ delay: 0.5 }}
// //           className="mt-8 grid sm:grid-cols-3 gap-4"
// //         >
// //           {[
// //             { flag: '🇮🇳', country: 'India', cities: 'Hyderabad · Bangalore · Delhi · Mumbai · Chennai · Kochi · Pune', primary: true },
// //             { flag: '🇺🇸', country: 'United States', cities: 'Austin · New York · San Francisco · Seattle · Remote', primary: false },
// //             { flag: '🇬🇧', country: 'United Kingdom', cities: 'London · Manchester · Edinburgh · Remote', primary: false },
// //           ].map(({ flag, country, cities, primary }) => (
// //             <div
// //               key={country}
// //               className={`rounded-2xl border p-5 text-center ${
// //                 primary
// //                   ? 'bg-indigo-50 dark:bg-indigo-500/[0.07] border-indigo-100 dark:border-indigo-500/20'
// //                   : 'bg-white dark:bg-slate-900/70 border-slate-200 dark:border-white/[0.07]'
// //               }`}
// //               itemScope
// //               itemType="https://schema.org/Place"
// //             >
// //               <div className="text-3xl mb-2" role="img" aria-label={`${country} flag`}>{flag}</div>
// //               <div className="font-extrabold text-slate-900 dark:text-white text-sm mb-1" itemProp="name">{country}</div>
// //               <div className="text-[11px] text-slate-400 leading-relaxed">{cities}</div>
// //               {primary && (
// //                 <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-500/20 px-2 py-0.5 rounded-full">
// //                   HQ · Hyderabad
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // }
// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import {
//   MapPin, Linkedin, Twitter, ArrowUpRight,
//   Globe, Bot, Zap, Star, Award, TrendingUp
// } from 'lucide-react';

// const BOOKING_URL = 'https://cal.com/stryvenix/30min';
// const LINKEDIN_URL = 'https://www.linkedin.com/in/rithiksaikuruba';

// /* ── Core Capabilities (trimmed to 3) ── */
// const capabilities = [
//   {
//     icon: Globe,
//     label: 'Websites That Convert',
//     desc: 'Fast, SEO-ready React/Next.js sites built around one goal: turning visitors into leads.',
//     color: 'text-blue-500',
//     bg: 'bg-blue-50 dark:bg-blue-500/10',
//     border: 'border-blue-100 dark:border-blue-500/20',
//   },
//   {
//     icon: Bot,
//     label: 'AI That Actually Works',
//     desc: 'Custom LLM pipelines and chatbots that automate real workflows — not demos.',
//     color: 'text-purple-500',
//     bg: 'bg-purple-50 dark:bg-purple-500/10',
//     border: 'border-purple-100 dark:border-purple-500/20',
//   },
//   {
//     icon: Zap,
//     label: 'Automation at Scale',
//     desc: 'End-to-end workflow automation using n8n and Make — so your team stops doing manual work.',
//     color: 'text-amber-500',
//     bg: 'bg-amber-50 dark:bg-amber-500/10',
//     border: 'border-amber-100 dark:border-amber-500/20',
//   },
// ];

// /* ── Trust Metrics ── */
// const metrics = [
//   { value: '20+', label: 'Clients Served', icon: TrendingUp },
//   { value: '3', label: 'Countries', icon: Globe },
//   { value: '98%', label: 'Would Refer Us', icon: Star },
//   { value: '6mo', label: 'Support Included', icon: Award },
// ];

// /* ── Timeline ── */
// const milestones = [
//   {
//     year: '2022',
//     event: 'Launched Stryvenix in Hyderabad. First three clients saw measurable ranking and lead improvements within 90 days.',
//   },
//   {
//     year: '2023',
//     event: 'Delivered first production AI chatbot — cutting a client\'s support load by 60%. Automation services went live.',
//   },
//   {
//     year: '2024',
//     event: 'Expanded to US and UK clients. Crossed 15 projects. EdTech client grew organic traffic 3× in six months.',
//   },
//   {
//     year: '2025',
//     event: 'Launched Stryvenix AI Framework V2 — proprietary growth-automation layer now running across five active client accounts.',
//   },
// ];

// /* ── Main Export ── */
// export default function About() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: '-60px' });

//   return (
//     <section
//       id="about"
//       ref={ref}
//       className="relative py-24 md:py-32 bg-slate-50 dark:bg-[#020617] overflow-hidden"
//       aria-labelledby="about-heading"
//       itemScope
//       itemType="https://schema.org/AboutPage"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-[5%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-[100px]" />
//         <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[80px]" />
//         <div
//           className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
//           style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '30px 30px' }}
//         />
//       </div>

//       <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

//         {/* ── Header ── */}
//         <div className="text-center mb-16">
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] shadow-sm mb-6"
//           >
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
//             </span>
//             <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
//               About Stryvenix
//             </span>
//           </motion.div>

//           {/*
//             REWRITTEN HEADLINE
//             Old: "Built by founders for founders"
//             New: Specific, outcome-driven, references the core problem (slow/generic agencies)
//           */}
//           <motion.h2
//             id="about-heading"
//             initial={{ opacity: 0, y: 16 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1 }}
//             className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-5"
//           >
//             We build sites that rank,{' '}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 italic">
//               not just impress
//             </span>
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 12 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.2 }}
//             className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
//           >
//             Stryvenix is a website design, AI, and automation agency based in Hyderabad —
//             serving startups and growing businesses across India, the US, and UK since 2022.
//           </motion.p>
//         </div>

//         {/* ── Main Layout ── */}
//         <div className="grid lg:grid-cols-12 gap-8 mb-16">

//           {/* ── Founder Card ── */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ delay: 0.2 }}
//             className="lg:col-span-4"
//           >
//             <div
//               className="bg-white dark:bg-slate-900/70 rounded-[2rem] border border-slate-200 dark:border-white/[0.07] p-8 h-full flex flex-col"
//               itemScope
//               itemType="https://schema.org/Person"
//             >
//               {/* Avatar */}
//               <div className="relative mb-6">
//                 <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-indigo-500/20">
//                   RS
//                 </div>
//                 <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center">
//                   <span className="text-white text-xs font-bold">✓</span>
//                 </div>
//               </div>

//               <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1" itemProp="name">
//                 Rithik Sai Kuruba
//               </h3>
//               <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1" itemProp="jobTitle">
//                 Founder & CEO — Stryvenix
//               </p>
//               <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-5" itemProp="address">
//                 <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
//                 <span>Hyderabad, India</span>
//               </div>

//               {/*
//                 REWRITTEN BIO
//                 Old: Resume-style, tech-stack heavy, generic
//                 New: POV-driven, problem/solution framing, sounds like a real person
//               */}
//               <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-grow" itemProp="description">
//                 Most agencies sell you a website. Rithik builds you a growth asset. Since founding
//                 Stryvenix in 2022, he has helped 20+ startups stop wasting budget on sites that look
//                 fine but do nothing — and replace them with fast, conversion-focused products backed
//                 by AI and automation. He is hands-on in every project. No account managers, no handoffs.
//               </p>

//               {/* Social */}
//               <div className="flex gap-2.5 mb-6">
//                 <a
//                   href={LINKEDIN_URL}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Rithik Sai Kuruba on LinkedIn"
//                   className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
//                   itemProp="sameAs"
//                 >
//                   <Linkedin className="w-3.5 h-3.5" />
//                   LinkedIn
//                 </a>
//                 <a
//                   href="https://twitter.com/stryvenix"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Stryvenix on Twitter"
//                   className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 text-xs font-bold hover:border-slate-300 transition-colors"
//                 >
//                   <Twitter className="w-3.5 h-3.5" />
//                   Twitter
//                 </a>
//               </div>

//               <a
//                 href={BOOKING_URL}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:scale-[1.02] transition-transform"
//               >
//                 Book a Call with Rithik
//                 <ArrowUpRight className="w-4 h-4" />
//               </a>
//             </div>
//           </motion.div>

//           {/* ── Right Column ── */}
//           <div className="lg:col-span-8 flex flex-col gap-6">

//             {/* ── Metrics ── */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.25 }}
//               className="grid grid-cols-2 md:grid-cols-4 gap-4"
//             >
//               {metrics.map(({ value, label, icon: Icon }) => (
//                 <div
//                   key={label}
//                   className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-white/[0.07] p-5 text-center"
//                 >
//                   <Icon className="w-5 h-5 text-indigo-500 mx-auto mb-2" aria-hidden="true" />
//                   <div className="text-3xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">
//                     {value}
//                   </div>
//                   <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
//                     {label}
//                   </div>
//                 </div>
//               ))}
//             </motion.div>

//             {/*
//               REWRITTEN "WHY WE BUILT" SECTION
//               Old: Generic agency problem/solution framing, watery
//               New: Sharp, opinionated, names the enemy (slow/generic agencies, no ROI)
//             */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.3 }}
//               className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-white/[0.07] p-7"
//             >
//               <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-3">
//                 The agency model is broken. We fixed it.
//               </h3>
//               <p className="text-[14.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
//                 Most agencies hand your project to a junior, charge a senior rate, and deliver
//                 something that looks polished in a Figma preview — but loads in 4 seconds, ranks
//                 nowhere, and converts at 1%. We built Stryvenix as the direct alternative: a small,
//                 senior team that ships fast, writes code that performs, and measures success by your
//                 pipeline — not our portfolio screenshots.
//               </p>
//             </motion.div>

//             {/*
//               CAPABILITIES — Reduced to 3 core items, no stack detail duplication
//             */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.35 }}
//               className="grid sm:grid-cols-3 gap-4"
//             >
//               {capabilities.map(({ icon: Icon, label, desc, color, bg, border }) => (
//                 <div
//                   key={label}
//                   className="flex flex-col gap-3 bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-white/[0.07] p-5"
//                 >
//                   <div
//                     className={`w-10 h-10 rounded-xl ${bg} ${border} border flex items-center justify-center flex-shrink-0`}
//                   >
//                     <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
//                   </div>
//                   <div>
//                     <div className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">
//                       {label}
//                     </div>
//                     <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>

//         {/*
//           REWRITTEN TIMELINE
//           Old: Milestones described actions ("expanded into AI")
//           New: Each milestone leads with the outcome/result
//         */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.4 }}
//           className="bg-white dark:bg-slate-900/70 rounded-[2rem] border border-slate-200 dark:border-white/[0.07] p-8 md:p-10"
//           itemScope
//           itemType="https://schema.org/Organization"
//         >
//           <meta itemProp="name" content="Stryvenix" />
//           <meta itemProp="foundingDate" content="2022" />
//           <meta itemProp="foundingLocation" content="Hyderabad, India" />

//           <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-8">
//             Our Journey
//           </h3>

//           <div className="relative">
//             <div
//               className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-slate-100 dark:bg-white/[0.06] hidden sm:block"
//               aria-hidden="true"
//             />
//             <div className="space-y-8">
//               {milestones.map(({ year, event }, i) => (
//                 <motion.div
//                   key={year}
//                   initial={{ opacity: 0, x: -12 }}
//                   animate={inView ? { opacity: 1, x: 0 } : {}}
//                   transition={{ delay: 0.45 + i * 0.08 }}
//                   className="flex flex-col sm:flex-row sm:items-start gap-4"
//                 >
//                   <div className="flex items-center gap-4 sm:flex-shrink-0 sm:w-24">
//                     <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
//                       {year}
//                     </span>
//                     <div
//                       className="hidden sm:block w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-100 dark:ring-indigo-500/20 relative z-10 flex-shrink-0"
//                       aria-hidden="true"
//                     />
//                   </div>
//                   <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed sm:pl-4">
//                     {event}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* Location cards removed — low conversion value */}

//       </div>
//     </section>
//   );
// }
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin, Linkedin, Twitter, ArrowUpRight,
  Globe, Bot, Zap, Star, Award, TrendingUp,
  CheckCircle2, XCircle,
} from 'lucide-react';

const BOOKING_URL = 'https://cal.com/stryvenix/30min';
const LINKEDIN_URL = 'https://www.linkedin.com/in/rithiksaikuruba';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

/* Trust Metrics — believable labels + micro sub-labels */
const metrics = [
  { value: '20+', label: 'Projects Delivered',    sub: 'Across India, US & UK',         icon: TrendingUp },
  { value: '3',   label: 'Countries',              sub: 'India · US · UK',               icon: Globe      },
  { value: '98%', label: 'Client Satisfaction',   sub: 'Based on project reviews',       icon: Star       },
  { value: '6mo', label: 'Post-Launch Support',   sub: 'Included on every project',      icon: Award      },
];

/* Core Capabilities — outcome-first, 3 only */
const capabilities = [
  {
    icon: Globe,
    label: 'Websites That Convert',
    desc:  'SEO-optimised websites built to rank on Google and generate consistent inbound leads.',
    color: 'text-blue-500',
    bg:    'bg-blue-50 dark:bg-blue-500/10',
    border:'border-blue-100 dark:border-blue-500/20',
  },
  {
    icon: Bot,
    label: 'AI That Actually Works',
    desc:  'Custom AI systems and chatbots that reduce manual work and automate real client workflows.',
    color: 'text-purple-500',
    bg:    'bg-purple-50 dark:bg-purple-500/10',
    border:'border-purple-100 dark:border-purple-500/20',
  },
  {
    icon: Zap,
    label: 'Automation at Scale',
    desc:  'End-to-end automations that save hours per week and keep your pipeline moving without manual effort.',
    color: 'text-amber-500',
    bg:    'bg-amber-50 dark:bg-amber-500/10',
    border:'border-amber-100 dark:border-amber-500/20',
  },
];

/* Agency contrast — scannable comparison */
const comparison = {
  them: [
    'Hand off work to juniors',
    'Optimise for design awards',
    'Slow delivery, vague timelines',
  ],
  us: [
    'Senior team, direct execution',
    'SEO-first, built for performance',
    'Launched in 3–6 weeks, guaranteed',
  ],
};

/* Timeline — every milestone leads with the result */
const milestones = [
  {
    year: '2025',
    event:
      'Founded Stryvenix with a focus on building SEO-first websites that generate consistent inbound leads instead of just looking good.',
  },
  {
    year: '2025 (Mid)',
    event:
      'Delivered initial client projects — improving search visibility, lead flow, and website conversions within the first 60–90 days.',
  },
  {
    year: '2025 (Late)',
    event:
      'Expanded into AI and automation — implementing chatbots and workflow systems to reduce manual work and improve business efficiency.',
  },
  {
    year: '2026',
    event:
      'Scaling Stryvenix into a performance-driven growth partner — combining SEO, AI, and automation into a unified system that turns websites into lead-generation engines.',
  },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function About() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 bg-slate-50 dark:bg-[#020617] overflow-hidden"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      {/* ── Ambient Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[5%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
            backgroundSize:  '30px 30px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

        {/* ══════════════════════════════════════
            HEADER
        ══════════════════════════════════════ */}
        <div className="text-center mb-16">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] shadow-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
              About Stryvenix
            </span>
          </motion.div>

          {/* Pain-point hook line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4"
          >
            Most businesses struggle to get consistent traffic and leads — we fix that.
          </motion.p>

          {/* H2 Headline — specific + outcome-driven */}
          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-5"
          >
            SEO-first websites that{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 italic">
              rank and generate leads
            </span>
          </motion.h2>

          {/* Subheading — value-forward, no-ads angle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            We help businesses turn their website into a consistent lead-generation system
            using SEO, AI, and automation — without relying on paid ads.
          </motion.p>
        </div>

        {/* ══════════════════════════════════════
            MAIN GRID  (Founder | Right column)
        ══════════════════════════════════════ */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">

          {/* ── Founder Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div
              className="bg-white dark:bg-slate-900/70 rounded-[2rem] border border-slate-200 dark:border-white/[0.07] p-8 h-full flex flex-col"
              itemScope
              itemType="https://schema.org/Person"
            >
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-indigo-500/20">
                  RS
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1" itemProp="name">
                Rithik Sai Kuruba
              </h3>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1" itemProp="jobTitle">
                Founder & CEO — Stryvenix
              </p>
              <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-5" itemProp="address">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                <span>Hyderabad, India · Serving India, US & UK</span>
              </div>

              {/* Bio — tight, 3 lines, POV-driven */}
              <p
                className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed mb-3"
                itemProp="description"
              >
                I work with a focused team of designers, developers, and automation specialists
                to build performance-driven websites and growth systems. I stay directly involved
                in every project to ensure quality, speed, and real results.
              </p>

              {/* Trust anchor line */}
              <p className="text-[13px] font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
                No account managers. No handoffs. Direct execution.
              </p>

              {/* Differentiator pill */}
              <div className="inline-flex items-center self-start text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-3 py-1.5 rounded-full mb-6">
                Built for performance — not portfolios.
              </div>

              {/* Social */}
              <div className="flex gap-2.5 mb-6 mt-auto">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rithik Sai Kuruba on LinkedIn"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                  itemProp="sameAs"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/stryvenix"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Stryvenix on Twitter"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 text-xs font-bold hover:border-slate-300 transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  Twitter
                </a>
              </div>

              {/* CTA — "Talk to the Founder" */}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:scale-[1.02] transition-transform"
              >
                Talk to the Founder
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* ── Metrics — with sub-labels for believability ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {metrics.map(({ value, label, sub, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-white/[0.07] p-5 text-center"
                >
                  <Icon className="w-5 h-5 text-indigo-500 mx-auto mb-2" aria-hidden="true" />
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">
                    {value}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    {label}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
                    {sub}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* ── Agency Comparison — scannable contrast block ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-white/[0.07] p-7"
            >
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-5">
                The agency model is broken. We fixed it.
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Most Agencies */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Most Agencies
                  </p>
                  <ul className="space-y-2.5">
                    {comparison.them.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-[13px] text-slate-500 dark:text-slate-400 leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stryvenix */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-500 mb-3">
                    Stryvenix
                  </p>
                  <ul className="space-y-2.5">
                    {comparison.us.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-[13px] text-slate-700 dark:text-slate-200 font-medium leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Closing line */}
              <p className="mt-5 text-[13px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/[0.06] pt-4">
                We measure success by your results — not our portfolio screenshots.
              </p>
            </motion.div>

            {/* ── Core Capabilities — 3 outcome-labelled cards ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="grid sm:grid-cols-3 gap-4"
            >
              {capabilities.map(({ icon: Icon, label, desc, color, bg, border }) => (
                <div
                  key={label}
                  className="flex flex-col gap-3 bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-white/[0.07] p-5"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${bg} ${border} border flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {label}
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* ══════════════════════════════════════
            TIMELINE — outcome-led milestones
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-900/70 rounded-[2rem] border border-slate-200 dark:border-white/[0.07] p-8 md:p-10"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <meta itemProp="name"            content="Stryvenix"         />
          <meta itemProp="foundingDate"    content="2022"              />
          <meta itemProp="foundingLocation"content="Hyderabad, India"  />

          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-8">
            Our Journey
          </h3>

          <div className="relative">
            <div
              className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-slate-100 dark:bg-white/[0.06] hidden sm:block"
              aria-hidden="true"
            />
            <div className="space-y-8">
              {milestones.map(({ year, event }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.45 + i * 0.08 }}
                  className="flex flex-col sm:flex-row sm:items-start gap-4"
                >
                  <div className="flex items-center gap-4 sm:flex-shrink-0 sm:w-24">
                    <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {year}
                    </span>
                    <div
                      className="hidden sm:block w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-100 dark:ring-indigo-500/20 relative z-10 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed sm:pl-4">
                    {event}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Location cards intentionally removed — no conversion value */}

      </div>
    </section>
  );
}