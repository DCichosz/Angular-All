import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  users: User[] = [
    new User('Andre', 10),
    new User('Andre', 10),
    new User('Andre', 10),
    new User('Andre', 10),
    new User('Andre', 10)
  ];

  getUsers(): User[] {
    return this.users.slice();
  }
}
