import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Globe,
  Clock,
  Star,
  BarChart3,
  Zap,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Quote,
} from 'lucide-react';

/*
  ─────────────────────────────────────────────────────────────
  GLOBAL CSS — add to globals.css / index.css:
  ─────────────────────────────────────────────────────────────
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  :root { --font-body: 'Plus Jakarta Sans', sans-serif; }
  body { font-family: var(--font-body); overflow-x: hidden; }
  .bg-grain { background-image: url("https://grainy-gradients.vercel.app/noise.svg"); opacity: 0.03; pointer-events: none; }
  ::-webkit-scrollbar { width: 0px; }
*/

const BOOKING_URL = 'https://cal.com/stryvenix/30min';
const SITE_URL    = 'https://www.stryvenix.com';

/* ════════════════════════════════════════════════════════════
   1. HEAD META COMPONENT
   ════════════════════════════════════════════════════════════ */
export const HeadMeta = () => (
  <>
    <link rel="canonical" href={SITE_URL} />
    <link rel="alternate" hrefLang="en-US" href={SITE_URL} />
    <link rel="alternate" hrefLang="en-GB" href={SITE_URL} />
    <link rel="alternate" hrefLang="en-IN" href={SITE_URL} />
    <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link rel="preconnect" href="https://i.pravatar.cc" />
    <link rel="dns-prefetch" href="https://cal.com" />
    <link rel="dns-prefetch" href="https://grainy-gradients.vercel.app" />

    <link
      rel="preload"
      as="image"
      href={`${SITE_URL}/og-image.png`}
      type="image/png"
    />

    <meta
      name="description"
      content="Stryvenix builds high-converting websites, AI solutions & automation systems for startups. Trusted by 50+ businesses in the US, UK & India. Launch in 2–4 weeks. Book a free call."
    />
    <meta
      name="keywords"
      content="website design agency, AI automation agency, startup website design, MVP development, business process automation, landing page design, CRO agency, Next.js agency, React agency"
    />
    <meta name="author" content="Stryvenix" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

    <meta property="og:type"        content="website" />
    <meta property="og:url"         content={SITE_URL} />
    <meta property="og:site_name"   content="Stryvenix" />
    <meta property="og:locale"      content="en_US" />
    <meta property="og:locale:alternate" content="en_GB" />
    <meta property="og:locale:alternate" content="en_IN" />
    <meta
      property="og:title"
      content="Stryvenix | Website Design, AI & Automation Agency — US, UK & India"
    />
    <meta
      property="og:description"
      content="High-converting websites, AI solutions & automation for startups. 50+ clients. Launch in 2–4 weeks. Book a free discovery call today."
    />
    <meta property="og:image"              content={`${SITE_URL}/og-image.png`} />
    <meta property="og:image:width"        content="1200" />
    <meta property="og:image:height"       content="630" />
    <meta property="og:image:alt"          content="Stryvenix — Website Design, AI & Automation Agency" />
    <meta property="og:image:type"         content="image/png" />

    <meta name="twitter:card"        content="summary_large_image" />
    <meta name="twitter:site"        content="@stryvenix" />
    <meta name="twitter:creator"     content="@stryvenix" />
    <meta
      name="twitter:title"
      content="Stryvenix | Website Design, AI & Automation Agency"
    />
    <meta
      name="twitter:description"
      content="High-converting websites, AI solutions & automation for startups. 50+ clients. Launch in 2–4 weeks."
    />
    <meta name="twitter:image"       content={`${SITE_URL}/og-image.png`} />
    <meta name="twitter:image:alt"   content="Stryvenix — Website Design, AI & Automation Agency" />

    <meta name="theme-color" content="#020617" media="(prefers-color-scheme: dark)" />
    <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
  </>
);

/* ════════════════════════════════════════════════════════════
   2. JSON-LD STRUCTURED DATA
   ════════════════════════════════════════════════════════════ */
