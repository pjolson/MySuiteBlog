<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRouter } from 'vitepress'
import { basePath } from '../../data/csv-errors/catalogue.mjs'
import { normalize, searchEntries } from '../../data/csv-errors/search.mjs'
import { csvSession, rememberQuery } from '../csv-session.js'
import { createSearchTracker, protectSearchPrivacy } from '../csv-feedback.mjs'

const props = defineProps({ query: { type: String, default: '' } })
const emit = defineEmits(['close'])
const router = useRouter()
const unknown = computed(() => normalize(props.query) && !searchEntries(props.query).results.length)
const tracker = createSearchTracker({ source: 'header' })
watch(() => props.query, query => tracker.schedule(query))
onMounted(() => { protectSearchPrivacy(); csvSession.source = 'header' })
onBeforeUnmount(tracker.cancel)
async function review() {
  tracker.settle(props.query)
  rememberQuery(props.query)
  await router.go(basePath)
  emit('close')
  await nextTick()
  csvSession.reviewRequested = true
}
</script>

<template>
  <div v-if="unknown" class="csv-header-feedback" data-nosnippet>
    <strong>Looking for a CSV import error?</strong>
    <p>No CSV error guide matches this search. You can review and send the message to help us cover it.</p>
    <button type="button" class="cta-secondary csv-button" @click="review">Review this error in the translator</button>
  </div>
</template>
