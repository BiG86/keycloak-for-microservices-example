import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {SortDirection} from "../directives/sortable.directive";

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1: any, v2: any) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(data: any[], column: string, direction: string): any[] {
  if (direction === '') {
    return data;
  } else {
    return [...data].sort((a, b) => {
      const res = compare(a.row[column].value, b.row[column].value);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(reverseProxy: any, term: string) {
  return (
    reverseProxy.name.includes(term) ||
    reverseProxy.base.includes(term) ||
    reverseProxy.ssoStrategy.includes(term)
  );
}

@Injectable({providedIn: 'root'})
export class TableService {
  private readonly _loading$ = new BehaviorSubject<boolean>(true);
  private readonly _search$ = new Subject<void>();
  private readonly _datas$ = new BehaviorSubject<any[]>([]);
  //
  private readonly _algorithmsDatas$ = new BehaviorSubject<any[]>([]);
  private readonly _encryptionDatas$ = new BehaviorSubject<any[]>([]);
  private readonly _applicationsDatas$ = new BehaviorSubject<any[]>([]);
  private readonly _channelsDatas$ = new BehaviorSubject<any[]>([]);
  private readonly _operationTypesDatas$ = new BehaviorSubject<any[]>([]);
  private readonly _otpDomainsDatas$ = new BehaviorSubject<any[]>([]);
  private readonly _otpConfigDatas$ = new BehaviorSubject<any[]>([]);
  private readonly _serviceTypesData$ = new BehaviorSubject<any[]>([]);

  private readonly _total$ = new BehaviorSubject<number>(0);

  // default
  private readonly _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  // dati in pasto
  private DATA: any[];

  constructor() {
  }

  /**
   * setData : imposta i dati per il servizio
   * @param data
   */
  setData(data: any[], page: string, total: number) {
    // assegna i dati
    this.DATA = data;

    // aggancia la lettura, sort, filter...
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        switchMap(() => this._search(total)),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result: any) => {
        switch (page) {
          case 'books':
            this._booksDatas$.next(result.data);
            break;
          default:
            this._datas$.next(result.data);
        }

        this._total$.next(result.total);
      });
    this._search$.next();
  }

  /** GET */
  get data$() {
    return this._datas$.asObservable();
  }

  get algorithmsData$() {
    return this._algorithmsDatas$.asObservable();
  }

  get encryptionsData$() {
    return this._encryptionDatas$.asObservable();
  }

  get serviceTypesData$() {
    return this._serviceTypesData$.asObservable();
  }

  get applicationsData$() {
    return this._applicationsDatas$.asObservable();
  }

  get channelsData$() {
    return this._channelsDatas$.asObservable();
  }

  get operationTypesData$() {
    return this._operationTypesDatas$.asObservable();
  }

  get otpDomainsData$() {
    return this._otpDomainsDatas$.asObservable();
  }

  get otpConfigData$() {
    return this._otpConfigDatas$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  get pageSize() {
    return this._state.pageSize;
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  /** PUT */
  set page(page: number) {
    this._set({page});
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  set sortColumn(sortColumn: string) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  /**
   *
   */
  private _search(total: number): Observable<{ data: any; total: number }> {
    const {
      sortColumn,
      sortDirection,
      pageSize,
      page,
    } = this._state;

    // 1. sort
    let data: any = sort(this.DATA, sortColumn, sortDirection);

    // 3. paginate
    data = data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({data, total});
  }
}
