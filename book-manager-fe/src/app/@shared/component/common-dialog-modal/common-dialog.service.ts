import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CommonDialogBase, CommonDialogConfig} from "./model/common-dialog-model";
import {ComponentType} from "@angular/cdk/overlay";

@Injectable()
export class CommonDialogService {

  constructor(
    private readonly dialog: MatDialog
  ) {
  }

  public openDialog(
    dialogComponent: ComponentType<CommonDialogBase>,
    config?: CommonDialogConfig): MatDialogRef<any> {
    const cfg = {
      disableClose: true,
      width: config.width ? config.width : '400px',
      height: config.height ? config.height : '500px',
      data: {
        dialogTitle: config.dialogTitle,
        customData: config.customData
      }
    };
    return this.dialog.open(dialogComponent, cfg);
  }
}

