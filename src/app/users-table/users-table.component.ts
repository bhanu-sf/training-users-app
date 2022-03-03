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
      return new User(
        idx,
        user.firstName,
        user.middleName,
        user.lastName,
        user.email,
        user.role,
        user.phone,
        user.address,
      )
    }));
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
      
      this.users.updateItem(idx, User.updateUser(idx, updatedUser))
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
