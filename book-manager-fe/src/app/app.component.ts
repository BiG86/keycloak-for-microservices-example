import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor( private readonly _translate: TranslateService) {
       this._initTranslate();
    }

    private _initTranslate() {
      if (this._translate.getBrowserLang() !== undefined) {
        this._translate.setDefaultLang(this._translate.getBrowserLang());
        this._translate.use(this._translate.getBrowserLang());
      } else {
        this._translate.setDefaultLang('en');
        this._translate.use('en');
      }
    }

}
