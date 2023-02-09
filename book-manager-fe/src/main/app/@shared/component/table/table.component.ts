import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {NgbdSortableHeader, SortEvent} from "./directives/sortable.directive";
import {TableService} from "./services/table.service";
import {Router} from "@angular/router";
import {ConfirmationDialogService} from "../confirmation-dialog";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  @Input() data: { columns: { index: number, name: string, sortable: boolean, width: string }[], rows: any[] };
  @Input() actions: { apply: Function, label: string }[] = [];

  @Output() selectedRows: any[] = [];
  @Output() selectedRowsEmit = new EventEmitter<any>();
  @Output() pageChangeEmit = new EventEmitter<any>();
  @Output() pageSizeChangeEmit = new EventEmitter<any>();
  @Output() sortColumnEmit = new EventEmitter<any>();
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public tableService: TableService,
    public translate: TranslateService,
    private readonly confirmationDialogService: ConfirmationDialogService,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    this.tableService.searchTerm = '';
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });


    // vai col sort della service lib
    this.tableService.sortColumn = column;
    this.tableService.sortDirection = direction;
  }

  selectedAll(el: any) {
    const checkboxes = document.getElementsByClassName("custom-checkbox");
    if (el.target.checked) {
      for (let i = 0; i < checkboxes.length; i++) {
        const checkbox: any = checkboxes[i];
        if (checkbox.type === 'checkbox') {
          checkbox.checked = true;
          const rowInfo = this.data.rows.filter(elRow => (elRow.id + '') === checkbox.id)[0];
          this.selectedRows.push(rowInfo.id);
        }
      }
    } else {
      for (let i = 0; i < checkboxes.length; i++) {
        const checkbox: any = checkboxes[i];
        if (checkbox.type === 'checkbox') {
          checkbox.checked = false;
          const rowInfo = this.data.rows.filter(elRow => (elRow.id + '') === checkbox.id)[0];
          const vals = this.selectedRows.filter(valueID => valueID !== rowInfo.id);
          this.selectedRows = vals;
        }
      }
    }

    this.selectedRowsEmit.emit(this.selectedRows);
  }

  selectedRow(event: any, rowInfo: any) {
    if (event.target.checked) {
      this.selectedRows.push(rowInfo.id);
    } else {
      const vals = this.selectedRows.filter(valueID => valueID !== rowInfo.id);
      this.selectedRows = vals;
    }

    this.selectedRowsEmit.emit(this.selectedRows);
  }

  pageChangeHandler(event: any) {
    this.pageChangeEmit.emit(event);
  }

  pageSizeChangeHandler(event: any) {
    this.pageSizeChangeEmit.emit(this.tableService.pageSize);
  }

  sortColumnHandler(event: any) {

    this.headers.forEach(header => {
      if (header.sortable !== event.column) {
        header.direction = '';
      }
    });
    this.sortColumnEmit.emit(event);
  }


  newReverse() {
    this.navigate('');
  }

  updateReverse(id: string) {
    this.navigate(id);

  }

  removeReverse(id: string) {
    this.confirmationDialogService
      .confirm(
        this.translate.instant('common.titleDeleteConfirm'),
        this.translate.instant('common.descDeleteConfirm'),
        this.translate.instant('common.ok'),
        this.translate.instant('common.cancel')
      )
      .then(confirmed => {
        return !confirmed;
      });
  }

  private navigate(id: string) {
    this.router.navigate(['reverse'], {
      state: {
        data: {
          idReverseProxy: id
        }
      }
    });
  }

  dadaLabel(param: any) {
    return param;
  }
}
