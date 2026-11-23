<template>
  <div class="featured-grid">
    <a v-for="post in posts" :key="post.url" :href="post.url" class="featured-card">
      <span class="ms-kicker">{{ post.tags.join(' / ') }}</span>
      <h3>{{ post.title }}</h3>
    </a>
  </div>
</template>

<script setup>
const posts = [
  {
    title: 'Claude for Manufacturing and NetSuite: What It Reads and Writes',
    url: '/blog/claude-for-manufacturing-netsuite',
    tags: ['Advisory', 'Manufacturing']
  },
  {
    title: 'Claude and NetSuite: Four Roles, Four Answers',
    url: '/blog/claude-netsuite-role-test',
    tags: ['Admin', 'Manufacturing']
  },
  {
    title: 'What a NetSuite Administrator Actually Costs',
    url: '/blog/netsuite-administrator-cost',
    tags: ['Admin', 'Advisory']
  },
  {
    title: 'What a Client-Side Resource Does on a NetSuite Implementation',
    url: '/blog/netsuite-client-side-resource',
    tags: ['Implementation', 'Advisory']
  },
  {
    title: 'QuickBooks to NetSuite Migration: What It Takes',
    url: '/blog/quickbooks-to-netsuite-migration',
    tags: ['Implementation', 'Advisory']
  },
  {
    title: 'NetSuite AI Units: What Finance Needs to Know',
    url: '/blog/netsuite-ai-units',
    tags: ['Advisory', 'Admin']
  }
]
</script>
