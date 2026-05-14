<script setup>
import { data as posts } from '../../../blog/posts.data.mjs'
import { computed } from 'vue'

const tags = computed(() => {
  const map = {}
  for (const post of posts) {
    const postTags = post.frontmatter.tags || []
    for (const tag of postTags) {
      if (!map[tag]) map[tag] = []
      map[tag].push(post)
    }
  }
  return Object.keys(map).sort().reduce((obj, key) => {
    obj[key] = map[key]
    return obj
  }, {})
})
</script>

<template>
  <div class="tag-list">
    <div v-for="(tagPosts, tag) in tags" :key="tag" class="tag-section">
      <h2 :id="tag">{{ tag }}</h2>
      <ul>
        <li v-for="post in tagPosts" :key="post.url">
          <a :href="post.url">{{ post.frontmatter.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
