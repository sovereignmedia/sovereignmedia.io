# CLAUDE.md — Sovereign Media Website

## Project Identity

**Business:** Sovereign Media — Strategic marketing consultancy & fractional CMO services
**Owner:** Chase Paisley
**Site Purpose:** Premium portfolio, client proposal delivery, password-protected client portals, interactive widget showcase
**Aesthetic:** Dark tech minimalism — Palantir/Anduril/Linear-tier visual language. Pure black backgrounds, surgical white text, atmospheric depth, institutional-grade design.
**Domain:** sovereignmedia.io (or as configured)

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14+ |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS + CSS Variables | 3.x |
| Animation | Framer Motion | 11.x |
| 3D Effects | Three.js / React Three Fiber | (optional, per page) |
| Auth | NextAuth.js | 5.x (v5 beta) |
| Content | MDX + gray-matter | - |
| Deployment | GitHub → Vercel | - |
| Package Manager | pnpm | - |

---

## Design System — MANDATORY

Every component, page, and UI element MUST use the design token system. Never hardcode colors, fonts, spacing, or motion values. Always reference tokens.

### Color Tokens (CSS Variables)
```
--color-bg-primary: #000000          /* Pure black — primary background */
--color-bg-elevated: #0A0A0A         /* Slightly lifted surfaces */
--color-bg-card: #111111             /* Card/panel backgrounds */
--color-bg-card-hover: #1A1A1A       /* Card hover state */
--color-bg-overlay: rgba(0,0,0,0.8)  /* Modal/overlay backgrounds */

--color-text-primary: #FFFFFF        /* Primary text — pure white */
--color-text-secondary: #A0A0A0      /* Secondary/muted text */
--color-text-tertiary: #666666       /* Disabled/placeholder text */

--color-border-subtle: #1A1A1A       /* Subtle dividers */
--color-border-default: #2A2A2A      /* Default borders */
--color-border-hover: #3A3A3A        /* Hover state borders */

--color-accent-primary: #FFFFFF      /* Primary accent — white */
--color-accent-blue: #0066FF         /* Strategic blue accent — use VERY sparingly */
--color-accent-glow: rgba(0,102,255,0.15) /* Blue glow for atmospheric effects */

--color-success: #00CC66
--color-warning: #FFAA00
--color-error: #FF3333
```

### Typography
```
--font-display: 'Söhne Breit', 'Instrument Sans', sans-serif   /* Headlines, hero text */
--font-body: 'Söhne', 'Geist', sans-serif                       /* Body text, UI */
--font-mono: 'Söhne Mono', 'Geist Mono', monospace              /* Code, data, labels */

/* Scale */
--text-xs: 0.75rem      /* 12px — labels, captions */
--text-sm: 0.875rem     /* 14px — small body */
--text-base: 1rem       /* 16px — body */
--text-lg: 1.125rem     /* 18px — large body */
--text-xl: 1.25rem      /* 20px — section labels */
--text-2xl: 1.5rem      /* 24px — card titles */
--text-3xl: 1.875rem    /* 30px — section headers */
--text-4xl: 2.25rem     /* 36px — page titles */
--text-5xl: 3rem        /* 48px — hero headers */
--text-6xl: 3.75rem     /* 60px — display text */
--text-7xl: 4.5rem      /* 72px — hero display */
```

### Spacing System
Use Tailwind spacing scale (4px base). Key values:
- Section padding: `py-24` to `py-32` (96px-128px)
- Container max-width: `max-w-7xl` (1280px)
- Card padding: `p-6` to `p-8` (24px-32px)
- Component gap: `gap-4` to `gap-8` (16px-32px)
- Grid gap: `gap-6` (24px)

### Motion Tokens
```
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)    /* Primary easing — smooth deceleration */
--ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1) /* Symmetric transitions */
--duration-fast: 150ms                               /* Micro-interactions */
--duration-normal: 300ms                             /* Standard transitions */
--duration-slow: 500ms                               /* Emphasis animations */
--duration-entrance: 800ms                           /* Page/section entrances */
```

### Border Radius
```
--radius-sm: 4px       /* Buttons, badges */
--radius-md: 8px       /* Cards, inputs */
--radius-lg: 12px      /* Panels, modals */
--radius-xl: 16px      /* Large containers */
```

---

## Directory Architecture

