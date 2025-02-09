export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  address: Address;
  company: Company;
  phone: string;
  website: string;
}

export interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface Address {
  city: string;
  geo: Geo;
  street: string;
  suite: string;
  zipcode: string;
}

export interface Geo {
  lat: string;
  lng: string;
}
