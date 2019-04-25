import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

import { Lend } from './lend.model';
import { User } from '..//users/user.model';
import { Book } from '../books/book.model';

@Injectable({ providedIn: 'root' })
export class LendService {
  lendersChanged = new Subject<Lend[]>();

  public LenderUser: User;
  public title: string;

  pickedBook = new Subject<Book>();

  lenders: Lend[] = [
    new Lend('Cos', new User('Andre', 10), new Date()),
    new Lend('Cos', new User('Andre', 10), new Date()),
    new Lend('Cos', new User('Andre', 10), new Date()),
    new Lend('Cos', new User('Andre', 10), new Date())
  ];

  emitLendersChange() {
    this.lendersChanged.next(this.lenders.slice());
  }

  checkTitle(title: string) {
    return this.lenders.find(lender =>  lender.title === title) ? true : false;
  }

  checkUser(user: User) {
    console.log(user);
    return this.lenders.find(lender => _.isEqual(lender.lender, user)) ? true : false;
  }

  getLenders(): Lend[] {
    return [...this.lenders];
  }

  lendBook(user: User, title: string) {
    this.lenders.push(new Lend(title, user, new Date()));
    this.emitLendersChange();
  }

  returnBook(index: number) {
    this.lenders.splice(index, 1);
    this.emitLendersChange();
  }

  pickBook(pickedBook: Book) {
    this.pickedBook.next(pickedBook);
  }
}
