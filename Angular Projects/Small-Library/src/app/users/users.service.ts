import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Lend } from '../lend/lend.model';
import { map } from 'rxjs/operators';

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

  constructor(private httpClient: HttpClient) {}


  emitUserChange() {
    this.usersChanged.next(this.users.slice());
  }

  fetchUsers(): Promise<User[]> {
    return this.httpClient.get<User[]>('http://localhost:62712/api/readers').pipe(map(dataJson => {
      const jsonUsers: User[] = [];
      dataJson.forEach(x => jsonUsers.push(new User(x.Name, x.Age)));
      return jsonUsers;
    })).toPromise();
  }

  setUsers(users: User[]) {
    this.users = [...users];
    this.emitUserChange();
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.emitUserChange();
  }
}
