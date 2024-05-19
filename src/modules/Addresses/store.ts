import {ref} from 'vue';
import {defineStore} from 'pinia';
import {Address} from './types';
import {User} from '../Users';
import axios from 'axios';

export const useAddressesStore = defineStore('addresses', () => {
  const addresses = ref<Address[]>([]);
  const address = ref<Address>({});

  async function fetchAddresses() {
    try {
      const { data } = await axios.get<User[]>('//localhost:5002/addresses')
      addresses.value = data
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchAddress(id: string) {
    try {
      const { data } = await axios.get<User[]>(`//localhost:5002/addresses/${id}`)
      address.value = data
    } catch (e) {
      console.error(e);
    }
  }

  function getAddress(id: string): Address {
    console.log('getAddress', id)
    console.log('addresses.find(address => address.id === id)', addresses.find(address => address.id === id))
    return addresses.find(address => address.id === id)
  }

  async function createAddress(): Promise<string> {
    try {
      const { data } = await axios.post(`//localhost:5002/addresses/`, address.value)
      console.log('createAddress', data)
      return data.id
    } catch (e) {
      console.error(e);
    }
  }

  async function editAddress(id: string) {
    try {
      const { data } = await axios.put(`//localhost:5002/addresses/${id}`, address.value)
      console.log('editUser', data)
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
