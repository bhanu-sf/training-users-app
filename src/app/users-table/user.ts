export enum Role {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Subscriber = 'Subscriber',
}

export interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: Role;
  phone: string;
  address: string;
}