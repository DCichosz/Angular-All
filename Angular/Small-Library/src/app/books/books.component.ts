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
    'index': number,
    'book': Book
  };

  booksForm: FormGroup;

  constructor(private booksService: BooksService) {}

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
      index: index,
      book: new Book(editedTitle, editedAuthor)
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
    if (this.booksForm.invalid) {

    } else {
      if(this.editedBook) {
        // this.booksService.editBook()
      } else {
        console.log(this.booksForm);
        this.booksService.addBook(
          new Book(this.booksForm.get('book.title').value, this.booksForm.get('book.author').value)
        );
      }
    }
    this.booksForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
