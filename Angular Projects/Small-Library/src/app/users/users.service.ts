import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class UsersService {
  usersChanged = new Subject<User[]>();

  users: User[] = [];

  constructor(private httpClient: HttpClient) {}


  emitUserChange() {
    this.usersChanged.next(this.users.slice());
  }

  fetchUsers(): Promise<User[]> {
    return this.httpClient.get<User[]>('http://localhost:62712/api/readers').pipe(map(dataJson => {
      const jsonUsers: User[] = [];
      // @ts-ignore
      dataJson.forEach(x => jsonUsers.push(new User(x.Name, x.Age)));
      return jsonUsers;
    })).toPromise();
  }

  addUser(newUser: User) {
    console.log(newUser);
    this.httpClient.post('http://localhost:62712/api/readers', {Name: newUser.fullname, Age: newUser.age})
      .toPromise()
      .then((data) => {
        console.log(data);
        this.users.push(newUser);
        this.emitUserChange();
      })
      .catch((error) => console.log(error));
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
