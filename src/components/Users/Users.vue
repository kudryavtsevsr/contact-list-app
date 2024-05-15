<template>
  <div class="users">
    <h2 class="h2">users</h2>
    <div class="users-list" v-if="hasUsers">
      <RouterLink :to="{name: RouteName.ContactEditor, params: {id: user.id}}"
                  class="user"
                  v-for="user in users"
                  :key="user.id">
        <img :src="user.image" alt="avatar" class="user-avatar">
        <div class="user-name">
          <div class="user-name-display">{{ user.fullName }}</div>
          <div class="user-name-full">{{ user.displayName }}</div>
        </div>
        <div class="user-function">
          {{ user.functionName }}
        </div>
        <div class="user-email">
          {{ user.email }}
        </div>
        <div class="user-phone">
          {{ getDisplayPhone(user.phoneCountryPrefix, user.phoneNumber) }}
        </div>
        <div class="user-teams">
          <div :style="{backgroundColor: getUserTeam(teamId).color}" class="user-team" v-for="teamId in user.teamIds">
            {{ getUserTeam(teamId).abbreviation }}
          </div>
        </div>
        <button class="user-delete" @click="deleteUser($event, user.id)">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </RouterLink>
    </div>
    <ui-button class="user-add">
      <template #icon-left>
        <span class="material-symbols-outlined team-add-icon">add</span>
      </template>
      New User
    </ui-button>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useTeamsStore} from '../Teams';
import {storeToRefs} from 'pinia';
import {useUsersStore} from './store';
import {RouteName} from '@/services/router';
import {uiButton} from '@/components/ui/Button'

const teamsStore = useTeamsStore()
const {teams} = storeToRefs(teamsStore);

const usersStore = useUsersStore()
const {users} = storeToRefs(usersStore);

const hasUsers = computed(() => {
  return users.value.length !== 0
})

function getDisplayPhone(phoneCountryPrefix, phoneNumber) {
  return `${phoneCountryPrefix} ${phoneNumber}`
}

function getUserTeam(teamId) {
  return teams.value.find(team => team.id === teamId)
}

function deleteUser(e, userId) {
  e.preventDefault()
  users.value.splice(0, users.value.length, ...users.value.filter(user => user.id !== userId))
}
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

.user-avatar {
  border-radius: 50%;
  border: 1px solid #17171D;
}

.user-name {
}

.user-name-display {
  font-weight: 500;
  margin-bottom: 4px;
}

.user-name-full {
}

.user-function {
}

.user-email {
}

.user-phone {
}

.user-teams {
  margin-left: auto;
  display: flex;
}

.user-team {
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

.user-delete {
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 8px;
}

.user-add {
  margin-top: 30px;
}
</style>
