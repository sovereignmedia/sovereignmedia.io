'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GridBackgroundProps {
  className?: string
  variant?: 'default' | 'radial' | 'spotlight'
}

export function GridBackground({ className, variant = 'default' }: GridBackgroundProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Radial Fade — makes grid visible only in center */}
      {variant === 'radial' && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, transparent 0%, #000000 70%)',
          }}
        />
      )}

      {/* Spotlight — top-down light beam effect */}
      {variant === 'spotlight' && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 40% 60% at 50% 0%, rgba(0,102,255,0.06) 0%, transparent 60%)',
          }}
        />
      )}

      {/* Noise Texture */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.015]">
        <filter id="grid-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grid-noise)" />
      </svg>
    </div>
  )
}

/**
 * Animated glow orb — floating ambient light effect.
 */
export function GlowOrb({
  className,
  color = 'blue',
  size = 400,
  delay = 0,
}: {
  className?: string
  color?: 'blue' | 'white'
  size?: number
  delay?: number
}) {
  const colors = {
    blue: 'rgba(0, 102, 255, 0.08)',
    white: 'rgba(255, 255, 255, 0.03)',
  }

  return (
    <motion.div
      className={cn('pointer-events-none absolute rounded-full blur-3xl', className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)`,
      }}
      animate={{
        opacity: [0.4, 0.8, 0.4],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

/**
 * Horizontal gradient line — subtle section divider.
 */
export function GradientLine({ className }: { className?: string }) {
  return (
    <div
      className={cn('h-px w-full', className)}
      style={{
        background:
          'linear-gradient(to right, transparent, var(--color-border-default) 20%, var(--color-border-default) 80%, transparent)',
      }}
    />
  )
}
