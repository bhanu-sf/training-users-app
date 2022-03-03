import { Component, OnInit } from '@angular/core';
import { GenericStore } from './generic-store';
import { USERS } from './mock-users';
import { IUser, User } from './user';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})

export class UsersTableComponent {
  dataFetched = false;
  users = new GenericStore<User>();

  fetchData() {
    this.users.addAllItems(USERS.map((user, idx) => {
      return new User({
        id: idx,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      })
    }));
    console.log(this.users.getAll())
    this.dataFetched = true;
  }

  editUser(idx: number) {
    this.users.getById(idx)?.setEditing();
  }

  cancelEdit(idx: number) {
    this.users.getById(idx)?.cancelEditing();
  }
  
  saveUser(idx: number) {
    try {
      const updatedUser = this.users.getById(idx)?.edited;      
      this.#validateUser(updatedUser);
  
      if (!updatedUser) {
        throw new Error('Cannot find user')
      }

      let user = new User(updatedUser);
      user.updatedAt = new Date();
      
      this.users.updateItem(idx, user)
    } catch(err: any) {
      alert(err.message);
    }  
  }

  deleteUser(idx: number) {
    this.users.removeItem(idx);
  }

  #validateUser(user: IUser | undefined) {
    if (!user?.firstName) {
      throw new Error('First name is required')
    }

    if (!user?.email) {
      throw new Error('Email is required')
    }

    if (!user?.role) {
      throw new Error('Role is required')
    }
  }
}
