import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { LendService } from './../lend/lend.service';
import { Book } from './../books/book.model';
import { UsersService } from './users.service';
import { User } from './user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../shared/snackbar.service';

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

  usersForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private lendService: LendService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.usersService.fetchUsers().then(data => this.usersService.setUsers(data))
      .catch(() => this.snackbarService.showErrorFromApi());
    this.subscription = this.usersService.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );

    this.bookSub = this.lendService.pickedBook.subscribe((pickedBook: Book) => {
      this.pickedBook = pickedBook;
    });

    this.usersForm = new FormGroup({
      user: new FormGroup({
        fullname: new FormControl(null, Validators.required),
        age: new FormControl(null, [Validators.required])
      })
    });
  }

  onSubmit() {
      this.usersService.addUser(
        new User(
          this.usersForm.get('user.fullname').value,
          this.usersForm.get('user.age').value
        )
      );
      this.usersForm.reset();
    }

  onDelete(index: number) {
    this.usersService.deleteUser(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLend(pickedUser: User) {
    this.lendService.checkUser(pickedUser)
      ?  this.snackbarService.snackbar.open('Użytkownik nie oddał wypożyczonej książki, nie można wypożyczyć następnej')
      : this.lendService.lendBook(pickedUser, this.pickedBook.title);
    this.pickedBook = null;
  }
}
