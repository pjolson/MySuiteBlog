import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MySuite',
  description: 'NetSuite Consulting, Optimization, and Support Services',

  sitemap: {
    hostname: 'https://mysuite.tech'
  },

  head: [
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-R3FVBP7K9S' }],
    ['script', {}, "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-R3FVBP7K9S');"],
  ],

  themeConfig: {
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
