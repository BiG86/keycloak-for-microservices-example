import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonButtonPrimaryComponent} from './component/common-button-primary/common-button-primary.component';
import {CommonButtonDiscardComponent} from './component/common-button-discard/common-button-discard.component';
import {TranslateModule} from '@ngx-translate/core';

const exports =[
  // Common button primary component
  CommonButtonPrimaryComponent,
  // Common button discard component
  CommonButtonDiscardComponent
];

@NgModule({
  declarations: [
    // Primary button
    CommonButtonPrimaryComponent,
    // Discard button
    CommonButtonDiscardComponent
  ],
  imports: [
    // Common module
    CommonModule,
    // Translate module
    TranslateModule
  ],
  exports: [...exports]
})
// UiKit module
export class UiKitModule { }
