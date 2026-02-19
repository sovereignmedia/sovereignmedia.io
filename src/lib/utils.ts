import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes with conflict resolution.
 * Use this for ALL conditional classname logic.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string to a readable format.
 */
export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

/**
 * Generate a URL-safe slug from a string.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Truncate text to a given length with ellipsis.
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}
