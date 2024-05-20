<template>
  <div class="users">
    <h2 class="h3">users</h2>
    <div class="users-list" v-if="hasUsers">
      <User v-for="user in users" :user="user" :key="user.id" />
    </div>
    <uiButton class="add" view="ghost" @click="router.push({name: RouteName.ContactAdd})">
      <template #icon-left>
        <span class="material-symbols-outlined team-add-icon">add</span>
      </template>
      New User
    </uiButton>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useRouter} from 'vue-router';
import {RouteName} from '@/services/router';
import {uiButton} from '@/ui/Button';
import {useUsersStore} from '../store';
import User from './User.vue'

const router = useRouter();

const usersStore = useUsersStore();
const {users, hasUsers} = storeToRefs(usersStore);
const {fetchUsers, deleteUser, getUserTeam} = usersStore;

function getDisplayPhone(phoneCountryPrefix, phoneNumber) {
  return phoneCountryPrefix && phoneNumber ? `${phoneCountryPrefix} ${phoneNumber}` : '';
}

function deleteUserHandler(e, id: string) {
  e.preventDefault();
  deleteUser(id);
}

fetchUsers();
</script>

<style scoped lang="scss">
.users {

}

.users-list {
  border-radius: 20px;
  border: 1px solid $color-border-main-quaternary;

  @include mobile {
    border-radius: 0;
  }
}

.add {
  margin-top: 26px;

  @include mobile {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
