import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {I18nModule} from '../i18n';
import {ContentLayoutComponent} from './content-layout/content-layout.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, I18nModule, TranslateModule],
  declarations: [ContentLayoutComponent],
})
export class LayoutModule {
}
