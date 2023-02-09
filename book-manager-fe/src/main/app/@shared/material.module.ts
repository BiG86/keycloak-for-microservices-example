import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    // Common module
    CommonModule
  ],
  exports: [
    // Angular Material dialog module
    MatDialogModule
  ]
})
// This module uses:
// - CommonModule
// This module exports:
// - MatDialogModule
export class MaterialModule { }
