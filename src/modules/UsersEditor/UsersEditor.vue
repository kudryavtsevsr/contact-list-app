<template>
  <FormKit
    type="form"
    :classes="{
        form: 'contact-editor',
        messages: 'contact-editor__messages'
      }"
    :actions="false"
    @submit="submitHandler"
  >
    <div class="editor">
      <div class="avatar-wrapper">
        <img v-if="user.image" :src="user.image" class="avatar" alt="avatar">
        <ui-button view="ghost">
          <template #icon-left>
            <span class="material-symbols-outlined avatar-edit">border_color</span>
          </template>
        </ui-button>
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
        <FormKitMessages />
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
.contact-editor {
  padding: 64px 48px 30px 40px;

  @include tablet {
    padding: 0;
  }
}

.editor {
  padding: 48px 48px 90px 0;
  display: grid;
  grid-template-columns: 184px 1fr;

  @include tablet {
    padding: 64px 32px;
    grid-template-columns: 88px 1fr;
    gap: 32px;
  }

  @include mobile {
    padding: 32px 16px;
    grid-template-columns: 1fr;
  }
}

.avatar-wrapper {
  margin: 0 auto;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 1px solid $color-text-main-primary;
  position: relative;

  @include tablet-only {
    margin: 0;
  }
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

  @include tablet {
    background-color: $color-text-main-primary-invert;
    grid-template-columns: 1fr 1fr;
    padding: 40px 32px;
    border-top: 1px solid $color-border-main-quaternary;
    position:sticky;
    bottom:0;
  }

  @include mobile {
    padding: 16px;
    background: linear-gradient(to top, $color-border-main-quaternary 0, $color-background-main-primary 100%);
  }
}
</style>

<style lang="scss">
.contact-editor__messages {
  text-align: right;
}
</style>
