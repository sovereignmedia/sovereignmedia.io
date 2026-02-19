import type { Metadata, Viewport } from 'next'
import { Instrument_Sans } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/styles/globals.css'

// Display font — Instrument Sans (Google Font)
// Replace with Söhne Breit if you have the license
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
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
      className={`${instrumentSans.variable} ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg-primary font-body text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
