'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PortalAtmosphere } from './PortalAtmosphere'
import { PortalHeader } from './PortalHeader'
import { PortalHero } from './PortalHero'
import { PortalCard } from './PortalCard'
import { PricingCard } from './PricingCard'
import { MetricsGrid } from './MetricsGrid'
import type { PortalConfig, TimelineEntry } from '@/types/portal'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

// ============================================
// Shared layout helpers
// ============================================

function PageSection({
  id,
  children,
  className,
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('py-12 md:py-16', className)}>
      <div className="mx-auto w-full max-w-5xl px-6 md:px-8">{children}</div>
    </section>
  )
}

function Divider() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--color-border-default) 20%, var(--color-border-default) 80%, transparent)',
        }}
      />
    </div>
  )
}

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
    >
      <span className="font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
        {label}
      </span>
      <h2 className="mt-4 font-display text-heading-lg font-semibold text-text-primary">
        {title}
      </h2>
      {description && (
        <p className="mt-6 max-w-3xl text-body-lg leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </motion.div>
  )
}

function TimelineSection({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="mt-10 space-y-0">
      {entries.map((entry, i) => (
        <motion.div
          key={entry.date + entry.title}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.7,
            delay: i * 0.08,
            ease: easeOutExpo,
          }}
          className="relative border-l border-border-subtle pl-8 pb-10 last:pb-0"
        >
          <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-accent-blue bg-bg-primary" />
          <span className="font-mono text-label uppercase tracking-wider text-text-tertiary">
            {entry.date}
          </span>
          <h3 className="mt-2 font-display text-heading-sm font-semibold text-text-primary">
            {entry.title}
          </h3>
          <p className="mt-2 max-w-2xl text-body-sm leading-relaxed text-text-secondary">
            {entry.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================
// Main ClientPortal template
// ============================================

interface ClientPortalProps {
  config: PortalConfig
  /** Optional: render custom sections between standard sections */
  extraSections?: React.ReactNode
  /** Optional: render custom sections between pricing and timeline */
  afterPricingSections?: React.ReactNode
  /** Optional: hide specific sections */
  hideSections?: ('overview' | 'deliverables' | 'pricing' | 'timeline' | 'metrics' | 'footer')[]
}

export function ClientPortal({ config, extraSections, afterPricingSections, hideSections = [] }: ClientPortalProps) {
  const show = (section: string) => !hideSections.includes(section as typeof hideSections[number])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
      className="relative min-h-screen bg-bg-primary"
    >
      <PortalAtmosphere />
      <PortalHeader confidential={config.client.confidential} />

      {/* HERO */}
      <PageSection className="relative z-10 pb-8 pt-16 md:pb-12 md:pt-20">
        <PortalHero
          clientName={config.client.name}
          title={config.hero.title}
          subtitle={config.hero.subtitle}
        />
      </PageSection>

      <Divider />

      {/* OVERVIEW */}
      {show('overview') && (
        <>
          <PageSection className="relative z-10">
            <SectionHeader
              label="Overview"
              title="Engagement Overview"
              description={config.overview}
            />
          </PageSection>
          <Divider />
        </>
      )}

      {/* DELIVERABLES */}
      {show('deliverables') && (
        <>
          <PageSection className="relative z-10">
            <SectionHeader label="Deliverables" title="Projects" />
            <div className="mt-10 space-y-6">
              {config.deliverables.map((deliverable, i) => (
                <PortalCard
                  key={deliverable.id}
                  deliverable={deliverable}
                  index={i}
                  workLogEntries={config.proofOfWork[deliverable.id] || []}
                />
              ))}
            </div>
          </PageSection>
          <Divider />
        </>
      )}

      {/* PRICING */}
      {show('pricing') && config.pricing && (
        <>
          <PageSection className="relative z-10">
            <SectionHeader label="Investment" title="Pricing &amp; Investment" />
            <PricingCard pricing={config.pricing} />
          </PageSection>
          <Divider />
        </>
      )}

      {/* After-pricing custom sections slot */}
      {afterPricingSections}

      {/* TIMELINE */}
      {show('timeline') && config.timeline && config.timeline.length > 0 && (
        <>
          <PageSection className="relative z-10">
            <SectionHeader label="Timeline" title="Progress &amp; Updates" />
            <TimelineSection entries={config.timeline} />
          </PageSection>
          <Divider />
        </>
      )}

      {/* METRICS */}
      {show('metrics') && config.metrics && (
        <>
          <PageSection className="relative z-10">
            <SectionHeader
              label={config.metrics.title.includes('Track') ? 'Track Record' : 'Metrics'}
              title={config.metrics.title}
              description={config.metrics.description}
            />
            <MetricsGrid metrics={config.metrics.items} />
          </PageSection>
          <Divider />
        </>
      )}

      {/* Extra sections slot */}
      {extraSections}

      {/* FOOTER */}
      {show('footer') && config.footer && (
        <footer className="relative z-10 py-16">
          <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
            <p className="text-body-sm text-text-tertiary">
              {config.footer.disclaimer}
            </p>
            {config.client.contactEmail && (
              <p className="mt-2 text-body-sm text-text-tertiary">
                Contact:{' '}
                <a
                  href={`mailto:${config.client.contactEmail}`}
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  {config.client.contactEmail}
                </a>
              </p>
            )}
          </div>
        </footer>
      )}
    </motion.div>
  )
}