const JsonLd = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService', 'LocalBusiness'],
        '@id': `${SITE_URL}/#organization`,
        name: 'Stryvenix',
        legalName: 'Stryvenix',
        url: SITE_URL,
        slogan: 'High-Converting Websites & AI-Powered Systems Built to Scale',
        brand: {
          '@type': 'Brand',
          name: 'Stryvenix',
          slogan: 'High-Converting Websites & AI-Powered Systems Built to Scale',
        },
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: `${SITE_URL}/logo.png`,
          width: 200,
          height: 60,
          caption: 'Stryvenix logo — Website Design, AI & Automation Agency',
        },
        image: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#og-image`,
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          caption: 'Stryvenix — Website Design, AI & Automation Agency for Startups in US, UK and India',
        },
        description:
          'Stryvenix is a website design, AI & automation agency that builds high-converting digital products for startups and fast-growing businesses in the US, UK, and India.',
        foundingDate: '2022',
        foundingLocation: {
          '@type': 'Place',
          address: { '@type': 'PostalAddress', addressCountry: 'IN' },
        },
        numberOfEmployees: { '@type': 'QuantitativeValue', value: '10' },
        geo: { '@type': 'GeoCoordinates', latitude: '28.6139', longitude: '77.2090' },
        telephone: '+1-800-STRYVENIX',
        email: 'hello@stryvenix.com',
        areaServed: [
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'India' },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
        ],
        serviceType: [
          'Website Design', 'Website Development', 'AI Solutions',
          'Business Automation', 'Landing Page Design',
          'Conversion Rate Optimisation', 'MVP Development',
          'SaaS Development', 'React Development', 'Next.js Development',
        ],
        knowsAbout: [
          'Website Design', 'Website Development', 'AI Solutions',
          'Business Automation', 'Landing Page Design',
          'Conversion Rate Optimisation', 'MVP Development',
          'React Development', 'Next.js Development', 'SaaS Development',
          'Workflow Automation', 'AI Chatbots', 'Lead Generation Systems',
        ],
        knowsLanguage: [{ '@type': 'Language', name: 'English' }],
        interactionStatistic: [
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/FollowAction',
            userInteractionCount: '2400',
            name: 'LinkedIn followers',
          },
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/ReviewAction',
            userInteractionCount: '50',
            name: 'Verified client reviews',
          },
        ],
        subjectOf: { '@id': `${SITE_URL}/#webpage` },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Stryvenix Service Packages',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Website Design & Development',
                description: 'Custom high-converting websites and landing pages built for startups.',
                availableChannel: {
                  '@type': 'ServiceChannel',
                  serviceType: 'Website Design & Development',
                  serviceUrl: `${SITE_URL}/services/website-design`,
                  availableLanguage: 'English',
                },
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'USD',
                price: '1500', minPrice: '1500', maxPrice: '8000',
              },
              eligibleRegion: ['US', 'GB', 'IN'],
              availability: 'https://schema.org/LimitedAvailability',
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI Solutions & Integration',
                description: 'Custom AI tools, chatbots, and integrations that automate decisions and drive business growth.',
                availableChannel: {
                  '@type': 'ServiceChannel',
                  serviceType: 'AI Solutions & Integration',
                  serviceUrl: `${SITE_URL}/services/ai-solutions`,
                  availableLanguage: 'English',
                },
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'USD',
                price: '2000', minPrice: '2000', maxPrice: '12000',
              },
              eligibleRegion: ['US', 'GB', 'IN'],
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Business Process Automation',
                description: 'End-to-end workflow automation saving teams 10–20 hours per week.',
                availableChannel: {
                  '@type': 'ServiceChannel',
                  serviceType: 'Business Process Automation',
                  serviceUrl: `${SITE_URL}/services/automation`,
                  availableLanguage: 'English',
                },
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'USD',
                price: '1800', minPrice: '1800', maxPrice: '10000',
              },
              eligibleRegion: ['US', 'GB', 'IN'],
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'MVP Development',
                description: 'Fast-launch MVP builds for startups — from idea to live product in weeks.',
                availableChannel: {
                  '@type': 'ServiceChannel',
                  serviceType: 'MVP Development',
                  serviceUrl: `${SITE_URL}/services/mvp-development`,
                  availableLanguage: 'English',
                },
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'USD',
                price: '3000', minPrice: '3000', maxPrice: '20000',
              },
              eligibleRegion: ['US', 'GB', 'IN'],
            },
          ],
        },
        potentialAction: {
          '@type': 'ReserveAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: BOOKING_URL,
            inLanguage: 'en',
            actionPlatform: [
              'https://schema.org/DesktopWebPlatform',
              'https://schema.org/MobileWebPlatform',
            ],
          },
          result: {
            '@type': 'Reservation',
            name: 'Free 30-Minute Discovery Call with Stryvenix',
          },
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            url: `${SITE_URL}/contact`,
            availableLanguage: ['English'],
            areaServed: ['US', 'GB', 'IN'],
          },
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            url: `${SITE_URL}/contact`,
            availableLanguage: ['English'],
            areaServed: ['US', 'GB', 'IN'],
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '50',
          reviewCount: '50',
        },
        review: [
          {
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            author: { '@type': 'Person', name: 'Alex M.' },
            datePublished: '2025-12-10',
            reviewBody:
              'Stryvenix built our MVP landing page in record time. Conversion rate jumped significantly after launch.',
          },
          {
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            author: { '@type': 'Person', name: 'Priya S.' },
            datePublished: '2025-11-18',
            reviewBody:
              'Outstanding AI automation work. Our team saved over 14 hours a week after Stryvenix implemented our workflow automation system.',
          },
          {
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            author: { '@type': 'Person', name: 'James T.' },
            datePublished: '2026-01-22',
            reviewBody:
              'The website Stryvenix designed increased our lead capture rate by 40%. Best investment we made this year.',
          },
          {
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            author: { '@type': 'Person', name: 'Sarah K.' },
            datePublished: '2026-02-14',
            reviewBody:
              'Stryvenix delivered our full SaaS MVP in under 5 weeks. The quality of their React and Next.js work is exceptional.',
          },
          {
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            author: { '@type': 'Person', name: 'Rahul D.' },
            datePublished: '2026-03-05',
            reviewBody:
              'We hired Stryvenix for a full website redesign and CRO audit. Our bounce rate dropped 28% in the first month post-launch.',
          },
        ],
        sameAs: [
          'https://www.linkedin.com/company/stryvenix',
          'https://twitter.com/stryvenix',
          'https://www.instagram.com/stryvenix',
          'https://github.com/stryvenix',
        ],
        founder: { '@id': `${SITE_URL}/#founder` },
        employee: { '@id': `${SITE_URL}/#founder` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder`,
        name: '[PLACEHOLDER_FULL_NAME]',
        givenName: '[PLACEHOLDER_FIRST_NAME]',
        familyName: '[PLACEHOLDER_LAST_NAME]',
        url: `${SITE_URL}/about`,
        image: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/founder.jpg`,
          width: 400,
          height: 400,
          caption: '[PLACEHOLDER_FULL_NAME] — Founder & CEO of Stryvenix',
        },
        description:
          '[PLACEHOLDER_FULL_NAME] is the Founder & CEO of Stryvenix, a website design, AI & automation agency serving startups and businesses across the US, UK, and India.',
        jobTitle: 'Founder & CEO',
        worksFor: { '@id': `${SITE_URL}/#organization` },
        founder: { '@id': `${SITE_URL}/#organization` },
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Agency Founder & CEO',
          occupationLocation: { '@type': 'Country', name: 'India' },
          skills: 'Website Design, AI Solutions, Business Automation, MVP Development',
        },
        sameAs: ['[PLACEHOLDER_LINKEDIN_URL]'],
        knowsAbout: [
          'Website Design', 'AI Solutions', 'Business Automation',
          'Startup Growth', 'Conversion Rate Optimisation',
          'MVP Development', 'SaaS Development', 'Digital Marketing',
        ],
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: '[PLACEHOLDER_UNIVERSITY]',
        },
        nationality: { '@type': 'Country', name: '[PLACEHOLDER_COUNTRY]' },
        award: '[PLACEHOLDER_AWARD]',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'business inquiries',
          url: BOOKING_URL,
          availableLanguage: ['English'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Stryvenix',
        description: 'Website Design, AI & Automation Agency — US, UK & India',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en',
        copyrightYear: '2026',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': ['WebPage', 'ItemPage'],
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        sameAs: SITE_URL,
        name: 'Stryvenix | Website Design, AI & Automation Agency — US, UK & India',
        headline: 'High-Converting Websites & AI-Powered Systems Built to Scale',
        alternativeHeadline: 'Website Design, AI Solutions & Business Automation for Startups',
        description:
          'Stryvenix builds conversion-focused websites, AI solutions, and automation systems that launch MVPs faster and drive real growth for startups and businesses in the US, UK, and India.',
        text:
          'Stryvenix is a website design, AI & automation agency founded in 2022 that builds high-converting digital products for startups and fast-growing businesses across the US, UK, and India. Services include website design, AI integration, business process automation, MVP development, and landing page CRO. Clients see 30–50% conversion rate improvements. Projects launch in 2–4 weeks. Rated 5.0 stars across 50+ verified client reviews.',
        abstract:
          'Stryvenix builds high-converting websites, AI solutions and automation for startups. Trusted by 50+ founders in US, UK & India. Launch in 2–4 weeks.',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        mainEntity: { '@id': `${SITE_URL}/#organization` },
        author: { '@id': `${SITE_URL}/#founder` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        copyrightHolder: { '@id': `${SITE_URL}/#organization` },
        license: `${SITE_URL}/terms`,
        breadcrumb: { '@id': `${SITE_URL}/#breadcrumb` },
        inLanguage: 'en',
        datePublished: '2022-01-01',
        dateModified: '2026-04-01',
        keywords: [
          'website design agency', 'AI automation agency',
          'startup website design', 'MVP development agency',
          'business process automation', 'AI solutions for startups',
          'conversion rate optimisation', 'website design US',
          'website design UK', 'website design India',
          'Next.js development agency', 'React development agency',
          'landing page design', 'SaaS development agency',
          'AI chatbot development', 'workflow automation',
          'lead generation system', 'high-converting website',
        ],
        isAccessibleForFree: true,
        accessibilityFeature: [
          'alternativeText', 'ARIA', 'highContrast',
          'largePrint', 'structuredNavigation',
        ],
        accessibilityHazard: 'noFlashingHazard',
        primaryImageOfPage: { '@id': `${SITE_URL}/#og-image` },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: [
            '#hero-heading',
            '#hero-description',
            '#hero-stats',
            '#hero-testimonials',
          ],
        },
        mentions: [
          { '@type': 'SoftwareApplication', name: 'React',            applicationCategory: 'DeveloperApplication' },
          { '@type': 'SoftwareApplication', name: 'Next.js',          applicationCategory: 'DeveloperApplication' },
          { '@type': 'SoftwareApplication', name: 'Tailwind CSS',     applicationCategory: 'DeveloperApplication' },
          { '@type': 'SoftwareApplication', name: 'OpenAI',           applicationCategory: 'AIApplication' },
          { '@type': 'SoftwareApplication', name: 'Anthropic Claude', applicationCategory: 'AIApplication' },
          { '@id': `${SITE_URL}/#ai-framework-v2` },
        ],
        significantLink: [
          `${SITE_URL}/services/website-design`,
          `${SITE_URL}/services/ai-solutions`,
          `${SITE_URL}/services/automation`,
          `${SITE_URL}/services/mvp-development`,
          `${SITE_URL}/services/landing-pages`,
          BOOKING_URL,
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#ai-framework-v2`,
        name: 'Stryvenix AI Framework V2',
        alternateName: 'Stryvenix AI Framework',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'AI Automation & Analytics',
        description:
          'The Stryvenix AI Framework V2 is a proprietary AI automation and growth analytics platform that powers client dashboards, lead capture automation, and workflow orchestration for startups.',
        url: `${SITE_URL}/services/ai-solutions`,
        author: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Included with AI Solutions & Integration service packages',
        },
        featureList: [
          'Automated lead capture and qualification',
          'Real-time revenue and growth dashboards',
          'Workflow automation saving 10–20 hours per week',
          'AI chatbot integration and deployment',
          'CRM and email marketing automation',
        ],
        inLanguage: 'en',
        datePublished: '2023-06-01',
        dateModified: '2026-04-01',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home — Stryvenix Website Design & AI Agency',
            item: SITE_URL,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#services`,
        name: 'Stryvenix Services',
        description: 'Website design, AI, and automation services offered by Stryvenix',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: 5,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Service',
              name: 'Website Design & Development',
              description: 'Custom high-converting websites and landing pages built for startups in the US, UK, and India.',
              provider: { '@id': `${SITE_URL}/#organization` },
              url: `${SITE_URL}/services/website-design`,
              serviceOutput: 'High-converting website live within 2–4 weeks',
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'Service',
              name: 'AI Solutions & Integration',
              description: 'Custom AI tools, chatbots, and integrations that automate decisions and drive business growth.',
              provider: { '@id': `${SITE_URL}/#organization` },
              url: `${SITE_URL}/services/ai-solutions`,
              serviceOutput: 'Custom AI system saving 10–20 hours per week',
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'Service',
              name: 'Business Process Automation',
              description: 'End-to-end workflow automation saving teams 10–20 hours per week.',
              provider: { '@id': `${SITE_URL}/#organization` },
              url: `${SITE_URL}/services/automation`,
            },
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@type': 'Service',
              name: 'MVP Development',
              description: 'Fast-launch MVP builds for startups — from idea to live product in weeks.',
              provider: { '@id': `${SITE_URL}/#organization` },
              url: `${SITE_URL}/services/mvp-development`,
              serviceOutput: 'Live MVP product in 3–6 weeks',
            },
          },
          {
            '@type': 'ListItem',
            position: 5,
            item: {
              '@type': 'Service',
              name: 'Landing Page Design & CRO',
              description: 'Conversion-rate-optimised landing pages designed to turn traffic into revenue.',
              provider: { '@id': `${SITE_URL}/#organization` },
              url: `${SITE_URL}/services/landing-pages`,
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': `${SITE_URL}/#howto-get-started`,
        name: 'How to Get Started with Stryvenix',
        description:
          'Book a free discovery call and launch your website or AI automation project with Stryvenix in 3 simple steps.',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en',
        totalTime: 'P14D',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
          description: 'Free initial discovery call',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Book a Free Discovery Call',
            text: 'Schedule a no-commitment 30-minute strategy call via our booking page.',
            url: BOOKING_URL,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Receive a Custom Proposal',
            text: 'Within 48 hours receive a tailored project proposal including scope, timeline, and pricing.',
            url: `${SITE_URL}/contact`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Launch Your Project',
            text: 'Kick off your website, AI integration, or automation build. We deliver in sprints with live previews throughout.',
            url: `${SITE_URL}/services`,
          },
        ],
      },
      {
        '@type': 'Event',
        '@id': `${SITE_URL}/#discovery-call-event`,
        name: 'Free 30-Minute Discovery Call with Stryvenix',
        description:
          'Book a free no-commitment 30-minute strategy call with the Stryvenix team. We review your startup goals and recommend the best website design, AI, or automation service package.',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        isAccessibleForFree: true,
        inLanguage: 'en',
        organizer: { '@id': `${SITE_URL}/#organization` },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: BOOKING_URL,
          validFrom: '2022-01-01',
        },
        location: { '@type': 'VirtualLocation', url: BOOKING_URL },
        url: BOOKING_URL,
        image: `${SITE_URL}/og-image.png`,
        startDate: '2026-04-01',
        endDate: '2026-12-31',
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What services does Stryvenix offer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Stryvenix offers website design and development, AI solutions and integration, business process automation, MVP development, and landing page design with CRO — for startups in the US, UK, and India.',
            },
          },
          {
            '@type': 'Question',
            name: 'How quickly can Stryvenix build and launch a website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most Stryvenix website projects launch within 2–4 weeks. MVP builds typically go live within 3–6 weeks depending on scope and complexity.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Stryvenix work with startups outside the US?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Stryvenix works with startups and growing businesses across the US, UK, and India. All work is delivered fully remotely.',
            },
          },
          {
            '@type': 'Question',
            name: 'What AI automation services does Stryvenix provide?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Stryvenix builds custom AI integrations, automated lead capture systems, workflow automation, AI chatbots, and data pipeline automations that save teams 10–20 hours per week.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I get started with Stryvenix?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Book a free discovery call via the website. Stryvenix offers a no-commitment consultation to understand your goals and recommends the best service package.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much does a website from Stryvenix cost?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Website design and development projects at Stryvenix start from $1,500 USD. Book a free call for a custom quote.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can Stryvenix help increase my website conversion rate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Stryvenix specialises in conversion rate optimisation (CRO). Clients have seen 30–50% conversion rate improvements after redesigns.',
            },
          },
          {
            '@type': 'Question',
            name: 'What technologies does Stryvenix use to build websites?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Stryvenix builds with React, Next.js, and Tailwind CSS for fast, SEO-friendly results. For AI integrations we use OpenAI, Anthropic, and custom LLM pipelines.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Stryvenix build AI chatbots for businesses?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Stryvenix builds custom AI chatbots for lead capture, customer support, and workflow automation, powered by OpenAI and Anthropic APIs.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does MVP development take with Stryvenix?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Stryvenix delivers most MVP builds within 3–6 weeks using an agile sprint model with live previews at each milestone.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Stryvenix a good agency for early-stage startups?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Stryvenix works with pre-seed, seed, and Series A startups with lean packages designed for early-stage founders.',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
};

