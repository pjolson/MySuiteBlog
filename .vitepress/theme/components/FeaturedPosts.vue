<template>
  <div class="featured-grid">
    <a v-for="post in posts" :key="post.url" :href="post.url" class="featured-card">
      <h3>{{ post.title }}</h3>
      <div class="featured-tags">
        <span v-for="tag in post.tags" :key="tag" class="tag-badge">{{ tag }}</span>
      </div>
    </a>
  </div>
</template>

<script setup>
const posts = [
  {
    title: 'Is Your NetSuite Implementation Going Sideways? 7 Warning Signs',
    url: '/blog/netsuite-implementation-warning-signs',
    tags: ['Implementation', 'Advisory']
  },
  {
    title: 'Why You Need an Internal NetSuite Expert on Your Implementation Team',
    url: '/blog/netsuite-implementation-resource',
    tags: ['Implementation', 'Advisory']
  },
  {
    title: 'What to Look for in Your NetSuite SOW Before You Sign It',
    url: '/blog/netsuite-sow-before-you-sign',
    tags: ['Implementation', 'Advisory']
  },
  {
    title: 'Your NetSuite Implementation Partner Works for You. Act Like It.',
    url: '/blog/managing-your-implementation-partner',
    tags: ['Implementation', 'Advisory']
  },
  {
    title: 'The Post-Go-Live Cliff',
    url: '/blog/post-go-live-cliff',
    tags: ['Implementation', 'Advisory']
  }
]
</script>
