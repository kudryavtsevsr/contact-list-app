import {defineStore} from 'pinia';
import {reactive} from 'vue';
import {User} from './types';
import {usersMock} from './mocks';

export const useUsersStore = defineStore('users', () => {
  const users = reactive<User[]>(usersMock);

  return {
    users
  }
})
