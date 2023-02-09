import {DatePipe} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgModule} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from "@ngx-translate/core";


@NgModule({
  providers: [
    DatePipe,
    TranslateService,
    {
      provide: NgbModal,
      useValue: null,
    }
  ],
  imports: [HttpClientTestingModule],
})
export class AccountPanelTestModule {}