/* ════════════════════════════════════════════════════════════
   3. REUSABLE MICRO-COMPONENTS
   ════════════════════════════════════════════════════════════ */
const StarRating = ({ count = 5, label = 'Stryvenix rated 5 out of 5 stars' }) => (
  <div
    className="flex gap-0.5 text-amber-500 shrink-0"
    aria-label={label}
    role="img"
  >
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-current shrink-0" aria-hidden="true" />
    ))}
  </div>
);

const AvatarGroup = ({ count = 4 }) => (
  <div
    className="flex -space-x-3 sm:-space-x-4 shrink-0"
    role="group"
    aria-label={`${count} verified Stryvenix clients`}
  >
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white dark:border-[#020617] bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden hover:-translate-y-1 transition-transform shrink-0"
      >
        <img
          src={`https://i.pravatar.cc/100?img=${i + 45}`}
          alt={`Verified Stryvenix client — startup founder served across US, UK and India`}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width="48"
          height="48"
        />
      </div>
    ))}
  </div>
);

/* ════════════════════════════════════════════════════════════
   4. ANIMATED TEXT
   ════════════════════════════════════════════════════════════ */
const AnimatedText = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
    }),
  };
  const child = {
    visible: {
      opacity: 1, y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0, y: 20,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };
  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: '0.25em' }} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

