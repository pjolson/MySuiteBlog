import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MySuite',
  description: 'NetSuite implementation advisory and administration for internal teams. SOW review, project oversight, and ongoing support.',

  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['img/**/*.md'],

  sitemap: {
    hostname: 'https://mysuite.tech',
    transformItems(items) {
      return items.filter(item => item.url !== 'blog/firstpost')
    }
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
      .replace(/\.md$/, '')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageData.title + ' | MySuite' }],
      ['meta', { property: 'og:description', content: pageData.description || 'NetSuite implementation advisory and administration for internal teams. SOW review, project oversight, and ongoing support.' }]
    )

    // JSON-LD structured data for blog posts
    if (pageData.relativePath.startsWith('blog/') && !pageData.frontmatter.blog_index && !pageData.frontmatter.hidden) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': pageData.title,
        'description': pageData.description || '',
        'url': canonicalUrl,
        'author': {
          '@type': 'Person',
          'name': 'Patrick Olson',
          'url': 'https://mysuite.tech/about/'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'MySuite',
          'url': 'https://mysuite.tech',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://mysuite.tech/og-image.png'
          }
        }
      }
      if (pageData.frontmatter.date) {
        jsonLd.datePublished = new Date(pageData.frontmatter.date).toISOString().split('T')[0]
      }
      pageData.frontmatter.head.push(
        ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)]
      )
    }

    // FAQ schema for health check page
    if (pageData.frontmatter.faqSchema) {
      const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Is the NetSuite Health Check safe? What access do you need?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Read-only access via a scoped, token-based role. The extraction pulls configuration and metadata only, not transaction data. Nothing in your account is modified, and all access objects are removed when the engagement ends.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How long does the NetSuite Health Check take?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Report within 24 hours. Debrief scheduled with you, usually within the same week.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What if our NetSuite account is clean?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Then you get documented proof of a well-governed system. Useful for auditors and boards.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Do you fix the issues found in the Health Check?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes. The Health Check is the diagnosis. I scope remediation separately.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Does the Health Check work for OneWorld / multi-subsidiary?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes.'
            }
          }
        ]
      }
      pageData.frontmatter.head.push(
        ['script', { type: 'application/ld+json' }, JSON.stringify(faqLd)]
      )
    }
  },

  themeConfig: {
    logo: { src: '/logo.svg', alt: 'MySuite' },
    siteTitle: false,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Services', link: '/about/' },
      { text: 'Health Check', link: '/netsuite-health-check' },
      { text: 'Contact', link: '/contact/' },
      { text: 'Greenlight Approvals', link: 'https://greenlightapprovals.io', target: '_blank' }
    ],

    sidebar: false,

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/patrick-olson-pmp/' }
    ],

    footer: {
      message: 'NetSuite Implementation Advisory &amp; Administration',
      copyright: '&copy; 2018-present MySuite'
    },

    search: {
      provider: 'local'
    }
  }
})
