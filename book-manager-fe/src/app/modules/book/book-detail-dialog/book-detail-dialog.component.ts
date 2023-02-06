import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../../@core/models/book-model";
import {CommonDialogBase, CommonDialogConfig} from "../../@shared/component/common-dialog-modal/model/common-dialog-model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigurationLoader} from "../../@core/configuration/configuration-loader.service";
import {BookService} from "../services/book.service";
import {NotificationService} from "../../@core/services/notification.service";
import {TranslateService} from "@ngx-translate/core";
import {BaseDialogComponent} from "../../@shared/commons/base-dialog-component";

@Component({
  selector: 'app-book-detail-dialog',
  templateUrl: './book-detail-dialog.component.html',
  styleUrls: ['./book-detail-dialog.component.css']
})
export class BookDetailDialogComponent extends BaseDialogComponent implements OnInit, CommonDialogBase {

  book: Book;
  editForm: FormGroup = new FormGroup({});

  constructor(
     @Inject(MAT_DIALOG_DATA) public data: CommonDialogConfig,
     public dialogRef: MatDialogRef<BookDetailDialogComponent>,
     public configurationLoader: ConfigurationLoader,
     public bookService: BookService,
     public notificationService: NotificationService,
     public translateService: TranslateService
  ) {
    super(data, dialogRef, configurationLoader, notificationService, translateService);
    this.book = data.customData.content;

    if (!this.readonly) {
      this.initForm();
    }
  }

  ngOnInit(): void {
  }

  private initForm(): void {
    this.editForm = new FormGroup({
      formRefDescription: new FormControl(this.book.codeDescription.description ),
      formRefCode: new FormControl(this.book.codeDescription.code, Validators.required),
      formRefOtpSize: new FormControl(this.book.otpSize, Validators.required)
    })
  }

  confirmHandler(event: any) {
    if(this.readonly) {
      this.dialogRef.close(event);
      return;
    }
    if (this.editForm.invalid) {
      this.showErrors = true;
      return;
    }
    this.showErrors = false;
    const request: Book = {
      id: this.book.id ? this.book.id : null,
      otpSize: this.editForm.controls.formRefOtpSize.value,
      codeDescription: {
        code: this.editForm.controls.formRefCode.value,
        description: this.editForm.controls.formRefDescription.value
      }
    };

    if (this.book.id) {
      this.bookService.updateBooks(request).subscribe(
        response => {
          this.notificationService.showSuccess('Dati aggiornati con successo', 'Data update');
          this.dialogRef.close(event);
        },
        error => {
          this.notificationService.showError(this.translateService.instant('errors.errorUpdate'),'Book update');
        }
      );
    } else {
      this.bookService.saveBooks(request).subscribe(
        response => {
          this.notificationService.showSuccess('Dati aggiornati con successo', 'Data insert');
          this.dialogRef.close(event);
        },
        error => {
          this.notificationService.showError( this.translateService.instant('errors.errorInsert'),'Book creation');
        }
      );
    }
  }
}
