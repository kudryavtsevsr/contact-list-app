<template>
  <div class="teams">
    <h2 class="h2">Teams</h2>
    <div class="teams-list">
      <div class="team" v-for="team in teams">
        <div class="team-color" :style="{backgroundColor: team.color}"></div>
        <div class="team-name">{{ team.name }}</div>
        <span class="material-symbols-outlined team-edit">border_color</span>
      </div>
    </div>
    <ui-button class="team-add">
      <template #icon-left>
        <span class="material-symbols-outlined team-add-icon">add</span>
      </template>
      New Team
    </ui-button>
  </div>
</template>

<script setup lang="ts">
import {useTeamsStore} from './store';
import {storeToRefs} from 'pinia';
import {uiButton} from '@/components/ui/Button'

const store = useTeamsStore();
const {teams} = storeToRefs(store);
</script>

<style scoped lang="scss">
.teams {
  margin-bottom: 64px;
}

.teams-list {
  display: flex;
  gap: 8px;
}

.team {
  display: flex;
  width: 304px;
  height: 80px;
  background-color: #EFEFEF;
  padding: 16px;
  align-items: center;
  border-radius: 4px;
}

.team-color {
  border-radius: 50%;
  width: 44px;
  height: 44px;
}

.team-name {
  font-family: $font-space-grotesk;
  font-size: 16px;
  margin-left: 16px;
  color: #17171D;
}

.team-edit {
  margin-left: auto;
  padding: 10px;
  font-size: 20px;
}

.team-add {
  margin-top: 30px;
}
</style>
