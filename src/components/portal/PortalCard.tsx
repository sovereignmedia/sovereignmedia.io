'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StatusBadge } from './StatusBadge'
import { ProgressBar } from './ProgressBar'
import { WorkLog } from './WorkLog'
import type { Deliverable, ProofOfWorkEntry } from '@/types/portal'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

interface PortalCardProps {
  deliverable: Deliverable
  index: number
  workLogEntries?: ProofOfWorkEntry[]
}

export function PortalCard({ deliverable, index, workLogEntries = [] }: PortalCardProps) {
  const [expanded, setExpanded] = useState(false)
  const hasContent = !!(deliverable.subItems || deliverable.details)

  // Count items for the badge
  const itemCount = deliverable.subItems
    ? deliverable.subItems.length
    : deliverable.details
      ? deliverable.details.length
      : 0

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
      className="group/card relative overflow-hidden border border-white/[0.06] backdrop-blur-xl transition-all duration-500"
      style={{
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(180deg, rgba(20, 28, 31, 0.65) 0%, rgba(15, 23, 26, 0.55) 100%)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
        e.currentTarget.style.boxShadow = '0 4px 32px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.05)'
        e.currentTarget.style.background = 'linear-gradient(180deg, rgba(24, 32, 35, 0.7) 0%, rgba(18, 26, 29, 0.6) 100%)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)'
        e.currentTarget.style.background = 'linear-gradient(180deg, rgba(20, 28, 31, 0.65) 0%, rgba(15, 23, 26, 0.55) 100%)'
      }}
    >
      {/* Top edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 75%, transparent)',
        }}
      />

      {/* Header — static, not clickable */}
      <div className="flex w-full flex-col gap-3 p-6 pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4 md:p-8 md:pb-0">
        <div className="flex-1">
          <h3 className="mb-2 font-display text-heading-md font-semibold text-text-primary md:text-heading-lg">
            {deliverable.title}
          </h3>
          <p className="mb-6 tracking-wide text-body-sm text-text-secondary md:text-body-md">
            {deliverable.description}
          </p>
        </div>
        <StatusBadge status={deliverable.status} />
      </div>

      {/* Progress bar */}
      <ProgressBar
        progress={deliverable.progress}
        label={deliverable.progressLabel}
        index={index}
      />

      {/* Deliverables & Outcomes — collapsible section */}
      {hasContent && (
        <div>
          {/* Divider line */}
          <div
            className="h-px w-full"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--color-border-default) 15%, var(--color-border-default) 85%, transparent)',
            }}
          />

          {/* Clickable row */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={cn(
              'group flex w-full items-center gap-4 px-6 py-5 transition-all duration-300 md:px-8',
              'cursor-pointer',
              expanded
                ? 'bg-bg-elevated'
                : 'hover:bg-white/[0.02]'
            )}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <span className="font-mono text-sm tracking-[0.08em] text-text-secondary transition-colors group-hover:text-text-primary">
              Deliverables & Outcomes
            </span>
            <span className="ml-auto shrink-0 rounded-full border border-border-default bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-text-secondary transition-colors group-hover:border-border-hover group-hover:text-text-primary">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              className="flex shrink-0 items-center gap-1.5 rounded-md border border-border-default px-3 py-1.5 transition-colors group-hover:border-border-hover group-hover:bg-white/[0.03]"
            >
              <span className="font-mono text-[11px] text-text-secondary transition-colors group-hover:text-text-primary">
                {expanded ? 'Collapse' : 'Expand'}
              </span>
              <ChevronDown size={12} className="text-text-secondary transition-colors group-hover:text-text-primary" />
            </motion.div>
          </button>

          {/* Expandable content */}
          <AnimatePresence initial={false}>
            {expanded && (
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
                          className="rounded-lg border border-border-subtle/30 border-l-2 border-l-accent-blue/25 p-5 md:p-6"
                          style={{
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--color-bg-elevated)',
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
                          deliverable.highlightMatch && detail.includes(deliverable.highlightMatch)

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
        </div>
      )}

      {/* Per-deliverable pricing strip */}
      {deliverable.pricing && (
        <div>
          {/* Divider */}
          <div
            className="h-px w-full"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--color-border-default) 15%, var(--color-border-default) 85%, transparent)',
            }}
          />
          <div className="px-6 py-5 md:px-8">
            <span className="font-mono text-label uppercase tracking-[0.12em] text-text-secondary">
              Investment & Pricing
            </span>
            <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <span
                className="font-mono text-lg font-semibold text-text-primary md:text-xl"
                style={{ textShadow: '0 0 30px rgba(255,255,255,0.08)' }}
              >
                {deliverable.pricing.price}
              </span>
              {deliverable.pricing.hours && (
                <span className="font-mono text-body-sm text-text-tertiary">
                  {deliverable.pricing.hours}
                </span>
              )}
            </div>
            {deliverable.pricing.description && (
              <p className="mt-3 max-w-2xl text-body-sm text-text-tertiary">
                {deliverable.pricing.description}
              </p>
            )}
            {deliverable.pricing.invoiceUrl && (
              <div className="mt-4 flex justify-start">
                <a
                  href={deliverable.pricing.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-accent-blue px-4 py-2 font-mono text-xs font-medium text-white transition-all duration-300 hover:bg-accent-blue/85 hover:shadow-[0_0_20px_rgba(0,102,255,0.25)]"
                >
                  View Invoice
                  <ArrowRight size={12} />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Work Log — integrated into card bottom */}
      <WorkLog entries={workLogEntries} />
    </motion.div>
  )
}
