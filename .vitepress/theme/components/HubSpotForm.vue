<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

// HubSpot's embed posts a message to the parent window when a form is
// submitted successfully. Turn that into a GA4 conversion so the inquiry
// path is measurable. event.data.data.submissionValues carries what the
// visitor typed, including their email, so none of it is forwarded.
function onHubSpotMessage(event) {
  const payload = event.data
  if (!payload || payload.type !== 'hsFormCallback') return
  if (payload.eventName !== 'onFormSubmitted') return
  if (typeof window.gtag !== 'function') return

  window.gtag('event', 'generate_lead', {
    form_id: payload.id || '',
    page_path: window.location.pathname
  })
}

onMounted(() => {
  window.addEventListener('message', onHubSpotMessage)

  const script = document.createElement('script')
  script.src = 'https://js-eu1.hsforms.net/forms/embed/147146964.js'
  script.defer = true
  document.head.appendChild(script)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', onHubSpotMessage)
})
</script>

<template>
  <div class="hs-form-frame" data-region="eu1" data-form-id="4e254ef3-4140-4029-8d51-804ec7dbb62d" data-portal-id="147146964"></div>
</template>
