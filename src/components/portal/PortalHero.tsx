'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

function CurrentDate() {
  const [date, setDate] = useState('')

  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date())
    )
  }, [])

  return <span>{date}</span>
}

interface PortalHeroProps {
  clientName: string
  title: string
  subtitle: string
}

export function PortalHero({ clientName, title, subtitle }: PortalHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
    >
      <span className="font-mono text-label uppercase tracking-[0.2em] text-text-tertiary">
        Client Engagement
      </span>
      <h1 className="mt-4 font-display text-display-sm font-semibold text-text-primary md:text-display-md">
        {clientName}
      </h1>
      <p className="mt-3 max-w-3xl text-body-lg text-text-secondary">
        {title}
      </p>
      <p className="mt-2 text-body-md text-text-tertiary">
        {subtitle}
      </p>
      <p className="mt-4 font-mono text-label uppercase tracking-wider text-text-tertiary">
        <CurrentDate />
      </p>
    </motion.div>
  )
}
