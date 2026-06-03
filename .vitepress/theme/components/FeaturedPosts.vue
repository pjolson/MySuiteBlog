<template>
  <ul class="featured-list">
    <li v-for="post in posts" :key="post.url">
      <a :href="post.url">{{ post.title }}</a>
    </li>
  </ul>
</template>

<script setup>
const posts = [
  {
    title: 'Why You Need an Internal NetSuite Expert on Your Implementation Team',
    url: '/blog/netsuite-implementation-resource'
  },
  {
    title: 'What to Look for in Your NetSuite SOW Before You Sign It',
    url: '/blog/netsuite-sow-before-you-sign'
  },
  {
    title: 'Your NetSuite Implementation Partner Works for You. Act Like It.',
    url: '/blog/managing-your-implementation-partner'
  },
  {
    title: 'The Post-Go-Live Cliff',
    url: '/blog/post-go-live-cliff'
  },
  {
    title: 'Data Migration Is a Discipline, Not a Weekend Task',
    url: '/blog/netsuite-data-migration'
  }
]
</script>