/* ════════════════════════════════════════════════════════════
   5. PERFORMANCE DASHBOARD
   ════════════════════════════════════════════════════════════ */
const PerformanceShowcase = () => (
  <figure
    className="relative w-full max-w-[480px] mx-auto my-10 lg:my-0 flex flex-col gap-5 px-2 sm:px-0 pb-16 sm:pb-14 lg:pb-0 m-0"
    aria-labelledby="dashboard-caption"
  >
    <figcaption id="dashboard-caption" className="sr-only">
      Stryvenix client growth dashboard powered by the Stryvenix AI Framework V2:
      $124,500 monthly recurring revenue with 32.4% growth, workflow automation
      saving 14 hours per week for a startup client.
    </figcaption>

    <motion.div
      animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.02, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-indigo-500/10 to-purple-500/20 blur-3xl rounded-[3rem] pointer-events-none"
      aria-hidden="true"
    />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative z-10 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 p-5 sm:p-7 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
              Client Growth Dashboard
            </h3>
            <p className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
              Stryvenix AI Framework V2
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-full border border-emerald-100 dark:border-emerald-500/20 shrink-0">
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Live Data
          </span>
        </div>
      </div>

      <div className="mb-5 sm:mb-6">
        <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
          Monthly Recurring Revenue
        </p>
        <div className="flex flex-wrap items-end gap-2 sm:gap-3">
          <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            $124.5<span className="text-2xl sm:text-3xl text-slate-400">k</span>
          </p>
          <div className="flex items-center gap-1 text-emerald-500 mb-1 sm:mb-2 font-bold text-xs sm:text-sm bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
            <span>32.4%</span>
          </div>
        </div>
      </div>

      <div className="relative h-24 sm:h-28 w-full mb-6 sm:mb-8" aria-hidden="true" role="presentation">
        <div className="absolute inset-0 flex flex-col justify-between opacity-20 dark:opacity-10 pointer-events-none">
          <div className="w-full h-px bg-slate-400"></div>
          <div className="w-full h-px bg-slate-400"></div>
          <div className="w-full h-px bg-slate-400"></div>
        </div>
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            d="M0,40 L0,30 C20,30 30,10 50,20 C70,30 80,5 100,0 L100,40 Z"
            fill="url(#chartGradient)"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            d="M0,30 C20,30 30,10 50,20 C70,30 80,5 100,0"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, type: 'spring' }}
            cx="100" cy="0" r="2.5"
            fill="#fff" stroke="#3b82f6" strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="flex flex-col gap-3 pt-4 sm:pt-5 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Business Workflow Automated
              </p>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
                AI automation saved 14hrs/week
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 shrink-0" aria-hidden="true" />
        </div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="absolute z-20 -bottom-4 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:-bottom-6 sm:-right-4 lg:-right-6 bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 w-[calc(100%-2rem)] max-w-[280px] sm:w-72"
      role="status"
      aria-label="New high-ticket lead captured via Stryvenix AI lead generation automation"
    >
      <div className="relative shrink-0">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="High-ticket lead captured automatically by Stryvenix AI lead generation system"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          loading="eager"
          fetchPriority="low"
          decoding="async"
          width="48"
          height="48"
        />
        <div
          className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center"
          aria-hidden="true"
        >
          <Bell className="w-2.5 h-2.5 text-white" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Just now</p>
        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
          New high-ticket lead captured
        </p>
      </div>
    </motion.div>
  </figure>
);

