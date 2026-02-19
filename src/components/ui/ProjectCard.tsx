'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/work/${project.category}/${project.slug}`}
        className="group block"
      >
        <div className="card overflow-hidden p-0">
          {/* Thumbnail */}
          <div className="relative aspect-[16/10] overflow-hidden bg-bg-elevated">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-slow ease-out-expo group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="font-mono text-label uppercase tracking-wider text-text-tertiary">
                  {project.category}
                </span>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-normal group-hover:opacity-100" />
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-label uppercase tracking-wider text-text-tertiary">
                {project.category.replace('-', ' ')}
              </span>
              {project.client && (
                <span className="font-mono text-label text-text-tertiary">
                  {project.client}
                </span>
              )}
            </div>

            <h3 className="font-display text-heading-sm font-semibold text-text-primary transition-colors group-hover:text-accent-blue">
              {project.title}
            </h3>

            {project.summary && (
              <p className="mt-2 line-clamp-2 text-body-sm text-text-secondary">
                {project.summary}
              </p>
            )}

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="mt-4 flex gap-6 border-t border-border-subtle pt-4">
                {project.metrics.slice(0, 3).map((metric) => (
                  <div key={metric.label}>
                    <p className="font-mono text-body-md font-semibold text-text-primary">
                      {metric.value}
                    </p>
                    <p className="font-mono text-label uppercase tracking-wider text-text-tertiary">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
