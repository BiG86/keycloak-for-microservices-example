import { Injectable } from '@angular/core';

@Injectable()
export abstract class SessionDataServiceInterface {
  abstract store(key: string, value: any): any;
  abstract retrieve(key: string): any;
  abstract removeItem(key: string): any;
}
