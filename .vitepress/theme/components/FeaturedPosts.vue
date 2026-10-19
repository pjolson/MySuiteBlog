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
    title: 'NetSuite Month-End Close: Where It Actually Breaks',
    url: '/blog/netsuite-month-end-close',
    tags: ['Admin', 'Advisory']
  },
  {
    title: 'The Signs a Client Has Outgrown QuickBooks',
    url: '/blog/outgrown-quickbooks',
    tags: ['Advisory', 'Implementation']
  },
  {
    title: 'QuickBooks to NetSuite Migration: What It Takes',
    url: '/blog/quickbooks-to-netsuite-migration',
    tags: ['Implementation', 'Advisory']
  },
  {
    title: 'Four Ways NetSuite Books Quietly Go Wrong',
    url: '/blog/netsuite-books-go-wrong',
    tags: ['Advisory', 'Compliance']
  }
]
</script>
