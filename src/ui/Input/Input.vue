<template>
  <FormKit
    :classes="{
        outer: 'ui-input',
        wrapper: '',
        label: 'ui-input__label',
        inner: '',
        input: 'ui-input__input',
        messages: 'ui-input__messages',
        message: 'ui-input__message'
      }"
    :label="labelForDisplay"
    :validation-label="label"
    ref="formKitElement"
    type="text"
  >
    <template v-for="(index, name) in $slots" #[name]>
      <slot :name="name"/>
    </template>
  </FormKit>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue';

const props = defineProps<{
  label?: string,
  required?: boolean
}>();

const emit = defineEmits(['refChanged'])

const formKitElement = ref(null)

const labelForDisplay = computed(() => {
  return `${props.label}${props.required ? ' *' : ''}`;
});

watch(formKitElement, (value) => {
  emit('refChanged', value)
})
</script>

<style lang="scss">
.ui-input {
  display: block;

  &__label {
    font-family: $font-space-grotesk;
    font-size: rem(14);
    font-weight: 300;
    color: $color-text-main-secondary;
    display: block;
    margin-bottom: 4px;
  }

  &__input {
    width: 100%;
    font-family: $font-space-grotesk;
    font-size: rem(16);
    font-weight: 300;
    color: $color-text-main-primary;
    padding: rem(23) rem(16);
    display: block;
    border: 1px solid $color-border-main-quaternary;
    background-color: rgba($color-text-main-primary-invert, 0.04);
    border-radius: 4px;

    &:focus {
      outline: 1px solid darken($color-border-main-quaternary, 2);
    }
  }

  &__messages {
    margin-top: 4px;
  }

  &__message {
  }
}
</style>
