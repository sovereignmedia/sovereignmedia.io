import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          elevated: 'var(--color-bg-elevated)',
          card: 'var(--color-bg-card)',
          'card-hover': 'var(--color-bg-card-hover)',
          overlay: 'var(--color-bg-overlay)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
        border: {
          subtle: 'var(--color-border-subtle)',
          DEFAULT: 'var(--color-border-default)',
          hover: 'var(--color-border-hover)',
        },
        accent: {
          primary: 'var(--color-accent-primary)',
          blue: 'var(--color-accent-blue)',
          glow: 'var(--color-accent-glow)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading-lg': ['1.875rem', { lineHeight: '1.2' }],
        'heading-md': ['1.5rem', { lineHeight: '1.25' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'label': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
        'entrance': '800ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(to bottom, var(--color-bg-primary), var(--color-bg-elevated))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
