import {MatDialogRef} from '@angular/material/dialog';
import {CommonDialogService} from '../component/common-dialog-modal/common-dialog.service';
import {ComponentType} from '@angular/cdk/overlay';
import {CommonDialogBase} from '../component/common-dialog-modal/model/common-dialog-model';
import {TranslateService} from '@ngx-translate/core';
import {TableService} from '../component/table/services/table.service';

export abstract class BaseListComponent {

  // data
  // |- columns: array of objects defining the columns
  // |  |- index: the column index
  // |  |- name: the column name
  // |  |- sortable: whether the column is sortable or not
  // |  |- width: the column width
  // |  |- sortKey: the key to sort by
  // |- rows: array of objects describing the data to display
  data: { columns: { index: number, name: string, sortable: boolean; width: string ,sortKey: string;}[], rows: any[] };


  constructor(
    // Common dialog service
    protected commonDialogService: CommonDialogService,
    // Translate service
    protected translateService: TranslateService,
    // Table service
    protected tableService: TableService
  ) {
    this.translateService.onLangChange.subscribe(
      event => this.reloadTableColumns()
    );
  }

  /**
   * Method to reload data
   */
  public abstract reloadTableColumns(): void;

  /**
   * Method to open the dialog
   * @param data The data to be shown
   * @param readonly Whether the dialog is readonly or not
   * @param isNew Whether the entity is new or not
   * @param updateTitle Title for the update operation
   * @param viewTitle Title for the view operation
   * @param newTitle Title for the new entity operation
   * @param dialogComponent The dialog component ref
   * @returns The dialog ref
   */
  openDialog(data: any, readonly: boolean, isNew: boolean, updateTitle: string, viewTitle: string, newTitle: string, dialogComponent: ComponentType<CommonDialogBase>) {
    const dialogRef: MatDialogRef<any> = this.commonDialogService.openDialog(dialogComponent,
      {
        dialogTitle: readonly ? viewTitle : isNew ? newTitle : updateTitle,
        width: '100%',
        height: !readonly ? '80vh': null,
        customData: {
          readonly,
          content: data,
        }
      });
    return dialogRef;
  }

  protected abstract  loadTableData(page?:number,size?:number,orderBy?:string,orderDirection?:string): void;

  pageChangeReload(event: any) {
    this.loadTableData(event,this.tableService.pageSize);
  }

  pageSizeChangeReload(event: any) {
    this.loadTableData(0,event);
  }

  sortColumnReload(event: any) {
    this.loadTableData(0,this.tableService.pageSize,this.data.columns[event.column].sortKey,event.direction);
  }

  refreshData() {
    this.loadTableData();
  }
}
