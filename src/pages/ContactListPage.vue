<template>
  <div class="contact-list-page">
    <h1 class="h1">Venue People</h1>

    <Teams />

    <Users />
  </div>
</template>

<script setup lang="ts">
import {Teams} from '@/components/Teams'
import {Users} from '@/components/Users'
</script>

<style scoped lang="scss">
.contact-list-page {
  padding: 36px 48px;
}
</style>
