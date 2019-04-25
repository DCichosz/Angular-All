import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LendService } from './../lend/lend.service';
import { Book } from './../books/book.model';
import { UsersService } from './users.service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[];
  subscription: Subscription;
  bookSub: Subscription;
  pickedBook: Book;
  constructor(
    private usersService: UsersService,
    private lendService: LendService
  ) {}

  ngOnInit() {
    this.users = this.usersService.getUsers();

    this.subscription = this.usersService.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );

    this.bookSub = this.lendService.pickedBook.subscribe((pickedBook: Book) => {
      this.pickedBook = pickedBook;
    });
  }

  onDelete(index: number) {
    this.usersService.deleteUser(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLend(pickedUser: User) {
    this.lendService.checkUser(pickedUser)
      ?  alert(
          'Użytkownik nie oddał wypożyczonej książki, nie można wypożyczyć następnej'
        )
      : this.lendService.lendBook(pickedUser, this.pickedBook.title);
    this.pickedBook = null;
  }
}
