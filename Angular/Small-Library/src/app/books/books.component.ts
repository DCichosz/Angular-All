import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


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

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.books = this.booksService.getBooks();
    this.subscription = this.booksService.booksChanged.subscribe((books: Book[]) => {
        this.books = books;
    });

  }

  onDelete(index: number) {
    this.booksService.deleteBook(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
