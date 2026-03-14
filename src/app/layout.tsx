import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { AnimatedNoise } from '@/components/effects/AnimatedNoise'
import { SmoothScroll } from '@/components/effects/SmoothScroll'

// Display font — Bebas Neue (condensed uppercase display face)
const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

// Body font — IBM Plex Sans
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

// Mono font — IBM Plex Mono
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Sovereign Media',
    template: '%s | Sovereign Media',
  },
  description:
    'Strategic marketing architecture and fractional CMO services. Delivering measurable capital outcomes through premium brand strategy, content production, and campaign execution.',
  keywords: [
    'marketing strategy',
    'fractional CMO',
    'brand architecture',
    'content production',
    'campaign management',
  ],
  authors: [{ name: 'Chase Paisley' }],
  openGraph: {
    title: 'Sovereign Media',
    description: 'Strategic marketing architecture. Measurable capital outcomes.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sovereign Media',
    description: 'Strategic marketing architecture. Measurable capital outcomes.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg-primary font-body text-text-primary antialiased">
        <AnimatedNoise />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
