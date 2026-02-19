import Link from 'next/link'
import { Container } from '@/components/layout/Container'

export function Footer() {
  return (
    <footer className="border-t border-border-subtle py-16">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-lg font-semibold tracking-tight text-text-primary"
            >
              SOVEREIGN
            </Link>
            <p className="mt-2 max-w-xs text-body-sm text-text-tertiary">
              Strategic marketing architecture. Measurable capital outcomes.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <Link
              href="/work"
              className="font-mono text-label uppercase tracking-wider text-text-tertiary transition-colors hover:text-text-secondary"
            >
              Work
            </Link>
            <Link
              href="/#services"
              className="font-mono text-label uppercase tracking-wider text-text-tertiary transition-colors hover:text-text-secondary"
            >
              Services
            </Link>
            <Link
              href="/#contact"
              className="font-mono text-label uppercase tracking-wider text-text-tertiary transition-colors hover:text-text-secondary"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border-subtle pt-8 md:flex-row md:items-center">
          <p className="font-mono text-label text-text-tertiary">
            &copy; {new Date().getFullYear()} Sovereign Media. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
