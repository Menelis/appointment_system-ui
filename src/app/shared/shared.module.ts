import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbDatepickerModule, NgbPaginationModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import { ResponseMessageComponent } from './response-message/response-message.component';



@NgModule({
  declarations: [
    ResponseMessageComponent
  ],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    NgbProgressbarModule
  ],
  exports: [
    NgbDatepickerModule,
    NgbPaginationModule,
    ResponseMessageComponent,
    NgbProgressbarModule
  ]
})
export class SharedModule { }
