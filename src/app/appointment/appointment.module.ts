import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { CreateUpdateAppointmentComponent } from './create-update-appointment/create-update-appointment.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    CreateUpdateAppointmentComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AppointmentModule { }
