<script setup>
const props = defineProps({
  message: {
    type: String,
    default: 'I offer contract NetSuite administration and development support, from quick fixes to ongoing managed services.'
  }
})
</script>

<template>
  <div class="consulting-cta">
    <div class="cta-content">
      <h3>Need help with NetSuite?</h3>
      <p>{{ message }}</p>
      <div class="cta-actions">
        <a href="https://meetings-eu1.hubspot.com/patrick-olson/mysuite" target="_blank" class="cta-primary">Book a Free Consultation</a>
        <a href="/about/" class="cta-secondary">View Services & Pricing</a>
      </div>
    </div>
  </div>
</template>
