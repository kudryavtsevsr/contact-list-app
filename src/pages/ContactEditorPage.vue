<template>
  <div class="contact-editor-page">
    <Suspense>
      <UsersEditor />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import {UsersEditor} from '@/modules/UsersEditor'
import {useLayoutStore} from '../layouts/store';

const layoutStore = useLayoutStore()
const {setLayoutSettings} = layoutStore

setLayoutSettings('Edit user')
</script>

<style scoped lang="scss">
.contact-editor-page {
}
</style>
