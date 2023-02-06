import {Observable} from 'rxjs';
import {ResponseError} from "../../../@core/interfaces/ResponseError";
import {Book, IBookRequest, IBookResponse} from "../../../@core/models/book-model";

export abstract class BookDataBaseService {
  abstract getBooks(): Observable<IBookResponse[] | {} | ResponseError>;

  abstract getBook(bookId: string): Observable<IBookResponse[] | {} | ResponseError>;

  abstract saveBooks(data: Book): Observable<{ message: string, payload: IBookResponse } | ResponseError>;

  abstract updateBooks(data: Book): Observable<{ message: string, payload: IBookResponse } | ResponseError>;

  abstract deleteBooks(bookId: string): Observable<string | ResponseError>;

}
