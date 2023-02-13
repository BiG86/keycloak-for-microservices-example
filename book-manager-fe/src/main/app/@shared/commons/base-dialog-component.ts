import {Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommonDialogBase, CommonDialogConfig} from '../component/common-dialog-modal/model/common-dialog-model';
import {ConfigurationLoader} from '../../@core/configuration/configuration-loader.service';
import {NotificationService} from '../../@core/services/notification.service';
import {TranslateService} from '@ngx-translate/core';

export abstract class BaseDialogComponent {

  // Title of the dialog
  public dialogTitle: string;
  // Whether this dialog is read-only or editable
  public readonly: boolean;
  // Whether to show validation errors or not; does not make sense if readonly
  public showErrors: boolean;
  constructor(
    // Common dialog configuration
    @Inject(MAT_DIALOG_DATA) public data: CommonDialogConfig,
    // Angular Material dialog
    public dialogRef: MatDialogRef<CommonDialogBase>,
    // Configuration loader
    public configurationLoader: ConfigurationLoader,
    // Notification service
    public notificationService: NotificationService,
    // Translate service
    public translateService: TranslateService
  ) {
    this.showErrors = false;
    this.dialogTitle = data.dialogTitle;
    this.readonly = data.customData.readonly;
}

 /**
  * Handles the close event
  * @param event The close event
  */
  closeHandler(event: Event) {
    this.dialogRef.close();
  }

  /**
   * Handles the discard event
   * @param event The discard event
   */
  discardHandler(event: Event) {
    this.dialogRef.close();
  }
}
