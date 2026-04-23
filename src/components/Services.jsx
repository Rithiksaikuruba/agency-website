import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useVelocity, 
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/* --- GLOBAL STYLES --- */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    
    :root {
      --font-body: 'Plus Jakarta Sans', sans-serif;
    }

    body {
      font-family: var(--font-body);
      background-color: #f8fafc; 
      color: #0f172a;
      overflow-x: hidden;
      scroll-behavior: smooth; 
    }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

const projectsData = [
  {
    title: "Nobu Restaurant",
    category: "Luxury Restaurant",
    serviceType: "Website Design & Development",
    description: "Nobu is an iconic upscale Japanese-Peruvian restaurant chain with flagship locations across the US. Their website features cinematic food photography, elegant dark aesthetics, and seamless reservation flows.",
    alt: "Nobu luxury restaurant website — dark cinematic food photography with elegant reservation UI",
    year: "2025",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop",
    url: "https://www.noburestaurants.com",
    id: "01"
  },
  {
    title: "Drybar",
    category: "Beauty & Salon",
    serviceType: "Business Website Development",
    description: "Drybar is a beloved US blowout salon chain with 150+ locations. Their site nails warm brand storytelling, location-based booking, and a bright, lifestyle-driven visual identity.",
    alt: "Drybar beauty salon website — warm lifestyle photography with location-based booking system",
    year: "2025",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2667&auto=format&fit=crop",
    url: "https://www.drybar.com",
    id: "02"
  },
  {
    title: "Carvana",
    category: "Used Car Dealership",
    serviceType: "AI Solutions & Web Development",
    description: "Carvana reinvented the used car dealership experience online — featuring a fully digital purchase flow, 360° vehicle tours, and a customer-first UI that replaced the traditional lot entirely.",
    alt: "Carvana used car dealership website — 360 vehicle tours and frictionless digital purchase flow",
    year: "2024",
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2664&auto=format&fit=crop",
    url: "https://www.carvana.com",
    id: "03"
  },
  {
    title: "Sweetgreen",
    category: "Fast Casual / Food",
    serviceType: "Landing Page Design & CRO",
    description: "Sweetgreen is a farm-to-table salad chain that built its brand on clean eating and clean design. Their website uses bold color blocks, ingredient-forward photography, and a mobile-first ordering experience.",
    alt: "Sweetgreen fast casual restaurant website — bold color blocks with fresh ingredient photography",
    year: "2024",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2670&auto=format&fit=crop",
    url: "https://www.sweetgreen.com",
    id: "04"
  },
  {
    title: "The Little Gym",
    category: "Kids Fitness & Education",
    serviceType: "Web Development & Local SEO",
    description: "The Little Gym is a children's fitness franchise with 300+ US locations. Their site balances joyful, family-friendly visuals with strong local SEO, class scheduling, and franchise location finders.",
    alt: "The Little Gym kids fitness franchise website — cheerful visuals with local class scheduling",
    year: "2023",
    img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2667&auto=format&fit=crop",
    url: "https://www.thelittlegym.com",
    id: "05"
  }
];

