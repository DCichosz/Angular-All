import { Injectable } from '@angular/core';

import { Lend } from './lend.model';
import { User } from '..//users/user.model';

@Injectable({ providedIn: 'root' })
export class LendService {
  lenders: Lend[] = [
    new Lend('Cos', new User('Andre', 10), new Date()),
    new Lend('Cos', new User('Andre', 10), new Date()),
    new Lend('Cos', new User('Andre', 10), new Date()),
    new Lend('Cos', new User('Andre', 10), new Date())
  ];

  getLenders(): Lend[] {
    return this.lenders.slice();
  }
}
