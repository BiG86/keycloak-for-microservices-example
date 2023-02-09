import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationLoader } from '../../../@core/configuration/configuration-loader.service';
import { ResponseError } from "../../../@core/interfaces/ResponseError";
import { Book, BookListResponse, IBookResponse } from "../../../@core/models/book-model";
import { BaseCrudService, PaginationAndOrder } from "../../../@core/services/common/base-crud.service";

@Injectable({
  providedIn: 'root',
})
export class BookService extends BaseCrudService<Book,BookListResponse> {
  constructor(
    protected http: HttpClient,
    protected configurationLoader: ConfigurationLoader
  ) {
    super(http, configurationLoader, 'book');
  }

  getBooks(params?: PaginationAndOrder): Observable<BookListResponse> {
    return this.getList(params);
  }

  getBook(bookId: string): Observable<Book> {
   return this.getOne(bookId);
  }

  saveBooks(data: Book): Observable<{ message: string, payload: IBookResponse } | ResponseError> {
    return this.saveOne(data);
  }

  updateBooks(data: Book): Observable<{ message: string, payload: IBookResponse } | ResponseError> {
    return this.updateOne(data);
  }

  deleteBooks(bookId: string): Observable<string | ResponseError> {
    return this.deleteOne(bookId);
  }
}
