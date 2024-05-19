import {Address} from '../Addresses/types';

export interface User {
  id: string;
  iri: string;
  fullName: string;
  displayName: string;
  initials: string;
  email: string;
  phoneNumber: string;
  phoneCountryPrefix: string;
  teamIds: number[];
  image: string;
  address: Address;
  isEmployee: true;
  functionName: string;
  userPermissions: number[];
}
