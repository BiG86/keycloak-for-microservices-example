import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {ConfigurationLoader} from '../../@core/configuration/configuration-loader.service';
import {ResponseError} from "../../@core/interfaces/ResponseError";
import {IBookEncryptionResponse} from "./data/iBookEncryptionResponse";
import {IBookEnumResponse} from "./data/iBookEnumResponse";
import {Book, BookListResponse, IBookResponse} from "../../@core/models/book-model";
import {BaseCrudService, PaginationAndOrder} from "../../@core/services/common/base-crud.service";

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

  getBookEncryptions(): Observable<IBookEncryptionResponse[] | {} | ResponseError> {
    return this.http
      .get<IBookEncryptionResponse[]>(`${this.configurationLoader.getConfiguration().serverUrl}/book/enum/encryption`)
      .pipe(
        map((response: IBookEncryptionResponse[]) => {
          return response;
        }),
        shareReplay(1),
        catchError((error: ResponseError) => {
          throw of(error);
        })
      );
  }

 getBookEnum(): Observable<IBookEnumResponse[] | {} | ResponseError> {
    return this.http
      .get<IBookEnumResponse[]>(`${this.configurationLoader.getConfiguration().serverUrl}/books/enum`)
      .pipe(
        map((response: any) => {
          return response;
        }),
        shareReplay(1),
        catchError((error: ResponseError) => {
          throw of(error);
        })
      );
  }
}
