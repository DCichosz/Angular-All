import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  usersChanged = new Subject<User[]>();

  users: User[] = [
    new User('1', 10),
    new User('A2ndre', 10),
    new User('An3dre', 10),
    new User('An4re', 10),
    new User('An5re', 10)
  ];

  emitUserChange() {
    this.usersChanged.next(this.users.slice());
  }

  getUser(index: number) {
    return [...this.users][index];
  }

  getUsers(): User[] {
    return [...this.users];
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.emitUserChange();
  }
}
