import DefaultTheme from 'vitepress/theme'
import './style.css'

import BlogIndex from './components/BlogIndex.vue'
import TagList from './components/TagList.vue'
import TagLinks from './components/TagLinks.vue'
import HubSpotForm from './components/HubSpotForm.vue'
import GreenlightBanner from './components/GreenlightBanner.vue'
import ConsultingCTA from './components/ConsultingCTA.vue'
import FeaturedPosts from './components/FeaturedPosts.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BlogIndex', BlogIndex)
    app.component('TagList', TagList)
    app.component('TagLinks', TagLinks)
    app.component('HubSpotForm', HubSpotForm)
    app.component('GreenlightBanner', GreenlightBanner)
    app.component('ConsultingCTA', ConsultingCTA)
    app.component('FeaturedPosts', FeaturedPosts)
  }
}
