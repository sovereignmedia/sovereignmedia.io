'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProofOfWorkEntry } from '@/types/portal'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

interface WorkLogProps {
  entries: ProofOfWorkEntry[]
}

export function WorkLog({ entries }: WorkLogProps) {
  const [expanded, setExpanded] = useState(false)
  const count = entries.length

  // Group entries by date, preserving order
  const groupedEntries = useMemo(() => {
    const groups: { date: string; entries: ProofOfWorkEntry[] }[] = []
    for (const entry of entries) {
      const last = groups[groups.length - 1]
      if (last && last.date === entry.date) {
        last.entries.push(entry)
      } else {
        groups.push({ date: entry.date, entries: [entry] })
      }
    }
    return groups
  }, [entries])

  return (
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
        onClick={() => count > 0 && setExpanded(!expanded)}
        className={cn(
          'group flex w-full items-center gap-3 px-6 py-4 transition-all duration-300 md:px-8',
          count > 0
            ? 'cursor-pointer hover:bg-bg-card-hover'
            : 'cursor-default',
          expanded && 'bg-bg-elevated'
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
        <span className="font-mono text-xs tracking-[0.12em] text-text-secondary transition-colors group-hover:text-text-primary">
          Work Log
        </span>
        <span className="ml-auto shrink-0 rounded-full bg-border-default px-2.5 py-0.5 font-mono text-[10px] text-text-secondary">
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
              {groupedEntries.map((group, gi) => (
                <div key={group.date + gi}>
                  {/* Date header — shown once per group */}
                  <div className="mb-4 mt-2 first:mt-0">
                    <span className="font-mono text-label uppercase tracking-wider text-text-tertiary">
                      {group.date}
                    </span>
                  </div>

                  {/* Entries under this date */}
                  {group.entries.map((entry, ei) => {
                    const isLastEntry = gi === groupedEntries.length - 1 && ei === group.entries.length - 1
                    return (
                      <div
                        key={entry.date + entry.title}
                        className={cn(
                          'relative border-l border-border-subtle pl-6',
                          !isLastEntry ? 'pb-6' : 'pb-0'
                        )}
                      >
                        <div className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full border-[1.5px] border-accent-blue bg-bg-primary" />
                        <h4 className="text-body-sm font-medium text-text-primary">
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
                    )
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
