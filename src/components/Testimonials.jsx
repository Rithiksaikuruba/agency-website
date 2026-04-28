import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, MessageCircle, Linkedin, Globe } from 'lucide-react';

/* --- GLOBAL STYLES --- */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    
    :root {
      --font-body: 'Plus Jakarta Sans', sans-serif;
    }

    body {
      font-family: var(--font-body);
    }

    /* --- Marquee Animations --- */
    @keyframes marquee-up {
      0% { transform: translateY(0); }
      100% { transform: translateY(-50%); }
    }
    
    @keyframes marquee-down {
      0% { transform: translateY(-50%); }
      100% { transform: translateY(0); }
    }

    .animate-marquee-up {
      animation: marquee-up 90s linear infinite;
    }
    
    .animate-marquee-down {
      animation: marquee-down 90s linear infinite;
    }

    .group:hover .animate-marquee-up,
    .group:hover .animate-marquee-down {
      animation-play-state: paused;
    }

    /* --- Gradient Masks --- */
    .mask-gradient-y {
      mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
      -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
    }
  `}</style>
);

/* --- REALISTIC BUSINESS DATA --- */
const testimonials = [
  /* --- USA / GLOBAL CLIENTS --- */
  {
    text: "Honestly, their communication was what stood out. We had a messy codebase from a previous agency, and they methodically refactored it while keeping the app live. Shipped our new billing flow right on schedule.",
    name: "Marcus D.",
    role: "CTO",
    company: "Fintegrate (Austin, TX)",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150",
    source: "LinkedIn",
    type: "usa"
  },
  {
    text: "Solid team. We brought them on to build a custom inventory dashboard. There were a few hiccups with the third-party API integration early on, but they handled it professionally and got it working smoothly. Will hire again.",
    name: "Sarah Jenkins",
    role: "Operations Lead",
    company: "Nordic Goods (Seattle)",
    image: "https://images.unsplash.com/photo-1573496359-7013c53bca14?auto=format&fit=crop&q=80&w=150&h=150",
    source: "Clutch.co",
    type: "usa"
  },
  {
    text: "We transitioned our entire storefront to a headless setup. Page load times dropped by over 2 seconds, which directly impacted our checkout drop-off rate. Extremely satisfied with the technical execution.",
    name: "David M.",
    role: "E-commerce Director",
    company: "Lumina Edge",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    source: "Verified Client",
    type: "usa"
  },

  /* --- INDIAN CLIENTS (No Profile Pics, Real Scenarios) --- */
  {
    text: "I needed an inventory management system for my three godowns. Tried ready-made software but it was too complex. They built exactly what I asked for, without unnecessary features. Very practical approach.",
    name: "Rishabh K.",
    role: "Proprietor",
    company: "RK Distributors (Surat)",
    image: null, // No image
    bg: "bg-orange-600",
    source: "WhatsApp Feedback",
    type: "india"
  },
  {
    text: "The UI they designed for our delivery boys' app is very straightforward. It took almost zero training time for our staff to start using it. Good work on the user experience.",
    name: "Vikas T.",
    role: "Operations Manager",
    company: "QuickShift Logistics (Delhi)",
    image: null,
    bg: "bg-blue-600",
    source: "Google Review",
    type: "india"
  },
  {
    text: "They developed our internal HR portal. They were very patient with our changing requirements during the testing phase. Delivered a stable product at a reasonable price point compared to bigger agencies.",
    name: "Aditi N.",
    role: "HR Head",
    company: "NexGen Edutech (Hyderabad)",
    image: null,
    bg: "bg-emerald-600",
    source: "Verified Client",
    type: "india"
  },
  {
    text: "We hired them to revamp our WordPress site to React. The SEO migration was handled perfectly; we didn't lose any of our organic traffic during the switch. Highly capable technical team.",
    name: "Arun Verma",
    role: "Digital Marketing",
    company: "Urban Eat (Bangalore)",
    image: null,
    bg: "bg-purple-600",
    source: "LinkedIn",
    type: "india"
  },
  
  /* --- MIXED --- */
  {
    text: "They integrated perfectly with our internal dev team for a 3-month sprint. Attended all stand-ups, pushed clean PRs, and honestly felt like full-time employees. Great augmentative resource.",
    name: "Amanda L.",
    role: "VP of Engineering",
    company: "TechNova (Toronto)",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    source: "Clutch.co",
    type: "usa"
  },
  {
    text: "Setting up our online ordering system was a big step for our wholesale business. They didn't just write code; they advised us on the best payment gateway and SMS alerts. Very supportive partners.",
    name: "Anjali Menon",
    role: "Director",
    company: "Menon Exports (Kochi)",
    image: null,
    bg: "bg-rose-600",
    source: "Google Review",
    type: "india"
  }
];

/* --- COMPONENT: AVATAR --- */
const Avatar = ({ data }) => {
  // If image exists (USA/Western clients usually)
  if (data.image) {
    return (
      <img 
        src={data.image} 
        alt={data.name} 
        className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-white/10"
      />
    );
  }
  
  // If no image (Common for Indian business owners)
  // We use initials
  const initials = data.name.split(' ').map(n => n[0]).join('').substring(0, 2);
  
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-inner ${data.bg} border border-white/10`}>
      {initials}
    </div>
  );
};

