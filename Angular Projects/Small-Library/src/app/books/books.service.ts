import { Book } from './book.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
    return this.httpClient.get<Book[]>('http://localhost:62712/api/books')
      .pipe(map(dataJson => {
      const jsonBooks: Book[] = [];
      // @ts-ignore
      dataJson.forEach(x => jsonBooks.push(new Book(x.ID, x.Title, x.Author)));
      return jsonBooks;
      }))
    .toPromise();
  }

  setBooks(books: Book[]) {
    // tslint:disable-next-line:no-shadowed-variable
    this.books = [...books];
    this.emitBooksChange();
  }

  editBook(index: number, newBook: Book) {
    this.httpClient.put('http://localhost:62712/api/books/' + newBook.id, newBook).toPromise()
      .then(() => {
      this.books[index] = newBook;
      this.emitBooksChange();
    }).catch((error) => console.log(error));
  }

  addBook(newBook: Book) {
    this.httpClient.post('http://localhost:62712/api/books', newBook)
      .toPromise()
      .then((data: number) => {
      console.log(data);
      newBook.id = data
      this.books.push(newBook);
      this.emitBooksChange();
    })
      .catch((error) => console.log(error));
  }

  deleteBook(id: number) {
    this.httpClient.delete('http://localhost:62712/api/books/' + id)
      .toPromise()
      .then(() => {
      this.books = this.books.filter(book => book.id !== id);
      this.emitBooksChange();
    }).catch(error => console.log(error));
  }

  findBook(index: number) {
    return this.books[index];
  }
}
