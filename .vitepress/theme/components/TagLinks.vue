<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div v-if="frontmatter.tags && frontmatter.tags.length" class="tag-links">
    Tags:
    <a
      v-for="tag in frontmatter.tags"
      :key="tag"
      :href="`/tags/#${tag}`"
      class="tag-badge"
    >{{ tag }}</a>
  </div>
</template>
