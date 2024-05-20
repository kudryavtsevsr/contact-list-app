<template>
  <RouterLink :to="{name: RouteName.ContactEditor, params: {id: user.id}}"
                  class="user">
        <div class="avatar-wrapper">
          <uiAvatar :src="user.image" />
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
            <uiCopyText>
              {{ user.email }}
            </uiCopyText>
          </div>
          <span class="mobile-hidden desktop-hidden">|</span>
          <div class="phone">
            <uiCopyText>
              {{ getDisplayPhone(user.phoneCountryPrefix, user.phoneNumber) }}
            </uiCopyText>
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
        <button class="delete" @click="deleteUserHandler($event, user.id, user.address)">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </RouterLink>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {RouteName} from '@/services/router';
import {uiButton} from '@/ui/Button';
import {uiCopyText} from '@/ui/CopyText';
import {uiAvatar} from '@/ui/Avatar';
import {useUsersStore} from '../store';
import {User} from '../types';
import {useAddressesStore} from '@/modules/Addresses';

const props = defineProps<{
  user: User
}>()

const router = useRouter();

const usersStore = useUsersStore();
const {deleteUser, getUserTeam} = usersStore;

const addressesStore = useAddressesStore();
const {deleteAddress} = addressesStore;

function getDisplayPhone(phoneCountryPrefix, phoneNumber) {
  return phoneCountryPrefix && phoneNumber ? `${phoneCountryPrefix} ${phoneNumber}` : '';
}

function deleteUserHandler(e, userId: string, addressId: string) {
  e.preventDefault();
  deleteUser(userId);
  deleteAddress(addressId);
}
</script>

<style scoped lang="scss">
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
  grid-area: avatar;
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
</style>
