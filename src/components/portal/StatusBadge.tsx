'use client'

import { cn } from '@/lib/utils'
import type { DeliverableStatus } from '@/types/portal'

const STATUS_STYLES: Record<string, { classes: string; glow?: string }> = {
  'In Development': {
    classes: 'bg-success/[0.08] border-success/30 text-success',
    glow: '0 0 12px rgba(0, 204, 102, 0.15)',
  },
  Planned: {
    classes: 'bg-transparent border-border-default text-text-tertiary',
  },
  Completed: {
    classes: 'bg-success/[0.15] border-success/30 text-success',
    glow: '0 0 12px rgba(0, 204, 102, 0.15)',
  },
  'Under Review': {
    classes: 'bg-warning/[0.08] border-warning/30 text-warning',
    glow: '0 0 12px rgba(255, 170, 0, 0.12)',
  },
  Ongoing: {
    classes: 'bg-accent-blue/[0.08] border-accent-blue/30 text-accent-blue',
    glow: '0 0 12px rgba(0, 102, 255, 0.15)',
  },
}

interface StatusBadgeProps {
  status: DeliverableStatus | string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] || {
    classes: 'border-text-tertiary text-text-tertiary',
  }

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