/* ════════════════════════════════════════════════════════════
   6. STATS STRIP
   ════════════════════════════════════════════════════════════ */
const stats = [
  { value: '20+',   label: 'Startups Launched',   sub: 'US, UK & India'      },
  { value: '2–4wk', label: 'Website Delivery Time', sub: 'Average timeline'    },
  { value: '14hrs', label: 'Saved per Week',         sub: 'Via AI automation'  },
  { value: '4.6★',  label: 'Client Rating',          sub: '20 verified reviews' },
];

const StatsStrip = () => (
  <motion.dl
    id="hero-stats"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.1, duration: 0.6 }}
    className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 w-full"
    aria-label="Stryvenix key performance statistics"
  >
    {stats.map(({ value, label, sub }) => (
      <div key={label} className="flex flex-col gap-0.5">
        <dt className="sr-only">{label}</dt>
        <dd
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          aria-label={`${value} — ${label}`}
        >
          {value}
        </dd>
        <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">{sub}</span>
      </div>
    ))}
  </motion.dl>
);

/* ════════════════════════════════════════════════════════════
   7. VISIBLE TESTIMONIALS WITH REVIEW MICRODATA
   ════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    quote: 'Conversion rate jumped significantly after launch. Best agency decision we made.',
    author: 'Alex M.',
    role: 'Startup Founder',
    location: 'United States',
    rating: 5,
    date: '2025-12-10',
    img: 46,
  },
  {
    quote: 'Our team saved 14 hours a week after Stryvenix built our workflow automation.',
    author: 'Priya S.',
    role: 'Operations Lead',
    location: 'India',
    rating: 5,
    date: '2025-11-18',
    img: 47,
  },
  {
    quote: 'Lead capture up 40%. Best investment we made this year — bar none.',
    author: 'James T.',
    role: 'Founder',
    location: 'United Kingdom',
    rating: 5,
    date: '2026-01-22',
    img: 48,
  },
];

const TestimonialsStrip = () => (
  <motion.section
    id="hero-testimonials"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.25, duration: 0.6 }}
    aria-label="Client testimonials"
    className="mt-8 w-full"
  >
    <h2 className="sr-only">What Stryvenix clients say</h2>
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="list">
      {TESTIMONIALS.map(({ quote, author, role, location, rating, date, img }) => (
        <li
          key={author}
          itemScope
          itemType="https://schema.org/Review"
          className="bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 rounded-2xl p-4 flex flex-col gap-3"
        >
          <span
            itemScope
            itemType="https://schema.org/Organization"
            itemProp="itemReviewed"
            className="sr-only"
          >
            <span itemProp="name">Stryvenix</span>
            <link itemProp="url" href={SITE_URL} />
          </span>

          <div
            itemScope
            itemType="https://schema.org/Rating"
            itemProp="reviewRating"
            className="flex gap-0.5"
          >
            <meta itemProp="ratingValue" content={String(rating)} />
            <meta itemProp="bestRating"  content="5" />
            <meta itemProp="worstRating" content="1" />
            <StarRating
              count={rating}
              label={`${rating} out of 5 stars — review by ${author}`}
            />
          </div>

          <div className="flex gap-2">
            <Quote
              className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p
              itemProp="reviewBody"
              className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
            >
              {quote}
            </p>
          </div>

          <footer className="flex items-center gap-2.5 mt-auto pt-2 border-t border-slate-100 dark:border-slate-700/50">
            <img
              src={`https://i.pravatar.cc/60?img=${img}`}
              alt={`${author} — Stryvenix client from ${location}`}
              className="w-7 h-7 rounded-full object-cover shrink-0"
              loading="lazy"
              decoding="async"
              width="28"
              height="28"
            />
            <div>
              <p
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
                className="text-xs font-bold text-slate-900 dark:text-white"
              >
                <span itemProp="name">{author}</span>
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                {role} · {location}
              </p>
            </div>
            <time
              itemProp="datePublished"
              dateTime={date}
              className="ml-auto text-[10px] text-slate-400 dark:text-slate-500"
            >
              {new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </time>
          </footer>
        </li>
      ))}
    </ul>
  </motion.section>
);

/* ════════════════════════════════════════════════════════════
   8. SMOOTH SCROLL HELPER
   ════════════════════════════════════════════════════════════ */
