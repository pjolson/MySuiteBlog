<script setup>
import { computed, nextTick } from 'vue'
import { useRouter } from 'vitepress'
import { basePath } from '../../data/csv-errors/catalogue.mjs'
import { csvSession, clearSearch } from '../csv-session.js'

const router = useRouter()
const hasSearch = computed(() => csvSession.query.trim() || csvSession.context || csvSession.category)

async function startOver() {
  clearSearch()
  await router.go(basePath)
  await nextTick()
  document.getElementById('csv-query')?.focus()
}
</script>

<template>
  <div class="csv-actions csv-guide-navigation" role="group" aria-label="Translator navigation">
    <a :href="basePath" class="cta-secondary csv-button">{{ hasSearch ? 'Back to results' : 'Browse all errors' }}</a>
    <button type="button" class="cta-primary csv-button" @click="startOver">Clear and start over</button>
  </div>
</template>
