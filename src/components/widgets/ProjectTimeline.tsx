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
}

// ============================================
// DATA
// ============================================

const TIMELINE_RANGE = { start: '2026-01', end: '2026-12' }

const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'engagement-start',
    label: 'Engagement Initiated',
    description: 'Proposal finalized, scope of work confirmed',
    date: '2026-02',
    displayDate: 'February 2026',
    type: 'deliverable',
    status: 'in-progress',
  },
  {
    id: 'dashboards-complete',
    label: 'Investor Intelligence Dashboards',
    description: 'Retail and institutional dashboards completed and deployed',
    date: '2026-04',
    displayDate: 'April 2026',
    type: 'deliverable',
    status: 'upcoming',
  },
  {
    id: '3d-animation',
    label: '3D Animation Videos',
    description: 'Target completion for 3D animation campaign assets',
    date: '2026-05',
    displayDate: 'May 2026',
    type: 'deliverable',
    status: 'upcoming',
  },
  {
    id: 'marketing-videos',
    label: 'Marketing Video Package',
    description: 'Additional marketing videos completed with vendor partners',
    date: '2026-05-15',
    displayDate: 'May 2026',
    type: 'deliverable',
    status: 'upcoming',
  },
  {
    id: 'ipo',
    label: 'IPO',
    description: 'Frontieras North America initial public offering',
    date: '2026-09',
    displayDate: 'September 2026',
    type: 'company-milestone',
    status: 'upcoming',
    color: 'var(--color-success)',
  },
]

const MILESTONE_SIDE: Record<string, 'above' | 'below'> = {
  'engagement-start':    'above',
  'dashboards-complete': 'below',
  '3d-animation':        'above',
  'marketing-videos':    'below',
  'ipo':                 'above',
}

// ============================================
// Layout
// ============================================

const CARD_W  = 152
const CONN_H  = 32
const CARD_GAP = 8 // minimum gap between same-side cards

// ============================================
// Helpers
// ============================================

function parseMonth(dateStr: string): number {
  const parts = dateStr.split('-')
  const year  = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const day   = parts[2] ? parseInt(parts[2], 10) : 1
  return year * 12 + (month - 1) + (day - 1) / 30
}

function getPos(dateStr: string): number {
  const s = parseMonth(TIMELINE_RANGE.start)
  const e = parseMonth(TIMELINE_RANGE.end)
  const c = parseMonth(dateStr)
  return Math.max(0, Math.min(100, ((c - s) / (e - s)) * 100))
}

