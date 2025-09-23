import node from '@astrojs/node'
import vercel from '@astrojs/vercel'
import i18n from '@astrolicious/i18n'
import playformCompress from '@playform/compress'
import { defineConfig } from 'astro/config'
import compressor from 'astro-compressor'
import icon from 'astro-icon'
import sitemap from 'astro-sitemap'
import tunnel from 'astro-tunnel'

// https://astro.build/config

export default defineConfig({
  site: process.env.SITE_URL,

  server: {
    host: true,
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  compressHTML: false,

  integrations: [
    tunnel(),
    icon(),
    i18n({
      defaultLocale: 'fr',
      locales: ['fr', 'en'],
    }),
    sitemap({
      canonicalURL: URL,
      lastmod: new Date(),
      createLinkInHead: false,
      xmlns: {
        xhtml: true,
        news: false,
        video: false,
        image: false,
      },
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr',
        },
      },
      // Remove trailing slash
      serialize(item) {
        /* eslint-disable-next-line no-param-reassign */
        item.url = item.url.replace(/\/$/g, '')
        return item
      },
    }),
    // playformCompress({
    //   HTML: false,
    //   JavaScript: {
    //     compress: {
    //       ecma: 2015
    //     },
    //     format: {
    //       comments: false,
    //       ecma: 2015
    //     },
    //     ecma: 2015,
    //     module: true
    //   },
    //   Image: false,
    //   SVG: false
    // }),
    // compressor()
  ],

  adapter: node({
    mode: 'standalone',
  }),
  base: process.env.BASE,
})
