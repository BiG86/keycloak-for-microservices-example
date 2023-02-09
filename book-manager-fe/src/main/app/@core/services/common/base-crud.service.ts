import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, shareReplay, switchMap } from "rxjs/operators";
import { ConfigurationLoader } from "../../configuration/configuration-loader.service";
import { ResponseError } from "../../interfaces/ResponseError";
import { Book } from "../../models/book-model";
import { CommonHttpResponse } from "../../models/http.models";

@Injectable()
export class BaseCrudService<T,K> {

  private readonly OPERATION_SUCCESS=0;

  constructor(
    protected http: HttpClient,
    protected configurationLoader: ConfigurationLoader,
    protected apiToken: string
  ) {
  }

  getList(params?: PaginationAndOrder): Observable<K> {
    return this
      .getElements(params)
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

  private getElements(params?: PaginationAndOrder): Observable<T[]> {
    return this.http
    .get<T[]>(
      `${this.configurationLoader.getConfiguration().serverUrl}/${this.apiToken}?${params?.page
        ? 'page='
        +(params.page-1)
        +'&' : ''}${params?.size
          ? 'size='+params.size+'&' : ''}${params?.orderBy
            ? 'orderBy='+params.orderBy+'&' : ''}${params?.orderDirection
              ? 'orderDirection='+params.orderDirection+'&' : ''}`)
  }

  /**
   * Performs a first call to obtain 10 elements, then performs a second call to obtain the complete list of elements
   * if the total number of elements is greater than the number of elements returned
   * @returns An Observable to subscribe to in order to obtain the response with the complete list of elements in the payload
   */
  getAll(): Observable<K> {
    const requestNumber: number = 10
    const paginationAndOrder: PaginationAndOrder = {
      page: 0,
      size: requestNumber,
      orderBy: 'id',
      orderDirection: "ASC"
    }
    return this.getList(paginationAndOrder)
      .pipe(
        switchMap(
          (k: any) => {
            if (k.totalNumber > requestNumber){
              return this.getList({
                page: 0,
                size: k.totalNumber,
                orderBy: 'id',
                orderDirection: "ASC"
              })
            }
            return of(k)
          }
        )
      );
  }

  getOne(id: string): Observable<T> {
    return this.http
      .get<CommonHttpResponse<T>>(`${this.configurationLoader.getConfiguration().serverUrl}/${this.apiToken}?id=${id}`)
      .pipe(
        map((response: any) => {
          response.success = true;
          return response.payload[0];
        }),
        shareReplay(1),
        catchError((error: ResponseError) => {
          throw of(error);
        })
      );
  }

  saveOne(data: T): Observable<{ message: string, payload: T } | ResponseError> {
    delete data['id'];
    return this.http
      .post<{ message: string, payload: T }>(`${this.configurationLoader.getConfiguration().serverUrl}/${this.apiToken}`, data)
      .pipe(
        map((response: any) => {
          if(!!response && response.resultCode < this.OPERATION_SUCCESS) {
            throw of(response.resultMessage);
          }
          return response;
        }),
        shareReplay(1),
        catchError((error: ResponseError) => {
          throw of(error);
        })
      );
  }

  deleteOne(id: string): Observable<string | ResponseError> {
    return this.http
      .delete<string>(`${this.configurationLoader.getConfiguration().serverUrl}/${this.apiToken}?id=${id}`)
      .pipe(
        map((response: any) => {
          return response;
        }),
        shareReplay(1),
        catchError((error: ResponseError) => {
          return throwError(error);
        })
      );
  }

  updateOne(data: T | any): Observable<{ message: string, payload: T } | ResponseError> {
    return this.http
      .put<{ message: string, payload: Book }>(`${this.configurationLoader.getConfiguration().serverUrl}/${this.apiToken}?id=${data.id}`, data)
      .pipe(
        map((response: any) => {
          return response;
        }),
        shareReplay(1),
        catchError((error: ResponseError) => {
          return throwError(error);
        })
      );
  }


  /**
   * Metodo di decodifica e validazione della risposta HTTP.
   * Viene lanciata una eccezione se si presenta uno dei codici di errore censiti
   * @param response
   * @protected
   */
  protected decodeResponse(response: any): void {
    if(!!response &&
      response.resultCode < this.OPERATION_SUCCESS
      ) {
      const err: ResponseError = new ResponseError();
      err.message = response.resultMessage;
      throw Error(response.resultMessage);
    }
  }
}

export interface PaginationAndOrder {
  page: number;
  size: number;
  orderBy: string;
  orderDirection: string; // This field can be either 'DESC' or 'ASC';
}
