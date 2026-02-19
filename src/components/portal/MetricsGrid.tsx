'use client'

import { motion } from 'framer-motion'
import type { Metric } from '@/types/portal'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

interface MetricsGridProps {
  metrics: Metric[]
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
      {metrics.map((metric, i) => (
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
            background: 'linear-gradient(135deg, var(--color-bg-card) 0%, var(--color-bg-elevated) 100%)',
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
  )
}
