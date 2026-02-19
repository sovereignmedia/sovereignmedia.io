'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { GridBackground, GlowOrb } from '@/components/effects/GridBackground'

// ============================================
// Animation config
// ============================================

const easeOutExpo = [0.16, 1, 0.3, 1] as const

// ============================================
// TYPES
// ============================================

interface SubItem {
  title: string
  details: string[]
}

interface Deliverable {
  id: string
  title: string
  description: string
  status: 'In Development' | 'Planned' | 'Completed' | 'Under Review' | 'Ongoing'
  progress: number // 0-100
  progressLabel?: string // e.g. "Prototype Phase" or "Architecture Complete"
  subItems?: SubItem[]
  details?: string[]
}

interface ProofOfWorkEntry {
  date: string
  title: string
  description: string
  tasks?: string[]
}

// ============================================
// DATA — Edit these to update content
// ============================================

const PAGE_TITLE = 'Reg A+ and IPO Investor Intelligence & Marketing Package'
const PAGE_SUBTITLE = 'Development of Digital Interactive Web Tools for Retail and Institutional Investors'
const CLIENT_NAME = 'Frontieras North America'

const ENGAGEMENT_OVERVIEW =
  "This proposal outlines the development and deployment of comprehensive digital intelligence tools and marketing assets designed to accelerate Frontieras' Reg A+ raise, support IPO positioning, and maximize return on advertising spend across retail and institutional investor markets."

const DELIVERABLES: Deliverable[] = [
  {
    id: 'dashboards',
    title: 'Interactive Investor Intelligence Dashboards',
    description: 'Development of two interactive digital dashboards for retail and institutional investors',
    status: 'In Development',
    progress: 20,
    progressLabel: 'Prototype Phase',
    subItems: [
      {
        title: 'Retail Investor Dashboard — The "Investor Dashboard"',
        details: [
          'Convert retail interest into funded investments. Make the Frontieras story so compelling, clear, and shareable that investors feel they would be foolish not to participate.',
          'Drive the Reg A from $11M to $75M',
          'Interactive digital dashboard allowing current and prospective retail investors to explore the company\'s value proposition, roadmap, and technology',
          'Can be linked to DealMaker web platform and distributed to existing and prospective shareholder base via email and comms',
          'Prioritizes story, emotion, and interactive exploration — each module answers a specific investor question and moves them closer to clicking "Invest"',
          'Designed to align with existing company materials and design aesthetics to instill confidence',
          'Advanced financial modeling tools based on publicly available company documentation',
        ],
      },
      {
        title: 'Institutional Investor Dashboard',
        details: [
          'Comprehensive research and due diligence hub for institutional investors, analysts, and fund managers',
          'Satisfy every standard institutional question in one visit',
          'Function as a leave-behind tool after management presentations',
          'Interactive dashboard enabling prospective institutional investors to explore company history, timelines of execution, technology, value proposition, roadmap, financials, risk mitigation profile, and more',
          'Designed as collateral to support IPO and institutional raise efforts',
          'Prioritizes data density, risk transparency, and management credibility',
          "Per Stan Abiassi's guidance: institutions need to quickly satisfy their downside risk assessment before engaging with upside potential — dashboard structured accordingly",
          'Structured for distribution by Hybrid Financial, IR Firm, and Frontieras management team',
        ],
      },
    ],
  },
  {
    id: 'digital-assets',
    title: 'Digital Assets for Reg A+ and Post-IPO Marketing',
    description: 'Development and deployment of digital assets for social media marketing and investor conversion',
    status: 'Planned',
    progress: 0,
    progressLabel: 'Not Started',
    details: [
      'Deployment of specific dashboard assets onto DealMaker investor portal to increase conversion rates (e.g., market penetration calculator, global patents map)',
      'Video content development',
      'Advertising copy and strategy',
      'Digital tools for evaluation of company value proposition',
    ],
  },
  {
    id: 'campaign-strategy',
    title: 'Digital Strategy for Reg A+ Campaign Optimization',
    description: 'Accelerate the Reg A+ raise timeline while ensuring highest ROAS possible on $75M raise',
    status: 'Planned',
    progress: 0,
    progressLabel: 'Not Started',
    details: [
      'Target: elevation from 4-5x ROAS to at least 6-10x ROAS',
      'On a $75M raise, this can save Frontieras anywhere from $2.5M–$7.5M in capital acquisition costs on advertising',
      'Development and deployment of highest-yield digital assets for Reg A+ marketing',
      'Implementation across company website, DealMaker investment landing page, and Facebook/Instagram/online advertising',
      'Materials created have additional benefit of supporting post-IPO marketing',
      'Coordination with DealMaker and IR as necessary for deployment',
    ],
  },
  {
    id: 'coordination',
    title: 'Coordination & Integration',
    description: 'Cross-functional coordination across all stakeholders to ensure proper implementation and distribution',
    status: 'Ongoing',
    progress: 10,
    progressLabel: 'Initial Assessment',
    details: [
      'Coordination with software developers as needed for dashboard development',
      'Coordination with Frontieras, Market Street Capital, Hybrid Financial, IR firm, and other firms for institutional dashboard implementation',
      'Coordination with Frontieras and DealMaker for retail dashboard implementation',
      'Coordination with Frontieras and DealMaker regarding Reg A+ campaign optimization',
      'Coordination with video editors and animators for campaign asset development',
    ],
  },
]

