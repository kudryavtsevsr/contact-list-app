<template>
  <FormKit
    v-if="type === ButtonType.submit"
    type="submit"
    :classes="{
      input: {'ui-button': true, 'ui-button_block': true, [`ui-button_${view}`]: view}
    }"
  >
    <span class="ui-button__text">
      <slot/>
    </span>
  </FormKit>
  <button v-else :class="['ui-button', {[`ui-button_${view}`]: view}]" :type="ButtonType.button">
    <slot name="icon-left"/>
    <span v-if="slots.default" class="ui-button__text">
      <slot/>
    </span>
    <slot name="icon-right"/>
  </button>
</template>

<script setup lang="ts">
import {useSlots} from 'vue';
import {ButtonType, ButtonView} from './types';

const slots = useSlots()

const props = defineProps<{
  view?: ButtonView,
  type?: ButtonType
}>();
</script>

<style lang="scss">
.ui-button {
  $root: &;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &_primary {
    padding: 13px;
    background-color: $color-background-main-primary-invert;
    color: $color-text-main-primary-invert;
    border: 1px solid $color-border-main-quaternary;
    border-radius: 30px;

    &:focus {
      outline: 1px solid darken($color-border-main-quaternary, 2);
    }
  }

  &_secondary {
    padding: 13px;
    background-color: $color-text-main-primary-invert;
    color: $color-text-main-primary;
    border: 1px solid $color-border-main-quaternary;
    border-radius: 30px;

    &:focus {
      outline: 1px solid darken($color-border-main-quaternary, 2);
    }
  }

  &_ghost {
    background-color: transparent;
    border: none;
    color: $color-text-main-primary;

    #{$root}__text {
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }

  &_block {
    width: 100%;
  }

  &__text {
    font-family: $font-space-grotesk;
    font-size: rem(14);
  }

  &__icon {
    margin-top: 2px;
    font-size: rem(19);
  }
}
</style>
