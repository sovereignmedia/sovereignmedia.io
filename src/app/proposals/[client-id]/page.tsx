'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Container, Section } from '@/components/layout/Container'
import { GradientLine } from '@/components/effects/GridBackground'

/**
 * Client Proposal Page
 *
 * This page is protected by middleware (src/middleware.ts).
 * Only clients with valid access tokens can view it.
 *
 * Content is loaded from MDX files in src/content/proposals/
 * or can be built dynamically with showcase components.
 *
 * Usage:
 * 1. Create proposal content in src/content/proposals/{client-id}.mdx
 * 2. Add client token to .env.local: CLIENT_TOKEN_CLIENTID=<token>
 * 3. Share access link: /proposals/{client-id}?token=<token>
 */
export default function ProposalPage() {
  const params = useParams()
  const clientId = params['client-id'] as string

  return (
    <>
      <Navigation />

      <Section className="pt-32" padding="none">
        <Container size="narrow" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Proposal Header */}
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
                Proposal
              </span>
              <span className="h-px flex-1 bg-border-subtle" />
              <span className="font-mono text-label text-text-tertiary">
                Confidential
              </span>
            </div>

            <h1 className="font-display text-display-sm font-semibold text-text-primary">
              Strategic Marketing
              <br />
              <span className="text-text-secondary">Engagement</span>
            </h1>

            <p className="mt-6 text-body-lg text-text-secondary">
              Prepared for <span className="text-text-primary font-medium capitalize">{clientId.replace(/-/g, ' ')}</span>
            </p>

            <GradientLine className="my-12" />

            {/* Proposal Body */}
            {/* TODO: Load MDX content from src/content/proposals/{clientId}.mdx */}
            {/* TODO: Embed showcase widgets as specified in frontmatter */}
            <div className="prose-sovereign">
              <h2>Executive Summary</h2>
              <p>
                This proposal outlines a comprehensive marketing engagement designed
                to deliver measurable capital outcomes for your business. Our approach
                combines strategic brand architecture with tactical campaign execution,
                all measured against quantified performance benchmarks.
              </p>

              <h2>Scope of Work</h2>
              <p>
                Details of the proposed engagement will be loaded from your
                personalized proposal document.
              </p>

              {/* Interactive widgets will be embedded here via MDX */}
              {/* Example: <PricingCalculator basePrice={5000} /> */}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Footer />
    </>
  )
}
