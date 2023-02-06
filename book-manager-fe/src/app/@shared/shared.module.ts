import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertComponent} from './component/alert/alert.component';
import {TableComponent} from './component/table/table.component';
import {NgbdSortableHeader} from './component/table/directives/sortable.directive';
import {ModalModule} from '../_modal';
import {CommonDialogModalModule} from './component/common-dialog-modal/common-dialog-modal.module';
import {UiKitModule} from './ui-kit.module';
import {NgSelectModule} from '@ng-select/ng-select';

const exports = [
  // Common module
  CommonModule,
  // Forms module
  FormsModule,
  // Reactive forms module
  ReactiveFormsModule,
  // Alert component, used to alert users
  AlertComponent,
  // Table component, used to present content
  TableComponent,
  // Angular Bootstrap tooltip
  NgbTooltip,
  // Angular Bootstrap module
  NgbModule,
  // Modal module
  ModalModule,
  // Translate module
  TranslateModule,
  // Common dialog modal module
  CommonDialogModalModule,
  // UiKit module
  UiKitModule,
  // NgSelect module
  NgSelectModule
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    CommonDialogModalModule
  ],
  declarations: [
    // Used to make headers sortable
    NgbdSortableHeader,
    // Used to alert users
    AlertComponent,
    // Used to present content
    TableComponent
  ],
  exports: [...exports],
})
export class SharedModule {
}
