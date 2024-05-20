<template>
  <div class="team">
    <div class="team-color" :style="{backgroundColor: team.color}"></div>
    <div class="team-name">{{ team.name }}</div>
    <span class="material-symbols-outlined team-edit">border_color</span>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {uiButton} from '@/ui/Button'
import {useTeamsStore} from '../store';
import {Team} from '../types';

const props = defineProps<{
  team: Team
}>()

const store = useTeamsStore();
const {teams} = storeToRefs(store);
</script>

<style scoped lang="scss">
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
</style>
