<script setup>
import { data as posts } from '../../../blog/posts.data.mjs'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div class="blog-index">
    <div v-for="post in posts" :key="post.url" class="blog-post-item">
      <h2><a :href="post.url">{{ post.frontmatter.title }}</a></h2>
      <div class="date">{{ formatDate(post.frontmatter.date) }}</div>
      <p class="description">{{ post.frontmatter.description }}</p>
      <a :href="post.url" class="read-more">Read more &rarr;</a>
    </div>
  </div>
</template>
