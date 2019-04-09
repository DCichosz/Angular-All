import { Book } from './book.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BooksService {
  booksChanged = new Subject<Book[]>();

  private books: Book[] = [
    new Book('Cos', 'Hejka'),
    new Book('Cos', 'Hejka'),
    new Book('Cos', 'Hejka'),
    new Book('Cos', 'Hejka'),
    new Book('Cos', 'Hejka')
  ];

  emitBooks() {
    this.booksChanged.next(this.books.slice());
  }

  getBooks(): Book[] {
    return this.books.slice();
  }

  editBook(index: number, newBook: Book) {
    this.books[index] = newBook;
    this.emitBooks();
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
    this.emitBooks();
  }
}
