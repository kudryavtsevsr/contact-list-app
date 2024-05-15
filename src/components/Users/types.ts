export interface User {
  iri: string;
  id: number;
  fullName: string;
  displayName: string;
  initials: string;
  email: string;
  phoneNumber: string;
  phoneCountryPrefix: string;
  teamIds: number[];
  image: string;
  address: UserAddress;
  isEmployee: true;
  functionName: string;
  userPermissions: number[];
}

export interface UserAddress {
  iri: string;
  id: number;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  country: string;
  postalCode: string;
  state: string;
}
