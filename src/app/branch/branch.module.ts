import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import {ReactiveFormsModule} from '@angular/forms';
import { CreateUpdateBranchComponent } from './create-update-branch/create-update-branch.component';
import { EditComponent } from './edit/edit.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    CreateUpdateBranchComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class BranchModule { }
