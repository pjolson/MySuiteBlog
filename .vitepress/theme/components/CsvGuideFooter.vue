<script setup>
import CsvGuideNavigation from './CsvGuideNavigation.vue'

const props = defineProps({ showNavigation: Boolean, slug: { type: String, default: '' } })
// UTMs go on the external booking link only. Internal links stay clean so a
// visitor's original attribution survives the session.
const booking = `https://meetings-eu1.hubspot.com/patrick-olson?utm_source=mysuite&utm_medium=csv-tool&utm_campaign=import-fix&utm_content=${props.slug || 'csv-tool'}`
</script>

<template>
  <CsvGuideNavigation v-if="showNavigation" />
  <div class="consulting-cta csv-contact">
    <h2>Book a free 30-minute look at your import error</h2>
    <p>Bring the error and your file to a screen share and I will dig into it live. Thirty minutes is usually enough to find what is wrong and tell you what fixing it takes. Sometimes that settles it on the call; when it does not, you leave with a straight answer instead of a mystery. No cost and no obligation.</p>
    <p>An import that keeps failing is often the first visible sign of a larger setup problem. Most of my client work starts exactly here: somebody mid-import, a file that will not load, and nobody on their side to email. If a migration or implementation sits behind this error, that is the work I do every week.</p>
    <div class="cta-actions">
      <a class="cta-primary" :href="booking" target="_blank" rel="noopener">Book a free 30-minute look</a>
      <a class="cta-secondary" href="/about/">View services</a>
    </div>
  </div>
</template>
