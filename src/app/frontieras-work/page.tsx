'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
      title: 'Prototype Development & Architecture',
      description:
        'Initial architecture and prototype development for both retail and institutional investor dashboards.',
      tasks: [
        'Information architecture design — structured major dashboard sections with logical flow optimized for investor presentation narrative',
        'Competitive design benchmarking — analyzed 9 industry-leading platforms to establish visual design standards and best practices',
        'Interactive scenario modeling system — architected dynamic calculation engine for Conservative, Base, and Aggressive investment scenarios',
        'Market data compilation and structuring — researched and organized market opportunity data across 9 international markets including regulatory environments, market sizes, and growth projections',
        'Financial model analysis — reviewed and translated complex financial model inputs into interactive dashboard components',
        'Premium visual design system — developed comprehensive design language targeting institutional-grade aesthetic standards',
        'Full-stack application development — built complete self-contained React application with interactive data visualization',
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
// Status Badge
// ============================================

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    'In Development': 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]',
    Planned: 'bg-[#eab308]/10 border-[#eab308]/30 text-[#eab308]',
    Completed: 'border-success text-success',
    'Under Review': 'border-warning text-warning',
    Ongoing: 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]',
  }

  return (
    <span
      className={cn(
        'inline-block shrink-0 rounded-sm border px-2.5 py-1 font-mono text-label uppercase tracking-wider',
        colors[status] || 'border-text-tertiary text-text-tertiary'
      )}
    >
      {status}
    </span>
  )
}

// ============================================
// Proof of Work Log (collapsible)
// ============================================

