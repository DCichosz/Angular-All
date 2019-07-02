import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild("fullname", {static: false}) fullname: ElementRef;
  @ViewChild("age", {static: false}) age: ElementRef;

  constructor(
    private usersService: UsersService,
    private lendService: LendService
  ) {}

  ngOnInit() {
    this.usersService.fetchUsers().then(data => this.usersService.setUsers(data)).catch(() => console.log("PSAJAJAJA users"));
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

  onAdd() {
    if(this.age.nativeElement.value && this.fullname.nativeElement.value) {
      this.usersService.addUser(new User(this.fullname.nativeElement.value, this.age.nativeElement.value));
    } else {
      console.log("pustty model kurłą");
    }
  }
}
