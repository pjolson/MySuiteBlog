<script setup>
import CsvGuideNavigation from './CsvGuideNavigation.vue'

const props = defineProps({ showNavigation: Boolean, slug: { type: String, default: '' } })
// UTMs go on the external booking link only. Internal links stay clean so a
// visitor's original attribution survives the session.
const booking = `https://meetings-eu1.hubspot.com/patrick-olson/mysuite?utm_source=mysuite&utm_medium=csv-tool&utm_campaign=import-fix&utm_content=${props.slug || 'csv-tool'}`
</script>

<template>
  <CsvGuideNavigation v-if="showNavigation" />
  <div class="consulting-cta csv-contact">
    <h2>Book a free 30-minute import fix</h2>
    <p>Bring the error and your file to a screen share and we will work it live. Most import errors resolve inside the half hour. If yours needs more, you leave knowing exactly what is wrong and what fixing it takes. No cost and no obligation.</p>
    <p>An import that keeps failing is often the first visible sign of a larger setup problem. If a migration or implementation sits behind this error, that is the work we do every week.</p>
    <div class="cta-actions">
      <a class="cta-primary" :href="booking" target="_blank" rel="noopener">Book a free import fix</a>
      <a class="cta-secondary" href="/about/">View services</a>
    </div>
  </div>
</template>
