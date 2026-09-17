<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  message: {
    type: String,
    default: 'MySuite provides contract NetSuite administration and development support, from quick fixes to ongoing managed services.'
  },
  secondaryLink: { type: String, default: '/about/' },
  secondaryText: { type: String, default: 'View Services & Pricing' }
})
// The post slug rides on the booking link so consultations attribute to the
// article that produced them.
const { page } = useData()
const booking = computed(() => {
  const slug = page.value.relativePath.replace(/^blog\//, '').replace(/\.md$/, '')
  return `https://meetings-eu1.hubspot.com/patrick-olson?utm_source=mysuite&utm_medium=blog&utm_campaign=consultation&utm_content=${slug}`
})
</script>

<template>
  <div class="consulting-cta">
    <div class="cta-content">
      <h3>Need help with NetSuite?</h3>
      <p>{{ message }}</p>
      <div class="cta-actions">
        <a :href="booking" target="_blank" class="cta-primary">Book a Free Consultation</a>
        <a :href="secondaryLink" class="cta-secondary">{{ secondaryText }}</a>
      </div>
    </div>
  </div>
</template>
