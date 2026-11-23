<script setup>
// Site footer. Rendered through the layout-bottom slot in Layout.vue, in place
// of the one-line VPFooter (themeConfig.footer is intentionally unset).
// Every link here already exists in the nav or on a page: add a route to the
// site first, then list it here.
const columns = [
  {
    title: 'Services',
    links: [
      { text: 'Fractional NetSuite Administration', href: '/fractional-netsuite-administrator' },
      { text: 'Implementation Support', href: '/netsuite-implementation-support' },
      { text: 'Customization & Integrations', href: '/netsuite-customization' },
      { text: 'NetSuite Health Check', href: '/netsuite-health-check' }
    ]
  },
  {
    title: 'Practice',
    links: [
      { text: 'Services Overview', href: '/about/' },
      { text: 'How We Work', href: '/about/#how-we-work' },
      { text: 'About Patrick', href: '/about/#patrick' },
      { text: 'Recent Work', href: '/about/#recent-work' },
      { text: 'Partners', href: '/partners/' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { text: 'Blog', href: '/blog/' },
      { text: 'Tools', href: '/tools/' },
      { text: 'CSV Error Translator', href: '/tools/netsuite-csv-error-translator/' },
      { text: 'Greenlight Software', href: 'https://greenlightsoftware.io', external: true }
    ]
  },
  {
    title: 'Contact',
    links: [
      { text: 'Discuss your NetSuite needs', href: '/contact/' },
      { text: 'patrick@mysuite.tech', href: 'mailto:patrick@mysuite.tech' },
      { text: 'LinkedIn', href: 'https://www.linkedin.com/in/patrick-olson-pmp/', external: true }
    ]
  }
]
</script>

<template>
  <footer class="ms-footer">
    <div class="ms-wrap">
      <div class="ms-footer-top">
        <div class="ms-footer-brand">
          <a href="/" class="ms-footer-logo" aria-label="MySuite home">
            <!-- Same geometry as public/logo.svg, recoloured for a dark ground.
                 textLength and lengthAdjust keep the brackets evenly spaced. -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 120" aria-hidden="true" focusable="false">
              <g transform="translate(10, 10)">
                <path d="M 20 4 L 6 4 L 6 92 L 20 92" stroke="#2DD4A4" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                <text x="30" y="80" font-size="84" font-weight="700" textLength="105" lengthAdjust="spacingAndGlyphs" fill="#ffffff" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">my</text>
                <path d="M 143 4 L 157 4 L 157 92 L 143 92" stroke="#2DD4A4" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                <text x="173" y="80" font-size="84" font-weight="600" fill="#ffffff" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">suite</text>
              </g>
            </svg>
          </a>
          <p>NetSuite implementation advisory and administration for finance and operations teams.</p>
          <p>Based in Barcelona, working with clients across North America.</p>
        </div>

        <nav class="ms-footer-cols" aria-label="Footer">
          <div v-for="column in columns" :key="column.title">
            <h2>{{ column.title }}</h2>
            <ul>
              <li v-for="link in column.links" :key="link.href">
                <a
                  :href="link.href"
                  :target="link.external ? '_blank' : undefined"
                  :rel="link.external ? 'noopener' : undefined"
                >{{ link.text }}</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="ms-footer-bottom">
        <span>&copy; 2018-present MySuite</span>
        <span>NetSuite Implementation Advisory &amp; Administration</span>
      </div>
    </div>
  </footer>
</template>
