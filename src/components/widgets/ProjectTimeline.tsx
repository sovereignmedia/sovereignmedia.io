'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ============================================
// Types
// ============================================

type MilestoneType = 'deliverable' | 'company-milestone'

interface TimelineMilestone {
  id: string
  label: string
  description?: string
  date: string
  displayDate: string
  type: MilestoneType
  color?: string
  status: 'completed' | 'in-progress' | 'upcoming'
  linkedDeliverableId?: string
}

// ============================================
// TIMELINE MILESTONES — edit data here
// ============================================

const TIMELINE_RANGE = {
  start: '2026-02',
  end: '2026-10',
}

const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'engagement-start',
    label: 'Engagement Initiated',
    description: 'Proposal finalized, scope of work confirmed',
    date: '2026-02',
    displayDate: 'February 2026',
    type: 'deliverable',
    status: 'in-progress',
    linkedDeliverableId: 'coordination',
  },
  {
    id: 'dashboards-complete',
    label: 'Investor Intelligence Dashboards',
    description: 'Retail and institutional dashboards completed and deployed',
    date: '2026-04',
    displayDate: 'April 2026',
    type: 'deliverable',
    status: 'upcoming',
    linkedDeliverableId: 'dashboards',
  },
  {
    id: '3d-animation',
    label: '3D Animation Videos',
    description: 'Target completion for 3D animation campaign assets',
    date: '2026-05',
    displayDate: 'May 2026',
    type: 'deliverable',
    status: 'upcoming',
    linkedDeliverableId: 'digital-assets',
  },
  {
    id: 'marketing-videos',
    label: 'Marketing Video Package',
    description: 'Additional marketing videos completed with vendor partners',
    date: '2026-05-15',
    displayDate: 'May 2026',
    type: 'deliverable',
    status: 'upcoming',
    linkedDeliverableId: 'digital-assets',
  },
  {
    id: 'ipo',
    label: 'IPO',
    description: 'Frontieras North America initial public offering',
    date: '2026-09',
    displayDate: 'September 2026',
    type: 'company-milestone',
    status: 'upcoming',
    color: '#FFFFFF',
  },
]

// ============================================
// Animation config
// ============================================

const easeOutExpo = [0.16, 1, 0.3, 1] as const

// ============================================
// Helpers
// ============================================

function parseMonth(dateStr: string): number {
  const parts = dateStr.split('-')
  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const day = parts[2] ? parseInt(parts[2], 10) : 1
  return year * 12 + (month - 1) + (day - 1) / 30
}

function getPosition(dateStr: string): number {
  const start = parseMonth(TIMELINE_RANGE.start)
  const end = parseMonth(TIMELINE_RANGE.end)
  const current = parseMonth(dateStr)
  return Math.max(0, Math.min(100, ((current - start) / (end - start)) * 100))
}

function getNowPosition(): number {
  const now = new Date()
  const str = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  return getPosition(str)
}

function getMonthLabels(): { label: string; position: number }[] {
  const start = TIMELINE_RANGE.start.split('-')
  const end = TIMELINE_RANGE.end.split('-')
  const startYear = parseInt(start[0], 10)
  const startMonth = parseInt(start[1], 10)
  const endYear = parseInt(end[0], 10)
  const endMonth = parseInt(end[1], 10)

  const months: { label: string; position: number }[] = []
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  let y = startYear
  let m = startMonth
  while (y < endYear || (y === endYear && m <= endMonth)) {
    const dateStr = `${y}-${String(m).padStart(2, '0')}`
    months.push({ label: names[m - 1], position: getPosition(dateStr) })
    m++
    if (m > 12) { m = 1; y++ }
  }
  return months
}

// Assign each milestone a row: 'above' | 'below', with stagger for
// milestones that are too close together on the same side.
interface LayoutMilestone extends TimelineMilestone {
  side: 'above' | 'below'
  connectorHeight: number // px — so close milestones get taller connectors
}

