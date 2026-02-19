'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { DeliverableStatus } from '@/types/portal'

interface StatusConfig {
  bg: string
  text: string
  border: string
  borderPulse: string
  glow: string
  glowPulse: string
}

const ACTIVE_STYLES: Record<string, StatusConfig> = {
  'In Development': {
    bg: 'rgba(0, 204, 102, 0.08)',
    text: 'var(--color-success)',
    border: 'rgba(0, 204, 102, 0.3)',
    borderPulse: 'rgba(0, 204, 102, 0.55)',
    glow: '0 0 12px rgba(0, 204, 102, 0.15)',
    glowPulse: '0 0 20px rgba(0, 204, 102, 0.4)',
  },
  Completed: {
    bg: 'rgba(0, 204, 102, 0.12)',
    text: 'var(--color-success)',
    border: 'rgba(0, 204, 102, 0.3)',
    borderPulse: 'rgba(0, 204, 102, 0.55)',
    glow: '0 0 12px rgba(0, 204, 102, 0.15)',
    glowPulse: '0 0 20px rgba(0, 204, 102, 0.4)',
  },
  'Under Review': {
    bg: 'rgba(255, 170, 0, 0.08)',
    text: 'var(--color-warning)',
    border: 'rgba(255, 170, 0, 0.3)',
    borderPulse: 'rgba(255, 170, 0, 0.5)',
    glow: '0 0 12px rgba(255, 170, 0, 0.12)',
    glowPulse: '0 0 20px rgba(255, 170, 0, 0.3)',
  },
  Ongoing: {
    bg: 'rgba(0, 102, 255, 0.08)',
    text: 'var(--color-accent-blue)',
    border: 'rgba(0, 102, 255, 0.3)',
    borderPulse: 'rgba(0, 102, 255, 0.55)',
    glow: '0 0 12px rgba(0, 102, 255, 0.15)',
    glowPulse: '0 0 20px rgba(0, 102, 255, 0.4)',
  },
}

interface StatusBadgeProps {
  status: DeliverableStatus | string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = ACTIVE_STYLES[status]

  if (config) {
    return (
      <motion.span
        className="inline-block shrink-0 rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wider"
        style={{
          backgroundColor: config.bg,
          color: config.text,
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
        animate={{
          borderColor: [config.border, config.borderPulse, config.border],
          boxShadow: [config.glow, config.glowPulse, config.glow],
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

  // Static fallback for Planned / unknown statuses
  return (
    <span
      className={cn(
        'inline-block shrink-0 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider',
        status === 'Planned'
          ? 'border-border-default bg-transparent text-text-tertiary'
          : 'border-text-tertiary text-text-tertiary'
      )}
    >
      {status}
    </span>
  )
}
