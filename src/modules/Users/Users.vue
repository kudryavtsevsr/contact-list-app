<template>
  <div class="users">
    <h2 class="h2">users</h2>
    <div class="users-list" v-if="hasUsers">
      <RouterLink :to="{name: RouteName.ContactEditor, params: {id: user.id}}"
                  class="user"
                  v-for="user in users"
                  :key="user.id">
        <div class="avatar-wrapper">
          <img v-if="user.image" :src="user.image" alt="avatar" class="avatar">
        </div>
        <div class="name">
          <div class="name-display">{{ user.fullName }}</div>
          <div class="name-full">{{ user.displayName }}</div>
        </div>
        <div class="function">
          {{ user.functionName }}
        </div>
        <div class="email">
          <ui-copy-text>
            {{ user.email }}
          </ui-copy-text>
        </div>
        <div class="phone">
          <ui-copy-text>
            {{ getDisplayPhone(user.phoneCountryPrefix, user.phoneNumber) }}
          </ui-copy-text>
        </div>
        <div class="teams">
          <div
            class="team"
            v-for="teamId in user.teamIds"
            :style="{backgroundColor: getUserTeam(String(teamId)).color}"
            :key="teamId">
            {{ getUserTeam(String(teamId)).abbreviation }}
          </div>
        </div>
        <button class="delete" @click="deleteUserHandler($event, user.id)">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </RouterLink>
    </div>
    <ui-button class="add" view="ghost" @click="router.push({name: RouteName.ContactAdd})">
      <template #icon-left>
        <span class="material-symbols-outlined team-add-icon">add</span>
      </template>
      New User
    </ui-button>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useRouter} from 'vue-router';
import {useUsersStore} from './store';
import {RouteName} from '@/services/router';
import {uiButton} from '@/ui/Button';
import {uiCopyText} from '@/ui/CopyText';

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

console.log('User component created');
fetchUsers();
</script>

<style scoped lang="scss">
.users {

}

.users-list {
  border-radius: 20px;
  border: 1px solid #D2D2D2;
}

.user {
  display: grid;
  grid-template-columns: 32px 175px 265px 265px 235px 1fr 60px;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 80px;
  font-family: $font-space-grotesk;
  font-size: 14px;
  font-weight: 300;
  color: #17171D;
  text-decoration: none;
  gap: 8px;

  &:not(:last-child) {
    border-bottom: 1px solid #D2D2D2;
  }
}

.avatar-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #17171D;
  overflow: hidden;
}

.avatar {
  width: 100%;
}

.name {
}

.name-display {
  font-weight: 500;
  margin-bottom: 4px;
}

.name-full {
}

.function {
}

.email {
}

.phone {
}

.teams {
  margin-left: auto;
  display: flex;
}

.team {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #17171D;
  border-radius: 50%;

  &:not(:first-child) {
    margin-left: -5px;
  }
}

.delete {
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 8px;
}

.add {
  margin-top: 30px;
}
</style>