const PROOF_OF_WORK: Record<string, ProofOfWorkEntry[]> = {
  dashboards: [
    {
      date: 'February 2026',
      title: 'Executive Summary',
      description:
        'Designed, engineered, and iteratively refined a comprehensive interactive financial modeling dashboard purpose-built for institutional investor presentations and executive strategy sessions. The application features real-time scenario modeling across three investment cases, global market analysis spanning 9 patent-protected countries, detailed unit economics for 6 FASForm™ product lines, multi-methodology company valuation analysis, and an interactive 3D globe visualization of global patent coverage. Built to institutional investor standards with premium visual design benchmarked against companies including Palantir, Stripe, Linear, and Apple.',
    },
    {
      date: 'February 2026',
      title: 'Phase 1 — V2 Dashboard: Research & Analysis',
      description:
        'Competitive benchmarking, financial data verification, and global market research for the V2 single-file React application.',
      tasks: [
        'Competitive design benchmarking — Analyzed 9 industry-leading platforms (Palantir, Stripe, Linear, Apple, Vercel, and others) to establish visual design standards, extracting core design principles across typography, color systems, depth/layering, spatial design, and atmospheric effects',
        'Financial data audit and verification — Conducted comprehensive cross-referencing of every hardcoded financial figure across the entire dashboard against source financial documents, verifying revenue projections, EBITDA margins, net income figures, depreciation schedules, CapEx costs, and production volumes across 15+ data categories',
        'Global coal market research — Compiled and structured market opportunity data across 9 international markets including production volumes, reserve estimates, regulatory environments, market sizes, and FASForm™ patent coverage percentages, establishing that 91% of global coal production falls within patent-protected territories',
        'Daily production output validation — Independently calculated daily output figures for liquid fuels and chemical byproducts against monthly/annual source data to ensure presentation accuracy',
      ],
    },
    {
      date: 'February 2026',
      title: 'Phase 1 — V2 Dashboard: Strategy & Architecture',
      description:
        'Application architecture design, information architecture, and infrastructure planning for the V2 dashboard.',
      tasks: [
        'Application architecture design — Architected a self-contained single-file React application with centralized color system, modular component structure, and inline styling architecture optimized for rapid iteration and zero-dependency deployment',
        'Information architecture — Structured 7 major dashboard sections with logical narrative flow optimized for investor presentation storytelling: Executive Summary → Unit Economics → Growth Projections → Valuation Analysis → Financial Health → Global Markets → Interactive Calculator',
        'Phase state machine design — Engineered a 7-state transition system (login → login-exit → boot-enter → boot → boot-exit → dashboard-enter → dashboard) enabling cinematic transitions between application phases with independent animation control per layer',
        'Multi-file serving architecture — Designed modular build pipeline separating font assets, compiled application code, and HTML entry point for efficient loading and CDN dependency management',
        'Backup and version control system — Designed and implemented a versioned backup system with naming conventions, restore procedures, and a detailed version registry documenting features, known issues, and restoration instructions for each snapshot',
        'Session continuity infrastructure — Created comprehensive project documentation system (CLAUDE.md, WORK-LOG.md, VERSION-HISTORY.md) ensuring development continuity across sessions with zero context loss',
      ],
    },
    {
      date: 'February 2026',
      title: 'Phase 1 — V2 Dashboard: Design & User Experience',
      description:
        'Premium visual design system, typography, cinematic boot sequence, and interaction design.',
      tasks: [
        'Premium visual design system — Developed comprehensive design language targeting $2B+ valuation company aesthetic standards, including deep dark navy color palette (#060a14 foundation), atmospheric lighting effects (green and gold radial gradient glows), glassmorphic card treatments (rgba borders, layered box-shadows), and surgical accent color usage (green #00cc88 for growth, gold #d4a852 for value)',
        'Typography hierarchy system — Established multi-level type system using custom MicroSquare font family across 6+ scales: 44-52px hero headlines (800-weight, tight tracking), 28-36px KPI numbers, 17px section headers, 15-16px body text, 11px uppercase labels with wide letter-spacing — all optimized for data-dense financial content at presentation scale',
        'Cinematic boot sequence — Designed premium initialization experience with 8 contextual status messages referencing actual dashboard modules, smooth accelerating progress bar with green gradient glow, animated dots indicator, and user-gated "Enter Dashboard" button — establishing product gravitas before content reveal',
        'Hero section with staggered reveal — Engineered cascading entrance animation across 8 elements with individually timed delays creating a premium sequential reveal effect',
        'Card hover micro-interactions — Implemented subtle lift + glow effects across 19 section cards with cubic-bezier decelerate curves for premium tactile feedback',
        'Scroll-triggered reveal system — Built IntersectionObserver-based animation system that fades in cards below the fold as users scroll, with automatic reset on tab changes for fresh animations when revisiting content',
        'Login screen design — Created atmospheric login experience with gradient card styling, green ambient glow, gold "Confidential" label, and glassmorphic input styling matching overall design language',
        'Tab navigation redesign — Multiple iterations ultimately implementing a 2×2 CSS Grid layout with gold hover glow effects (triple-layer box-shadow) and MicroSquare typography',
        'Frosted glass button system — Designed consistent frosted glass pill button aesthetic used across "How to Use This Dashboard," "What Do These Mean?" and "Send Email" — featuring backdrop blur, translucent white backgrounds, subtle inner highlights, and coordinated hover state transitions',
        '"How to Use This Dashboard" guide modal — Designed comprehensive onboarding modal with glassmorphic card, 4 module explanation cards, and tips section optimized for readability',
        'Calculator visual hierarchy refinement — Iteratively refined the Global Expansion & Valuation Calculator through multiple rounds: unified labels, established clear visual hierarchy, organized results into logical groupings',
      ],
    },
    {
      date: 'February 2026',
      title: 'Phase 1 — V2 Dashboard: Technical Development',
      description:
        'Full-stack application development, 3D globe visualization, dynamic calculation engine, and animation systems.',
      tasks: [
        'Full-stack application development — Built complete self-contained React application (~3,000+ lines) with centralized color system, custom component library (StatCard, SectionTitle, Tab), and no external dependencies beyond CDN core libraries',
        'Interactive 3D globe visualization — Engineered Canvas 2D globe using D3.js with orthographic projection, real Natural Earth GeoJSON data, drag-to-rotate interaction, auto-rotation with intelligent pause, geographic hit-testing, patent country dot highlighting, back-side "see-through" patent markers via dual projection system, and custom tooltips for each of 9 countries',
        'Globe dual-projection rendering system — Implemented a secondary unclipped orthographic projection enabling patent country markers to render on the far side of the globe at reduced opacity, creating a "see-through" depth effect',
        'Antimeridian-safe geographic computation — Solved Russia\'s missing dot-matrix issue caused by d3.geoBounds() returning inverted longitude bounds for features crossing the 180° meridian',
        'Dynamic calculation engine — Engineered real-time financial computation system supporting multiple calculation modes (by facility count, revenue target, and market penetration), with dynamic outputs across facility scaling, product mix breakdowns, enterprise valuation, and share price projections',
        'Interactive scenario modeling system — Built toggle system allowing real-time switching between Conservative, Base, and Aggressive investment scenarios with immediate recalculation of all dependent financial projections',
        'Chart animation system — Implemented animation properties across all 15 Recharts data series with staggered begin times, consistent easing curves, and 1800-2000ms durations creating cascading visual reveals',
        'Phase transition animation engine — Built CSS transition system enabling smooth scale + opacity animations between login, boot, and dashboard phases, requiring fundamental restructure from three separate render trees to unified single-return architecture',
        'Authentication system — Implemented password-protected access layer securing confidential financial data with styled login gate',
        'HiDPI/Retina display support — Implemented devicePixelRatio-based canvas scaling for crisp globe rendering on high-density displays',
      ],
    },
    {
      date: 'February 2026',
      title: 'Phase 1 — V2 Dashboard: Data Modeling & Financial Analysis',
      description:
        'Multi-product unit economics, growth projections, valuation frameworks, and global market analysis.',
      tasks: [
        'Multi-product unit economics modeling — Built detailed per-unit economics displays for 6 distinct FASForm™ product lines with revenue breakdowns, margin calculations, and production volumes',
        '5-year growth projection modeling — Implemented forward-looking revenue, EBITDA, and facility scaling projections with interactive chart visualizations',
        'Triple valuation methodology framework — Integrated three institutional-grade valuation approaches (DCF analysis, comparable company analysis, market multiples) with interactive detail panels explaining methodology and assumptions',
        'Global market penetration analysis — Built penetration curve visualization showing enterprise valuation at 2%, 5%, 10%, 25%, and 50% of global coal production',
        'Global expansion calculator — Engineered interactive tool enabling users to model facility scaling across 9 countries with real-time financial output calculations, share price projections, and annual product output breakdowns',
        'Patent coverage quantification — Calculated and verified that FASForm™ patents cover 91% of global coal production across 9 countries, with 58 estimated facilities and $61B+ combined revenue potential at 1% market penetration',
      ],
    },
    {
      date: 'February 2026',
      title: 'Phase 1 — V2 Dashboard: Content Development',
      description:
        'Investor-grade copywriting, market narratives, and dashboard guide content.',
      tasks: [
        'Investor-grade copy development — Wrote and refined all dashboard copy including section titles, subtitles, explanatory text, tooltip content, and contextual descriptions optimized for institutional investor audience',
        'Country market narratives — Developed contextual descriptions for each of 9 international markets explaining regulatory environment, market opportunity, and strategic positioning',
        'Dashboard guide copy development — Researched and wrote comprehensive "How to Use This Dashboard" content covering all four modules with tips section',
      ],
    },
    {
      date: 'February 2026',
      title: 'Phase 1 — V2 Dashboard: Quality Assurance & Refinement',
      description:
        'Cross-device testing, financial data validation, and iterative design refinement.',
      tasks: [
        'Cross-device responsive testing — Identified and resolved card wrapping issues, slider alignment problems, tab button reflow, and layout inconsistencies across multiple screen sizes',
        'Financial data validation — Verified every financial calculation against source documents including PLANT_ECONOMICS margins (87.3% gross, 77.5% EBITDA, 66% net), daily production outputs, facility-level revenue and EBITDA figures, and calculator constants',
        'Iterative design refinement — Conducted multiple rounds of visual polish across color values, typography scales, spacing systems, hover effects, glow intensities, and transition curves based on direct user testing and feedback',
      ],
    },
    {
      date: 'February 2026',
      title: 'Phase 1 — V2 Dashboard: Deployment & Infrastructure',
      description:
        'Vercel production deployment, custom subdomain configuration, and deployment pipeline.',
      tasks: [
        'Vercel production deployment — Configured and deployed the complete dashboard application to Vercel\'s global edge network with automatic SSL, CDN distribution, and instant cache invalidation',
        'Custom subdomain configuration — Set up frontieras-dashboard.sovereignmedia.io as a branded custom domain with DNS A records and SSL certificate provisioning',
        'Deployment pipeline — Established repeatable one-command deployment workflow (vercel --prod) enabling instant production updates with zero-downtime deployments',
      ],
    },
    {
      date: 'February 2026',
      title: 'Phase 1 — V2 Dashboard: Proactive Improvements',
      description:
        'Self-initiated improvements including backup systems, architecture refactoring, and design consistency.',
      tasks: [
        'Versioned backup system — Designed and implemented backup procedures with 9 versioned snapshots, detailed restoration instructions, and feature documentation for each version — providing instant rollback capability',
        'Boot sequence user gating — Identified that auto-advancing from initialization to dashboard felt abrupt; proactively designed "Enter Dashboard" button with coordinated progress bar fade-out',
        'Unified render architecture — Identified that three-return-block architecture made CSS transitions impossible; proactively restructured to unified single-return with conditional layers',
        'Dead code cleanup — Identified and removed deprecated CSS keyframes, redundant style blocks, and unused data file references, reducing maintenance surface area',
        'Calculator results organization — Iteratively reorganized calculator output sections through multiple rounds based on user testing feedback',
        'Consistent button design language — Identified inconsistent button styles and proactively unified them into a cohesive frosted glass pill button system',
      ],
    },
    {
      date: 'February 2026',
      title: 'Phase 2 — V2 Component Extraction & Migration Planning',
      description:
        'Systematic extraction and documentation of every reusable component, design token, and interaction pattern from the 3,026-line V2 monolith into modular, portable reference files — creating a complete migration-ready blueprint for the V3 enterprise rebuild.',
      tasks: [
        '14-session extraction playbook — Designed and executed a systematic multi-session extraction plan covering every aspect of the V2 dashboard across 14 documented sessions, each targeting a specific subsystem',
        'Complete design token extraction (1,123 lines) — Extracted every color value, gradient, shadow, border, opacity scale, typography setting, spacing value, and compound visual recipe from V2 into a structured reference document — 16 core colors, 14 white opacity levels, 7 black opacity levels, 12 green accent scales, 18 box-shadow recipes, 11 gradients, and 30+ compound visual recipes',
        'Component index and dependency mapping — Created master index of all V2 components with line numbers, dependencies, complexity ratings, and extraction risk assessments — identifying high-risk components requiring verbatim preservation (D3 globe, compound visual effects, financial calculators)',
        'D3 globe extraction — Isolated the complete interactive globe component including orthographic projection, dual-projection back-side rendering, drag rotation, auto-rotation pause logic, country hit-testing, tooltip system, and all Canvas 2D rendering code',
        'Financial calculator logic extraction — Preserved exact calculation formulas for facility count mode, revenue target mode, and market penetration mode with all constants, multipliers, and derivation chains documented for verification against source financial model',
        'Animation and transition catalog — Documented every animation timing, easing curve, stagger delay, and phase transition across the V2 application — 12 unique durations, 3 easing curves, 11 stagger delay values, and the complete 7-state phase transition machine',
        'V3 architecture analysis — Conducted comprehensive analysis of the V3 codebase structure: 32 source files, 3,889 lines, Next.js 14 App Router with file-based routing, identifying integration paths for each extracted V2 component',
      ],
    },
    {
      date: 'February 2026',
      title: 'Phase 3 — V3 Enterprise Dashboard: Architecture & Scalability Engineering',
      description:
        'Complete rebuild on Next.js 14 enterprise architecture with TypeScript, Tailwind CSS, and a scalable component-based design system — engineered for continuous feature development, theming, and long-term maintainability while preserving the V2 visual identity.',
      tasks: [
        'Next.js 14 App Router architecture — Rebuilt the entire application on Next.js 14 with file-based routing, shared dashboard layout that wraps all child routes (authentication, sidebar, topbar, compliance footer), TypeScript for type safety, and React 18 with server/client component model',
        'Component-based design system — Established organized component architecture separating concerns across charts/, cards/, sections/, layout/, and ui/ directories — replacing the V2 monolith\'s inline approach with reusable, composable building blocks',
        'Scalability architecture guide — Created comprehensive ARCHITECTURE.md development standards document establishing: 150-line page file maximum, mandatory component extraction rules, Tailwind token enforcement, data layer separation requirements, import conventions, and incremental refactoring protocol — ensuring consistent code quality across all future development sessions',
        'Git-based version control — Migrated from manual backup snapshots to proper Git version control on GitHub with feature branching, descriptive commit checkpoints before and after every major change, and full rollback capability at any point in project history',
        'Work log and change documentation — Implemented WORK_LOG.md in the repository root documenting every session: date, objectives, files modified, architectural decisions, commit hashes, and verification results — providing both development continuity and client-facing work documentation',
      ],
    },
    {
      date: 'February 2026',
      title: 'Phase 3 — V3 Enterprise Dashboard: Theme System & V2 Color Migration',
      description:
        'CSS custom property architecture, V2 dark mode migration, light mode development, and systematic color token replacement.',
      tasks: [
        'CSS custom property architecture — Restructured the entire Tailwind configuration to use CSS custom properties (var(--bg-primary), var(--border-subtle), etc.) enabling runtime theme switching — backgrounds, text, borders, shadows, gradients, and scrollbars all respond to theme changes automatically',
        'V2 dark mode color system migration — Mapped and migrated every V2 color value into the dark mode theme: deep navy backgrounds (#060a14, #111a2e, #131d30), rgba white borders, layered card gradients, V2 atmospheric glow effects, and the complete shadow system — verified with zero visual regression across all 6 dashboard pages',
        'Light mode theme development — Designed and implemented a complete light mode counterpart with coordinated background, text, border, shadow, and gradient values optimized for daylight readability while maintaining premium aesthetic quality',
        'Dark/light mode toggle — Implemented theme switching using next-themes library with class-based strategy, animated toggle button (Framer Motion icon rotation), localStorage persistence, dark mode default, and smooth 200ms transition across all themed properties',
        '232 hardcoded color elimination — Systematically replaced 232 instances of hardcoded hex colors (bg-[#...], text-[#...], border-[#...]) across all page and component files with Tailwind design tokens, reducing the number of non-token colors from 232 to 3 (acceptable static accent dots)',
        'Chart and data visualization color unification — Aligned all Recharts stroke, fill, and gradient colors to the V2 palette: Revenue→#d4a852, EBITDA→#00cc88, Debt→#e84040, Valuation→#4088e8. Updated product colors, country colors, and scenario colors across all data files',
        'Theme-aware component updates — Updated Card component to use CSS variable gradients, Recharts tooltips scoped to .dark/.light selectors, scrollbar colors tied to theme variables, and atmospheric glow updated to V2 green/gold radial gradients',
      ],
    },
    {
      date: 'February 2026',
      title: 'Phase 3 — V3 Enterprise Dashboard: Dashboard Development',
      description:
        'Six-page dashboard application, shared layout system, interactive components, and data architecture.',
      tasks: [
        '6-page dashboard application — Built complete multi-page dashboard with Overview (6 metric cards), Unit Economics (6 product breakdowns with waterfall charts), Financial Projections (5-year charts + interactive FacilityScaler), Global Expansion (9-country grid with penetration calculator), Capital Formation (raise phases + use of proceeds), and Leadership (team profiles + advisory board)',
        'Shared dashboard layout system — Engineered dashboard layout wrapper providing authentication guard, collapsible sidebar navigation, breadcrumb topbar, atmospheric background glow, and compliance footer — automatically inherited by every dashboard route',
        'Interactive FacilityScaler component — Built slider-driven facility expansion calculator (1-64 facilities) with real-time revenue, EBITDA, and enterprise value projections, conditional color scaling, and formatted output displays',
        'Password-gated authentication — Implemented styled login gate with session storage persistence, animated transitions, and automatic redirect to dashboard on successful authentication',
        'Data layer architecture — Separated all financial data into typed TypeScript modules: capital raise phases, country profiles with lat/lng coordinates, 5-year financial projections, 6-product economics, and team bios — ensuring single-source-of-truth data integrity',
      ],
    },
    {
      date: 'February 2026',
      title: 'Complexity Indicators — V2 Application',
      description:
        'Scale and complexity metrics for the V2 single-file React dashboard application.',
      tasks: [
        '~3,000+ lines of production React code in a single self-contained application',
        '7 major dashboard sections with distinct data visualizations and interactive elements',
        '6 product-level unit economics breakdowns with revenue and production data',
        '9 international market profiles with production, reserves, regulatory, and revenue data',
        '3 investment scenario models with real-time calculation switching',
        '3 institutional valuation methodologies (DCF, comparable companies, market multiples)',
        '15 animated chart data series with individually calibrated timing',
        '19 section cards with hover micro-interactions and scroll-triggered reveals',
        '7-state phase transition machine with coordinated animations across 3 application layers',
        'Custom D3.js globe with country-level GeoJSON, drag interaction, dual-projection rendering, and 9 patent country markers',
        'Antimeridian-safe dot generation handling Russia\'s 180° meridian crossing',
        '9 competitive design benchmarks analyzed and applied',
        '9 versioned backup snapshots with documented restoration procedures',
        'Full financial audit across 15+ data categories verified against source documents',
        'Production deployment on Vercel with global CDN, SSL, and custom subdomain',
      ],
    },
    {
      date: 'February 2026',
      title: 'Complexity Indicators — V2 → V3 Migration',
      description:
        'Scale and complexity metrics for the V2 to V3 migration extraction process.',
      tasks: [
        '14-session extraction playbook covering every V2 subsystem',
        '1,123-line design token reference with 16 core colors, 30+ compound visual recipes, and complete opacity/shadow/gradient catalogs',
        'Component dependency mapping with risk assessment for high-fidelity preservation',
        'Complete D3 globe, financial calculator, and animation system extraction with verification protocol',
      ],
    },
    {
      date: 'February 2026',
      title: 'Complexity Indicators — V3 Application',
      description:
        'Scale and complexity metrics for the V3 Next.js enterprise dashboard.',
      tasks: [
        'Next.js 14 enterprise architecture with TypeScript, Tailwind CSS, and App Router',
        '6 dashboard pages with shared layout, authentication, and navigation',
        'Complete dark/light theme system with CSS custom properties and runtime switching',
        '232 hardcoded colors systematically replaced with design tokens (232 → 3 remaining)',
        'V2 visual identity preserved: navy palette, atmospheric glows, gradient cards, layered shadows',
        'Structured component architecture: charts/, cards/, sections/, layout/, ui/ directories',
        'Git version control with feature branching, checkpoint commits, and full rollback capability',
        'ARCHITECTURE.md scalability guide enforcing 150-line page max, component extraction rules, and token-only color policy',
        'WORK_LOG.md documentation system for session continuity and client reporting',
        'React 18, Framer Motion animations, Recharts data visualization, Lucide icon system',
        'Typed data layer with 5 domain-specific modules and centralized formatting utilities',
        'Production-ready build verified with zero TypeScript errors across all pages and components',
      ],
    },
  ],
  'digital-assets': [],
  'campaign-strategy': [],
  coordination: [
    {
      date: 'February 2026',
      title: 'Re-Engagement & Stakeholder Assessment',
      description:
        'Strategic assessment of Frontieras current position following organizational changes and new hires.',
      tasks: [
        'Assessed current marketing infrastructure and recent organizational additions including PR firm and VP of Communications',
        'Developed AI consulting engagement proposal as primary engagement vector',
        'Prepared comprehensive scope of work documentation for management review',
      ],
    },
  ],
}

