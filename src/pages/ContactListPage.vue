<template>
  <div>
    Contact list page
    <ul>
      <li>
        <RouterLink :to="{name: RouteName.ContactEditor, params: {id: 1}}">User 1</RouterLink>
      </li>
      <li>
        <RouterLink :to="{name: RouteName.ContactEditor, params: {id: 2}}">User 2</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {RouteName} from '@/services/router'
</script>
