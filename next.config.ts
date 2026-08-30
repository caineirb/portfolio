import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-slug', 'rehype-mdx-import-media'],
  },
})

export default withMDX(nextConfig)