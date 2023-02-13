import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from '@ngx-translate/core';
import { ConfigurationLoader } from '../../../@core/configuration/configuration-loader.service';
import { ResponseError } from '../../../@core/interfaces/ResponseError';
import { Book, BookListResponse } from "../../../@core/models/book-model";
import { AuthService } from "../../../@core/services";
import { PaginationAndOrder } from "../../../@core/services/common/base-crud.service";
import { NotificationService } from "../../../@core/services/notification.service";
import { BaseListComponent } from "../../../@shared/commons/base-list-component";
import { AlertService } from '../../../@shared/component/alert';
import { CommonDialogService } from "../../../@shared/component/common-dialog-modal/common-dialog.service";
import { ConfirmationDialogService } from "../../../@shared/component/confirmation-dialog";
import { TableService } from "../../../@shared/component/table/services/table.service";
import { roles } from '../../../data/constants/constants';
import { ModalService } from "../../../_modal";
import { BookDetailDialogComponent } from "../book-detail-dialog/book-detail-dialog.component";
import { BookService } from "../services/book.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent extends BaseListComponent implements OnInit {

  actions: any[] = [];
  editForm: FormGroup;
  currentId: string;
  showButtonRole = true;
  active = false;
  errorMessage: string;

  newButtonDisabled = false;

  errors = {
    isbn: false,
    title: false,
    author: false
  };

  constructor(
    private readonly auth: AuthService,
    public translateService: TranslateService,
    private readonly modalService: ModalService,
    private readonly confirmationDialogService: ConfirmationDialogService,
    private readonly bookService: BookService,
    protected tableService: TableService,
    private readonly configurationLoader: ConfigurationLoader,
    public alertService: AlertService,
    public notificationService: NotificationService,
    protected commonDialogService: CommonDialogService
  ) {
    super(commonDialogService, translateService, tableService);
  }

  ngOnInit() {
    if (!this.auth.isInRoles(roles.admin)) {
      this.showButtonRole = false;
    }
    this.editForm = new FormGroup({
      code: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required])
    });
    this.data = {
      columns: [
        {index: 0, name: this.translateService.instant('book.isbn'), sortable: true, width: '15%',sortKey:'isbn'},
        {index: 1, name: this.translateService.instant('book.btitle'), sortable: true, width: '15%',sortKey:'title'},
        {index: 2, name: this.translateService.instant('book.author'), sortable: true, width: '15%',sortKey:'author'},
        {index: 3, name: this.translateService.instant('common.insDate'), sortable: true, width: '10%',sortKey:'dateInsert'},
        {index: 4, name: this.translateService.instant('common.updDate'), sortable: true, width: '10%',sortKey:'dateModify'},
        {index: 5, name: this.translateService.instant('common.user'), sortable: true, width: '15%',sortKey:'lastUserModify'}
      ],
      rows: []
    };
    this.initData();
  }

  reloadTableColumns() {
    this.data.columns = [
      {index: 0, name: this.translateService.instant('book.isbn'), sortable: true, width: '15%',sortKey:'isbn'},
      {index: 1, name: this.translateService.instant('book.btitle'), sortable: true, width: '15%',sortKey:'title'},
      {index: 2, name: this.translateService.instant('book.author'), sortable: true, width: '15%',sortKey:'author'},
      {index: 3, name: this.translateService.instant('common.insDate'), sortable: true, width: '10%',sortKey:'dateInsert'},
      {index: 4, name: this.translateService.instant('common.updDate'), sortable: true, width: '10%',sortKey:'dateModify'},
      {index: 5, name: this.translateService.instant('common.user'), sortable: true, width: '15%',sortKey:'lastUserModify'}
    ]
  }

  private initData() {
    this.loadTableData();
    this.buildTableActions();
  }

  protected loadTableData(page?:number,size?:number,orderBy?:string,orderDirection?:string) {

    const params: PaginationAndOrder = {
      page: page ? page : this.tableService.page,
      size: size? size : this.tableService.pageSize,
      orderBy: orderBy? orderBy :  undefined,
      orderDirection: orderDirection? orderDirection.toUpperCase() :  undefined
    };

    this.bookService.getList(params).subscribe((books: BookListResponse) => {
      if (books?.payload) {
        this.data.rows = [];
        books.payload.forEach((book: { id: any; isbn: any; title: any; author: any; activities: { dateInsert: any; dateModify: any; lastUserModify: any; }; }) => {
          this.data.rows.push(
            {
              id: book.id,
              row: [
                {value: book.isbn},
                {value: book.title},
                {value: book.author},
                {isDate: true, value: book.activities?.dateInsert},
                {isDate: true, value: book.activities?.dateModify},
                {value: book.activities?.lastUserModify}
              ]
            });
        });
        this.tableService.setData(this.data.rows, 'book',books.totalNumber);
      }
    });
  }

  openDetailDialog(book: any, readonly: boolean, isNew: boolean) {
    const dialogRef: MatDialogRef<any> = this.commonDialogService.openDialog(BookDetailDialogComponent,
      {
        dialogTitle: readonly ? 'book.modal.view' : isNew ? 'book.modal.new' : 'book.modal.update',
        width: '700px',
        height: !readonly ? '450px' : null,
        customData: {
          readonly: readonly,
          content: book,
        }
      });
    dialogRef.afterClosed().subscribe(
      result => {
        if (!readonly && !!result) {
          this.refreshData();
        }
      }
    );
  }

  createButton() {
    const book: Book = {
      id: null,
      isbn: null,
      title: null,
      author: null
    };
    this.openDetailDialog(book, false, true);
  }

  private buildTableActions() {
    if (this.showButtonRole) {
      this.actions = [
        {
          // Detail visualization
          apply: (id: string) => {
            this.bookService.getOne(id).subscribe((book: Book) => {
              this.openDetailDialog(book, true, false);
            });
          },
          label: 'common.details'
        },
        {
          // Modify visualization
          apply: (id: string) => {
            this.bookService.getOne(id).subscribe((book: Book) => {
              this.openDetailDialog(book, false, false);
            });
          },
          label: 'common.update'
        },
        {
          apply: (id: string) => {
            this.currentId = id;
            this.confirmationDialogService
              .confirm(
                this.translateService.instant('common.titleDeleteConfirm'),
                this.translateService.instant('common.descDeleteConfirm'),
                this.translateService.instant('common.ok'),
                this.translateService.instant('common.cancel')
              )
              .then(confirmed => {
                if (confirmed) {
                  this.bookService.deleteOne(id).subscribe((result: ResponseError) => {
                      this.loadTableData()
                    },
                    error => {
                      this.notificationService.showError(`${error}`, this.translateService.instant('errors.errorDelete'));
                    }
                  )
                } else {
                  return true;
                }
                return false;
              })
          },
          label: 'common.remove'
        }
      ];
    }
  }


}