const PRICING = {
  title: 'Initial Dashboard Build Phase',
  description:
    'Strategization, development, coding, iteration, and deployment of both investor intelligence dashboards, plus strategic consulting, campaign optimization, and cross-functional coordination',
  hours: '310+ hours',
  price: '$95,000',
  subDetails: [
    '65 hours already invested into creation of prototypes for retail and institutional dashboards',
    'Estimated additional hours necessary to bring both dashboards to "ready to market" capacity plus strategic consulting, campaign optimization, and coordination',
  ],
}

const INVOICE_URL = '#' // Update with actual invoice link

const TIMELINE_ENTRIES = [
  {
    date: 'February 2026',
    title: 'Re-Engagement & Proposal Development',
    description:
      "Strategic assessment of Frontieras' current position following hiring of PR firm and VP of Communications. Proposal developed for AI consulting engagement and investor intelligence dashboard system. Initial prototype work from previous engagement (65 hours) carried forward.",
  },
]

const CAMPAIGN_METRICS = [
  { value: '$904K', label: 'Total Spend' },
  { value: '$4.49M', label: 'Capital Raised' },
  { value: '$13.85M', label: 'Top-of-Funnel Value' },
  { value: '4.97X', label: 'Blended ROAS' },
  { value: '15.32X', label: 'TOFU ROAS' },
  { value: '$581K', label: 'Cost Savings vs Forecast' },
  { value: '33.37%', label: 'Conversion Rate' },
  { value: '478K', label: 'Site Visits' },
  { value: '1,615', label: 'Funded Investors' },
]

