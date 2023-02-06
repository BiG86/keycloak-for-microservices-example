import {Injectable} from '@angular/core';
import {SessionDataServiceInterface} from './sessiondataInterface.service';
import {SessionStorageService} from 'ngx-webstorage';

@Injectable({providedIn: 'root'})
export class StateStorageService implements SessionDataServiceInterface {
  constructor(private readonly storage: SessionStorageService) {
  }

  store(key: string, value: any) {
    this.storage.store(key, value);
  }

  retrieve(key: string) {
    const value = this.storage.retrieve(key);
    return value ? value : null;
  }

  removeItem(key: string) {
    return this.storage.clear(key);
  }

  getPreviousState() {
    return this.storage.retrieve('previousState');
  }

  resetPreviousState() {
    this.storage.clear('previousState');
  }

  storePreviousState(previousStateName: string, previousStateParams: string) {
    const previousState = {
      name: previousStateName,
      params: previousStateParams
    };
    this.storage.store('previousState', previousState);
  }

  getDestinationState() {
    return this.storage.retrieve('destinationState');
  }

  storeUrl(url: string) {
    this.storage.store('previousUrl', url);
  }

  getUrl() {
    return this.storage.retrieve('previousUrl');
  }

  storeDestinationState(destinationState: any, destinationStateParams: any, fromState: any) {
    const destinationInfo = {
      destination: {
        name: destinationState.name,
        data: destinationState.data
      },
      params: destinationStateParams,
      from: {
        name: fromState.name
      }
    };
    this.storage.store('destinationState', destinationInfo);
  }
}
