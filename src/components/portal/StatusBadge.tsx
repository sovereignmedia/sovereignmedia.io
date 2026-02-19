'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { DeliverableStatus } from '@/types/portal'

const STATUS_STYLES: Record<string, { classes: string; glow?: string; glowPulse?: string }> = {
  'In Development': {
    classes: 'bg-success/[0.08] border-success/30 text-success',
    glow: '0 0 12px rgba(0, 204, 102, 0.15)',
    glowPulse: '0 0 20px rgba(0, 204, 102, 0.35)',
  },
  Planned: {
    classes: 'bg-transparent border-border-default text-text-tertiary',
  },
  Completed: {
    classes: 'bg-success/[0.15] border-success/30 text-success',
    glow: '0 0 12px rgba(0, 204, 102, 0.15)',
    glowPulse: '0 0 20px rgba(0, 204, 102, 0.35)',
  },
  'Under Review': {
    classes: 'bg-warning/[0.08] border-warning/30 text-warning',
    glow: '0 0 12px rgba(255, 170, 0, 0.12)',
    glowPulse: '0 0 20px rgba(255, 170, 0, 0.3)',
  },
  Ongoing: {
    classes: 'bg-accent-blue/[0.08] border-accent-blue/30 text-accent-blue',
    glow: '0 0 12px rgba(0, 102, 255, 0.15)',
    glowPulse: '0 0 20px rgba(0, 102, 255, 0.35)',
  },
}

interface StatusBadgeProps {
  status: DeliverableStatus | string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] || {
    classes: 'border-text-tertiary text-text-tertiary',
  }

  const isActive = !!style.glowPulse

  if (isActive) {
    return (
      <motion.span
        className={cn(
          'inline-block shrink-0 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider',
          style.classes
        )}
        animate={{
          boxShadow: [style.glow!, style.glowPulse!, style.glow!],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {status}
      </motion.span>
    )
  }

  return (
    <span
      className={cn(
        'inline-block shrink-0 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider',
        style.classes
      )}
    >
      {status}
    </span>
  )
}
