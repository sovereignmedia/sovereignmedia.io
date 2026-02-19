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
  // Example:
  // 'PricingCalculator': {
  //   meta: {
  //     name: 'Interactive Pricing Calculator',
  //     description: 'Real-time pricing calculator with scenario modeling',
  //     source: 'custom',
  //     tags: ['calculator', 'interactive', 'proposal-widget'],
  //     addedDate: '2025-02-19',
  //   },
  //   load: () => import('./PricingCalculator'),
  // },
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
