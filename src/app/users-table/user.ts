export enum Role {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Subscriber = 'Subscriber',
}

export interface IUser {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: Role;
  phone: string;
  address: string;
}

export class User {
  isEditing: boolean;
  edited?: IUser;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    public id: number,
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public email: string,
    public role: Role,
    public phone: string,
    public address: string
  ) {
    this.isEditing = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  setEditing() {
    let { isEditing, edited, createdAt, updatedAt, ...rest } = this;
    this.edited = rest;
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  static updateUser(id: number, user: IUser): User {
    return new User(
      id,
      user.firstName,
      user.middleName,
      user.lastName,
      user.email,
      user.role,
      user.phone,
      user.address,
    )
  }
}
