<template>
  <button class="button">
    <slot name="icon-left" />
    <span class="text">
      <slot/>
    </span>
    <slot name="icon-right" />
  </button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.button {
  background-color: transparent;
  border: none;
  color: #17171D;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon {
  margin-top: 2px;
  font-size: 19px;
}

.text {
  font-family: $font-space-grotesk;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-size: 14px;
}
</style>
