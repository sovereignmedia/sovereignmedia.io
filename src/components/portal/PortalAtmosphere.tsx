'use client'

import { GridBackground, GlowOrb } from '@/components/effects/GridBackground'

export function PortalAtmosphere() {
  return (
    <>
      {/* Page-level atmosphere */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <GridBackground variant="radial" />
        <GlowOrb className="-top-20 right-[15%]" color="blue" size={500} delay={0} />
        <GlowOrb className="bottom-[20%] -left-20" color="white" size={400} delay={3} />
      </div>

      {/* Noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.02]">
        <svg className="h-full w-full">
          <filter id="portal-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#portal-noise)" />
        </svg>
      </div>
    </>
  )
}
