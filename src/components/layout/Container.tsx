import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  size?: 'default' | 'narrow' | 'wide' | 'full'
}

const containerSizes = {
  narrow: 'max-w-3xl',
  default: 'max-w-7xl',
  wide: 'max-w-[1440px]',
  full: 'max-w-none',
}

export function Container({
  children,
  className,
  as: Component = 'div',
  size = 'default',
}: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full px-6 md:px-8', containerSizes[size], className)}
    >
      {children}
    </Component>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const sectionPadding = {
  none: '',
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
}

export function Section({
  children,
  className,
  id,
  padding = 'lg',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative', sectionPadding[padding], className)}
    >
      {children}
    </section>
  )
}
