'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
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
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(180deg, var(--color-bg-card) 0%, var(--color-bg-elevated) 100%)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-hover)'
        e.currentTarget.style.boxShadow = '0 4px 32px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.02)'
        e.currentTarget.style.background = 'linear-gradient(180deg, var(--color-bg-card-hover) 0%, var(--color-bg-card) 100%)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-default)'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)'
        e.currentTarget.style.background = 'linear-gradient(180deg, var(--color-bg-card) 0%, var(--color-bg-elevated) 100%)'
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

      {/* Work Log — integrated into card bottom */}
      <WorkLog entries={workLogEntries} />
    </motion.div>
  )
}
