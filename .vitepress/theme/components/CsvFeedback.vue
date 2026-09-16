<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { importTypes } from '../../data/csv-errors/catalogue.mjs'
import { feedbackLimits } from '../../data/csv-errors/feedback-contract.mjs'
import { catalogueVersion, postFeedback, protectSearchPrivacy } from '../csv-feedback.mjs'
import { csvSession } from '../csv-session.js'

const props = defineProps({ query: String, context: String, source: String })
const open = ref(false)
const message = ref('')
const context = ref('unknown')
const note = ref('')
const source = ref('translator')
const validDraft = computed(() => message.value.trim() && message.value.length <= feedbackLimits.message && note.value.length <= feedbackLimits.note)
const busy = ref(false)
const status = ref('')
const textarea = ref(null)
const trigger = ref(null)
let attempt

async function show() {
  protectSearchPrivacy()
  if (!attempt) {
    message.value = props.query || ''
    context.value = importTypes.includes(props.context) ? props.context : 'unknown'
    note.value = ''
    source.value = props.source || 'translator'
  }
  status.value = ''
  open.value = true
  await nextTick()
  textarea.value?.focus()
}
async function cancel() {
  open.value = false
  status.value = ''
  await nextTick()
  trigger.value?.focus()
}
async function submit() {
  if (busy.value || !validDraft.value) return
  const details = { message: message.value, context: context.value, note: note.value, source: source.value, catalogueVersion }
  if (!attempt || Object.keys(details).some(key => attempt[key] !== details[key])) attempt = { id: crypto.randomUUID(), ...details }
  busy.value = true
  status.value = ''
  try {
    await postFeedback('/api/csv-feedback', attempt)
    status.value = 'success'
    open.value = false
    message.value = ''; note.value = ''; attempt = undefined
  } catch {
    status.value = 'failure'
  } finally { busy.value = false }
}
watch(() => props.query, () => { if (!open.value && !attempt) status.value = '' })
watch(() => csvSession.reviewRequested, requested => {
  if (requested) { csvSession.reviewRequested = false; show() }
}, { immediate: true })
</script>

<template>
  <section class="csv-feedback" aria-labelledby="csv-feedback-title" data-nosnippet data-private>
    <h3 id="csv-feedback-title">Help us cover this error</h3>
    <p>Send us the message so we can research it and improve the guide. You can edit it before sending. No email address needed.</p>
    <p v-if="status === 'success'" class="csv-notice" role="status">Thanks. Your error has been sent for review.</p>
    <button v-if="!open && status !== 'success'" ref="trigger" type="button" class="cta-primary csv-button" @click="show">Send this error for review</button>
    <form v-if="open" class="csv-feedback-form" aria-label="Send an error for review" @submit.prevent.stop="submit">
      <fieldset :disabled="busy">
        <label for="csv-feedback-message">Error message</label>
        <textarea id="csv-feedback-message" ref="textarea" v-model="message" rows="5" required :maxlength="feedbackLimits.message" aria-describedby="csv-feedback-help" autocomplete="off" spellcheck="false" />
        <p id="csv-feedback-help" class="csv-help">Remove client names, email addresses, account numbers, and anything else you do not want to share.</p>
        <p v-if="message.length > feedbackLimits.message" role="alert">Shorten the message to 4,000 characters or fewer before sending.</p>
        <label for="csv-feedback-context">What were you importing?</label>
        <select id="csv-feedback-context" v-model="context">
          <option value="unknown">I'm not sure</option>
          <option v-for="type in importTypes" :key="type" :value="type">{{ type }}</option>
        </select>
        <label for="csv-feedback-note">Anything else we should know? <span class="csv-help">(optional)</span></label>
        <textarea id="csv-feedback-note" v-model="note" rows="3" :maxlength="feedbackLimits.note" placeholder="For example, whether you were adding or updating records." autocomplete="off" />
        <p class="csv-help">Submitting sends this message and the details above to MySuite for review. We may use an edited example in the guide. It does not request a support reply.</p>
        <p class="csv-help">Submissions are deleted automatically after 90 days.</p>
        <div class="csv-actions">
          <button type="submit" class="cta-primary csv-button" :disabled="busy || !validDraft">Send for review</button>
          <button type="button" class="cta-secondary csv-button" @click="cancel">Cancel</button>
        </div>
      </fieldset>
      <p v-if="busy" role="status">Sending your error...</p>
      <p v-if="status === 'failure'" role="alert">We couldn't send that. Your message is still here so you can try again.</p>
    </form>
  </section>
</template>
