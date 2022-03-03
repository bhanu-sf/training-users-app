import { Component, OnInit } from '@angular/core';
import { USERS } from './mock-users';
import { User } from './user';
import { UserRow } from './user-row';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})

export class UsersTableComponent {
  dataFetched = false;
  users: UserRow[] = [];

  fetchData() {
    this.users = USERS.map(user => {
      return {
        ...user,
        isEditing: false
      }
    });
    this.dataFetched = true;
  }

  editUser(idx: number) {
    this.users[idx].isEditing = true;
    this.users[idx].edited = {
      ...this.users[idx]
    }
  }

  cancelEdit(idx: number) {
    this.users[idx].isEditing = false;
  }
  
  saveUser(idx: number) {
    try {
      this.#validateUser(this.users[idx].edited);
      this.users[idx] = {
        ...this.users[idx].edited,
        isEditing: false,
        edited: null,
      }
    } catch(err: any) {
      alert(err.message);
    }  
  }

  deleteUser(idx: number) {
    this.users.splice(idx, 1);
  }

  #validateUser(user: User) {
    if (!user.firstName) {
      throw new Error('First name is required')
    }

    if (!user.email) {
      throw new Error('Email is required')
    }

    if (!user.role) {
      throw new Error('Role is required')
    }
  }
}