```
sovereign-media/
├── CLAUDE.md                          ← YOU ARE HERE
├── src/
│   ├── app/                           ← Next.js App Router pages
│   │   ├── layout.tsx                 ← Root layout (fonts, metadata, providers)
│   │   ├── page.tsx                   ← Landing page / hero
│   │   ├── (marketing)/               ← Route group for public pages
│   │   │   └── layout.tsx             ← Shared nav/footer for marketing pages
│   │   ├── work/
│   │   │   ├── page.tsx               ← Portfolio grid (all categories)
│   │   │   ├── [category]/
│   │   │   │   ├── page.tsx           ← Category-filtered portfolio
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx       ← Individual case study
│   │   ├── proposals/
│   │   │   └── [client-id]/
│   │   │       └── page.tsx           ← Password-protected proposal pages
│   │   ├── portal/
│   │   │   └── [client-id]/
│   │   │       └── page.tsx           ← Client portal with feedback
│   │   └── api/
│   │       ├── auth/                  ← NextAuth API routes
│   │       └── feedback/              ← Client feedback submission
│   ├── components/
│   │   ├── ui/                        ← Atomic design components (buttons, inputs, badges)
│   │   ├── layout/                    ← Structural components (nav, footer, containers)
│   │   ├── showcase/                  ← Portable components from v0/GitHub/custom
│   │   ├── effects/                   ← Visual effects (particle fields, gradients, glows)
│   │   └── widgets/                   ← Interactive proposal widgets (calculators, charts)
│   ├── lib/
│   │   ├── auth.ts                    ← Auth configuration
│   │   ├── mdx.ts                     ← MDX processing utilities
│   │   ├── projects.ts                ← Project data fetching/filtering
│   │   └── utils.ts                   ← Shared utilities (cn, formatters)
│   ├── styles/
│   │   └── globals.css                ← CSS variables, base styles, Tailwind imports
│   ├── content/
│   │   ├── projects/                  ← MDX files for portfolio projects
│   │   └── proposals/                 ← MDX files for client proposals
│   └── types/
│       └── index.ts                   ← TypeScript type definitions
├── public/
│   ├── images/                        ← Static images
│   ├── videos/                        ← Static video files
│   └── fonts/                         ← Self-hosted font files
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local                         ← Environment variables (NEVER commit)
```

---

## Component Conventions

### File Naming
- Components: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `PascalCase` exports in `types/index.ts`
- Content: `kebab-case.mdx` (e.g., `frontieras-dashboard.mdx`)

### Component Structure
Every component follows this pattern:

```tsx
'use client' // Only if component uses hooks, events, or browser APIs

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ComponentNameProps {
  // Typed props
}

export function ComponentName({ ...props }: ComponentNameProps) {
  return (
    // JSX
  )
}
```

### The `cn()` Utility
All conditional/merged classnames MUST use the `cn()` utility (clsx + twMerge). Never manually concatenate classnames.

```tsx
import { cn } from '@/lib/utils'
cn('base-classes', conditional && 'conditional-classes', className)
```

### Animation Pattern
Use Framer Motion for all animations. Standard entrance pattern:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
```

For scroll-triggered animations, use `whileInView`:
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
```

---

## Showcase Component Registry

The `/components/showcase/` directory is a special directory for portable components sourced from v0, GitHub, or custom builds. Each showcase component MUST:

