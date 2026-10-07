<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

// Turn a successful HubSpot submission into a GA4 conversion.
//
// HubSpot has two generations of form embed and they report success
// differently. This form uses the updated editor (div.hs-form-frame plus
// /forms/embed/<portalId>.js), which dispatches a window event. The older
// v2.js embed instead postMessages hsFormCallback. Both are handled so the
// event survives whichever generation the form is on.
//
// Only the form id and page path are sent. HubSpot's payload also carries
// submissionValues, which holds the visitor's email, and none of that is
// forwarded to GA4.

let lastSent = 0

function sendLead(formId) {
  if (typeof window.gtag !== 'function') return
  const now = Date.now()
  if (now - lastSent < 2000) return // both listeners firing is one conversion
  lastSent = now

  window.gtag('event', 'generate_lead', {
    form_id: formId || '',
    page_path: window.location.pathname
  })
}

// updated forms editor
function onFormSuccess(event) {
  sendLead(event && event.detail && event.detail.formId)
}

// legacy v2.js embed
function onLegacyMessage(event) {
  const payload = event.data
  if (!payload || payload.type !== 'hsFormCallback') return
  if (payload.eventName !== 'onFormSubmitted') return
  sendLead(payload.id)
}

onMounted(() => {
  window.addEventListener('hs-form-event:on-submission:success', onFormSuccess)
  window.addEventListener('message', onLegacyMessage)

  const script = document.createElement('script')
  script.src = 'https://js-eu1.hsforms.net/forms/embed/147146964.js'
  script.defer = true
  document.head.appendChild(script)
})

onBeforeUnmount(() => {
  window.removeEventListener('hs-form-event:on-submission:success', onFormSuccess)
  window.removeEventListener('message', onLegacyMessage)
})
</script>

<template>
  <div class="hs-form-frame" data-region="eu1" data-form-id="4e254ef3-4140-4029-8d51-804ec7dbb62d" data-portal-id="147146964"></div>
</template>
