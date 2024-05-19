<template>
  Home page
</template>

<script setup lang="ts">
  import {useRouter} from 'vue-router';
  import {RouteName} from '../services/router';

  const router = useRouter();

  router.push({name: RouteName.ContactList})
</script>