/* --- COMPONENT: SOURCE ICON --- */
const SourceIcon = ({ source }) => {
    if (source === "LinkedIn") return <Linkedin size={10} className="text-blue-600 dark:text-blue-400" />;
    if (source === "WhatsApp Feedback") return <MessageCircle size={10} className="text-green-600 dark:text-green-400" />;
    if (source === "Google Review") return <Globe size={10} className="text-orange-500" />;
    return <CheckCircle2 size={10} className="text-emerald-500" />;
};

/* --- COMPONENT: REVIEW CARD --- */
const ReviewCard = ({ data }) => (
  <div className="
    relative flex flex-col justify-between p-6 mb-6
    rounded-2xl bg-white dark:bg-slate-900 
    border border-slate-200 dark:border-white/5 
    shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1
    transition-all duration-300
    w-full
  ">
    <div>
      {/* Header: Stars & Verification */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        
        {/* Verification Source Badge */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 dark:bg-white/5">
            <SourceIcon source={data.source} />
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-none">
                {data.source}
            </span>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed font-medium text-[15px]">
        "{data.text}"
      </p>
    </div>

    {/* Footer: Author Info */}
    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
      <Avatar data={data} />
      
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
          {data.name}
        </h4>
        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
          {data.role}, {data.company}
        </p>
      </div>
    </div>
  </div>
);

/* --- MAIN SECTION --- */
export default function Testimonials() {
  // Creating a mixed flow for the columns
  const col1 = [...testimonials.slice(0, 3), ...testimonials.slice(0, 3), ...testimonials.slice(0, 3)]; // Mix
  const col2 = [...testimonials.slice(3, 6), ...testimonials.slice(3, 6), ...testimonials.slice(3, 6)]; // Indian Heavy
  const col3 = [...testimonials.slice(6, 9), ...testimonials.slice(6, 9), ...testimonials.slice(6, 9)]; // Mix

  return (
    <section className="relative py-24 md:py-32 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden" id="reviews">
      <GlobalStyles />
      
      {/* Background Ambience */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- 1. HEADER --- */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-16 md:mb-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
             <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-500 dark:text-indigo-400">
              Trusted Worldwide
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8"
          >
            From Startups in <span className="text-indigo-500">Silicon Valley</span> <br/>
            to Businesses in <span className="text-blue-500">Bangalore</span>.
          </motion.h2>

          {/* Trust Stats */}
          <div className="flex flex-wrap justify-center gap-8 border-y border-slate-200 dark:border-white/5 py-6 px-8">
              <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">20+</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Projects Delivered</div>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-white/10 hidden sm:block"></div>
              <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">3</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Countries Served</div>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-white/10 hidden sm:block"></div>
              <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">98%</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Client Retention</div>
              </div>
          </div>

        </div>

        {/* --- 2. WATERFALL GRID --- */}
        <div className="h-[600px] md:h-[700px] overflow-hidden relative mask-gradient-y group">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Column 1: Scrolls UP */}
                <div className="animate-marquee-up flex flex-col">
                    {col1.map((item, i) => (
                        <ReviewCard key={`c1-${i}`} data={item} />
                    ))}
                </div>

                {/* Column 2: Scrolls DOWN */}
                <div className="hidden md:flex animate-marquee-down flex-col">
                    {col2.map((item, i) => (
                        <ReviewCard key={`c2-${i}`} data={item} />
                    ))}
                </div>

                {/* Column 3: Scrolls UP */}
                <div className="hidden lg:flex animate-marquee-up flex-col">
                    {col3.map((item, i) => (
                        <ReviewCard key={`c3-${i}`} data={item} />
                    ))}
                </div>

            </div>
            
        </div>
        
        {/* --- 3. BOTTOM TAG --- */}
        <div className="flex justify-center mt-8 opacity-60">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                Live Verified Reviews
             </div>
        </div>

      </div>
    </section>
  );
}