// ============================================
// Progress Bar
// ============================================

function ProgressBar({
  progress,
  label,
  index,
}: {
  progress: number
  label?: string
  index: number
}) {
  const isComplete = progress >= 100
  const isEmpty = progress === 0

  return (
    <div className="group/progress px-6 pb-6 pt-5 md:px-8">
      {/* Label row */}
      <div className="mb-2.5 flex items-center justify-between">
        <span
          className={cn(
            'font-mono text-xs tracking-wide',
            isEmpty ? 'text-text-tertiary/60' : 'text-text-secondary'
          )}
        >
          {label || (isEmpty ? 'Not Started' : `${progress}% Complete`)}
        </span>
        <span
          className={cn(
            'font-mono text-xs transition-colors duration-normal group-hover/progress:text-text-primary',
            isEmpty ? 'text-text-tertiary/40' : 'text-text-primary'
          )}
        >
          {progress}%
        </span>
      </div>

      {/* Track */}
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-[#1A2326]">
        {progress > 0 && (
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: isComplete
                ? 'linear-gradient(to right, #00CC66, #22dd77)'
                : 'linear-gradient(to right, #0066FF, #3388FF)',
            }}
            initial={{ width: '0%' }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.3 + index * 0.15,
              ease: easeOutExpo,
            }}
          >
            {/* Leading edge glow */}
            <div
              className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full"
              style={{
                background: isComplete
                  ? 'rgba(0, 204, 102, 0.3)'
                  : 'rgba(0, 102, 255, 0.3)',
                filter: 'blur(4px)',
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Divider below progress bar */}
      <div
        className="mt-6 h-px w-full"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--color-border-subtle) 20%, var(--color-border-subtle) 80%, transparent)',
        }}
      />
    </div>
  )
}

