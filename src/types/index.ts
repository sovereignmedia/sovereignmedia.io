/* ============================================
   SOVEREIGN MEDIA — TYPE DEFINITIONS
   ============================================ */

// ---- Portfolio / Projects ----

export type ProjectCategory =
  | 'photography'
  | 'video'
  | 'web-design'
  | 'software'
  | 'marketing'

export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  slug: string
  title: string
  client: string
  category: ProjectCategory
  date: string
  thumbnail: string
  heroImage: string
  summary: string
  tags: string[]
  featured: boolean
  metrics?: ProjectMetric[]
  content?: string // MDX content body
}

// ---- Proposals ----

export type ProposalStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined'

export interface ProposalSection {
  id: string
  title: string
  content: string
  widgets?: string[] // Showcase component names
}

export interface Proposal {
  clientId: string
  title: string
  date: string
  status: ProposalStatus
  sections: ProposalSection[]
}

// ---- Client Portal ----

export interface ClientFeedback {
  id: string
  clientId: string
  proposalId?: string
  message: string
  createdAt: string
  status: 'new' | 'read' | 'resolved'
}

export interface ClientAccess {
  clientId: string
  clientName: string
  email: string
  accessToken: string
  proposals: string[]
  portalEnabled: boolean
}

// ---- Showcase / Component Registry ----

export type ComponentSource = 'custom' | 'v0' | 'github'

export interface ShowcaseMeta {
  name: string
  description: string
  source: ComponentSource
  sourceUrl?: string
  tags: string[]
  addedDate: string
}

// ---- Navigation ----

export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export interface NavSection {
  title: string
  items: NavItem[]
}

// ---- Animation Variants ----

export interface MotionVariant {
  initial: Record<string, number | string>
  animate: Record<string, number | string>
  exit?: Record<string, number | string>
}
