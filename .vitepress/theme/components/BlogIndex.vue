<script setup>
import { computed, ref } from 'vue'
import { data as posts } from '../../../blog/posts.data.mjs'
import { formatPostDate, isoPostDate } from '../post-date.js'

// Topic filter: only tags carried by enough posts to be worth a button.
const MIN_POSTS_PER_TOPIC = 5
const topics = computed(() => {
  const counts = new Map()
  for (const post of posts) {
    for (const tag of post.frontmatter.tags || []) counts.set(tag, (counts.get(tag) || 0) + 1)
  }
  return [...counts]
    .filter(([, count]) => count >= MIN_POSTS_PER_TOPIC)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
})

const active = ref('')
const visible = computed(() =>
  active.value ? posts.filter(post => (post.frontmatter.tags || []).includes(active.value)) : posts
)
</script>

<template>
  <div class="blog-index">
    <div class="blog-filter" role="group" aria-label="Filter articles by topic">
      <button type="button" :class="{ active: active === '' }" :aria-pressed="active === ''" @click="active = ''">All</button>
      <button
        v-for="topic in topics"
        :key="topic"
        type="button"
        :class="{ active: active === topic }"
        :aria-pressed="active === topic"
        @click="active = topic"
      >{{ topic }}</button>
    </div>

    <div class="blog-grid">
      <a v-for="post in visible" :key="post.url" :href="post.url" class="blog-card">
        <span v-if="post.frontmatter.tags" class="ms-kicker">{{ post.frontmatter.tags.slice(0, 2).join(' / ') }}</span>
        <h2>{{ post.frontmatter.title }}</h2>
        <p class="description">{{ post.frontmatter.description }}</p>
        <time class="date" :datetime="isoPostDate(post.frontmatter.date)">{{ formatPostDate(post.frontmatter.date) }}</time>
      </a>
    </div>
  </div>
</template>
