'use client'

import { motion } from 'framer-motion'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

interface AccessGrantedProps {
  onComplete: () => void
  /** How long the flash holds before transitioning (ms) */
  holdDuration?: number
}

/**
 * "Access Granted" green flash confirmation.
 * Quick green screen flash → text → fade out.
 */
export function AccessGranted({ onComplete, holdDuration = 1200 }: AccessGrantedProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: easeOutExpo } }}
      transition={{ duration: 0.15 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, holdDuration)
      }}
    >
      {/* Green flash overlay — bright then fades to subtle */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0.04] }}
        transition={{ duration: 0.6, times: [0, 0.15, 1], ease: 'easeOut' }}
        style={{ backgroundColor: 'var(--color-success)' }}
      />

      {/* Green radial glow — stays subtle behind text */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0, 204, 102, 0.12) 0%, transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6] }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.05, ease: easeOutExpo }}
      >
        {/* Green dot */}
        <motion.div
          className="h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: 'var(--color-success)',
            boxShadow:
              '0 0 8px rgba(0, 204, 102, 0.6), 0 0 20px rgba(0, 204, 102, 0.3)',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ duration: 0.3, delay: 0.05, ease: easeOutExpo }}
        />

        {/* ACCESS GRANTED */}
        <motion.span
          className="font-mono text-xs uppercase tracking-[0.3em]"
          style={{
            color: 'var(--color-success)',
            textShadow:
              '0 0 20px rgba(0, 204, 102, 0.4), 0 0 40px rgba(0, 204, 102, 0.15)',
          }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: easeOutExpo }}
        >
          Access Granted
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
