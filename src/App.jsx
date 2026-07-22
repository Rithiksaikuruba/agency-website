import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Pricing from './components/Pricing';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Careers from './components/Careers';
import ServicesPage from './components/ServicesPage';

// Import Legal Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

/* ── Main single-page layout ── */
function HomePage() {
  return (
    <main id="main-content" role="main">
      <section aria-label="Stryvenix — Website Design, AI and Automation Agency for Startups">
        <Hero />
      </section>

      <section id="why-choose-us" aria-label="Why Choose Stryvenix Over Other Agencies">
        <WhyChooseUs />
      </section>

      <section id="work" aria-label="Case Studies — Website Design, AI and Automation Projects by Stryvenix">
        <CaseStudies />
      </section>

      <section id="testimonials" aria-label="Client Testimonials and Reviews — Stryvenix Agency">
        <Testimonials />
      </section>

      <section id="process" aria-label="Our Process — How Stryvenix Builds Websites and AI Systems">
        <Process />
      </section>

      {/* Updated ARIA label reflecting the new section structure */}
      <section id="pricing" aria-label="Custom Quote — Pricing & Proposals">
        <Pricing />
      </section>

      <section id="about" aria-label="About Stryvenix — Website Design and AI Agency">
        <About />
      </section>

      <section id="faq" aria-label="Frequently Asked Questions About Stryvenix Services">
        <FAQ />
      </section>

      <section id="contact" aria-label="Contact Stryvenix — Book a Free Discovery Call">
        <Contact />
      </section>
    </main>
  );
}

/* ── Shared Layout ── */
function Layout({ children }) {
  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-[#020617] dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg"
      >
        Skip to main content
      </a>

      <header role="banner">
        <Navbar />
      </header>

      {children}

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />

      {/* Careers */}
      <Route
        path="/careers"
        element={
          <Layout>
            <main id="main-content" role="main">
              <Careers />
            </main>
          </Layout>
        }
      />

      {/* Services */}
      <Route
        path="/services"
        element={
          <Layout>
            <main id="main-content" role="main">
              <ServicesPage />
            </main>
          </Layout>
        }
      />

      {/* Privacy Policy */}
      <Route
        path="/privacy-policy"
        element={
          <Layout>
            <main id="main-content" role="main">
              <PrivacyPolicy />
            </main>
          </Layout>
        }
      />

      {/* Terms of Service */}
      <Route
        path="/terms-of-service"
        element={
          <Layout>
            <main id="main-content" role="main">
              <TermsOfService />
            </main>
          </Layout>
        }
      />

      {/* Cookie Policy */}
      <Route
        path="/cookie-policy"
        element={
          <Layout>
            <main id="main-content" role="main">
              <CookiePolicy />
            </main>
          </Layout>
        }
      />
    </Routes>
  );
}