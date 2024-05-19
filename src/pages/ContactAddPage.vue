<template>
  <div class="contact-add-page">
    <Suspense>
      <UsersEditor add />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import {UsersEditor} from '@/modules/UsersEditor'
import {useLayoutStore} from '../layouts/store';

const layoutStore = useLayoutStore()
const {setLayoutSettings} = layoutStore

setLayoutSettings('Add user')
</script>

<style scoped lang="scss">
.contact-add-page {
}
</style>
