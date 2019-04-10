import { LendService } from './../lend/lend.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BooksService } from './books.service';
import { Book } from './book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
  books: Book[];
  subscription: Subscription;
  editedBook: {
    index: number;
    book: Book;
  };

  booksForm: FormGroup;

  constructor(private booksService: BooksService, private lendService: LendService) {}

  ngOnInit() {
    this.books = this.booksService.getBooks();
    this.subscription = this.booksService.booksChanged.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );

    this.booksForm = new FormGroup({
      book: new FormGroup({
        title: new FormControl(null, Validators.required),
        author: new FormControl(null, Validators.required)
      })
    });
  }

  onStartEdit(editedTitle: string, editedAuthor: string, index: number) {
    this.editedBook = {
      index,
      book: null
    };

    this.booksForm.setValue({
      book: {
        title: editedTitle,
        author: editedAuthor
      }
    });
  }

  onDelete(index: number) {
    this.booksService.deleteBook(index);
  }

  onSubmit() {
    if (this.editedBook) {
      this.editedBook.book = new Book(
        this.booksForm.get('book.title').value,
        this.booksForm.get('book.author').value
      );
      this.booksService.editBook(this.editedBook.index, this.editedBook.book);
    } else {
      this.booksService.addBook(
        new Book(
          this.booksForm.get('book.title').value,
          this.booksForm.get('book.author').value
        )
      );

    }
    this.editedBook = null;
    this.booksForm.reset();
  }

  onPick(pickedBook: Book) {
    console.log(pickedBook);
    this.lendService.checkTitle(pickedBook.title) ? alert('Książka została już wypożyczona') : this.lendService.pickBook(pickedBook);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
