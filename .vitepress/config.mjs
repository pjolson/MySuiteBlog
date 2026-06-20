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

    // FAQ schema (per-page Q&A -> FAQPage JSON-LD).
    // The page must also render the same Q&A visibly for Google to honor it.
    if (pageData.frontmatter.faqSchema) {
      const faqByPath = {
        'netsuite-health-check.md': [
          { q: 'Is the NetSuite Health Check safe? What access do you need?', a: 'Read-only access via a scoped, token-based role. The extraction pulls configuration and metadata only, not transaction data. Nothing in your account is modified, and all access objects are removed when the engagement ends.' },
          { q: 'How long does the NetSuite Health Check take?', a: 'Report within 24 hours. Debrief scheduled with you, usually within the same week.' },
          { q: 'What if our NetSuite account is clean?', a: 'Then you get documented proof of a well-governed system. Useful for auditors and boards.' },
          { q: 'Do you fix the issues found in the Health Check?', a: 'Yes. The Health Check is the diagnosis. I scope remediation separately.' },
          { q: 'Does the Health Check work for OneWorld / multi-subsidiary?', a: 'Yes.' }
        ],
        'blog/netsuite-bill-capture-email-relay.md': [
          { q: 'What is NetSuite Bill Capture?', a: 'NetSuite Bill Capture is the SuiteApp that scans vendor bills and lets you submit invoices by email or upload. The email submission feature is sometimes called the Email Capture Plugin. Bill Capture reads the sender address of each inbound email to decide whether the submission is allowed.' },
          { q: 'Can you disable the vendor notification emails NetSuite Bill Capture sends?', a: 'Not natively. There is no setting to turn off the confirmation and rejection emails Bill Capture sends back to the original sender. The request is logged in the NetSuite SuiteIdeas portal as enhancement 756799 and has been open since at least 2024. Routing AP email through a relay inbox keeps those notifications away from your vendors.' },
          { q: 'Does the NetSuite Transaction Email Plugin control Bill Capture emails?', a: 'No. Admins often reach for the Transaction Email Plugin to customize or suppress transaction notifications, but it does not cover the confirmation and rejection emails Bill Capture sends on email submissions. Those messages are separate, and there is no supported way to disable them as of mid-2026.' },
          { q: 'Is Bill Capture the same as the NetSuite Email Capture Plugin or Email Plugin?', a: 'The terms get used loosely. The current SuiteApp is Bill Capture, and its email submission option is what many admins call the Email Capture Plugin or simply the Email Plugin. It is different from the Transaction Email Plugin, which is a separate SuiteScript plugin for customizing transaction emails.' },
          { q: 'How do you let any vendor email invoices into NetSuite without pre-registering them?', a: 'Bill Capture only accepts email from sender addresses registered on a vendor record. Routing all AP email through a single relay inbox that forwards to NetSuite means every submission arrives from one approved sender, so you can accept invoices from any vendor without configuring their address first. Keep your downstream approval controls strong, since this removes a layer of access control.' }
        ],
        'blog/netsuite-sow-before-you-sign.md': [
          { q: 'What questions should you ask a NetSuite reseller before signing?', a: 'Challenge every module on the order form: do you have a business process that needs it today, and what does the base platform already do? Confirm each user is licensed at the right level, Full Access versus Employee Center. Get renewal terms in writing, including discount preservation, an annual increase cap, and module-level line-item pricing. Then map everything shown in the sales demo against the actual SOW deliverables, because the delivery team builds from the SOW, not the demo.' },
          { q: 'What is the difference between a NetSuite Full Access and Employee Center license?', a: 'A Full Access license, roughly $99 to $199 per user per month, can run transactions, pull reports, build saved searches, and administer the system. An Employee Center license, around $10 to $25 per user per month, is limited to submitting time and expenses, entering and approving purchase orders, and approving vendor bills. Licensing follows the highest-permission role assigned, so a user with any standard role consumes a full license even if they also have Employee Center.' },
          { q: 'Does the NetSuite discount expire at renewal?', a: 'Usually yes. Initial NetSuite pricing almost always includes a discount structured to expire at the end of the initial term, after which you renew at list price, sometimes with an annual uplift clause on top. Negotiate discount preservation, an increase cap of 3 to 5 percent, and module-level pricing into the renewal terms before you sign, not after.' },
          { q: 'What should a NetSuite implementation SOW include?', a: 'It should define data migration in detail (number of test loads, who owns cleansing, what is in scope, who pays for rework), integrations (direction, frequency, field mapping, middleware, ownership after go-live), role-based training with written materials, post-go-live hypercare (duration, hours, response times, escalation), and documentation as a named deliverable with a handoff date. A two-word line item like "data migration" is a placeholder, not a deliverable.' },
          { q: 'Is the NetSuite sales team the same as the implementation team?', a: 'No. The sales engineers and account executives who sell and demo NetSuite are not the people who implement it. The implementation partner works from the Statement of Work, not the demo or the sales call, so anything that was shown but is not written into the SOW is out of scope. After every demo, write down the specific capabilities you were shown and map them against the SOW deliverables before you sign.' }
        ]
      }
      const faqItems = faqByPath[pageData.relativePath]
      if (faqItems) {
        const faqLd = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': faqItems.map(item => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': { '@type': 'Answer', 'text': item.a }
          }))
        }
        pageData.frontmatter.head.push(
          ['script', { type: 'application/ld+json' }, JSON.stringify(faqLd)]
        )
      }
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
      { text: 'Partners', link: '/partners/' },
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
