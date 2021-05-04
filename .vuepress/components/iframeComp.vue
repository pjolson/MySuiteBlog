<template>
    <iframe width="600" height="600" :src="ihtml"></iframe>
</template>

<script>
  export default {
      props: {
          ihtml: {
              type: String
          }
      }
  }
</script>