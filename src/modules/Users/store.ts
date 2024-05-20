import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import {storeToRefs} from 'pinia';
import axios from '@/services/api';
import {User} from './types';
import {useTeamsStore} from '@/modules/Teams';

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);
  const user = ref<User>({});

  const teamsStore = useTeamsStore()
  const {teams} = storeToRefs(teamsStore);

  const hasUsers = computed(() => {
    return users.value.length !== 0
  })

  async function fetchUsers() {
    try {
      const { data } = await axios.get<User[]>('users')
      users.value = data
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchUser(id: string) {
    try {
      const { data } = await axios.get<User[]>(`users/${id}`)
      user.value = data
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteUser(id: string) {
    try {
      await axios.delete(`users/${id}`)
    } catch (e) {
      console.error(e);
    }

    users.value = users.value.filter(user => user.id !== id)
  }

  async function createUser() {
    try {
      await axios.post(`users`, user.value)
    } catch (e) {
      console.error(e);
    }
  }

  async function editUser(id: string) {
    try {
      await axios.put(`users/${id}`, user.value)
    } catch (e) {
      console.error(e);
    }
  }

  function getUserTeam(id: string) {
    return teams.value.find(team => team.id === id)
  }

  function clearUser() {
    user.value = {}
  }

  return {
    users,
    user,
    hasUsers,
    fetchUsers,
    fetchUser,
    deleteUser,
    editUser,
    createUser,
    getUserTeam,
    clearUser
  }
})