function layoutMilestones(): LayoutMilestone[] {
  // Manually assign sides to ensure no collisions given known data
  const sides: Record<string, 'above' | 'below'> = {
    'engagement-start': 'above',
    'dashboards-complete': 'below',
    '3d-animation': 'above',
    'marketing-videos': 'below',
    'ipo': 'above',
  }

  // Give taller connectors to milestones that share roughly the same x position
  // so their cards don't overlap the track area
  return TIMELINE_MILESTONES.map((ms) => ({
    ...ms,
    side: sides[ms.id] ?? (TIMELINE_MILESTONES.indexOf(ms) % 2 === 0 ? 'above' : 'below'),
    connectorHeight: 28,
  }))
}

// ============================================
// Label card component
// ============================================

const CARD_WIDTH = 148 // px — used for both card width and overlap detection

function LabelCard({
  ms,
  isHovered,
  onHover,
  onLeave,
  side,
  connectorHeight,
  index,
}: {
  ms: TimelineMilestone
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  side: 'above' | 'below'
  connectorHeight: number
  index: number
}) {
  const pos = getPosition(ms.date)
  const dotColor =
    ms.status === 'completed'
      ? 'var(--color-success)'
      : ms.color || 'var(--color-accent-blue)'

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${pos}%`,
        // For 'above': card sits above track. For 'below': card sits below track.
        // The parent container has the track at its vertical center.
        // We use bottom/top offsets from the center.
        ...(side === 'above'
          ? { bottom: 0, transform: 'translateX(-50%)' }
          : { top: 0, transform: 'translateX(-50%)' }),
      }}
      initial={{ opacity: 0, y: side === 'above' ? 12 : -12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: easeOutExpo }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {side === 'above' ? (
        // Above: card → connector → track
        <>
          <div
            className={cn(
              'rounded-md border px-3 py-2.5 text-center transition-all duration-300',
              isHovered ? 'border-border-hover bg-bg-card-hover' : 'border-border-subtle bg-white/[0.02]'
            )}
            style={{ width: CARD_WIDTH }}
          >
            <div className="flex items-center justify-center gap-1.5">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />
              <span className="text-xs font-medium leading-snug text-text-primary">{ms.label}</span>
            </div>
            <span className="mt-1 block font-mono text-[10px] text-text-tertiary">{ms.displayDate}</span>
            {isHovered && ms.description && (
              <motion.p
                className="mt-1.5 text-[10px] leading-relaxed text-text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                {ms.description}
              </motion.p>
            )}
          </div>
          {/* Connector */}
          <div
            className="mx-auto w-px"
            style={{
              height: connectorHeight,
              backgroundColor: dotColor,
              opacity: isHovered ? 0.5 : 0.2,
              transition: 'opacity 0.3s ease',
            }}
          />
        </>
      ) : (
        // Below: track → connector → card
        <>
          <div
            className="mx-auto w-px"
            style={{
              height: connectorHeight,
              backgroundColor: dotColor,
              opacity: isHovered ? 0.5 : 0.2,
              transition: 'opacity 0.3s ease',
            }}
          />
          <div
            className={cn(
              'rounded-md border px-3 py-2.5 text-center transition-all duration-300',
              isHovered ? 'border-border-hover bg-bg-card-hover' : 'border-border-subtle bg-white/[0.02]'
            )}
            style={{ width: CARD_WIDTH }}
          >
            <div className="flex items-center justify-center gap-1.5">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />
              <span className="text-xs font-medium leading-snug text-text-primary">{ms.label}</span>
            </div>
            <span className="mt-1 block font-mono text-[10px] text-text-tertiary">{ms.displayDate}</span>
            {isHovered && ms.description && (
              <motion.p
                className="mt-1.5 text-[10px] leading-relaxed text-text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                {ms.description}
              </motion.p>
            )}
          </div>
        </>
      )}
    </motion.div>
  )
}

// ============================================
// Desktop Horizontal Timeline
// ============================================

// Heights (px)
const LABEL_AREA_H = 110 // height of the above-label area
const TRACK_H = 2        // height of the track bar
const BELOW_H = 110      // height of the below-label area (below month labels)
const MONTH_ROW_H = 20   // height of month label row

function HorizontalTimeline() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const months = useMemo(() => getMonthLabels(), [])
  const nowPos = useMemo(() => getNowPosition(), [])
  const laid = useMemo(() => layoutMilestones(), [])

  const above = laid.filter((m) => m.side === 'above')
  const below = laid.filter((m) => m.side === 'below')

  return (
    <div className="relative hidden md:block select-none">
      {/* Atmospheric glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,102,255,0.03) 0%, transparent 70%)',
        }}
      />

      {/* ── ABOVE LABELS ────────────────────────────── */}
      {/* Positioned relative container; cards anchor bottom: 0 so connector meets track */}
      <div className="relative" style={{ height: LABEL_AREA_H }}>
        {above.map((ms, i) => (
          <LabelCard
            key={ms.id}
            ms={ms}
            isHovered={hoveredId === ms.id}
            onHover={() => setHoveredId(ms.id)}
            onLeave={() => setHoveredId(null)}
            side="above"
            connectorHeight={ms.connectorHeight}
            index={i}
          />
        ))}
      </div>

      {/* ── TRACK ───────────────────────────────────── */}
      <div className="relative" style={{ height: TRACK_H + 24 }}>
        {/* The actual line */}
        <motion.div
          className="absolute"
          style={{
            top: 12,
            left: 0,
            right: 0,
            height: TRACK_H,
            background:
              'linear-gradient(to right, transparent 1%, var(--color-border-default) 8%, var(--color-border-default) 92%, transparent 99%)',
          }}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easeOutExpo }}
        />

        {/* NOW indicator */}
        <motion.div
          className="absolute z-30"
          style={{
            left: `${nowPos}%`,
            top: 12,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9, ease: easeOutExpo }}
        >
          <motion.div
            className="h-3 w-3 rotate-45 rounded-sm"
            style={{ backgroundColor: 'var(--color-accent-blue)' }}
            animate={{
              boxShadow: [
                '0 0 8px rgba(0,102,255,0.3)',
                '0 0 18px rgba(0,102,255,0.55)',
                '0 0 8px rgba(0,102,255,0.3)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: easeOutExpo }}
          />
          <span
            className="absolute font-mono text-[9px] font-semibold tracking-[0.15em] text-accent-blue"
            style={{
              top: -18,
              left: '50%',
              transform: 'translateX(-50%)',
              textShadow: '0 0 8px rgba(0,102,255,0.4)',
            }}
          >
            NOW
          </span>
        </motion.div>

        {/* Milestone dots */}
        {laid.map((ms, i) => {
          const isCompany = ms.type === 'company-milestone'
          const isCompleted = ms.status === 'completed'
          const isInProgress = ms.status === 'in-progress'
          const isHovered = hoveredId === ms.id
          const dotColor =
            ms.status === 'completed'
              ? 'var(--color-success)'
              : ms.color || 'var(--color-accent-blue)'
          const size = isCompany ? 12 : 9
          const glowBase = isCompany
            ? '0 0 10px rgba(255,255,255,0.25)'
            : isCompleted
              ? '0 0 10px rgba(0,204,102,0.4)'
              : '0 0 10px rgba(0,102,255,0.3)'
          const glowHover = isCompany
            ? '0 0 18px rgba(255,255,255,0.5)'
            : isCompleted
              ? '0 0 18px rgba(0,204,102,0.6)'
              : '0 0 18px rgba(0,102,255,0.5)'

          return (
            <motion.div
              key={ms.id}
              className="absolute z-20 cursor-pointer"
              style={{
                left: `${getPosition(ms.date)}%`,
                top: 12,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.12, ease: easeOutExpo }}
              onMouseEnter={() => setHoveredId(ms.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {isInProgress ? (
                <motion.div
                  style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    backgroundColor: dotColor,
                  }}
                  animate={{
                    boxShadow: isHovered
                      ? [glowHover, glowHover, glowHover]
                      : [glowBase, glowHover, glowBase],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: easeOutExpo }}
                />
              ) : (
                <div
                  style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    backgroundColor: ms.status === 'upcoming' ? 'transparent' : dotColor,
                    border: ms.status === 'upcoming' ? `1.5px solid ${dotColor}` : 'none',
                    boxShadow: isHovered ? glowHover : glowBase,
                    transition: 'box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* ── MONTH LABELS ────────────────────────────── */}
      <div className="relative" style={{ height: MONTH_ROW_H }}>
        {months.map((month) => (
          <span
            key={month.label}
            className="absolute font-mono text-[10px] uppercase tracking-wider text-text-tertiary"
            style={{ left: `${month.position}%`, top: 4, transform: 'translateX(-50%)' }}
          >
            {month.label}
          </span>
        ))}
      </div>

      {/* ── BELOW LABELS ────────────────────────────── */}
      {/* Cards anchor top: 0 so connector starts right at top of this area */}
      <div className="relative" style={{ height: BELOW_H }}>
        {below.map((ms, i) => (
          <LabelCard
            key={ms.id}
            ms={ms}
            isHovered={hoveredId === ms.id}
            onHover={() => setHoveredId(ms.id)}
            onLeave={() => setHoveredId(null)}
            side="below"
            connectorHeight={ms.connectorHeight}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}

// ============================================
// Mobile Vertical Timeline
// ============================================

function VerticalTimeline() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const nowPos = useMemo(() => getNowPosition(), [])

  const sorted = useMemo(
    () => [...TIMELINE_MILESTONES].sort((a, b) => parseMonth(a.date) - parseMonth(b.date)),
    []
  )

  return (
    <div className="relative block md:hidden">
      {/* Vertical track */}
      <motion.div
        className="absolute top-0 bottom-0 w-px"
        style={{
          left: 6,
          background:
            'linear-gradient(to bottom, transparent 0%, var(--color-border-default) 5%, var(--color-border-default) 95%, transparent 100%)',
        }}
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: easeOutExpo }}
      />

      <div className="space-y-6 pl-10">
        {sorted.map((ms, i) => {
          const isCompany = ms.type === 'company-milestone'
          const isCompleted = ms.status === 'completed'
          const isInProgress = ms.status === 'in-progress'
          const isHovered = hoveredId === ms.id
          const dotColor = isCompleted
            ? 'var(--color-success)'
            : ms.color || 'var(--color-accent-blue)'
          const dotSize = isCompany ? 10 : 8

          const msPos = getPosition(ms.date)
          const nextMs = sorted[i + 1]
          const nextPos = nextMs ? getPosition(nextMs.date) : 100
          const showNow = nowPos >= msPos && nowPos < nextPos

          return (
            <div key={ms.id}>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: easeOutExpo }}
                onMouseEnter={() => setHoveredId(ms.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Dot on the track */}
                <div
                  className="absolute"
                  style={{
                    top: 4,
                    left: -(10 + dotSize / 2),
                  }}
                >
                  {isInProgress ? (
                    <motion.div
                      style={{ width: dotSize, height: dotSize, borderRadius: '50%', backgroundColor: dotColor }}
                      animate={{
                        boxShadow: [
                          `0 0 8px rgba(0,102,255,0.3)`,
                          `0 0 16px rgba(0,102,255,0.55)`,
                          `0 0 8px rgba(0,102,255,0.3)`,
                        ],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: easeOutExpo }}
                    />
                  ) : (
                    <div
                      style={{
                        width: dotSize,
                        height: dotSize,
                        borderRadius: '50%',
                        backgroundColor: ms.status === 'upcoming' ? 'transparent' : dotColor,
                        border: ms.status === 'upcoming' ? `1.5px solid ${dotColor}` : 'none',
                        boxShadow: `0 0 8px rgba(0,102,255,0.25)`,
                      }}
                    />
                  )}
                </div>

                <span className="text-sm font-medium text-text-primary">{ms.label}</span>
                <span className="mt-0.5 block font-mono text-[10px] text-text-tertiary">{ms.displayDate}</span>
                {ms.description && (
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">{ms.description}</p>
                )}
              </motion.div>

              {showNow && (
                <motion.div
                  className="my-4 flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5, ease: easeOutExpo }}
                >
                  <motion.div
                    className="h-2.5 w-2.5 rotate-45 rounded-sm"
                    style={{
                      backgroundColor: 'var(--color-accent-blue)',
                      marginLeft: -4,
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 6px rgba(0,102,255,0.3)',
                        '0 0 12px rgba(0,102,255,0.55)',
                        '0 0 6px rgba(0,102,255,0.3)',
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: easeOutExpo }}
                  />
                  <span className="font-mono text-[9px] font-semibold tracking-[0.15em] text-accent-blue">
                    NOW
                  </span>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================
// Main Export
// ============================================

export function ProjectTimeline() {
  return (
    <div>
      <HorizontalTimeline />
      <VerticalTimeline />
    </div>
  )
}
