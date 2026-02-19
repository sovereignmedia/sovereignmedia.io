'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

// ============================================
// Animation config
// ============================================

const easeOutExpo = [0.16, 1, 0.3, 1] as const

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
}

// ============================================
// Data
// ============================================

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

// ============================================
// Stage type
// ============================================

type Stage = 'loading' | 'splash' | 'password' | 'main'

// ============================================
// Splash Stage
// ============================================

function SplashStage({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      key="splash"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary"
      exit={{
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.6, ease: easeOutExpo },
      }}
    >
      {/* Atmospheric glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0, 102, 255, 0.04) 0%, transparent 70%)',
        }}
      />

      {/* Slow-pulsing ambient orb */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(0, 102, 255, 0.06) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Title */}
      <motion.h1
        className="relative z-10 font-display text-2xl font-semibold tracking-[0.3em] text-text-primary sm:text-3xl md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: easeOutExpo }}
      >
        SOVEREIGN MEDIA
      </motion.h1>

      {/* Enter button */}
      <motion.button
        className="relative z-10 mt-12 border border-border-subtle px-8 py-3 font-mono text-label uppercase tracking-[0.2em] text-text-tertiary transition-all duration-normal ease-out-expo hover:border-border-hover hover:text-text-secondary"
        style={{ borderRadius: 'var(--radius-sm)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: easeOutExpo }}
        onClick={onEnter}
      >
        Enter
      </motion.button>
    </motion.div>
  )
}

// ============================================
// Password Stage
// ============================================

function PasswordStage({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus input after entrance animation
    const timer = setTimeout(() => inputRef.current?.focus(), 600)
    return () => clearTimeout(timer)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting || !password.trim()) return

    setSubmitting(true)
    setError(false)

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      })
      const data = await res.json()

      if (data.valid) {
        onSuccess()
      } else {
        setError(true)
        setPassword('')
        setTimeout(() => setError(false), 1000)
      }
    } catch {
      setError(true)
      setTimeout(() => setError(false), 1000)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      key="password"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.6, ease: easeOutExpo },
      }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
    >
      {/* Atmospheric glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0, 102, 255, 0.04) 0%, transparent 70%)',
        }}
      />

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col items-center">
        {/* Input */}
        <motion.input
          ref={inputRef}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter access code"
          className="w-64 border-b bg-transparent pb-3 text-center font-mono text-body-md text-text-primary placeholder:text-text-tertiary focus:outline-none sm:w-80"
          style={{
            borderBottomColor: error
              ? 'var(--color-error)'
              : 'rgba(255, 255, 255, 0.3)',
            transition: 'border-color 0.3s ease',
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: 0,
            x: error ? [0, -8, 8, -6, 6, -3, 3, 0] : 0,
          }}
          transition={
            error
              ? { x: { duration: 0.5, ease: 'easeInOut' } }
              : { duration: 0.8, ease: easeOutExpo }
          }
          autoComplete="off"
          spellCheck={false}
        />

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={submitting}
          className="mt-10 border border-border-subtle px-8 py-3 font-mono text-label uppercase tracking-[0.2em] text-text-tertiary transition-all duration-normal ease-out-expo hover:border-border-hover hover:text-text-secondary disabled:opacity-50"
          style={{ borderRadius: 'var(--radius-sm)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: easeOutExpo }}
        >
          Submit
        </motion.button>
      </form>

      {/* Dev bypass — remove when pages are finalized */}
      <button
        onClick={onSuccess}
        className="absolute bottom-6 right-6 z-20 font-mono text-xs text-text-tertiary/30 transition-colors hover:text-text-tertiary"
      >
        dev bypass
      </button>
    </motion.div>
  )
}

// ============================================
// Main Homepage Content
// ============================================

function HomeContent({ showNav }: { showNav: boolean }) {
  return (
    <>
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
          >
            <Navigation />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <GridBackground variant="spotlight" />
        <GlowOrb className="-top-32 left-1/4" color="blue" size={600} delay={0} />
        <GlowOrb className="-bottom-48 right-1/4" color="white" size={500} delay={2} />

        <Container className="relative z-10 py-32">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
                Strategic Marketing Architecture
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display text-display-lg font-semibold leading-[1.05] tracking-tight text-text-primary md:text-display-xl"
            >
              Measurable capital
              <br />
              <span className="text-text-secondary">outcomes.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-8 max-w-2xl text-body-lg text-text-secondary"
            >
              We architect marketing systems that generate quantified returns.
              Brand strategy, content production, and campaign execution
              engineered for capital efficiency.
            </motion.p>

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

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-text-tertiary" />
        </motion.div>
      </section>

      <GradientLine />

      {/* SERVICES SECTION */}
      <Section id="services">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
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
                  ease: easeOutExpo,
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

      {/* APPROACH SECTION */}
      <Section id="about" className="relative overflow-hidden">
        <GridBackground variant="radial" />
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
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

      {/* CTA SECTION */}
      <Section id="contact" className="relative overflow-hidden">
        <GlowOrb className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color="blue" size={500} />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
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

// ============================================
// Root Page — 3-Stage Flow
// ============================================

export default function HomePage() {
  const [stage, setStage] = useState<Stage>('loading')
  const [navVisible, setNavVisible] = useState(false)

  // Check cookie on mount
  useEffect(() => {
    fetch('/api/auth/check', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setStage('main')
          setNavVisible(true)
        } else {
          setStage('splash')
        }
      })
      .catch(() => setStage('splash'))
  }, [])

  function handleEnter() {
    setStage('password')
  }

  function handlePasswordSuccess() {
    setStage('main')
    setTimeout(() => setNavVisible(true), 700)
  }

  // Show nothing during loading to prevent flash
  if (stage === 'loading') {
    return <div className="min-h-screen bg-bg-primary" />
  }

  return (
    <>
      {/* Main site content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={stage === 'main' ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.8,
          delay: stage === 'main' ? 0.4 : 0,
          ease: easeOutExpo,
        }}
      >
        <HomeContent showNav={navVisible} />
      </motion.div>

      {/* Overlay stages */}
      <AnimatePresence mode="wait">
        {stage === 'splash' && (
          <SplashStage onEnter={handleEnter} />
        )}
        {stage === 'password' && (
          <PasswordStage onSuccess={handlePasswordSuccess} />
        )}
      </AnimatePresence>
    </>
  )
}
