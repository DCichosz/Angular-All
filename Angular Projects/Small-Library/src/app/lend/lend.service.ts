import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

import { Lend } from './lend.model';
import { User } from '..//users/user.model';
import { Book } from '../books/book.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// @ts-ignore
@Injectable({ providedIn: 'root' })
export class LendService {
  lendersChanged = new Subject<Lend[]>();
  public title: string;

  pickedBook = new Subject<Book>();

  lenders: Lend[];

  constructor(private httpClient: HttpClient) {}

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

  fetchLenders(): Promise<Lend[]> {
    return this.httpClient.get<Lend[]>('http://localhost:62712/api/lend').pipe(map(dataJson => {
      const jsonLenders: Lend[] = [];

      // @ts-ignore
      dataJson.forEach(x => jsonLenders.push(new Lend(x.Title, new User(x.Name, x.Age), x.LendDate)));
      return jsonLenders;
    })).toPromise();
  }

  setLenders(lenders: Lend[]) {
    this.lenders = [...lenders];
    this.emitLendersChange();
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
