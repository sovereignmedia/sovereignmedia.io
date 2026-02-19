import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'

// Import showcase components for MDX embedding
// Add new showcase components here as they're created
const showcaseComponents = {
  // Example: PricingCalculator: dynamic(() => import('@/components/showcase/PricingCalculator')),
}

/**
 * Compile MDX content to React components.
 * Supports embedding showcase components directly in MDX.
 */
export async function compileMDXContent(source: string) {
  const { content, frontmatter } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeHighlight],
      },
      parseFrontmatter: true,
    },
    components: {
      ...showcaseComponents,
      // Override default HTML elements with styled versions
      // Add custom components as needed
    },
  })

  return { content, frontmatter }
}
