<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://js-eu1.hsforms.net/forms/embed/147146964.js'
  script.defer = true
  document.head.appendChild(script)
})
</script>

<template>
  <div class="hs-form-frame" data-region="eu1" data-form-id="4e254ef3-4140-4029-8d51-804ec7dbb62d" data-portal-id="147146964"></div>
</template>
