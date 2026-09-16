<script setup>
import CsvGuideNavigation from './CsvGuideNavigation.vue'

defineProps({ showNavigation: Boolean })
</script>

<template>
  <CsvGuideNavigation v-if="showNavigation" />
  <div class="consulting-cta csv-contact">
    <h2>Still stuck?</h2>
    <p>We can help you work through the file, the mapping, and the NetSuite setup behind the error.</p>
    <a class="cta-primary" href="/contact/">Talk to MySuite</a>
  </div>
</template>
