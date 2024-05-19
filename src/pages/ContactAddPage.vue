<template>
  <div class="contact-add-page">
    <Suspense>
      <UsersEditor add />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import {UsersEditor} from '@/modules/UsersEditor'
</script>

<style scoped lang="scss">
.contact-add-page {
  padding: 64px 48px 30px;
}
</style>
