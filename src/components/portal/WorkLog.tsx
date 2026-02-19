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

function DateGroup({ group, defaultOpen }: { group: { date: string; entries: ProofOfWorkEntry[] }; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const count = group.entries.length

  return (
    <div>
      {/* Collapsible date header */}
      <button
        onClick={() => setOpen(!open)}
        className="group/date flex w-full items-center gap-2.5 py-2 transition-colors"
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: easeOutExpo }}
          className="shrink-0"
        >
          <ChevronDown size={12} className="text-accent-blue/60 transition-colors group-hover/date:text-accent-blue" />
        </motion.span>
        <span className="font-mono text-label uppercase tracking-wider text-accent-blue/80 transition-colors group-hover/date:text-accent-blue">
          {group.date}
        </span>
        <span className="ml-auto shrink-0 rounded-full bg-accent-blue/[0.08] px-2 py-0.5 font-mono text-[10px] text-accent-blue/60">
          {count} {count === 1 ? 'entry' : 'entries'}
        </span>
      </button>

      {/* Collapsible entries */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="overflow-hidden"
          >
            <div className="pl-1 pt-2 pb-2">
              {group.entries.map((entry, ei) => {
                const isLast = ei === group.entries.length - 1
                return (
                  <div
                    key={entry.date + entry.title}
                    className={cn(
                      'relative ml-1 pl-6',
                      !isLast ? 'pb-6' : 'pb-0'
                    )}
                    style={{
                      borderLeft: '1px solid rgba(0, 102, 255, 0.15)',
                    }}
                  >
                    <div
                      className="absolute -left-[4.5px] top-1.5 h-[9px] w-[9px] rounded-full border-[1.5px] border-accent-blue bg-bg-primary"
                      style={{ boxShadow: '0 0 6px rgba(0, 102, 255, 0.3)' }}
                    />
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
                            className="relative pl-4 text-xs leading-relaxed text-text-secondary/80 before:absolute before:left-0 before:top-[0.5em] before:h-[4px] before:w-[4px] before:rounded-full before:bg-accent-blue/20"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
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
            <div className="space-y-1 px-6 pb-6 pt-1 md:px-8">
              {groupedEntries.map((group, gi) => (
                <DateGroup
                  key={group.date + gi}
                  group={group}
                  defaultOpen={gi === 0}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
