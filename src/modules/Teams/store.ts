import {defineStore} from 'pinia';
import {reactive} from 'vue';
import {Team} from './types';
import {teamsMock} from './mocks';

export const useTeamsStore = defineStore('teams', () => {
  const teams = reactive<Team[]>(teamsMock);

  return {
    teams
  }
})
