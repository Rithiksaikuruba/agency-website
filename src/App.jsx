import React from 'react'; // ✅ important for some Vite/JSX builds

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
 */

export default function App() {
  return (
    <div className="bg-slate-950 text-slate-100">

      {/* Skip Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main id="main-content">

        <section aria-label="Stryvenix – Website Design, AI & Automation Agency">
          <Hero />
        </section>

        <section aria-label="Why Choose Stryvenix">
          <WhyChooseUs />
        </section>

        <section
          id="services"
          aria-label="Our Services – Website Design, AI & Automation"
        >
          <Services />
        </section>

        <section
          id="testimonials"
          aria-label="Client Testimonials & Reviews"
        >
          <Testimonials />
        </section>

        <section
          id="process"
          aria-label="Our Work Process"
        >
          <Process />
        </section>

        <section
          id="pricing"
          aria-label="Pricing Plans"
        >
          <Pricing />
        </section>

        <section
          id="contact"
          aria-label="Contact Stryvenix"
        >
          <Contact />
        </section>

      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>

    </div>
  );
}