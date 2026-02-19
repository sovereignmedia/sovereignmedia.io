/* ============================================
   SOVEREIGN MEDIA — PORTAL TYPE DEFINITIONS
   ============================================ */

export type DeliverableStatus =
  | 'In Development'
  | 'Planned'
  | 'Completed'
  | 'Under Review'
  | 'Ongoing'

export interface SubItem {
  title: string
  details: string[]
}

export interface Deliverable {
  id: string
  title: string
  description: string
  status: DeliverableStatus
  progress: number // 0-100
  progressLabel?: string
  subItems?: SubItem[]
  details?: string[]
  /** Optional: highlight specific detail items (e.g. detail text containing "$2.5M") */
  highlightMatch?: string
}

export interface ProofOfWorkEntry {
  date: string
  title: string
  description: string
  tasks?: string[]
}

export interface TimelineEntry {
  date: string
  title: string
  description: string
}

export interface Metric {
  value: string
  label: string
}

export interface PricingConfig {
  title: string
  description: string
  hours: string
  price: string
  subDetails: string[]
  invoiceUrl?: string
}

export interface PortalConfig {
  client: {
    id: string
    name: string
    confidential?: boolean
    contactEmail?: string
  }
  hero: {
    title: string
    subtitle: string
  }
  overview: string
  deliverables: Deliverable[]
  proofOfWork: Record<string, ProofOfWorkEntry[]>
  pricing?: PricingConfig
  timeline?: TimelineEntry[]
  metrics?: {
    title: string
    description: string
    items: Metric[]
  }
  footer?: {
    disclaimer: string
  }
}
