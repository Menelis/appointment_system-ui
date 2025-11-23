import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbDatepickerModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    NgbPaginationModule
  ],
  exports: [
    NgbDatepickerModule,
    NgbPaginationModule
  ]
})
export class SharedModule { }
