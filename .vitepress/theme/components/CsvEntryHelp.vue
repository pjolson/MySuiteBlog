<script setup>
import { computed, ref, watch } from 'vue'
import { entries } from '../../data/csv-errors/catalogue.mjs'
import { questionFor } from '../../data/csv-errors/questions.mjs'
import { copyableSteps } from '../../data/csv-errors/render.mjs'

const props = defineProps({ entryId: { type: String, required: true } })
const entry = computed(() => entries.find(entry => entry.id === props.entryId))
const question = computed(() => questionFor(entry.value))
const selected = ref('')
const copyStatus = ref('')
const selection = computed(() => question.value?.options.find(option => option.label === selected.value))
const answer = computed(() => selection.value?.answer)
watch(() => props.entryId, () => { selected.value = ''; copyStatus.value = '' })
async function copySteps() {
  try {
    await navigator.clipboard.writeText(copyableSteps(entry.value))
    copyStatus.value = 'Steps copied'
  } catch {
    copyStatus.value = 'Select the steps above and copy them with your browser.'
  }
}
</script>

<template>
  <div class="csv-entry-help">
    <details v-if="question" class="csv-question" name="csv-follow-up">
      <summary>If that looks right</summary>
      <label :for="`question-${entry.anchor}`">{{ question.prompt }}</label>
      <select :id="`question-${entry.anchor}`" v-model="selected">
        <option value="">Choose an answer</option>
        <option v-for="option in question.options" :key="option.label" :value="option.label">{{ option.label }}</option>
      </select>
      <div v-if="answer" class="csv-notice" role="status">
        <p style="white-space: pre-line">{{ answer }}</p>
        <p v-for="link in selection.links || []" :key="link.url"><a :href="link.url">{{ link.label }}</a></p>
      </div>
    </details>
    <div class="csv-actions">
      <button type="button" class="cta-secondary csv-button" @click="copySteps">Copy steps</button>
      <span role="status" class="csv-help">{{ copyStatus }}</span>
    </div>
  </div>
</template>