/* ============================================================
   CARD COMPONENT — Fixed: wrapped inner content with <a> tag
   so clicking anywhere on the card opens the project URL.
============================================================ */
const Card = ({ title, category, year, img, id, description, alt, serviceType, url }) => {
  return (
    <article
      className="group relative h-[400px] w-[85vw] sm:w-[400px] md:h-[550px] md:w-[500px] flex-shrink-0 cursor-pointer"
      itemScope
      itemType="https://schema.org/CreativeWork"
      aria-label={`${title} — ${category} project by Stryvenix`}
    >
      {/* Hidden SEO metadata */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="creator" content="Stryvenix" />
      <meta itemProp="dateCreated" content={year} />
      <meta itemProp="keywords" content={`${serviceType}, Stryvenix, ${category}, website design, AI agency`} />
      <p className="sr-only" itemProp="abstract">{description}</p>

      {/* ✅ FIX: <a> wraps the entire card — clicking anywhere navigates to the URL */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative h-full w-full overflow-hidden rounded-[2rem] bg-slate-900 shadow-xl transition-all duration-700 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        aria-label={`Visit ${title} website`}
      >
        {/* Subtle Gradient Border */}
        <div className="absolute inset-0 rounded-[2rem] border border-white/10 z-20 pointer-events-none"></div>

        {/* Background Image */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-[2rem]"
          role="img"
          aria-label={alt}
        >
          <div 
            className="h-full w-full bg-cover bg-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
            style={{ 
              backgroundImage: `url(${img})`,
              willChange: "transform"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/0 opacity-90 transition-opacity duration-500" />
        </div>

        {/* View Project Button */}
        <div className="absolute right-5 bottom-5 md:top-6 md:right-6 md:bottom-auto z-30 
                        opacity-100 md:opacity-0 md:translate-y-4 
                        transition-all duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-white/10 transition-transform duration-300 active:scale-95 md:hover:scale-110">
            <ArrowUpRight className="h-5 w-5 md:h-7 md:w-7" aria-hidden="true" />
          </div>
        </div>

        {/* Card Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-20">
          
          <div className="absolute right-6 top-6 md:top-auto md:bottom-[25%] text-6xl md:text-[10rem] font-extrabold text-white/5 select-none transition-transform duration-1000 group-hover:translate-x-4" aria-hidden="true">
            {id}
          </div>

          <div className="relative z-10 md:translate-y-2 transition-transform duration-500 md:group-hover:translate-y-0">
            <div className="flex items-center gap-3 mb-3 md:mb-5">
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-indigo-300">
                {category}
              </span>
              <span className="text-white/40 text-xs font-mono font-medium border-l border-white/10 pl-3">
                <time dateTime={year}>{year}</time>
              </span>
            </div>

            <h3
              className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-2 md:mb-4 pr-12 md:pr-0 drop-shadow-lg"
              itemProp="name"
            >
              {title}
            </h3>
            
            {/* Animated Progress Line */}
            <div className="h-[2px] w-full bg-white/10 mt-4 md:mt-8 rounded-full overflow-hidden transform-gpu">
              <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-blue-500 origin-left -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-0 will-change-transform"></div>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
};

/* ============================================================
   MAIN SECTION
============================================================ */
export default function SelectedWork() {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.2,
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const scrollVelocity = useVelocity(smoothProgress);
  const skewX = useTransform(scrollVelocity, [-1, 1], ["2deg", "-2deg"]); 

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useTransform(
    smoothProgress, 
    [0, 1], 
    ["0%", isMobile ? "-85%" : "-60%"] 
  );

  return (
    <section 
      ref={targetRef} 
      className="relative h-[400vh] md:h-[500vh] bg-slate-50 dark:bg-[#020617] transition-colors duration-500" 
      id="work"
      aria-label="Selected Work – Website Design, AI & Automation Projects by Stryvenix"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemProp="name" content="Selected Work – Stryvenix Portfolio" />
      <meta itemProp="description" content="A curated portfolio of website design, AI development, and automation projects delivered by Stryvenix for clients in the US, UK, and India." />
      <meta itemProp="numberOfItems" content={projectsData.length} />

      <GlobalStyles />
      
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden w-full">
        
        {/* DESKTOP TITLE */}
        <div className="absolute left-0 pl-10 md:pl-20 top-0 h-full flex flex-col justify-center z-30 hidden lg:flex w-[35vw] pointer-events-none bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-[#020617] dark:via-[#020617]/90">
          <div className="pointer-events-auto">
            <h2
              className="text-7xl xl:text-8xl font-extrabold leading-[0.9] text-slate-900 dark:text-white tracking-tighter mb-8"
              aria-label="Selected Works by Stryvenix – Website Design, AI & Automation Agency"
              itemProp="name"
            >
              Selected <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-90">
                Works.
              </span>
            </h2>
            <div className="flex flex-col gap-6 pl-2 max-w-sm">
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed" itemProp="description">
                A curated portfolio of websites, AI tools, and automation systems built by Stryvenix for businesses across the US, UK, and India.
              </p>
              
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-slate-300 dark:bg-slate-700" aria-hidden="true"></div>
                <span className="text-xs font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase">
                  Scroll Down
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* HORIZONTAL TRACK */}
        <motion.div 
          style={{ 
            x, 
            skewX, 
            willChange: "transform"
          }} 
          className="flex h-full items-center gap-6 md:gap-12 relative z-10 pl-6 pr-6 md:pl-[40vw] md:pr-[10vw]"
          role="list"
          aria-label="Portfolio projects by Stryvenix"
        >
          
          {/* MOBILE HEADER */}
          <div className="lg:hidden flex flex-col justify-center min-w-[85vw] sm:min-w-[400px] mr-4">
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 w-fit">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">Featured</span>
            </div>
            
            <h2
              className="text-5xl sm:text-6xl font-extrabold leading-[0.95] text-slate-900 dark:text-white tracking-tight mb-5"
              aria-label="Selected Works by Stryvenix – Website Design, AI & Automation Agency"
            >
              Selected <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
                Works.
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-xs">
              Explore our latest website design, AI, and automation projects.
            </p>
          </div>

          {/* Render Cards */}
          {projectsData.map((project, i) => (
            <div
              key={i}
              role="listitem"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={i + 1} />
              <Card {...project} />
            </div>
          ))}

        </motion.div>

        {/* PROGRESS BAR */}
        <div className="absolute bottom-8 left-6 right-6 md:left-20 md:right-20 flex items-center gap-4 z-30" aria-hidden="true">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-600 hidden md:block">01</span>
          <div className="relative h-[2px] w-full bg-slate-200 dark:bg-white/10 overflow-hidden rounded-full transform-gpu">
            <motion.div 
              style={{ 
                scaleX: smoothProgress, 
                willChange: "transform" 
              }} 
              className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-indigo-500 to-blue-500 origin-left"
            />
          </div>
          <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-600 hidden md:block">
            0{projectsData.length}
          </span>
        </div>

      </div>
    </section>
  );
}


