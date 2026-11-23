<script setup>
// Closing call-to-action band for commercial pages. The default copy is lifted
// from sentences already on the services and contact pages, so it adds no new
// claims. Pass props to reuse the band with page-specific wording and link.
defineProps({
  heading: { type: String, default: 'Every engagement starts with a conversation.' },
  text: {
    type: String,
    default: 'What you are running, where it hurts, and whether I am the right fit to help. No obligation if it is not a fit.'
  },
  link: { type: String, default: '/contact/' },
  label: { type: String, default: 'Discuss your NetSuite needs' },
  external: { type: Boolean, default: false }
})
</script>

<template>
  <section class="ms-band ms-cta-band">
    <div class="ms-wrap ms-cta-band-inner">
      <div>
        <h2>{{ heading }}</h2>
        <p>{{ text }}</p>
      </div>
      <a :href="link" class="cta-primary" :target="external ? '_blank' : undefined">{{ label }}</a>
    </div>
  </section>
</template>
