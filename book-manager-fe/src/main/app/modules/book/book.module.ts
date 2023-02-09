import {SharedModule} from '../../@shared/shared.module';
import {NgModule} from '@angular/core';
import {BookComponent} from "./page/book.component";
import {BookRoutingModule} from "./book-routing.module";
import {BookDetailDialogComponent} from './book-detail-dialog/book-detail-dialog.component';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../@shared/material.module";

@NgModule({
  entryComponents: [
    BookDetailDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    BookRoutingModule
  ],
  declarations: [BookComponent, BookDetailDialogComponent],
})
export class BookModule {
}
