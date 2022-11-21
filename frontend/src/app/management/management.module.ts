import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management/management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditOrderlineComponent } from './edit-orderline/edit-orderline.component';
@NgModule({
  declarations: [
    ManagementComponent,
    EditUserComponent,
    CreateUserComponent,
    EditProductComponent,
    EditOrderlineComponent,
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatCheckboxModule
  ]
})
export class ManagementModule { }
