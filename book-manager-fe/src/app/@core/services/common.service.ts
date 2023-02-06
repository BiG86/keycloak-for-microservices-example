import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {AlertService} from "../../@shared/component/alert";
import {StateStorageService} from "./sessiondata.service";
import {COMMON} from "../../data/constants/constants";

@Injectable({providedIn: 'root'})
export class CommonService {
  constructor(
    private readonly stateStorageService: StateStorageService,
    private readonly location: Location,
    public translate: TranslateService,
    public alertService: AlertService) {
  }

  public getState(sessionKey: string) {
    let selectedData: any = null;

    // Read any parameters
    const state: any = this.location.getState();
    // Test if a param was given
    if (state && state[COMMON.KEY_PARAM]) {
      // Obtain the value
      selectedData = state[COMMON.KEY_PARAM];
      // Save to SessionStorage
      this.stateStorageService.store(sessionKey, selectedData);
      return selectedData;
    } else {
      // Try to retrieve from SessionStorage
      return this.stateStorageService.retrieve(sessionKey);
    }
  }

}
