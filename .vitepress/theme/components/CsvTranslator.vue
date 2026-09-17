<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { normalize, searchEntries } from '../../data/csv-errors/search.mjs'
import { entries, guides } from '../../data/csv-errors/catalogue.mjs'
import { categories } from '../../data/csv-errors/guides.mjs'
import { importTypeGroups, labelForContext } from '../../data/csv-errors/import-types.mjs'
import { csvSession, clearSearch } from '../csv-session.js'
import { createSearchTracker, protectSearchPrivacy } from '../csv-feedback.mjs'
import CsvFeedback from './CsvFeedback.vue'

const input = ref(null)
const result = computed(() => searchEntries(csvSession.query, csvSession))
const count = computed(() => result.value.results.length)
const explanationCount = computed(() => result.value.results.reduce((total, item) => total + item.entries.length, 0))
const active = computed(() => csvSession.query.trim() || csvSession.context || csvSession.category)
const unknown = computed(() => Boolean(normalize(csvSession.query)) && !result.value.unfilteredCount)
// The live region stays in the DOM permanently; an empty string announces
// nothing, so assistive technology hears the first real count and no stale one.
const resultsAnnouncement = computed(() => active.value
  ? `${count.value === 1 ? '1 matching guide' : `${count.value} matching guides`} covering ${explanationCount.value === 1 ? '1 explanation' : `${explanationCount.value} explanations`}.`
  : '')
const tracker = createSearchTracker({ source: 'translator', filters: () => csvSession })
watch(() => csvSession.source, source => { if (source === 'header') tracker.cancel() })
onMounted(protectSearchPrivacy)
onBeforeUnmount(tracker.cancel)
const ambiguous = computed(() => csvSession.query.trim() && !csvSession.context && (
  result.value.results.length > 1 || result.value.results.some(result => result.entries.length > 1)
))
// The matched results' own import types, most relevant first, so an ambiguous
// answer becomes a direct question instead of a passive tip.
const contextChoices = computed(() => [...new Set(result.value.results.flatMap(item => item.contexts))].slice(0, 8))
function clear() {
  tracker.schedule('')
  clearSearch()
  input.value?.focus()
}
function searchInput(event) {
  if (event.isComposing) return
  csvSession.source = 'translator'
  tracker.schedule(event.target.value)
}
function unfilter() {
  csvSession.context = ''
  csvSession.category = ''
}
</script>

<template>
  <section class="csv-translator" aria-label="Find a CSV error guide" data-nosnippet>
    <div class="csv-search-panel">
      <label for="csv-query">Error message or problem</label>
      <input id="csv-query" ref="input" v-model="csvSession.query" type="search" @input="searchInput"
        placeholder='Paste your NetSuite error, or try "invalid item"'
        aria-describedby="csv-query-help" autocomplete="off" spellcheck="false">
      <p id="csv-query-help" class="csv-help">You can paste the whole message, including any record numbers.</p>
      <p class="csv-help">Your search text stays in this tab unless you choose to send it for review. We count unsuccessful searches without recording the message.</p>
      <label for="csv-context">What are you importing?</label>
      <select id="csv-context" v-model="csvSession.context">
        <option value="">All import types</option>
        <option value="unknown">I'm not sure</option>
        <optgroup v-for="group in importTypeGroups" :key="group.label" :label="group.label">
          <option v-for="type in group.types" :key="type.context" :value="type.context">{{ type.label }}</option>
        </optgroup>
      </select>
      <div class="csv-actions">
        <button class="cta-primary csv-button" type="button" :disabled="!active" @click="clear">Clear and start over</button>
      </div>
    </div>

    <h2 id="common-places">Common places imports get stuck</h2>
    <div class="csv-categories" role="group" aria-labelledby="common-places">
      <button v-for="category in categories" :key="category" type="button"
        :aria-pressed="csvSession.category === category"
        @click="csvSession.category = csvSession.category === category ? '' : category">{{ category }}</button>
    </div>

    <p role="status" aria-live="polite" aria-atomic="true" class="csv-results-count">{{ resultsAnnouncement }}</p>
    <p class="csv-help">Search {{ entries.length }} documented import situations across {{ guides.length }} guides. Detailed troubleshooting is available for the most common and best-supported errors.</p>
    <div v-if="ambiguous && count" class="csv-notice">
      <strong>This message has a few possible causes</strong>
      <p>Which import produced it?</p>
      <div class="csv-categories csv-context-choices">
        <button v-for="context in contextChoices" :key="context" type="button"
          @click="csvSession.context = context">{{ labelForContext(context) }}</button>
        <button type="button" @click="csvSession.context = 'unknown'">I'm not sure</button>
      </div>
    </div>
    <div v-if="count && result.otherCount > 0" class="csv-actions">
      <span class="csv-help">There are also matches outside these filters.</span>
      <button type="button" class="cta-secondary csv-button" @click="unfilter">Show all matches</button>
    </div>
    <div v-if="!count" class="csv-empty">
      <h3>{{ result.needsContext ? 'More detail needed' : result.otherCount ? 'No matches with these filters' : "We haven't covered this one yet" }}</h3>
      <p v-if="result.needsContext">{{ result.clarificationPrompt }}</p>
      <template v-else-if="result.otherCount">
        <p>The matching guides are filed under a different import type.</p>
        <div class="csv-categories csv-context-choices">
          <button v-for="context in result.otherContexts.slice(0, 8)" :key="context" type="button"
            @click="csvSession.context = context">{{ labelForContext(context) }}</button>
          <button type="button" @click="unfilter">Show all matches</button>
        </div>
      </template>
      <p v-else>Try a shorter part of the message, such as the field name. If it mentions a script, the message may come from your account's custom code.</p>
      <CsvFeedback v-if="unknown" :query="csvSession.query" :context="csvSession.context" :source="csvSession.source" />
      <div class="cta-actions">
        <button type="button" class="cta-secondary csv-button" @click="clear">Browse all errors</button>
        <a class="cta-secondary csv-button" href="https://meetings-eu1.hubspot.com/patrick-olson/mysuite?utm_source=mysuite&utm_medium=csv-tool&utm_campaign=import-fix&utm_content=translator" target="_blank" rel="noopener">Book a free 30-minute import fix</a>
      </div>
    </div>
    <ul v-else class="csv-results">
      <li v-for="item in result.results" :key="item.slug" class="csv-result">
        <p class="csv-result-context">{{ item.contexts.join(' · ') }}</p>
        <h3><a :href="item.url">{{ item.title }}</a></h3>
        <p>{{ item.description }}</p>
        <span v-if="item.matched && item.entries.length === 1" class="csv-match">Message matched</span>
        <span v-else-if="item.matched" class="csv-match">A few possibilities</span>
      </li>
    </ul>
  </section>
</template>
