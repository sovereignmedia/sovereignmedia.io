'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

interface ProgressBarProps {
  progress: number
  label?: string
  index: number
}

export function ProgressBar({ progress, label, index }: ProgressBarProps) {
  const isComplete = progress >= 100
  const isEmpty = progress === 0

  return (
    <div className="group/progress px-6 pb-6 pt-5 md:px-8">
      {/* Label row */}
      <div className="mb-2.5 flex items-center justify-between">
        <span
          className={cn(
            'font-mono text-xs tracking-wide',
            isEmpty ? 'text-text-tertiary/60' : 'text-text-secondary'
          )}
        >
          {label || (isEmpty ? 'Not Started' : `${progress}% Complete`)}
        </span>
        <span
          className={cn(
            'font-mono text-xs transition-colors duration-normal group-hover/progress:text-text-primary',
            isEmpty ? 'text-text-tertiary/40' : 'text-text-primary'
          )}
        >
          {progress}%
        </span>
      </div>

      {/* Track */}
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-border-subtle">
        {progress > 0 && (
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: isComplete
                ? 'linear-gradient(to right, var(--color-success), #22dd77)'
                : 'linear-gradient(to right, var(--color-accent-blue), #3388FF)',
            }}
            initial={{ width: '0%' }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.3 + index * 0.15,
              ease: easeOutExpo,
            }}
          >
            {/* Leading edge glow */}
            <div
              className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full"
              style={{
                background: isComplete
                  ? 'rgba(0, 204, 102, 0.3)'
                  : 'rgba(0, 102, 255, 0.3)',
                filter: 'blur(4px)',
              }}
            />
          </motion.div>
        )}
      </div>

    </div>
  )
}
