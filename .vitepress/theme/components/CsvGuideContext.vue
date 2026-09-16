<script setup>
import { computed, ref } from 'vue'
import { guideEntries, basePath } from '../../data/csv-errors/catalogue.mjs'
import { csvSession } from '../csv-session.js'
import { parseRecordTypes } from '../../data/csv-errors/record-type.mjs'
import { labelForContext } from '../../data/csv-errors/import-types.mjs'
import { searchEntries } from '../../data/csv-errors/search.mjs'
import CsvGuideNavigation from './CsvGuideNavigation.vue'

const props = defineProps({ slug: { type: String, required: true } })
const members = computed(() => guideEntries(props.slug))
const contexts = computed(() => [...new Set(members.value.flatMap(entry => entry.contexts))])
const contextSelection = computed({
  get: () => csvSession.context === 'unknown' || contexts.value.includes(csvSession.context) ? csvSession.context : '',
  set: value => { csvSession.context = value }
})
const queryMatch = computed(() => csvSession.query.trim()
  ? searchEntries(csvSession.query, { context: contextSelection.value }).results.find(result => result.slug === props.slug)
  : undefined)
const matchedEntry = computed(() => queryMatch.value?.entries.length === 1 ? queryMatch.value.entries[0] : undefined)
const choices = computed(() => {
  const visible = members.value.filter(entry => !contexts.value.includes(csvSession.context) || entry.contexts.includes(csvSession.context))
  return matchedEntry.value ? [matchedEntry.value, ...visible.filter(entry => entry.id !== matchedEntry.value.id)] : visible
})
const hasQuery = computed(() => Boolean(queryMatch.value))
const typePair = computed(() => matchedEntry.value?.id === 'INV-02' ? parseRecordTypes(csvSession.query) : null)
const scenarioCheck = computed(() => members.value.map(entry => entry.contextChecks?.[contextSelection.value]).find(Boolean))
const copyStatus = ref('')
async function copyLink() {
  try {
    await navigator.clipboard.writeText(`${window.location.origin}${basePath}${props.slug}`)
    copyStatus.value = 'Link copied'
  } catch {
    copyStatus.value = 'Copy the guide address from your browser to share it.'
  }
}
</script>

<template>
  <div class="csv-guide-context">
    <CsvGuideNavigation />
    <div v-if="hasQuery" class="csv-original" data-nosnippet>
      <strong>Your error</strong>
      <pre>{{ csvSession.query }}</pre>
    </div>
    <div v-if="matchedEntry" class="csv-notice csv-matched-answer">
      <strong><a :href="`#${matchedEntry.anchor}`">{{ matchedEntry.title }}</a></strong>
      <p>{{ matchedEntry.explanation }}</p>
      <template v-if="matchedEntry.id === 'INV-02'">
        <table v-if="typePair" class="csv-type-pair" data-nosnippet>
          <thead><tr><th>Role</th><th>Type</th><th>Identifier from your error</th></tr></thead>
          <tbody>
            <tr><th>Existing record type</th><td>{{ typePair.actual.label || 'Unfamiliar type' }}</td><td><code>{{ typePair.actual.identifier }}</code></td></tr>
            <tr><th>Requested type</th><td>{{ typePair.requested.label || 'Unfamiliar type' }}</td><td><code>{{ typePair.requested.identifier }}</code></td></tr>
          </tbody>
        </table>
        <p v-else>The message does not include both type names. Check the complete error before choosing a record type.</p>
        <p v-if="typePair?.actual.item && typePair?.requested.item">For an item import, if the existing {{ typePair.actual.label }} item is your intended target, choose its matching Record Type. Otherwise, correct the target identifier first.</p>
      </template>
      <p><strong>Check this first</strong></p>
      <p>{{ matchedEntry.firstCheck }}</p>
    </div>
    <div class="csv-actions">
      <button type="button" class="cta-secondary csv-button" @click="copyLink">Copy link</button>
      <span role="status">{{ copyStatus }}</span>
    </div>
    <div v-if="scenarioCheck" class="csv-notice csv-context-check">
      <strong>{{ scenarioCheck.title }}</strong>
      <p>{{ scenarioCheck.text }}</p>
      <div class="csv-actions">
        <a :href="`#${scenarioCheck.anchor}`" class="cta-secondary csv-button">Read these checks</a>
      </div>
    </div>
    <div v-if="members.length > 1" class="csv-search-panel">
      <template v-if="contexts.length > 1">
        <label :for="`guide-context-${slug}`">What are you importing?</label>
        <select :id="`guide-context-${slug}`" v-model="contextSelection">
          <option value="">All import types</option>
          <option value="unknown">I'm not sure</option>
          <option v-for="context in contexts" :key="context" :value="context">{{ labelForContext(context) }}</option>
        </select>
      </template>
      <p v-else class="csv-help">Choose the message that matches your import.</p>
      <ul class="csv-context-links">
        <li v-for="entry in choices" :key="entry.id"><a :href="`#${entry.anchor}`">{{ entry.title }} <span class="csv-help">({{ entry.contexts.join(', ') }})</span></a></li>
      </ul>
    </div>
  </div>
</template>
