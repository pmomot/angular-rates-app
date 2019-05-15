import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { NumberToArrayPipe } from './pipes/number-to-array.pipe';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ],
  declarations: [
    NumberToArrayPipe
  ],
  exports: [
    CommonModule,
    NumberToArrayPipe
  ]
})
export class SharedModule { }
