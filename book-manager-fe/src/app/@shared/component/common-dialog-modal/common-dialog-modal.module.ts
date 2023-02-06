import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonDialogModalComponent} from "./components/common-dialog-modal.component";
import {UiKitModule} from "../../ui-kit.module";
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "../../material.module";
import {CommonDialogService} from "./common-dialog.service";

@NgModule({
  declarations: [
    CommonDialogModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    UiKitModule
  ],
  exports: [
    CommonDialogModalComponent
  ],
  providers: [
    CommonDialogService
  ]
})
export class CommonDialogModalModule { }
