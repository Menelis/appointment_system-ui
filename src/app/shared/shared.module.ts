import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbDatepickerModule, NgbPaginationModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import { ResponseMessageComponent } from './response-message/response-message.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';



@NgModule({
  declarations: [
    ResponseMessageComponent,
    ProgressBarComponent
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
    NgbProgressbarModule,
    ProgressBarComponent
  ]
})
export class SharedModule { }
