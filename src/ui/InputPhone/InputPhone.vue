<template>
  <uiInput
    name="phoneNumber"
    label="Phone number"
    inner-class="ui-input-phone__inner"
    validation="number|length:9,9"
    v-model="phoneNumber"
    @refChanged="refChangedHandler1"
  >
    <template #prefix>
      <uiInput
        name="phoneCode"
        label=""
        placeholder="+"
        validation="starts_with:+|length:3,3|number"
        v-model="phonePrefix"
        @refChanged="refChangedHandler2"
      />
    </template>
    <template #messages>
      <FormKitMessages :node="formKitCodeElement?.node" />
      <FormKitMessages :node="formKitNumberElement?.node" />
    </template>
  </uiInput>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { FormKitMessages } from '@formkit/vue'
import {uiInput} from '@/ui/Input';

const formKitNumberElement = ref(null)
const formKitCodeElement = ref(null)

const phonePrefix = defineModel('phonePrefix')
const phoneNumber = defineModel('phoneNumber')

function refChangedHandler1(value) {
  formKitNumberElement.value = value
}

function refChangedHandler2(value) {
  formKitCodeElement.value = value
}
</script>

<style lang="scss">
.ui-input-phone {
  &__inner {
    display: grid;
    grid-template-columns: 80px 1fr;
  }
}
</style>
