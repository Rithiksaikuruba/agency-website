// ============================================================
// services.js — SEO-Optimized Service Data for Stryvenix
// Keywords: website building, AI, automation, Stryvenix
// Each field is crafted to feed into on-page SEO and
// JSON-LD schema markup (Services & OfferCatalog).
// ============================================================

export const services = [

  // ── WEBSITE SERVICES ─────────────────────────────────────

  {
    id: 1,
    category: 'Website Design',
    title: 'Landing Page Design',
    shortTitle: 'Landing Pages',
    // SEO: H2/H3 heading text — target keyword embedded
    seoHeading: 'High-Converting Landing Page Design Services',
    description:
      'Launch campaigns faster with professionally designed landing pages built to convert. Our Stryvenix landing pages combine persuasive copywriting, mobile-first design, and A/B-tested layouts — so every visitor has a reason to act.',
    // SEO: longer paragraph for on-page body content
    longDescription:
      'Whether you need a lead generation page, product launch page, or event registration page, Stryvenix delivers pixel-perfect landing pages optimized for conversions. We build on React or plain HTML/CSS for blazing-fast load speeds — a direct Google ranking factor. Every landing page we design is SEO-structured with proper H1/H2 hierarchy, meta tags, and schema markup.',
    features: [
      'Mobile-first, responsive design',
      'SEO-optimized structure & meta tags',
      'Fast load speed (Core Web Vitals optimized)',
      'Lead capture forms & CTA optimization',
      'A/B testing ready',
      'Google Analytics & Pixel integration',
    ],
    price: 'from $499',
    priceRange: '$$',
    deliveryTime: '3–5 business days',
    // Used in JSON-LD schema
    schemaType: 'WebDesign',
    icon: 'layout',
    slug: 'landing-page-design',
    keywords: ['landing page design', 'high-converting landing pages', 'lead generation pages', 'website design agency'],
  },

  {
    id: 2,
    category: 'Website Design',
    title: 'Business Website Development',
    shortTitle: 'Business Websites',
    seoHeading: 'Professional Business Website Design & Development',
    description:
      'Get a complete, custom-built business website that ranks on Google, looks stunning, and turns visitors into customers. Stryvenix delivers end-to-end website solutions for service businesses, startups, and product brands.',
    longDescription:
      'A great business website is more than just good looks — it needs to rank. Stryvenix builds business websites with full on-page SEO baked in from day one: semantic HTML5, structured data, optimized images, sitemap.xml, and robots.txt. Our websites are built on modern stacks (React, Next.js, or custom HTML/CSS) for maximum performance across the US, UK, and India markets.',
    features: [
      'Custom design (no templates)',
      'Full on-page SEO setup',
      'Schema markup (JSON-LD)',
      'Sitemap.xml & robots.txt',
      'Contact forms & booking integrations',
      'CMS integration (if needed)',
      'Google Search Console setup',
    ],
    price: 'from $1,999',
    priceRange: '$$$',
    deliveryTime: '2–4 weeks',
    schemaType: 'WebSite',
    icon: 'monitor',
    slug: 'business-website-development',
    keywords: ['business website design', 'professional website development', 'website building agency', 'Stryvenix website'],
  },

  {
    id: 3,
    category: 'Website Design',
    title: 'Website Redesign Service',
    shortTitle: 'Website Redesigns',
    seoHeading: 'Website Redesign Services — Modernize & Rank Higher',
    description:
      'Is your website outdated, slow, or losing you leads? Stryvenix transforms old, underperforming websites into modern, fast, conversion-focused digital experiences — without losing your existing SEO rankings.',
    longDescription:
      'Our website redesign process starts with a full SEO audit of your current site. We preserve high-performing URLs, fix technical SEO issues, and rebuild your site with modern design patterns and performance best practices. The result: a website that looks better, loads faster, and ranks higher on Google — in the US, UK, or India.',
    features: [
      'Full SEO audit before redesign',
      'URL structure & redirect preservation',
      'Performance optimization (Core Web Vitals)',
      'Modern UI/UX redesign',
      'Mobile responsiveness overhaul',
      'Post-launch SEO monitoring',
    ],
    price: 'Custom Quote',
    priceRange: '$$$',
    deliveryTime: '3–6 weeks',
    schemaType: 'WebSite',
    icon: 'refresh-cw',
    slug: 'website-redesign-service',
    keywords: ['website redesign', 'website revamp', 'modernize website', 'website redesign agency'],
  },

  {
    id: 4,
    category: 'Website Design',
    title: 'Conversion Rate Optimization',
    shortTitle: 'Conversion Improvements',
    seoHeading: 'Conversion Rate Optimization (CRO) Services',
    description:
      'More traffic is useless if your website doesn\'t convert. Stryvenix analyzes your current site and implements data-driven CRO strategies — turning your existing visitors into paying customers.',
    longDescription:
      'Stryvenix\'s Conversion Rate Optimization service identifies the exact friction points costing you leads and revenue. From heatmap analysis and user behavior tracking to CTA redesigns and checkout flow optimization — we make every click count. CRO is one of the highest-ROI investments any business can make.',
    features: [
      'Heatmap & behavior analytics',
      'CTA design & placement optimization',
      'Form & checkout flow improvements',
      'Page speed optimization',
      'Trust signal & social proof additions',
      'A/B test setup & reporting',
    ],
    price: 'Custom Quote',
    priceRange: '$$',
    deliveryTime: 'Ongoing / Monthly',
    schemaType: 'MarketingService',
    icon: 'trending-up',
    slug: 'conversion-rate-optimization',
    keywords: ['conversion rate optimization', 'CRO services', 'increase website conversions', 'website optimization'],
  },

  // ── AI SERVICES ──────────────────────────────────────────

  {
    id: 5,
    category: 'AI Solutions',
    title: 'AI Chatbot Development',
    shortTitle: 'AI Chatbots',
    seoHeading: 'Custom AI Chatbot Development for Businesses',
    description:
      'Deploy intelligent AI chatbots on your website or app that handle customer queries 24/7, qualify leads, and book appointments — all without human intervention. Built by Stryvenix.',
    longDescription:
      'Stryvenix builds custom AI chatbots powered by large language models (LLMs) like GPT-4 and Claude. Whether you need a customer support bot, a lead qualification assistant, or an internal knowledge base tool — our AI solutions are trained on your business data and seamlessly integrated into your existing website or CRM.',
    features: [
      'Trained on your business data',
      'Website & WhatsApp integration',
      'Lead qualification & appointment booking',
      '24/7 automated customer support',
      'CRM & Zapier integration',
      'Analytics dashboard',
    ],
    price: 'from $799',
    priceRange: '$$$',
    deliveryTime: '1–3 weeks',
    schemaType: 'SoftwareApplication',
    icon: 'bot',
    slug: 'ai-chatbot-development',
    keywords: ['AI chatbot development', 'custom AI chatbot', 'AI for business', 'chatbot agency', 'AI solutions'],
  },

  {
    id: 6,
    category: 'AI Solutions',
    title: 'AI Integration Services',
    shortTitle: 'AI Integrations',
    seoHeading: 'AI Integration Services for Websites & Business Tools',
    description:
      'Add AI superpowers to your existing website, app, or software. Stryvenix integrates OpenAI, Claude, Gemini, and other AI APIs directly into your business workflows and digital products.',
    longDescription:
      'From AI-powered content generators and smart search to automated reporting and predictive analytics — Stryvenix connects cutting-edge AI APIs to the tools your business already uses. We handle the full integration: API setup, backend logic, front-end UI, and testing.',
    features: [
      'OpenAI / Claude / Gemini API integration',
      'AI-powered content generation',
      'Smart search & recommendation engines',
      'Predictive analytics dashboards',
      'Custom AI model fine-tuning',
      'Secure API key management',
    ],
    price: 'Custom Quote',
    priceRange: '$$$',
    deliveryTime: '2–5 weeks',
    schemaType: 'SoftwareApplication',
    icon: 'cpu',
    slug: 'ai-integration-services',
    keywords: ['AI integration', 'OpenAI integration', 'AI API development', 'AI solutions for business', 'Stryvenix AI'],
  },

  // ── AUTOMATION SERVICES ───────────────────────────────────

  {
    id: 7,
    category: 'Automation',
    title: 'Business Workflow Automation',
    shortTitle: 'Workflow Automation',
    seoHeading: 'Business Workflow Automation Services | Save Time & Scale',
    description:
      'Stop doing repetitive tasks manually. Stryvenix designs and deploys custom automation workflows that connect your tools, eliminate bottlenecks, and let your team focus on what actually matters.',
    longDescription:
      'Using tools like Make (Integromat), Zapier, n8n, and custom APIs, Stryvenix automates your entire business operations — from lead capture and CRM updates to invoice generation and email sequences. Our automation solutions are built for businesses in the US, UK, and India looking to scale without increasing headcount.',
    features: [
      'Zapier / Make / n8n workflow builds',
      'CRM automation (HubSpot, Salesforce, etc.)',
      'Email & SMS automation',
      'Lead nurture pipeline automation',
      'Invoice & reporting automation',
      'Cross-platform data sync',
    ],
    price: 'from $599',
    priceRange: '$$',
    deliveryTime: '1–2 weeks',
    schemaType: 'SoftwareApplication',
    icon: 'zap',
    slug: 'business-workflow-automation',
    keywords: ['business automation', 'workflow automation', 'Zapier automation', 'AI automation agency', 'automation services'],
  },

  {
    id: 8,
    category: 'Automation',
    title: 'AI-Powered Automation',
    shortTitle: 'AI Automation',
    seoHeading: 'AI-Powered Automation Services for Modern Businesses',
    description:
      'Combine the power of AI with automation to build truly intelligent systems. Stryvenix creates AI automation pipelines that make decisions, generate content, and take actions — completely on autopilot.',
    longDescription:
      'AI automation goes beyond simple if-this-then-that rules. Stryvenix builds intelligent automation systems that use AI to classify data, generate responses, summarize documents, and route tasks — making your business operations smarter with every cycle. Perfect for scaling customer support, content production, data processing, and lead management.',
    features: [
      'AI + automation pipeline design',
      'Automated AI content generation',
      'Intelligent lead routing & scoring',
      'Document processing & summarization',
      'AI-powered customer support workflows',
      'Performance monitoring & optimization',
    ],
    price: 'from $999',
    priceRange: '$$$',
    deliveryTime: '2–4 weeks',
    schemaType: 'SoftwareApplication',
    icon: 'sparkles',
    slug: 'ai-powered-automation',
    keywords: ['AI automation', 'AI automation agency', 'intelligent automation', 'AI business automation', 'Stryvenix automation'],
  },

];

// ── HELPERS ───────────────────────────────────────────────────

// Group services by category (useful for rendering and schema)
export const servicesByCategory = services.reduce((acc, service) => {
  if (!acc[service.category]) acc[service.category] = [];
  acc[service.category].push(service);
  return acc;
}, {});

// All unique categories
export const serviceCategories = Object.keys(servicesByCategory);

// Get a service by slug (useful for individual service pages / SEO routes)
export const getServiceBySlug = (slug) =>
  services.find((s) => s.slug === slug) || null;

// All keywords flattened (useful for dynamic meta tag generation)
export const allServiceKeywords = [
  ...new Set(services.flatMap((s) => s.keywords)),
].join(', ');