function getNowPos(): number {
  const now = new Date()
  return getPos(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`)
}

function getMonthLabels() {
  const [sy, sm] = TIMELINE_RANGE.start.split('-').map(Number)
  const [ey, em] = TIMELINE_RANGE.end.split('-').map(Number)
  const names = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  const out: { label: string; pos: number }[] = []
  let y = sy, m = sm
  while (y < ey || (y === ey && m <= em)) {
    out.push({ label: names[m - 1], pos: getPos(`${y}-${String(m).padStart(2, '0')}`) })
    if (++m > 12) { m = 1; y++ }
  }
  return out
}

/**
 * Resolve overlapping card positions for same-side milestones.
 * Returns a map of milestone id -> adjusted CSS left value.
 * Cards that would overlap are pushed apart symmetrically.
 */
function resolveOverlaps(
  milestones: TimelineMilestone[],
  containerWidthPx: number
): Record<string, string> {
  const result: Record<string, string> = {}
  const half = CARD_W / 2

  // Group by side
  const groups: Record<string, { id: string; pos: number }[]> = { above: [], below: [] }
  milestones.forEach((ms) => {
    const side = MILESTONE_SIDE[ms.id] ?? 'above'
    const pos = getPos(ms.date)
    groups[side].push({ id: ms.id, pos })
  })

  for (const side of ['above', 'below'] as const) {
    const items = groups[side].sort((a, b) => a.pos - b.pos)

    // Convert % to px, then resolve overlaps left-to-right
    const pxPositions = items.map((item) => {
      const raw = (item.pos / 100) * containerWidthPx
      return Math.max(half, Math.min(containerWidthPx - half, raw))
    })

    // Push overlapping cards to the right
    for (let i = 1; i < pxPositions.length; i++) {
      const minLeft = pxPositions[i - 1] + CARD_W + CARD_GAP
      if (pxPositions[i] < minLeft) {
        pxPositions[i] = minLeft
      }
    }

    // Clamp right edge
    for (let i = pxPositions.length - 1; i >= 0; i--) {
      pxPositions[i] = Math.min(pxPositions[i], containerWidthPx - half)
      if (i > 0) {
        const maxRight = pxPositions[i] - CARD_W - CARD_GAP
        if (pxPositions[i - 1] > maxRight) {
          pxPositions[i - 1] = maxRight
        }
      }
    }

    // Convert back to CSS values
    items.forEach((item, idx) => {
      result[item.id] = `${pxPositions[idx]}px`
    })
  }

  return result
}

const ease = [0.16, 1, 0.3, 1] as const

// ============================================
// IMPORTANT: Framer Motion overrides CSS transforms
// on animated elements. After animation completes,
// transform resets to 'none', wiping out any
// translateX(-50%) we set via style prop.
//
// Solution: NEVER use CSS transform for positioning
// on motion.div elements. Instead, use calc() in
// left/top, or use a wrapper <div> for the transform.
// ============================================

// ============================================
// Milestone card + connector column
// ============================================

function MilestoneColumn({
  ms,
  leftValue,
  side,
  index,
  hovered,
  setHovered,
}: {
  ms: TimelineMilestone
  leftValue: string
  side: 'above' | 'below'
  index: number
  hovered: string | null
  setHovered: (id: string | null) => void
}) {
  const isHov  = hovered === ms.id
  const isComp = ms.status === 'completed'
  const color  = isComp ? 'var(--color-success)' : (ms.color ?? 'var(--color-accent-blue)')

  return (
    <div
      className="absolute"
      style={{
        left: leftValue,
        transform: 'translateX(-50%)',
        ...(side === 'above' ? { bottom: '50%' } : { top: '50%' }),
        zIndex: 10,
      }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: side === 'above' ? 8 : -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease }}
        onMouseEnter={() => setHovered(ms.id)}
        onMouseLeave={() => setHovered(null)}
      >
        {side === 'above' ? (
          <>
            <div
              className={cn(
                'cursor-pointer rounded-md border px-3 py-2.5 text-center transition-colors duration-200',
                isHov ? 'border-border-hover bg-bg-card-hover' : 'border-border-subtle bg-white/[0.02]'
              )}
              style={{ width: CARD_W }}
            >
              <div className="flex items-center justify-center gap-1.5">
                <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs font-medium leading-snug text-text-primary">{ms.label}</span>
              </div>
              <span className="mt-1 block font-mono text-[10px] text-text-tertiary">{ms.displayDate}</span>
              {isHov && ms.description && (
                <motion.p
                  className="mt-1.5 text-[10px] leading-relaxed text-text-secondary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {ms.description}
                </motion.p>
              )}
            </div>
            <div
              style={{
                width: 1,
                height: CONN_H,
                backgroundColor: color,
                opacity: isHov ? 0.5 : 0.2,
                transition: 'opacity 0.2s ease',
              }}
            />
          </>
        ) : (
          <>
            <div
              style={{
                width: 1,
                height: CONN_H,
                backgroundColor: color,
                opacity: isHov ? 0.5 : 0.2,
                transition: 'opacity 0.2s ease',
              }}
            />
            <div
              className={cn(
                'cursor-pointer rounded-md border px-3 py-2.5 text-center transition-colors duration-200',
                isHov ? 'border-border-hover bg-bg-card-hover' : 'border-border-subtle bg-white/[0.02]'
              )}
              style={{ width: CARD_W }}
            >
              <div className="flex items-center justify-center gap-1.5">
                <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs font-medium leading-snug text-text-primary">{ms.label}</span>
              </div>
              <span className="mt-1 block font-mono text-[10px] text-text-tertiary">{ms.displayDate}</span>
              {isHov && ms.description && (
                <motion.p
                  className="mt-1.5 text-[10px] leading-relaxed text-text-secondary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {ms.description}
                </motion.p>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}

// ============================================
// Desktop Horizontal Timeline
// ============================================

function HorizontalTimeline() {
  const [hovered, setHovered] = useState<string | null>(null)
  const months = useMemo(getMonthLabels, [])
  const nowPos = useMemo(getNowPos, [])

  // Resolve card overlaps at 960px (max-w-5xl minus 2*32px padding)
  const cardPositions = useMemo(() => resolveOverlaps(TIMELINE_MILESTONES, 960), [])

  return (
    <div className="relative hidden md:block select-none">
      <div className="relative w-full" style={{ height: 300 }}>

        {/* TRACK LINE at 50% — extends fully from edge to edge */}
        <div
          className="absolute left-0 right-0"
          style={{ top: '50%', transform: 'translateY(-50%)', height: 2, zIndex: 2 }}
        >
          <motion.div
            className="h-full w-full"
            style={{ backgroundColor: 'var(--color-border-default)' }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
          />
        </div>

        {/* MONTH TICK MARKS + LABELS */}
        {months.map((m) => (
          <div key={m.label}>
            {/* Tick mark */}
            <div
              className="absolute"
              style={{
                left: `${m.pos}%`,
                top: '50%',
                transform: 'translateX(-50%)',
                width: 1,
                height: 8,
                marginTop: -4,
                backgroundColor: 'var(--color-border-default)',
                opacity: 0.6,
                zIndex: 3,
              }}
            />
            {/* Label */}
            <span
              className="absolute font-mono text-[10px] tracking-wider text-text-tertiary"
              style={{
                left: `${m.pos}%`,
                top: 'calc(50% + 12px)',
                transform: 'translateX(-50%)',
                zIndex: 3,
              }}
            >
              {m.label}
            </span>
          </div>
        ))}

        {/* NOW INDICATOR */}
        <div
          className="absolute"
          style={{ left: `${nowPos}%`, top: '50%', transform: 'translate(-50%, -50%)', zIndex: 30 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9, ease }}
          >
            <motion.div
              className="h-3 w-3 rotate-45 rounded-sm"
              style={{ backgroundColor: 'var(--color-accent-blue)' }}
              animate={{ boxShadow: ['0 0 8px rgba(0,102,255,0.3)', '0 0 18px rgba(0,102,255,0.6)', '0 0 8px rgba(0,102,255,0.3)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.div>
          <span
            className="absolute font-mono text-[9px] font-semibold tracking-[0.15em] text-accent-blue"
            style={{ top: -18, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', textShadow: '0 0 8px rgba(0,102,255,0.4)' }}
          >
            NOW
          </span>
        </div>

        {/* MILESTONE DOTS */}
        {TIMELINE_MILESTONES.map((ms, i) => {
          const pos    = getPos(ms.date)
          const isHov  = hovered === ms.id
          const isIP   = ms.status === 'in-progress'
          const isComp = ms.status === 'completed'
          const isCo   = ms.type === 'company-milestone'
          const color  = isComp ? 'var(--color-success)' : (ms.color ?? 'var(--color-accent-blue)')
          const dotSize = isCo ? 12 : 9
          const glowB  = isCo ? '0 0 10px rgba(0,204,102,0.3)' : isComp ? '0 0 10px rgba(0,204,102,0.4)' : '0 0 10px rgba(0,102,255,0.3)'
          const glowH  = isCo ? '0 0 18px rgba(0,204,102,0.5)' : isComp ? '0 0 18px rgba(0,204,102,0.6)' : '0 0 18px rgba(0,102,255,0.5)'

          return (
            <div
              key={`dot-${ms.id}`}
              className="absolute"
              style={{ left: `${pos}%`, top: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}
            >
              <motion.div
                className="cursor-pointer"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease }}
                onMouseEnter={() => setHovered(ms.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {isIP ? (
                  <motion.div
                    style={{ width: dotSize, height: dotSize, borderRadius: '50%', backgroundColor: color }}
                    animate={{ boxShadow: [glowB, glowH, glowB] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                ) : (
                  <div style={{
                    width: dotSize, height: dotSize, borderRadius: '50%',
                    backgroundColor: ms.status === 'upcoming' ? 'transparent' : color,
                    border: ms.status === 'upcoming' ? `1.5px solid ${color}` : 'none',
                    boxShadow: isHov ? glowH : glowB,
                    transition: 'box-shadow 0.2s ease',
                  }} />
                )}
              </motion.div>
            </div>
          )
        })}

        {/* MILESTONE COLUMNS (card + connector) */}
        {TIMELINE_MILESTONES.map((ms, i) => {
          const side = MILESTONE_SIDE[ms.id] ?? (i % 2 === 0 ? 'above' : 'below')
          const leftValue = cardPositions[ms.id] ?? `${getPos(ms.date)}%`
          return (
            <MilestoneColumn
              key={`col-${ms.id}`}
              ms={ms}
              leftValue={leftValue}
              side={side}
              index={i}
              hovered={hovered}
              setHovered={setHovered}
            />
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
  const [hovered, setHovered] = useState<string | null>(null)
  const nowPos = useMemo(getNowPos, [])
  const sorted = useMemo(
    () => [...TIMELINE_MILESTONES].sort((a, b) => parseMonth(a.date) - parseMonth(b.date)),
    []
  )

  return (
    <div className="relative block md:hidden">
      <motion.div
        className="absolute top-0 bottom-0 w-px"
        style={{ left: 6, background: 'linear-gradient(to bottom, transparent 0%, var(--color-border-default) 5%, var(--color-border-default) 95%, transparent 100%)' }}
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      />
      <div className="space-y-6 pl-10">
        {sorted.map((ms, i) => {
          const isCo    = ms.type === 'company-milestone'
          const isComp  = ms.status === 'completed'
          const isIP    = ms.status === 'in-progress'
          const color   = isComp ? 'var(--color-success)' : (ms.color ?? 'var(--color-accent-blue)')
          const dotSize = isCo ? 10 : 8
          const msPos   = getPos(ms.date)
          const nextPos = sorted[i + 1] ? getPos(sorted[i + 1].date) : 100
          const showNow = nowPos >= msPos && nowPos < nextPos

          return (
            <div key={ms.id}>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                onMouseEnter={() => setHovered(ms.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="absolute" style={{ top: 4, left: -(10 + dotSize / 2) }}>
                  {isIP ? (
                    <motion.div
                      style={{ width: dotSize, height: dotSize, borderRadius: '50%', backgroundColor: color }}
                      animate={{ boxShadow: ['0 0 8px rgba(0,102,255,0.3)', '0 0 16px rgba(0,102,255,0.55)', '0 0 8px rgba(0,102,255,0.3)'] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  ) : (
                    <div style={{
                      width: dotSize, height: dotSize, borderRadius: '50%',
                      backgroundColor: ms.status === 'upcoming' ? 'transparent' : color,
                      border: ms.status === 'upcoming' ? `1.5px solid ${color}` : 'none',
                      boxShadow: '0 0 8px rgba(0,102,255,0.25)',
                    }} />
                  )}
                </div>
                <span className="text-sm font-medium text-text-primary">{ms.label}</span>
                <span className="mt-0.5 block font-mono text-[10px] text-text-tertiary">{ms.displayDate}</span>
                {ms.description && <p className="mt-1 text-xs leading-relaxed text-text-secondary">{ms.description}</p>}
              </motion.div>
              {showNow && (
                <motion.div
                  className="my-4 flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.div
                    className="h-2.5 w-2.5 rotate-45 rounded-sm"
                    style={{ backgroundColor: 'var(--color-accent-blue)', marginLeft: -4 }}
                    animate={{ boxShadow: ['0 0 6px rgba(0,102,255,0.3)', '0 0 12px rgba(0,102,255,0.55)', '0 0 6px rgba(0,102,255,0.3)'] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                  <span className="font-mono text-[9px] font-semibold tracking-[0.15em] text-accent-blue">NOW</span>
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
// Export
// ============================================

export function ProjectTimeline() {
  return (
    <div>
      <HorizontalTimeline />
      <VerticalTimeline />
    </div>
  )
}
