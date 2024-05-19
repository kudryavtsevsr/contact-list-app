<template>
  <FormKit
    type="form"
    class="contact-editor"
    :classes="{
        messages: 'contact-editor__messages'
      }"
    :actions="false"
    @submit="submitHandler"
  >
    <div class="editor">
      <div class="avatar-wrapper">
        <img v-if="user.image" :src="user.image" class="avatar" alt="avatar">
      </div>
      <div class="form">
        <div class="form-row">
          <ui-input name="fullName" label="Full name" v-model="user.fullName" required validation="required"/>
          <ui-input name="initials" label="Initials" v-model="user.initials" validation="length:2,2|uppercase"/>
        </div>
        <ui-input name="displayName" label="Display name" v-model="user.displayName"/>
        <ui-input name="functionName" label="Role" v-model="user.functionName"/>
        <div class="form-row">
          <ui-input name="email" label="Email" v-model="user.email" required validation="required|email"/>
          <ui-input-phone v-model:phone-prefix="user.phoneCountryPrefix" v-model:phone-number="user.phoneNumber" />
        </div>

        <div class="form-group">
          <ui-input name="addressLineOne" label="Street" v-model="address.addressLineOne"/>
          <ui-input name="addressLineTwo" label="" v-model="address.addressLineTwo"/>
        </div>
        <div class="form-row">
          <ui-input name="city" label="City" v-model="address.city"/>
          <ui-input name="postalCode" label="Postal code" v-model="address.postalCode"/>
        </div>
        <ui-input name="country" label="Country" v-model="address.country"/>
      </div>

    </div>
    <div class="buttons">
      <ui-button view="secondary" @click="router.back()">
        Cancel
      </ui-button>
      <ui-button view="primary" type="submit">
        Save changes
      </ui-button>
    </div>
    <FormKitMessages />
  </FormKit>
</template>

<script setup lang="ts">
import {ref, watch, computed} from 'vue';
import {storeToRefs} from 'pinia';
import {useRoute, useRouter} from 'vue-router';
import { FormKitMessages } from '@formkit/vue'
import {useUsersStore} from '@/modules/Users';
import {uiInput} from '@/ui/Input';
import {uiInputPhone} from '@/ui/InputPhone';
import {uiButton} from '@/ui/Button';
import {useAddressesStore} from '../Addresses';
import {RouteName} from '../../services/router';

const props = defineProps<{
  add?: false
}>();

const route = useRoute();
const userId = String(route.params.id);

const router = useRouter();

const usersStore = useUsersStore();
const {user} = storeToRefs(usersStore);
const {fetchUser, editUser, createUser, clearUser} = usersStore;

const addressesStore = useAddressesStore();
const {address} = storeToRefs(addressesStore);
const {fetchAddress, editAddress, createAddress, clearAddress} = addressesStore;

const addressId = computed<number>(() => {
  const address = user.value?.address;
  return address ? String(address) : address;
});

async function submitHandler() {
  if (props.add) {
    user.value.address = await createAddress();
    await createUser();
    alert('User successfully created!');
  } else {
    await Promise.all([
      editUser(userId),
      editAddress(addressId.value)
    ]);
    alert('User successfully edited!');
  }

  router.push({name: RouteName.ContactList});
}

clearUser();
clearAddress();
if (!props.add) {
  await fetchUser(userId);
  await fetchAddress(addressId.value);
}
</script>

<style scoped lang="scss">
.editor {
  padding: 48px;
  display: grid;
  grid-template-columns: 184px 1fr;
}

.avatar-wrapper {
  margin: 0 auto;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 1px solid #17171D;
  overflow: hidden;
}

.avatar {
  width: 100%;
}

.form {
  display: grid;
  gap: 32px;
}

.form-row {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
}

.form-group {
  display: grid;
  gap: 8px;
}

.buttons {
  display: grid;
  justify-content: end;
  grid-template-columns: 177px 177px;
  grid-gap: 16px;
}
</style>

<style lang="scss">
.contact-editor__messages {
  text-align: right;
  margin-top: 10px;
}
</style>
