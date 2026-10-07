import DefaultTheme from 'vitepress/theme'
import './style.css'
import './csv-translator.css'

import BlogIndex from './components/BlogIndex.vue'
import TagList from './components/TagList.vue'
import TagLinks from './components/TagLinks.vue'
import HubSpotForm from './components/HubSpotForm.vue'
import GreenlightBanner from './components/GreenlightBanner.vue'
import ConsultingCTA from './components/ConsultingCTA.vue'
import ChecklistCTA from './components/ChecklistCTA.vue'
import FeaturedPosts from './components/FeaturedPosts.vue'
import CsvTranslator from './components/CsvTranslator.vue'
import CsvGuideContext from './components/CsvGuideContext.vue'
import CsvEntryHelp from './components/CsvEntryHelp.vue'
import CsvGuideFooter from './components/CsvGuideFooter.vue'

// Bookings complete on meetings-eu1.hubspot.com, so GA4 never sees the outcome,
// only the click. Record the click and carry the CTA's own UTM values with it,
// which is what tells you WHICH post or WHICH CSV error produced the booking.
// Delegated on document so it keeps working across SPA navigation.
function trackBookingClicks() {
  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element && event.target.closest('a[href]')
    if (!link || !link.href.includes('meetings-eu1.hubspot.com')) return
    if (typeof window.gtag !== 'function') return

    let params
    try {
      params = new URL(link.href).searchParams
    } catch {
      params = new URLSearchParams()
    }

    window.gtag('event', 'book_meeting', {
      page_path: window.location.pathname,
      cta_medium: params.get('utm_medium') || '',
      cta_campaign: params.get('utm_campaign') || '',
      cta_content: params.get('utm_content') || '',
      cta_term: params.get('utm_term') || ''
    })
  }, true)
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    if (typeof window !== 'undefined') trackBookingClicks()

    app.component('BlogIndex', BlogIndex)
    app.component('TagList', TagList)
    app.component('TagLinks', TagLinks)
    app.component('HubSpotForm', HubSpotForm)
    app.component('GreenlightBanner', GreenlightBanner)
    app.component('ConsultingCTA', ConsultingCTA)
    app.component('ChecklistCTA', ChecklistCTA)
    app.component('FeaturedPosts', FeaturedPosts)
    app.component('CsvTranslator', CsvTranslator)
    app.component('CsvGuideContext', CsvGuideContext)
    app.component('CsvEntryHelp', CsvEntryHelp)
    app.component('CsvGuideFooter', CsvGuideFooter)
  }
}
