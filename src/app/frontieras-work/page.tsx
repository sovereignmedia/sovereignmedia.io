'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// ============================================
// Animation config
// ============================================

const easeOutExpo = [0.16, 1, 0.3, 1] as const

// ============================================
// DATA — Edit these arrays to update content
// ============================================

const SCOPE_ITEMS: {
  title: string
  description: string
  status: 'In Progress' | 'Planned' | 'Completed' | 'Under Review'
}[] = [
  {
    title: 'AI Agent System Architecture',
    description:
      'Design and implementation of autonomous agent systems for operational efficiency.',
    status: 'In Progress',
  },
  {
    title: 'Marketing Strategy Audit',
    description:
      'Comprehensive analysis of current marketing infrastructure and opportunities.',
    status: 'In Progress',
  },
  {
    title: 'Campaign Architecture',
    description:
      'Full-funnel campaign design and execution framework.',
    status: 'Planned',
  },
  {
    title: 'Brand Identity Refinement',
    description:
      'Visual identity and messaging optimization for investor-grade positioning.',
    status: 'Planned',
  },
]

const PRICING_ITEMS = [
  { phase: 'Phase 1: Discovery & Audit', price: '$5,000' },
  { phase: 'Phase 2: Strategy & Architecture', price: '$7,500' },
  { phase: 'Phase 3: Implementation & Execution', price: '$12,500' },
]

const TOTAL_PRICE = '$25,000'

const INVOICE_URL = 'https://example.com/invoice' // Update with actual invoice link

const TIMELINE_ENTRIES = [
  {
    date: 'February 2026',
    title: 'Engagement Initiated',
    description:
      'Initial discovery sessions completed. Scope of work finalized. Strategic assessment underway.',
  },
]

const CAMPAIGN_METRICS = [
  { value: '$4.49M', label: 'Total Funded' },
  { value: '4.97X', label: 'Blended ROAS' },
  { value: '15.32X', label: 'TOFU ROAS' },
  { value: '$581K', label: 'Cost Savings' },
  { value: '33.37%', label: 'Conversion Rate' },
]

// ============================================
// Status Badge
// ============================================

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    'In Progress': 'border-accent-blue text-accent-blue',
    Planned: 'border-text-tertiary text-text-tertiary',
    Completed: 'border-success text-success',
    'Under Review': 'border-warning text-warning',
  }

  return (
    <span
      className={cn(
        'inline-block rounded-sm border px-2.5 py-1 font-mono text-label uppercase tracking-wider',
        colors[status] || 'border-text-tertiary text-text-tertiary'
      )}
    >
      {status}
    </span>
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
            SOVEREIGN
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
            Frontieras North America
          </h1>
          <p className="mt-3 text-body-lg text-text-secondary">
            Strategic Marketing &amp; AI Consulting Engagement
          </p>
          <p className="mt-2 font-mono text-label uppercase tracking-wider text-text-tertiary">
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
            This document outlines the scope, deliverables, and progress of
            Sovereign Media&apos;s engagement with Frontieras North America. This is
            a living document that will be updated as work progresses.
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

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SCOPE_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: easeOutExpo,
              }}
              className="rounded-lg border border-border-subtle bg-bg-card p-6 transition-all duration-normal ease-out-expo hover:border-border-hover hover:bg-bg-card-hover"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-heading-sm font-semibold text-text-primary">
                  {item.title}
                </h3>
                <StatusBadge status={item.status} />
              </div>
              <p className="mt-3 text-body-sm text-text-secondary">
                {item.description}
              </p>
            </motion.div>
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
          className="mt-10 overflow-hidden rounded-lg border border-border-subtle"
        >
          {PRICING_ITEMS.map((item, i) => (
            <div
              key={item.phase}
              className={cn(
                'flex items-center justify-between px-6 py-5',
                i < PRICING_ITEMS.length - 1 && 'border-b border-border-subtle'
              )}
            >
              <span className="text-body-md text-text-secondary">
                {item.phase}
              </span>
              <span className="font-mono text-body-md font-semibold text-text-primary">
                {item.price}
              </span>
            </div>
          ))}
          {/* Total */}
          <div className="flex items-center justify-between border-t border-border-hover bg-bg-elevated px-6 py-5">
            <span className="font-display text-heading-sm font-semibold text-text-primary">
              Total Engagement
            </span>
            <span className="font-mono text-heading-md font-semibold text-text-primary">
              {TOTAL_PRICE}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
          className="mt-8"
        >
          <a
            href={INVOICE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-body-sm text-accent-blue transition-opacity hover:opacity-80"
          >
            View Invoice
            <ArrowRight size={14} />
          </a>
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
            Previous Engagement Results
          </h2>
          <p className="mt-4 max-w-2xl text-body-md text-text-secondary">
            Results from Sovereign Media&apos;s prior Reg CF crowdfunding campaign
            engagement with Frontieras, demonstrating proven performance across
            paid media, content production, and conversion optimization.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {CAMPAIGN_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
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
    fetch('/api/auth/check-client?clientId=frontieras')
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
