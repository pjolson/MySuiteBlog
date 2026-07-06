<script setup>
import { onMounted } from 'vue'

// Gated download for the Go-Live Readiness Checklist PDF.
//
// SETUP REQUIRED (done in HubSpot, portal 147146964):
//   1. Create a new HubSpot form for this asset (name it e.g. "Go-Live Checklist download").
//   2. Set its post-submit thank-you message (or redirect) to link to
//      /netsuite-go-live-readiness-checklist.pdf
//   3. Paste the new form's ID into FORM_ID below.
// Until FORM_ID is set, the embed is replaced by a visible setup note (dev only signal).
const FORM_ID = 'FORM_ID_PLACEHOLDER'
const formConfigured = FORM_ID !== 'FORM_ID_PLACEHOLDER'

onMounted(() => {
  if (!formConfigured) return
  const script = document.createElement('script')
  script.src = 'https://js-eu1.hsforms.net/forms/embed/147146964.js'
  script.defer = true
  document.head.appendChild(script)
})
</script>

<template>
  <div class="checklist-cta">
    <h3>Get the checklist as a PDF</h3>
    <p>Want a clean copy to hand to your steering committee and cutover team? Enter your email and I will send you the printable NetSuite Go-Live Readiness Checklist.</p>
    <div
      v-if="formConfigured"
      class="hs-form-frame"
      data-region="eu1"
      :data-form-id="FORM_ID"
      data-portal-id="147146964"
    ></div>
    <p v-else class="checklist-cta-todo">
      Download form setup pending: create the HubSpot form and set <code>FORM_ID</code> in <code>ChecklistCTA.vue</code>.
    </p>
  </div>
</template>
