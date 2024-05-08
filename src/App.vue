<template>
  <div class="home">
    {{ name }}
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const name = ref('Home')
</script>

<style scoped>
  .home {
    color: red;
  }
</style>
