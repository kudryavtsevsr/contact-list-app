import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import {storeToRefs} from 'pinia';
import axios from 'axios';
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
      const { data } = await axios.get<User[]>('//localhost:5002/users')
      users.value = data
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchUser(id: string) {
    try {
      const { data } = await axios.get<User[]>(`//localhost:5002/users/${id}`)
      user.value = data
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteUser(id: string) {
    try {
      const { data } = await axios.delete(`//localhost:5002/users/${id}`)
      console.log('deleteUser', data)
    } catch (e) {
      console.error(e);
    }

    users.value = users.value.filter(user => user.id !== id)
  }

  async function createUser() {
    try {
      const { data } = await axios.post(`//localhost:5002/users/`, user.value)
      console.log('createUser', data)
    } catch (e) {
      console.error(e);
    }
  }

  async function editUser(id: string) {
    try {
      const { data } = await axios.put(`//localhost:5002/users/${id}`, user.value)
      console.log('editUser', data)
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