const scrollToSection = (e, id) => {
  e.preventDefault();
  const elem = document.getElementById(id);
  if (elem) {
    const top = elem.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

/* ════════════════════════════════════════════════════════════
   9. MAIN HERO SECTION
   ════════════════════════════════════════════════════════════ */
export default function Hero() {
  return (
    <>
      <JsonLd />

      <section
        id="hero"
        role="banner"
        aria-labelledby="hero-heading"
        aria-describedby="hero-description"
        itemScope
        itemType="https://schema.org/LocalBusiness"
        className="relative min-h-screen flex items-start sm:items-center pt-24 sm:pt-28 pb-20 sm:pb-24 bg-slate-50 dark:bg-[#020617] transition-colors duration-500"
      >
        <meta itemProp="name"        content="Stryvenix" />
        <meta itemProp="url"         content={SITE_URL} />
        <meta itemProp="image"       content={`${SITE_URL}/og-image.png`} />
        <meta itemProp="description" content="Stryvenix is a website design, AI & automation agency helping startups and businesses in the US, UK, and India build high-converting digital products." />
        <meta itemProp="areaServed"  content="US, UK, India" />
        <meta itemProp="priceRange"  content="$$" />
        <meta itemProp="telephone"   content="+1-800-STRYVENIX" />
        
        <address
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
          className="not-italic sr-only"
          aria-label="Stryvenix contact information"
        >
          <span itemProp="name">Stryvenix</span>
          {' — '}
          <span itemProp="addressCountry">India</span>
          {' · '}
          <a href="mailto:hello@stryvenix.com" itemProp="email">hello@stryvenix.com</a>
          {' · '}
          <a href="tel:+1800STRYVENIX" itemProp="telephone">+1-800-STRYVENIX</a>
        </address>
        <link itemProp="sameAs" href="https://www.linkedin.com/company/stryvenix" />
        <link itemProp="sameAs" href="https://twitter.com/stryvenix" />
        <link itemProp="sameAs" href="https://www.instagram.com/stryvenix" />

        <nav aria-label="Stryvenix services navigation" className="sr-only">
          <h2>Our Services</h2>
          <ul>
            <li><a href="/services/website-design">Website Design &amp; Development for Startups — US, UK &amp; India</a></li>
            <li><a href="/services/ai-solutions">Custom AI Solutions &amp; AI Integration for Businesses</a></li>
            <li><a href="/services/automation">Business Process Automation &amp; Workflow Automation Agency</a></li>
            <li><a href="/services/mvp-development">MVP Development Agency — Launch Your Startup in 3–6 Weeks</a></li>
            <li><a href="/services/landing-pages">Landing Page Design &amp; Conversion Rate Optimisation (CRO)</a></li>
          </ul>
        </nav>

        <nav aria-label="Breadcrumb" className="sr-only">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <a itemProp="item" href={SITE_URL}>
                <span itemProp="name">Home — Stryvenix Website Design &amp; AI Agency</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
          </ol>
        </nav>

        <section aria-label="Frequently asked questions about Stryvenix" className="sr-only">
          <h2>Frequently Asked Questions about Stryvenix</h2>
          <dl>
            <dt>What services does Stryvenix offer?</dt>
            <dd>Website design and development, AI solutions, business process automation, MVP development, and landing page CRO for startups in the US, UK, and India.</dd>
            <dt>How quickly can Stryvenix launch a website?</dt>
            <dd>Most Stryvenix projects launch within 2–4 weeks. MVP builds go live in 3–6 weeks.</dd>
            <dt>How much does website design cost at Stryvenix?</dt>
            <dd>Website design starts from $1,500 USD. AI integrations start from $2,000 USD.</dd>
            <dt>Does Stryvenix build AI chatbots?</dt>
            <dd>Yes. Custom AI chatbots powered by OpenAI and Anthropic APIs for lead capture and workflow automation.</dd>
            <dt>Is Stryvenix suitable for early-stage startups?</dt>
            <dd>Yes. Stryvenix works with pre-seed, seed, and Series A startups with lean packages.</dd>
          </dl>
        </section>

        <section aria-label="Technologies used by Stryvenix" className="sr-only">
          <h2>Technology Stack</h2>
          <p>
            Stryvenix builds with React, Next.js, TypeScript, Tailwind CSS,
            Framer Motion, Node.js, Supabase, Vercel, OpenAI API, Anthropic
            Claude API, and n8n for workflow automation.
          </p>
        </section>

        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-grain z-10"></div>
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-[80px] sm:blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-purple-500/10 rounded-full blur-[80px] sm:blur-[120px]"
          />
          <motion.div
            animate={{ backgroundPositionY: ['0px', '24px'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
          />
        </div>

        <main className="container mx-auto px-4 sm:px-6 relative z-20 max-w-7xl">
          {/* FIX APPLIED HERE: Changed `items-center` to `items-start` on the grid parent 
            so the right column aligns to the top of the text block rather than centering vertically. 
          */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-6 min-h-0 text-left flex flex-col items-start">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm mb-6 sm:mb-8 backdrop-blur-sm max-w-full"
              >
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 truncate">
                  Website Design &amp; AI Automation Agency — US, UK &amp; India
                </span>
              </motion.div>

              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-slate-900 dark:text-white mb-5 sm:mb-6 leading-[1.15] sm:leading-[1.1]"
                itemProp="slogan"
              >
                <span className="sr-only">
                  Stryvenix — Website Design Agency &amp; AI Automation Agency.
                  High-converting websites &amp; AI-powered systems built to scale
                  your startup in the US, UK &amp; India.
                </span>
                <span className="font-semibold block" aria-hidden="true">
                  <AnimatedText text="High-converting websites &" />
                </span>
                <span
                  className="font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-purple-700 dark:from-blue-500 dark:via-cyan-500 dark:to-purple-500 opacity-90 pb-1 sm:pb-2"
                  aria-hidden="true"
                >
                  <AnimatedText text="AI-powered systems built to scale." delay={0.4} />
                </span>
              </h1>

              <motion.p
                id="hero-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 sm:mb-10 max-w-xl leading-relaxed font-medium"
                itemProp="description"
              >
                Stryvenix is a{' '}
                <strong className="font-semibold text-slate-800 dark:text-slate-200">
                  website design &amp; <abbr title="Artificial Intelligence">AI</abbr> automation agency
                </strong>{' '}
                that builds conversion-focused websites,{' '}
                <abbr title="Artificial Intelligence">AI</abbr> solutions, and
                automation systems that launch{' '}
                <abbr title="Minimum Viable Product">MVP</abbr>s faster — trusted by{' '}
                <strong className="font-semibold text-slate-800 dark:text-slate-200">
                  20+ startups &amp; businesses
                </strong>{' '}
                across the{' '}
                <strong className="font-semibold text-slate-800 dark:text-slate-200">
                  US, UK &amp; India
                </strong>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="w-full flex flex-col items-start"
              >
                <div className="flex flex-col min-[480px]:flex-row gap-3 sm:gap-4 justify-start w-full sm:w-auto">

                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-[480px]:w-auto relative group overflow-hidden px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-base sm:text-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(100,100,255,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 inline-flex items-center justify-center"
                    aria-label="Book a free 30-minute discovery call with Stryvenix — website design and AI automation agency"
                    title="Book a free strategy call with Stryvenix — website design & AI automation"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Book a Free Call
                      <ArrowRight
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform shrink-0"
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                      aria-hidden="true"
                    ></span>
                  </a>

                  <a
                    href="#services"
                    onClick={(e) => scrollToSection(e, 'services')}
                    className="w-full min-[480px]:w-auto group px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white dark:bg-transparent border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white font-semibold text-base sm:text-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    aria-label="View Stryvenix portfolio — website design, AI automation and startup case studies"
                    title="View Stryvenix portfolio and client case studies"
                  >
                    <span
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0"
                      aria-hidden="true"
                    >
                      <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 dark:text-white" />
                    </span>
                    View Our Work
                  </a>
                </div>

                <p className="mt-4 sm:mt-5 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                  <Clock size={16} className="text-amber-500 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
                  <span>
                    Limited client slots this quarter —&nbsp;
                    <strong className="text-slate-700 dark:text-slate-300">only 3 spots remaining</strong>
                  </span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-slate-200/60 dark:border-slate-800/60 w-full"
                itemScope
                itemType="https://schema.org/AggregateRating"
              >
                <span
                  itemScope
                  itemType="https://schema.org/Organization"
                  itemProp="itemReviewed"
                  className="sr-only"
                >
                  <span itemProp="name">Stryvenix</span>
                  <link itemProp="url" href={SITE_URL} />
                </span>
                <meta itemProp="ratingValue" content="5" />
                <meta itemProp="bestRating"  content="5" />
                <meta itemProp="worstRating" content="1" />
                <meta itemProp="reviewCount" content="50" />

                <AvatarGroup count={4} />

                <div className="text-left">
                  <StarRating label="Stryvenix rated 5 out of 5 stars by 50 clients" />
                  <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-400 mt-1.5">
                    Trusted by{' '}
                    <strong className="text-slate-900 dark:text-white font-bold">
                      20+ startups &amp; founders
                    </strong>{' '}
                    <br className="hidden sm:block" />
                    across the US, UK &amp; India
                  </p>
                </div>
              </motion.div>

              <StatsStrip />
              <TestimonialsStrip />
            </div>

            {/* FIX APPLIED HERE: Added `lg:sticky lg:top-24` alongside `lg:col-span-6`. 
              This ensures that as you scroll down the long left column, the aligned dashboard 
              perfectly follows alongside the text instead of vanishing or dragging the layout down.
            */}
            <div className="lg:col-span-6 min-h-0 relative mt-12 lg:mt-0 w-full lg:sticky lg:top-24">
              <PerformanceShowcase />
            </div>

          </div>
        </main>
      </section>
    </>
  );
}