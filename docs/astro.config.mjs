import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { nebari } from '@nebari/starlight';
import rehypeMermaid from 'rehype-mermaid';
import remarkBaseLinks from './src/plugins/remark-base-links';

export default defineConfig({
  base: process.env.BASE || '/',
  site: process.env.SITE,
  integrations: [
    starlight({
      title: 'Nebari Langfuse Pack',
      description: 'LLM observability for Nebari.',
      // Shared Nebari identity (brand colors, fonts, logo, favicon, footer, and
      // GitHub social link) comes from the @nebari/starlight theme plugin. On the
      // portal the header logo returns users to the pack catalog.
      plugins: [nebari({ logoHref: 'https://packs.nebari.dev/' })],
      sidebar: [
        { label: 'Introduction', slug: 'index' },
        { label: 'Configuration', slug: 'configuration' },
        { label: 'Release Readiness', slug: 'release-readiness' },
      ],
    }),
  ],
  markdown: {
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    remarkPlugins: [[remarkBaseLinks, { base: process.env.BASE || '/' }]],
    rehypePlugins: [[rehypeMermaid, { strategy: 'inline-svg' }]],
  },
});