// ============================================
// Status Badge
// ============================================

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { classes: string; glow?: string }> = {
    'In Development': {
      classes: 'bg-[#00CC66]/[0.08] border-[#00CC66]/30 text-[#00CC66]',
      glow: '0 0 12px rgba(0, 204, 102, 0.15)',
    },
    Planned: {
      classes: 'bg-transparent border-border-default text-text-tertiary',
    },
    Completed: {
      classes: 'bg-[#00CC66]/[0.15] border-[#00CC66]/30 text-[#00CC66]',
      glow: '0 0 12px rgba(0, 204, 102, 0.15)',
    },
    'Under Review': {
      classes: 'bg-[#FFAA00]/[0.08] border-[#FFAA00]/30 text-[#FFAA00]',
      glow: '0 0 12px rgba(255, 170, 0, 0.12)',
    },
    Ongoing: {
      classes: 'bg-[#0066FF]/[0.08] border-[#0066FF]/30 text-[#0066FF]',
      glow: '0 0 12px rgba(0, 102, 255, 0.15)',
    },
  }

  const style = styles[status] || { classes: 'border-text-tertiary text-text-tertiary' }

  return (
    <span
      className={cn(
        'inline-block shrink-0 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider',
        style.classes
      )}
      style={style.glow ? { boxShadow: style.glow } : undefined}
    >
      {status}
    </span>
  )
}

