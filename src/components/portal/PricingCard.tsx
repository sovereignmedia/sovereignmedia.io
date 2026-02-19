'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { PricingConfig } from '@/types/portal'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

interface PricingCardProps {
  pricing: PricingConfig
}

export function PricingCard({ pricing }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: 0.1, ease: easeOutExpo }}
      className="group/pricing relative mt-10 overflow-hidden rounded-xl border border-white/[0.06] backdrop-blur-xl transition-all duration-500"
      style={{
        background: 'linear-gradient(135deg, rgba(20, 28, 31, 0.65) 0%, rgba(15, 23, 26, 0.55) 100%)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
        e.currentTarget.style.boxShadow = '0 0 40px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.05)'
        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(24, 32, 35, 0.7) 0%, rgba(18, 26, 29, 0.6) 100%)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)'
        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 28, 31, 0.65) 0%, rgba(15, 23, 26, 0.55) 100%)'
      }}
    >
      {/* Top edge glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)',
        }}
      />

      <div className="p-6 md:p-8">
        <h3 className="font-display text-heading-md font-semibold text-text-primary md:text-heading-lg">
          {pricing.title}
        </h3>
        <p className="mt-3 max-w-2xl tracking-wide text-body-sm text-text-secondary">
          {pricing.description}
        </p>

        <div className="mt-8 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
          <span
            className="font-mono text-4xl font-semibold text-text-primary md:text-5xl"
            style={{
              textShadow: '0 0 40px rgba(255,255,255,0.1)',
            }}
          >
            {pricing.price}
          </span>
          <span className="font-mono text-body-sm text-text-tertiary">
            {pricing.hours}
          </span>
        </div>

        <div className="mt-6 space-y-2">
          {pricing.subDetails.map((detail, i) => (
            <p key={i} className="text-body-sm text-text-tertiary">
              {detail}
            </p>
          ))}
        </div>

        {pricing.invoiceUrl && (
          <div className="mt-8 flex justify-end">
            <a
              href={pricing.invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent-blue px-5 py-2.5 font-mono text-sm font-medium text-white transition-all duration-300 hover:bg-accent-blue/85 hover:shadow-[0_0_20px_rgba(0,102,255,0.25)]"
            >
              View Invoice
              <ArrowRight size={14} />
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}
