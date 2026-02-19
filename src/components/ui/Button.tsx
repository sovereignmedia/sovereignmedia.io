'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
}

const variants = {
  primary:
    'bg-white text-black hover:bg-white/90 active:bg-white/80',
  secondary:
    'bg-bg-card text-text-primary border border-border hover:border-border-hover hover:bg-bg-card-hover',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-card',
  outline:
    'bg-transparent text-text-primary border border-border hover:border-border-hover',
}

const sizes = {
  sm: 'h-8 px-3 text-body-sm gap-1.5',
  md: 'h-10 px-5 text-body-sm gap-2',
  lg: 'h-12 px-7 text-body-md gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, href, external, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center font-medium rounded-md',
      'transition-all duration-fast ease-out-expo',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue',
      'disabled:pointer-events-none disabled:opacity-50',
      variants[variant],
      sizes[size],
      className
    )

    if (href) {
      return (
        <motion.a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      )
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...(props as any)}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
