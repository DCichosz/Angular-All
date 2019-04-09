import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Lend } from './lend.model';
import { User } from '..//users/user.model';

@Injectable({ providedIn: 'root' })
export class LendService {
  lendersChanged = new Subject<Lend[]>();

  lenders: Lend[] = [
    new Lend('Cos', new User('Andre', 10), new Date()),
    new Lend('Cos', new User('Andre', 10), new Date()),
    new Lend('Cos', new User('Andre', 10), new Date()),
    new Lend('Cos', new User('Andre', 10), new Date())
  ];

  emitLendersChange() {
    this.lendersChanged.next(this.lenders.slice());
  }

  getLenders(): Lend[] {
    return this.lenders.slice();
  }

  lendBook(user: User, title: string) {
    this.lenders.push(new Lend(title, user, new Date()));
    this.emitLendersChange();
  }

  returnBook(index: number) {
    this.lenders.splice(index, 1);
    this.emitLendersChange();
  }
}
