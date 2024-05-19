<template>
  <div class="copy-text" @click="copyToClipboard">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()

function copyToClipboard(e) {
  e.preventDefault();
  const textToCopy = slots.default()[0].children;
  if (!textToCopy) {
    console.warn('error when copying text')
  }
  navigator.clipboard.writeText(textToCopy);
  alert(`Text "${textToCopy}" copied to clipboard`)
}
</script>

<style scoped lang="scss">
.copy-text {
  overflow: inherit;
  text-overflow: inherit;
  cursor: copy;
}
</style>