function ProofOfWorkLog({ deliverableId }: { deliverableId: string }) {
  const [expanded, setExpanded] = useState(false)
  const entries = PROOF_OF_WORK[deliverableId] || []
  const count = entries.length

  return (
    <div className="mt-6 pt-4">
      <button
        onClick={() => count > 0 && setExpanded(!expanded)}
        className={cn(
          'group relative flex w-max items-center gap-2.5 overflow-hidden rounded-md border px-5 py-2.5 transition-all duration-normal',
          count > 0
            ? 'cursor-pointer border-border-default bg-bg-elevated/60 hover:border-border-hover hover:bg-bg-card'
            : 'cursor-default border-border-subtle bg-bg-elevated/30',
          expanded && 'border-border-hover bg-bg-card'
        )}
      >
        {count > 0 && (
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
          >
            <ChevronDown size={13} className="text-text-tertiary transition-colors group-hover:text-text-secondary" />
          </motion.span>
        )}
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary transition-colors group-hover:text-text-secondary">
          Work Log
        </span>
        <span className="h-1 w-1 rounded-full bg-text-tertiary/40" />
        <span className="font-mono text-xs text-text-tertiary/60">
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
            <div className="mt-4 space-y-0">
              {entries.map((entry, i) => (
                <div
                  key={entry.date + entry.title}
                  className={cn(
                    'relative border-l border-border-subtle pl-6',
                    i < entries.length - 1 ? 'pb-6' : 'pb-0'
                  )}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full border-[1.5px] border-accent-blue bg-bg-card" />
                  <span className="font-mono text-label uppercase tracking-wider text-text-tertiary">
                    {entry.date}
                  </span>
                  <h4 className="mt-1.5 text-body-sm font-medium text-text-primary">
                    {entry.title}
                  </h4>
                  <p className="mt-1.5 text-body-sm text-text-secondary">
                    {entry.description}
                  </p>
                  {entry.tasks && entry.tasks.length > 0 && (
                    <ul className="mt-3 space-y-1.5 pl-3">
                      {entry.tasks.map((task, j) => (
                        <li
                          key={j}
                          className="relative pl-3 text-xs leading-relaxed text-text-secondary/80 before:absolute before:left-0 before:top-[0.45em] before:h-[3px] before:w-[3px] before:rounded-full before:bg-text-tertiary/40"
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

      {expanded && count === 0 && (
        <p className="mt-2 text-body-sm text-text-tertiary">
          No work documented yet.
        </p>
      )}
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
      className="rounded-lg border border-border-subtle bg-bg-card p-6 md:p-8"
    >
      {/* Header — clickable to expand */}
      <button
        onClick={() => hasContent && setExpanded(!expanded)}
        className={cn(
          'flex w-full flex-col gap-3 text-left sm:flex-row sm:items-start sm:justify-between sm:gap-4',
          hasContent && 'cursor-pointer'
        )}
      >
        <div className="flex-1">
          <div className="flex items-start gap-3">
            {hasContent && (
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
                className="mt-1 shrink-0"
              >
                <ChevronDown size={16} className="text-text-tertiary" />
              </motion.span>
            )}
            <div>
              <h3 className="font-display text-heading-sm font-semibold text-text-primary md:text-heading-md">
                {deliverable.title}
              </h3>
              <p className="mt-2 text-body-sm text-text-secondary md:text-body-md">
                {deliverable.description}
              </p>
            </div>
          </div>
        </div>
        <StatusBadge status={deliverable.status} />
      </button>

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
            {/* Sub-items (for dashboards deliverable) */}
            {deliverable.subItems && (
              <div className="mt-6 space-y-6">
                {deliverable.subItems.map((sub) => (
                  <div
                    key={sub.title}
                    className="rounded-md border border-border-subtle/60 bg-bg-elevated p-5"
                  >
                    <h4 className="text-body-md font-medium text-text-primary">
                      {sub.title}
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {sub.details.map((detail, j) => (
                        <li
                          key={j}
                          className="relative pl-4 text-body-sm leading-relaxed text-text-secondary before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-text-tertiary/50"
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
              <ul className="mt-5 space-y-2">
                {deliverable.details.map((detail, j) => {
                  const isHighlight =
                    deliverable.id === 'campaign-strategy' &&
                    detail.includes('$2.5M')

                  return (
                    <li
                      key={j}
                      className={cn(
                        'relative pl-4 text-body-sm leading-relaxed before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full',
                        isHighlight
                          ? 'text-text-primary font-medium before:bg-accent-blue'
                          : 'text-text-secondary before:bg-text-tertiary/50'
                      )}
                    >
                      {detail}
                    </li>
                  )
                })}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Work Log */}
      <ProofOfWorkLog deliverableId={deliverable.id} />
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
// Gradient divider
// ============================================

function Divider() {
  return (
    <div
      className="h-px w-full"
      style={{
        background:
          'linear-gradient(to right, transparent, var(--color-border-default) 20%, var(--color-border-default) 80%, transparent)',
      }}
    />
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
      className="min-h-screen bg-bg-primary"
    >
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
      <PageSection className="pb-12 pt-20 md:pb-16 md:pt-28">
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
      <PageSection>
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
          <p className="mt-6 max-w-3xl text-body-lg text-text-secondary">
            {ENGAGEMENT_OVERVIEW}
          </p>
        </motion.div>
      </PageSection>

      <Divider />

      {/* SCOPE OF WORK */}
      <PageSection>
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
      <PageSection>
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
          className="mt-10 overflow-hidden rounded-lg border border-border-subtle bg-bg-card"
        >
          <div className="p-6 md:p-8">
            <h3 className="font-display text-heading-sm font-semibold text-text-primary md:text-heading-md">
              {PRICING.title}
            </h3>
            <p className="mt-3 max-w-2xl text-body-sm text-text-secondary">
              {PRICING.description}
            </p>

            <div className="mt-8 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="font-mono text-4xl font-semibold text-text-primary md:text-5xl">
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
                className="inline-flex items-center gap-2 rounded-md bg-accent-blue px-5 py-2.5 font-mono text-sm font-medium text-white transition-all duration-normal hover:bg-accent-blue/85"
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
      <PageSection>
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
              <p className="mt-2 max-w-2xl text-body-sm text-text-secondary">
                {entry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* PREVIOUS CAMPAIGN RESULTS */}
      <PageSection>
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
          <p className="mt-4 max-w-3xl text-body-md text-text-secondary">
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
              className="rounded-lg border border-border-subtle bg-bg-card p-5 text-center"
            >
              <p className="font-mono text-xl font-semibold text-text-primary sm:text-2xl">
                {metric.value}
              </p>
              <p className="mt-2 font-mono text-label uppercase tracking-wider text-text-tertiary">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* FOOTER */}
      <footer className="py-16">
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
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  // Check cookie on mount
  useEffect(() => {
    fetch('/api/auth/check-client?clientId=frontieras', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false))
  }, [])

  // Loading state
  if (authenticated === null) {
    return <div className="min-h-screen bg-bg-primary" />
  }

  if (!authenticated) {
    return (
      <ClientPasswordGate onSuccess={() => setAuthenticated(true)} />
    )
  }

  return <PortalContent />
}
