'use client'

import { ClientPortal } from '@/components/portal'
import { frontierasPortal } from '@/data/portals/frontieras'

export default function FrontierasWorkPage() {
  return <ClientPortal config={frontierasPortal} />
}
