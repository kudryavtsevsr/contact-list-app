<template>
  <div class="teams">
    <h2 class="h3">Teams</h2>
    <div class="teams-list">
      <Team v-for="team in teams" :team="team" :key="team.id" />
    </div>
    <uiButton class="team-add" view="ghost">
      <template #icon-left>
        <span class="material-symbols-outlined team-add-icon">add</span>
      </template>
      New Team
    </uiButton>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {uiButton} from '@/ui/Button'
import {useTeamsStore} from '../store';
import Team from './Team.vue'

const store = useTeamsStore();
const {teams} = storeToRefs(store);
</script>

<style scoped lang="scss">
.teams {
  @include mobile {
    padding: 0 16px;
  }
}

.h3 {
  @include mobile {
    padding-left: 0;
  }
}

.teams-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.team {
  display: flex;
  width: 304px;
  height: rem(80);
  background-color: $color-text-main-primary-invert;
  padding: 16px;
  align-items: center;
  border-radius: 4px;

  @include mobile {
    width: 100%;
  }
}

.team-color {
  border-radius: 50%;
  width: rem(44);
  height: rem(44);
}

.team-name {
  font-family: $font-space-grotesk;
  font-size: rem(16);
  margin-left: 16px;
  color: $color-text-main-primary;
}

.team-edit {
  margin-left: auto;
  padding: 10px;
  font-size: rem(20);
}

.team-add {
  margin-top: 26px;

  @include mobile {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
