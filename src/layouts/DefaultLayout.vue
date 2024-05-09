<template>
  <div class="default-layout">
    <nav class="default-layout__navigation">
      <RouterLink class="default-layout__navigation-link" :to="{name: RouteName.Home}">Home</RouterLink>
      <RouterLink class="default-layout__navigation-link" :to="{name: RouteName.ContactList}">Contact list</RouterLink>
    </nav>
    <slot/>
  </div>
</template>

<script setup lang="ts">
import {RouteName} from '@/services/router'
</script>

<style scoped lang="scss">
  .default-layout {
    &__navigation {
      display: flex;
      gap: 10px;
    }
    &__navigation-link {

    }
  }
</style>
