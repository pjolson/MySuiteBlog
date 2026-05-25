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
  },
  {
    title: 'Real-Time Status Pages in NetSuite',
    url: '/blog/netsuite-realtime-status-page',
    tags: ['SuiteScript', 'Suitelet', 'MapReduce']
  },
  {
    title: 'Data Migration Is a Discipline, Not a Weekend Task',
    url: '/blog/netsuite-data-migration',
    tags: ['Implementation', 'Advisory']
  }
]
</script>
