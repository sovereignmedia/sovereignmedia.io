'use client'

import { motion } from 'framer-motion'
import { ClientPortal } from '@/components/portal'
import { frontierasPortal } from '@/data/portals/frontieras'
import { RegACalculator } from '@/components/widgets/RegACalculator'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

function ValueModelingSection() {
  return (
    <>
      {/* Divider */}
      <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
        <div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(to right, transparent, var(--color-border-default) 20%, var(--color-border-default) 80%, transparent)',
          }}
        />
      </div>

      {/* Section */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <span className="font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
              Value Modeling
            </span>
            <h2 className="mt-4 font-display text-heading-lg font-semibold text-text-primary">
              Interactive Financial Impact Analysis
            </h2>
            <p className="mt-6 max-w-3xl text-body-lg leading-relaxed text-text-secondary">
              Explore how strategic marketing investment optimizes your Reg A+
              raise and creates long-term shareholder value.
            </p>
          </motion.div>

          {/* Calculator widget */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
          >
            <RegACalculator />
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default function FrontierasWorkPage() {
  return (
    <ClientPortal
      config={frontierasPortal}
      afterPricingSections={<ValueModelingSection />}
    />
  )
}
