import { DateTimeFormatter } from "../decorators/date-time-formatter";

export enum Role {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Subscriber = 'Subscriber',
}

export interface IUser {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: Role;
  phone: string;
  address: string;
}

export class User {
  id: number;
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  role: Role;
  phone?: string;
  address?: string;
  isEditing: boolean;
  edited?: any;

  @DateTimeFormatter()
  createdAt: Date;

  updatedAt: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.middleName = user.middleName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.email = user.email;
    this.address = user.address;
    this.role = user.role;
    this.isEditing = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  setEditing() {
    this.edited = this;
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }
}
