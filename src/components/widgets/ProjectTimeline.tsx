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
// TIMELINE MILESTONES
// When adding a new deliverable, add a timeline milestone here too.
// Required: id, label, date, displayDate, type, status
// Optional: description, color, linkedDeliverableId
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
  // Handles "YYYY-MM" and "YYYY-MM-DD"
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
    months.push({
      label: names[m - 1],
      position: getPosition(dateStr),
    })
    m++
    if (m > 12) { m = 1; y++ }
  }
  return months
}

// ============================================
// Dot component — the milestone marker on the track
// ============================================

function MilestoneDot({
  milestone,
  isHovered,
  onHover,
  onLeave,
}: {
  milestone: TimelineMilestone
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const isCompany = milestone.type === 'company-milestone'
  const dotColor = milestone.color || 'var(--color-accent-blue)'
  const isCompleted = milestone.status === 'completed'
  const isInProgress = milestone.status === 'in-progress'
  const size = isCompany ? 12 : 9

  const baseGlow = isCompany
    ? '0 0 12px rgba(255,255,255,0.3)'
    : isCompleted
      ? '0 0 12px rgba(0,204,102,0.4)'
      : '0 0 12px rgba(0,102,255,0.3)'

  const hoverGlow = isCompany
    ? '0 0 20px rgba(255,255,255,0.5)'
    : isCompleted
      ? '0 0 20px rgba(0,204,102,0.6)'
      : '0 0 20px rgba(0,102,255,0.5)'

  const fillColor = isCompleted ? 'var(--color-success)' : dotColor

  return (
    <motion.div
      className="absolute top-1/2 z-20 cursor-pointer"
      style={{
        left: `${getPosition(milestone.date)}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
    >
      {isInProgress ? (
        <motion.div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: fillColor,
            border: 'none',
          }}
          animate={{
            boxShadow: isHovered
              ? [hoverGlow, hoverGlow, hoverGlow]
              : [baseGlow, hoverGlow, baseGlow],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: easeOutExpo,
          }}
        />
      ) : (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: milestone.status === 'upcoming' ? 'transparent' : fillColor,
            border: milestone.status === 'upcoming' ? `1.5px solid ${dotColor}` : 'none',
            boxShadow: isHovered ? hoverGlow : baseGlow,
            transition: 'box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      )}
    </motion.div>
  )
}

// ============================================
// Desktop Horizontal Timeline
// ============================================

function HorizontalTimeline() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const months = useMemo(() => getMonthLabels(), [])
  const nowPos = useMemo(() => getNowPosition(), [])

  return (
    <div className="relative hidden md:block">
      {/* Subtle atmospheric glow behind the timeline */}
      <div
        className="pointer-events-none absolute inset-0 -top-20 -bottom-20"
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(0,102,255,0.03) 0%, transparent 70%)',
        }}
      />

      {/* Labels area — above the track */}
      <div className="relative mb-16" style={{ height: 120 }}>
        {TIMELINE_MILESTONES.map((ms, i) => {
          const pos = getPosition(ms.date)
          const above = i % 2 === 0
          const isHovered = hoveredId === ms.id
          const dotColor = ms.status === 'completed'
            ? 'var(--color-success)'
            : ms.color || 'var(--color-accent-blue)'

          if (!above) return null

          return (
            <motion.div
              key={ms.id}
              className="absolute"
              style={{
                left: `${pos}%`,
                bottom: 0,
                transform: 'translateX(-50%)',
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: easeOutExpo }}
              onMouseEnter={() => setHoveredId(ms.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Connector line */}
              <div
                className="mx-auto mb-0 w-px"
                style={{
                  height: 24,
                  backgroundColor: dotColor,
                  opacity: isHovered ? 0.6 : 0.25,
                  transition: 'opacity 0.3s ease',
                }}
              />
              {/* Label card */}
              <div
                className={cn(
                  'w-40 rounded-md border px-3 py-2.5 text-center transition-all duration-300',
                  isHovered ? 'border-border-hover bg-bg-card-hover' : 'border-border-subtle bg-white/[0.015]'
                )}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <div
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: dotColor }}
                  />
                  <span className="text-xs font-medium leading-tight text-text-primary">
                    {ms.label}
                  </span>
                </div>
                <span className="mt-1 block font-mono text-[10px] text-text-tertiary">
                  {ms.displayDate}
                </span>
                {isHovered && ms.description && (
                  <motion.p
                    className="mt-1.5 text-[10px] leading-relaxed text-text-secondary"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3, ease: easeOutExpo }}
                  >
                    {ms.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Track */}
      <div className="relative h-[2px]">
        {/* Track line — draws in from left to right */}
        <motion.div
          className="absolute inset-y-0 left-0 right-0"
          style={{
            background:
              'linear-gradient(to right, transparent 2%, var(--color-border-default) 10%, var(--color-border-default) 90%, transparent 98%)',
          }}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easeOutExpo }}
        />

        {/* Now indicator */}
        <motion.div
          className="absolute z-30"
          style={{
            left: `${nowPos}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8, ease: easeOutExpo }}
        >
          <motion.div
            className="h-3 w-3 rotate-45 rounded-sm"
            style={{ backgroundColor: 'var(--color-accent-blue)' }}
            animate={{
              boxShadow: [
                '0 0 8px rgba(0,102,255,0.3)',
                '0 0 16px rgba(0,102,255,0.5)',
                '0 0 8px rgba(0,102,255,0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: easeOutExpo }}
          />
          <span
            className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[9px] font-semibold tracking-[0.15em] text-accent-blue"
            style={{ textShadow: '0 0 8px rgba(0,102,255,0.4)' }}
          >
            NOW
          </span>
        </motion.div>

        {/* Milestone dots */}
        {TIMELINE_MILESTONES.map((ms, i) => (
          <motion.div
            key={ms.id}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.15, ease: easeOutExpo }}
            className="contents"
          >
            <MilestoneDot
              milestone={ms}
              isHovered={hoveredId === ms.id}
              onHover={() => setHoveredId(ms.id)}
              onLeave={() => setHoveredId(null)}
            />
          </motion.div>
        ))}
      </div>

      {/* Labels area — below the track */}
      <div className="relative mt-2" style={{ height: 120 }}>
        {/* Month labels */}
        <div className="relative mb-4 h-5">
          {months.map((month) => (
            <span
              key={month.label}
              className="absolute -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider text-text-tertiary"
              style={{ left: `${month.position}%` }}
            >
              {month.label}
            </span>
          ))}
        </div>

        {/* Below-track milestone labels */}
        {TIMELINE_MILESTONES.map((ms, i) => {
          const pos = getPosition(ms.date)
          const above = i % 2 === 0
          const isHovered = hoveredId === ms.id
          const dotColor = ms.status === 'completed'
            ? 'var(--color-success)'
            : ms.color || 'var(--color-accent-blue)'

          if (above) return null

          return (
            <motion.div
              key={ms.id}
              className="absolute"
              style={{
                left: `${pos}%`,
                top: 28,
                transform: 'translateX(-50%)',
              }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: easeOutExpo }}
              onMouseEnter={() => setHoveredId(ms.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Connector line */}
              <div
                className="mx-auto mb-0 w-px"
                style={{
                  height: 24,
                  backgroundColor: dotColor,
                  opacity: isHovered ? 0.6 : 0.25,
                  transition: 'opacity 0.3s ease',
                }}
              />
              {/* Label card */}
              <div
                className={cn(
                  'w-40 rounded-md border px-3 py-2.5 text-center transition-all duration-300',
                  isHovered ? 'border-border-hover bg-bg-card-hover' : 'border-border-subtle bg-white/[0.015]'
                )}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <div
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: dotColor }}
                  />
                  <span className="text-xs font-medium leading-tight text-text-primary">
                    {ms.label}
                  </span>
                </div>
                <span className="mt-1 block font-mono text-[10px] text-text-tertiary">
                  {ms.displayDate}
                </span>
                {isHovered && ms.description && (
                  <motion.p
                    className="mt-1.5 text-[10px] leading-relaxed text-text-secondary"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3, ease: easeOutExpo }}
                  >
                    {ms.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )
        })}
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

  // Sort milestones by date for vertical layout
  const sorted = useMemo(
    () => [...TIMELINE_MILESTONES].sort((a, b) => parseMonth(a.date) - parseMonth(b.date)),
    []
  )

  return (
    <div className="relative block md:hidden">
      {/* Vertical track line */}
      <motion.div
        className="absolute left-3 top-0 bottom-0 w-px"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, var(--color-border-default) 5%, var(--color-border-default) 95%, transparent 100%)',
        }}
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: easeOutExpo }}
      />

      {/* Milestones */}
      <div className="space-y-6">
        {sorted.map((ms, i) => {
          const isCompany = ms.type === 'company-milestone'
          const isCompleted = ms.status === 'completed'
          const isInProgress = ms.status === 'in-progress'
          const isHovered = hoveredId === ms.id
          const dotColor = isCompleted
            ? 'var(--color-success)'
            : ms.color || 'var(--color-accent-blue)'
          const dotSize = isCompany ? 10 : 8

          // Check if this is roughly where "now" is
          const msPos = getPosition(ms.date)
          const nextMs = sorted[i + 1]
          const nextPos = nextMs ? getPosition(nextMs.date) : 100
          const showNow = nowPos >= msPos && nowPos < nextPos

          return (
            <div key={ms.id}>
              <motion.div
                className="relative flex items-start gap-4 pl-8"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: easeOutExpo }}
                onMouseEnter={() => setHoveredId(ms.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Dot */}
                <div
                  className="absolute left-0"
                  style={{
                    top: 4,
                    left: 3 - dotSize / 2,
                  }}
                >
                  {isInProgress ? (
                    <motion.div
                      style={{
                        width: dotSize,
                        height: dotSize,
                        borderRadius: '50%',
                        backgroundColor: dotColor,
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 8px ${dotColor}40`,
                          `0 0 16px ${dotColor}70`,
                          `0 0 8px ${dotColor}40`,
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: easeOutExpo }}
                    />
                  ) : (
                    <div
                      style={{
                        width: dotSize,
                        height: dotSize,
                        borderRadius: '50%',
                        backgroundColor: ms.status === 'upcoming' ? 'transparent' : dotColor,
                        border: ms.status === 'upcoming' ? `1.5px solid ${dotColor}` : 'none',
                        boxShadow: `0 0 8px ${dotColor}30`,
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-text-primary">
                      {ms.label}
                    </span>
                  </div>
                  <span className="mt-0.5 block font-mono text-[10px] text-text-tertiary">
                    {ms.displayDate}
                  </span>
                  {ms.description && (
                    <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                      {ms.description}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* NOW indicator — between milestones */}
              {showNow && (
                <motion.div
                  className="relative my-4 flex items-center gap-3 pl-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6, ease: easeOutExpo }}
                >
                  <motion.div
                    className="h-2.5 w-2.5 rotate-45 rounded-sm"
                    style={{
                      backgroundColor: 'var(--color-accent-blue)',
                      marginLeft: 3 - 5,
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 6px rgba(0,102,255,0.3)',
                        '0 0 12px rgba(0,102,255,0.5)',
                        '0 0 6px rgba(0,102,255,0.3)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: easeOutExpo }}
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
