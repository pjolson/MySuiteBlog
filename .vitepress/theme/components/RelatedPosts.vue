<script setup>
// Related articles for a static service page. The list is driven by a tag, so
// new posts on the topic appear without editing the page. `pinned` holds the
// articles that must always lead (the page's main feeders), in order; the
// rest fill in newest first. `not` drops posts that also carry another tag,
// for example Implementation posts on a page about live accounts.
//
//   <RelatedPosts tag="Admin" not="Implementation"
//     :pinned="['/blog/netsuite-administrator-cost']" :limit="6" />
import { computed } from 'vue'
import { data as posts } from '../../../blog/posts.data.mjs'
import { formatPostDate, isoPostDate } from '../post-date.js'

const props = defineProps({
  tag: { type: String, required: true },
  not: { type: String, default: '' },
  pinned: { type: Array, default: () => [] },
  limit: { type: Number, default: 6 }
})

const related = computed(() => {
  const byUrl = new Map(posts.map(post => [post.url, post]))
  const lead = props.pinned.map(url => byUrl.get(url)).filter(Boolean)

  // A pinned URL that matches no post is a typo or a renamed post. Say so in
  // development instead of quietly showing one card fewer.
  if (import.meta.env.DEV && lead.length !== props.pinned.length) {
    const missing = props.pinned.filter(url => !byUrl.has(url))
    console.warn(`RelatedPosts: no post found for ${missing.join(', ')}`)
  }

  const rest = posts.filter(post => {
    const tags = post.frontmatter.tags || []
    if (lead.includes(post) || !tags.includes(props.tag)) return false
    return !(props.not && tags.includes(props.not))
  })
  return [...lead, ...rest].slice(0, props.limit)
})
</script>

<template>
  <div class="blog-grid">
    <a v-for="post in related" :key="post.url" :href="post.url" class="blog-card">
      <span v-if="post.frontmatter.tags" class="ms-kicker">{{ post.frontmatter.tags.slice(0, 2).join(' / ') }}</span>
      <h3>{{ post.frontmatter.title }}</h3>
      <p class="description">{{ post.frontmatter.description }}</p>
      <time class="date" :datetime="isoPostDate(post.frontmatter.date)">{{ formatPostDate(post.frontmatter.date) }}</time>
    </a>
  </div>
</template>
