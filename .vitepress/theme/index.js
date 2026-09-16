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

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
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
