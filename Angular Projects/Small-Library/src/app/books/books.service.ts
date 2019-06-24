import { Book } from './book.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BooksService {
  booksChanged = new Subject<Book[]>();

  pickedBook = new Subject<Book>();

  private books: Book[] = [];

  constructor(private httpClient: HttpClient) {
  }


  emitBooksChange() {
    this.booksChanged.next(this.books.slice());
  }

  fetchBooks(): Promise<Book[]> {
    return this.httpClient.get<Book[]>('http://localhost:62712/api/books').pipe(map(dataJson => {
      const jsonBooks: Book[] = [];
      dataJson.forEach(x => jsonBooks.push(new Book(x.Title, x.Author)));
      return jsonBooks;
    })).toPromise();
  }

  setBooks(books: Book[]) {
    this.books = [...books];
    this.emitBooksChange();
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
