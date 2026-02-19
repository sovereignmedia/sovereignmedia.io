'use client'

import Link from 'next/link'

interface PortalHeaderProps {
  confidential?: boolean
}

export function PortalHeader({ confidential = true }: PortalHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 md:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-text-primary transition-opacity hover:opacity-80"
        >
          SOVEREIGN MEDIA
        </Link>
        {confidential && (
          <span className="font-mono text-label uppercase tracking-wider text-text-tertiary">
            Confidential
          </span>
        )}
      </div>
    </header>
  )
}
