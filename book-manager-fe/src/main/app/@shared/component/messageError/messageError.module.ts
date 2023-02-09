import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageErrorComponent } from './messageError.component';

@NgModule({
    imports: [CommonModule],
    declarations: [MessageErrorComponent],
    exports: [MessageErrorComponent]
})
export class MessageErrorModule { }
