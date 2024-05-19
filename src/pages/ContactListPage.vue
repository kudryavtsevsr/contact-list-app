<template>
  <div class="contact-list-page">
    <h1 class="h1 title">Venue People</h1>

    <Teams class="teams" />

    <Users />
  </div>
</template>

<script setup lang="ts">
import {Teams} from '@/modules/Teams'
import {Users} from '@/modules/Users'
import {useLayoutStore} from '../layouts/store';

const layoutStore = useLayoutStore()
const {setLayoutSettings} = layoutStore

setLayoutSettings('Venue People', true, false)
</script>

<style scoped lang="scss">
.contact-list-page {
  padding: 36px 48px;

  @include tablet {
    padding: 96px 32px 36px;
  }

  @include mobile {
    padding: 80px 0 36px;
  }
}

.title {
  @include tablet {
    display: none;
  }
}

.teams {
  margin-bottom: rem(60);
}
</style>
