/**
 * SHOWCASE COMPONENT REGISTRY
 *
 * This module provides a registry of all portable components
 * that can be embedded in proposals, case studies, and pages.
 *
 * Adding a new showcase component:
 * 1. Create a folder: src/components/showcase/YourComponent/
 * 2. Add index.tsx with a default export
 * 3. Add _meta.ts with component metadata
 * 4. Register it in the REGISTRY below
 *
 * Components can then be embedded in MDX content or used in
 * any page via the registry lookup.
 */

import type { ShowcaseMeta } from '@/types'

interface RegistryEntry {
  meta: ShowcaseMeta
  // Dynamic import function — lazy loads the component
  load: () => Promise<{ default: React.ComponentType<any> }>
}

/**
 * Component Registry
 * Add new showcase components here.
 */
export const SHOWCASE_REGISTRY: Record<string, RegistryEntry> = {
  RegACalculator: {
    meta: {
      name: 'Reg A+ Financial Calculator',
      description:
        'Interactive ROI calculator with ROAS optimization and IPO impact scenario modeling for Reg A+ fundraising',
      source: 'custom',
      tags: ['calculator', 'interactive', 'proposal-widget', 'financial'],
      addedDate: '2026-02-19',
    },
    load: () => import('@/components/widgets/RegACalculator').then((m) => ({ default: m.RegACalculator })),
  },
  ProjectTimeline: {
    meta: {
      name: 'Project Timeline',
      description:
        'Horizontal milestone timeline with animated track, status indicators, and NOW marker for project delivery tracking',
      source: 'custom',
      tags: ['timeline', 'interactive', 'proposal-widget', 'project-management'],
      addedDate: '2026-02-19',
    },
    load: () => import('@/components/widgets/ProjectTimeline').then((m) => ({ default: m.ProjectTimeline })),
  },
}

/**
 * Get all registered showcase components.
 */
export function getAllShowcaseComponents(): (ShowcaseMeta & { key: string })[] {
  return Object.entries(SHOWCASE_REGISTRY).map(([key, entry]) => ({
    key,
    ...entry.meta,
  }))
}

/**
 * Get a showcase component by key.
 * Returns null if not found.
 */
export async function getShowcaseComponent(
  key: string
): Promise<React.ComponentType<any> | null> {
  const entry = SHOWCASE_REGISTRY[key]
  if (!entry) return null

  const module = await entry.load()
  return module.default
}

/**
 * Get showcase components filtered by tag.
 */
export function getShowcaseByTag(
  tag: string
): (ShowcaseMeta & { key: string })[] {
  return getAllShowcaseComponents().filter((c) => c.tags.includes(tag))
}
