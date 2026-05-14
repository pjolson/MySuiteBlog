import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MySuite - NetSuite Consulting',
  description: 'MySuite Consulting offers NetSuite optimization, customization, and support services. Contract admin and developer packages available.',

  srcExclude: ['img/**/*.md'],

  sitemap: {
    hostname: 'https://mysuite.tech'
  },

  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192x192.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'MySuite' }],
    ['meta', { property: 'og:image', content: 'https://mysuite.tech/og-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://mysuite.tech/og-image.png' }],
    ['script', { src: 'https://analytics.ahrefs.com/analytics.js', 'data-key': 'JB7/uRXKgpaYMdBoftGA9Q', async: '' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-R3FVBP7K9S' }],
    ['script', {}, "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-R3FVBP7K9S');"],
  ],

  transformPageData(pageData) {
    const canonicalUrl = `https://mysuite.tech/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageData.title + ' | MySuite' }],
      ['meta', { property: 'og:description', content: pageData.description || 'MySuite Consulting offers NetSuite optimization, customization, and support services.' }]
    )
  },

  themeConfig: {
    logo: { src: '/logo.svg', alt: 'MySuite' },
    siteTitle: false,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Tags', link: '/tags/' },
      { text: 'Services', link: '/about/' },
      { text: 'Contact', link: '/contact/' },
      { text: 'Greenlight Approvals', link: 'https://greenlightapprovals.io', target: '_blank' }
    ],

    sidebar: false,

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/patrick-olson-pmp/' }
    ],

    footer: {
      message: 'NetSuite Consulting, Optimization &amp; Support',
      copyright: '&copy; 2018-present MySuite'
    },

    search: {
      provider: 'local'
    }
  }
})
