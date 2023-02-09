import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-common-dialog-modal',
  templateUrl: './common-dialog-modal.component.html',
  styleUrls: ['./common-dialog-modal.component.css']
})
export class CommonDialogModalComponent implements OnInit {

  @Input() modalTitleKey: string;
  @Input() buttonCloseKey: string;
  @Input() buttonCancelKey: string;
  @Input() buttonConfirmKey: string;

  @Input() errorMessage: string;
  @Input() showErrorMessage: boolean;
  @Input() showCloseButton: boolean;
  @Input() showCancelButton: boolean;
  @Input() showConfirm: boolean;
  @Input() dirty: boolean;

  @Output() closeAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() discardAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() confirmAction: EventEmitter<any> = new EventEmitter<any>();

  constructor(
  ) {
    this.showErrorMessage = false;
    this.showCloseButton = false;
    this.showCancelButton = false;
    this.showConfirm = false;
    this.dirty = false;

    this.buttonCloseKey = 'common.close';
    this.buttonCancelKey = 'common.cancel';
    this.buttonConfirmKey = 'common.save';
  }

  ngOnInit(): void {
  }

  public closeModalHandler(event: any) {
    this.closeAction.emit(event);
  }

  public confirmModalHandler(event: any) {
    this.confirmAction.emit(event);
  }

  close(event: any) {
    this.discardAction.emit(event);
  }
}
