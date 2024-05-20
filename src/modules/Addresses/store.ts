import {ref} from 'vue';
import {defineStore} from 'pinia';
import {Address} from './types';
import {User} from '../Users';
import axios from '@/services/api';

export const useAddressesStore = defineStore('addresses', () => {
  const addresses = ref<Address[]>([]);
  const address = ref<Address>({});

  async function fetchAddresses() {
    try {
      const { data } = await axios.get<User[]>('addresses')
      addresses.value = data
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchAddress(id: string) {
    try {
      const { data } = await axios.get<User[]>(`addresses/${id}`)
      address.value = data
    } catch (e) {
      console.error(e);
    }
  }

  function getAddress(id: string): Address {
    return addresses.find(address => address.id === id)
  }

  async function createAddress(): Promise<string> {
    try {
      const { data } = await axios.post(`addresses/`, address.value)
      return data.id
    } catch (e) {
      console.error(e);
    }
  }

  async function editAddress(id: string) {
    try {
      await axios.put(`addresses/${id}`, address.value)
    } catch (e) {
      console.error(e);
    }
  }

  function clearAddress() {
    address.value = {}
  }

  return {
    addresses,
    address,
    getAddress,
    fetchAddresses,
    fetchAddress,
    editAddress,
    createAddress,
    clearAddress
  }
})