1. Be fully self-contained (no external dependencies beyond what's in package.json)
2. Include a `_meta.ts` file with metadata:

```ts
export const meta = {
  name: 'Interactive Pricing Calculator',
  description: 'Real-time pricing calculator with scenario modeling',
  source: 'custom' | 'v0' | 'github',
  sourceUrl?: 'https://...',
  tags: ['calculator', 'interactive', 'proposal-widget'],
  addedDate: '2025-02-19',
}
```

3. Export a single default component
4. Use only design tokens from the design system (adapt colors/fonts on import)

### Embedding Showcase Components in MDX
```mdx
import { PricingCalculator } from '@/components/showcase/PricingCalculator'

# Proposal for Client Name

Here's your custom pricing model:

<PricingCalculator
  basePrice={5000}
  tiers={['starter', 'growth', 'scale']}
/>
```

---

## Protected Routes Pattern

All routes under `/proposals/` and `/portal/` are protected by middleware.

```ts
// middleware.ts pattern
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith('/proposals/') || pathname.startsWith('/portal/')) {
    // Check for valid session token
    // Redirect to auth page if missing
  }
}
```

Client auth tokens are stored in environment variables or a database:
```
CLIENT_TOKEN_frontieras=<hashed-token>
CLIENT_TOKEN_clientname=<hashed-token>
```

---

## Content Model

### Project (Portfolio Item)
```ts
interface Project {
  slug: string
  title: string
  client: string
  category: 'photography' | 'video' | 'web-design' | 'software' | 'marketing'
  date: string
  thumbnail: string
  heroImage: string
  summary: string
  tags: string[]
  featured: boolean
  metrics?: {
    label: string
    value: string
  }[]
}
```

### Proposal
```ts
interface Proposal {
  clientId: string
  title: string
  date: string
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined'
  sections: ProposalSection[]
  widgets?: string[]  // Component names from showcase registry
}
```

---

## Aesthetic Rules — READ EVERY TIME

1. **Black is the canvas.** `#000000` is the default. Surfaces lift with `#0A0A0A` → `#111111` → `#1A1A1A`. Never use gray backgrounds above `#1A1A1A`.

2. **White is the voice.** Primary text is always pure `#FFFFFF`. Secondary text is `#A0A0A0`. Never use off-white or cream.

3. **Blue is the signal.** `#0066FF` is used surgically — a single accent in a CTA, a hover glow, a data highlight. If there's more than 2-3 blue elements visible on screen at once, there's too much.

4. **Borders are whispers.** Borders are `1px` and use `--color-border-subtle` or `--color-border-default`. They define space without shouting. Prefer `border-opacity` over solid borders.

5. **Motion is confident.** Animations use `--ease-out-expo` easing. Entrances are slow and deliberate (600-1000ms). Hovers are snappy (150-200ms). Nothing bounces. Nothing wobbles. Everything glides.

6. **Typography is hierarchical.** Display font for heroes and section titles only. Body font for everything else. Mono font for data, labels, and technical content. Letter-spacing is slightly positive on uppercase labels (`tracking-wider`).

7. **Depth through light, not shadow.** Instead of drop-shadows, use subtle gradient overlays, border-glow effects, and background luminance shifts to create depth. The only acceptable shadow is a very subtle one on elevated modals.

8. **Density is intentional.** Data-rich sections (dashboards, metrics, widgets) can be dense. Marketing sections need breathing room. Never let density feel accidental.

9. **Photography/video breaks the grid.** Portfolio media can bleed to edges, overlap sections, or break the container. Static UI elements stay in the grid.

10. **No generic patterns.** No cookie-cutter hero → features → testimonials → CTA layouts. Every page has a unique composition that serves its specific content.

---

## Commands Reference

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Production build
pnpm lint                   # Lint check

# Content
# Add new project: create MDX file in src/content/projects/
# Add new proposal: create MDX file in src/content/proposals/

# Components
# Add showcase component: create folder in src/components/showcase/
# Each showcase component needs _meta.ts + index.tsx

# Deployment
pnpm env:push               # Sync .env.local → Vercel production
pnpm deploy:prod                 # Deploy to Vercel production
git push origin main        # Push code to GitHub
```

---

## Environment Variables & Deployment — CRITICAL WORKFLOW

**Single source of truth: `.env.local`**

All passwords and secrets live in `.env.local`. To update passwords or add new env vars:

1. Edit `.env.local` (the ONLY file you touch)
2. Run `pnpm env:push` (syncs to Vercel, handles cleanup automatically)
3. Run `pnpm deploy:prod` (deploys with the new values)

**NEVER use `vercel env add` directly.** The Vercel CLI stdin pipe injects trailing newlines into values, causing silent password mismatches. The `scripts/sync-env.sh` script handles this correctly with `printf '%s'`.

**When Claude is asked to change a password or env var:**
1. Edit the value in `.env.local`
2. Run `pnpm env:push` to sync to Vercel
3. Run `pnpm deploy:prod` to deploy
4. Verify the API returns `{"valid":true}` with a curl test

**API routes use `.trim()` on all password comparisons as a safety net**, but the sync script is the primary defense.

```env
# .env.local (NEVER commit this file)
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
NEXTAUTH_URL=http://localhost:3000

# Site-wide password gate
SITE_PASSWORD=<password>

# Client passwords (format: <CLIENTID_UPPERCASE>_PASSWORD)
FRONTIERAS_PASSWORD=<password>

# Client access tokens (add per client)
CLIENT_TOKEN_FRONTIERAS=<token>

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=<id>
```

---

## Quality Checklist — Before Every Commit

- [ ] All colors use CSS variable tokens
- [ ] All fonts use the type system variables
- [ ] All animations use Framer Motion with design system easing
- [ ] No hardcoded pixel values for spacing (use Tailwind scale)
- [ ] TypeScript has no `any` types
- [ ] Components are properly typed with interfaces
- [ ] New showcase components have `_meta.ts`
- [ ] Protected routes are covered by middleware
- [ ] Mobile responsive (test at 375px, 768px, 1024px, 1440px)
- [ ] Dark aesthetic maintained — no accidental light backgrounds
