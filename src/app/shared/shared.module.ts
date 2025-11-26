import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbDatepickerModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { ResponseMessageComponent } from './response-message/response-message.component';



@NgModule({
  declarations: [
    ResponseMessageComponent
  ],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    NgbPaginationModule
  ],
  exports: [
    NgbDatepickerModule,
    NgbPaginationModule,
    ResponseMessageComponent
  ]
})
export class SharedModule { }
