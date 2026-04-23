import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

/*
 * ─────────────────────────────────────────────────────────────────
 * FUTURE UPGRADE: react-helmet-async
 * ─────────────────────────────────────────────────────────────────
 * If you add multiple routes later (e.g. /services, /about, /blog),
 * install react-helmet-async so each page can manage its own
 * <title>, <meta name="description">, and canonical <link> tags:
 *
 *   npm install react-helmet-async
 *
 * Then wrap your app in <HelmetProvider> in main.jsx and use
 * <Helmet> inside each page component.  For this single-page
 * build the static tags in index.html are sufficient.
 * ─────────────────────────────────────────────────────────────────
 */

export default function App() {
  return (
    /*
     * SEO NOTE: The outermost div keeps your Tailwind bg/text classes.
     * All semantic elements below are what Google's crawler actually reads.
     */
    <div className="bg-slate-950 text-slate-100">

      {/*
       * ── SKIP NAVIGATION ─────────────────────────────────────────
       * Accessibility + SEO: screen readers & crawlers follow this first.
       * The sr-only class hides it visually but keeps it in the DOM.
       * ─────────────────────────────────────────────────────────────
       */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
      >
        Skip to main content
      </a>

      {/*
       * ── HEADER ──────────────────────────────────────────────────
       * FIX ❌→✅: Removed redundant role="banner".
       * The <header> element already carries the implicit ARIA role
       * of "banner" when it is a direct child of <body> (via the
       * React root). Adding it explicitly is harmless but clutters
       * the code and confuses some ARIA linters.
       * ─────────────────────────────────────────────────────────────
       */}
      <header>
        <Navbar />
      </header>

      {/*
       * ── MAIN ────────────────────────────────────────────────────
       * FIX ❌→✅: Removed redundant role="main" and itemScope/itemType.
       *
       * (a) role="main" — <main> already has that implicit ARIA role.
       *     Doubling it up causes validator warnings.
       *
       * (b) itemScope itemType="https://schema.org/WebPage" on <main>
       *     — Microdata on <main> without any matching itemprop
       *     attributes on child elements produces an empty, invalid
       *     microdata item. Google will log it as an error in Search
       *     Console. WebPage schema is already fully declared in the
       *     JSON-LD block inside index.html, which is the correct
       *     and preferred approach.
       * ─────────────────────────────────────────────────────────────
       */}
      <main id="main-content">

        {/*
         * ── HERO ──────────────────────────────────────────────────
         * FIX ❌→✅: Removed itemType="https://schema.org/WPHeader".
         * WPHeader is a WordPress-specific type in schema.org's
         * deprecated WP extension. It has no meaning for a React site
         * and Google actively ignores / flags it.
         *
         * The aria-label is kept — it creates a named landmark region
         * which helps both screen readers and crawlers understand the
         * page's primary identity.
         * ─────────────────────────────────────────────────────────────
         */}
        <section aria-label="Stryvenix – Website Design, AI & Automation Agency">
          <Hero />
        </section>

        {/*
         * ── WHY CHOOSE US ─────────────────────────────────────────
         * Trust signals section. Named landmark for accessibility.
         * ─────────────────────────────────────────────────────────────
         */}
        <section aria-label="Why Choose Stryvenix">
          <WhyChooseUs />
        </section>

        {/*
         * ── SERVICES ──────────────────────────────────────────────
         * FIX ❌→✅: Removed itemScope itemType="https://schema.org/Service"
         * from the <section> wrapper.
         *
         * Microdata on a container without matching itemprop children
         * = invalid schema. Individual service cards inside Services.jsx
         * can use microdata or, better, rely on the JSON-LD OfferCatalog
         * already defined in index.html (cleaner separation of concerns).
         *
         * id="services" is kept for anchor navigation.
         * ─────────────────────────────────────────────────────────────
         */}
        <section
          id="services"
          aria-label="Our Services – Website Design, AI & Automation"
        >
          <Services />
        </section>

        {/*
         * ── TESTIMONIALS ──────────────────────────────────────────
         * FIX ❌→✅: Removed itemType="https://schema.org/Review".
         *
         * Review schema requires specific itemprop children:
         *   itemReviewed, reviewRating, author, datePublished.
         * Wrapping a whole section with Review type and no children
         * produces an invalid schema item that GSC flags as an error.
         *
         * To unlock Google star-rating rich results, add individual
         * Review schema via JSON-LD inside Testimonials.jsx, one
         * object per testimonial card. See the snippet below as a
         * guide to add inside Testimonials.jsx:
         *
         *   <script type="application/ld+json">{JSON.stringify({
         *     "@context": "https://schema.org",
         *     "@type": "Review",
         *     "itemReviewed": { "@type": "Organization", "name": "Stryvenix" },
         *     "author": { "@type": "Person", "name": "Client Name" },
         *     "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
         *     "reviewBody": "Their website transformed our conversion rate..."
         *   })}</script>
         * ─────────────────────────────────────────────────────────────
         */}
        <section
          id="testimonials"
          aria-label="Client Testimonials & Reviews"
        >
          <Testimonials />
        </section>

        {/*
         * ── PROCESS ───────────────────────────────────────────────
         * ✅ HowTo schema opportunity.
         * Keep the itemScope removed here (same microdata issue).
         * Instead, add HowTo JSON-LD directly inside Process.jsx
         * to be eligible for step-by-step rich results in Google.
         *
         *   "@type": "HowTo",
         *   "name": "How Stryvenix Works",
         *   "step": [
         *     { "@type": "HowToStep", "position": 1, "name": "Discovery Call", ... },
         *     ...
         *   ]
         * ─────────────────────────────────────────────────────────────
         */}
        <section
          id="process"
          aria-label="Our Work Process"
        >
          <Process />
        </section>

        {/*
         * ── PRICING ───────────────────────────────────────────────
         * ✅ Offer schema opportunity.
         * Add individual Offer JSON-LD objects inside Pricing.jsx
         * per plan so Google can surface pricing in search snippets.
         * ─────────────────────────────────────────────────────────────
         */}
        <section
          id="pricing"
          aria-label="Pricing Plans"
        >
          <Pricing />
        </section>

        {/*
         * ── CONTACT ───────────────────────────────────────────────
         * ✅ ContactPage schema already declared in index.html JSON-LD.
         * ─────────────────────────────────────────────────────────────
         */}
        <section
          id="contact"
          aria-label="Contact Stryvenix"
        >
          <Contact />
        </section>

      </main>

      {/*
       * ── FOOTER ──────────────────────────────────────────────────
       * FIX ❌→✅: Removed redundant role="contentinfo".
       * <footer> at the top level already carries the implicit
       * ARIA role "contentinfo". Explicit duplication is redundant.
       * ─────────────────────────────────────────────────────────────
       */}
      <footer>
        <Footer />
      </footer>

    </div>
  );
}