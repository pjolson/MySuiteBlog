<script setup>
// Wraps the default VitePress layout so the site gets a consulting-style
// header and footer without forking the theme: a contact button in the nav
// bar (and in the mobile menu) and a full footer in place of VPFooter.
import DefaultTheme from 'vitepress/theme'
import SiteFooter from './components/SiteFooter.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <a class="ms-nav-cta" href="/contact/">Contact</a>
    </template>
    <template #nav-screen-content-after>
      <a class="ms-nav-screen-cta" href="/contact/">Discuss your NetSuite needs</a>
    </template>
    <template #layout-bottom>
      <SiteFooter />
    </template>
  </Layout>
</template>
