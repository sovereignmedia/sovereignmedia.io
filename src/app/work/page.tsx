'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Container, Section } from '@/components/layout/Container'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { GridBackground } from '@/components/effects/GridBackground'
import { cn } from '@/lib/utils'
import type { ProjectCategory } from '@/types'

// TODO: Replace with actual data from getAllProjects()
// This is placeholder structure for Claude Code to build from
const PLACEHOLDER_PROJECTS = [
  {
    slug: 'frontieras-dashboard',
    title: 'Interactive Financial Dashboard',
    client: 'Frontieras North America',
    category: 'software' as ProjectCategory,
    date: '2025-04',
    thumbnail: '',
    heroImage: '',
    summary: 'Investor-grade React dashboard with real-time scenario modeling, global market analysis across 9 countries, and detailed unit economics.',
    tags: ['react', 'dashboard', 'fintech'],
    featured: true,
    metrics: [
      { label: 'ROAS', value: '4.97X' },
      { label: 'Capital Raised', value: '$4.49M' },
      { label: 'Cost Savings', value: '$581K' },
    ],
  },
]

const CATEGORIES: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'photography', label: 'Photography' },
  { value: 'video', label: 'Video' },
  { value: 'web-design', label: 'Web Design' },
  { value: 'software', label: 'Software' },
  { value: 'marketing', label: 'Marketing' },
]

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all')

  const filteredProjects =
    activeCategory === 'all'
      ? PLACEHOLDER_PROJECTS
      : PLACEHOLDER_PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <>
      <Navigation />

      <Section className="pt-32" padding="none">
        <GridBackground variant="radial" />
        <Container className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
              Portfolio
            </span>
            <h1 className="mt-4 font-display text-display-sm font-semibold text-text-primary md:text-display-md">
              Selected work.
            </h1>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'rounded-md px-4 py-2 font-mono text-label uppercase tracking-wider transition-all duration-fast',
                  activeCategory === cat.value
                    ? 'bg-white text-black'
                    : 'bg-bg-card text-text-secondary hover:bg-bg-card-hover hover:text-text-primary'
                )}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Project Grid */}
          <div className="mt-12 grid gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-32 text-center">
              <p className="text-body-lg text-text-tertiary">
                No projects in this category yet.
              </p>
            </div>
          )}
        </Container>
      </Section>

      <Footer />
    </>
  )
}
