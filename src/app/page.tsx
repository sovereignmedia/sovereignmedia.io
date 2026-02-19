'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Container, Section } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import {
  GridBackground,
  GlowOrb,
  GradientLine,
} from '@/components/effects/GridBackground'

// Animation variants
const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const SERVICES = [
  {
    label: 'Brand Strategy',
    description:
      'Comprehensive brand architecture designed to command premium positioning and drive measurable capital outcomes.',
    metric: '15.32X',
    metricLabel: 'Top ROAS delivered',
  },
  {
    label: 'Content Production',
    description:
      'AI-augmented photography, videography, and content systems that scale output without sacrificing quality.',
    metric: '$581K',
    metricLabel: 'Cost savings achieved',
  },
  {
    label: 'Campaign Architecture',
    description:
      'Full-funnel campaign design from awareness to conversion, engineered for capital efficiency.',
    metric: '4.97X',
    metricLabel: 'Blended ROAS',
  },
  {
    label: 'Fractional CMO',
    description:
      'Executive-level marketing leadership embedded in your organization without the full-time overhead.',
    metric: '33%',
    metricLabel: 'Conversion rate',
  },
]

export default function HomePage() {
  return (
    <>
      <Navigation />

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <GridBackground variant="spotlight" />
        <GlowOrb
          className="-top-32 left-1/4"
          color="blue"
          size={600}
          delay={0}
        />
        <GlowOrb
          className="-bottom-48 right-1/4"
          color="white"
          size={500}
          delay={2}
        />

        <Container className="relative z-10 py-32">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-4xl text-center"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp}>
              <span className="inline-block font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
                Strategic Marketing Architecture
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display text-display-lg font-semibold leading-[1.05] tracking-tight text-text-primary md:text-display-xl"
            >
              Measurable capital
              <br />
              <span className="text-text-secondary">outcomes.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-8 max-w-2xl text-body-lg text-text-secondary"
            >
              We architect marketing systems that generate quantified returns.
              Brand strategy, content production, and campaign execution
              engineered for capital efficiency.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button size="lg" href="/work">
                View Work
                <ArrowRight size={16} />
              </Button>
              <Button variant="outline" size="lg" href="/#services">
                Our Approach
              </Button>
            </motion.div>

            {/* Proof Bar */}
            <motion.div
              variants={fadeUp}
              className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
            >
              {[
                { value: '$4.49M', label: 'Capital Raised' },
                { value: '15.32X', label: 'Peak ROAS' },
                { value: '$581K', label: 'Cost Savings' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-mono text-2xl font-semibold text-text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-mono text-label uppercase tracking-wider text-text-tertiary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-text-tertiary" />
        </motion.div>
      </section>

      <GradientLine />

      {/* ============================================
          SERVICES SECTION
          ============================================ */}
      <Section id="services">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <span className="font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
              Services
            </span>
            <h2 className="mt-4 font-display text-display-sm font-semibold text-text-primary md:text-display-md">
              Full-spectrum marketing
              <br />
              <span className="text-text-secondary">leadership.</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="card group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-heading-md font-semibold text-text-primary">
                      {service.label}
                    </h3>
                    <p className="mt-3 max-w-md text-body-sm text-text-secondary">
                      {service.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-2xl font-semibold text-accent-blue">
                      {service.metric}
                    </p>
                    <p className="mt-1 font-mono text-label uppercase tracking-wider text-text-tertiary">
                      {service.metricLabel}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <GradientLine />

      {/* ============================================
          APPROACH SECTION
          ============================================ */}
      <Section id="about" className="relative overflow-hidden">
        <GridBackground variant="radial" />
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
                Approach
              </span>
              <h2 className="mt-4 font-display text-display-sm font-semibold text-text-primary md:text-display-md">
                Strategy before tactics.
              </h2>
              <div className="mt-8 space-y-6">
                <p className="text-body-lg text-text-secondary">
                  Most agencies sell deliverables. We sell outcomes. Every engagement
                  begins with a comprehensive marketing audit that identifies the
                  highest-leverage opportunities for your business.
                </p>
                <p className="text-body-lg text-text-secondary">
                  From there, we architect a complete marketing system — brand
                  positioning, content strategy, campaign infrastructure, and
                  measurement frameworks — designed to generate quantified returns
                  on every dollar invested.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      <GradientLine />

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <Section id="contact" className="relative overflow-hidden">
        <GlowOrb className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color="blue" size={500} />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-display text-display-sm font-semibold text-text-primary md:text-display-md">
              Ready to talk strategy?
            </h2>
            <p className="mt-6 text-body-lg text-text-secondary">
              Start with a free marketing audit. We&apos;ll identify the
              highest-impact opportunities and show you exactly what&apos;s possible.
            </p>
            <div className="mt-10">
              <Button size="lg" href="mailto:chase@sovereignmedia.io">
                Book a Strategy Call
                <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Footer />
    </>
  )
}
