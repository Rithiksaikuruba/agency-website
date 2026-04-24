import React from 'react';

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

export default function App() {
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

        <section id="pricing" aria-label="Pricing Plans — Website Design, AI and Automation Services">
          <Pricing />
        </section>

        <section id="about" aria-label="About Stryvenix — Website Design and AI Agency Based in Hyderabad">
          <About />
        </section>

        <section id="faq" aria-label="Frequently Asked Questions About Stryvenix Services">
          <FAQ />
        </section>

        <section id="contact" aria-label="Contact Stryvenix — Book a Free Discovery Call">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}
