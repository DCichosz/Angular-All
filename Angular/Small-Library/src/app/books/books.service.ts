import { Book } from './book.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BooksService {
  booksChanged = new Subject<Book[]>();

  pickedBook = new Subject<Book>();

  private books: Book[] = [
    new Book('Cos1', 'Hejka'),
    new Book('Cos2', 'Hejka'),
    new Book('Cos3', 'Hejka'),
    new Book('Cos4', 'Hejka'),
    new Book('Cos5', 'Hejka')
  ];

  emitBooksChange() {
    this.booksChanged.next(this.books.slice());
  }

  getBooks(): Book[] {
    return this.books.slice();
  }

  editBook(index: number, newBook: Book) {
    this.books[index] = newBook;
    this.emitBooksChange();
  }

  addBook(newBook: Book) {
    this.books.push(newBook);
    this.emitBooksChange();
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
    this.emitBooksChange();
  }
}