// ============================================
// Work Log (collapsible, integrated into card bottom)
// ============================================

function WorkLog({ deliverableId }: { deliverableId: string }) {
  const [expanded, setExpanded] = useState(false)
  const entries = PROOF_OF_WORK[deliverableId] || []
  const count = entries.length

  return (
    <div>
      {/* Divider line */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--color-border-subtle) 15%, var(--color-border-subtle) 85%, transparent)',
        }}
      />

      {/* Clickable row */}
      <button
        onClick={() => count > 0 && setExpanded(!expanded)}
        className={cn(
          'group flex w-full items-center gap-3 px-6 py-4 transition-all duration-300 md:px-8',
          count > 0
            ? 'cursor-pointer hover:bg-[#182023]'
            : 'cursor-default',
          expanded && 'bg-[#0D1619]'
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {count > 0 && (
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="shrink-0"
          >
            <ChevronDown size={14} className="text-text-tertiary transition-colors group-hover:text-text-secondary" />
          </motion.span>
        )}
        <span className="font-mono text-xs tracking-[0.12em] text-text-tertiary transition-colors group-hover:text-text-secondary">
          Work Log
        </span>
        <span className="ml-auto shrink-0 rounded-full bg-[#1A2326] px-2.5 py-0.5 font-mono text-[10px] text-text-tertiary">
          {count} {count === 1 ? 'entry' : 'entries'}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && count > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="overflow-hidden"
          >
            <div className="space-y-0 px-6 pb-6 pt-2 md:px-8">
              {entries.map((entry, i) => (
                <div
                  key={entry.date + entry.title}
                  className={cn(
                    'relative border-l border-border-subtle pl-6',
                    i < entries.length - 1 ? 'pb-6' : 'pb-0'
                  )}
                >
                  <div className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full border-[1.5px] border-accent-blue bg-[#0C1518]" />
                  <span className="font-mono text-label uppercase tracking-wider text-text-tertiary">
                    {entry.date}
                  </span>
                  <h4 className="mt-1.5 text-body-sm font-medium text-text-primary">
                    {entry.title}
                  </h4>
                  <p className="mt-1.5 text-body-sm leading-relaxed text-text-secondary">
                    {entry.description}
                  </p>
                  {entry.tasks && entry.tasks.length > 0 && (
                    <ul className="mt-3 space-y-2 pl-3">
                      {entry.tasks.map((task, j) => (
                        <li
                          key={j}
                          className="relative pl-4 text-xs leading-relaxed text-text-secondary/80 before:absolute before:left-0 before:top-[0.5em] before:h-[4px] before:w-[4px] before:rounded-full before:bg-text-tertiary/30"
                        >
                          {task}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// Deliverable Card
// ============================================

function DeliverableCard({
  deliverable,
  index,
}: {
  deliverable: Deliverable
  index: number
}) {
  const [expanded, setExpanded] = useState(false)
  const hasContent = !!(deliverable.subItems || deliverable.details)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: easeOutExpo,
      }}
      className="group/card relative overflow-hidden border border-border-default transition-all duration-500"
      style={{
        borderRadius: '12px',
        background: 'linear-gradient(180deg, #141C1F 0%, #0F171A 100%)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-hover)'
        e.currentTarget.style.boxShadow = '0 4px 32px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.02)'
        e.currentTarget.style.background = 'linear-gradient(180deg, #182023 0%, #121A1D 100%)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-default)'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)'
        e.currentTarget.style.background = 'linear-gradient(180deg, #141C1F 0%, #0F171A 100%)'
      }}
    >
      {/* Top edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.06) 75%, transparent)',
        }}
      />

      {/* Header — clickable to expand */}
      <button
        onClick={() => hasContent && setExpanded(!expanded)}
        className={cn(
          'flex w-full flex-col gap-3 p-6 pb-0 text-left sm:flex-row sm:items-start sm:justify-between sm:gap-4 md:p-8 md:pb-0',
          hasContent && 'cursor-pointer'
        )}
      >
        <div className="flex-1">
          <div className="flex items-start gap-3">
            {hasContent && (
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
                className="mt-1.5 shrink-0"
              >
                <ChevronDown size={16} className="text-text-tertiary" />
              </motion.span>
            )}
            <div>
              <h3 className="mb-2 font-display text-heading-md font-semibold text-text-primary md:text-heading-lg">
                {deliverable.title}
              </h3>
              <p className="mb-6 tracking-wide text-body-sm text-text-secondary md:text-body-md">
                {deliverable.description}
              </p>
            </div>
          </div>
        </div>
        <StatusBadge status={deliverable.status} />
      </button>

      {/* Progress bar */}
      <ProgressBar
        progress={deliverable.progress}
        label={deliverable.progressLabel}
        index={index}
      />

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {expanded && hasContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 md:px-8 md:pb-8">
              {/* Sub-items (for dashboards deliverable) */}
              {deliverable.subItems && (
                <div className="space-y-5">
                  {deliverable.subItems.map((sub) => (
                    <div
                      key={sub.title}
                      className="rounded-lg border border-border-subtle/30 border-l-2 border-l-[#0066FF]/25 p-5 md:p-6"
                      style={{
                        borderRadius: '8px',
                        background: '#0F171A',
                      }}
                    >
                      <h4 className="text-body-md font-medium text-text-primary">
                        {sub.title}
                      </h4>
                      <ul className="mt-4 flex flex-col gap-3">
                        {sub.details.map((detail, j) => (
                          <li
                            key={j}
                            className="relative pl-5 text-body-sm leading-[1.75] text-text-secondary before:absolute before:left-0 before:top-[0.55em] before:h-[5px] before:w-[5px] before:rounded-full before:bg-text-tertiary/30"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Flat details list (for other deliverables) */}
              {deliverable.details && (
                <ul className="flex flex-col gap-3">
                  {deliverable.details.map((detail, j) => {
                    const isHighlight =
                      deliverable.id === 'campaign-strategy' &&
                      detail.includes('$2.5M')

                    return (
                      <li
                        key={j}
                        className={cn(
                          'relative pl-5 text-body-sm leading-[1.75] before:absolute before:left-0 before:top-[0.55em] before:h-[5px] before:w-[5px] before:rounded-full',
                          isHighlight
                            ? 'font-medium text-text-primary before:bg-accent-blue'
                            : 'text-text-secondary before:bg-text-tertiary/30'
                        )}
                      >
                        {detail}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Work Log — integrated into card bottom */}
      <WorkLog deliverableId={deliverable.id} />
    </motion.div>
  )
}

// ============================================
// Password Gate (client-specific)
// ============================================

function ClientPasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 400)
    return () => clearTimeout(timer)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting || !password.trim()) return

    setSubmitting(true)
    setError(false)

    try {
      const res = await fetch('/api/auth/verify-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim(), clientId: 'frontieras' }),
      })
      const data = await res.json()

      if (data.valid) {
        onSuccess()
      } else {
        setError(true)
        setPassword('')
        setTimeout(() => setError(false), 1000)
      }
    } catch {
      setError(true)
      setTimeout(() => setError(false), 1000)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-primary">
      {/* Atmospheric glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0, 102, 255, 0.04) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
        className="relative z-10 text-center"
      >
        <p className="mb-10 font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
          Confidential Access
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <motion.input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter access code"
            className="w-64 border-b bg-transparent pb-3 text-center font-mono text-body-md text-text-primary placeholder:text-text-tertiary focus:outline-none sm:w-80"
            style={{
              borderBottomColor: error
                ? 'var(--color-error)'
                : 'rgba(255, 255, 255, 0.3)',
              transition: 'border-color 0.3s ease',
            }}
            animate={{
              x: error ? [0, -8, 8, -6, 6, -3, 3, 0] : 0,
            }}
            transition={
              error
                ? { x: { duration: 0.5, ease: 'easeInOut' } }
                : {}
            }
            autoComplete="off"
            spellCheck={false}
          />

          <motion.button
            type="submit"
            disabled={submitting}
            className="mt-10 border border-border-subtle px-8 py-3 font-mono text-label uppercase tracking-[0.2em] text-text-tertiary transition-all duration-normal ease-out-expo hover:border-border-hover hover:text-text-secondary disabled:opacity-50"
            style={{ borderRadius: 'var(--radius-sm)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOutExpo }}
          >
            Submit
          </motion.button>
        </form>
      </motion.div>

      {/* Dev bypass — remove when pages are finalized */}
      <button
        onClick={onSuccess}
        className="absolute bottom-6 right-6 z-20 font-mono text-xs text-text-tertiary/30 transition-colors hover:text-text-tertiary"
      >
        dev bypass
      </button>
    </div>
  )
}

// ============================================
// Current date helper
// ============================================

function CurrentDate() {
  const [date, setDate] = useState('')

  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date())
    )
  }, [])

  return <span>{date}</span>
}

// ============================================
// Section wrapper
// ============================================

function PageSection({
  id,
  children,
  className,
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      <div className="mx-auto w-full max-w-5xl px-6 md:px-8">{children}</div>
    </section>
  )
}

// ============================================
// Gradient divider (using the effects component style)
// ============================================

function Divider() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--color-border-default) 20%, var(--color-border-default) 80%, transparent)',
        }}
      />
    </div>
  )
}

// ============================================
// Portal Content
// ============================================

function PortalContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
      className="relative min-h-screen bg-bg-primary"
    >
      {/* Page-level atmosphere */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <GridBackground variant="radial" />
        <GlowOrb className="-top-20 right-[15%]" color="blue" size={500} delay={0} />
        <GlowOrb className="bottom-[20%] -left-20" color="white" size={400} delay={3} />
      </div>

      {/* Noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.02]">
        <svg className="h-full w-full">
          <filter id="portal-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#portal-noise)" />
        </svg>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 md:px-8">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-text-primary transition-opacity hover:opacity-80"
          >
            SOVEREIGN MEDIA
          </Link>
          <span className="font-mono text-label uppercase tracking-wider text-text-tertiary">
            Confidential
          </span>
        </div>
      </header>

      {/* HERO */}
      <PageSection className="relative z-10 pb-12 pt-20 md:pb-16 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <span className="font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
            Client Engagement
          </span>
          <h1 className="mt-4 font-display text-display-sm font-semibold text-text-primary md:text-display-md">
            {CLIENT_NAME}
          </h1>
          <p className="mt-3 max-w-3xl text-body-lg text-text-secondary">
            {PAGE_TITLE}
          </p>
          <p className="mt-2 text-body-md text-text-tertiary">
            {PAGE_SUBTITLE}
          </p>
          <p className="mt-4 font-mono text-label uppercase tracking-wider text-text-tertiary">
            <CurrentDate />
          </p>
        </motion.div>
      </PageSection>

      <Divider />

      {/* ENGAGEMENT OVERVIEW */}
      <PageSection className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <span className="font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
            Overview
          </span>
          <h2 className="mt-4 font-display text-heading-lg font-semibold text-text-primary">
            Engagement Overview
          </h2>
          <p className="mt-6 max-w-3xl text-body-lg leading-relaxed text-text-secondary">
            {ENGAGEMENT_OVERVIEW}
          </p>
        </motion.div>
      </PageSection>

      <Divider />

      {/* SCOPE OF WORK */}
      <PageSection className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <span className="font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
            Deliverables
          </span>
          <h2 className="mt-4 font-display text-heading-lg font-semibold text-text-primary">
            Scope of Work
          </h2>
        </motion.div>

        <div className="mt-10 space-y-6">
          {DELIVERABLES.map((deliverable, i) => (
            <DeliverableCard
              key={deliverable.id}
              deliverable={deliverable}
              index={i}
            />
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* INVESTMENT & PRICING */}
      <PageSection className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <span className="font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
            Investment
          </span>
          <h2 className="mt-4 font-display text-heading-lg font-semibold text-text-primary">
            Pricing &amp; Investment
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: easeOutExpo }}
          className="group/pricing relative mt-10 overflow-hidden rounded-xl border border-border-subtle transition-all duration-500"
          style={{
            background: 'linear-gradient(135deg, #141C1F 0%, #0F171A 100%)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border-hover)'
            e.currentTarget.style.boxShadow = '0 0 40px rgba(255,255,255,0.03)'
            e.currentTarget.style.background = 'linear-gradient(135deg, #182023 0%, #121A1D 100%)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border-subtle)'
            e.currentTarget.style.boxShadow = '0 0 0 0 rgba(255,255,255,0)'
            e.currentTarget.style.background = 'linear-gradient(135deg, #141C1F 0%, #0F171A 100%)'
          }}
        >
          {/* Top edge glow */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)',
            }}
          />

          <div className="p-6 md:p-8">
            <h3 className="font-display text-heading-md font-semibold text-text-primary md:text-heading-lg">
              {PRICING.title}
            </h3>
            <p className="mt-3 max-w-2xl tracking-wide text-body-sm text-text-secondary">
              {PRICING.description}
            </p>

            <div className="mt-8 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <span
                className="font-mono text-4xl font-semibold text-text-primary md:text-5xl"
                style={{
                  textShadow: '0 0 40px rgba(255,255,255,0.1)',
                }}
              >
                {PRICING.price}
              </span>
              <span className="font-mono text-body-sm text-text-tertiary">
                {PRICING.hours}
              </span>
            </div>

            <div className="mt-6 space-y-2">
              {PRICING.subDetails.map((detail, i) => (
                <p key={i} className="text-body-sm text-text-tertiary">
                  {detail}
                </p>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <a
                href={INVOICE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-accent-blue px-5 py-2.5 font-mono text-sm font-medium text-white transition-all duration-300 hover:bg-accent-blue/85 hover:shadow-[0_0_20px_rgba(0,102,255,0.25)]"
              >
                View Invoice
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </PageSection>

      <Divider />

      {/* PROGRESS & UPDATES */}
      <PageSection className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <span className="font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
            Timeline
          </span>
          <h2 className="mt-4 font-display text-heading-lg font-semibold text-text-primary">
            Progress &amp; Updates
          </h2>
        </motion.div>

        <div className="mt-10 space-y-0">
          {TIMELINE_ENTRIES.map((entry, i) => (
            <motion.div
              key={entry.date + entry.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: easeOutExpo,
              }}
              className="relative border-l border-border-subtle pl-8 pb-10 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-accent-blue bg-bg-primary" />
              <span className="font-mono text-label uppercase tracking-wider text-text-tertiary">
                {entry.date}
              </span>
              <h3 className="mt-2 font-display text-heading-sm font-semibold text-text-primary">
                {entry.title}
              </h3>
              <p className="mt-2 max-w-2xl text-body-sm leading-relaxed text-text-secondary">
                {entry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* PREVIOUS CAMPAIGN RESULTS */}
      <PageSection className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <span className="font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
            Track Record
          </span>
          <h2 className="mt-4 font-display text-heading-lg font-semibold text-text-primary">
            Previous Engagement Results — Regulation CF Campaign
          </h2>
          <p className="mt-4 max-w-3xl text-body-md leading-relaxed text-text-secondary">
            During our previous engagement, Sovereign Media architected and
            executed Frontieras&apos; Regulation CF campaign, delivering the
            following results against an original forecast budget of $1.485M:
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {CAMPAIGN_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: easeOutExpo,
              }}
              className="relative overflow-hidden rounded-xl border border-border-subtle p-5 text-center transition-all duration-500 hover:border-border-hover"
              style={{
                background: 'linear-gradient(135deg, #141C1F 0%, #0F171A 100%)',
              }}
            >
              {/* Top edge glow */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, transparent)',
                }}
              />
              <p className="font-mono text-xl font-semibold text-text-primary sm:text-2xl">
                {metric.value}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* FOOTER */}
      <footer className="relative z-10 py-16">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
          <p className="text-body-sm text-text-tertiary">
            This document is confidential and intended solely for Frontieras
            North America.
          </p>
          <p className="mt-2 text-body-sm text-text-tertiary">
            Contact:{' '}
            <a
              href="mailto:chase@sovereignmedia.io"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              chase@sovereignmedia.io
            </a>
          </p>
        </div>
      </footer>
    </motion.div>
  )
}

// ============================================
// Page — Password gate + Portal
// ============================================

export default function FrontierasWorkPage() {
  return <PortalContent />
}
