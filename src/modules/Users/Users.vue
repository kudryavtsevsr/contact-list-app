<template>
  <div class="users">
    <h2 class="h3">users</h2>
    <div class="users-list" v-if="hasUsers">
      <RouterLink :to="{name: RouteName.ContactEditor, params: {id: user.id}}"
                  class="user"
                  v-for="user in users"
                  :key="user.id">
        <div class="avatar-wrapper">
          <img v-if="user.image" :src="user.image" alt="avatar" class="avatar">
        </div>
        <div class="name-function">
          <div class="name">
            <div class="name-display">{{ user.fullName }}</div>
            <div class="name-full mobile-hidden tablet-hidden">{{ user.displayName }}</div>
          </div>
          <div class="function">
            {{ user.functionName }}
          </div>
        </div>
        <div class="email-phone">
          <div class="email mobile-hidden">
            <ui-copy-text>
              {{ user.email }}
            </ui-copy-text>
          </div>
          <span class="mobile-hidden desktop-hidden">|</span>
          <div class="phone">
            <ui-copy-text>
              {{ getDisplayPhone(user.phoneCountryPrefix, user.phoneNumber) }}
            </ui-copy-text>
          </div>
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
  border: 1px solid $color-border-main-quaternary;

  @include mobile {
    border-radius: 0;
  }
}

.user {
  display: grid;
  overflow: hidden;
  grid-template-columns: 32px minmax(160px, 430px) minmax(160px, 500px) 1fr 60px;
  grid-template-areas: "avatar name-function email-phone teams delete";
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: rem(80);
  font-family: $font-space-grotesk;
  font-size: rem(14);
  font-weight: 300;
  color: $color-text-main-primary;
  text-decoration: none;
  gap: 8px;

  &:not(:last-child) {
    border-bottom: 1px solid $color-border-main-quaternary;
  }

  @include tablet {
    grid-template-areas:
      "avatar name-function name-function teams delete"
      "avatar email-phone email-phone teams delete";
    padding: 0 4px 0 16px;
  }

  @include mobile {
    grid-template-columns: 32px 1fr 1fr 60px;
  }
}

.avatar-wrapper {
  width: rem(32);
  height: rem(32);
  border-radius: 50%;
  border: 1px solid $color-text-main-primary;
  overflow: hidden;
  grid-area: avatar;
}

.avatar {
  width: 100%;
}

.name {
  display: flex;
  gap: 4px;
  flex-direction: column;
}

.name-display {
  font-weight: 500;
}

.name-display,
.name-full,
.function,
.email,
.phone {
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 2.1em;
}

.teams {
  margin-left: auto;
  display: flex;
  grid-area: teams;
}

.team {
  width: rem(28);
  height: rem(28);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $color-text-main-primary;
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
  grid-area: delete;
}

.name-function {
  display: grid;
  align-items: center;
  grid-template-columns: minmax(80px, 175px) minmax(80px, 265px);
  grid-area: name-function;
  gap: 5px;

  @include tablet {
    display: flex;
    gap: 10px;
    align-self: end;
  }
}

.email-phone {
  display: grid;
  align-items: center;
  grid-template-columns: minmax(80px, 265px) minmax(80px, 235px);
  grid-area: email-phone;
  gap: 5px;

  @include tablet {
    display: flex;
    gap: 4px;
    align-self: start;
    color: $color-text-main-secondary;
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
