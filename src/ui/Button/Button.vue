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
    <span class="ui-button__text">
      <slot/>
    </span>
    <slot name="icon-right"/>
  </button>
</template>

<script setup lang="ts">
import {ButtonType, ButtonView} from './types';

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
    background-color: #282829;
    color: #EFEFEF;
    border: 1px solid #D2D2D2;
    border-radius: 30px;

    &:focus {
      outline: 1px solid darken(#D2D2D2, 2);
    }
  }

  &_secondary {
    padding: 13px;
    background-color: #EFEFEF;
    color: #17171D;
    border: 1px solid #D2D2D2;
    border-radius: 30px;

    &:focus {
      outline: 1px solid darken(#D2D2D2, 2);
    }
  }

  &_ghost {
    background-color: transparent;
    border: none;
    color: #17171D;

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
    font-size: 14px;
  }

  &__icon {
    margin-top: 2px;
    font-size: 19px;
  }
}
</style>
