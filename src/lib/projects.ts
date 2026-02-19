import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Project, ProjectCategory } from '@/types'

const PROJECTS_DIR = path.join(process.cwd(), 'src/content/projects')

/**
 * Get all project metadata (without full content).
 */
export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return []

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.mdx'))

  const projects = files.map((filename) => {
    const filepath = path.join(PROJECTS_DIR, filename)
    const raw = fs.readFileSync(filepath, 'utf-8')
    const { data } = matter(raw)

    return {
      slug: filename.replace('.mdx', ''),
      ...data,
    } as Project
  })

  // Sort by date, newest first
  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/**
 * Get projects filtered by category.
 */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getAllProjects().filter((p) => p.category === category)
}

/**
 * Get featured projects for the landing page.
 */
export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured)
}

/**
 * Get a single project by slug, including MDX content.
 */
export function getProjectBySlug(slug: string): (Project & { content: string }) | null {
  const filepath = path.join(PROJECTS_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    content,
    ...data,
  } as Project & { content: string }
}

/**
 * Get all unique categories that have at least one project.
 */
export function getActiveCategories(): ProjectCategory[] {
  const projects = getAllProjects()
  const categories = new Set(projects.map((p) => p.category))
  return Array.from(categories)
}

/**
 * Get all unique tags across all projects.
 */
export function getAllTags(): string[] {
  const projects = getAllProjects()
  const tags = new Set(projects.flatMap((p) => p.tags || []))
  return Array.from(tags).sort()
}

/**
 * Category display names and descriptions.
 */
export const CATEGORY_META: Record<
  ProjectCategory,
  { label: string; description: string }
> = {
  photography: {
    label: 'Photography',
    description: 'Commercial, editorial, and brand photography',
  },
  video: {
    label: 'Video Production',
    description: 'Commercial video, branded content, and documentary',
  },
  'web-design': {
    label: 'Web Design',
    description: 'Digital experiences, landing pages, and web applications',
  },
  software: {
    label: 'Software',
    description: 'Custom applications, dashboards, and interactive tools',
  },
  marketing: {
    label: 'Marketing Strategy',
    description: 'Campaign architecture, brand strategy, and growth systems',
  },
}
