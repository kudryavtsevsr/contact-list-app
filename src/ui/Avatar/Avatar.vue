<template>
  <div class="ui-avatar">
    <img v-if="src" :src="src" class="avatar" alt="avatar">
    <uiButton v-if="editable" view="ghost">
      <template #icon-left>
        <span class="material-symbols-outlined avatar-edit">border_color</span>
      </template>
    </uiButton>
  </div>
</template>

<script setup lang="ts">
import {uiButton} from '@/ui/Button';

const props = defineProps<{
  src: string,
  editable?: boolean
}>()
</script>

<style scoped lang="scss">
.ui-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid $color-text-main-primary;
  position: relative;
}

.avatar {
  width: 100%;
  border-radius: 50%;
}

.avatar-edit {
  padding: 11px;
  font-size: rem(16);
  background-color: $color-text-main-primary-invert;
  border-radius: 50px;
  border: 1px solid $color-text-main-primary;
  position: absolute;
  bottom: 0;
  right: -20px;
}
</style>
