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
    title: 'What a Client-Side Resource Does on a NetSuite Implementation',
    url: '/blog/netsuite-client-side-resource',
    tags: ['Implementation', 'Advisory']
  },
  {
    title: 'Why NetSuite Implementation Partners Should Want a Client-Side Resource',
    url: '/blog/netsuite-partner-client-side-resource',
    tags: ['Implementation', 'Partners']
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
    title: 'Managing NetSuite Bill Capture Email Notifications and Sender Restrictions',
    url: '/blog/netsuite-bill-capture-email-relay',
    tags: ['Admin', 'Bill Capture']
  },
  {
    title: 'The Post-Go-Live Cliff',
    url: '/blog/post-go-live-cliff',
    tags: ['Implementation', 'Advisory']
  }
]
</script>
